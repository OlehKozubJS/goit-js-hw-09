// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const timeOutputs = document.querySelectorAll(".value");
const daysOutput = timeOutputs[0];
const hoursOutput = timeOutputs[1];
const minutesOutput = timeOutputs[2];
const secondsOutput = timeOutputs[3];

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
    periodSetInterval = setInterval(addLeadingZero, 1000);
  },
};

flatpickr("#datetime-picker", options);

function addLeadingZero() {
    if (period < 1000) {
      clearInterval(periodSetInterval);
      console.log("Time Up!");
    }
    else {
      period -= 1000;
    }

    daysOutput.textContent = String(convertMs(period).days).padStart(2, "0");
    hoursOutput.textContent = String(convertMs(period).hours).padStart(2, "0");
    minutesOutput.textContent = String(convertMs(period).minutes).padStart(2, "0");
    secondsOutput.textContent = String(convertMs(period).seconds).padStart(2, "0");
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