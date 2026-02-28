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
let currentAnswerPool = [];

startButton.addEventListener("click", function() {
  startScreen.style.display = "none";
  gameSelectionScreen.style.display = "";
});

// Pack selection
const packFiles = {
  "capitals-europe": "questions/capitals-europe.json",
  "capitals-asia": "questions/capitals-asia.json",
  "capitals-americas": "questions/capitals-americas.json",
  "capitals-africa": "questions/capitals-africa.json",
  "flags-europe": "questions/flags-europe.json",
  "flags-asia": "questions/flags-asia.json",
  "flags-americas": "questions/flags-americas.json",
  "flags-africa": "questions/flags-africa.json"
};

const answerPools = {
  "capitals-europe": "questions/pool-capitals-europe.json",
  "capitals-asia": "questions/pool-capitals-asia.json",
  "capitals-americas": "questions/pool-capitals-americas.json",
  "capitals-africa": "questions/pool-capitals-africa.json",
  "flags-europe": "questions/pool-flags-europe.json",
  "flags-asia": "questions/pool-flags-asia.json",
  "flags-americas": "questions/pool-flags-americas.json",
  "flags-africa": "questions/pool-flags-africa.json"
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
      answerBlocked = false;
      scoreSpan.textContent = score;
      loadAnswerPool(answerPools[packName]);
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
      nextButton.style.visibility = "visible";
      answerBlocked = true;      
    }
  });
});

nextButton.addEventListener("click", function() {
  if (questionIndex < questions.length - 1) {
    questionIndex++;
    loadQuestion(questionIndex);
    nextButton.style.visibility = "hidden";
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


function loadAnswerPool(poolFile) {
  const request = new XMLHttpRequest();
  request.open('GET', poolFile, false);
  request.send();
  currentAnswerPool = JSON.parse(request.responseText);
}

function loadQuestionsFromFile(questionsFile) {
  const request = new XMLHttpRequest();
  request.open('GET', questionsFile, false);
  request.send();
  questions = JSON.parse(request.responseText);
  // Shuffle questions
  questions = shuffle(questions);
}

function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getRandomItems(array, count, exclude) {
  const filtered = array.filter(item => item !== exclude);
  const shuffled = shuffle(filtered);
  return shuffled.slice(0, count);
}

function loadQuestion(questionIndex) {
  const question = questions[questionIndex];
  console.log(`Loading question ${questionIndex}: ${question.correctAnswer}`)
  document.getElementById("questionText").textContent = question.question;
  
  // Get 3 random wrong answers from the answer pool (excluding correct answer)
  const wrongAnswers = getRandomItems(currentAnswerPool, 3, question.correctAnswer);
  
  // Combine correct answer with wrong answers and shuffle
  const allOptions = [question.correctAnswer, ...wrongAnswers];
  const shuffledOptions = shuffle(allOptions);
  
  const answerItems = document.querySelectorAll(".item");
  answerItems.forEach(function(item, index) {
    item.textContent = shuffledOptions[index];  
  })
  document.getElementById("questionImg").src = question.img;
  correctAnswer = question.correctAnswer;
  nextButton.style.visibility = "hidden";
}

function checkAnswer(selectedAnswer) {
  if (selectedAnswer === correctAnswer) {
    score++;
    scoreSpan.textContent = score;
  }
  else {
    score--;
    scoreSpan.textContent = score;
  }
}
