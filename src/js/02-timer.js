// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

import { clockFaceAlert, createClockFace } from "./clockface";
import { arrowAnimationFunction} from "./clockface";

const clockFaceContainer = document.querySelector(".clock-face-container");
const timeOutputs = document.querySelectorAll(".value");
const daysOutput = timeOutputs[0];
const hoursOutput = timeOutputs[1];
const minutesOutput = timeOutputs[2];
const secondsOutput = timeOutputs[3];
const startButton = document.querySelector("[data-start]");

createClockFace(clockFaceContainer);

let period;
let difference
let periodSetInterval = NaN;
let hoursLeft;
let minutesLeft;
let secondsLeft;
let timeLeft = "0 days, 00:00:00";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const oldDate = new Date();
    const newDate = new Date(selectedDates);
    difference = newDate - oldDate;

    if (difference <= 0) {
      clockFaceAlert("Please choose a date in the future");
      startButton.removeEventListener("click", startFunction);
    }

    else {
      clockFaceAlert(timeToString(difference));
      startButton.addEventListener("click", startFunction);
    }
  },
};

flatpickr("#datetime-picker", options);

function startFunction() {  
  period = difference;
  if (periodSetInterval !== NaN) {
    clearInterval(periodSetInterval);
  }
  periodSetInterval = setInterval(addLeadingZero, 1000);
}

function addLeadingZero() {
    if (period < 1000) {
      clearInterval(periodSetInterval);
      clockFaceAlert("Time up!");
    }

    else {
      period -= 1000;
  
      hoursLeft = convertMs(period).hours;
      minutesLeft = convertMs(period).minutes;
      secondsLeft = convertMs(period).seconds;

      timeLeft = timeToString(period);
    }

    arrowAnimationFunction(hoursLeft, minutesLeft, secondsLeft, timeLeft);
}


function timeToString(mseconds) {
  const {days: daysLeft, hours: hoursLeft, minutes: minutesLeft, seconds: secondsLeft} = convertMs(mseconds);
  let daysLeftString = String(daysLeft);
  let hoursLeftString = String(hoursLeft).padStart(2, "0");
  let minutesLeftString = String(minutesLeft).padStart(2, "0");
  let secondsLeftString = String(secondsLeft).padStart(2, "0");

  daysOutput.textContent = daysLeftString;
  hoursOutput.textContent = hoursLeftString;
  minutesOutput.textContent = minutesLeftString;
  secondsOutput.textContent = secondsLeftString;

  return daysLeftString + " days, " + hoursLeftString + ":" + minutesLeftString + ":" + secondsLeftString;
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}