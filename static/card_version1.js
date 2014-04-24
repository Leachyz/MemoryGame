var soundElement = document.getElementById("sound");
var supportStorage = false;
var username = document.querySelector("#player1_instruction");
var userinfo = {"username": "Player 1", "photo": "static/default_photo.png", "remaining_turns": 24};
var userinfo_mode2 = {"username": "Player 1", "photo": "static/default_photo.png", "matches": 0};
var userpic = document.querySelector("#pic1_instruction");
var userimage = document.querySelector("#player_photo");
var userturn = document.querySelector("#numTurns");
/*var usernummatches = document.querySelector("#numMatches1");*/
var enemyinfo = {"username": "Player 2", "photo": "static/default_photo.png", "matches": 0};

var cardcontainer = document.querySelector("#sideBox");
var optionsBox = document.querySelector("#displayOptions");
var retainer = document.querySelector("#hold_displayOptions");

var num_click = 0;
var toMatch = 8;
var numTurns = 24;
var mode = 0;

/*var enemyname = document.querySelector("#player2_instruction");
var enemynummatches = document.querySelector("#numMatches2");*/


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
retainer.style.height = window.innerHeight+"px";

function saveUserData(userinfo){
    if(supportStorage)
        localStorage.player = JSON.stringify(userinfo);
        localStorage.playerpic = JSON.stringify(userimage);
	if(mode==2)
        localStorage.player1 = JSON.stringify(userinfo_mode2);
        localStorage.player1image = JSON.stringify(userimage);
}

function saveEnemyInfo(enemyinfo){
    if(supportStorage)
        localStorage.player2 = JSON.stringify(enemyinfo);
        localStorage.player2pic = JSON.stringify(enemypic);
}

function getGamePlayMode(mode) {
	if(mode == 1) {
		if(typeof(Storage)!==undefined) {
			supportStorage = true;
		    	if(localStorage.player1 === undefined){ 
				saveUserData(userinfo);
			}else{
				userinfo = JSON.parse(localStorage.player1);
				numTurns = userinfo.turn;
				if(userinfo.username != null) 
					username.innerHTML = "Player 1, click here to set name.";
				if(userinfo.photo != null) userpic.setAttribute("src", userinfo.photo);
			} 
		}
	}else{
		if(typeof(Storage)!==undefined) {
			supportStorage = true;
		    	if(localStorage.player2 === undefined){ 
				saveEnemyInfo(enemyinfo);
			}else{
				enemyinfo = JSON.parse(localStorage.player2);
				if(enemyinfo.username != null) 
					enemyname.innerHTML = "Player 2, click here to set name.";
				if(enemyinfo.photo != null) enemypic.setAttribute("src", enemyinfo.photo);
			} 
		}
	}
}

function twoPlayerMode(){    
    if(mode == 2) {       
	alert("Enter twoPlayerMode");
        if(enemyinfo.username != null) enemyname.innerHTML = "Player 2, click here to set name.";
        if(enemyinfo.photo != null) document.querySelector("#player2_photo").setAttribute("src", enemyinfo.photo);
        document.querySelector("#numMatches2").innerHTML = enemyinfo.matches;
        document.querySelector("#player2_instruction").onclick=function(){
            if(enemyinfo.username != undefined) {
            var player = enemyinfo.username;
            }
            var usr = prompt(player+", please enter your name.\n\n" + "(Click \"OK\" to save your name.)");
            enemyinfo.username = usr;
            saveEnemyInfo(enemyinfo);
            if(usr != null) enemyname.innerHTML = "Hi, "+usr+"! (edit)";
        }
        document.querySelector("#pic2_instruction").onclick=function(){
		if(enemyinfo.username != undefined) 
			var playr = enemyinfo.username,
			ePhoto = prompt(playr+ ", please enter url for profile pic.");
            enemyinfo.photo = ePhoto;
            saveEnemyInfo(enemyinfo);
            if(ePhoto != null) document.querySelector("#player2_photo").setAttribute("src", ePhoto);
        }    
    }
}

