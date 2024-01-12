// Game of Life v1.1
// Hayden Buscher ~ 2022-2023
var width = 102;
var height = 102;
var pixelSize = 5;
var cells = new Array(height);

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var run = false;
var generation = 0;
var alive = 0;
var drag = false;
var erase = 1;

cells = init(cells);
newInterval();
clearInterval(renderInterval);


function newInterval(){
    renderInterval = setInterval(function(){
        evolve();
    }, 10);
}


c.addEventListener('mousedown', (e) => {
    let canvas_width = document.getElementById('myCanvas').offsetWidth;
    let tempPixel = Math.floor(canvas_width / width);
    let rect = c.getBoundingClientRect();
    drag = true;

    console.log(canvas_width);
    console.log(canvas_width / width);
    console.log(Math.floor((e.clientY - rect.top) / tempPixel));
    console.log();

    cellPlace(Math.floor((e.clientY - rect.top) / tempPixel), Math.floor((e.clientX - rect.left) / tempPixel));
});


document.addEventListener('mouseup', () => {
    drag = false;
});


c.addEventListener('mousemove', (e) => {
    let a = 1231;
    // if(drag){
    //     let canvas_width = document.getElementById('myCanvas').offsetWidth;
    //     let rect = c.getBoundingClientRect();
    //     let tempPixel = Math.floor(canvas_width / width);

    //     console.log(Math.floor((e.clientY - rect.top) / tempPixel));
    //     cellPlace(Math.floor((e.clientY - rect.top) / tempPixel), Math.floor((e.clientX - rect.left) / tempPixel));
    // }
});

function step(){
    evolve();
}

function cellPlace(y,x){
    if(cells[y][x] != erase){
        cells[y][x] = erase;
        render(cells,y,x)
    }
}


function init(arr){
    for(let y = 0; y < height; y++){
        arr[y] = new Array(width);
        for(let x = 0; x < width; x++){
            arr[y][x] = Math.floor(Math.random() * 2);
            render(arr,y,x);
        }
    }
    return arr;
}


function evolve(){
    alive = 0;
    let temp = new Array(height)

    // Check each cell of 2D array
    for(let row = 0 ; row < height; row++){
        let tempRow = new Array(width)
        for(let col = 0; col < width; col++){

            // Set scan range
            let myW = 3;
            let myH = 3;
            let myX = col - 1;
            let myY = row - 1;

            // Transform scan range
            if(row == 0 || row == height - 1){
                myH = 2;
            }
            if(col == 0 || col == width - 1){
                myW = 2;
            }
            if(myX < 1){
                myX = col;
            }
            if(myY < 1){
                myY = row;
            }

            // Scan neighbors
            if(cells[row][col] == 1){
                alive++;
            }
            tempRow[col] = scan(myX, myY, myW, myH, row, col);

            // Render
            if(tempRow[col] == 1){
                ctx.fillStyle = "#cc6600";
            } else {
                ctx.fillStyle = "white";
            }
            ctx.fillRect(col * pixelSize + 1, row * pixelSize + 1, pixelSize - 1, pixelSize - 1);
        }
        temp[row] = tempRow
    }
    cells = temp;
    generation++;

    document.getElementById('genDisp').innerHTML = generation;
    document.getElementById('liveDisp').innerHTML = alive;
}


// Display array cell
function render(arr,y,x){
    if(arr[y][x] == 1){
        ctx.fillStyle = "#cc6600";
    } else {
        ctx.fillStyle = "white";
    }
    ctx.fillRect(x * pixelSize + 1, y * pixelSize + 1, pixelSize - 1, pixelSize - 1);
}

// Check neighbors to determine if cell lives, dies, or is born
function scan(x, y, w, h, sY, sX){
    let neighbors = 0;
    for(let row = y; row < y + h; row++){
        for(let col = x; col < x + w; col++){
            if(cells[row][col] == 1 && !(col == sX && row == sY)){
                neighbors++;
            }
        }
    }
    if((neighbors == 2 && cells[sY][sX] == 1 )|| neighbors == 3){
        return 1;
    } else return 0;
}

// Toggle game run state
function toggleRun(){
    if(run){
        clearInterval(renderInterval);
        document.getElementById('toggleRun').innerHTML = "Start";
        run = false;
    } else {
        newInterval();
        document.getElementById('toggleRun').innerHTML = "Stop";
        run = true;
    }
}

// Clear all cells
function clearCells(){
    clearInterval(renderInterval);
    document.getElementById('toggleRun').innerHTML = "Start";
    run = false;

    ctx.fillStyle = "white";
    for(let row = 0; row < height; row++){
        for(let col = 0; col < width; col++){
            cells[row][col] = 0;
            ctx.fillRect(col*pixelSize+1, row*pixelSize+1, pixelSize-1, pixelSize-1);
        }
    }

    generation = 0;
    alive = 0;
}

// Generate new, random cell array
function rand(){
    clearInterval(renderInterval);
    cells = init(cells);
    generation = 0;
    if(run) newInterval();
}

// Toggle pen draw and erase
function toggle(){
    if(erase == 0){
        document.getElementById('toolButton').innerHTML = "Erase";
        erase = 1;
    } else {
        document.getElementById('toolButton').innerHTML = "Draw";
        erase = 0;
    }
}
