import audioTemplate from './templates/AudioTemplate';
import './AudioChallenge.scss';
import { Page, PagesState } from '../../model/types/page';
import audioTemplateGame, { drawTranslates } from './templates/AudioTemplateGame';
import { renderAudioResultPop } from './AudioResult';

import { loadWords } from '../../controller/helpers';
import { updateWordData, getNewWord, saveGameStatistics } from '../../controller/helpers/sprint-helper';
import { unitSelect, randomTranslates, showCorrectAnswer, resetCardsContent, disableDecisionButtons, playWordAudio } from '../../controller/helpers/audio-helper';
import { CheckedWord, GameWordData, WordData } from '../../model/types';
import { answers, countAttempts, countPages, units } from '../../model/constants';
import audioTemplateResult from './templates/AudioTemplateResult';

class AudioChallenge implements Page {
  state: PagesState;
  container: HTMLElement;
  score: number = 0;
  maxSuccess: number = 0;
  successTotal: number;
  unit: number;
  page: number;
  currentWord: GameWordData | null;
  words: WordData[] = [];
  selectedWords: string[] = [];
  checkedWords: CheckedWord[] = [];

  constructor(state: PagesState) {
    this.container = document.querySelector('#main-container') as HTMLDivElement;
    this.state = state;
    this.words = [];
    this.page = Math.floor(Math.random() * countPages) + 1;
    this.unit = 1;
    this.currentWord = null;
    this.successTotal = 0;
    this.selectedWords = [];
      document.addEventListener('keydown', async (e: KeyboardEvent) => {
        const { key } = e;
        const keyNum = Number.parseInt(key, 10);
        const btnStart = document.querySelector('.btn-start');
        if (units.includes(keyNum) && btnStart) {
          this.unit = await unitSelect(e);
        } else if ((key === 'Enter') && btnStart) {
          this.renderGame();
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
      selectLevelBox.addEventListener('click', (e: Event) => {
        const targetLi = e.target as HTMLLIElement;
        if (targetLi.classList.contains('select-level')) {
          unitSelect(e);
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
    //change to countAttempts
    if (this.checkedWords.length >= 5) {
      await this.renderResults();
      await this.render();
    }
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
    //change to countAttempts
    if (this.checkedWords.length < 5) {
      this.updateGameContent(this.currentWord);
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
    playWordAudio(word.audio);
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

  getDecisionValue(e: Event| KeyboardEvent, container: HTMLElement) {
    const target = <HTMLElement>e.target;
      let decision = 0;
      if ('key' in e) {
        decision = Number.parseInt(e.key, 10);
      } else {
        decision = +<string>target.dataset.word;
      }
    const resultValue = +<string>container.dataset.result;
    const result = decision === resultValue;
    return {result, decision};
  }

  async handleDecision(result: boolean, decision: number) {
    disableDecisionButtons();
    if (this.currentWord) {
      await this.saveResult(this.currentWord, result);
    }
    const audio = <HTMLElement>document.querySelector('.speaker-ico');
    if (this.currentWord && audio) {
      showCorrectAnswer(this.currentWord, result, decision);
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
      showCorrectAnswer(this.currentWord, false, -1);
    } else if (target.classList.contains('voice-ico__block') && this.currentWord) {
      playWordAudio(this.currentWord.audio);
    } else if (target.classList.contains('select-word')) {
      const { result, decision } = this.getDecisionValue(e, container);
      await this.handleDecision(result, decision);
    }
  }

  handleKeysGameCard = async (e: KeyboardEvent, container: HTMLElement) => {
    const { key } = e;
    const keyNum = Number.parseInt(key, 10);
    const btnNext = <HTMLElement>document.querySelector('.btn-next');
    const btnDontKnow = <HTMLElement>document.querySelector('.btn-dont-know');
    const selectButtons = <NodeListOf<HTMLElement>>document.querySelectorAll('.select-word');
    if (answers.includes(keyNum) && !selectButtons[0].getAttribute('disabled')) {
      const { result, decision } = this.getDecisionValue(e, container);
      await this.handleDecision(result, decision);
    } else if ((key === 'Enter' || key === 'ArrowRight') && !btnNext.classList.contains('hidden')) {
      this.updateCard();
    } else if ((key === 'Enter') && !btnDontKnow.classList.contains('hidden') && !btnDontKnow.getAttribute('disabled') && this.currentWord) {
      await this.handleDecision(false, -1);
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
    playWordAudio(this.currentWord.audio);
    const gameCard = <HTMLElement>document.querySelector('.game-wrapper');
    gameCard.addEventListener('click', async (e: Event) => {
      await this.handleClickGameCard(e, gameCard);
    });
    if (!this.state.audio.set) {
      this.state.sprint.set = true;
      document.addEventListener('keydown', async (e: KeyboardEvent) => {
        this.handleKeysGameCard(e, gameCard);
      });
    }
  }

  async renderResults(){
    const successWords = this.checkedWords.filter((w) => w.result);
    const failedWords = this.checkedWords.filter((w) => !w.result);
    if (this.state.loggedIn) {
      await saveGameStatistics(
        this.state.userId,
        this.state.token,
        this.maxSuccess,
        successWords.length,
        this.checkedWords.length,
        'audio'
      );
    }
    renderAudioResultPop(successWords, failedWords, this.successTotal);
  };
}

export default AudioChallenge;