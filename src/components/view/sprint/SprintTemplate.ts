import { randomResult } from "../../controller/helpers/sprint-helper";
import { CheckedWord, GameWordData } from "../../model/types";

export const sprintStartTemplate = (levelId?: string): HTMLTemplateElement => {
  const sprintStart = document.createElement('template');
  sprintStart.innerHTML = `
    <div class="start-sprint level-${levelId || 1}" data-id="${levelId || 1}">
      <h1>Спринт</h1>
      <p>Выберите соответсвует ли перевод предложенному слову</p>
      <div class="level-select">
        <a href="#/sprint/1/" data-id="1" class="level-select__button level-1">Раздел 1</a>
        <a href="#/sprint/2/" data-id="2" class="level-select__button level-2">Раздел 2</a>
        <a href="#/sprint/3/" data-id="3" class="level-select__button level-3">Раздел 3</a>
        <a href="#/sprint/4/" data-id="4" class="level-select__button level-4">Раздел 4</a>
        <a href="#/sprint/5/" data-id="5" class="level-select__button level-5">Раздел 5</a>
        <a href="#/sprint/6/" data-id="6" class="level-select__button level-6">Раздел 6</a>
      </div>
      <p class="start-countdown hidden">Приготовьтесь!: <span id="start-countdown">3</span></p>
    </div>`;
  return sprintStart;
} 

export const sprintCardTemplate = (word: GameWordData): HTMLTemplateElement => {
  const sprintCard = document.createElement('template');
  const { result, translate } = randomResult(word);
  sprintCard.innerHTML = `
    <div class="card-sprint" id="card-sprint" data-word="${word.id}" data-result="${result}">
      <div class="point-multiplier" data-count="1">
        <div class="circle" data-value="1"></div>
        <div class="circle" data-value="2"></div>
        <div class="circle" data-value="3"></div>
      </div>
      <p>Всего очков: <span id="score">0</span></p>
      <span id="start-countdown">59</span>
      <p>+<span id="success-count">10</span> очков за правильный ответ</p>
      <h3 id="card-word">${word.word}</h3>
      <h4 id="card-translate">${translate}</h4>
      <div class="decision">
        <button class="decision_button decision_button__false" data-value="0"><span class="arrow"></span> НЕВЕРНО</button>
        <button class="decision_button decision_button__true" data-value="1">ВЕРНО <span class="arrow"></span></button>
      </div>
    </div>`;
  return sprintCard;
} 

export const drawResultLine = (checkedWord: CheckedWord): string => {
  return `
    <div class="results-line">
      <div class="results-audio"></div>
      <div class="word">${checkedWord.word}</div>
      <div class="transcription">${checkedWord.transcription}</div> - 
      <div class="translate">${checkedWord.wordTranslate}</div>
    </div>`;
}

export const sprintResultsTemplate = (successWords: CheckedWord[], failedWords: CheckedWord[], score: number): HTMLTemplateElement => {
  const sprintResult = document.createElement('template');
  const successLines = successWords.map((item) => drawResultLine(item)).join('');
  const failedLines = failedWords.map((item) => drawResultLine(item)).join('');
  sprintResult.innerHTML = `
    <div class="results-sprint" id="results-sprint">
      <h3 id="heading">Набрано очков: ${score}</h3>
      <hr>
      <h3 id="heading">Знаю слова: ${successWords.length}</h3>
      <div class="success-words">
        ${successLines}
      </div>
      <hr>
      <h3 id="heading">Не знаю слова: ${failedWords.length}</h3>
      <div class="failed-words">
        ${failedLines}
      </div>
      <button class="play-again button" id="play-again">Попробовать еще раз</button>
    </div>`;
  return sprintResult;
} 
