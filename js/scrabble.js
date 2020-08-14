/*	DOCTYPE JS
	File:  scrabble.js
	Name: Kyle Marcoux
    Email: kyle_marcoux@student.uml.edu
    Umass Lowell 91.61 GUI Programming 1
    Created 8/09/20
    This is the javascript for scrabble, it handles all of the computation
	of the game itself
*/

 
	/* These are my global variables, here I put the array, the wordArr, which holds the
	current letters on the board, and a variable to hold the point value of those tiles
	This array is from the pdf, its the example by Jesse M. Heines
	I will be editing it to be simpler looking */

var ScrabbleTiles = [] ;
	ScrabbleTiles["A"] = { "value" : 1,  "max" : 9,  "bank" : 9  ,	"inUse" : 0} ;
	ScrabbleTiles["B"] = { "value" : 3,  "max" : 2,  "bank" : 2  ,	"inUse" : 0} ;
	ScrabbleTiles["C"] = { "value" : 3,  "max" : 2,  "bank" : 2  ,	"inUse" : 0} ;
	ScrabbleTiles["D"] = { "value" : 2,  "max" : 4,  "bank" : 4  ,	"inUse" : 0} ;
	ScrabbleTiles["E"] = { "value" : 1,  "max" : 12, "bank" : 12 ,	"inUse" : 0} ;
	ScrabbleTiles["F"] = { "value" : 4,  "max" : 2,  "bank" : 2  ,	"inUse" : 0} ;
	ScrabbleTiles["G"] = { "value" : 2,  "max" : 3,  "bank" : 3  ,	"inUse" : 0} ;
	ScrabbleTiles["H"] = { "value" : 4,  "max" : 2,  "bank" : 2  ,	"inUse" : 0} ;
	ScrabbleTiles["I"] = { "value" : 1,  "max" : 9,  "bank" : 9  ,	"inUse" : 0} ;
	ScrabbleTiles["J"] = { "value" : 8,  "max" : 1,  "bank" : 1  ,	"inUse" : 0} ;
	ScrabbleTiles["K"] = { "value" : 5,  "max" : 1,  "bank" : 1  ,	"inUse" : 0} ;
	ScrabbleTiles["L"] = { "value" : 1,  "max" : 4,  "bank" : 4  ,	"inUse" : 0} ;
	ScrabbleTiles["M"] = { "value" : 3,  "max" : 2,  "bank" : 2  ,	"inUse" : 0} ;
	ScrabbleTiles["N"] = { "value" : 1,  "max" : 6,  "bank" : 6  ,	"inUse" : 0} ;
	ScrabbleTiles["O"] = { "value" : 1,  "max" : 8,  "bank" : 8  ,	"inUse" : 0} ;
	ScrabbleTiles["P"] = { "value" : 3,  "max" : 2,  "bank" : 2  ,	"inUse" : 0} ;
	ScrabbleTiles["Q"] = { "value" : 10, "max" : 1,  "bank" : 1  ,	"inUse" : 0} ;
	ScrabbleTiles["R"] = { "value" : 1,  "max" : 6,  "bank" : 6  ,	"inUse" : 0} ;
	ScrabbleTiles["S"] = { "value" : 1,  "max" : 4,  "bank" : 4  ,	"inUse" : 0} ;
	ScrabbleTiles["T"] = { "value" : 1,  "max" : 6,  "bank" : 6  ,	"inUse" : 0} ;
	ScrabbleTiles["U"] = { "value" : 1,  "max" : 4,  "bank" : 4  ,	"inUse" : 0} ;
	ScrabbleTiles["V"] = { "value" : 4,  "max" : 2,  "bank" : 2  ,	"inUse" : 0} ;
	ScrabbleTiles["W"] = { "value" : 4,  "max" : 2,  "bank" : 2  ,	"inUse" : 0} ;
	ScrabbleTiles["X"] = { "value" : 8,  "max" : 1,  "bank" : 1  ,	"inUse" : 0} ;
	ScrabbleTiles["Y"] = { "value" : 4,  "max" : 2,  "bank" : 2  ,	"inUse" : 0} ;
	ScrabbleTiles["Z"] = { "value" : 10, "max" : 1,  "bank" : 1  ,	"inUse" : 0} ;
	ScrabbleTiles["_"] = { "value" : 0,  "max" : 2,  "bank" : 2  ,	"inUse" : 0} ;
	
