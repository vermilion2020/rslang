import audioTemplate from './AudioTemplate';
import './AudioChallenge.scss';
import { Page, PagesState } from '../../model/types/page';
import audioTemplateGame from './AudioTemplateGame';
import { renderAudioResultPop } from './AudioResult';

import { getWords } from '../../../components/model/api/words';
import { loadWords } from '../../controller/helpers/word-helper';
import { WordData } from '../../../components/model/types/';

class AudioChallenge implements Page {
  state: PagesState;

  words: WordData[];

  constructor(state: PagesState) {
    this.state = state;
    this.words = [];
  }

  // get nbr of choosen set of worlds

  async render() {
    this.state.page = 'audio';
    const notFoundNode = <HTMLElement>audioTemplate.content.cloneNode(true);
    const container = document.querySelector('#main-container') as HTMLDivElement;
    container.innerHTML = '';
    container.append(notFoundNode);
    const selectLevelBox = document.querySelector('.select-container') as HTMLElement;

    const startAudioGameBtn = document.querySelector('.btn-start') as HTMLButtonElement;

    if (selectLevelBox) {
      selectLevelBox.addEventListener('click', (e: Event) => {
        const targetLi = e.target as HTMLLIElement;
        const setNr = <string>targetLi.dataset.sett;
        startAudioGameBtn.dataset.sett = setNr;
      });
    }

    // render game page

    startAudioGameBtn.addEventListener('click', async (e: Event) => {
      this.words = await this.docPrint(e);
      this.renderGame();
    });

    return this.state;
  }
  /// get nr of select btn
  async docPrint(e: Event) {
    const targetLi = e.target as HTMLLIElement;
    const setNr = +(<string>targetLi.dataset.sett);
    console.log('datLI  ', targetLi.dataset.sett);
    const wordsContent = (await getWords(Math.floor(Math.random() * 6), setNr)).data;
    const wordsArr = wordsContent.map((el: WordData) => el.word);

    console.log('WA: ', wordsArr);
    return wordsArr;
  }

  renderGame() {
    const notFoundNode = <HTMLElement>audioTemplateGame().content.cloneNode(true);
    const container = document.querySelector('#main-container') as HTMLDivElement;
    container.innerHTML = '';
    container.append(notFoundNode);
    console.log('words: ', this.words);
    const offerWords = [...document.querySelectorAll('.select-word')];
    const guessWord = document.querySelector('.select-offer') as HTMLElement;
    // console.log('OW: ', offerWords);
    // console.log('QW: ', guessWord);

    // const arr = ['qq', 'ww', 'ee', 'rr', 'tt'];
    const arr = this.words;
    guessWord.innerHTML = `${arr[2]}`;
    offerWords.map((el, i) => {
      el.innerHTML = `${arr[i]}`;
    });

    console.log('OOW: ', offerWords[2].innerHTML === guessWord.innerHTML ? true : false);

    container.addEventListener('click', (e: Event) => {
      console.log(e.target);
    });

    const btnNext = document.querySelector('.btn-next');
    if (btnNext)
      btnNext?.addEventListener('click', (e: Event) => {
        renderAudioResultPop();
      });
  }
}

export default AudioChallenge;
