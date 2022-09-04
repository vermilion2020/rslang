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

export const sprintStartTemplate = (unitId?: string): HTMLTemplateElement => {
  const sprintStart = document.createElement('template');
  const unitClass = unitId ? ` unit-${unitId}-container` : '';
  sprintStart.innerHTML = `
    <div class="sprint-container${unitClass}">
      <div class="start-sprint" data-id="${unitId || 1}">
        <h2>Спринт</h2>
        <p>Правила игры:</p>
        <p>Выберите соответсвует ли перевод предложенному слову</p>
        <p>Используйте левую &#8592; и правую &#8594; стрелки  клавиатуры для выбора ответа</p>
        <p class="select-label">Выберите раздел:</p>
        <div class="unit-select">
          <button data-id="1" class="unit-select__button unit-sprint-1">Раздел 1</button>
          <button data-id="2" class="unit-select__button unit-sprint-2">Раздел 2</button>
          <button data-id="3" class="unit-select__button unit-sprint-3">Раздел 3</button>
          <button data-id="4" class="unit-select__button unit-sprint-4">Раздел 4</button>
          <button data-id="5" class="unit-select__button unit-sprint-5">Раздел 5</button>
          <button data-id="6" class="unit-select__button unit-sprint-6">Раздел 6</button>
        </div>
        ${timerNode(3, ' hidden unit-diagram')}
      </div>
    </div>`;
  return sprintStart;
};

export const sprintCardTemplate = (word: GameWordData): HTMLTemplateElement => {
  const sprintCard = document.createElement('template');
  const { result, translate } = randomResult(word);
  const unit = (word.group || 0 ) + 1;
  sprintCard.innerHTML = `
    <div class="sprint-container unit-${unit}-container">
      <div class="card-sprint" id="card-sprint" data-word="${word.id}" data-result="${result}">
        <p id="score">0</p>
        <span id="start-countdown" class="hidden">59</span>
        <p class="success-count">+<span id="success-count">10</span> очков за правильный ответ</p>
        <div class="point-multiplier">
          <div class="circle" data-value="1"></div>
          <div class="circle" data-value="2"></div>
          <div class="circle" data-value="3"></div>
        </div>
        <div class="unit-img unit-${unit}-img"></div>
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
