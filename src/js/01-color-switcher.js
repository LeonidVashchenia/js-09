function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startButtunRef = document.querySelector('button[data-start]');
const stopButtunRef = document.querySelector('button[data-stop]');
const bodyRef = document.querySelector('body');
let timerId = null;

const chengerBodyBgrColor = () => {
  startButtunRef.disabled = true;
  timerId = setInterval(() => {
    bodyRef.style.backgroundColor = getRandomHexColor();
  }, 1000);
  // console.log(startButtunRef);
};

startButtunRef.addEventListener('click', chengerBodyBgrColor);
stopButtunRef.addEventListener('click', () => {
  startButtunRef.disabled = false;
  clearInterval(timerId);
});
