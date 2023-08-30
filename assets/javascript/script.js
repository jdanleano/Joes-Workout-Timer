const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const currentRoundDisplay = document.getElementById("currentRound");
const totalRoundsDisplay = document.getElementById("totalRounds");
const roundsInput = document.getElementById("rounds");
const roundDurationInput = document.getElementById("roundDuration");
const beepSound = document.getElementById("beep");

let timerInterval;
let totalSecondsRemaining = 0;
let currentRound = 1;
let isPaused = true;

function updateTimerDisplay() {
  const minutes = Math.floor(totalSecondsRemaining / 60);
  const seconds = totalSecondsRemaining % 60;

  minutesDisplay.textContent = minutes < 10 ? `0${minutes}` : minutes;
  secondsDisplay.textContent = seconds < 10 ? `0${seconds}` : seconds;
  currentRoundDisplay.textContent = currentRound;
  totalRoundsDisplay.textContent = roundsInput.value;
}

function startTimer() {
  if (isPaused) {
    isPaused = false;
    totalSecondsRemaining = parseInt(roundDurationInput.value);
    timerInterval = setInterval(() => {
      if (totalSecondsRemaining > 0) {
        totalSecondsRemaining--;
        updateTimerDisplay();
      } else {
        currentRound++;
        if (currentRound <= parseInt(roundsInput.value)) {
          totalSecondsRemaining = parseInt(roundDurationInput.value);
        } else {
          clearInterval(timerInterval);
          isPaused = true;
        }

        beepSound.play(); // Play the beep sound
      }
    }, 1000);
  }
}

function pauseTimer() {
  if (!isPaused) {
    isPaused = true;
    clearInterval(timerInterval);
  }
}

function resetTimer() {
  currentRound = 1;
  totalSecondsRemaining = parseInt(roundDurationInput.value);
  updateTimerDisplay();
  pauseTimer();
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
