/// Techno-Sorcery Video Poker
// Hayden Buscher ~ 2022

var draw = false;
var bet = 5;
var incInterval = 0;
var balance = 100;
var balanceNew = 0;
var incDraw = false;
var running = false;
var running2 = false;
var order = [];
let payoutAudio = new Audio('js/poker/payout.mp3');
let payinAudio = new Audio('js/poker/payin.mp3');
let pingAudio = new Audio('js/poker/ping.mp3');

const tempTable = [
	250,
	50,
	25,
	9,
	6,
	4,
	3,
	2,
	1,
	0
];

const hands = [
	'Royal Flush',
	'Straight Flush',
	'Four-of-a-Kind',
	'Full House',
	'Flush',
	'Straight',
	'Three-of-a-Kind',
	'Two Pair',
	'Jacks or Better',
	'Junk'
];

addEventListener('keydown', (event) => {
	if ('12345'.includes(event.key) && draw){
		hold(parseInt(event.key))
	}
	else if (event.key === 'Enter'){
		betAmnt();
	}
});

preload();
document.getElementById('balanceDisp').value = '$'.concat(balance);
document.getElementById('card1').setAttribute("disabled","disabled")

row = new cardRow(5,0);


