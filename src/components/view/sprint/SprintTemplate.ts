export const sprintStartTemplate = (levelId?: string): HTMLTemplateElement => {
  const sprintStart = document.createElement('template');
  sprintStart.innerHTML = `
    <div class="start-sprint level-${levelId || 1}" data-id="${levelId || 1}">
      <h1>Спринт</h1>
      <p>Выберите соответсвует ли перевод предложенному слову</p>
      <div class="level-select">
        <a href="#/sprint/1/" data-id="1" class="level-select__button level-1">Уровень 1</a>
        <a href="#/sprint/2/" data-id="2" class="level-select__button level-2">Уровень 2</a>
        <a href="#/sprint/3/" data-id="3" class="level-select__button level-3">Уровень 3</a>
        <a href="#/sprint/4/" data-id="4" class="level-select__button level-4">Уровень 4</a>
        <a href="#/sprint/5/" data-id="5" class="level-select__button level-5">Уровень 5</a>
        <a href="#/sprint/6/" data-id="6" class="level-select__button level-6">Уровень 6</a>
      </div>
      <p class="start-countdown hidden">Приготовьтесь!: <span id="start-countdown">5</span></p>
    </div>`;
  return sprintStart;
} 
