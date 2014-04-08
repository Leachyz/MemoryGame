var match = [];
var matchcount = 0;
  

var clicks = 24;
// var storageAvailable = false;
//     if(typeof(Storage)!=="undefined")
//   {
//   storageAvailable = true; 
//   };
 
////////////////////////////////////////////////////////////////////////////////  
var createDeck = function() {
// based on code from http://www.brainjar.com/js/cards/default2.asp

  var ranks = ["A", "J", "Q", "K"];
  var suits = ["♣", "♠"];
  var j, k, index=0;
  var pack_size;

  pack_size = ranks.length * suits.length;
  var cards = [];
////////////////////////////////////////////////////////////////////////////////
  var audio = document.createElement('audio');
  audio.src = 'ding.mp3';
  audio.id = 'audio';
  var bod = document.getElementById('bod');
  bod.appendChild(audio);
  
//   var audio1 = document.createElement('audio1');
//   audio1.src = 'g.mp3';
//   audio1.id = 'audio1';
//   var bod1 = document.getElementById('bod1');
//   bod.appendChild(audio1);
  
////////////// //Fill the array with 'n' packs of cards.////////////////////////
  while (index < pack_size){
    for (j = 0; j < suits.length; j++){
       for (k = 0; k < ranks.length; k++){
          console.log("k:",k,"index:",index);
          cards[index] = {rank:ranks[k], suite:suits[j]};
          index++;
          }
       }
    }
  console.log(cards.length);
  return cards;
};
////////////////////////////////////////////////////////////////////////////////
var showCards = function(cardJSON) {
txt = cardJSON.rank + cardJSON.suite;    

var cardback= document.createElement("div");
cardback.style.backgroundImage ="url('th.jpg')";

cardback.className = 'cardback';

var cardfront= document.createElement("div");
cardfront.textContent = txt;
cardfront.className = 'cardfront';


var card2= document.createElement("div");
card2.className = "flipper";

card2.setAttribute("onclick", "flipper(this)");


var turnsleft = document.getElementById("remain1");
turnsleft.innerText = 'Number of turns remaining: ' + clicks;
var turnsleft = document.getElementById("remain");
turnsleft.innerText = 'Number of turns remaining: ' + clicks;
console.log(cardfront);
console.log(cardback);
console.log(card2);

card2.appendChild(cardfront);
card2.appendChild(cardback);


document.querySelector(".sideBox").appendChild(card2);
};
////////////////////////////////////////////////////////////////////////////////

var showDeck = function(deck){
    var idx;
    for (idx = 0; idx < deck.length; ++idx) {
            console.log("so far, so good",deck[idx]);
            showCards(deck[idx]);
    }
  
};
////////////////////////////////////////////////////////////////////////////////
window.onload=function(){

 


var deck = createDeck();
var deck3 = createDeck();
var card= deck.sort( function(){ return 0.5 - Math.random()});
var card3 =deck3.sort( function(){ return 0.5 - Math.random()});
showDeck(card);
showDeck(card3);


};

////////////////////////////////////////////////////////////////////////////////
alert("Make sure your game is saved before your tries are up!");

function flipper(flipme){
    
    if(flipme.classList.contains('turned'))
    {
        
        return ;

    }
    else
    {
        
        flipme.classList.add('turned');
        flipme.querySelector(".cardback").setAttribute("class", "click cardback");
        
        flipme.querySelector(".cardfront").setAttribute("class", "click cardfront");
        
        
        var cardinfo = flipme.querySelector(".cardfront").textContent;
        
        if(matchcount == 0 || matchcount == 1)
        {
            clicks--;
            clicks--;
            match[matchcount] = flipme;
            matchcount++;
           
            
            if(match[0].querySelector(".cardfront").textContent==match[1].querySelector(".cardfront").textContent)
            {
                alert('They Matched');
                  
            }
            else
            {
             
                alert('No Match');
                match[0].querySelector(".cardfront").classList.remove('click');
                match[0].querySelector(".cardback").classList.remove('click');
                match[1].querySelector(".cardfront").classList.remove('click');
                match[1].querySelector(".cardback").classList.remove('click');
                match[0].classList.remove('turned');
                match[1].classList.remove('turned');
               // match = [];
                matchcount = 0;
            }
            match = [];
            matchcount = 0;
           
        }

    document.getElementById("audio").play();
    }


 
}
////////////////////////////////////////////////////////////////////////////////
function myfunction() {
    var x;
    
    var person = prompt("Please enter your name:");
    
    if (person!==null)
      {
      x = "Hello " + person + "! Are you ready to win?";
    //   document.getElementById("save").innerHTML=x;
    //   localStorage.getElementById('save');
     document.getElementById("save").innerHTML=x;
      }
      
        
}
function myfunction1() {
    var x;
    
    var person = prompt("Please enter your name:");
    
    if (person!==null)
      {
      x = "Hello " + person + "! Are you ready to win?";
    //   document.getElementById("save").innerHTML=x;
    //   localStorage.getElementById('save');
     document.getElementById("save").innerHTML=x;
      }
      
        
}

////////////////////////////////////////////////////////////////////////////////
function resetNow(){
 location.reload();   
}
function resetNow1(){
 location.reload();   
}
////////////////////////////////////////////////////////////////////////////////

var game= document.getElementbyClassName("sideBox");
// //game;
var gaming = game[0].innerHTML;
// //gaming;
localStorage.win =JSON.stringyfy({"gaming": gaming});















