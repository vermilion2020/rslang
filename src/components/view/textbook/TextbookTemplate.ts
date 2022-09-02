import { WordData } from '../../model/types/words';

export const sectionWords = (currentUnit: number): Record<string, HTMLElement> => {
  const section = document.createElement('section');
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper-sec-word');
  section.classList.add('section-word', `unit-${currentUnit}`);
  section.append(wrapper);
  return { section, wrapper };
};

export const titleTemplate = (titleName: string) => {
  const titleBlock = document.createElement('template');
  titleBlock.innerHTML = `
  <p class="title-sec">${titleName}</p>`;
  return titleBlock;
};

export const drawCard = (wordData: WordData): string => {
  const card = `<div class="textbook-card" id="${wordData.id}">
    <div class="wordEn">${wordData.word[0].toUpperCase() + wordData.word.slice(1)}</div>
    <div ckass="wordRu">${wordData.wordTranslate[0].toUpperCase() + wordData.wordTranslate.slice(1)}</div>
    <div class="wrapper-difficulty">
      <div class="difficulty vic ${wordData.optional && +wordData.optional.vic !== 0 ? 'play' : ''}">${wordData.optional?.vic}</div>
      <div class="difficulty loss ${wordData.optional && +wordData.optional.loss !== 0 ? 'play' : ''}">${wordData.optional?.loss}</div>
    </div>
    <div class="label ${wordData.difficulty ? wordData.difficulty : ''}"></div>
  </div>`;
  return card;
};

export const textbookTemplate = (words: WordData[]): HTMLTemplateElement => {
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

export const unitTemplate = (currentUnit: number, loggedIn: boolean): HTMLTemplateElement => {
  const units = document.createElement('template');
  const unitNames = [1, 2, 3, 4, 5, 6, 7];
  const buttons = unitNames.map(
    (unit) => `
    <button data-unit="${unit}"
      class="button unit-button ${unit === currentUnit ? 'current-unit' : ''}"
      ${unit === 7 && loggedIn === false ? 'disabled="disabled"' : ''}
      >
      ${unit === 7 ? 'сложное' : `раздел ${unit}`}
      ${unit === 7 ? '<div class="lable-btn"></div>' : ''}
    </button>`,
  )
    .join('');
  units.innerHTML = `
    <div class="units">
    ${buttons}
    </div>`;
  return units;
};

export const pagingTemplate = (
  currentUnit: number,
  currentPage: number,
  dataPerPage: boolean[],
  tochapter: string,
  btntext: string,
): HTMLTemplateElement => {
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
      (page, i) => `
      <div class="wrapper-btn-pag ${dataPerPage[i] ? 'super' : ''}">
        <button data-number="${page}"
        class="button-pag ${page === currentPage && 'current-page'}">
          ${page}
        </button>
        <div class="icon-super"></div>
        </div>`,
    )
    .join('');
  paging.innerHTML = `
  <div class="wrapper-paging">
  <a href="/#/${tochapter}/unit${currentUnit}/${currentPage}">
    <button class="btn-to-menu" data-id="${tochapter}">${btntext}</button>
  </a>
    <div class="paging">
      <button class="paging__prev button-pag" ${currentPage <= 1 ? 'disabled="disabled"' : ''}></button>
      ${buttons}
      <button class="paging__next button-pag" ${currentPage >= 30 ? 'disabled="disabled"' : ''}></button>
    </div>
    </div>`;
  return paging;
};

export const playTemplate = (unit: number, page: number, chapter: string) => {
  const playPart = document.createElement('template');
  playPart.innerHTML = `
  <section class="section-game">
    <div class="wrapper-game">
      <p class="title-sec">Игры</p>
      <p class="desc">Перейди в игры со страниц Учебника или Словаря и твои результат отобразятся в этих разделах.</p>
      <div class="wrapper-btn">
        <div class="wrapper-sprint">
          <a href="${unit === 7 ? '/#/sprint' : `/#/sprint/unit${unit}/${page}/${chapter}`}">
            <button class="btn-game btn-sprint" data-id="sprint">Играть<br>в<br>Спринт</button>
          </a>
          <div class="icon-bg-sprint"></div>
        </div>
        <div class="wrapper-audio">
        <a href="${unit === 7 ? '/#/audio' : `/#/audio/unit${unit}/${page}/${chapter}`}">
            <button class="btn-game btn-audio" data-id="audio">Играть<br>в<br>Аудиовызов</button>
          </a>
          <div class="icon-bg-audio"></div>
          <div class="icon-star-audio"></div>
        </div>
      </div>
    </div>
  </section>`;
  return playPart;
};
