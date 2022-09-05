import { countAttempts } from '../../../model/constants';
import { CheckedWord } from '../../../model/types/words';

const drawResultLine = (checkedWord: CheckedWord, result: string): string => `
    <li class="result-item ${result}-item">
      <svg class="on-speak img-voice__res" data-id="${checkedWord.wordId}">
        <use class="on-speak" data-id="${checkedWord.wordId}" xlink:href="./icons/audio.svg#audio-inner"></use>
      </svg>
      <span class="eng-word"> ${checkedWord.word} </span>
      <span class="transcription"> ${checkedWord.transcription} - </span>

      <span class="rus-word">${checkedWord.wordTranslate}</span>
    </li>`;

const audioTemplateResult = (
  successWords: CheckedWord[],
  failedWords: CheckedWord[],
  successTotal: number,
): HTMLTemplateElement => {
  const successLines = successWords.map((item) => drawResultLine(item, 'correct')).join('');
  const failedLines = failedWords.map((item) => drawResultLine(item, 'incorrect')).join('');
  const percent = Math.round((successTotal / countAttempts) * 100);
  const result = document.createElement('template');

  result.innerHTML = `
      <div id="page-result" class="popupAudio">
        <div class="wrapper">
          <div class="head-result">
            <div class="menu-buttons">
              <button id="result-value" class="result-value button button_light">Результат</button>
              <button id="result-words" class="result-words button">Посмотреть слова</button>
            </div>
            <div class="close-audio__game">
              <a class="close-audio__gamepage"><div class="close-crose__white"></div></a>
            </div>
          </div>
          <div class="result-info-value">
            <p class="result-description">Процент угаданных слов</p>
            <div class="out-pop">
              <div class="container-pop"> 
                <div class="progress-circular__pop progress-backgrd">
                  <span class="value-pop">${percent}%</span>
                </div>
              </div>
            </div>
          </div>
          <div class="result-info-words hidden">
            <p class="studied-wrld">Выученные слова <span class="results-success">${successWords.length}</span></p>
              <ul class="result-correct">
                ${successLines}
              </ul>
              <hr class="hr-line">
              <p  class="unstudied-wrld">Не выученные слова <span class="results-fail">${failedWords.length}</span></p>
              <ul class="result-incorrect">
                ${failedLines}
              </ul>
            
          </div>
          <div class="footer-result">
            <button class="result-repeat button">Повторить</button>
          </div>
        </div>
      </div>`;
  return result;
};

export default audioTemplateResult;
