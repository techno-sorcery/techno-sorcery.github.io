// Minesweeper
// Hayden Buscher ~ 2022
var width = 16;
var height = 16;
const pixelSize = 25;
var field = new Array(height);
var uncovered = new Array(height)
const colors = ["black","blue","green","red","darkblue","darkred","cyan","purple","gray"]

field = init(field, 40);
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

render();

c.addEventListener('mousedown', (e) => {
	let rect = c.getBoundingClientRect();
	uncover(Math.floor((e.clientX - rect.left)/pixelSize), Math.floor((e.clientY - rect.top)/pixelSize));
});

function uncover(x,y){
	if(!uncovered[y][x]){
		uncovered[y][x] = true;
		render();
	}
}

function init(arr, mines){
	for(let i=0;i<height;i++){
		uncovered[i] = new Array(width);
		arr[i] = new Array(width);
		for(let j=0;j<width;j++){
			uncovered[i][j] = false;
			arr[i][j] = false;
		}
	}
	while(mines > 0){
		var w = Math.floor(Math.random() * width);
		var h = Math.floor(Math.random() * height);
		if(!arr[h][w]){
			arr[h][w] = true;
			mines--;
		}
	}
	return arr;
}

function render(){
	for(let i=0;i<height;i++){
		for(let j=0;j<width;j++){
			if(uncovered[i][j]){
				ctx.fillStyle = "darkgray";
				ctx.fillRect(j*pixelSize+1, i*pixelSize+1, pixelSize-1, pixelSize-1);
				ctx.fillStyle = "black";
				ctx.font = 'bold 25px serif';
				var num = check(j, i);
				ctx.fillStyle = colors[num];
  				if(num>0 || num=="*") ctx.fillText(num, (pixelSize*j)+pixelSize/5+1, (pixelSize*i)-pixelSize/5+pixelSize+1);
				//if(check(i-1,j)==0){
				//	uncovered[i-1][j]==true;
				//}
			} else {
				ctx.fillStyle = "lightgray";
				ctx.fillRect(j*pixelSize+1, i*pixelSize+1, pixelSize-1, pixelSize-1);
			}
		}
	}
}

function check(x, y){
	if(field[y][x]){
		return "*";
	} else {
		var mineCount = 0;
		if(y==0){
			var i=y;
		} else var i=y-1;
		while(i<=y+1){
			if(x==0){
				var j=x;
			} else var j=x-1;
			while(j<=x+1){
				if(field[i][j]) mineCount++;
				j++;
				if(j>=width &&  x==width-1) j++;
			}
			i++;
			if(i>=height && y==height-1) i++;
		}
		return mineCount;
	}
}
