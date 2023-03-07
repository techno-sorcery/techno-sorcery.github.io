// Minesweeper
// Hayden Buscher ~ 2023

// Define variables
const width = 16;
const height = 16;
const pixelSize = 25;
const mines = 40;
const colors = ["white", "blue", "green", "red", "darkblue", "darkred", "cyan", "purple", "gray", "black"];

var grid = new Array(height);
var playing = false;
var clicks = true;
var timer = 0;
var minesLeft = mines;
var actualLeft = mines;
var tilesCovered = width * height - mines;


// Tile class
class Tile {
	constructor(number, uncovered, flagged, highlighted) {
		this.number = number;
		this.uncovered = uncovered;
		this.flagged = flagged;
		this.highlighted = highlighted;
	}
}


// Set neighborhood search bounds
function bounds(row, col) {
	let baseX = -1;
	let maxX = 1;
	let baseY = -1;
	let maxY = 1;

	// X bounds
	if (col == 0) {
		baseX = 0;
	} else if (col == width - 1) {
		maxX = 0;
	}

	// Y bounds
	if (row == 0) {
		baseY = 0;
	} else if (row == height - 1) {
		maxY = 0;
	}

	// Create 2D coordinate array
	let boundList = [];
	for (Y = -1; Y <= 1; Y++) {
		let boundRow = [];
		for (X = -1; X <= 1; X++) {
			if (X < baseX || Y < baseY || X > maxX || Y > maxY) {
				boundRow.push(null)
			} else {
				boundRow.push([row + Y, col + X])
			}
		}
		boundList.push(boundRow);
	}

	return boundList
}


// Initialize array
function init(myArray, numMines) {

	// 2D array generation
	for (let row = 0; row < height; row++) {
		myArray[row] = new Array(width);
		for (let col = 0; col < width; col++) {

			// Create blank Tile object
			myArray[row][col] = new Tile(0, false, false, false);
		}
	}

	// Place mines
	while (numMines > 0) {
		var row = Math.floor(Math.random() * width);
		var col = Math.floor(Math.random() * height);

		// Check if mine already exists
		if (myArray[row][col].number != 9) {
			myArray[row][col].number = 9;
			numMines--;
		}
	}

	// Calculate tile numbers
	for (let row = 0; row < height; row++) {
		for (let col = 0; col < width; col++) {
			if (myArray[row][col].number != 9) {

				// Set neighborhood search bounds
				let myBounds = bounds(row, col);

				// Search tile neighborhood
				for (Y = 0; Y < 3; Y++) {
					for (X = 0; X < 3; X++) {
						let myCoords = myBounds[Y][X];
						if (myBounds[Y][X] != null && myArray[myCoords[0]][myCoords[1]].number == 9) {

							// Increment tile number
							myArray[row][col].number++;
						}
					}
				}
			}
		}
	}

	return myArray;
}


