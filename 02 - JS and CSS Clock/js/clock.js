const secondLine = document.querySelector('.second-hand');
const minuteLine = document.querySelector('.min-hand');
const hourLine = document.querySelector('.hour-hand');

function setTime () {
  const now = new Date();
  const seconds = ((now.getSeconds() / 60) * 360) + 90;
  const minutes = ((now.getMinutes() / 60) * 360) + 90;
  const hours = ((now.getHours() / 60) * 360) + 90;

  secondLine.style.transform = `rotate(${seconds}deg)`;
  minuteLine.style.transform = `rotate(${minutes}deg)`;
  hourLine.style.transform = `rotate(${hours}deg)`;
  
}

setInterval(setTime, 1000);