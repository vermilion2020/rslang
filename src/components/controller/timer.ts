async function startTimer(duration: number, container: HTMLElement, cb: () => {}) {
  var timer = duration;
  const interval = setInterval(function () {
      container.innerText = `${timer}`;

      if (--timer < 0) {
        clearInterval(interval);
        cb();
      }
  }, 1000);
}

export default startTimer;