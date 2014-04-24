var soundElement = document.getElementById("sound");
var supportStorage = false;
var username = document.querySelector("#player1_instruction");
var userinfo = {"username": null, "turn": 24, "photo": null};
var userturn = document.querySelector("#numTurns1");
var userpic = document.querySelector("#pic1_instruction");
var userimage = document.querySelector("#player1_photo");
var userinfo = {"username": null, "turn": 24, "photo": null};
var userinfo_mode2 = {"username": null, "photo": null, "match": 0};

var enemyname;
var enemypic = document.querySelector("#pic2_instruction");
var enemyimage = document.querySelector("#player2_photo");
var enemyinfo = {"username": null, "photo": null, "match": 0};
var cardcontainer = document.querySelector("#sideBox");
var retainer = document.querySelector("#hold_displayOptions");
var num_click = 0;
var numTurns = 24;
var toMatch = 8;
var numMatch1 = 0;
var numMatch2 = 0;
var mode = 1;
var player_turn = 1;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
retainer.style.height = window.innerHeight+"px";

function saveUserData(userinfo){
    if(supportStorage && mode==1) 
        localStorage.player = JSON.stringify(userinfo);
    else if(supportStorage && mode==2) 
        localStorage.player1 = JSON.stringify(userinfo);
}

function saveEnemyData(enemyinfo){
    if(supportStorage) 
        localStorage.player2 = JSON.stringify(enemyinfo);
}

if(typeof(Storage)!==undefined) {
	supportStorage = true;    
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

function setPlayerMode(pmode) {
	if (pmode==1) {
		mode = 1;
		startGame();
	}else{
		mode = 2;
	}
	document.body.removeChild(hold_displayOptions);
	if(pmode==2) {
		twoPlayerMode();
		startGame();
	}
}

function twoPlayerMode() {
	if(mode==2) {		
		document.querySelector("#player_details").innerHTML = "<div class='player1_info'><p onclick='changeUsername(this)' id='player1_instruction'>Player 1, click here to set name.</p><div id='photo'><img src='static/default_photo.png' id='player1_photo' /><p id='pic1_instruction' onclick='changeUserImage()'>Click here to change profile pic.</p></div><p id='player1_matches'>Number of matches, <span id='numMatches1'>0</span></p></div>" + "<p id='vs'>VS</p><div class='player2_info'><p onclick='changeEnemyname(this)' id='player2_instruction'>Player 2, click here to set name.</p><div id='enemyPic'><img src='static/default_photo.png' id='player2_photo' /><p id='pic2_instruction' onclick='changeEnemyImage()'>Click here to change profile pic.</p></div><p id='player2_matches'>Number of matches, <span id='numMatches2'>0</span></p>";
	document.querySelector("#player_details").style.display = "block";
	}
}

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
  /*console.log(cards.length);*/
  return cards;
}

