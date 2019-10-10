const TIMER_DEFAULT = 1500;
const timerElement = document.querySelector('#timer-text');
const resetButton = document.querySelector('#reset-btn');

let currentTimer = TIMER_DEFAULT;

let timerInterval;

document.querySelector('#toggle-btn').onclick = (e) => {
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      currentTimer -= 1;
      updateDisplay();

      if (currentTimer === 0) {
        clearInterval(timerInterval);
        // make beeping noise!
      }
    }, 1000);

    e.target.innerHTML = 'Stop';
    resetButton.disabled = true;

  } else {
    clearInterval(timerInterval);
    timerInterval = undefined;

    e.target.innerHTML = 'Start';
    resetButton.disabled = false;
  }
};

resetButton.onclick = (e) => {
  currentTimer = TIMER_DEFAULT;
  updateDisplay();
}

function getMinutes() {
  var minutes = currentTimer % 60;
  return minutes === 0 ? '00' : Math.floor(minutes);
}

function updateDisplay() {
  timerElement.innerHTML = `${Math.floor(currentTimer / 60)}:${getMinutes()}`;
}

updateDisplay(`${Math.floor(currentTimer / 60)}:${getMinutes()}`);