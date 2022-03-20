// Techno-Sorcery Video Poker
// Hayden Buscher ~ 2022
var draw = false;
var cards = []; 
var bet = 1;
var drawInterval = 0;
var balance = 100;
var held = [false,false,false,false,false];
var revealCount = 0;
const payTable = [
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
	

renderBalance();

function betDraw(){
	document.getElementById('bet').disabled = true;
	//Check if balance is too low
	if(!draw){
		if(balance-bet < 10){
			alert ("Balance too low! Resetting to $100...");
			balance = 100+bet;
		}
		balance-=bet;
		document.getElementById('balAdd').innerHTML = '&nbsp';
		renderBalance();
	}
	//Flip cards
	for(let i=0;i<5;i++){
		if(!draw) document.getElementById('text'.concat(i+1)).innerHTML = "&nbsp";
		if(!held[i]) document.getElementById('card'.concat(i+1)).src = "files/cards/BLUE_BACK.svg";
	}
	myInterval = setInterval(deal, 500);
}

function deal() {
	clearInterval(myInterval);
	//Reset paytable highlighting
	for(let i=1;i<11;i++){
		document.getElementById('table'.concat(i)).className = '';
		document.getElementById('hand'.concat(i)).className = '';
	}
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
	}
	revealInterval = setInterval(reveal, 75);
}

function reveal(){
	while(held[revealCount] && revealCount < 5){
		revealCount++;
	}
	if(revealCount > 4){
		revealCount=0;
		clearInterval(revealInterval);
		document.getElementById('bet').disabled = false;
		toggleDraw()
	} else {
		document.getElementById('card'.concat(revealCount+1)).src = "files/cards/".concat(cardParse(cards[revealCount]),'.svg');
		revealCount++;
		let audio = new Audio('files/poker/ping.mp3');
		audio.play();
		console.log(revealCount);
	}
}

function toggleDraw(){
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
		let hand = handParse();
		//Set payout table style
		document.getElementById('table'.concat(hand)).className = 'selected';
		document.getElementById('hand'.concat(hand)).className = 'selected';
		//Change balance
		change = (payTable[parseInt(hand)-1])*parseInt(bet)
		if(change >0) document.getElementById('balAdd').innerHTML = '&nbsp+'.concat(change);
		balance+=change;
		renderBalance();
		
	}
	held = [false, false, false, false, false];
}

function hold(id){
	let audio = new Audio('files/poker/ping.mp3');
	audio.play();
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
	let pairs = [1,1,1,1,1];
	let pairCheck = [true,true,true,true,true];
	let jacksOrBetter = false;
	let suitless = [];
	for(let i=0;i<5;i++){
		//Flush
		if(i>0 && cardParse(cards[i]).charAt(cardParse(cards[i]).length-1) != cardParse(cards[i-1]).charAt(cardParse(cards[i-1]).length-1)) flush = false;
		//Straight R
		if(i>0 && cards[i]%13 == 0){
			if(cards[i-1]%13 != 12) straightR = false;
		} else if (i>0 && (cards[i]%13)-1 != cards[i-1]%13) straightR = false;
		//Straight L
		if(i>0 && cards[i-1]%13 == 0){
			if(cards[i]%13 != 12) straightL = false;
		} else if (i>0 && (cards[i-1]%13) != (cards[i]%13)+1) straightL = false;
		//Pairs
		for(let j=0;j<5;j++){
			if (pairCheck[i] && i!=j && cards[i]%13 == cards[j]%13){
				pairs[i]++;
				pairCheck[j]=false;
			}
			//Jacks or better
			if(cards[i]%13 >= 9 && cards[j]%13 >= 9 && i!=j) jacksOrBetter = true;
		}
		//Remove suit
		suitless[i] = cards[i]%13;
	}
	//Find how many pairs
	let twoPairs = 0;
	for(let i=0;i<5;i++){
		if(pairs[i] == 2) twoPairs++;
	}
	let straight = straightR||straightL;
	console.log('Flush: '.concat(flush));
	console.log('Straight: '.concat(straight));
	console.log('Pairs: '.concat(pairs));
	console.log('Jacks or better: '.concat(jacksOrBetter));
	console.log(' ');
	//Royal flush
	if(flush && (suitless.toString() == [8,9,10,11,12].toString() || suitless.toString() == [12,11,10,9,8].toString())){
		console.log('Royal flush');
		return(1);
	} else if(flush && straight){
		console.log('Straight flush');
		return(2);
	} else if(pairs.includes(4)) {
		console.log('4 of a kind');
		return(3);
	} else if(pairs.includes(3) && pairs.includes(2)){
		console.log('Full house');
		return(4);
	} else if(flush){
		console.log('Flush');
		return(5);
	} else if(straight){
		console.log('Straight');
		return(6);
	} else if(pairs.includes(3)){
		console.log('3 of a kind');
		return(7);
	} else if(twoPairs == 2){
		console.log('Two pairs');
		return(8);
	} else if(jacksOrBetter){
		console.log('Jacks or better');
		return(9);
	} else{
		console.log('Junk');
		return(10);
	}
}