const quizContainer = document.getElementById("quiz-container");
const countdown = document.getElementById("countdown");
const submitBtn = document.getElementById("submit");

let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timer;

const questions = [
  {
    question: "What was Javascript's original name?",
    choices: ["Mocha", "Coffeetalk", "Central Perk"],
    answer: "Mocha"
  },
  {
    question: "How many days did it take to build Javascript?",
    choices: ["10", "14", "3"],
    answer: "10"
  },
  {
    question: "For what web browser was Javascript originally created?",
    choices: ["Netscape Navigator", "Internet Explorer", "Safari"],
    answer: "Netscape Navigator"
  }
];

function startQuiz() {
  timer = setInterval(updateTime, 1000);
  displayQuestion();
}

function displayQuestion() {
  const question = questions[currentQuestion];
  const choices = question.choices.map(choice => `<li><button class="choice">${choice}</button></li>`).join("");
  quizContainer.innerHTML = `
    <h2>${question.question}</h2>
    <ul>${choices}</ul>
  `;
}

function updateTime() {
  timeLeft--;
  countdown.textContent = timeLeft;
  if (timeLeft <= 0) {
    clearInterval(timer);
    endQuiz();
  }
}

function endQuiz() {
  const initials = prompt("Enter your initials:");
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  const scoreObj = { initials, score };
  highScores.push(scoreObj);
  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.href = "highscores.html";
}

function handleChoiceClick(event) {
  const selectedAnswer = event.target.textContent;
  const correctAnswer = questions[currentQuestion].answer;
  if (selectedAnswer === correctAnswer) {
    score++;
    event.target.classList.add("correct");
  } else {
    timeLeft -= 10;
    event.target.classList.add("incorrect");
  }
  currentQuestion++;
  if (currentQuestion >= questions.length) {
    clearInterval(timer);
    endQuiz();
  } else {
    setTimeout(() => {
      displayQuestion();
      event.target.classList.remove("correct", "incorrect");
    }, 1000);
  }
}

quizContainer.addEventListener("click", event => {
  if (event.target.classList.contains("choice")) {
    handleChoiceClick(event);
  }
});

submitBtn.addEventListener("click", () => {
  startQuiz();
});



