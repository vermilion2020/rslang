function startTimer(duration: number, container: HTMLElement) {
  var timer = duration;
  const interval = setInterval(function () {
      container.innerText = `${timer}`;

      if (--timer < 0) {
        clearInterval(interval);
      }
  }, 1000);
}

export default startTimer;