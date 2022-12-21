// Yet Another Sand Game
// Hayden Buscher ~ 2022

class particle{
	constructor(ID, color, active){
		this.ID = ID;
		this.color = color;
		this.active = active;
	}
	getID(){
		return this.ID;
	}
	getColor(){
		return this.color;	
	}
	getActive(){
		return this.active;	
	}
	setActive(active){
		this.active = active;
	}
}

var width = 128;
var height = 128;
var cellSize = 4;
var cells = new Array(height);
cells = init(cells,true);
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var run = true;
var alive = 0;
var drag = false;

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
			if(rand && Math.floor(Math.random() * 10) == 3){
				arr[i][j] = new particle(1,'khaki',true);
			} else arr[i][j] = new particle(0,'black',false);
		}
	}
	return arr;
}

function cycle(){
	alive = 0;
	let active = Array(height).fill().map(() => Array(width).fill(true));
	let activeColumn = new Array(width).fill(-1);
	for(let i=0;i<height;i++){
		for(let j=0;j<width;j++){
			//if(cells[i][j].getID() > 0) alive++;
			if(active[i][j] && cells[i][j].getActive()){
				if(cells[i][j].getID() == 1 &&i <height-1 && cells[i+1][j].getID() == 0){
					cells[i+1][j] = cells[i][j];
					cells[i][j] = new particle(0,'black',false);
					active[i+1][j] = false;
					render(j,i+1);
					render(j,i);
					activeColumn[j] = i;
				} else {
					cells[i][j].setActive(false);
					render(j,i);
				}
			}
		}
	}
	for(let i=0;i<width;i++){
		if(activeColumn[i] >= 0){
			for(let j=activeColumn[i];j>=0;j--){
				cells[j][i].setActive(true);	
			}
		}	
	}
	ctx.fillStyle = 'gray';
	ctx.font = "12px Arial";
	ctx.fillText('Particles:'.concat(alive), 10, 20);
}

function render(j,i){
				ctx.fillStyle = cells[i][j].getColor();
				ctx.fillRect(j*cellSize, i*cellSize, cellSize, cellSize);
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

function clearCells(){
	clearInterval(renderInterval);
	document.getElementById('toggleRun').innerHTML = "Start";
	run = false;
	cells = init(cells,false);
	alive = 0;
	render();
}