var showCards = function(cardJSON) {    
card = document.createElement("div");
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

/*loads saved data*/
if (supportStorage && !isNaN(userinfo.turn)) {
	var turn = parseInt(userinfo.turn);
}else {
	var turn = 24;
}
userturn.innerHTML = turn;

function startGame() {
    userimage = document.querySelector("#player1_photo");
    enemyimage = document.querySelector("#player2_photo");
    enemyname = document.querySelector("#player2_instruction");
    username = document.querySelector("#player1_instruction");
    usernumMatches = document.querySelector("#numMatches1");
    enemynumMatches = document.querySelector("#numMatches2");
	if (mode==1) {
		/*console.log(localStorage.gamedata);*/
	    if(supportStorage && localStorage.player === undefined){ 
            	saveUserData(userinfo);
        }else{
            userinfo = JSON.parse(localStorage.player);
            numTurns = userinfo.turn;
            userturn.innerHTML = numTurns;
            uPhoto = userinfo.photo;
            uNumMatches = userinfo.matches1;
    	    if(userinfo.username != null) 
                username.innerHTML = "Hi, "+userinfo.username+"! (edit)";
            if(userinfo.photo != null) userimage.setAttribute("src", userinfo.photo);
        }
        if(supportStorage && localStorage.gamedata != undefined && localStorage.matches != undefined){                
		    cardcontainer.innerHTML = ""+ localStorage.gamedata;
		    toMatch = parseInt(localStorage.matches);
	    }else{
		    var deck = createDeck();
		    showDeck(deck);
		    alert("This is a Memory Game - Ramoy style!\nClick a card to view the card then try to find a match.\nYou have 24 moves in which to achieve this.\nHave fun!\n\nNote: Wait 'til cards have flipped back over before choosing another.");
	    }
	}else if(mode == 2) {
	    if(localStorage.player1 === undefined){ 
            	saveUserData(userinfo_mode2);
        }else{
            userinfo_mode2 = JSON.parse(localStorage.player1);
    	    if(userinfo_mode2.username != null) 
                username.innerHTML = "Hi, "+userinfo_mode2.username+"! (edit)";
            if(userinfo_mode2.photo != null) userimage.setAttribute("src", userinfo_mode2.photo);
        }
        if(localStorage.player2 === undefined){ 
            	saveEnemyData(enemyinfo);
	    }else{
            enemyinfo = JSON.parse(localStorage.player2);
            if(enemyinfo.username != null) 
			    enemyname.innerHTML = "Hi, "+enemyinfo.username+"! (edit)";
		    if(enemyinfo.photo != null) enemyimage.setAttribute("src", enemyinfo.photo);
	    }
		if(supportStorage && localStorage.gamedata_mode2 != undefined){
			/*console.log(localStorage.gamedata);*/
			cardcontainer.innerHTML = ""+ localStorage.gamedata_mode2;
		}else{
			var deck = createDeck();
			showDeck(deck);
			alert("This is a Memory Game - Ramoy style!\nPlayers please enter your names to the right.\nEach player should click a card to view the card then try to find a match.\nWhen all matches have been revealed, the game ends.\nThe player with the most matches win.\nHave fun!\n\nNote: Wait 'til cards have flipped back over before choosing another.");
		}
	}
}

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
		    if (player_turn==1 && mode==2) {
		        userinfo_mode2.match++;
		        usernumMatches.innerHTML = userinfo_mode2.match;
		    }else if(player_turn==2 && mode==2) {
		        enemyinfo.match++;
		        enemynumMatches.innerHTML = enemyinfo.match;
		        }
		    clicked = [];
		}else{	
			setTimeout(function(){
			playSound(3);
			clicked[0].setAttribute("class","card");
			clicked[1].setAttribute("class","card");
		    if (player_turn==1) {
			    player_turn = 2;
		    }else if(player_turn==2) {
			    player_turn = 1;
			}
            }, 1000);
		}
		num_click = 0;
		numTurns--;		
		if (numTurns == 0 && toMatch == 8) {
			alert("Game Over! Start new game.");
			restart();
			/*alert("Click \"Restart\" to start a new game.");*/
		}
		if (toMatch == 0) {
			playSound(4);
			if (mode==1) {
			    setTimeout(function() {alert("Good going, you've won!"); restart();}, 1000);
			}else if(mode==2) {
			    if (userinfo_mode2.match == enemyinfo.match) {
			        setTimeout(function() {alert("Whoops! It's a tie.\nBattle it out again to see who wins!"); restart();}, 1000);
			    }else if(userinfo_mode2.match > enemyinfo.match) {
			        setTimeout(function() {alert("Good going, "+userinfo_mode2.username+", you've won!"); restart();}, 1000);
			    }else if(userinfo_mode2.match < enemyinfo.match) {
			        setTimeout(function() {alert("Good going, "+enemyinfo.username+", you've won!"); restart();}, 1000);
			    }
			}
			
		}
	userinfo.turn = numTurns;
	userturn.innerHTML = numTurns;
	}
	 
}

