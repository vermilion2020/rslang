import audioTemplate from './templates/AudioTemplate';
import './AudioChallenge.scss';
import { Page, PagesState } from '../../model/types/page';
import audioTemplateGame, { drawTranslates } from './templates/AudioTemplateGame';
import { renderAudioResultPop } from './AudioResult';

import { loadWords } from '../../controller/helpers';
import { updateWordData, getNewWord } from '../../controller/helpers/sprint-helper';
import { unitSelect, randomResultAu } from '../../controller/helpers/audio-helper';
import { CheckedWord, GameWordData, WordData } from '../../model/types';
import { apiBaseUrl, countPages } from '../../model/constants';

import { getWords, getWordTranslates } from '../../../components/model/api/words';

class AudioChallenge implements Page {
  state: PagesState;
  container: HTMLElement;
  player = <HTMLAudioElement>document.querySelector('.voice-ico');
  score: number = 0;
  maxSuccess: number = 0;
  successTotal: number = 0;
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
    this.successTotal = 0;
    this.selectedWords = [];
  }

  // get nbr of choosen set of worlds
  async handleSelectLevel(e: Event) {
    const target = <HTMLElement>e.target;
    if (target.classList.contains('select-level')) {
      this.unit = await unitSelect(target);
    }
  }

  async render() {
    this.state.page = 'audio';
    const gameNode = <HTMLElement>audioTemplate.content.cloneNode(true);
    this.container.innerHTML = '';
    this.container.append(gameNode);

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
    });
    return this.state;
  }

  async updateCard() {
    //working part

    const { word, updatedWords } = await getNewWord(
      this.words,
      this.unit,
      this.page,
      this.state.loggedIn,
      5,
      this.state.sprint.source
    );
    this.words = [...updatedWords];
    this.currentWord = { ...word };
    this.updateGameContent(this.currentWord);
  }

  updateGameContent = async (word: GameWordData) => {
    const selectContainer = <HTMLDivElement>document.querySelector('.select-container__game');
    const translates = document.createElement('template');
    translates.innerHTML = drawTranslates(word.translates);
    const translatesBody = <HTMLElement>translates.content.cloneNode(true);
    selectContainer.innerHTML = '';
    selectContainer.append(translatesBody);
    const correctCount = <HTMLElement>document.querySelector('.value-correct');
    correctCount.innerHTML = `${this.successTotal}`;
    
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

  setInitialValues() {
    this.maxSuccess = 0;
    this.score = 0;
    this.successTotal = 0;
    this.page = this.state.sprint.page !== -1 ? this.state.sprint.page : this.page;
    this.unit = this.state.sprint.unit !== -1 ? this.state.sprint.unit : this.unit;
  }

  async renderGame() {
    this.setInitialValues();
    this.words = await loadWords(
      this.unit,
      this.page,
      this.state.loggedIn,
    );
    const { word, updatedWords } = await getNewWord(
      this.words,
      this.unit,
      this.page,
      this.state.loggedIn,
      5,
      this.state.sprint.source
    );
    this.words = [...updatedWords];
    this.currentWord = { ...word };
    const gameNode = <HTMLElement>audioTemplateGame(this.currentWord).content.cloneNode(true);
    const container = document.querySelector('#main-container') as HTMLDivElement;
    container.innerHTML = '';
    container.append(gameNode);

    container.addEventListener('click', (e: Event) => {});

    const btnNext = document.querySelector('.btn-next');
    if (btnNext)
      btnNext?.addEventListener('click', (e: Event) => {
        this.updateCard();
      });
  }
}

export default AudioChallenge;