var wordArr = ["","","","","","","",""];
var currentScore = 0;


/* addLetter takes the ID of the tile, the ID of the space its on, and the multiplier of that tile.
It grabs the value associated with the tile, multiplies it accordingly and adds it to the 
current score.  It then takes letter and adds it to the wordArr array which holds 7 letters,
one for each space on the board. */ 

function addLetter(tileID, dropID, multi){
	// Grabs the value from tileID and gets its position in the array from the dropID
	var val = document.getElementById(tileID).getAttribute('value');
	var index = parseInt(dropID.substring(1));
	
	// Sets the letter in its proper positiona and adds its to the score
	wordArr[index] = val;
	currentScore += ScrabbleTiles[val].value * multi;
	
	var w = document.getElementById("word");
	w.innerHTML = buildWord();
	
}

// buildWord adds up all of the characters in the array and sends it back as a string.
	
function buildWord(){
	var string = "";	
	
	// Iterates through the word array to build the string
	for(var i = 0; i <= 7; i++){
		string += wordArr[i];
	}
	
	// Appends the current score of the letters to the word
	string+=" [" + currentScore + "]";
	
	return string;
}

// resetHand goes through the array and sets every letter to a non-breaking space.

function resetHand(){
	wordArr = ["","","","","","","",""];
	
	// Resets Score and current word field
	currentScore = 0;
	var w = document.getElementById("word");
	w.innerHTML = "";
	
	// Locks all dropzones 
	$("#d2").droppable({disabled: true});
	$("#d3").droppable({disabled: true});
	$("#d4").droppable({disabled: true});
	$("#d5").droppable({disabled: true});
	$("#d6").droppable({disabled: true});
	$("#d7").droppable({disabled: true});
}

/*  This will take the word array and subract its tiles from the tiles left.  It will also
add the score of the word to the total, and then if it runs out of tiles it will end 
the game.*/

function submitWord(){
	// This adds the currentScore global variable to the score and sets it to the score holder
	var s = document.getElementById("score");
	var sTemp = parseInt(s.innerHTML);
	s.innerHTML = sTemp + currentScore;
	
	// This parses the tiles left so it can be adjusted accordingly
	var t = document.getElementById("tilesLeft");
	var tTemp = parseInt(t.innerHTML);
	
	// This iterates through and for every tile that isnt a placeholer, it subtracts one from tiles left.
	for(var i = 1; i <= 7; i++){
		if(wordArr[i]!=""){
			tTemp--;
			if(tTemp == 0){
				i=7;
			}
		}
	}
	
	// This sets the tile left to the holder so the user can see whats left 
	t.innerHTML = tTemp;
	
	// This checks if the game is over, and if not, move to the next hand.
	if(tTemp == 0){
		endGame();
	}
	else{
		for(var i = 1; i < 7; i++){
			if(wordArr[i]!=""){
				i - singleShuffle(i);
			}
		}
	}
	resetHand();
}

// This shuffles the tiles and give out new ones.  Based on an algorithm of randomly
// picking a number 1-27 and if the number is 28 itll give a blank tile.  

function shuffle(){
	/*  First it calls resetUsage to change all inUse values to 0, this is so it can shuffle out a 
	correct amount of tiles in regards to the amount left in the bank.  I will say that upon 
	implementing this function and the inUse variable I have not seen anything that would violate 
	the max amount allowed.  This could be RNG however.  */
	resetUsage();
	
	// This loop grabs the value of the piece div and image, it sets the new tile image and then takes the 
	// value attribute in the div and sets the new letter value to it!
	for(var i = 1; i <= 7; i++){
		var tile = document.getElementById("pi" + i);
		var tileVal = document.getElementById("p" + i);
		var rand = Math.floor((Math.random() * 28)+1);
		var index = String.fromCharCode(rand + 64);
			
		// This if else handles the 26 letters and then the blank case.  It also iterates the inUse 
		// variable because this will tell if theres too many of that letter in play.
		if(rand < 27){
			tile.src = "hw8files/tiles/" + index + ".jpg";
			tileVal.setAttribute("value", index);
			ScrabbleTiles[index].inUse ++;
		}
		else{
			index = "_";
			tile.src = "hw8files/tiles/" + "Blank" + ".jpg";
			tileVal.setAttribute("value", index);
			ScrabbleTiles[index].inUse++;
			//alert(ScrabbleTiles[index].inUse);
		}
		
		// This checks to see if the bank is completely empty, and if so it forcefully breaks the loop by
		// making i = 7.
		if(ScrabbleTiles[index].bank == 0 || ScrabbleTiles[index].inUse==ScrabbleTiles[index].bank){
			i--;
			if(bankEmpty()){
				i=7;
			}
		}
	}
}

