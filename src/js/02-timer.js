import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Countdown } from './countdown_timer.js';
import 'flatpickr/dist/flatpickr.min.css';
const NOTIFY_TIMEOUT = 5000; //ms

const startBtnRef = document.querySelector('button[data-start]');
const timerRefs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const timer = new Countdown({ onTick: updateTimerUI });

startBtnRef.disabled = true;
startBtnRef.addEventListener('click', onStartBtnClick);

const calendars = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: onDataSelect,
});

function onDataSelect(selectedDates) {
  console.log(selectedDates[0]);
  if (selectedDates[0] < Date.now()) {
    startBtnRef.disabled = true;
    Notify.warning('Please choose a date in the future', {
      timeout: NOTIFY_TIMEOUT,
    });
    return;
  }
  timer.reset();
  startBtnRef.disabled = false;
}

function onStartBtnClick() {
  timer
    .start(calendars.selectedDates[0])
    .then(value => {
      timer.reset();
      Notify.success(value, {
        timeout: NOTIFY_TIMEOUT,
      });
    })
    .catch(error =>
      Notify.warning(error, {
        timeout: NOTIFY_TIMEOUT,
      })
    );
  startBtnRef.disabled = true;
}

function updateTimerUI(timeLeftMiliseconds) {
  const timeLeft = convertMs(timeLeftMiliseconds);
  for (const field in timerRefs) {
    timerRefs[field].textContent = addLeadingZero(timeLeft[field]);
  }
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

function addLeadingZero(value) {
  const strValue = String(value);
  if (strValue.length > 2) {
    return strValue;
  }
  return strValue.padStart(2, '0');
}
