/// Techno-Sorcery Video Poker
// Hayden Buscher ~ 2022
var draw = false;
var cards = []; 
var bet = 5;
var incInterval = 0;
var balance = 100;
var balanceNew = 0;
var held = [false,false,false,false,false];
var incDraw = false;
var running = false;
var running2 = false;
var order = [];
let payoutAudio = new Audio('/files/js/poker/payout.mp3');
let payinAudio = new Audio('/files/js/poker/payin.mp3');
let pingAudio = new Audio('/files/js/poker/ping.mp3');
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

updateTable()
preload();
document.getElementById('balanceDisp').value = '$'.concat(balance);
document.getElementById('card1').setAttribute("disabled","disabled")

function preload() {
    var img;
    for (let i = 1; i <= 52; ++i) {
        img = new Image();
        img.src = "/files/js/cards/".concat(cardParse(i),'.svg');
    }
}

function betAmnt(){
	if(!running2){
		running2 =true;
		preload();
		document.getElementById('bet').disabled = true;
		for(let i=0;i<5;i++){
				document.getElementById('hold'.concat(i+1)).disabled = true;
				document.getElementById('holdImg'.concat(i+1)).disabled = true;
				document.getElementById('hold'.concat(i+1)).innerHTML = "Hold";
			}
		//Check if balance is too low
		if(!draw){
			balanceChange(-bet,true);
		} else betDraw();
	}
}

function betDraw(){
	if(!running){
		running = true;
		//Flip cards
		for(let i=0;i<5;i++){
			if(!draw) document.getElementById('text'.concat(i+1)).innerHTML = "&nbsp";
			if(!held[i]) document.getElementById('card'.concat(i+1)).src = "/files/js/cards/BLUE_BACK.svg";
		}
		setTimeout(function() {
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
						cards[i] = (Math.floor(Math.random() * (52) + 1));
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
			reveal();
		},200 );
	}
}

function reveal(){
	let newCards = [];
	for(let i=0;i<5;i++){
				document.getElementById('card'.concat(i+1)).src = "/files/js/cards/".concat(cardParse(cards[i]),'.svg');
	}
	pingAudio.play();
	held = [false, false, false, false, false];
	toggleDraw();
}

function toggleDraw(){
	draw = !draw;
	if(draw){
		document.getElementById('bet').innerHTML = "Draw";
		for(let i=0;i<5;i++){
			document.getElementById('hold'.concat(i+1)).disabled = false;
			document.getElementById('holdImg'.concat(i+1)).disabled = false;
		}
		document.getElementById('myList').disabled = true;
	} else {
		document.getElementById('bet').innerHTML = "Bet";
		document.getElementById('myList').disabled = false;
		let hand = handParse();
		//Set payout table style
		document.getElementById('table'.concat(hand)).className = 'selected';
		document.getElementById('hand'.concat(hand)).className = 'selected';
		//Change balance
		balanceChange((payTable[parseInt(hand)-1])*parseInt(bet),false);
	}
}

function hold(id){
	pingAudio.play();
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

function balanceChange(num,drawInc){
	clearInterval(incInterval);
	running2 = true;
	incDraw = drawInc;
	balanceNew= balance+num;
	if(balanceNew < 10){
			alert ("Balance too low! Resetting to $100...");
			balanceNew=100;
		}
	incInterval = setInterval(function(){
		requestAnimationFrame(balanceInc);
	}, 75);
}

function balanceInc(){
	if(balance != balanceNew){
		let thisPayinAudio = payinAudio.cloneNode();
		let thisPayoutAudio = payoutAudio.cloneNode();
		if(balanceNew - balance > 45){
			balance+=45;
			thisPayoutAudio.play();
		}else if(balanceNew > balance){
			balance+=1;
			thisPayoutAudio.play();
		}else{
			balance-=1;
			thisPayinAudio.play();
		}
	} else {
		clearInterval(incInterval);
		if(incDraw) betDraw();
			setTimeout(function() {
				document.getElementById('bet').disabled = false;
				running = false;
				running2 = false;
			},200);
	}
	document.getElementById('balanceDisp').value = '$'.concat(balance);
}

function handParse(){
	order = [...cards];
	let pairs = [1,1,1,1,1];
	let pairCheck = [true,true,true,true,true];
	let flush = true;
	let straight = true;
	let jacksOrBetter = false
	for(let i=0;i<5;i++){
		//Remove suit
		suitlessI = cards[i]%13;
		if(suitlessI == 0) suitlessI = 13;
		order[i] = order[i]%13;
		if(order[i] == 0) order[i] = 13;
		//Flush
		if(i<4 && cardParse(cards[i]).charAt(cardParse(cards[i]).length-1) != cardParse(cards[i+1]).charAt(cardParse(cards[i+1]).length-1)) flush = false;
		//Pairs
		for(let j=0;j<5;j++){
			let suitlessJ = cards[j]%13;
			if(suitlessJ == 0) suitlessJ = 13;
			if(pairCheck[i] && i!=j && suitlessI == suitlessJ){
				pairs[i]++;
				pairCheck[j]=false;
				//Jacks or better
				if((suitlessI >= 11 || suitlessI == 1) && suitlessI == suitlessJ && i!=j) jacksOrBetter = true;
			}
		}
	}
	//Sort
	order.sort(function(a, b){return a - b});
	//Number of pairs, Straight
	let twoPairs = 0;
	for(let i=0;i<5;i++){
		if(i<4 && !(order[i]+1 == order[i+1] || (order[i] == 13 && order[i+1] == 1 && i == 4))) straight = false;
		if(pairs[i] == 2) twoPairs++;
	}
	if(order.toString() == [1,10,11,12,13].toString()) straight = true;
	//Royal flush
	if(flush && (order.toString() == [1,10,11,12,13].toString())){
		return(1);
	//Straight flush
	} else if(flush && straight){
		return(2);
	//Four of a kind
	} else if(pairs.includes(4)) {
		return(3);
	//Full house
	} else if(pairs.includes(3) && pairs.includes(2)){
		return(4);
	//Flush
	} else if(flush){
		return(5);
	//Straight
	} else if(straight){
		return(6);
	//Three of a kind
	} else if(pairs.includes(3)){
		return(7);
	//Two pairs
	} else if(twoPairs == 2){
		return(8);
	//Jacks or better
	} else if(jacksOrBetter){
		return(9);
	//Junk
	} else{
		return(10);
	}
}
