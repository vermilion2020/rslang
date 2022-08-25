import audioTemplate from './AudioTemplate';
// import docPrint from './AudioGame';
import './AudioChallenge.scss';
import { Page, PagesState } from '../../model/types/page';
import audioTemplateGame from './AudioTemplateGame';
import { renderAudioResultPop } from './AudioResult';
import { getWords } from './AudioGameApi';

class AudioChallenge implements Page {
  state: PagesState;

  constructor(state: PagesState) {
    this.state = state;
  }

  async render() {
    this.state.page = 'audio';
    const notFoundNode = <HTMLElement>audioTemplate.content.cloneNode(true);
    const container = document.querySelector('#main-container') as HTMLDivElement;
    container.innerHTML = '';
    container.append(notFoundNode);
    const selectLevelBox = document.querySelector('.select-container') as HTMLElement;

    //get nbr of choosen set of worlds
    const docPrint = (e: Event) => {
      const targetLi = e.target as HTMLLIElement;
      const setNr = targetLi.dataset.set;
      console.log('setNr: ', setNr);
      return setNr;
    };
    if (selectLevelBox) {
      selectLevelBox.addEventListener('click', docPrint);
    }

    // render game page
    const startAudioGameBtn = document.querySelector('.btn-start') as HTMLButtonElement;
    startAudioGameBtn.addEventListener('click', this.renderGame);

    return this.state;
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
        getWords(1, 1);
      });
  }
}

export default AudioChallenge;
