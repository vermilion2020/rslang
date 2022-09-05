import { sprintCardTemplate, sprintResultsTemplate, sprintStartTemplate } from './templates';
import './Sprint.scss';
import './scss/Timer.scss';
import { Page, PagesState } from '../../model/types/page';
import startTimer, { timerCard } from '../../controller/timer';
import {
  apiBaseUrl, countPages, failedSound, successSound,
} from '../../model/constants';
import { CheckedWord, GameWordData, WordData } from '../../model/types/words';
import {
  disableDecisionButtons,
  getDecisionResult,
  getNewWord,
  unitSelect,
  updateCardContent,
  updateScoreParameters,
  updateWordData,
  loadWords,
  saveGameStatistics,
} from '../../controller/helpers';

class Sprint implements Page {
  state: PagesState;

  score = 0;

  player = <HTMLAudioElement>document.querySelector('#audio');

  container: HTMLElement;

  successInRope = 0;

  maxSuccess = 0;

  countForSuccess = 10;

  unit: number;

  page: number;

  startCountDown = false;

  currentWord: GameWordData | null;

  words: WordData[] = [];

  checkedWords: CheckedWord[] = [];

  constructor(state: PagesState) {
    this.container = document.querySelector('#main-container') as HTMLDivElement;
    this.state = state;
    this.page = Math.floor(Math.random() * countPages) + 1;
    this.unit = 1;
    this.currentWord = null;

    this.container.addEventListener('click', async (e: Event) => {
      const target = <HTMLElement>e.target;
      if (target.classList.contains('unit-select__button')) {
        this.handleUnitSelect(e);
      }
    });
  }

  async handleUnitSelect(e: Event) {
    this.state.gameStarted = true;
    const target = <HTMLElement>e.target;
    if (target.classList.contains('unit-select__button') && !this.startCountDown) {
      this.startCountDown = true;
      this.unit = await unitSelect(target);
      timerCard(3, 'unit-diagram');
      document.querySelector('.sprint-container')?.classList.add(`unit-${this.unit}-container`);
      document.querySelector('.unit-select')?.classList.add('hidden');
      document.querySelector('.diagram')?.classList.remove('hidden');
      await startTimer(2, async () => {
        await this.renderGame();
      });
    }
  }

  async render() {
    this.state.page = 'sprint';
    if (this.state.gameStarted) {
      window.location.reload();
    }

    if (this.state.sprint.source === 'textbook' || this.state.sprint.source === 'dictionary') {
      this.unit = this.state.sprint.unit;
      this.page = this.state.sprint.page;
      const sprintNode = <HTMLElement>sprintStartTemplate(`${this.unit}`).content.cloneNode(true);
      this.container.innerHTML = '';
      this.container.append(sprintNode);
      this.startCountDown = true;
      this.state.gameStarted = true;
      document.querySelector('.unit-select')?.classList.add('hidden');
      document.querySelector('.diagram')?.classList.remove('hidden');
      timerCard(3, 'unit-diagram');
      await startTimer(2, async () => {
        await this.renderGame();
      });
    } else {
      const sprintNode = <HTMLElement>sprintStartTemplate().content.cloneNode(true);
      this.container.innerHTML = '';
      this.container.append(sprintNode);
    }
    this.container.addEventListener('click', (e: Event) => {
      const target = <HTMLElement>e.target;
      if (target.classList.contains('unit-select__button')) {
        this.handleUnitSelect(e);
      }
    });
    return this.state;
  }

  async updateCard() {
    if (this.words.length === 0) {
      return this.renderResults();
    }
    const { word, updatedWords } = await getNewWord(
      this.words,
      this.unit,
      this.page,
      this.state.loggedIn,
      1,
      this.state.sprint.source,
    );
    this.words = [...updatedWords];
    this.currentWord = { ...word };
    return updateCardContent(this.currentWord);
  }

