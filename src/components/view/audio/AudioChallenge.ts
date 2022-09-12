import audioTemplate from './templates/AudioTemplate';
import './AudioChallenge.scss';
import { Page, PagesState } from '../../model/types/page';
import audioTemplateGame, { drawTranslates } from './templates/AudioTemplateGame';
import renderAudioResultPop from './AudioResult';

import { loadWords } from '../../controller/helpers';

import { updateWordData, getNewWord, saveGameStatistics } from '../../controller/helpers/sprint-helper';
import {
  unitSelect,
  randomTranslates,
  showCorrectAnswer,
  resetCardsContent,
  disableDecisionButtons,
  playWordAudio,
  drawProgress,
} from '../../controller/helpers/audio-helper';

import { CheckedWord, GameWordData, WordData } from '../../model/types/words';
import {
  answers, countAttempts, countPages, failedSound, successSound, units,
} from '../../model/constants';

class AudioChallenge implements Page {
  state: PagesState;

  container: HTMLElement;

  score = 0;

  maxSuccess = 0;

  successTotal: number;

  successInRope: number;

  unit: number;

  page: number;

  currentWord: GameWordData | null;

  words: WordData[] = [];

  selectedWords: string[] = [];

  checkedWords: CheckedWord[] = [];

  correct: number;

  numTried: number;

