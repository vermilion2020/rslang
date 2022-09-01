import audioTemplate from './AudioTemplate';
import './AudioChallenge.scss';
import { Page, PagesState } from '../../model/types/page';
import audioTemplateGame from './AudioTemplateGame';
import { renderAudioResultPop } from './AudioResult';

import { loadWords } from '../../controller/helpers';
import { updateWordData } from '../../controller/helpers/sprint-helper';
import { levelSelect, randomResultAu, getNewWord } from '../../controller/helpers/audio-helper';
import { CheckedWord, GameWordData, WordData } from '../../model/types';
import { apiBaseUrl, countPages } from '../../model/constants';

import { getWords, getWordTranslates } from '../../../components/model/api/words';

class AudioChallenge implements Page {
  state: PagesState;
  container: HTMLElement;
  player = <HTMLAudioElement>document.querySelector('.voice-ico');
  score: number = 0;
  successProbe: number = 0;
  countForSuccess: number = 10;
  unit: number;
  page: number;
  currentWord: GameWordData | null;
  words: WordData[] = [];
  selectedWords: string[] = [];
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
    this.selectedWords = [];
  }

  // get nbr of choosen set of worlds
  async handleSelectLevel(e: Event) {
    const target = <HTMLElement>e.target;
    if (target.classList.contains('select-level')) {
      this.unit = await levelSelect(target);
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
      this.renderGame();
      this.updateCard();
    });
    return this.state;
  }

  async updateCard() {
    //working part
    this.words = await loadWords(this.unit, this.page, this.state.loggedIn);

    const wordIndex = Math.floor(Math.random() * (this.words.length - 5));
    const selected = this.words.slice(wordIndex, wordIndex + 5);
    const quessWord = selected[Math.floor(Math.random() * 6)];

    this.selectedWords = selected.map((el) => el.wordTranslate);
    /// - possible to change on getNewWord

    //

    this.updateGameContent(this.selectedWords, quessWord);
  }

  updateGameContent = async (words: string[], quessWord: WordData) => {
    const content = <HTMLElement>document.querySelector('.content');
    const voiceIco = <HTMLDivElement>document.querySelector('.voice-ico');
    const speakerIco = <HTMLDivElement>document.querySelector('.speaker-ico');
    const selectContainer = <HTMLDivElement>document.querySelector('.select-container__game');
    const offerWords = [...document.querySelectorAll('.select-word')];
    const guessWord = document.querySelector('.select-offer') as HTMLElement;
    // const { result, translate } = randomResultAu(words);
    // guessWord.innerHTML = `${this.currentWord?.word}`;

    offerWords.map((el, i) => {
      el.innerHTML = `${this.selectedWords[i]}`;
    });

    guessWord.innerHTML = `${quessWord.word}`;
  };

  /////////////audioplayer
  // playWordAudio(target: HTMLElement) {
  //   const wordId = <string>target.dataset.id;
  //   const wordAudio = <string>this.checkedWords.find(item => item.wordId === wordId)?.audio;
  //   if(wordAudio) {
  //     this.player.src = `${apiBaseUrl}/${wordAudio}`;
  //     this.player.currentTime = 0;
  //     this.player.play();
  //   }
  // }

  renderGame() {
    const notFoundNode = <HTMLElement>audioTemplateGame().content.cloneNode(true);
    const container = document.querySelector('#main-container') as HTMLDivElement;
    container.innerHTML = '';
    container.append(notFoundNode);
    this.updateCard();

    container.addEventListener('click', (e: Event) => {});

    const btnNext = document.querySelector('.btn-next');
    if (btnNext)
      btnNext?.addEventListener('click', (e: Event) => {
        renderAudioResultPop();
      });
  }
}

export default AudioChallenge;
