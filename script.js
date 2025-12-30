const startButton = document.getElementById("startButton");
const nextButton = document.getElementById("nextButton");
const restartButton = document.getElementById("restartButton");
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const gameSelectionScreen = document.getElementById("gameSelectionScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const scoreSpan = document.getElementById("scoreSpan");

let answerBlocked = false;
let score = 0;
let questionIndex = 0;
let correctAnswer = "";

let questions = [];

startButton.addEventListener("click", function() {
  startScreen.style.display = "none";
  gameSelectionScreen.style.display = "";
});

// Pack selection
const packFiles = {
  "capitals-europe": "capitals-europe.json",
  "capitals-asia": "capitals-asia.json",
  "capitals-americas": "capitals-americas.json",
  "capitals-africa": "capitals-africa.json",
  "flags-europe": "flags-europe.json",
  "flags-asia": "flags-asia.json",
  "flags-americas": "flags-americas.json",
  "flags-africa": "flags-africa.json"
};

const packItems = document.querySelectorAll(".pack-item");
packItems.forEach(item => {
  item.addEventListener("click", function() {
    const packName = this.getAttribute("data-pack");
    if (packFiles[packName]) {
      gameSelectionScreen.style.display = "none";
      gameScreen.style.display = "";
      score = 0;
      questionIndex = 0;
      scoreSpan.textContent = score;
      loadQuestionsFromFile(packFiles[packName]);
      loadQuestion(questionIndex);
    }
  });
});

// Back buttons
document.getElementById("backButton1").addEventListener("click", function() {
  gameSelectionScreen.style.display = "none";
  startScreen.style.display = "";
});

document.getElementById("backButton2").addEventListener("click", function() {
  gameScreen.style.display = "none";
  gameSelectionScreen.style.display = "";
});

const answerItems = document.querySelectorAll(".item");

answerItems.forEach(function(item) {
  item.addEventListener("click", function() {
    if (answerBlocked == false) {
      const selectedAnswer = item.textContent;
      checkAnswer(selectedAnswer);
      nextButton.style.display = "";
      answerBlocked = true;      
    }
  });
});

nextButton.addEventListener("click", function() {
  if (questionIndex < questions.length - 1) {
    questionIndex++;
    loadQuestion(questionIndex);
    nextButton.style.display = "none";
    answerBlocked = false;
  } else {
    gameScreen.style.display = "none";
    gameOverScreen.style.display = "";
    document.getElementById("finalScoreSpan").textContent = score;
  }
});

restartButton.addEventListener("click", function() {
  gameOverScreen.style.display = "none";
  startScreen.style.display = "";
});


function loadQuestionsFromFile(questionsFile) {
  const request = new XMLHttpRequest();
  request.open('GET', questionsFile, false);
  request.send();
  questions = JSON.parse(request.responseText);
}

function loadQuestion(questionIndex) {
  const question = questions[questionIndex];
  console.log(`Loading question ${questionIndex}: ${question.correctAnswer}`)
  document.getElementById("questionText").textContent = question.question;
  const answerItems = document.querySelectorAll(".item");
  answerItems.forEach(function(item, index) {
    item.textContent = question.options[index];  
  })
  document.getElementById("questionImg").src = question.img;
  correctAnswer = question.correctAnswer;
}; 

function checkAnswer(selectedAnswer) {
  if (selectedAnswer === correctAnswer) {
    score++;
    scoreSpan.textContent = score;
  }
  else {
    score--;
    scoreSpan.textContent = score;
 }
};