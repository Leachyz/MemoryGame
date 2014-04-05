var numTurns = 0;

function shuffleCards(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

var createDeck = function() {
// based on code from http://www.brainjar.com/js/cards/default2.asp
  var ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9",
                        "10", "J", "Q", "K"];
  var suits = ["♣","♦","♥","♠"]; 
 // var j, k, 
var index=0;
  var pack_size = 16;

  // Set array of cards.
  // total number of cards
  //pack_size = ranks.length * suits.length;

  var cards = [];
  

  // Fill the array with 'n' packs of cards.
/*
  while (index < pack_size){
    for (j = 0; j < suits.length; j++){
       for (k = 0; k < ranks.length; k++){
          console.log("k:",k,"index:",index);
          cards[index] = {rank:ranks[k], suite:suits[j]};
          index++;
          }
       }
    }
*/
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
var clicked_cards = [];
var flip = function(ccard){
	ccard.setAttribute("class", "card click");	
	clicked_cards[num_click] = ccard;
	num_click++;
	if(num_click%2 == 0){
		if(clicked_cards[0].innerHTML == clicked_cards[1].innerHTML){
			document.querySelectorAll(".card.click")[0].setAttribute("class", "card show");
			document.querySelectorAll(".card.click")[1].setAttribute("class", "card show");
		}else{	
			document.querySelectorAll(".card.click")[0].setAttribute("class", "card");
			document.querySelectorAll(".card.click")[1].setAttribute("class", "card");
		}
		clicked_cards = []
		num_click = 0;
	}
}

