const panels = document.querySelectorAll('.panel');

function toggleOpen(target) {
  target.classList.toggle('open');
}

function toggleOpenActive(e) {
  if(e.propertyName === 'flex-grow') {
    this.classList.toggle('open-active');
  }
}

panels.forEach( panel => {
  panel.addEventListener('click', function(e) {
    
    for (let i = 0; i < panels.length; i++) {
      
      if (panels[i] === this) {
        toggleOpen(this);
        continue;
      } 

      panels[i].classList.remove('open');  

    }

  });

  panel.addEventListener('transitionend', toggleOpenActive)
});