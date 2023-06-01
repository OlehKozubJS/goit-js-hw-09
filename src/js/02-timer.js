// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

import { createClockFace } from "./clockface";
import { arrowAnimationFunction} from "./clockface";

const timer = document.querySelector(".timer");
const timeOutputs = document.querySelectorAll(".value");
const daysOutput = timeOutputs[0];
const hoursOutput = timeOutputs[1];
const minutesOutput = timeOutputs[2];
const secondsOutput = timeOutputs[3];
const startButton = document.querySelector("[data-start]");

createClockFace(timer);

startButton.addEventListener("click", startFunction);

let period;
let periodSetInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const oldDate = new Date();
    const newDate = new Date(selectedDates);
    period = newDate - oldDate;
  },
};

flatpickr("#datetime-picker", options);

function startFunction() {
  startButton.removeEventListener("click", startFunction);
  periodSetInterval = setInterval(addLeadingZero, 1000);
}

function addLeadingZero() {
    let timeLeft = 0;

    if (period < 1000) {
      clearInterval(periodSetInterval);
      startButton.addEventListener("click", startFunction);
      timeLeft = "Time Up!<br>";
    }
    else {
      period -= 1000;
      timeLeft = "";
    }

    daysOutput.textContent = String(convertMs(period).days).padStart(2, "0");
    hoursOutput.textContent = String(convertMs(period).hours).padStart(2, "0");
    minutesOutput.textContent = String(convertMs(period).minutes).padStart(2, "0");
    secondsOutput.textContent = String(convertMs(period).seconds).padStart(2, "0");

    let daysLeft = String(convertMs(period).days).padStart(2, "0");
    let hoursLeft = String(convertMs(period).hours).padStart(2, "0");
    let minutesLeft = String(convertMs(period).minutes).padStart(2, "0");
    let secondsLeft= String(convertMs(period).seconds).padStart(2, "0");
    timeLeft += daysLeft + ":" + hoursLeft + ":" + minutesLeft + ":" + secondsLeft;

    arrowAnimationFunction(convertMs(period).hours, convertMs(period).minutes, Number(secondsLeft), timeLeft);
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