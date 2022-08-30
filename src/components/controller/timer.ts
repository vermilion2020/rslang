async function startTimer(duration: number, cb: () => {}) {
  var timer = duration;
  const interval = setInterval(function () {
      if (--timer < 0) {
        clearInterval(interval);
        cb();
      }
  }, 1000);
}

export function timerCard(seconds: number, className: string) {
  let diagramBox = <HTMLElement>document.querySelector(`.diagram.timer.${className}`);
  if(diagramBox) {
    const secondsData = +<string>diagramBox.dataset.seconds;
  
    seconds = seconds;
  
    let deg = (360 * seconds / secondsData) + 180;
    if(seconds >= secondsData / 2){
        diagramBox.classList.add('over_50');
    }else{
        diagramBox.classList.remove('over_50');
    }
  
    (<HTMLElement>diagramBox.querySelector('.piece.right')).style.transform = 'rotate('+deg+'deg)';
    (<HTMLElement>diagramBox.querySelector('.text b')).innerText = `${seconds}`;
  
    setTimeout(function(){
      timerCard(seconds - 1, className);
    }, 1000);
  } 
}

export default startTimer;