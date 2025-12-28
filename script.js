const startButton = document.getElementById("startButton");
const nextButton = document.getElementById("nextButton");
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const scoreSpan = document.getElementById("scoreSpan");
let answerBlocked = false;
let score = 0;
let questionIndex = 0;
let correctAnswer = "";

const questions = [
  {
    question: "What is the capital of Hungary?",
    options: ["Budapest", "Paris", "London", "Berlin"],
    correctAnswer: "Budapest",
    img: "https://www.amigo-s.ru/content-images/6f7601ae9f1d6231d7f3fb9fc86feca1.jpg"
  },
  {
    question: "What is the capital of France?",
    options: ["Madrid", "Rome", "Paris", "Lisbon"],
    correctAnswer: "Paris",
    img: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Paris_Night.jpg"
  },
  {
    question: "What is the capital of Italy?",
    options: ["Venice", "Rome", "Milan", "Naples"],
    correctAnswer: "Rome",
    img: "https://7d9e88a8-f178-4098-bea5-48d960920605.selcdn.net/583665dc-c63e-4d7e-bdc4-c80bfad7756a/-/format/webp/-/resize/1300x/"
  },
  {
    question: "What is the capital of Germany?",
    options: ["Berlin", "Munich", "Frankfurt", "Hamburg"],
    correctAnswer: "Berlin",
    img: "https://ethnomir.ru/upload/medialibrary/caa/berlin.jpg"
  },
  {
    question: "What is the capital of Luxembourg?",
    options: ["Luxembourg City", "Paris", "Brussels", "Berlin"],
    correctAnswer: "Luxembourg City",
    img: "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/99000/99241-Vianden.jpg"
  },
  {
    question: "What is the capital of Spain?",
    options: ["Madrid", "Barcelona", "Seville", "Valencia"],
    correctAnswer: "Madrid",
    img: "https://blog-cdn.aviata.kz/blog/categories/Frame_3_65_bVy2HKn.png"
  }
  ];

startButton.addEventListener("click", function() {
  startScreen.style.display = "none";
  gameScreen.style.display = "";
  loadQuestion(questionIndex);
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

function loadQuestion(questionIndex) {
  const question = questions[questionIndex];
  document.getElementById("questionText").textContent = question.question;
  const answerItems = document.querySelectorAll(".item");
  answerItems.forEach(function(item, index) {
    item.textContent = question.options[index];  
  })
  document.getElementById("questionImg").src = question.img;
  correctAnswer = question.correctAnswer;
}; 

nextButton.addEventListener("click", function() {
  if (questionIndex <= 4) {
    questionIndex++;
    loadQuestion(questionIndex);
    nextButton.style.display = "none";
    answerBlocked = false;
  }
});