// Kremlin Krisis
// Hayden Buscher ~ 2022
var gridX = 10;
var gridY = 24;
var gridSize = 24;
var gridBuffer = 4;
var grid = new Array(gridX*gridY).fill(0);


const colors = [
	'black',
	'red',
	'orange',
	'yellow',
	'green',
	'blue',
	'purple',
	'white'
	]

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

render();

function drop(){
	for(let i=0;i<gridY;i++){
		for(let j=0;j<gridX;j++){
				
		}	
	}
}

function render(){
	for(let i=gridBuffer;i<=gridY;i++){
		for(let j=0;j<=gridX+1;j++){
			if(j%(gridX+1) == 0){
				ctx.fillStyle = "gray";	
			} else ctx.fillStyle = colors[grid[(j-1)*(i)]];	
			ctx.fillRect(j*gridSize, (i-gridBuffer)*gridSize, gridSize-2, gridSize-2);
		}
	}
}

//function scrollUp(){
//	iterationY = height-1;
//	ctx.drawImage(ctx.canvas, 0, 0, width, height, 0, -1, width, height);
	//ctx.clearRect(0, 0, c.width, c.height);
//}