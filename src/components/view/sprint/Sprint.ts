import { sprintCardTemplate, sprintResultsTemplate, sprintStartTemplate } from './SprintTemplate';
import './Sprint.scss';
import './Timer.scss';
import { Page, PagesState } from '../../model/types/page';
import startTimer, { timerCard } from '../../controller/timer';
import { countPages } from '../../model/constants';
import { CheckedWord, GameWordData, WordData } from '../../model/types';
import { 
  disableDecisionButtons,
  getDecisionResult,
  getNewWord,
  unitSelect,
  updateCardContent,
  updateScoreParameters,
  updateWordData,
  loadWords
} from '../../controller/helpers';

class Sprint implements Page {
  state: PagesState;
  score: number = 0;
  container: HTMLElement;
  successInRope: number = 0;
  countForSuccess: number = 10;
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
    const target = <HTMLElement>e.target;
    if(target.classList.contains('unit-select__button') && !this.startCountDown) {
      this.startCountDown = true;
      this.unit = await unitSelect(target); 
      const timerContainer = <HTMLElement>document.querySelector('#start-countdown');
      await startTimer(2, timerContainer, async () => { await this.renderGame()});
    }
  }

  async render() {
    this.state.page = 'sprint';
    const sprintNode = <HTMLElement>sprintStartTemplate().content.cloneNode(true);
    this.container.innerHTML = '';
    this.container.append(sprintNode);
    if (this.state.sprint.source === 'textbook' || this.state.sprint.source === 'dictionary') {
      this.unit = this.state.sprint.unit;
      this.page = this.state.sprint.page;
      this.startCountDown = true;
      document.querySelector('.start-countdown')?.classList.remove('hidden');
      const timerContainer = <HTMLElement>document.querySelector('#start-countdown');
      await startTimer(2, timerContainer, async () => { await this.renderGame()});
    }
    this.container.addEventListener('click', (e: Event) => { this.handleUnitSelect(e); });
    return this.state;
  }

  async updateCard() {
    const { word, updatedWords } = await getNewWord(this.words, this.unit, this. page);
    this.words = [ ...updatedWords ];
    this.currentWord = { ...word };
    updateCardContent(this.currentWord);
  }

  async saveResult(word: GameWordData, result: boolean) {
    const scoreUpdates = updateScoreParameters(result, this.successInRope, this.countForSuccess, this.score);
    this.score = scoreUpdates.totalSore;
    this.successInRope = scoreUpdates.successCount;
    this.countForSuccess = scoreUpdates.successReward;

    if(this.state.loggedIn) {
      await updateWordData(result, word, this.state.userId, this.state.token);
    }
    const checked: CheckedWord = {
      wordId: word.id,
      word: word.word,
      wordTranslate: word.wordTranslate,
      transcription: word.transcription,
      audio: word.audio,
      result: result,
    }
    this.checkedWords.push(checked);
  }

  setInitialValues() {
    this.successInRope = 0;
    this.score = 0;
    this.countForSuccess = 10;
    this.page = this.state.sprint.page !== -1 ? this.state.sprint.page : this.page;
    this.unit = this.state.sprint.unit !== -1 ? this.state.sprint.unit : this.unit;
  }

  async handleDecision(e: Event, container: HTMLElement) {
    const target = <HTMLElement>e.target;
    disableDecisionButtons();
    const result = getDecisionResult(container, target);
    if(this.currentWord) {
      await this.saveResult(this.currentWord, result);
    }
    await this.updateCard();
  }

  async renderGame() {
    this.setInitialValues();
    this.words = await loadWords(this.unit, this.page, this.state.loggedIn);
    const { word, updatedWords } = await getNewWord(this.words, this.unit, this.page);
    this.words = [ ...updatedWords ];
    this.currentWord = { ...word };
    const sprintCardNode = <HTMLElement>sprintCardTemplate(word).content.cloneNode(true);
    this.container.innerHTML = '';
    this.container.append(sprintCardNode);
    const cardContainer = <HTMLElement>document.querySelector('#card-sprint');
    const timerContainer = <HTMLElement>this.container.querySelector('#start-countdown');
    timerCard(59);
    await startTimer(58, timerContainer, async () => { await this.renderResults()});
    cardContainer.addEventListener('click', async (e: Event) => {
      await this.handleDecision(e, cardContainer);
    });
  }

  async renderResults() {
    const successWords = this.checkedWords.filter((w) => w.result);
    const failedWords = this.checkedWords.filter((w) => !w.result);
    const sprintResultsNode = <HTMLElement>sprintResultsTemplate(successWords, failedWords, this.score).content.cloneNode(true);
    this.container.innerHTML = '';
    this.container.append(sprintResultsNode);  
    const playAgainButton = <HTMLElement>this.container.querySelector('#play-again');
    playAgainButton.addEventListener('click', () => {
      this.startCountDown = false;
      this.render();
    })
  }
}

export default Sprint;