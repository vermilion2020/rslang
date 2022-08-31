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
  wrapper.classList.add('wrapper-sec-dic');
  section.classList.add('section-dic', `unit-${currentUnit}`);
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

export const drawCard = (wordData: WordData, loggedIn: boolean): string => {
  let btnHardAction = 'to-hard';
  let btnEasyAction = 'to-easy';
  let statusInp = '';
  let textBtnHard = 'сделать сложным';
  let textBtnEasy = 'сделать изученным';
  if (wordData.difficulty) {
    if (wordData.difficulty === 'hard') {
      statusInp = 'hard';
      btnHardAction = 'to-base';
      textBtnHard = 'удалить из сложного';
    }
    if (wordData.difficulty === 'easy') {
      statusInp = 'easy';
      btnEasyAction = 'to-base';
      textBtnEasy = 'удалить из изученного';
    }
  }
  const card = `<div class="dictionary-card" id="${wordData.id}">
  <div class="diction-meta">
    <img class="diction-meta-photo" src="https://rslang-learn-words.herokuapp.com/${wordData.image}">
  </div>
  
  <div class="diction-desc ${loggedIn ? 'loggedin' : ''}">

    <div class="block-en">
      <div class="wordEn">${wordData.word[0].toUpperCase() + wordData.word.slice(1)}</div>
      <div class="text-meaning">${wordData.textMeaning}</div>
      <div class="text-example">${wordData.textExample}</div>
    </div>
    <div class="block-ru">
      <div class="wordRu">${wordData.wordTranslate[0].toUpperCase() + wordData.wordTranslate.slice(1)}</div>
      <div class="text-meaning-trn">${wordData.textMeaningTranslate}</div>
      <div class="text-example-trn">${wordData.textExampleTranslate}</div>
    </div>
    <div class="label ${wordData.difficulty ? wordData.difficulty : ''}"></div>
    <div class="sec-btn-diction">
      <div class="wrapper-btn-diction">
        <input type="radio" 
          class="radio-dif"
          onMouseDown="this.isChecked=this.checked;" 
          onClick="this.checked=!this.isChecked;" 
          name="${wordData.id}" value="hard" ${wordData.difficulty === 'hard' ? 'checked' : ''}/>сложное<br>
    
        <input type="radio"
        class="radio-dif"
          onMouseDown="this.isChecked=this.checked;" 
          onClick="this.checked=!this.isChecked;" 
          name="${wordData.id}" value="easy" ${wordData.difficulty === 'easy' ? 'checked' : ''}/>изученное<br>

      </div>
      <div class="wrapper-difficulty">
        <div class="difficulty vic ${wordData.optional && +wordData.optional.vic !== 0 ? 'play' : ''}">${wordData.optional?.vic}</div>
        <div class="difficulty loss ${wordData.optional && +wordData.optional.loss !== 0 ? 'play' : ''}">${wordData.optional?.loss}</div>
      </div>
    </div>
    
    <div class="btn-audio-wrapper">
      <div class="btn-audio-diction">
        <div class="icon-audio-diction"> </div>
      </div>
    </div>


  </div>
   
  </div>`;
  return card;
};

export const dictionaryTemplate = (words: WordData[], loggedIn: boolean): HTMLTemplateElement => {
  const textbook = document.createElement('template');
  const cards = words.map((word) => drawCard(word, loggedIn)).join('');
  textbook.innerHTML = `
    <div class="main-page">
      <div class="dictionary-container">
        ${cards}
      </div>
    </div>`;
  return textbook;
};

