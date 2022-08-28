import audioTemplate from './AudioTemplate';
import './AudioChallenge.scss';
import { Page, PagesState } from '../../model/types/page';
import audioTemplateGame from './AudioTemplateGame';
import { renderAudioResultPop } from './AudioResult';

import { getWords } from '../../../components/model/api/words';
import loadWords from '../../controller/helpers/word-helper';
import { WordData } from '../../../components/model/types/';

class AudioChallenge implements Page {
  state: PagesState;

  constructor(state: PagesState) {
    this.state = state;
  }

  // get nbr of choosen set of worlds

  async render() {
    this.state.page = 'audio';
    const notFoundNode = <HTMLElement>audioTemplate.content.cloneNode(true);
    const container = document.querySelector('#main-container') as HTMLDivElement;
    container.innerHTML = '';
    container.append(notFoundNode);
    const selectLevelBox = document.querySelector('.select-container') as HTMLElement;

    if (selectLevelBox) {
      selectLevelBox.addEventListener('click', this.docPrint);
    }

    // render game page
    const startAudioGameBtn = document.querySelector('.btn-start') as HTMLButtonElement;
    startAudioGameBtn.addEventListener('click', this.renderGame);

    return this.state;
  }

  async docPrint(e: Event) {
    const targetLi = e.target as HTMLLIElement;
    const setNr = targetLi.dataset.set;
    const wordsContent = (await getWords(Math.floor(Math.random() * 6), +setNr!)).data;
    const wordsArr = wordsContent.map((el: WordData) => el.word);
    this.renderWords(wordsContent);
    console.log('WA: ', wordsContent);
    return wordsContent;
  }

  renderWords(list: WordData) {
    console.log('WWW: ', list.word);
  }

  renderGame() {
    const notFoundNode = <HTMLElement>audioTemplateGame().content.cloneNode(true);
    const container = document.querySelector('#main-container') as HTMLDivElement;
    container.innerHTML = '';
    container.append(notFoundNode);
    const btnNext = document.querySelector('.btn-next');
    if (btnNext)
      btnNext?.addEventListener('click', (e: Event) => {
        renderAudioResultPop();
        // getWords(1, 1);
      });
  }
}

export default AudioChallenge;
