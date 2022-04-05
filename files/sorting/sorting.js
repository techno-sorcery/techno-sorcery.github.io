// Sorting Algorithms
// Hayden Buscher ~ 2022
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var height = 4;
var width = height*2;
var intArray = new Array;
var scrambled = new Array(intArray.length).fill(false);
var scIndex = 0;

intArray = initArray(new Array,256/height);

render(-1);
var myInterval = setInterval(scramble,5);

function initArray(arr, len){
	for(let i=0;i<len;i++){
		arr[i] = i+1;
	}
	return arr;
}

function render(select){
	ctx.clearRect(0, 0, c.width, c.height);
	for(let i=0;i<intArray.length;i++){
		if(select > -1 && i+1 == select){
			ctx.fillStyle = "red"
		} else ctx.fillStyle = "white";
		ctx.fillRect(width*i, c.height, width, -intArray[i]*height);
	}
}

function scramble(){
	if(scIndex == intArray.length){
		clearInterval(myInterval);
		scIndex = 0;
	}else{
		let insert = false;
		while(!insert){
			let rand = Math.floor(Math.random() * intArray.length)
			if(!scrambled[rand]){
				scrambled[rand] = true;
				insert = true;
				intArray[rand] = intArray[scIndex];
				render(rand);
			}
		}	
		scIndex++;
	}
}