function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startButtunRef = document.querySelector('button[data-start]');
const stopButtunRef = document.querySelector('button[data-stop]');
const bodyRef = document.querySelector('body');
let timerId = null;

const changedBodyBgrColor = () => {
  startButtunRef.disabled = true;
  bodyRef.style.backgroundColor = getRandomHexColor();
  timerId = setInterval(() => {
    bodyRef.style.backgroundColor = getRandomHexColor();
  }, 1000);
};

startButtunRef.addEventListener('click', changedBodyBgrColor);
stopButtunRef.addEventListener('click', () => {
  startButtunRef.disabled = false;
  clearInterval(timerId);
});
