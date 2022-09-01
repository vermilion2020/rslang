import audioTemplate from './templates/AudioTemplate';
import './AudioChallenge.scss';
import { Page, PagesState } from '../../model/types/page';
import audioTemplateGame, { drawTranslates } from './templates/AudioTemplateGame';
import { renderAudioResultPop } from './AudioResult';

import { loadWords } from '../../controller/helpers';
import { updateWordData, getNewWord } from '../../controller/helpers/sprint-helper';
import { unitSelect, randomResultAu, randomTranslates, showCorrectAnswer, resetCardsContent } from '../../controller/helpers/audio-helper';
import { CheckedWord, GameWordData, WordData } from '../../model/types';
import { apiBaseUrl, countAttempts, countPages } from '../../model/constants';

import { getWords, getWordTranslates } from '../../../components/model/api/words';

class AudioChallenge implements Page {
  state: PagesState;
  container: HTMLElement;
  player = <HTMLAudioElement>document.querySelector('#audio');
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
    if(startAudioGameBtn) {
      startAudioGameBtn.addEventListener('click', async (e: Event) => {
        this.renderGame();
      });
    }
    return this.state;
  }

  async updateCard() {
    if (this.checkedWords.length > countAttempts) {
      renderAudioResultPop();
    }
    console.log(this.checkedWords);
    const { word, updatedWords } = await getNewWord(
      this.words,
      this.unit,
      this.page,
      this.state.loggedIn,
      4,
      this.state.sprint.source
    );
    this.words = [...updatedWords];
    this.currentWord = { ...word };
    this.updateGameContent(this.currentWord);
  }

  async playWordAudio(audioPath?: string) {
    if (audioPath) {
      this.player.src = `${apiBaseUrl}/${audioPath}`;
      this.player.currentTime = 0;
      this.player.muted = false;
      try {
        await this.player.play();
      } catch {
        console.log('don\'t start audio on reload');
      }
      
    }
  }

  updateGameContent = async (word: GameWordData) => {
    resetCardsContent();
    const selectContainer = <HTMLDivElement>document.querySelector('.select-container__game');
    const gameCard = <HTMLElement>document.querySelector('.game-wrapper');
    const translatesTemplate = document.createElement('template');
    const { result, translates } = randomTranslates(word);
    gameCard.dataset.result = `${result + 1}`;
    translatesTemplate.innerHTML = drawTranslates(translates);
    const translatesBody = <HTMLElement>translatesTemplate.content.cloneNode(true);
    selectContainer.innerHTML = '';
    selectContainer.append(translatesBody);
    const correctCount = <HTMLElement>document.querySelector('.value-correct');
    correctCount.innerHTML = `${this.successTotal}`;
    this.playWordAudio(word.audio);
  };

  setInitialValues() {
    this.maxSuccess = 0;
    this.successTotal = 0;
    this.page = this.state.sprint.page !== -1 ? this.state.sprint.page : this.page;
    this.unit = this.state.sprint.unit !== -1 ? this.state.sprint.unit : this.unit;
  }

  async saveResult(word: GameWordData, result: boolean) {
    if (result) {
      this.maxSuccess += 1;
      this.successTotal += 1;
    } else {
      this.maxSuccess = 0;
    }

    if (this.state.loggedIn) {
      await updateWordData(result, word, this.state.userId, this.state.token);
    }
    const checked: CheckedWord = {
      wordId: word.id,
      word: word.word,
      wordTranslate: word.wordTranslate,
      transcription: word.transcription,
      audio: word.audio,
      result,
    };
    this.checkedWords.push(checked);
  }

  async handleDecision(e: Event | KeyboardEvent, container: HTMLElement) {
    const target = <HTMLElement>e.target;
   // disableDecisionButtons();
    let decision = 0;
    if ('key' in e) {
      decision = e.key === 'ArrowRight' ? 1 : 0;
    } else {
      decision = +<string>target.dataset.word;
    }
    const resultValue = +<string>container.dataset.result;
    const result = decision === resultValue;
    if (this.currentWord) {
      await this.saveResult(this.currentWord, result);
    }
    const audio = <HTMLElement>document.querySelector('.speaker-ico');
    if (this.currentWord && audio) {
      showCorrectAnswer(this.currentWord, result, decision);
      audio.addEventListener('click', () => {
        this.playWordAudio(this.currentWord?.audio);
      });
    }
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
      4,
      this.state.sprint.source
    );
    this.words = [...updatedWords];
    this.currentWord = { ...word };
    if (this.state.sprint.source === 'textbook' || this.state.sprint.source === 'dictionary') {
      this.words = this.words.filter(word => word.difficulty !== 'easy');
    }
    const gameNode = <HTMLElement>audioTemplateGame(this.currentWord).content.cloneNode(true);
    const container = document.querySelector('#main-container') as HTMLDivElement;
    container.innerHTML = '';
    container.append(gameNode);
    this.playWordAudio(this.currentWord.audio);
    const gameCard = <HTMLElement>document.querySelector('.game-wrapper');
      gameCard.addEventListener('click', (e: Event) => {
      const target = <HTMLElement>e.target;
      if (target.classList.contains('btn-next')) {
        this.updateCard();
      } else if (target.classList.contains('btn-dont-know') && this.currentWord) {
        showCorrectAnswer(this.currentWord, false, -1);
      } else if (target.classList.contains('voice-ico__block') && this.currentWord) {
        this.playWordAudio(this.currentWord.audio);
      } else if (target.classList.contains('select-word')) {
        this.handleDecision(e, gameCard);
      }
    });
  }
}

export default AudioChallenge;
