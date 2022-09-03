import { countAttempts } from '../../../model/constants';
import { CheckedWord } from '../../../model/types';

const drawResultLine = (checkedWord: CheckedWord, result: string): string => `
    <li class="result-item ${result}-item">
      <div class="on-speak img-voice__res"  data-id="${checkedWord.wordId}"></div>
      <span class="eng-word"> ${checkedWord.word} - </span>
      <span class="transcription"> - ${checkedWord.transcription} - </span>
      <span class="rus-word"> - ${checkedWord.wordTranslate}</span>
    </li>`;

const audioTemplateResult = (
  successWords: CheckedWord[],
  failedWords: CheckedWord[],
  successTotal: number
): HTMLTemplateElement => {
  const successLines = successWords.map((item) => drawResultLine(item, 'correct')).join('');
  const failedLines = failedWords.map((item) => drawResultLine(item, 'incorrect')).join('');
  const percent = Math.round((successTotal / countAttempts) * 100);
  const result = document.createElement('template');
  const progressCircular = <HTMLElement>document.querySelector('.progress-circular__pop');

  let start: number = 0;
  function bar(percent: number) {
    let progress = setInterval(() => {
      if (start < percent) {
        start += 1;
        progressEND();
      } else {
        start -= 1;
        progressEND();
      }

      function progressEND() {
        // percent = +`${start}%`;
        progressCircular.style.background = `conic-gradient($iconColorComplex ${
          start * 3.6
        }deg, $iconColorStudied 0deg)`;
        if (start == percent) {
          clearInterval(progress);
          // percent = +'';
        }
      }
    });
  }
  // bar(percent);

  result.innerHTML = `
      <div id="page-result" class="popupAudio">
        <div class="wrapper">
          <div class="head-result">
            <h3 id="result-value" class="result-value">Результат</h3>
            <h3 id="result-words" class="result-words">Посмотреть слова</h3>
          </div>
          <div class="result-info-value">
            <p class="result-description">Процент правильно изученных слов</p>
            <div class="out-pop">
              <div class="container-pop"> 
                <div class="progress-circular__pop">
                  <span class="value-pop">${percent}%</span>
                </div>
              </div>
            </div>
          </div>
          <div class="result-info-words hidden">
            <p class="studied-wrld">Выученные слова - ${successWords.length}</p>
              <ul class="result-correct">
                ${successLines}
              </ul>
              <hr class="hr-line">
              <p  class="unstudied-wrld">Не выученные слова - ${failedWords.length}</p>
              <ul class="result-incorrect">
                ${failedLines}
              </ul>
            
          </div>
          <div class="footer-result">
            <button class="result-repeat">Повторить</button>
            <button class="result-exit">Выйти</button>
          </div>
        </div>
      </div>`;
  return result;
};

export default audioTemplateResult;
