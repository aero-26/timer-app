"use strict";

// Selectors
const setBtn = document?.querySelector(".set-btn");
const plusBtn = document?.querySelector(".plus-btn");
const minusBtn = document?.querySelector(".minus-btn");
const setTimeBtn = document
  ?.querySelector(".set-timer-shortcut")
  ?.querySelectorAll("button");
const startBtn = document?.querySelector(".start-btn");
const h1 = document?.querySelector("h1");
const resetBtn = document.querySelector(".reset-btn");
const alertMsgInp = document?.querySelector("textarea");
const body = document.querySelector("body");
const fakeVid = document.querySelector("video");
// -------------------------------------------

// Navigate to set time page
setBtn?.addEventListener("click", () => {
  localStorage.removeItem("alertMsg");
  localStorage.setItem("totalSecBac", "0");
  window.open("./setTime.html", "_self");
});

// -------------------------------------------

// Mouse clicks on + and - button
let plusMinus = "+";

const colorChange = (active) => {
  if (active === plusBtn) {
    plusMinus = "+";
    plusBtn.classList.add("active");
    minusBtn.classList.remove("active");
  } else {
    plusMinus = "-";
    minusBtn.classList.add("active");
    plusBtn.classList.remove("active");
  }
};

plusBtn?.addEventListener("click", () => {
  colorChange(plusBtn);
});

minusBtn?.addEventListener("click", () => {
  colorChange(minusBtn);
});

// By default + is selected
plusBtn?.click();

// -------------------------------------------

// Functionality to add and deduct timer also total timer also local storage

// Check for localStorage on Startup
const checkLocalStorage = () => {
  const check = localStorage.getItem("totalSecBac");

  if (check === null) {
    localStorage.setItem("totalSecBac", "0");
    totalSec = 0;
  } else {
    totalSec = Number(check);
  }
};

checkLocalStorage();

// To increase Time
const increaseTime = (value) => {
  totalSec += value;
  let checkTime = totalSec;
  if (checkTime < 359940) {
    totalSec = checkTime;
    let tempData = String(totalSec);
    localStorage.setItem("totalSecBac", tempData);
    replaceH1();
  } else {
    totalSec = 359940;
    let tempData = String(totalSec);
    localStorage.setItem("totalSecBac", tempData);
    replaceH1();
  }
};

// To decrease Time
const decreaseTime = (value) => {
  totalSec -= -1 * value;
  let checkTime = totalSec;
  if (checkTime > 0) {
    totalSec = checkTime;
    let tempData = String(totalSec);
    localStorage.setItem("totalSecBac", tempData);
    replaceH1();
  } else if (checkTime < 0) {
    reset = true;
    totalSec = 0;
    let tempData = String(totalSec);
    localStorage.setItem("totalSecBac", tempData);
    replaceH1();
    startBtn.textContent = "Start";
  }
};
//

// -------------------------------------------
// Functionality to Add minutes to the timer by press of button
const keyPressFunc = (btnsList) => {
  for (let i = 0; i < btnsList?.length; i++) {
    btnsList[i].addEventListener("click", () => {
      minOrHr2sec(btnsList[i].textContent);
    });
  }
};

const minOrHr2sec = (btn) => {
  if (btn.includes("Min")) {
    if (plusMinus === "-") {
      const min2sec = -1 * (Number(btn.split(" ")[0]) * 60);
      decreaseTime(min2sec);
      hideStartBtn();
    } else {
      const min2sec = Number(btn.split(" ")[0]) * 60;
      increaseTime(min2sec);
      hideStartBtn();
    }
  } else if (btn.includes("Hr")) {
    if (plusMinus === "-") {
      const hr2sec = -1 * (Number(btn.split(" ")[0]) * 60 * 60);
      decreaseTime(hr2sec);
      hideStartBtn();
    } else {
      const hr2sec = Number(btn.split(" ")[0]) * 60 * 60;
      increaseTime(hr2sec);
      hideStartBtn();
    }
  } else {
    return;
  }
  let tempHH = checkIfSingleDigit(hhNum());
  let tempMM = checkIfSingleDigit(mmNum());
  let tempSS = checkIfSingleDigit(ssNum());
  h1.innerText = `${tempHH}:${tempMM}:${tempSS}`;
};

