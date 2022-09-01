import { randomResult } from '../../../controller/helpers/sprint-helper';
import { GameWordData } from '../../../model/types';

const timerNode = (seconds: number, visible: string) => `
<div class="diagram timer${visible}" data-seconds="${seconds}">
<div class="piece left"></div>
<div class="piece right"></div>
<div class="text">
  <div>
    <b>${seconds}</b>
    <span>SECONDS</span>
  </div>
</div>
</div>`;

const drawUnits = () => {
  let units = '';
  for (let i = 0; i < 6; i += 1) {
    const counter = i + 1;
    units += `<button data-id="${counter}" class="unit-select__button unit-sprint-${counter}">Раздел ${counter}</button>`;
  }
  return units;
};

export const sprintStartTemplate = (unitId?: string): HTMLTemplateElement => {
  const sprintStart = document.createElement('template');
  sprintStart.innerHTML = `
    <div class="sprint-container">
      <div class="start-sprint" data-id="${unitId || 1}">
        <h1>Спринт</h1>
        <p>Правила игры:</p>
        <p>Выберите, соответствует ли перевод предложенному слову?</p>
        <p class="select-label">Выберите раздел:</p>
        <div class="unit-select">
          ${drawUnits()}
        </div>
        ${timerNode(3, ' hidden unit-diagram')}
      </div>
    </div>`;
  return sprintStart;
};

export const sprintCardTemplate = (word: GameWordData): HTMLTemplateElement => {
  const sprintCard = document.createElement('template');
  const { result, translate } = randomResult(word);
  sprintCard.innerHTML = `
    <div class="sprint-container">
      <div class="card-sprint" id="card-sprint" data-word="${word.id}" data-result="${result}">
        <p id="score">0</p>
        <span id="start-countdown" class="hidden">59</span>
        <p class="success-count">+<span id="success-count">10</span> очков за правильный ответ</p>
        <div class="point-multiplier">
          <div class="circle" data-value="1"></div>
          <div class="circle" data-value="2"></div>
          <div class="circle" data-value="3"></div>
        </div>
        <h3 id="card-word" class="card-word">${word.word}</h3>
        <h4 id="card-translate" class="card-translate">${translate}</h4>
        <div class="decision">
          <button class="decision_button decision_button__false" data-value="0">Неверно</button>
          <button class="decision_button decision_button__true" data-value="1">Верно</button>
        </div>
      </div>
      ${timerNode(59, ' card-diagram')}
    </div>`;
  return sprintCard;
};
