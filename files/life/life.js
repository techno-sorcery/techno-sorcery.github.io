// Game of Life
// Hayden Buscher ~ 2022
var width = 64;
var height = 64;
var cells = new Array(height);
cells = init(cells,true);
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var run = false;
var generation = 0;
var alive = 0;
var drag = false;

newInterval();
clearInterval(renderInterval);
render();

function newInterval(){
	renderInterval = setInterval(function(){
			evolve();
			render();
		}, 25);
}

c.addEventListener('mousedown', (e) => {
	drag = true;
	//let rect = c.getBoundingClientRect();
	//cellPlace(Math.floor((e.clientX - rect.left)/8), Math.floor((e.clientY - rect.top)/8));
});

document.addEventListener('mouseup', () => {
	drag = false;
});

c.addEventListener('mousemove', (e) => {
	if(drag){
		let rect = c.getBoundingClientRect();
		cellPlace(Math.floor((e.clientX - rect.left)/8), Math.floor((e.clientY - rect.top)/8));
	}
});

function cellPlace(x,y){
	if(cells[y][x] == 0){
		cells[y][x] = 1;
		render();
	}
}

function init(arr,rand){
	for(let i=0;i<height;i++){
		arr[i] = new Array(width);
		for(let j=0;j<width;j++){
			if(rand){
				arr[i][j] = Math.floor(Math.random() * 2);
			} else arr[i][j] = 0;
		}
	}
	return arr;
}

function evolve(){
	alive = 0;
	let temp = new Array(height);
	temp = init(temp,false);
	for(let i=0;i<height;i++){
		for(let j=0;j<width;j++){
			let myW = 3;
			let myH = 3;
			let myX = j-1;
			let myY = i-1;
			if(j==0||j==width-1) myW = 2;
			if(i==0||i==height-1) myH = 2;
			if(myX<1) myX = j;
			if(myY<1) myY = i;
			if(cells[i][j]==1) alive++;
			temp[i][j] = scan(myX,myY,myW,myH,j,i);
		}
	}
	cells = temp;
	generation++;
}

function render(){
	for(let i=0;i<height;i++){
		for(let j=0;j<width;j++){
			if(cells[i][j] == 1){
				ctx.fillStyle = "#cc6600";
			} else {
				ctx.fillStyle = "white";
			}
			ctx.fillRect(j*8+1, i*8+1, 7, 7);
		}
	}
	document.getElementById('genDisp').innerHTML = generation;
	document.getElementById('liveDisp').innerHTML = alive;
}

function scan(x,y,w,h,sX,sY){
	let neighbors = 0;
	for(let i=y;i<y+h;i++){
		for(let j=x;j<x+w;j++){
			if(cells[i][j]==1 && !(j==sX && i==sY)) neighbors++;
		}
	}
	if((neighbors == 2 && cells[sY][sX] == 1 )|| neighbors == 3){
		return 1;
	} else return 0;
}

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

function step(){
	evolve();
	render();
}

function clearCells(){
	clearInterval(renderInterval);
	document.getElementById('toggleRun').innerHTML = "Start";
	run = false;
	cells = init(cells,false);
	generation = 0;
	alive = 0;
	render();
}

function rand(){
	clearInterval(renderInterval);
	cells = init(cells,true);
	generation = 0;
	render();
	if(run) newInterval();
}