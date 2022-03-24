// Yet Another Sand Game
// Hayden Buscher ~ 2022
var width = 256;
var height = 256;
var cellSize = 2;
var cells = new Array(height);
cells = init(cells,true);
var activeCells = Array(height).fill().map(() => Array(width).fill(0));
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var run = true;
var alive = 0;
var drag = false;
const colors = [
	'Black',
	'Khaki'	
];


newInterval();

function newInterval(){
			cycle();
			if(run) requestAnimationFrame(newInterval);
}

c.addEventListener('mousedown', (e) => {
	drag = true;
	let rect = c.getBoundingClientRect();
	cellPlace(Math.floor((e.clientX - rect.left)/cellSize), Math.floor((e.clientY - rect.top)/cellSize));
});

document.addEventListener('mouseup', () => {
	drag = false;
});

c.addEventListener('mousemove', (e) => {
	if(drag){
		let rect = c.getBoundingClientRect();
		cellPlace(Math.floor((e.clientX - rect.left)/cellSize), Math.floor((e.clientY - rect.top)/cellSize));
	}
});

function cellPlace(x,y){
	if(cells[y*x] == 0){
		cells[y*x] = 1;
		render();
	}
}

function init(arr,rand){
	for(let i=0;i<height;i++){
		arr[i] = new Array(width);
		for(let j=0;j<width;j++){
			if(rand && Math.floor(Math.random() * 4) == 3){
				arr[i][j] = Math.floor(Math.random() * 2);
			} else arr[i][j] = 0;
		}
	}
	return arr;
}

function cycle(){
	alive = 0;
	let temp = Array(height).fill().map(() => Array(width).fill(0));
	

	for(let i=0;i<height;i++){
		for(let j=0;j<width;j++){
			//if(cells[i][j] == 1) alive++;
			if(activeCells[i][j] < 5){
				if(cells[i][j] == 1 &&i <height-1 && cells[i+1][j] == 0){
					activeCells[i][j] = 0;
					activeCells[i+1][j] = 0;
					temp[i][j] = 0;
				} else if (cells[i][j] == 0 && i > 0 && cells[i-1][j] ==1){
					activeCells[i][j] = 0;
					activeCells[i-1][j] = 0;
					temp[i][j] = 1;
				} else {
					activeCells[i][j]++;
					temp[i][j] = cells[i][j];	
				}
				//rendering
				ctx.fillStyle = colors[cells[i][j]];
				ctx.fillRect(j*cellSize, i*cellSize, cellSize, cellSize);
			} else temp[i][j] = cells[i][j];
		}
	}
	cells = temp;
	ctx.fillStyle = 'gray';
	ctx.font = "12px Arial";
	ctx.fillText('Particles:'.concat(alive), 10, 20);
}

function toggleRun(){
	if(run){
		document.getElementById('toggleRun').innerHTML = "Run";
		run = false;
	} else {
		requestAnimationFrame(newInterval);
		document.getElementById('toggleRun').innerHTML = "Pause";
		run = true;
	}
}

function step(){
	cycle();
}

function clearCells(){
	clearInterval(renderInterval);
	document.getElementById('toggleRun').innerHTML = "Start";
	run = false;
	cells = init(cells,false);
	alive = 0;
	render();
}
