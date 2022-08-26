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
// const main = 'https://rslang-learn-words.herokuapp.com';

// const words = `${main}/words`;
// interface IArrWord {
//   word: string;
// }
// let arrWords: string[];
// export const getWords = async (group: number, page: number) => {
//   const response = await fetch(`${words}?group=${group}&page=${page}`);
//   const letWord = await response.json();
//   arrWords = letWord.map((el: IArrWord) => el.word);
//   console.log(arrWords);
//   return arrWords;
// };
// getWords(1, 1);
