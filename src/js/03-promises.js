
// библиотека notiflix
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
debugger;
  const {
    elements: { delay, step, amount },
  } = event.target;

  let promiseDelay = Number(delay.value);

  for (let i = 1; i <= amount.value; i += 1) {
    createPromise(i, promiseDelay).then(onPromiseSuccess).catch(onPromiseError);
    promiseDelay += Number(step.value);
  }

  event.target.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onPromiseSuccess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`); // notiflix notify
}

function onPromiseError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`); // notiflix notify
}
