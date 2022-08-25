// import AudioChallenge from './AudioChallenge';

// //get nbr of choosen set of worlds
// const docPrint = (e: Event) => {
//   const targetLi = e.target as HTMLLIElement;
//   const setNr = targetLi.dataset.set;
//   console.log('setNr: ', setNr);
//   return setNr;
// };

// export default docPrint;

// let progressCircular = document.querySelector('.progress-circular');
// let btn = document.querySelector('.button');
// let inp = document.querySelector('input');
// let value = document.querySelector('.value');

// let start = 0;

// btn.addEventListener('click', bar);

// function bar() {
//   let progress = setInterval(() => {
//     if (start < inp.value) {
//       start++;
//       progressEND();
//     } else {
//       start--;
//       progressEND();
//     }

//     function progressEND() {
//       value.textContent = `${start}%`;
//       progressCircular.style.background = `conic-gradient(#880bea ${
//         start * 3.6
//       }deg, #ededed 0deg)`;
//       if (start == inp.value) {
//         clearInterval(progress);
//         inp.value = '';
//       }
//     }
//   });
// }
