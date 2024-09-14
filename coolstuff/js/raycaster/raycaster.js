// Intersection Algorithm
// Hayden Buscher ~ 2024
// Sola Deo gloria

const width = 640;
const height = 480;
const pixelSize = 30;
const gapSize = 1;

const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");


render();


function render() {

    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            if (map[row][col]) ctx.fillStyle = "red";
            else ctx.fillStyle = "white";

            ctx.fillRect(col * (pixelSize + gapSize) + gapSize, row * (pixelSize + gapSize) + gapSize, pixelSize, pixelSize);
        }
    }
}
