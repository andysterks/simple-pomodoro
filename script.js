const POMODORO_COUNT = 3;
const BREAK_COUNT = 5;
const alarmSound = document.querySelector("#alarm-beep");
const toggleButton = document.querySelector("#toggle-btn");
const statusElement = document.querySelector("#status-text");
const timerElement = document.querySelector("#timer-text");
const resetButton = document.querySelector("#reset-btn");

let currentTimer = POMODORO_COUNT;
let timerIsActive = true;
let timerInterval;

statusElement.innerHTML = 'Ready to get to work?';

toggleButton.onclick = e => {
  if (!timerInterval) {
    startTimer(e.target);
  } else {
    stopTimer(e.target);
  }
};

resetButton.onclick = e => {
  currentTimer = timerIsActive ? POMODORO_COUNT : BREAK_COUNT;
  updateDisplay();
};

function startTimer(startStopButton) {
  timerInterval = setInterval(() => {
    currentTimer -= 1;
    updateDisplay();

    if (currentTimer === 0) {
      clearInterval(timerInterval);
      alarmSound.play();
    }
  }, 1000);

  startStopButton.innerHTML = "Stop";
  resetButton.disabled = true;
}

function stopTimer(startStopButton) {
  alarmSound.pause();
  clearInterval(timerInterval);
  timerInterval = undefined;

  startStopButton.innerHTML = "Start";
  resetButton.disabled = false;

  if (currentTimer === 0) {
    timerIsActive = !timerIsActive;
    currentTimer = timerIsActive ? POMODORO_COUNT : BREAK_COUNT;
    if (timerIsActive) {
      statusElement.innerHTML = "Press start to get back to work!";
    } else {
      statusElement.innerHTML = "Press start to begin your break!";
    }

    statusClass = timerIsActive === true ? "timer-active" : "timer-inactive";
    timerElement.className = statusClass;
    statusElement.className = statusClass;
    updateDisplay();
  }
}

function getMinutes() {
  let minutes = Math.floor(currentTimer / 60);
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return minutes === 0 ? "00" : minutes;
}

function getSeconds() {
  let seconds = Math.floor(currentTimer % 60);
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return seconds === 0 ? "00" : seconds;
}

function updateDisplay() {
  timerElement.innerHTML = `${getMinutes()}:${getSeconds()}`;
}

updateDisplay();