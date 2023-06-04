// all modules
import Notiflix from 'notiflix';

// one by one
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Block } from 'notiflix/build/notiflix-block-aio';

const firstDelayInput = document.getElementsByName("delay")[0];
const delayStepInput = document.getElementsByName("step")[0];
const amountInput = document.getElementsByName("amount")[0];
const form = document.querySelector("form");

let nextNumber;
let nextDelay;
let delayStepData;
let amountData;
let createPromisesSI;

form.addEventListener("submit", dataEnteringFunction);

function dataEnteringFunction(e) {
  e.preventDefault();

  nextNumber = 0;
  nextDelay = Number(firstDelayInput.value);
  delayStepData = Number(firstDelayInput.value);
  amountData = Number(amountInput.value);

  setTimeout(createPromise, nextDelay, nextNumber, nextDelay);
  createPromisesSI = setInterval(createPromises, delayStepData);

  form.reset();
}

function createPromises() {
  nextNumber += 1;

  if (nextNumber > amountData) {
    clearInterval(createPromisesSI);
  }

  else {
    nextDelay += delayStepData;
    createPromise(nextNumber, nextDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
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
