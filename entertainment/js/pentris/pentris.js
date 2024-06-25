// Pentris
// Hayden Buscher, 2024
// Sola Deo gloria


// Constants
const width = 13;
const height = 24;
const pixel_size = 21;

const colors = ["Black", "Crimson", "OrangeRed", "Orange", "Yellow", "YellowGreen", "Green", 
                "LimeGreen", "SeaGreen", "LightSeaGreen", "SteelBlue", "RoyalBlue",
                "DodgerBlue", "LightSkyBlue", "SlateBlue", "MediumSlateBlue", 
                "RebeccaPurple", "Purple", "MediumOrchid"];

const pieces = [        //x, y
                [[0, 0], [1, 0], [2, 0], [-1, 0], [-2, 0]], // ⠤⠤⠄
                [[0, 0], [0, 1], [0, -1], [-1, 0], [1, -1]], // ⠺⠁
                [[0, 0], [0, 1], [0, -1], [1, 0], [-1, -1]], // ⠈⠗
                [[0, 0], [-1, 0], [-1, 1], [1, 0], [2, 0]], // ⠋⠉
                [[0, 0], [1, 0], [1, 1], [-1, 0], [-2, 0]], // ⠉⠙
                [[0, 0], [-1, 0], [0, -1], [-1, -1], [1, -1]], // ⠛⠁
                [[0, 0], [1, 0], [0, -1], [-1, -1], [1, -1]], // ⠈⠛
                [[0, 0], [1, 0], [0, -1], [-1, -1], [-2, -1]], // ⠉⠓
                [[0, 0], [-1, 0], [0, -1], [1, -1], [2, -1]], // ⠚⠉
                [[0, 0], [-1, 0], [1, 0], [0, 1], [0, 2]], // ⠹⠁
                [[0, 0], [1, 0], [-1, 0], [1, 1], [-1, 1]], // ⠦⠆
                [[0, 0], [-1, 0], [-2, 0], [0, 1], [0, 2]], // ⠈⠹
                [[0, 0], [0, -1], [-1, -1], [1, 0], [1, 1]], // ⠙⠆
                [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]], // ⠐⠗
                [[0, 0], [-1, 0], [1, 0], [2, 0], [0, 1]], // ⠙⠉
                [[0, 0], [1, 0], [0, 1], [-1, 0], [-2, 0]], // ⠉⠋
                [[0, 0], [-1, 0], [-1, -1], [1, 0], [1, 1]], // ⠓⠆
                [[0, 0], [-1, 0], [-1, 1], [1, 0], [1, -1]], // ⠖⠃
                ];

const preview_offsets = [[2, 2], [2, 2], [2, 2], [1, 1], [2, 1], [2, 2], [2, 2], [2, 2], [1, 2],
                         [2, 1], [2, 1], [3, 1], [2, 2], [2, 2], [1, 1], [2, 1], [2, 2], [2, 2]];

const timeouts = [887, 820, 753, 686, 619, 552, 468, 368, 284, 184, 167, 150, 133, 117, 100, 100,
                  83, 83, 66, 66, 50];

const piece = {
    grid: [],
    piece: 0,
    direction: 0,
    x: Math.ceil(width / 2) - 1,
    y: 1
};

// Canvas
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.font = "18px Arial";

// Global vars
var grid = new Array(height);
var next_piece;
var held_piece;
var can_hold;
var last_timeout;
var score;
var level;
var lines;
var level_lines;


// Initialize
reset();
last_timeout = setTimeout(update, timeouts[level]);


// Reset and initialize game
function reset() {
    score = 0;
    level = 0;
    level_lines = 0;
    lines = 0;
    can_hold = true;
    next_piece = 0;
    held_piece = -1;

    for (let y = 0; y < height; y++) grid[y] = new Array(width).fill(0);
    next_piece = Math.floor(Math.random() * pieces.length);
    new_piece(false);

    render();
}


// Gameplay logic
function update() {
    clearTimeout(last_timeout);

    // Collision detection
    let collision = false;

    for (const coords of piece.grid) {
        const x = piece.x + coords[0];
        const y = piece.y + coords[1];

        // Game over if intersection
        if (grid[y][x] != 0) {
            ctx.fillStyle = "Red";
            ctx.fillText("Game Over!", 88, 100);
            can_hold = false;
            return true;
        }

        if (y >= height - 1 || grid[y + 1][x] != 0) {
            collision = true;
            break;
        }

    }

    // Move down if clear path
    if (!collision) piece.y++;

    else {
        can_hold = true;

        // Add piece to grid
        for (const coords of piece.grid) {
            const x = piece.x + coords[0];
            const y = piece.y + coords[1];

            grid[y][x] = piece.piece + 1;
        }
        
        // Spawn new piece
        new_piece(false);
    }

    // Scan for full rows
    let new_lines = 0;

    for (let y = 0; y < height; y++) {
        let full = true;

        for (const cell of grid[y]) {
            if (cell == 0) {
                full = false;
                break;
            }
        }

        // Remove row and shift down
        if (full) {
            grid.splice(y, 1);
            grid.unshift(new Array(width).fill(0));
            lines++;
            level_lines++
            new_lines++;

        }
    }

    // Scoring
    new_lines = score_lines(new_lines, 4, 800);
    new_lines = score_lines(new_lines, 3, 500);
    new_lines = score_lines(new_lines, 2, 300);
    new_lines = score_lines(new_lines, 1, 100);

    // Level advance
    while (level_lines >= 10 && level < 20) {
        level++;
        level_lines -= 10;
    }

    render();
    last_timeout = setTimeout(update, timeouts[level]);

    return collision;
}


