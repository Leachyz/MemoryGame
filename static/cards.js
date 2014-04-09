var soundElement = document.getElementById("sound");
var supportStorage = false;
var username = document.querySelector("#player_instruction");
var userinfo = {"username": null, "turn": 24, "photo": null};
var userturn = document.querySelector("#player_turns");
var userpic = document.querySelector("#pic_instruction");
var cardcontainer = document.querySelector("#sideBox");

function saveData(userinfo){
    if(supportStorage) 
        localStorage.player = JSON.stringify(userinfo);
}

if(typeof(Storage)!==undefined) {
	supportStorage = true;
    	if(localStorage.player === undefined) 
        	saveData(userinfo);
    	else{
        	userinfo = JSON.parse(localStorage.player); 
        	if(userinfo.username != null) 
			username.innerHTML = "Hi, "+userinfo.username+"!";
		if(userinfo.photo != null) userpic.setAttribute("src", userinfo.photo); 
	}
}
function playSound(choice){
    if(choice == 1){ /*alert("OK");*/
        soundElement.setAttribute("src", "/static/sounds/turned.mp3");
        soundElement.play();
    }else if(choice == 2){ /*alert("OK");*/
        soundElement.setAttribute("src", "/static/sounds/matched.mp3");
        soundElement.play();
    }else if(choice == 3){ /*alert("OK");*/
        soundElement.setAttribute("src", "/static/sounds/unmatched.mp3");
        soundElement.play();
    }else{        
        soundElement.setAttribute("src", "/static/sounds/complete.mp3");
        soundElement.play();
    }
}

document.onload = function(){
	if(userinfo.username != null) 
		username.innerHTML = userinfo.username;
	displayTurn(userinfo.turn);
    	if(userinfo.photo != null) userpic.setAttribute("src", userinfo.photo);   
   	saveData(userinfo); 
}

username.onclick=function(){
    	var uName = prompt("Player, please enter your name.\n\n" + "\(Click \"OK\" to save your name\)");
	userinfo.username = uName;
    	saveData(userinfo);
    	if(uName != null) 
		this.innerHTML = "Hi, "+uName+"!" +" (edit)";
}

userpic.onclick=function(){
	if(userinfo.username != null) 
		var player = userinfo.username;
	var photo = prompt(player+ ", please enter url for profile pic.");
	userinfo.photo = photo;
	saveData(userinfo);
	if(photo != null) this.setAttribute("src", photo);
}
document.querySelector("#save_game").onclick = function(){
	if(supportStorage){
		localStorage.gamedata = cardcontainer.innerHTML;
	}else{
		alert("Local storage is not available. Try again later.");
	}
}


if (supportStorage && !isNaN(userinfo.turn)) {
	var turn = parseInt(userinfo.turn);
}else {
	var turn = 24;
}
userturn.innerHTML = turn;

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
document.querySelector("#sideBox").appendChild(card);
}

var showDeck = function(deck){
    var idx;
    for (idx = 0; idx < deck.length; ++idx) {
            console.log("so far, so good",deck[idx]);
            showCards(deck[idx]);
    }
}

if(supportStorage && localStorage.gamedata != undefined){
	cardcontainer.innerHTML = localStorage.gamedata;
}else{
	var deck = createDeck();
	showDeck(deck);
}


var num_click = 0;
var numTurns = 24;
var toMatch = 8;
var flip = function(ccard){
	num_click++;
	ccard.setAttribute("class", "card click");
	playSound(1);
	clicked = document.querySelectorAll(".card.click");     
	if(num_click%2 == 0){
		if(clicked[0].innerHTML == clicked[1].innerHTML){			
			setTimeout(function(){playSound(2);}, 1000);	
			//alert("Match");
			clicked[0].setAttribute("class", "card match");
			clicked[1].setAttribute("class", "card match");
		toMatch--;
		}else{	
			setTimeout(function(){
			playSound(3);
			clicked[0].setAttribute("class","card");
			clicked[1].setAttribute("class","card");
}, 1000);
		}
		num_click = 0;
		numTurns--;		
		if (numTurns == 0) {
			alert("Game Over! Start new game.");
			location.reload();
		}
		if (toMatch == 0) {
			playSound(4);
			setTimeout(function() {alert("Good going, you've won!")}, 1000);
		}
	userinfo.turn = numTurns;
	savaData(userinfo);
	userturn.innerHTML = numTurns;
	}
	
}

