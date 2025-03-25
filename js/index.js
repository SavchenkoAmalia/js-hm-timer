//! 1

// document.addEventListener("DOMContentLoaded", function () {
//   const time = document.getElementById("time");
//   const start = document.getElementById("start");
//   const stop = document.getElementById("stop");
//   const restart = document.getElementById("restart");

//   start.addEventListener("click", onStart);
//   stop.addEventListener("click", onStop);
//   restart.addEventListener("click", onRestart);

//   let minutes = 60;
//   let interval;

//   function formatTime(minutes) {
//     const mins = String(minutes).padStart(2, "0");
//     return `${mins}:00;`;
//   }

//   function updateTimeDisplay() {
//     time.textContent = formatTime(minutes);
//   }

//   function onStart() {
//     interval = setInterval(() => {
//       minutes--;
//       console.log(minutes);
//       updateTimeDisplay();
//       if (minutes === 30) {
//         alert("Залишилось менше половини часу!");
//     }
//       if (minutes === 0) {
//         clearInterval(interval);
//       }
//     }, 1000);
//   }

//   function onStop() {
//     clearInterval(interval);
//   }

//   function onRestart() {
//     minutes = 60;
//     console.log(minutes);
//     updateTimeDisplay();
//     clearInterval(interval);
//   }

//   updateTimeDisplay();
// });

//! 2

document.addEventListener("DOMContentLoaded", function () {
  const timeElement = document.getElementById("time");
  const startButton = document.getElementById("start");
  const stopButton = document.getElementById("stop");
  const restartButton = document.getElementById("restart");

  let minutes = 0;
  let seconds = 30;
  let hundredths = 0;
  let interval;

  function formatTime() {
    const mins = String(minutes).padStart(2, "0");
    const secs = String(seconds).padStart(2, "0");
    const hunds = String(hundredths).padStart(2, "0");
    return `${mins}:${secs}:${hunds}`;
  }

  function updateTimeDisplay() {
    timeElement.textContent = formatTime();
  }

  function onStart() {
    startButton.disabled = true;
    stopButton.disabled = false;
    restartButton.disabled = false;

    interval = setInterval(() => {
      hundredths--;
      if (hundredths < 0) {
        hundredths = 99;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
      }
      updateTimeDisplay();

      if (minutes === 0 && seconds === 10 && hundredths === 0) {
        timeElement.style.color = "red";
      }

      if (minutes === 0 && seconds === 0 && hundredths === 0) {
        clearInterval(interval);
        timeElement.style.color = "black";
        startButton.disabled = false;
        alert("Час вийшов!");
      }
    }, 10);
  }

  function onStop() {
    clearInterval(interval);
    startButton.disabled = false;
    stopButton.disabled = true;
  }

  function onRestart() {
    minutes = 0;
    seconds = 30;
    hundredths = 0;
    updateTimeDisplay();
    clearInterval(interval);
    timeElement.style.color = "black";
    startButton.disabled = false;
    stopButton.disabled = true;
    restartButton.disabled = true;
  }

  updateTimeDisplay();

  startButton.addEventListener("click", onStart);
  stopButton.addEventListener("click", onStop);
  restartButton.addEventListener("click", onRestart);
});
