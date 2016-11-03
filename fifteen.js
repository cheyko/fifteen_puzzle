// additional feature used was to get track the time and the number of moves.
var alive = 6;// every game has a state, this state indicates life
var game_over = null;// this is the state as the game is being played
var stopclock = null;//timer used to check game time
var totaltime = 0;// counter for seconds in gameplay
var moves = 0;

window.onload = function(){
	var puzzle = document.getElementById("puzzlearea");
	var squares = puzzle.children;
	
	var positionY = 0;
	var positionX = 0;
	
	var backgroundX = 0;
	var backgroundY = 0;
	
	var ySpace = 300;
	var xSpace = 300;
	
	var yValue;
	var xValue;
	
	var shufflesquares;
	var shufflingArray = [];
	var amount = 200;
	
	for(var i=0; i < squares.length; i++){
		squares[i].className = "puzzlepiece";
		squares[i].style.top =  positionY + "px";
		squares[i].style.left = positionX + "px";
		//puzzle.style.backgroundPosition = 100 px +  100 px;
		squares[i].style.backgroundPosition = backgroundX + "px " + backgroundY + "px";
		squares[i].onclick = slide;
		squares[i].onmouseover = sliding;
		//document.getElementsByClassName("explanation").innerHTML = "number of lives remaining on this window load: "+alive;
		if(positionX < 300){
			positionX = positionX + 100;
			backgroundX = backgroundX - 100;
		}
		else{
			positionX = 0;
			backgroundX = 0;
			positionY = positionY + 100;
			backgroundY = backgroundY - 100;
		}	
	}

	function slide(){
		document.getElementsByClassName("explanation")[0].innerHTML = "number of lives remaining on this window load: "+alive+">>>> Time: = 0 "+" >>>>moves: "+moves;
		yValue = parseInt(this.style.top);
		xValue = parseInt(this.style.left);
		if (yValue == ySpace && xValue == (xSpace-100) || yValue == ySpace && xValue == (xSpace+100) || yValue == (ySpace-100) && xValue == xSpace || yValue == (ySpace+100) && xValue == xSpace){
			this.style.top = ySpace + "px";
			this.style.left = xSpace + "px";
			ySpace = yValue;
			xSpace = xValue;
		}
		moves += 1;
	}

	function sliding(){
		//document.getElementsByClassName("explanation").innerHTML = "number of lives remaining on this window load: "+alive;
		yValue = parseInt(this.style.top);
		xValue = parseInt(this.style.left);
		if (yValue == ySpace && xValue == (xSpace-100) || yValue == ySpace && xValue == (xSpace+100) || yValue == (ySpace-100) && xValue == xSpace || yValue == (ySpace+100) && xValue == xSpace){
			$(this).addClass("movablepiece");	
		}
		else{
			$(this).removeClass("movablepiece");
		}
	}

	function shuffling(){
		if(alive > 0 ){
			
			alive--;
			clearInterval(stopclock);
			stopclock = null;
			totaltime = 0;
			
			document.getElementsByClassName("explanation")[0].innerHTML = "number of lives remaining on this window load: "+alive+" >>>> Time: = 0"+" >>>>moves: "+moves;
			stopclock = setInterval(function(){ mytracking(); },100);
			game_over = false;
			
			for(var i = 0; i < amount; i++){
				var change = Math.floor (Math.random () * 4);	
				if ( change == 0) {
					(getStyle((ySpace-100)+"px", xSpace+"px"))|| getStyle((ySpace+100)+"px", xSpace+"px");
					yValue = parseInt(shufflesquares.style.top);
					xValue = parseInt(shufflesquares.style.left);
					shufflesquares.style.top = ySpace + "px";
					shufflesquares.style.left = xSpace + "px";
					ySpace = yValue;
					xSpace = xValue;
				}
				else if ( change == 1) {
					(getStyle(ySpace+"px", (xSpace-100)+"px")) || getStyle(ySpace+"px", (xSpace + 100)+"px");
					yValue = parseInt(shufflesquares.style.top);
					xValue = parseInt(shufflesquares.style.left);
					shufflesquares.style.top = ySpace + "px";
					shufflesquares.style.left = xSpace + "px";
					ySpace = yValue;
					xSpace = xValue;
				}
				else if ( change == 2) {
					getStyle((ySpace+100)+"px", xSpace+"px") || (getStyle((ySpace-100)+"px", xSpace+"px"));
					yValue = parseInt(shufflesquares.style.top);
					xValue = parseInt(shufflesquares.style.left);
					shufflesquares.style.top = ySpace + "px";
					shufflesquares.style.left = xSpace + "px";
					ySpace = yValue;
					xSpace = xValue;
				}
				else {
					getStyle(ySpace+"px", (xSpace + 100)+"px") || (getStyle(ySpace+"px", (xSpace-100)+"px"));
					yValue = parseInt(shufflesquares.style.top);
					xValue = parseInt(shufflesquares.style.left);
					shufflesquares.style.top = ySpace + "px";
					shufflesquares.style.left = xSpace + "px";
					ySpace = yValue;
					xSpace = xValue;
				}
			}	
		}else{
			document.getElementsByClassName("explanation")[0].innerHTML = "you have "+alive+" lives left, please refresh the page to play again";
		}
	}
	
	function mytracking(){
	totaltime += 0.1;
	document.getElementsByClassName("explanation")[0].innerHTML = "number of lives remaining on this window load: "+alive+" >>>> Time: = "+Math.round(10*totaltime)/10+" >>>>moves: "+moves;
	}
	
	function getStyle(top, left){
		for(var i =0; i < squares.length; i++){
			if(squares[i].style.top==top && squares[i].style.left==left){
				shufflesquares = squares[i];
				return shufflesquares;		
			}
		}
	}
	document.getElementById("shufflebutton").onclick = shuffling; 
}