// This shuffles a single character, it will be called in a loop to shuffle and assume that not every
// tile will be used when the word is submitted.

function singleShuffle(x){
	// This gets the pi# and p# id's using the value sent over.  Then generates a random number.
	var tile = document.getElementById("pi" + x);
	var tileVal = document.getElementById("p" + x);
	
	var rand = Math.floor((Math.random() * 28)+1);
	var index = String.fromCharCode(rand + 64);
		
	// This if else handles the 26 letters and then the blank case.  It also iterates the inUse 
	// variable because this will tell if theres too many of that letter in play.
	if(rand < 27){
		tile.src = "hw8files/tiles/" + index + ".jpg";
		tileVal.setAttribute("value", index);
		ScrabbleTiles[index].inUse ++;
	}
	else{
		index = "_";
		tile.src = "hw8files/tiles/" + "Blank" + ".jpg";
		tileVal.setAttribute("value", index);
		ScrabbleTiles[index].inUse++;
	}
	
	// This checks to see if the bank is completely empty, and if so it stops recursion, otherwise
	// if it shuffles to a letter that has no remaining tiles it will recursively shuffle again
	if(ScrabbleTiles[index].bank == 0 || ScrabbleTiles[index].inUse==ScrabbleTiles[index].bank){
		if(bankEmpty()){
			
		}
		else{
			// Getting rid of recursion seems to fix the bug in the submission file.
			//shuffleSingle(x);
			return 1;
		}
	}
	return 0;
}

// This resets all of the usage flags for each tile, to ensure that there aren't any extra tiles

function resetUsage(){
	var iter = "";
	
	// Iterates through all of the banks to check for empty ones
	for(var i = 1; i < 27; i++){
		iter = String.fromCharCode(i + 64);
		ScrabbleTiles[iter].inUse = 0;
	}
	// Takes into account the blank space because "_" isnt after Z in code.
	if(ScrabbleTiles["_"].bank == 0){
		ScrabbleTiles["_"].inUse = 0;
	}
}

// This will check if each slot in the bank is empty, and if it gets to the end and every slow is empty
// it will return true.

function bankEmpty(){
	var empty = 0;
	
	// Iterates through all of the banks to check for empty ones
	for(var i = 1; i < 27; i++){
		var iter = "";
		iter = String.fromCharCode(i + 64);
		
		if(ScrabbleTiles[iter].bank == 0){
			empty++;
		}
	}
	// Takes into account the blank space because "_" isnt after Z in code.
	if(ScrabbleTiles["_"].bank == 0){
		empty++;
	}
	
	// Returns true if the tiles are completely empty, false if not.
	if(empty==28){
		return true;
	}
	else{
		return false;
	}
}

// This is a reset game button to refresh the page and start over.  Originally I was going
// to reset every div and value but I feel like this is a lot more practical.

function resetAll(){
	location.reload();
}

// This function disables all of the draggable and droppables, 
// resets them to basic position and makes every tile blank.
	
function endGame(){
	// Resets draggables to starter position and disables them.
	$( ".draggable" ).css({ "top":"", "left":"" });
	$( ".draggable").draggable({disabled: true});
	
	// Disables dropzones
	$( ".droppable").droppable({disabled: true});
	$( ".droppable2x").droppable({disabled: true});
	
	// Disables buttons aside from reset game
	$( "#subWord" ).prop('disabled', true);
	$( "#resHand" ).prop('disabled', true);
	$( "#newHand" ).prop('disabled', true);
	
	// Goes through and sets every tile to be blank
	for(var i = 1; i <= 7; i++){
		var tile = document.getElementById("pi" + i);
		tile.src = "hw8files/tiles/" + "Blank" + ".jpg";
	}
	
	// Thanks user for playing! 
	alert("Thank you for playing!");
}