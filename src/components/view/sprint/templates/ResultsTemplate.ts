import { CheckedWord } from '../../../model/types/words';

export const drawResultLine = (checkedWord: CheckedWord): string => `
  <div class="results-line">
    <svg class="results-audio" data-id="${checkedWord.wordId}">
      <use class="results-audio" data-id="${checkedWord.wordId}" xlink:href="./icons/audio.svg#audio-inner"></use>
    </svg>
    <div class="word">${checkedWord.word}</div>
    <div class="transcription">${checkedWord.transcription}</div> - 
    <div class="translate">${checkedWord.wordTranslate}</div>
  </div>`;

export const sprintResultsTemplate = (
  successWords: CheckedWord[],
  failedWords: CheckedWord[],
  score: number,
  unit: number,
): HTMLTemplateElement => {
  const sprintResult = document.createElement('template');
  const successLines = successWords.map((item) => drawResultLine(item)).join('');
  const failedLines = failedWords.map((item) => drawResultLine(item)).join('');
  sprintResult.innerHTML = `
    <div class="sprint-container unit-${unit}-container">
      <div class="results-sprint" id="results-sprint">
        <h2 class="heading-h1">Результаты игры</h2>
        <h3 class="heading-h3">Вы набрали ${score} очков</h3>
        <hr>
        <div class="result-scroll">
          <h3 class="heading-h3">Угадано слов: <span class="results-success">${successWords.length}</span></h3>
          <div class="success-words">
            ${successLines}
          </div>
          <hr>
          <h3 class="heading-h3">Не угадано слов: <span class="results-fail">${failedWords.length}</span></h3>
          <div class="failed-words">
            ${failedLines}
          </div>
        </div>
        <hr>
        <button class="play-again button" id="play-again">Попробовать еще раз</button>
      </div>
    </div>`;
  return sprintResult;
};
