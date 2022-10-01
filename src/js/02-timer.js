import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputRef = document.querySelector('#datetime-picker');
console.log(inputRef);
const buttonRef = document.querySelector('button[data-start]');
console.log(buttonRef);

let timeN = null;
console.log(timeN);
buttonRef.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  // defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timeN = selectedDates[0];
    console.log('timeN', timeN);
  },
};

const calendar = flatpickr(inputRef, options);
