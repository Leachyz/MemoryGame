var audioElement = document.getElementById("audio");
var supportStorage = false;
if(typeof(Storage)!==undefined)
	supportStorage = true;


function shuffleCards(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

var createDeck = function() {
// based on code from http://www.brainjar.com/js/cards/default2.asp
  var ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9",
                        "10", "J", "Q", "K"];
  var suits = ["♣","<span class='r'>♦</span>","<span class='r'>♥</span>","♠"]; 
 // var j, k, 
  var index=0;
  var pack_size = 16;

  // Set array of cards.
  // total number of cards
  //pack_size = ranks.length * suits.length;

  var cards = [];
  

  // Fill the array with 'n' packs of cards.

  while(index < pack_size){
	rank_index = Math.floor(Math.random() * 13);
        console.log(rank_index);
	suite_index = Math.floor(Math.random() * 4);
	cards[index++] = {rank:ranks[rank_index], suite:suits[suite_index]};
	cards[index++] = {rank:ranks[rank_index], suite:suits[suite_index]};
  }
  cards = shuffleCards(cards);
  console.log(cards.length);
  return cards;
}

var showCards = function(cardJSON) {    
card = document.createElement("p");
card.innerHTML = "<div class='face-fwd'></div><div class='face-back'><span class='suite'>"+cardJSON.suite+"</span><span class='rank'>"+cardJSON.rank+"</span></div>";
card.className = "card";
card.setAttribute ("onclick", "flip(this)");
console.log(card);
document.querySelector(".sideBox").appendChild(card);
}

var showDeck = function(deck){
    var idx;
    for (idx = 0; idx < deck.length; ++idx) {
            console.log("so far, so good",deck[idx]);
            showCards(deck[idx]);
    }
}

var deck = createDeck();
showDeck(deck);


var num_click = 0;
var numTurns = 0;
var flip = function(ccard){
	num_click++;
	ccard.setAttribute("class", "card click");
	clicked = document.querySelectorAll(".card.click");     
	if(num_click%2 == 0){
		if(clicked[0].innerHTML == clicked[1].innerHTML){	
			alert("Match");
			clicked[0].setAttribute("class", "card match");
			clicked[1].setAttribute("class", "card match");
		}else{	
			alert("No Match");
			clicked[0].setAttribute("class","card");
			clicked[1].setAttribute("class","card");
		}
		num_click = 0;
		numTurns++;
		if (numTurns == 24) {
			alert("Game Over! Start new game.");
			location.reload();
		}
	}
	
}

