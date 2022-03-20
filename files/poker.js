// Techno-Sorcery Video Poker
// Hayden Buscher ~ 2022
var draw = false;
var cards = []; 
var bet = 1;
var drawInterval = 0;
var balance = 100;
var held = [
	false,
	false,
	false,
	false,
	false
];
const payTable = [
	250,
	50,
	25,
	9,
	6,
	4,
	3,
	2,
	1
]

renderBalance();

function betDraw(){
	document.getElementById('bet').disabled = true;
	if(!draw){
		if(balance-bet < 10){
			alert ("Balance too low! Resetting to $100...");
			balance = 100+bet;
		}
		balance-=bet;
		renderBalance();
	}
	for(let i=0;i<5;i++){
		if(!draw) document.getElementById('text'.concat(i+1)).innerHTML = "&nbsp";
		if(!held[i]) document.getElementById('card'.concat(i+1)).src = "files/cards/BLUE_BACK.svg";
	}
	myInterval = setInterval(deal, drawInterval);
	drawInterval = 500;
}

function deal() {
	clearInterval(myInterval);
	// Generate array of random cards
	let tempCards = cards;
	cards = [];
	if(draw){
		for(let i=0;i<5;i++){
			if(held[i]) cards[i] = tempCards[i];
		}		
	}
	const rand = 0;
	for(let i=0;i<5;i++){
		let notEqual = false;
		while(!notEqual){
			if(!held[i]){
				cards[i] = Math.floor(Math.random() * 52);
			}
			let equalCount = 0;
			for(let j=0;j<5;j++){
				if(cards[i] == cards[j] && j != i){
					equalCount++;
				}
			}
			notEqual = (equalCount == 0);
		}
		document.getElementById('card'.concat(i+1)).src = "files/cards/".concat(cardParse(cards[i]),'.svg');
	}
	draw = !draw;
	if(draw){
		document.getElementById('bet').innerHTML = "Draw";
		for(let i=0;i<5;i++){
			document.getElementById('hold'.concat(i+1)).disabled = false;
		}	
		document.getElementById('myList').disabled = true;
	} else {
		document.getElementById('bet').innerHTML = "Bet";
		for(let i=0;i<5;i++){
			document.getElementById('hold'.concat(i+1)).disabled = true;
			document.getElementById('hold'.concat(i+1)).innerHTML = "Hold";
		}	
		document.getElementById('myList').disabled = false;
		handParse();
	}
	held = [false, false, false, false, false];
	document.getElementById('bet').disabled = false;
}

function hold(id){
	if(held[id-1]){
		document.getElementById('text'.concat(id)).innerHTML = "&nbsp";
		document.getElementById('hold'.concat(id)).innerHTML = "Hold";
		held[id-1] = false;
	} else {
		document.getElementById('text'.concat(id)).innerHTML = "Held";
		document.getElementById('hold'.concat(id)).innerHTML = "<b>Held</b>";
		held[id-1] = true;
	}
}

function updateTable(){
	let temp = document.getElementById('myList');
	bet = temp.options[temp.selectedIndex].text;
	for(let i=0;i<9;i++){
			document.getElementById('table'.concat(i+1)).innerHTML = payTable[i]*bet;
	}
	document.getElementById('tableMult1').innerHTML = 'x'.concat(bet);
	document.getElementById('tableMult2').innerHTML = 'x'.concat(bet);
}

function renderBalance(){
	document.getElementById('balanceDisp').value = '$'.concat(balance);
}

function handParse(){
	let flush = true;
	let straightR = true;
	let straightL = true;
	//Flush, straight
	for(let i=0;i<5;i++){
		if(i>0 && cardParse(cards[i]).charAt(1) != cardParse(cards[i-1]).charAt(1)) flush = false;
		if(i>0 && cardParse(cards[i]).charAt(1) <= cardParse(cards[i-1]).charAt(1)) straightR = false;
		if(i<4 && cardParse(cards[i].charAt(1) >= cardParse(cards[i+1]).charAt(1)) straightL = false;
		
	}
	
	console.log(flush);
	console.log(straightR);
	console.log(straightL);
}