  async saveResult(word: GameWordData, result: boolean) {
    const scoreUpdates = updateScoreParameters(result, this.successInRope, this.countForSuccess, this.score, this.unit);
    this.score = scoreUpdates.totalSore;
    this.successInRope = scoreUpdates.successCount;
    this.countForSuccess = scoreUpdates.successReward;
    this.maxSuccess = this.successInRope > this.maxSuccess ? this.successInRope : this.maxSuccess;
    if (this.state.loggedIn) {
      await updateWordData(result, word, this.state.userId, this.state.token, 'sprint');
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

  setInitialValues() {
    this.successInRope = 0;
    this.maxSuccess = 0;
    this.score = 0;
    this.countForSuccess = 10;
    this.page = this.state.sprint.page > 0 && this.state.sprint.page < 30 ? this.state.sprint.page : this.page;
    this.unit = this.state.sprint.page > 0 && this.state.sprint.page < 6 ? this.state.sprint.unit : this.unit;
  }

  async handleDecision(e: Event | KeyboardEvent, container: HTMLElement) {
    const target = <HTMLElement>e.target;
    disableDecisionButtons();
    let decision = 0;
    if ('key' in e) {
      decision = e.key === 'ArrowRight' ? 1 : 0;
    } else {
      decision = +(<string>target.dataset.value);
    }
    const result = getDecisionResult(container, decision);
    if (result) {
      this.playWordAudio(successSound);
    } else {
      this.playWordAudio(failedSound);
    }
    if (this.currentWord) {
      await this.saveResult(this.currentWord, result);
      this.updateCard();
    }
  }

  async renderGame() {
    this.setInitialValues();
    this.words = await loadWords(this.unit, this.page, this.state.loggedIn);
    if (this.state.sprint.source === 'textbook' || this.state.sprint.source === 'dictionary') {
      this.words = this.words.filter((word) => word.difficulty !== 'easy');
      if (!this.words.length) {
        window.location.href = '/#/sprint';
      }
    }
    const { word, updatedWords } = await getNewWord(
      this.words,
      this.unit,
      this.page,
      this.state.loggedIn,
      1,
      this.state.sprint.source,
    );
    this.words = [...updatedWords];
    this.currentWord = { ...word };
    const sprintCardNode = <HTMLElement>sprintCardTemplate(word).content.cloneNode(true);
    this.container.innerHTML = '';
    this.container.append(sprintCardNode);
    const cardContainer = <HTMLElement>document.querySelector('#card-sprint');
    timerCard(59, 'card-diagram');
    await startTimer(58, async () => {
      await this.renderResults();
    });
    cardContainer.addEventListener('click', async (e: Event) => {
      const target = <HTMLElement>e.target;
      if (target.classList.contains('decision_button') || target.classList.contains('arr')) {
        await this.handleDecision(e, cardContainer);
      }
    });
    document.addEventListener('keydown', async (e: KeyboardEvent) => {
      if (cardContainer) {
        const { key } = e;
        const trueButton = <HTMLElement>document.querySelector('.decision_button__true');
        if ((key === 'ArrowRight' || key === 'ArrowLeft') && trueButton && !trueButton.getAttribute('disabled')) {
          await this.handleDecision(e, cardContainer);
        }
      }
    });
  }

  playWordAudio(wordAudio: string) {
    if (wordAudio) {
      this.player.src = `${apiBaseUrl}/${wordAudio}`;
      this.player.currentTime = 0;
      this.player.play();
    }
  }

  async renderResults() {
    if (!this.checkedWords.length) {
      this.startCountDown = false;
      this.render();
    }
    const successWords = this.checkedWords.filter((w) => w.result);
    const failedWords = this.checkedWords.filter((w) => !w.result);
    if (this.state.loggedIn) {
      await saveGameStatistics(
        this.state.userId,
        this.state.token,
        this.maxSuccess,
        successWords.length,
        this.checkedWords.length,
        'sprint',
      );
    }
    const sprintResultsNode = <HTMLElement>(
      sprintResultsTemplate(successWords, failedWords, this.score, this.unit).content.cloneNode(true)
    );
    this.container.innerHTML = '';
    this.container.append(sprintResultsNode);
    const sprintResults = <HTMLElement> this.container.querySelector('#results-sprint');
    sprintResults.addEventListener('click', (e: Event) => {
      const target = <HTMLElement>e.target;
      if (target.classList.contains('results-audio')) {
        const wordId = <string>target.dataset.id;
        const wordAudio = <string> this.checkedWords.find((item) => item.wordId === wordId)?.audio;
        this.playWordAudio(wordAudio);
      } else if (target.id === 'play-again') {
        this.startCountDown = false;
        window.location.reload();
      }
    });
  }
}

export default Sprint;