  constructor(state: PagesState) {
    this.container = document.querySelector('#main-container') as HTMLDivElement;
    this.state = state;
    this.words = [];
    this.page = Math.floor(Math.random() * countPages) + 1;
    this.unit = 1;
    this.correct = -1;
    this.currentWord = null;
    this.successTotal = 0;
    this.selectedWords = [];
    this.successInRope = 0;
    this.maxSuccess = 0;
    this.numTried = 1;
    document.addEventListener('keydown', async (e: KeyboardEvent) => {
      const { key } = e;
      const keyNum = Number.parseInt(key, 10);
      const btnStart = document.querySelector('.btn-start');
      const authForm = document.querySelector('#auth-form');
      if (units.includes(keyNum) && btnStart && !authForm) {
        this.unit = await unitSelect(e);
      } else if (key === 'Enter' && btnStart) {
        const selected = <HTMLElement>document.querySelector('.select-container');
        if (selected && selected.dataset.sett) 
        {
          this.renderGame();
          this.state.gameStarted = true;
        }  
      }
    });
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
      selectLevelBox.addEventListener('click', async (e: Event) => {
        const targetLi = e.target as HTMLLIElement;
        if (targetLi.classList.contains('select-level')) {
          this.unit = await unitSelect(e);
        }
      });
    }
    // render game page
    const startAudioGameBtn = document.querySelector('.btn-start') as HTMLButtonElement;
    if (startAudioGameBtn) {
      startAudioGameBtn.addEventListener('click', async () => {
        const selected = <HTMLElement>document.querySelector('.select-container');
        if (selected && selected.dataset.sett) 
        {
          this.renderGame();
        }
      });
    }
    return this.state;
  }

  async updateCard() {
    if (this.checkedWords.length >= countAttempts) {
      await this.renderResults();
      await this.render();
    } else {
      drawProgress(this.numTried);
      const { word, updatedWords } = await getNewWord(
        this.words,
        this.unit,
        this.page,
        this.state.loggedIn,
        4,
        this.state.sprint.source,
      );
      this.words = [...updatedWords];
      this.currentWord = { ...word };
      this.updateGameContent(this.currentWord);
    }
  }

  updateGameContent = async (word: GameWordData) => {
    resetCardsContent();
    const selectContainer = <HTMLDivElement>document.querySelector('.select-container__game');
    const translatesTemplate = document.createElement('template');
    const { result, translates } = randomTranslates(word);
    this.correct = result + 1;
    translatesTemplate.innerHTML = drawTranslates(translates);
    const translatesBody = <HTMLElement>translatesTemplate.content.cloneNode(true);
    selectContainer.innerHTML = '';
    selectContainer.append(translatesBody);
    playWordAudio(word.audio);
  };

  setInitialValues() {
    this.maxSuccess = 0;
    this.successInRope = 0;
    this.successTotal = 0;
    this.checkedWords = [];
    this.numTried = 1;
    this.correct = -1;
    this.page = this.state.sprint.page !== -1 ? this.state.sprint.page : this.page;
    this.unit = this.state.sprint.unit !== -1 ? this.state.sprint.unit : this.unit;
  }

  async saveResult(word: GameWordData, result: boolean) {
    if (result) {
      this.successInRope += 1;
      this.maxSuccess = this.maxSuccess > this.successInRope ? this.maxSuccess : this.successInRope;
      this.successTotal += 1;
    } else {
      this.successInRope = 0;
    }
    this.numTried += 1;

    if (this.state.loggedIn) {
      await updateWordData(result, word, this.state.userId, this.state.token, 'audio');
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

  getDecisionValue(e: Event | KeyboardEvent, container: HTMLElement) {
    const target = <HTMLElement>e.target;
    let decision = 0;
    if ('key' in e) {
      decision = +e.key;
    } else {
      decision = +(<string>target.dataset.word);
    }
    const result = decision === this.correct;
    return { result, decision };
  }

  async handleDecision(result: boolean, decision: number) {
    disableDecisionButtons();
    if (result) {
      playWordAudio(successSound);
    } else if (decision !== -1) {
      playWordAudio(failedSound);
    }
    if (this.currentWord) {
      await this.saveResult(this.currentWord, result);
    }
    const audio = <HTMLElement>document.querySelector('.speaker-ico');
    if (this.currentWord && audio) {
      showCorrectAnswer(this.currentWord, result, decision, this.correct);
      audio.addEventListener('click', () => {
        if (this.currentWord) {
          playWordAudio(this.currentWord?.audio);
        }
      });
    }
  }

  handleClickGameCard = async (e: Event, container: HTMLElement) => {
    const target = <HTMLElement>e.target;
    if (target.classList.contains('btn-next')) {
      this.updateCard();
    } else if (target.classList.contains('btn-dont-know') && this.currentWord) {
      await this.handleDecision(false, -1);
    } else if (target.classList.contains('voice-ico__block') && this.currentWord) {
      playWordAudio(this.currentWord.audio);
    } else if (target.classList.contains('select-word')) {
      const { result, decision } = this.getDecisionValue(e, container);
      await this.handleDecision(result, decision);
    }
  };

  handleKeysGameCard = async (e: KeyboardEvent, container: HTMLElement) => {
    const { key } = e;
    const keyNum = Number.parseInt(key, 10);
    const btnNext = document.querySelector('.btn-next');
    const btnDontKnow = document.querySelector('.btn-dont-know');
    const selectButtons = document.querySelectorAll('.select-word');
    const voiceIco = document.querySelector('.voice-ico__block');
    if (answers.includes(keyNum) && selectButtons[0] && !selectButtons[0].getAttribute('disabled')) {
      const { result, decision } = this.getDecisionValue(e, container);
      await this.handleDecision(result, decision);
    } else if ((key === 'Enter' || key === 'ArrowRight') && btnNext && !btnNext.classList.contains('hidden')) {
      this.updateCard();
    } else if (
      key === 'Enter'
      && btnDontKnow
      && !btnDontKnow.classList.contains('hidden')
      && !btnDontKnow.getAttribute('disabled')
      && this.currentWord
    ) {
      await this.handleDecision(false, -1);
    } else if (
      key === ' '
      && voiceIco 
      && this.currentWord) {
        playWordAudio(this.currentWord.audio);
      }
  };

  async renderGame() {
    this.setInitialValues();
    this.words = await loadWords(this.unit, this.page, this.state.loggedIn);
    const { word, updatedWords } = await getNewWord(
      this.words,
      this.unit,
      this.page,
      this.state.loggedIn,
      4,
      this.state.sprint.source,
    );
    this.words = [...updatedWords];
    this.currentWord = { ...word };
    if (this.state.sprint.source === 'textbook' || this.state.sprint.source === 'dictionary') {
      this.words = this.words.filter((w) => w.difficulty !== 'easy');
    }
    const { result, translates } = randomTranslates(this.currentWord);
    this.correct = result + 1;
    const gameNode = <HTMLElement>audioTemplateGame(this.currentWord, this.correct, translates).content.cloneNode(true);
    const container = document.querySelector('#main-container') as HTMLDivElement;
    container.innerHTML = '';
    container.append(gameNode);
    drawProgress(this.numTried);
    playWordAudio(this.currentWord.audio);
    const gameCard = <HTMLElement>document.querySelector('.game-wrapper');
    gameCard.addEventListener('click', async (e: Event) => {
      await this.handleClickGameCard(e, gameCard);
    });
    if (!this.state.audio.set) {
      this.state.audio.set = true;
      document.addEventListener('keydown', async (e: KeyboardEvent) => {
        this.handleKeysGameCard(e, gameCard);
      });
    }
  }

  async renderResults() {
    const successWords = this.checkedWords.filter((w) => w.result);
    const failedWords = this.checkedWords.filter((w) => !w.result);
    if (this.state.loggedIn) {
      await saveGameStatistics(
        this.state.userId,
        this.state.token,
        this.maxSuccess,
        successWords.length,
        this.checkedWords.length,
        'audio',
      );
    }
    renderAudioResultPop(successWords, failedWords, this.successTotal);
  }
}

export default AudioChallenge;
