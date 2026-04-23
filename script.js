const startButton = document.getElementById("startButton");
const nextButton = document.getElementById("nextButton");
const restartButton = document.getElementById("restartButton");
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const gameSelectionScreen = document.getElementById("gameSelectionScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const scoreSpan = document.getElementById("scoreSpan");
const answerItems = document.querySelectorAll(".item");
const questionImg = document.getElementById("questionImg");
const questionText = document.getElementById("questionText");
const finalScoreSpan = document.getElementById("finalScoreSpan");

let answerBlocked = false;
let score = 0;
let questionIndex = 0;
let correctAnswer = "";

let questions = [];
let currentAnswerPool = [];

startButton.addEventListener("click", function() {
  startScreen.classList.add("hidden");
  gameSelectionScreen.classList.remove("hidden");
});

// Pack selection — derive file paths from pack name instead of manual maps
const packItems = document.querySelectorAll(".pack-item");
packItems.forEach(item => {
  item.addEventListener("click", function() {
    const packName = this.getAttribute("data-pack");
    const questionsFile = "questions/" + packName + ".json";
    const poolFile = "questions/pool-" + packName + ".json";

    gameSelectionScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    score = 0;
    questionIndex = 0;
    answerBlocked = false;
    scoreSpan.textContent = score;

    Promise.all([
      fetch(poolFile).then(function(r) { if (!r.ok) throw new Error("Failed to load " + poolFile); return r.json(); }),
      fetch(questionsFile).then(function(r) { if (!r.ok) throw new Error("Failed to load " + questionsFile); return r.json(); })
    ]).then(function(results) {
      currentAnswerPool = results[0];
      questions = shuffle(results[1]);
      loadQuestion(questionIndex);
    }).catch(function(err) {
      alert("Error loading quiz data: " + err.message);
    });
  });
});

// Back buttons
document.getElementById("backButton1").addEventListener("click", function() {
  gameSelectionScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
});

document.getElementById("backButton2").addEventListener("click", function() {
  gameScreen.classList.add("hidden");
  gameSelectionScreen.classList.remove("hidden");
});

answerItems.forEach(function(item) {
  item.addEventListener("click", function() {
    if (!answerBlocked) {
      const selectedAnswer = item.textContent;
      checkAnswer(selectedAnswer, item);
      nextButton.style.visibility = "visible";
      answerBlocked = true;
    }
  });
});

nextButton.addEventListener("click", function() {
  answerItems.forEach(function(item) {
    item.classList.remove("correct", "incorrect");
  });

  if (questionIndex < questions.length - 1) {
    questionIndex++;
    loadQuestion(questionIndex);
    nextButton.style.visibility = "hidden";
    answerBlocked = false;
  } else {
    gameScreen.classList.add("hidden");
    gameOverScreen.classList.remove("hidden");
    finalScoreSpan.textContent = score;
  }
});

restartButton.addEventListener("click", function() {
  gameOverScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
});

function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getRandomItems(array, count, exclude) {
  const filtered = array.filter(function(item) { return item !== exclude; });
  const shuffled = shuffle(filtered);
  return shuffled.slice(0, count);
}

function loadQuestion(questionIndex) {
  const question = questions[questionIndex];
  questionText.textContent = question.question;

  var wrongAnswers = getRandomItems(currentAnswerPool, 3, question.correctAnswer);
  var allOptions = [question.correctAnswer].concat(wrongAnswers);
  var shuffledOptions = shuffle(allOptions);

  answerItems.forEach(function(item, index) {
    item.textContent = shuffledOptions[index];
  });
  questionImg.src = question.img;
  questionImg.alt = question.question;
  correctAnswer = question.correctAnswer;
  nextButton.style.visibility = "hidden";
}

function checkAnswer(selectedAnswer, selectedItem) {
  if (selectedAnswer === correctAnswer) {
    score++;
    selectedItem.classList.add("correct");
  } else {
    score--;
    selectedItem.classList.add("incorrect");
    answerItems.forEach(function(item) {
      if (item.textContent === correctAnswer) {
        item.classList.add("correct");
      }
    });
  }
  scoreSpan.textContent = score;
}
