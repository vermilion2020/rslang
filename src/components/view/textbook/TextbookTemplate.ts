import { WordData } from '../../model/types/words';

export const drawCard = (wordData: WordData): string => `
    <div class="textbook-card" id="${wordData.id}">
      <div>${wordData.word}</div>
      <div>${wordData.wordTranslate}</div>
    </div>`;

export const textbookTemplate = (words: WordData[], currentPage: number): HTMLTemplateElement => {
  const textbook = document.createElement('template');
  const cards = words.map((word) => drawCard(word)).join('');
  textbook.innerHTML = `
    <div class="main-page">
      <div class="cards-container">
        ${cards}
      </div>
    </div>`;
  return textbook;
};

export const unitTemplate = (currentUnit: number): HTMLTemplateElement => {
  const units = document.createElement('template');
  const unitNames = ['Раздел 1', 'Раздел 2', 'Раздел 3', 'Раздел 4', 'Раздел 5', 'Раздел 6', 'Сложное'];
  const buttons = unitNames.map(
    (unit) => `
    <button data-unit="${unit === 'Сложное' ? 7 : unit.slice(-1)}"
      class="button unit-button ${(+unit.slice(-1) === +currentUnit || currentUnit === 7) && 'current-unit'}">
      ${unit}
    </button>`,
  )
    .join('');
  units.innerHTML = `
    <div class="units">
    ${buttons}
    </div>`;
  return units;
}

export const pagingTemplate = (currentPage: number): HTMLTemplateElement => {
  const paging = document.createElement('template');
  let overPages = 1;
  const countPages = 5;
  if ((currentPage + 2) >= 30) {
    overPages = 26;
  }
  if ((currentPage + 2) < 30 && (currentPage - 2) > 1) {
    overPages = currentPage - 2;
  }
  const buttons = Array.from(Array(countPages).keys())
    .map((num) => num + overPages)
    .map(
      (page) => `
        <button data-number="${page}" class="button ${page === currentPage && 'current-page'}">
          ${page}
        </button>`,
    )
    .join('');
  paging.innerHTML = `
    <div class="paging">
      <button class="paging__prev button" ${currentPage <= 1 ? 'disabled="disabled"' : ''}>Prev</button>
      ${buttons}
      <button class="paging__next button" ${currentPage >= 30 ? 'disabled="disabled"' : ''}>Next</button>
    </div>`;
  return paging;
};
