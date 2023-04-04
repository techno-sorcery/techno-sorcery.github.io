// Video Poker Library
// Hayden Buscher ~ 2023

// Preload card images
function preload() {
    var img;
    for (let i = 1; i <= 52; ++i) {
        img = new Image();
        img.src = "js/cards/".concat(cardParse(i),'.svg');
    }
}

// Define pay table object
class payTable {
	constructor(values) {
		this.values = values;
	}
}

// Define card object
class card {
	constructor(id) {
		this.num = -1;
		this.suitless = -1;
		this.id = id;
		this.held = false;
		this.disp(false);
	}

	// Set card number
	setSuite(num){
		this.num = num;
		this.suitless = num % 13;
		if(this.suitless == 0){
			this.suitless = 13;
		}
	}

	// Update card graphic
	disp(revealed){

		// Card shown
		if(revealed){
			document.getElementById('card'.concat(this.id)).src = "js/cards/".concat(cardParse(this.num),'.svg');

		// Card flipped
		} else {
			document.getElementById('card'.concat(this.id)).src = "js/cards/BLUE_BACK.svg";
		}

		// Card held
		if(this.held){
			document.getElementById('text'.concat(this.id)).innerHTML = "Held";

		// Card not held
		} else {
			document.getElementById('text'.concat(this.id)).innerHTML = "&nbsp";
		}
	}
}

// Define card row object
class cardRow {
	constructor(numCards, baseId) {
		var cards = [];

		// Add cards to array
		for(let id = 0;id < numCards;id++){
			cards.append(new card(id + baseId));
		}
	}

	// Cover cards
	cover(){
		for(let myCard in cards){
			myCard.disp(false)
		}
	}

	// Uncover cards
	uncover(){
		for(let myCard in cards){
			myCard.disp(true);
		}
	}

	// Draw set of random cards
	randomize() {

		// Set cards to random values
		for(let myCard in cards){
			if(myCard.hold){
				myCard.num = (Math.floor(Math.random() * (52) + 1));
			}
		}

		// Replace duplicate card values
		for(let myCard in cards){
			unique = false;

			// Compare until value is unique
			while(!unique){
				unique = true;

				// Compare against rest of row
				for(compCard in cards){
					if(compCard.id != myCard.id && compCard.num == myCard.num){
						unique = false
					}
				}

				// If duplicate, set to new value
				if(!unique){
					myCard.num = (Math.floor(Math.random() * (52) + 1));
				}
			}
		}
	}
}