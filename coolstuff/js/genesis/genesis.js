// Genesis Engine
// Hayden Buscher, 2023

const width = 800;
const height = 600;
const viewport = 1;
const res = 64;
const scale = 1;
const mapSize = 32;
const space = 1;

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.imageSmoothingEnabled = false

var xAxis  = {x : 1, y: 0.5};
var yAxis  = {x : -1, y: 0.5};
var origin = {x : width/2, y : height/2-100};

// Define tile set
var textures = [
    "/files/128x128/Dirt/Dirt_16-128x128.png",
    "/files/128x128/Grass/Grass_05-128x128.png",
    "/files/128x128/Dirt/Dirt_01-128x128.png",
    "/files/128x128/Tile/Tile_02-128x128.png",
  ];

var tileMap = mapGen();

render()

// Renders isometric view
function render(){
    var posX = 0;
    var id = 0;
    // Tile X
    for(let i=0;i<viewport;i++){        
        var posY = 0;
        // Tile Y
        for(let j=0;j<viewport;j++){
            var height = 0//tileMap[id][1]
            drawTile(posX+height,posY+height,tileMap[id][0])
            posY += (res*scale) + space;
            id += 1;
        }
        posX += (res*scale) + space;
    }
}

// Loads texture and draws tile with specified parameters
function drawTile(posX,posY,texture){
    //ctx.setTransform(xAxis.x / 2, xAxis.y/2, yAxis.x / 2, yAxis.y / 2, origin.x, origin.y);
    ctx.setTransform(0.25,-1,1,0.5,200,200);
    var image = new Image();
    image.src = textures[texture];
    image.addEventListener("load",function(){
        ctx.drawImage(image,0,0,res,res,posX,posY,res*scale,res*scale);
    });
    
}

// Generates map with noise algorithm
function mapGen(){
    var myMap = []
    for(let i=0;i<mapSize*mapSize;i++){
        var myTile = Math.floor(Math.random() * 3);
        var myHeight = Math.floor(Math.random() * 5)*5;
        myMap.push([myTile, myHeight])
    }
    return myMap
}