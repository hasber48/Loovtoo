const startButton = document.getElementById("startButton");
// const questionBlock = document.getElementById("questionBlock");
const game = document.getElementById("game");

startButton.addEventListener("click", function() {
  startButton.style.display = "none";
  game.style.display = "";
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
    alert("Correct!");
  } else {
    alert("Wrong answer. Try again!");
  }
};