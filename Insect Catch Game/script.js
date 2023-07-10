const screens = document.querySelectorAll(".screen");
const choose_insect_btns = document.querySelectorAll(".choose-insect-btn");
const start_btn = document.getElementById("start-btn");
const game_container = document.getElementById("game-container");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const message = document.getElementById("message");
let seconds = 0;
let score = 0;
let selected_insect = {};

// Start Game
start_btn.addEventListener("click", () => screens[0].classList.add("up"));

// Choose insect
choose_insect_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const img = btn.querySelector("img");
    const src = img.getAttribute("src");
    const alt = img.getAttribute("alt");
    selected_insect = { src, alt };
    screens[1].classList.add("up");
    setTimeout(createInsect, 1000);
    startGame();
  });
});

// Start game
function startGame() {
  setInterval(increaseTime, 1000);
}

// Increase Time
function increaseTime() {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  timeEl.innerHTML = `Time: ${m}:${s}`;
  seconds++;
}

// Create Insect
function createInsect() {
  const insect = document.createElement("div");
  insect.classList.add("insect");
  // Destructuring the object
  const { x, y } = getRandomLocation();
  insect.style.top = `${y}px`;
  insect.style.left = `${x}px`;
  // Assigning the image to the insect (Random Rotation)
  insect.innerHTML = `<img src="${selected_insect.src}" alt="${
    selected_insect.alt
  }" style="transform: rotate(${Math.random() * 360}deg)" />`;
  // Adding the click event to the insect
  insect.addEventListener("click", catchInsect);
  // Adding the insect to the game container
  game_container.appendChild(insect);
}

// Get Random Location
function getRandomLocation() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  // Keep the insect inside the screen
  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (height - 200) + 100;
  return { x, y };
}

// Catch the insect
function catchInsect() {
  increaseScore();
  // this refers to the insect
  this.classList.add("caught");
  setTimeout(() => this.remove(), 2000);
  addInsects();
}

// Add insects to the screen
function addInsects() {
  setTimeout(createInsect, 1000);
  setTimeout(createInsect, 1500);
}

// Increase Score
function increaseScore() {
  score++;
  // Insert message
  if (score > 19) {
    message.classList.add("visible");
  }
  scoreEl.innerHTML = `Score: ${score}`;
}
