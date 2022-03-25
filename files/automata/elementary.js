// Game of Life
// Hayden Buscher ~ 2022
var width = 512;
var height = 512;
var pixelSize = 1;
var cells = new Array(width);
cells = init(cells,false);
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var run = true;
var drag = false;
var erase = 1;
var iterationY = 0;
var rule = 30;
setRule();
console.log(rule);

for(let i=0;i<width;i++){
	render(cells[i],i);
}
iterationY++;
newInterval();

function newInterval(){
	
	if(iterationY < height && run) cycle();
	requestAnimationFrame(newInterval);
}

function init(arr,rand){
	for(let i=0;i<width;i++){
		if(rand){
			arr[i] = Math.floor(Math.random() * 2);
		} else if(!rand && i == Math.floor(width/2)){
			arr[i] = 1;
		}else arr[i] = 0;
	}
	return arr;
}

function cycle(){
	let temp = new Array(width);
	for(let i=0;i<width;i++){
		if(i<1){
			let index = cells[width-2].toString().concat(cells[i].toString(),cells[i+1].toString());
			temp[i] = rule.charAt(7-parseInt(parseInt(index),2));

		} else if(i > width-2){
			let index = cells[i-1].toString().concat(cells[i].toString(),cells[0].toString());
			temp[i] = rule.charAt(7-parseInt(parseInt(index),2));
		} else{
			let index = cells[i-1].toString().concat(cells[i].toString(),cells[i+1].toString());
			temp[i] = rule.charAt(7-parseInt(parseInt(index),2));
		}
		render(temp[i],i);
	}
	cells = temp;
	iterationY++;
}

function render(cell,position){
	if(cell == 1){
			ctx.fillStyle = "#cc6600";
			} else {
				ctx.fillStyle = "white";
			}
			ctx.fillRect(position*pixelSize-pixelSize, iterationY*pixelSize, pixelSize, pixelSize);
}

function toggleRun(){
	if(run){
		document.getElementById('toggleRun').innerHTML = "Start";
		run = false;
	} else {
		document.getElementById('toggleRun').innerHTML = "Stop";
		run = true;
	}
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
	iterationY = 0;
	ctx.clearRect(0, 0, c.width, c.height);
	cells = init(cells,true);
	for(let i=0;i<width;i++){
	render(cells[i],i);
	}
	iterationY++;
}

function point(){
	iterationY = 0;
	ctx.clearRect(0, 0, c.width, c.height);
	cells = init(cells,false);
	for(let i=0;i<width;i++){
	render(cells[i],i);
	}
	iterationY++;
}

function setRule(){
	let temp = run;
	run = false;
	iterationY = 0;
	ctx.clearRect(0, 0, c.width, c.height);
	rule = parseInt(document.getElementById('rule').value);
	rule = rule.toString(2).padStart(8,'0');
	cells = init(cells,false);
	run = temp;
}