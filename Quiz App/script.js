const quizData = [
  {
    question: "Which language runs in a web browser?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d",
  },
  {
    question: "What does CSS stand for?",
    a: "Central Style Sheets",
    b: "Cascading Style Sheets",
    c: "Cascading Simple Sheets",
    d: "Cars SUVs Sailboats",
    correct: "b",
  },
  {
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Hypertext Markdown Language",
    c: "Hyperloop Machine Language",
    d: "Helicopters Terminals Motorboats Lamborginis",
    correct: "a",
  },
  {
    question: "What year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "none of the above",
    correct: "b",
  },
];

// Grab elements from HTML
const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

// Keep track of score
let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  // Each question needs to be reset
  deselectAnswers();

  // Grab the current quiz data
  const currentQuizData = quizData[currentQuiz];

  // Assign the innerText the current quiz data
  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

// Deselects all the answers
function deselectAnswers() {
  answerEls.forEach((answerEl) => (answerEl.checked = false));
}

function getSelected() {
  let answer;

  // Check which answer is selected
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });

  return answer;
}

// Submitting the quiz
submitBtn.addEventListener("click", () => {
  const answer = getSelected();

  // Check if the answer is correct
  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++;
    }

    // Go to the next quiz
    currentQuiz++;

    // Make sure the quiz reaches the end
    if (currentQuiz < quizData.length) {
      loadQuiz();
    }
    // Reached the end of the quiz
    else {
      // The button will refresh the page i.e. restart
      quiz.innerHTML = `
                <h2>You answered ${score}/${quizData.length} questions correctly</h2>

                <button onclick="location.reload()">Reload</button>
            `;
    }
  }
});
