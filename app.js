let reset = document.getElementById("reset");
let playerScore = document.getElementById("player-score");
let aiScore = document.getElementById("ai-score");
let btnPlayer = [...document.getElementsByClassName("btn-player")];
let aiRockBtn = document.getElementById("ai-rock");
let aiPaperBtn = document.getElementById("ai-paper");
let aiScissorsBtn = document.getElementById("ai-scissors");
let message = document.getElementById("message");
let nextButton = document.getElementById("next");

const playRound = (e) => {
  let choice = e.target.closest(".btn-player");

  btnPlayer.forEach((btn) => {
    btn.classList.add("disable");
    btn.removeEventListener("click", playRound);
  });

  choice.classList.remove("disable");
  choice.classList.add("active");

  let playerChoice = choice.id;
  let aiChoice = doAiChoice();

  getWinner(playerChoice, aiChoice);

  nextButton.style.visibility = "visible";
};

const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";


const doAiChoice = () => {
  let randChoice = Math.floor(Math.random() * 3);

  switch (randChoice) {
    case 0:
      aiRockBtn.classList.add("active");
      return ROCK;
    case 1:
      aiPaperBtn.classList.add("active");
      return PAPER;
    default:
      aiScissorsBtn.classList.add("active");
      return SCISSORS;
  }
}

const getWinner = (firstChoice, secondChoice) => {
  if (firstChoice === secondChoice)
    message.textContent = "Draw !";

  console.log()
  if (firstChoice === ROCK && secondChoice === SCISSORS)
    return playerIsWinner();
  if (firstChoice === ROCK && secondChoice === PAPER)
    return iaIsWinner();

  if (firstChoice === PAPER && secondChoice === SCISSORS)
    return iaIsWinner();
  if (firstChoice === PAPER && secondChoice === ROCK)
    return playerIsWinner();

  if (firstChoice === SCISSORS && secondChoice === ROCK)
    return iaIsWinner();
  if (firstChoice === SCISSORS && secondChoice === PAPER)
    return playerIsWinner();
}

const iaIsWinner = () => {
  message.textContent = "AI Won...";
  aiScore.textContent++;
};

const playerIsWinner = () => {
  message.textContent = "You Won !";
  playerScore.textContent++;
};

const nextRound = () => {
  btnPlayer.forEach((btn) => {
    btn.classList.remove("disable");
    btn.classList.remove("active");
    btn.addEventListener("click", playRound);
  });
  nextButton.style.visibility = "hidden";

  aiRockBtn.classList.remove("active");
  aiPaperBtn.classList.remove("active");
  aiScissorsBtn.classList.remove("active");

  message.textContent = "Your turn !";
}

nextButton.addEventListener("click", nextRound);

btnPlayer.forEach((btn) => btn.addEventListener("click", playRound));

reset.addEventListener("click", () => {
  aiScore.textContent = 0;
  playerScore.textContent = 0;

  nextRound();
})