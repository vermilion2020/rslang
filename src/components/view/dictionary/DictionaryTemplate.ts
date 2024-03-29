import { apiBaseUrl } from '../../model/constants';
import { WordData } from '../../model/types/words';

export const sectionWords = (currentUnit: number, statusPage:boolean): Record<string, HTMLElement> => {
  let learnChapter = 'learn-base';
  if (currentUnit !== 7) {
    if (statusPage) {
      learnChapter = 'learn-chapter';
    }
  }
  const section = document.createElement('section');
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper-sec-dic');
  section.classList.add('section-dic', `unit-${currentUnit}`, `${learnChapter}`);
  section.append(wrapper);
  return { section, wrapper };
};

export const drawCard = (wordData: WordData, loggedIn: boolean): string => {
  const card = `<div class="dictionary-card" id="${wordData.id}">
  <div class="diction-meta">
    <img class="diction-meta-photo" src="${apiBaseUrl}/${wordData.image}">
  </div>
  
  <div class="diction-desc ${loggedIn ? 'loggedin' : ''}">

    <div class="block-en">
      <div class="wordEn">${wordData.word[0].toUpperCase() + wordData.word.slice(1)}  ${wordData.transcription}</div>
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
        <input type="hidden" id="difficulty_${wordData.id}" value="${wordData.difficulty}">
          <div class="difficulty-block">
            <button data-value="hard" 
              data-id="${wordData.id}" 
              data-icon="hard_${wordData.id}"
              class="difficulty-button hard-icon${wordData.difficulty === 'hard' ? ' active' : ''}">
            сложное</button><br>
          </div>
          <div class="difficulty-block">
            <button data-value="easy" 
              data-id="${wordData.id}"
              data-icon="easy_${wordData.id}"
              class="difficulty-button easy-icon${wordData.difficulty === 'easy' ? ' active' : ''}">
            изученное</button><br>
          </div>
      </div>
      <div class="wrapper-difficulty">
        <div class="difficulty vic ${wordData.optional && +wordData.optional.vic !== 0 ? 'play' : ''}">${
  wordData.optional?.vic
}</div>
        <div class="difficulty loss ${wordData.optional && +wordData.optional.loss !== 0 ? 'play' : ''}">${
  wordData.optional?.loss
}</div>
      </div>
    </div>
    
    <div class="btn-audio-wrapper">
      <button class="btn-audio-diction" 
      data-audio="${wordData.audio}"
      data-audioMeaning="${wordData.audioMeaning}"
      data-audioExample="${wordData.audioExample}"
      >
        <div class="icon-audio-diction"> </div>
      </button>
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
