const player = document.querySelector('.viewer');
const playerControls = document.querySelector('.player__controls');
const progressBar = playerControls.querySelector('.progress');
const progressBarFilled = progressBar.querySelector('.progress__filled');
const playBtn = playerControls.querySelector('.toggle');
const volumeBar = playerControls.querySelector('.player__controls input[name=volume]');
const playbackRate = playerControls.querySelector('.player__controls input[name=playbackRate]');
const skipBtns = playerControls.querySelectorAll('.skip');

let isClicked = false;

function togglePlay (e) {

  if(!player.paused) {
    player.pause();
    playBtn.textContent = '►';
  } else {
    player.play();
    playBtn.textContent = '||';
  }

}

function rewind (e) {
  if(isClicked) {
    player.currentTime = (e.offsetX / progressBar.offsetWidth) * player.duration;
  }
}

function updateProgressBar () {
  progressBarFilled.style.width = (player.currentTime * 100) / player.duration + '%';
  progressBarFilled.style.flexBasis = (player.currentTime * 100) / player.duration + '%';
}

function changeVolume (e) {
  player.volume = e.target.value;
}

function skip (e)  {
  player.currentTime += parseFloat(this.dataset.skip);
}


playBtn.addEventListener('click', togglePlay);
player.addEventListener('click', togglePlay);

progressBar.addEventListener('click', (e) => { 
  isClicked = true; 
  rewind(e);
  isClicked = false; 
});
progressBar.addEventListener('mousemove', rewind);
progressBar.addEventListener('mousedown', () => isClicked = true);
progressBar.addEventListener('mouseup', () => isClicked = false);
player.addEventListener('timeupdate', updateProgressBar);

volumeBar.addEventListener('change', changeVolume)
volumeBar.addEventListener('mousemove', changeVolume)

skipBtns.forEach(btn => {
  
  btn.addEventListener('click', skip)

});
