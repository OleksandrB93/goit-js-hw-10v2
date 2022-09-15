
// библиотека flatpickr
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_orange.css';
// библиотека notiflix
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtnRef = document.querySelector('button[data-start]');
const daysRef = document.querySelector('span[data-days]');
const hoursRef = document.querySelector('span[data-hours]');
const minutesRef = document.querySelector('span[data-minutes]');
const secondsRef = document.querySelector('span[data-seconds]');

let selectedDateTime = null;

// объект параметров flatpickr
const options = {
  enableTime: true, // добавляет в календарь время
  time_24hr: true, // 24 часовой формат
  defaultDate: new Date(), // время по-умолчанию - текущее время
  minuteIncrement: 1, // шаг прокрутки минут
  minDate: 'today', //минимально-возможный выбор
  
  // функция по готовности календаря
  onReady() {
    startBtnRef.setAttribute('disabled', true);
  },

  // функция при закрытии календаря
  onClose(selectedDates) {
    selectedDateTime = selectedDates[0].getTime();

    if (startBtnRef.hasAttribute('disabled')) {
      Notify.success('Everything is OK.'); // notiflix notify
      startBtnRef.removeAttribute('disabled');
    }
  },
};

startBtnRef.addEventListener('click', onStartBtnClick);

// инициализация flatpickr
flatpickr('#datetime-picker', options);

function onStartBtnClick() {
  startBtnRef.setAttribute('disabled', true);

  const intervalId = setInterval(() => {
    if (selectedDateTime - Date.now() < 0) {
      clearInterval(intervalId);
      return;
    }

    const timeToSelectedDate = convertMs(selectedDateTime - Date.now());
    OutputCountdown(timeToSelectedDate);
  }, 1000);
}

function convertMs(Ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(Ms / day);
  // Remaining hours
  const hours = Math.floor((Ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((Ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((Ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// добавить 0 до необходимого формата записи
function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

// вывести на экран обратный отсчет
function OutputCountdown({ days, hours, minutes, seconds }) {
  daysRef.textContent = addLeadingZero(days);
  hoursRef.textContent = addLeadingZero(hours);
  minutesRef.textContent = addLeadingZero(minutes);
  secondsRef.textContent = addLeadingZero(seconds);
}

// const timerRef = document.querySelector('.timer');
// const timerValueRef = document.querySelector('.value');
// const timerLabelRef = document.querySelector('.label');
// const fieldTimerRef = document.querySelectorAll('.field');

