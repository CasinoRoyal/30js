const player = document.querySelector('.viewer');
const playerControls = document.querySelector('.player__controls');
const progressBar = playerControls.querySelector('.progress');
const progressBarFilled = progressBar.querySelector('.progress__filled');
const playBtn = playerControls.querySelector('.toggle');
const ranges = playerControls.querySelectorAll('.player__slider');
const skipBtns = playerControls.querySelectorAll('.skip');
const fullScrBtn = playerControls.querySelector('.fullscreen');

let isClicked = false;

function togglePlay (e) {
  const videoStatus = player.paused ? 'play' : 'pause';
  player[videoStatus]();
}

function changeIcon () {
  const icon = this.paused ? '►' : '||';
  playBtn.textContent = icon;
}

function rewind (e) {
  player.currentTime = (e.offsetX / progressBar.offsetWidth) * player.duration;
}

function updateProgressBar () {
  progressBarFilled.style.width = (player.currentTime * 100) / player.duration + '%';
  progressBarFilled.style.flexBasis = (player.currentTime * 100) / player.duration + '%';
}

function changeRange (e) {
  player[this.name] = this.value;
}

function skip (e)  {
  player.currentTime += parseFloat(this.dataset.skip);
}

function toggleFullScr () {
  player.requestFullscreen() || player.mozRequestFullScreen() || player.webkitRequestFullScreen() || player.msRequestFullscreen();
}

player.addEventListener('click', togglePlay);
player.addEventListener('play', changeIcon);
player.addEventListener('pause', changeIcon);
playBtn.addEventListener('click', togglePlay);
progressBar.addEventListener('click', rewind);
progressBar.addEventListener('mousemove', (e) => isClicked && rewind(e));
progressBar.addEventListener('mousedown', () => isClicked = true);
progressBar.addEventListener('mouseup', () => isClicked = false);
player.addEventListener('timeupdate', updateProgressBar);

ranges.forEach(range => {
  range.addEventListener('change', changeRange)
  range.addEventListener('mousemove', changeRange)
});

skipBtns.forEach(btn => {
  
  btn.addEventListener('click', skip)

});

fullScrBtn.addEventListener('click', toggleFullScr);

//var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;