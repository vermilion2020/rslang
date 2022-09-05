async function startTimer(duration: number, cb: () => Promise<void>) {
  let timer = duration;
  const interval = setInterval(() => {
    timer -= 1;
    if (timer < 1) {
      clearInterval(interval);
      cb();
    }
  }, 1000);
}

export function timerCard(seconds: number, className: string) {
  const diagramBox = <HTMLElement>document.querySelector(`.diagram.timer.${className}`);
  if (diagramBox) {
    const secondsData = +(<string>diagramBox.dataset.seconds);

    const deg = (360 * seconds) / secondsData + 180;
    if (seconds >= secondsData / 2) {
      diagramBox.classList.add('over_50');
    } else {
      diagramBox.classList.remove('over_50');
    }

    (<HTMLElement>diagramBox.querySelector('.piece.right')).style.transform = `rotate(${deg}deg)`;
    (<HTMLElement>diagramBox.querySelector('.text b')).innerText = `${seconds}`;

    setTimeout(() => {
      timerCard(seconds - 1, className);
    }, 1000);
  }
}

export default startTimer;
