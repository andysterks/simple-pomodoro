const debug = true;

const POMODORO_COUNT = debug ? 3 : 1500;
const REST_COUNT = debug ? 3 : 300;
const alarmSound = document.querySelector("#alarm-beep");
const toggleButton = document.querySelector("#toggle-btn");
const statusElement = document.querySelector("#status-text");
const timerElement = document.querySelector("#timer-text");
const resetButton = document.querySelector("#reset-btn");
const restButton = document.querySelector("#rest-btn");
const workButton = document.querySelector("#work-btn");

let workTimerCount = POMODORO_COUNT;
let restTimerCount = REST_COUNT;
let workTimerIsActive = true;
let timerInterval;

statusElement.innerHTML = "Ready to get to work?";

toggleButton.onclick = e => {
  if (!timerInterval) {
    startTimer(e.target);
  } else {
    stopTimer(e.target);
  }
};

restButton.onclick = e => {
  if (workTimerIsActive === false) {
    return;
  }
  workTimerIsActive = false;
  setRestTimer(restTimerCount);
  statusElement.innerHTML = "Press start to begin your break!";

  statusClass = "timer-inactive";
  timerElement.className = statusClass;
  statusElement.className = statusClass;

  workButton.checked = false;
};

workButton.onclick = e => {
  if (workTimerIsActive === true) {
    return;
  }
  workTimerIsActive = true;
  setWorkTimer(workTimerCount);
  statusElement.innerHTML = "Press start to get back to work!";

  statusClass = "timer-active";
  timerElement.className = statusClass;
  statusElement.className = statusClass;

  restButton.checked = false;
};

resetButton.onclick = e => {
  if (workTimerIsActive === true) {
    setWorkTimer(POMODORO_COUNT);
    return;
  }
  setRestTimer(REST_COUNT);
};

function startTimer(startStopButton) {
  timerInterval = setInterval(() => {
    if (workTimerIsActive === true) {
      workTimerCount -= 1;
      updateDisplay(workTimerCount);

      if (workTimerCount === 0) {
        clearInterval(timerInterval);
        alarmSound.play();
      }
    } else {
      restTimerCount -= 1;
      updateDisplay(restTimerCount);

      if (restTimerCount === 0) {
        clearInterval(timerInterval);
        alarmSound.play();
      }
    }
  }, 1000);

  startStopButton.innerHTML = "Stop";
  resetButton.disabled = true;

  restButton.disabled = true;
  workButton.disabled = true;
}

function stopTimer(startStopButton) {
  alarmSound.pause();
  clearInterval(timerInterval);
  timerInterval = undefined;

  startStopButton.innerHTML = "Start";
  resetButton.disabled = false;

  if (workTimerCount === 0) {
    workTimerIsActive = !workTimerIsActive;
    workTimerCount = workTimerIsActive ? POMODORO_COUNT : REST_COUNT;
    if (workTimerIsActive) {
      statusElement.innerHTML = "Press start to get back to work!";
    } else {
      statusElement.innerHTML = "Press start to begin your break!";
    }

    statusClass =
      workTimerIsActive === true ? "timer-active" : "timer-inactive";
    timerElement.className = statusClass;
    statusElement.className = statusClass;
    updateDisplay();
  }

  restButton.disabled = false;
  workButton.disabled = false;
}

function getMinutes(count) {
  let minutes = Math.floor(count / 60);
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return minutes === 0 ? "00" : minutes;
}

function getSeconds(count) {
  let seconds = Math.floor(count % 60);
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return seconds === 0 ? "00" : seconds;
}

function setWorkTimer(remainingTime) {
  workTimerCount = remainingTime;
  updateDisplay(workTimerCount);
}

function setRestTimer(remainingTime) {
  restTimerCount = remainingTime;
  updateDisplay(restTimerCount);
}

function updateDisplay(count) {
  timerElement.innerHTML = `${getMinutes(count)}:${getSeconds(count)}`;
}

if (workTimerIsActive === true) {
  setWorkTimer(workTimerCount);
  statusElement.innerHTML = "Press start to get back to work!";

  statusClass = "timer-active";
  timerElement.className = statusClass;
  statusElement.className = statusClass;
  workButton.checked = true;
  restButton.checked = false;
} else {
  setRestTimer(restTimerCount);
  statusElement.innerHTML = "Press start to begin your break!";

  statusClass = "timer-inactive";
  timerElement.className = statusClass;
  statusElement.className = statusClass;
  workButton.checked = false;
  restButton.checked = true;
}
