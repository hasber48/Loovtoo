const startButton = document.getElementById("startButton");
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const scoreSpan = document.getElementById("scoreSpan")
let score = 0


startButton.addEventListener("click", function() {
  startScreen.style.display = "none";
  gameScreen.style.display = "";
} );

const answerItems = document.querySelectorAll(".item");
answerItems.forEach(function(item) {
  item.addEventListener("click", function() {
    const selectedAnswer = item.textContent;
    checkAnswer(selectedAnswer);
  });
});

function checkAnswer(selectedAnswer) {
  const correctAnswer = "Budapest";
  if (selectedAnswer === correctAnswer) {
    score++;
    scoreSpan.textContent = score;
 }
};