keyPressFunc(setTimeBtn);
// -------------------------------------------

// Adding functionality to start timer clock
function countDown() {
  if (totalSec > 0 && startBtn.textContent === "Pause") {
    decreaseTime(-1);
    replaceH1();
    startTimer();
  } else if (totalSec === 0 && !reset) {
    localStorage.setItem("totalSecBac", "0");
    replaceH1();
    blink = true;
    effect();
    hideStartBtn();
    hideSetBtn();
    playAlarm();
  }
}

const startTimer = () => {
  setTimeout(countDown, 1000);
};

// Start Button Functionality

// Blink Effect
let blink = false;
let percent = 1;

const effect = function () {
  if (percent > 0.10000000000000014 && blink) {
    percent -= 0.1;
    setTimeout(effect, 90);
    h1.style.opacity = percent;
  } else if (percent === 0.10000000000000014 && blink) {
    percent = 1;
    setTimeout(effect, 90);
    h1.style.opacity = percent;
  } else if (!blink) {
    h1.style.opacity = 1;
  }
};

// Adding start button functionality

startBtn?.addEventListener("click", () => {
  reset = false;
  if (startBtn.textContent === "Start") {
    if (totalSec !== 0) {
      blink = false;
      h1.style.opacity = 1;
      startTimer();
      startBtn.textContent = "Pause";
    }
  } else if (startBtn.textContent === "Pause") {
    blink = true;
    effect();
    startBtn.textContent = "Start";
  }
});

//----------------------------

// Converting Seconds to Hours and Minutes and putting it in Clock
const hhNum = () => {
  return Math.trunc(totalSec / 3600);
};
const mmNum = () => {
  return Math.trunc((totalSec % 3600) / 60);
};
const ssNum = () => {
  return (totalSec % 60) % 60;
};

const replaceH1 = () => {
  let tempHH = checkIfSingleDigit(hhNum());
  let tempMM = checkIfSingleDigit(mmNum());
  let tempSS = checkIfSingleDigit(ssNum());
  h1.innerText = `${tempHH}:${tempMM}:${tempSS}`;
};

replaceH1();

// ----------------------------------------

// Hiding Start button on 00:00:00 and checking on start if paused
const hideStartBtn = () => {
  if (totalSec === 0) {
    startBtn?.classList.add("hidden");
    setBtn?.classList.remove("hidden");
  } else {
    startBtn?.classList.remove("hidden");
    setBtn?.classList.add("hidden");
  }
};

const hideSetBtn = () => {
  setBtn.classList.add("hidden");
};

const unhideSetBtn = () => {
  setBtn.classList.remove("hidden");
};

const checkifPausedOnStartup = () => {
  if (totalSec !== 0 && startBtn.innerText === "Start") {
    blink = true;
    effect();
  }
};

checkifPausedOnStartup();
hideStartBtn();

// ----------------------------------------

// Adding Reset Button Functions
let reset = false;
resetBtn?.addEventListener("click", () => {
  reset = true;
  totalSec = 0;
  localStorage.setItem("totalSecBac", "0");
  startBtn.textContent = "Start";
  replaceH1();
  pauseAlarm();
  setBtn.classList.remove("hidden");
  blink = false;
  hideStartBtn();
});
//----------------------------------------

// Note Message Setup
alertMsgInp?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
});

body.addEventListener("click", () => {
  let noteMsg = alertMsgInp.value;
  localStorage.setItem("alertMsg", noteMsg);
  // Play Fake video
  fakeVid?.play();
});

// Disabling refresh
body.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "r") {
    e.preventDefault();
  }
});

alertMsgInp.value = localStorage.getItem("alertMsg");

// Play fake vid
body.click();
