// Minesweeper
// Hayden Buscher ~ 2023
import "Tile.js"

// Define variables
const width = 15;
const height = 15;
const pixelSize = 25;

var dispGrid = document.getElementById("grid");
var grid = new Array(height);
var playing = false;
var clicks = true;
var timer = 0;



// Tile class


// Initialize mine grid, canvas
grid = init(grid, mines);
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var timer = setInterval(incrementSeconds, 1000);
render();


// Initialize array
function init(myArray) {

    // 2D array generation
    for (let row = 0; row < height; row++) {
        myArray[row] = new Array(width);

        for (let col = 0; col < width; col++) {

            // Create blank Tile object
            if (Math.floor(Math.random() * 2) == 1) {
                myArray[row][col] = new Tile(false, true);

            } else {
                myArray[row][col] = new Tile(false, false);
            }
        }
    }

    return myArray;
}


// Draw grid elements
function render() {

    // Clear canvas
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, width * pixelSize, height * pixelSize);

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            ctx.font = 'bold 25px serif';

            // Uncovered tiles
            if (grid[row][col].uncovered) {
                ctx.fillStyle = "red";

            // Covered tiles
            } else {
                ctx.fillStyle = "lightgray";

            }
            
            ctx.fillRect(col * pixelSize + 1, row * pixelSize + 1, pixelSize - 1, pixelSize - 1);
        }
    }
}




// Increment timer by one
function incrementSeconds() {
    if (playing) {
        timer += 1;
        document.getElementById('timeDisp').innerText = timer;
    }
}

// Toggle flag mode
function toggle(){
    if (flag){
        document.getElementById('mode').innerHTML = 'Flag';
    } else {
        document.getElementById('mode').innerHTML = 'Uncover';
    }

    flag = !flag;
}


// Mouse click event
c.addEventListener('mousedown', (e) => {
    let canvas_width = document.getElementById('myCanvas').offsetWidth;
    let tempPixel = canvas_width / width;


    // Set coordinates
    if(clicks){
        let rect = c.getBoundingClientRect();
        let clickPos = [Math.floor((e.clientY - rect.top) / tempPixel), Math.floor((e.clientX - rect.left) / tempPixel)];

        // Start timer if not playing
        if (!playing) {
            document.getElementById('timeDisp').innerText = timer;
            playing = true;
        }

        // Left click, uncover
        if ((e.button == 0 && !flag) || e.button == 1) {
            if (grid[clickPos[0]][clickPos[1]].uncovered) {

                let myBounds = bounds(clickPos[0], clickPos[1]);
                let tileStack = [];
                let numFlags = 0;

                // Check flag count, push valid tiles to stack
                for (let Y = 0; Y < 3; Y++) {
                    for (let X = 0; X < 3; X++) {
                        let myCoords = myBounds[Y][X];
                        if (myCoords != null) {
                            if (grid[myCoords[0]][myCoords[1]].flagged) {

                                // Count if flagged
                                numFlags++;

                            } else if (!grid[myCoords[0]][myCoords[1]].uncovered) {

                                // Push coords of valid tile to stack
                                tileStack.push(myCoords);
                            }
                        }
                    }
                }

                // Take valid tiles off stack
                if (numFlags == grid[clickPos[0]][clickPos[1]].number) {
                    while (tileStack.length != 0) {
                        let tempTile = tileStack.pop();
                        uncover(tempTile[0], tempTile[1]);
                    }
                }
            } else if (e.button == 0) {
                uncover(clickPos[0], clickPos[1]);
            }

        // Right click, toggle flag
        } else if (e.button == 2 || (e.button == 0 && flag)) {
            if (!grid[clickPos[0]][clickPos[1]].uncovered) {

                // Flag
                if (!grid[clickPos[0]][clickPos[1]].flagged) {
                    minesLeft--;
                    grid[clickPos[0]][clickPos[1]].flagged = true;
                    if(grid[clickPos[0]][clickPos[1]].number == 9){
                        actualLeft--;
                    }

                    // Un-flag
                } else if (grid[clickPos[0]][clickPos[1]].flagged) {
                    minesLeft++;
                    grid[clickPos[0]][clickPos[1]].flagged = false;
                    if(grid[clickPos[0]][clickPos[1]].number == 9){
                        actualLeft++;
                    }
                }
                render();
            }
        }
    }

    // Win condition
    if(actualLeft == 0 && minesLeft >= 0 && tilesCovered == 0){
        gameWin()
    }
});


// Shows all mines on play field
function showMines() {
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            if (grid[row][col].number == 9) {
                grid[row][col].uncovered = true;
                grid[row][col].flagged = false;
            }
        }
    }
    render()
}


// Game lose condition
function gameLose() {
    clicks = false;
    playing = false;
    showMines()
}

// Game win condition
function gameWin(){
    gameLose()
    ctx.font = 'bold 25px serif';
    ctx.fillStyle = "red";
    ctx.fillText("You win!", ((width-3.8)*pixelSize/2), ((height+0.8)*pixelSize/2));
}


// Reset game, generate new board
function reset(){

    // Reset vars
    playing = false;
    clicks = true;
    firstTurn = true;
    timer = 0;
    minesLeft = mines;
    actualLeft = mines;
    tilesCovered = width * height - mines;

    document.getElementById('timeDisp').innerText = timer;
    grid = init(grid, mines);
    render();
}
