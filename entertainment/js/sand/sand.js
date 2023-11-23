// Game of Life v1.1
// Hayden Buscher ~ 2022-2023
const width = 128;
const height = 128;
const pixelSize = 4;

var grid = new Array(height).fill(new Array(width).fill(0));
var active = [];

var run = true;
var drag = false;
var erase = 1;
var place_type = 1;

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

newInterval();

// Unit cell class
class Cell {
    constructor(type, x, y){
        // Integer element id
        this.type = type;

        // Position in grid
        this.x = x;
        this.y = y
    }
}


function newInterval(){
	renderInterval = setInterval(function(){
            step();
		}, 10);
}


function cellPlace(y,x){
    active.push(new Cell(1,x,y));
        
		// render(cells,y,x)
}

function step(){
    var new_grid = grid;
    var new_active = [];

    // Simulate for all cells in active list
    for(cell of active){
            ctx.fillStyle = "gray";
 			ctx.fillRect(cell.x * pixelSize, cell.y * pixelSize, pixelSize, pixelSize);
    }

    active = new_active;
}


// function step(){
// 	let temp = new Array(height)
	
// 	// Check each cell of 2D array
// 	for(let row = 0 ; row < height; row++){
// 		let tempRow = new Array(width)
// 		for(let col = 0; col < width; col++){

// 			// Set scan range
// 			let myW = 3;
// 			let myH = 3;
// 			let myX = col - 1;
// 			let myY = row - 1;

// 			// Transform scan range
// 			if(row == 0 || row == height - 1){
// 				myH = 2;
// 			}
// 			if(col == 0 || col == width - 1){
// 				myW = 2;
// 			}
// 			if(myX < 1){
// 				myX = col;
// 			}
// 			if(myY < 1){
// 				myY = row;
// 			}

// 			// Scan neighbors
// 			if(cells[row][col] == 1){
// 				alive++;
// 			}
// 			tempRow[col] = scan(myX, myY, myW, myH, row, col);

// 			// Render
// 			if(tempRow[col] == 1){
// 				ctx.fillStyle = "#cc6600";
// 			} else {
// 				ctx.fillStyle = "black";
// 			}
// 			ctx.fillRect(col * pixelSize, row * pixelSize, pixelSize, pixelSize);
// 		}
// 		temp[row] = tempRow
// 	}
// 	cells = temp;
// 	generation++;

// 	document.getElementById('genDisp').innerHTML = generation;
// 	document.getElementById('liveDisp').innerHTML = alive;
// }


// Display array cell
// function render(arr,y,x){
// 	if(arr[y][x] == 1){
// 		ctx.fillStyle = "#cc6600";
// 	} else {
// 		ctx.fillStyle = "black";
// 	}
// 	ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
// }

// Check neighbors to determine if cell lives, dies, or is born
// function scan(x, y, w, h, sY, sX){
// 	let neighbors = 0;
// 	for(let row = y; row < y + h; row++){
// 		for(let col = x; col < x + w; col++){
// 			if(cells[row][col] == 1 && !(col == sX && row == sY)){
// 				neighbors++;
// 			}
// 		}
// 	}
// 	if((neighbors == 2 && cells[sY][sX] == 1 )|| neighbors == 3){
// 		return 1;
// 	} else return 0;
// }

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

// Clear grid
function clear(){

	clearInterval(renderInterval);
	document.getElementById('toggleRun').innerHTML = "Start";
	run = false;
	
    // Clear canvas
	ctx.fillStyle = "black";
    ctx.clearRect(0, 0, c.width, c.height);
}

// Generate new, random cell array
// function rand(){
// 	clearInterval(renderInterval);
// 	cells = init(cells);
// 	generation = 0;
// 	if(run) newInterval();
// }

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


// Input listeners
c.addEventListener('mousedown', (e) => {
	drag = true;
	let rect = c.getBoundingClientRect();
	cellPlace(Math.floor((e.clientY - rect.top)/pixelSize), Math.floor((e.clientX - rect.left)/pixelSize));
});


document.addEventListener('mouseup', () => {
	drag = false;
});


c.addEventListener('mousemove', (e) => {
	if(drag){
		let rect = c.getBoundingClientRect();
		cellPlace(Math.floor((e.clientY - rect.top)/pixelSize), Math.floor((e.clientX - rect.left)/pixelSize));
	}
});
