const userScore_span = document.getElementById('user-score');
const compScore_span = document.getElementById('comp-score');
const scoreBoard_div = document.querySelector(".score-board");
const result_div= document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s"); 
const reset = document.getElementById('reset');
const colon = document.getElementById('colon');
let userScore = 0;
let computerScore = 0;  

const convertToWord = (input) => { 
	switch (input) {
		case 'r' : return "Rock"; break;
		case 'p' : return "Paper"; break;
		case 's' : return "Scissors"; break;
	}
}

const getComputerChoice =  () => {
	const choices = ['r', 'p' , 's'];;
	let computerChoice = Math.random()  * 3;
	return choices[Math.floor(computerChoice)];
}

const wins = (userChoice , computerChoice)  => {	
	userScore++;
	userScore_span.innerHTML = userScore;
	colon.innerHTML = ":";
	compScore_span.innerHTML = computerScore;
	document.getElementById(userChoice).classList.add("green-glow");
	setTimeout(() => document.getElementById(userChoice).classList.remove("green-glow"), 300);
	result_div.innerHTML = "Your "+ convertToWord(userChoice) + " beats my " + convertToWord(computerChoice) +". YOU WON!"
}

const lose = (userChoice , computerChoice) =>  {
	computerScore++;
	userScore_span.innerHTML = userScore;
	colon.innerHTML = ":";
	compScore_span.innerHTML = computerScore;
	document.getElementById(userChoice).classList.add("red-glow");
	setTimeout(() => document.getElementById(userChoice).classList.remove("red-glow"), 300);
	result_div.innerHTML = "My " + convertToWord(computerChoice) + " beats your " + convertToWord(userChoice) +". YOU LOSE!"
}

const draw = (userChoice , computerChoice) =>  {
	userScore_span.innerHTML = userScore;
	colon.innerHTML = ":";
	compScore_span.innerHTML = computerScore;
	document.getElementById(userChoice).classList.add("grey-glow");
	setTimeout(() =>  document.getElementById(userChoice).classList.remove("grey-glow"), 300);
	result_div.innerHTML = "We both chose " +convertToWord(userChoice) +". It's a TIE!"
}

const game = (userChoice) => {
	let computerChoice = getComputerChoice();
	switch (userChoice+computerChoice){
		case "rs":
		case "pr":
		case "sp":
			wins(userChoice, computerChoice);
			break;
		case "rp" :
		case "ps" :
		case "sr" :
			lose(userChoice, computerChoice)
			break;
		default : 
			draw(userChoice, computerChoice);
			break;
	}

	if(userScore === 11){
		result_div.innerHTML = `YOU WIN!!!!!! (BY ${userScore - computerScore})`
		userScore = 0;
		computerScore = 0;
		userScore_span.innerHTML = "";
		compScore_span.innerHTML = "";
		colon.innerHTML = "GAME OVER!" ;
	}
	else if(computerScore === 11){
		result_div.innerHTML = `YOU LOSE!! (BY ${computerScore - userScore})`
		userScore = 0;
		computerScore = 0;
		userScore_span.innerHTML = "";
		compScore_span.innerHTML = "";
		colon.innerHTML = "GAME OVER!" ;
	}
}

rock_div.addEventListener('click' , function(){
	game('r');
})

paper_div.addEventListener('click' , function(){
	game('p');
})

scissors_div.addEventListener('click' , () => game('s'))

reset.addEventListener('click' , () => {
	userScore = 0; 
	computerScore = 0;
	userScore_span.innerHTML = userScore;
	compScore_span.innerHTML = computerScore
})