function setPlayerMode(pmode){
    mode = (pmode == 1)? 1 : (pmode == 2)? 2 : 1;    
    if(mode == 2) document.querySelector(".player1_info").innerHTML += "<p id='vs'>VS</p><div class='player2_info'><p id='player2_instruction'>Player 2, click here to set name.</p><div id='enemyPic'><img src='static/default_photo.png' id='player2_photo' /><p id='pic2_instruction'>Click here to change profile pic.</p></div><p id='player2_matches'>Number of matches, <span id='numMatches2'>0</span></p></div>";
    enemyname = document.querySelector("#player2_instruction");
    enemypic = document.querySelector("#player2_photo");
    if(supportStorage) localStorage.mode = mode;
    document.body.removeChild(hold_displayOptions);
    showGame();
    document.querySelector(".player1_info").style.display = "block";
    startGame();
    enemyname.onclick=function(){
        var uusr = prompt("Player, please enter your name.\n\n" + "\(Click \"OK\" to save your name\)");
        userinfo.username = uusr;
        saveUserData(userinfo);
        if(uusr != null) this.innerHTML = "Hi, "+uusr+"! (edit)";
    }
    document.querySelector("#pic2_instruction").onclick=function(){
	if(userinfo.username != undefined) 
		var player = userinfo.username,
	uPhoto = prompt(player+ ", please enter url for profile pic.");
	else{
		var uPhoto = prompt(userinfo.username+", please enter url for profile pic.");
	}
	userinfo.photo = uPhoto;
	saveUserData(userinfo);
	if(uPhoto != null) document.querySelector("#player1_photo").setAttribute("src", uPhoto);
    }
    if(mode == 2) {twoPlayerMode();}
    alert("I'm really annoyed...");
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
		username.innerHTML = "Hi, "+userinfo.username;
    	if(userinfo.photo != null) 
		userpic.setAttribute("src", userinfo.photo);
		/*alert("Test1");*/
}

username.onclick=function(){
    	var uName = prompt(userinfo.username+", please enter your name.\n\n" + "\(Click \"OK\" to save your name\)");
	userinfo.username = uName;
    	saveUserData(userinfo);
    	if(uName != null) 
		this.innerHTML = "Hi, "+uName+"!" +" (edit)";
}

userpic.onclick=function(){
	if(userinfo.username != undefined) 
		var player = userinfo.username,
	uPhoto = prompt(player+ ", please enter url for profile pic.");
	else{
		var uPhoto = prompt(userinfo.username+", please enter url for profile pic.");
	}
	userinfo.photo = uPhoto;
	saveUserData(userinfo);
	if(uPhoto != null) document.querySelector("#player1_photo").setAttribute("src", uPhoto);
}

/*enemyname.onclick=function(){
    	var eName = prompt(userinfo.username+", please enter your name.\n\n" + "\(Click \"OK\" to save your name\)");
	userinfo.username = eName;
    	saveEnemyInfo(userinfo);
    	if(eName != null) 
		this.innerHTML = "Hi, "+eName+"!" +" (edit)";
}

enemypic.onclick=function(){
	if(userinfo.username != undefined) 
		var player = userinfo.username,
	ePhoto = prompt(player+ ", please enter url for profile pic.");
	else{
		var ePhoto = prompt(userinfo.username+", please enter url for profile pic.");
	}
	userinfo.photo = ePhoto;
	saveEnemyInfo(userinfo);
	if(ePhoto != null) document.querySelector("#player2_photo").setAttribute("src", ePhoto);
}*/

function saveGame() {
var uPhoto = "";
var ePhoto = "";
	if(supportStorage){
		localStorage.gamedata = cardcontainer.innerHTML;
		localStorage.userpic = uPhoto;
		if(mode==2)
			localStorage.enemypic = ePhoto;
		localStorage.remaining_turns = numTurns;
		localStorage.matches = toMatch;
		/*localStorage.match1 = uMatch;
		if(mode==2)
			localStorage.match2 = eMatch;*/
		saveUserData(userinfo);
		alert("Save game successful!\n\nGet 'em next time!");
	}else{
		alert("Local storage is not available. Try again later.");
	}
}

document.querySelector("#save_game").onclick = function(){saveGame()};

