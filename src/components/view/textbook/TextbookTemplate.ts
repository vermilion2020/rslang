import WordData from '../../model/types/words';

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

export const pagingTemplate = (countPages: number, currentPage: number): HTMLTemplateElement => {
  const paging = document.createElement('template');
  // const blockPages: number = Math.ceil(currentPage / 5);
  // const overPages: number = (blockPages) * countPages + 1;

  // You need add some logic to calculate how much buttons should be here
  // just generating page numbers here
  const buttons = Array.from(Array(countPages).keys())
    .map((num) => num + 1)
    .map(
      (page) => `
        <button data-number="${page}" class="button ${page === currentPage && 'current-page'}">
          ${page}
        </button>`,
    )
    .join('');
  paging.innerHTML = `
    <div class="paging">
      <button class="paging__prev button${currentPage === 1 ? ' disabled' : ''}">Prev</button>
      ${buttons}
      <button class="paging__next button${currentPage === countPages ? ' disabled' : ''}">Next</button>
    </div>`;
  return paging;
};
