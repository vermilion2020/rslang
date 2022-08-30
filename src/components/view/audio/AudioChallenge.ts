import audioTemplate from './AudioTemplate';
import './AudioChallenge.scss';
import { Page, PagesState } from '../../model/types/page';
import audioTemplateGame from './AudioTemplateGame';
import { renderAudioResultPop } from './AudioResult';

import { loadWords } from '../../controller/helpers';
import { getNewWord, updateWordData } from '../../controller/helpers/sprint-helper';
import { levelSelect, updateGameContent } from '../../controller/helpers/audio-helper';
import { CheckedWord, GameWordData, WordData } from '../../model/types';
import { apiBaseUrl, countPages } from '../../model/constants';

import { getWords } from '../../../components/model/api/words';

class AudioChallenge implements Page {
  state: PagesState;
  container: HTMLElement;
  score: number = 0;
  successProbe: number = 0;
  countForSuccess: number = 10;
  unit: number;
  page: number;
  currentWord: GameWordData | null;
  words: WordData[] = [];
  checkedWords: CheckedWord[] = [];
  counterUp = 0;
  counterSet = 10;

  constructor(state: PagesState) {
    this.container = document.querySelector('#main-container') as HTMLDivElement;
    this.state = state;
    this.words = [];
    this.page = Math.floor(Math.random() * countPages) + 1;
    this.unit = 1;
    this.currentWord = null;
  }

  // get nbr of choosen set of worlds
  async handleSelectLevel(e: Event) {
    const target = <HTMLElement>e.target;
    if (target.classList.contains('select-level')) {
      this.unit = await levelSelect(target);
      console.log('unit: ', this.unit);
    }
  }

  async render() {
    this.state.page = 'audio';
    const notFoundNode = <HTMLElement>audioTemplate.content.cloneNode(true);
    this.container.innerHTML = '';
    this.container.append(notFoundNode);

    if (this.state.audio.source === 'textbook' || this.state.audio.source === 'dictionary') {
      this.unit = this.state.audio.unit;
      this.page = this.state.audio.page;
      await this.renderGame();
    }
    const selectLevelBox = document.querySelector('.select-container') as HTMLElement;
    if (selectLevelBox) {
      selectLevelBox.addEventListener('click', (e: Event) => {
        const targetLi = e.target as HTMLLIElement;
        if (targetLi.classList.contains('select-level')) {
          this.handleSelectLevel(e);
        }
      });
    }
    // render game page
    const startAudioGameBtn = document.querySelector('.btn-start') as HTMLButtonElement;
    startAudioGameBtn.addEventListener('click', async (e: Event) => {
      // this.words = await this.docPrint(e);
      this.renderGame();
    });
    return this.state;
  }

  async updateCard() {
    const { word, updatedWords } = await getNewWord(this.words, this.unit, this.page);
    this.words = [...updatedWords];
    this.currentWord = { ...word };
    updateGameContent(this.currentWord);
  }

  /// get nr of select btn
  // async docPrint(e: Event) {
  //   const targetLi = e.target as HTMLLIElement;
  //   const setNr = +(<string>targetLi.dataset.sett);
  //   const wordsContent = await getWords(Math.floor(Math.random() * countPages), setNr).data;
  //   const wordsArr = wordsContent.map((el: WordData) => el.word);

  //   // console.log('WA: ', wordsArr);
  //   return wordsArr;
  // }

  renderGame() {
    const notFoundNode = <HTMLElement>audioTemplateGame().content.cloneNode(true);
    const container = document.querySelector('#main-container') as HTMLDivElement;
    container.innerHTML = '';
    container.append(notFoundNode);
    // console.log('words: ', this.words);
    const offerWords = [...document.querySelectorAll('.select-word')];
    const guessWord = document.querySelector('.select-offer') as HTMLElement;

    const arr = this.words;
    guessWord.innerHTML = `${arr[2]}`;
    offerWords.map((el, i) => {
      el.innerHTML = `${arr[i]}`;
    });

    // console.log('OOW: ', offerWords[2].innerHTML === guessWord.innerHTML ? true : false);

    container.addEventListener('click', (e: Event) => {
      // console.log(e.target);
    });

    const btnNext = document.querySelector('.btn-next');
    if (btnNext)
      btnNext?.addEventListener('click', (e: Event) => {
        renderAudioResultPop();
      });
  }
}

export default AudioChallenge;
