const POMODORO_COUNT = 3;
const BREAK_COUNT = 5;
const toggleButton = document.querySelector("#toggle-btn");
const statusElement = document.querySelector("#status-text");
const timerElement = document.querySelector("#timer-text");
const resetButton = document.querySelector("#reset-btn");

let currentTimer = POMODORO_COUNT;
let timerIsActive = true;
let timerInterval;

toggleButton.onclick = e => {
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      currentTimer -= 1;
      updateDisplay();

      if (currentTimer === 0) {
        clearInterval(timerInterval);
        timerIsActive = false;
        // make beeping noise!
      }
    }, 1000);

    e.target.innerHTML = "Stop";
    resetButton.disabled = true;
  } else {
    clearInterval(timerInterval);
    timerInterval = undefined;

    e.target.innerHTML = "Start";
    resetButton.disabled = false;
  }
};

resetButton.onclick = e => {
  if (currentTimer === 0) {
    timerIsActive = !timerIsActive;
    if (timerIsActive) {
      statusElement.innerHTML = 'Go take a break!!!';
    } else {
      statusElement.innerHTML = 'Get to work!!!';      
    }
    statusClass = timerIsActive === true ? 'timer-active' : 'timer-inactive';
    timerElement.className = statusClass;
    statusElement.className = statusClass;
  }
  currentTimer = POMODORO_COUNT;
  updateDisplay();
};

function getMinutes() {
  let minutes = Math.floor(currentTimer / 60);
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return minutes === 0 ? "00" : minutes;
}

function getSeconds() {
  let seconds = Math.floor(currentTimer % 60);
  seconds = seconds < 10 ? '0' + seconds : seconds;
  return seconds === 0 ? "00" : seconds;
}

function updateDisplay() {
  timerElement.innerHTML = `${getMinutes()}:${getSeconds()}`;
}

updateDisplay();