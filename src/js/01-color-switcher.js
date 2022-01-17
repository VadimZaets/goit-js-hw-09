const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timerId = null;

const changeBgColor = color => {
  color.style.backgroundColor = getRandomHexColor();
};

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  changeBgColor(document.body);
  timerId = setInterval(() => {
    changeBgColor(document.body);
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  startBtn.disabled = false;
  clearInterval(timerId);
});
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
