import audioTemplate from './AudioTemplate';
import AudioTemplateGame from './AudioTemplateGame';
import docPrint from './AudioGame';
import './AudioChallenge.scss';
import { Page, PagesState } from '../../model/types/page';

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
    if (selectLevelBox) {
      selectLevelBox.addEventListener('click', docPrint);
    }
    return this.state;
  }
}

export default AudioChallenge;