/*document.onload = function(){
	if(userinfo.username != null) 
		username.innerHTML = userinfo.username;
    	if(userinfo.photo != null) 
		userpic.setAttribute("src", userinfo.photo);
}*/


username.onclick = function(){
	changeUsername(this);
}

function changeUsername(player1_name){
    	var uName = prompt("Player, please enter your name.\n\n" + "\(Click \"OK\" to save your name\)");
	if(mode == 1){
		userinfo.username = uName;
		saveUserData(userinfo);	
	}else if(mode == 2){
		userinfo_mode2.username = uName;	
		saveUserData(userinfo_mode2);
	}
    if(uName != null) 
		player1_name.innerHTML = "Hi, "+uName+"!"+" (edit)";
}

userpic.onclick = function(){
	changeUserImage(this);
}

function changeUserImage(){
    if(mode==1) {
	    if(userinfo.username != undefined) 
		    var player = userinfo.username,
	    uPhoto = prompt(player+ ", please enter url for profile pic.");
	    else{
		    var uPhoto = prompt("Player, please enter url for profile pic.");
	    }
	    userinfo.photo = uPhoto;
	    if(uPhoto != null) userimage.setAttribute("src", userinfo.photo);
	    saveUserData(userinfo);
	}else if(mode==2) {
	    if(userinfo_mode2.username != undefined) 
		    var player = userinfo_mode2.username,
	    uPhoto = prompt(player+ ", please enter url for profile pic.");
	    else{
		    var uPhoto = prompt("Player, please enter url for profile pic.");
	    }
	    userinfo_mode2.photo = uPhoto;
	    if(uPhoto != null) userimage.setAttribute("src", userinfo_mode2.photo);
	    saveUserData(userinfo_mode2);
	}
}

function changeEnemyname(player2_name){
    	var eName = prompt("Player, please enter your name.\n\n" + "\(Click \"OK\" to save your name\)");
	enemyinfo.username = eName;
    	if(eName != null) 
		player2_name.innerHTML = "Hi, "+eName+"!"+" (edit)";
    	saveEnemyData(enemyinfo);
}

function changeEnemyImage(){
	if(enemyinfo.username != undefined) 
		var player = enemyinfo.username,
	ePhoto = prompt(player+ ", please enter url for profile pic.");
	else{
		var ePhoto = prompt("Player, please enter url for profile pic.");
	}
	enemyinfo.photo = ePhoto;
	if(ePhoto != null) enemyimage.setAttribute("src", enemyinfo.photo);
	saveEnemyData(enemyinfo);
}

document.querySelector("#save_game").onclick = function(){
	if(supportStorage){
	    if(mode==1){
    /*console.log(cardcontainer.innerHTML);*/
		    localStorage.gamedata = cardcontainer.innerHTML;
		    localStorage.matches = toMatch;
		    saveUserData(userinfo);
		    alert("Get 'em next time!\nSave game successful!");
	    }else if(mode==2){
    /*console.log(cardcontainer.innerHTML);*/
		    localStorage.gamedata_mode2 = cardcontainer.innerHTML;
		    userinfo_mode2.match = numMatch2;
		    enemyinfo.match = numMatch1;
		    saveUserData(userinfo_mode2);
		    saveEnemyData(enemyinfo);
		    alert("You can battle it out next time!\nSave game successful!");
	    }else{
		    alert("Local storage is not available. Try again later.");
	    }
	}
}

function restart(){
	userinfo.turn = 24;
	if(mode == 1){
        localStorage.removeItem("gamedata"); 
	    localStorage.player.match = 0;
	    localStorage.player.turn = 24;
	}else if(mode == 2){
	    localStorage.removeItem("gamedata_mode2");
	    localStorage.player1.match = 0;
	    localStorage.player2.match = 0;
    }
	
	
	/*saveUserData(userinfo);*/
	location.reload();
}
document.querySelector("#reset_game").onclick =  function(){restart()};

