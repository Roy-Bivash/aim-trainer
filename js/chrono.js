let affichageChrono = document.getElementById('affichageChrono');
// let BaseTime = "01:00";

var sec = 0;
var min = 0;
var t;

function startChrono() {
  t = setInterval(() => {
    if (min != 1) {
      updateTimer();
    }
    else {
      clearTimeout(t);
      stopGame();
    }
  }, 1000);
}

function updateTimer() {
  sec++;
  if (sec >= 60) {
    sec = 0;
    min++;
    if (min >= 60) {
      min = 0;
    }
  }
  affichageChrono.textContent = "0" + min + ":" + ((sec < 10) ? "0" + sec : sec);
}