// Total score for lines
function score_lines(my_lines, num, multiplier) {
    while (Math.floor(my_lines / num) > 0) {
        score += multiplier * (level + 1);
        my_lines -= num;
    }

    return my_lines;
}


// New piece
function new_piece(useheld) {
    piece.x = Math.ceil(width / 2) - 1;
    piece.y = 1;

    if (useheld) piece.piece = held_piece;
    else {
        piece.piece = next_piece;
        next_piece = Math.floor(Math.random() * pieces.length);
    }

    piece.grid = pieces[piece.piece];
}


// Render playing field
function render() {

    // Clear canvas
    ctx.fillStyle = "#444444";
    ctx.fillRect(0, 0, 274, 505);
    ctx.fillStyle = "white";
    ctx.fillRect(274, 0, 146, 505);
    ctx.fillStyle = "Black";
    ctx.fillRect(280, 150, 106, 106); // Preview
    ctx.fillRect(280, 330, 106, 106); // Hold

    // Text
    ctx.fillText("Score: " + score, 280, 20);
    ctx.fillText("Level: " + level, 280, 45);
    ctx.fillText("Lines: " + lines, 280, 70);
    ctx.fillText("Preview:", 280, 140);
    ctx.fillText("Held:", 280, 320);

    // Draw square
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {

            // Draw square
            ctx.fillStyle = colors[grid[y][x]];
            ctx.fillRect(x * pixel_size + 1, y * pixel_size + 1, pixel_size - 1, pixel_size - 1);
        }
    }

    render_piece(piece.grid, piece.piece, piece.x, piece.y, 0, 0); // Piece

    render_piece(pieces[next_piece], next_piece, preview_offsets[next_piece][0], 
        preview_offsets[next_piece][1], 280, 150); // Preview

    if (held_piece > -1) render_piece(pieces[held_piece], held_piece, 
        preview_offsets[held_piece][0], preview_offsets[held_piece][1], 280, 330); // Held
}


// Piece drawing
function render_piece(my_grid, my_piece, px, py, x0, y0) {
    for (const coords of my_grid) {
        const x = px + coords[0];
        const y = py + coords[1];

        ctx.fillStyle = colors[my_piece + 1];
        ctx.fillRect(x0 + x * pixel_size + 1, y0 + y * pixel_size + 1, pixel_size - 1, pixel_size - 1);
    }
}


// Side-to-side movement
function move(offset) {
    
    // Check for intersections
    for (const coords of piece.grid) {
        const x = piece.x + coords[0] + offset;
        const y = piece.y + coords[1];

        if (x < 0 || x >= width || grid[y][x] != 0) return;
    }

    piece.x += offset;
    render();
}


// Piece rotation
function rotate(direction) {
    let temp_grid = []

    // Copy array
    for (let i = 0; i < piece.grid.length; i++) {
        temp_grid[i] = piece.grid[i].slice();
    }

    // Set and check for intersections
    for (let temp_coords of temp_grid) {
        temp_coords = temp_coords.reverse()
        temp_coords[direction] *= -1;

        const x = piece.x + temp_coords[0];
        const y = piece.y + temp_coords[1];

        if (x < 0 || x >= width || y < 0 || y >= height || grid[y][x] != 0) return;
    }

    piece.grid = temp_grid;
    render();
}


// Piece holding
function hold() {
    if (can_hold) {
        const next_held = piece.piece;
        new_piece(held_piece > -1);
        held_piece = next_held;
        can_hold = false;
    }

    render();
}


// Keypress handler
addEventListener('keydown', function(event) {
    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight", "Space"].indexOf(event.code) > -1) event.preventDefault();

    switch(event.key) {
        case "ArrowUp": case "k":
            rotate(0);
            break;
        case "z": case "K":
            rotate(1);
            break;
        case "Enter":
            hold();
            break;
        case " ":
            while(!update()) score += 2;
            break;
        case "ArrowDown": case "j":
            score++;
            update();
            break;
        case "ArrowLeft": case "h":
            move(-1);
            break;
        case "ArrowRight": case "l":
            move(1);
            break;
    }
})