// Uncover squares
function uncover(y, x) {
	function uncoverHelper(row, col) {

		// Set neighborhood search bounds
		let myBounds = bounds(row, col);
		let myTiles = []

		// Transform bounds, removing diagonals

		// Upper-left
		if(!(
			grid[row][col].number == 0 && myBounds[1][0] != null && myBounds[0][1] != null &&
			grid[myBounds[1][0][0]][myBounds[1][0][1]].number != 0 &&
			grid[myBounds[0][1][0]][myBounds[0][1][1]].number != 0
		)){
			myBounds[0][0] = null;
		}

		// Upper-right
		if(!(
			grid[row][col].number == 0 && myBounds[0][1] != null && myBounds[1][2] != null &&
			grid[myBounds[0][1][0]][myBounds[0][1][1]].number != 0 &&
			grid[myBounds[1][2][0]][myBounds[1][2][1]].number != 0
		)){
			myBounds[0][2] = null;
		}

		// Lower-right
		if(!(
			grid[row][col].number == 0 && myBounds[1][2] != null && myBounds[2][1] != null &&
			grid[myBounds[1][2][0]][myBounds[1][2][1]].number != 0 &&
			grid[myBounds[2][1][0]][myBounds[2][1][1]].number != 0
		)){
			myBounds[2][2] = null;
		}

		// Lower-left
		if(!(
			grid[row][col].number == 0 && myBounds[2][1] != null && myBounds[1][0] != null &&
			grid[myBounds[2][1][0]][myBounds[2][1][1]].number != 0 &&
			grid[myBounds[1][0][0]][myBounds[1][0][1]].number != 0
		)){
			myBounds[2][0] = null;
		}

		// Search tile neighborhood
		for(Y = 0; Y < 3; Y++) {
			for(X = 0; X < 3; X++) {
				let myCoords = myBounds[Y][X];

				// Check if neighbor exists, is unflagged, and is not covered
				if(myCoords != null && !grid[myCoords[0]][myCoords[1]].uncovered && !grid[myCoords[0]][myCoords[1]].flagged) {

					// Uncover tile
					grid[myCoords[0]][myCoords[1]].uncovered = true;
					tilesCovered--; 

					// Push to stack if blank tile
					if(grid[myCoords[0]][myCoords[1]].number == 0) {
						myTiles.push([myCoords[0], myCoords[1]]);
					}
				}
			}
		}

		// Pop tiles from stack, recursively call function
		while (myTiles.length > 0) {
			temp = myTiles.pop();
			uncoverHelper(temp[0], temp[1]);
		}
	}

	// Check if selected tile is covered
	if (!grid[y][x].uncovered && !grid[y][x].flagged) {
		grid[y][x].uncovered = true;
		tilesCovered--; 
		if (grid[y][x].number == 0) {
			uncoverHelper(y, x);
		} else if (grid[y][x].number == 9) {
			grid[y][x].highlighted = true;

			// Lose condition
			gameLose();
		}
		render();
	}
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

				// Background rectangle
				if (grid[row][col].highlighted) {
					ctx.fillStyle = "red";
				} else {
					ctx.fillStyle = "darkgray";
				}
				ctx.fillRect(col * pixelSize + 1, row * pixelSize + 1, pixelSize - 1, pixelSize - 1);

				// Text color
				ctx.fillStyle = colors[grid[row][col].number];

				// Canvas functions
				if (grid[row][col].number == 9) {
					ctx.fillText("*", (pixelSize * col) + pixelSize / 5 + 2, (pixelSize * row) - pixelSize / 5 + pixelSize + 5);
				} else if (grid[row][col].number != 0) {
					ctx.fillText(grid[row][col].number, (pixelSize * col) + pixelSize / 5 + 1, (pixelSize * row) - pixelSize / 5 + pixelSize + 1);
				}

			// Covered tiles
			} else {

				// Background rectangle
				ctx.fillStyle = "lightgray";
				ctx.fillRect(col * pixelSize + 1, row * pixelSize + 1, pixelSize - 1, pixelSize - 1);

				// Flags
				if (grid[row][col].flagged) {
					ctx.font = 'bold 20px serif'
					ctx.fillStyle = "red";
					ctx.fillText("⚑", (pixelSize * col) + pixelSize / 5 - 2, (pixelSize * row) - pixelSize / 5 + pixelSize + 1);
				}
			}
		}
	}

	// Update mine display
	document.getElementById('mineDisp').innerText = minesLeft;
}


// Initialize mine grid, canvas
grid = init(grid, mines);
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var timer = setInterval(incrementSeconds, 1000);
render();


// Increment timer by one
function incrementSeconds() {
	if (playing) {
		timer += 1;
		document.getElementById('timeDisp').innerText = timer;
	}
}


// Mouse click event
c.addEventListener('mousedown', (e) => {

	// Set coordinates
	if(clicks){
		let rect = c.getBoundingClientRect();
	let clickPos = [Math.floor((e.clientY - rect.top) / pixelSize), Math.floor((e.clientX - rect.left) / pixelSize)];

	// Start timer if not playing
	if (!playing) {
		document.getElementById('timeDisp').innerText = timer;
		playing = true;
	}

	// Left click, uncover
	if (e.button == 0) {
		uncover(clickPos[0], clickPos[1]);

	// Middle click, uncover neighbors
	} else if (e.button == 1 && grid[clickPos[0]][clickPos[1]].uncovered) {
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

	// Right click, toggle flag
	} else if (e.button == 2) {
		if (!grid[clickPos[0]][clickPos[1]].uncovered) {

			// Flag
			if (!grid[clickPos[0]][clickPos[1]].flagged && minesLeft > 0) {
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
	if(actualLeft == 0 && tilesCovered == 0){
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
	timer = 0;
	minesLeft = mines;
	actualLeft = mines;
	tilesCovered = width * height - mines;

	document.getElementById('timeDisp').innerText = timer;
	grid = init(grid, mines);
	render();
}