import { WordData } from '../../model/types/words';

// const dictionaryTemplate: HTMLTemplateElement = document.createElement('template');
// dictionaryTemplate.innerHTML = `
//   <div class="main-page">
//     <h2>Disctionary Page</h2>
//     <h3>Some Main Content</h3>
//   </div>`;
// export default dictionaryTemplate;


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


export const pagingTemplate = (currentUnit: number, currentPage: number): HTMLTemplateElement => {
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
        <button data-number="${page}" class="button-pag ${page === currentPage && 'current-page'}">
          ${page}
        </button>`,
    )
    .join('');
  paging.innerHTML = `
  <div class="wrapper-paging">
    <div class="paging">
      <button class="paging__prev button-pag" ${currentPage <= 1 ? 'disabled="disabled"' : ''}></button>
      ${buttons}
      <button class="paging__next button-pag" ${currentPage >= 30 ? 'disabled="disabled"' : ''}></button>
    </div>
    <a href="/#/textbook/unit${currentUnit}/${currentPage}"><button class="btn-to-menu" data-id="textbook">в учебник</button></a>
    </div>`;
  return paging;
};

