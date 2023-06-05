import { Notify } from 'notiflix/build/notiflix-notify-aio';

const firstDelayInput = document.getElementsByName("delay")[0];
const delayStepInput = document.getElementsByName("step")[0];
const amountInput = document.getElementsByName("amount")[0];
const form = document.querySelector("form");

let nextDelay;
let delayStepData;
let amountData;
let createPromisesSI;

form.addEventListener("submit", dataEnteringFunction);

function dataEnteringFunction(e) {
  e.preventDefault();

  nextDelay = Number(firstDelayInput.value);
  delayStepData = Number(delayStepInput.value);
  amountData = Number(amountInput.value);

  setTimeout(createPromises, nextDelay);

  form.reset();
}

function createPromises() {
  for (let nextNumber = 1; nextNumber <= amountData; nextNumber += 1) {
    setTimeout(createPromise, nextDelay);

    createPromise(nextNumber, nextDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    nextDelay += delayStepData;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      setTimeout(() => {
        resolve({position, delay});
      }, delay);
    } else {
      setTimeout(() => {
        reject({position, delay});
      }, delay);
    }
  });
}