function restart(){
	userinfo.turn = 24;
	localStorage.removeItem("gamedata");
	localStorage.removeItem("matches");
	
	saveUserData(userinfo);
	location.reload();
}

document.querySelector("#reset_game").onclick =  function(){restart()};


function shuffleCards(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

var createDeck = function() {
// based on code from http://www.brainjar.com/js/cards/default2.asp
  var ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9",
                        "10", "J", "Q", "K"];
  var suits = ["♣","<span class='r'>♦</span>","<span class='r'>♥</span>","♠"]; 
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

function showGame() { 
	if(supportStorage && localStorage.gamedata != undefined && localStorage.matches != undefined){
		cardcontainer.innerHTML = ""+ 	localStorage.gamedata;
		numTurns = parseInt(localStorage.remaining_turns);
		toMatch = parseInt(localStorage.matches);
	}else{
		var deck = createDeck();
		showDeck(deck);
		if (mode == 1) {
		alert("This is a Memory Game - Ramoy style!\nClick a card to view the card then try to find a match.\nYou have 24 moves in which to achieve this.\nHave fun!\n\nNote: Wait 'til cards have flipped back over before choosing another.");
		}else{
			alert("This is a Memory Game - Ramoy style!\nPlayers please enter your names to the right.\nEach player should click a card to view the card then try to find a match.\nWhen all matches have been revealed, the game ends.\nThe player with the most matches win.\nHave fun!\n\nNote: Wait 'til cards have flipped back over before choosing another.");
		}
	}
			
}

function startGame(){
    if(supportStorage){
    mode = (localStorage.mode == undefined)? 1 : parseInt(localStorage.mode);} 
    if(getGamePlayMode(mode) === undefined) saveUserData(userinfo);
    else{
        userinfo = JSON.parse(getGamePlayMode(mode));
	if(mode==2) {
	enemyinfo = JSON.parse(getGamePlayMode(mode));
	}
        if(userinfo.username != null) username.innerHTML = "Player 1, click here to set name.";
	if (mode==2) {
        	if(userinfo.username != null) username.innerHTML = "Player 11, click here to set name.";
	}
        if(userinfo.photo != null) userpic.setAttribute("src", userinfo.photo);     
        document.querySelector("#player1_matches").innerHTML = userinfo.matches;
    }            
    if(mode == 2){
        if(localStorage.enemy == undefined)
            saveEnemyInfo(enemyinfo);
        else
            enemyinfo = JSON.parse(localStorage.enemy);
    }
     /*alert("This is a memory game. For each correct answer you get 3 points, while for each wrong answer 1 point will be deducted from your score. \n\r Note. the game will automatically save your progress");*/

    /*if(userinfo.username != null) username.innerHTML = userinfo.username;*/
    if(userinfo.photo != null) userpic.setAttribute("src", userinfo.photo);   
    saveUserData(userinfo);
    /*userturn.innerHTML = user_turn;*/
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
		clicked = [];
		}else{	
			setTimeout(function(){
			playSound(3);
			clicked[0].setAttribute("class","card");
			clicked[1].setAttribute("class","card");}, 1000);
		}
		num_click = 0;
		numTurns--;		
		if (numTurns == 0) {
			alert("Game Over! Start new game.");
			restart();
			/*alert("Click \"Restart\" to start a new game.");*/
		}
		if (toMatch == 0) {
			playSound(4);
			setTimeout(function() {alert("Good going, you've won!"); restart();}, 1000);
			
		}
	userinfo.turn = numTurns;
	userturn.innerHTML = numTurns;
	}
	
}


/*Example1: Name: Jestina, url for pic: https://fbcdn-sphotos-b-a.akamaihd.net/hphotos-ak-ash4/t1.0-9/1487362_10152778410190550_2848720520749792450_n.jpg */
/*Example2: Name: Ramoy, url for pic: http://www.bubblews.com/assets/images/news/801720367_1393523485.jpg */
/*Example3: Name: Kevin, url for pic: http://www.gospelreggae.com/images/albums/349.jpg */
/*Example4: Name: Nicki, url for pic: http://www.eonline.com/eol_images/Entire_Site/2013022/634.NickiMinaj.ms.012213_copy.jpg */

