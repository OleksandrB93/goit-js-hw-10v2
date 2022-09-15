// ! Напиши скрипт, який після натискання кнопки «Start»,
// ! раз на секунду змінює колір фону <body> на випадкове
// ! значення, використовуючи інлайн стиль.
// !УВАГА
// !Враховуй, що на кнопку «Start» можна натиснути
// !нескінченну кількість разів.
// !Зроби так, щоб доки зміна теми запущена,
// !кнопка «Start» була неактивною (disabled).
// !Натисканням на
// !кнопку «Stop» зміна кольору фону повинна зупинятися.

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let timerId = null;

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
console.log(btnStart, btnStop);

btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStopClick);

function onBtnStartClick() {
  timerId = setInterval(
    () => (document.body.style.backgroundColor = getRandomHexColor()),
    1000
  );

  btnStart.setAttribute('disabled', true);
  btnStop.removeAttribute('disabled');
}

function onBtnStopClick() {
  btnStop.setAttribute('disabled', true);
  btnStart.removeAttribute('disabled', false);

  clearInterval(timerId);
}
