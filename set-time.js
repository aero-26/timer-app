"use strict";

// Selectors
const hhMenu = document.querySelector?.(".dropdown-hh")?.querySelector("ul");
const mmMenu = document?.querySelector(".dropdown-mm")?.querySelector("ul");
const ssMenu = document?.querySelector(".dropdown-ss")?.querySelector("ul");
const hh = document?.querySelector(".hh")?.querySelector("span");
const mm = document?.querySelector(".mm")?.querySelector("span");
const ss = document?.querySelector(".ss")?.querySelector("span");
const setBtn2 = document?.querySelector(".set-btn-2");
const backBtn = document?.querySelector(".back-btn");

// Accumulating Timer
let totalSec;

const addingToTotalSec = () => {
  totalSec += Number(hh.textContent.replace(":", "")) * 60 * 60;
  totalSec += Number(mm.textContent.replace(":", "") * 60);
  totalSec += Number(ss.textContent);
};

// Function to convert the single digit number double by adding 0 in front
const checkIfSingleDigit = (num) => {
  if (num < 10) {
    num = "0" + num;
    return num;
  } else {
    return num;
  }
};

// Function to generate the options
const genDropdownOptions = (menu, index) => {
  for (let i = 0; i < index; i++) {
    let newLi = document.createElement("li");
    i = checkIfSingleDigit(i);
    newLi.innerText = i;
    menu?.appendChild(newLi);
  }
};

// Generating options for hours minutes and seconds
genDropdownOptions(hhMenu, 100);
genDropdownOptions(mmMenu, 60);
genDropdownOptions(ssMenu, 60);

// Function to record the timer
const selectTimer = function (list, option) {
  for (let i = 0; i < list?.length; i++) {
    list[i].addEventListener("click", () => {
      if (option !== ss) {
        totalSec = 0;
        option.innerText = `${list[i].innerText}:`;
      } else {
        totalSec = 0;
        option.innerText = `${list[i].innerText}`;
      }
    });
  }
};

// For hour min and sec value
const hhOptns = hhMenu?.querySelectorAll("li");
selectTimer(hhOptns, hh);
const mmOptns = mmMenu?.querySelectorAll("li");
selectTimer(mmOptns, mm);
const ssOptns = ssMenu?.querySelectorAll("li");
selectTimer(ssOptns, ss);

// Set Alarm Tone and play function
let alarmAudio = new Audio("./sound/iphone_alarm.mp3");
alarmAudio.loop = true;

function playAlarm() {
  alarmAudio.play();
  navigator.vibrate([
    500, 400, 500, 400, 500, 400, 500, 400, 500, 400, 500, 400, 500, 400, 500,
    400, 500, 400, 500, 400, 500, 400, 500, 400, 500, 400, 500, 400, 500, 400,
    500, 400, 500, 400, 500, 400, 500, 400, 500, 400, 500, 400, 500, 400, 500,
    400, 500, 400, 500, 400, 500, 400, 500, 400, 500, 400, 500, 400, 500, 400,
    500, 400, 500, 400, 500, 400, 500, 400,
  ]);
}

function pauseAlarm() {
  alarmAudio.pause();
  navigator.vibrate(0);
}

// Setting up Start button
setBtn2?.addEventListener("click", () => {
  addingToTotalSec();
  console.log(String(totalSec));
  let tempData = String(totalSec);
  localStorage.setItem("totalSecBac", tempData);
  window.open("./index.html", "_self");
});

// Setting up Back button
backBtn?.addEventListener("click", () => {
  window.open("./index.html", "_self");
});
