import { sprintCardTemplate, sprintResultsTemplate, sprintStartTemplate } from './SprintTemplate';
import './Sprint.scss';
import { Page, PagesState } from '../../model/types/page';
import startTimer from '../../controller/timer';
import { countPages, maxScorePerWord, minScorePerWord } from '../../model/constants';
import { addUserWord, getWords, updateUserWord } from '../../model/api/words';
import { CheckedWord, GameWordData, UserWord, WordData } from '../../model/types';
import { getNewWord, randomResult } from '../../controller/helpers/sprint-helper';

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
      const unitSelect = <HTMLElement>document.querySelector('.start-sprint');
      if(target.classList.contains('unit-select__button') && !this.startCountDown) {
        const previousunitId = unitSelect.dataset.id;
        const timerContainer = <HTMLElement>document.querySelector('#start-countdown');
        const unitId = target.dataset.id;
        this.unit = +<string>unitId;
        unitSelect.dataset.id = unitId;
        unitSelect.classList.remove(`unit-${previousunitId}`);
        unitSelect.classList.add(`unit-${unitId}`);
        document.querySelector('.start-countdown')?.classList.remove('hidden');
        this.startCountDown = true;
        await startTimer(2, timerContainer, async () => { await this.renderGame()});
      }
  }

  async render() {
    this.state.page = 'sprint';
    const sprintNode = <HTMLElement>sprintStartTemplate().content.cloneNode(true);
    this.container.innerHTML = '';
    this.container.append(sprintNode);
    console.log(this.state);
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
    const card = <HTMLElement>this.container.querySelector('#card-sprint');
    const cardWord = <HTMLElement>this.container.querySelector('#card-word');
    const cardTranslate = <HTMLElement>this.container.querySelector('#card-translate');
    const { word, updatedWords } = await getNewWord(this.words, this.unit, this. page);
    this.words = [ ...updatedWords ];
    this.currentWord = { ...word };
    const { result, translate } = randomResult(word);
    card.dataset.result = `${result}`;
    card.dataset.word = word.id;
    cardWord.innerHTML = word.word;
    cardTranslate.innerHTML = translate;
    const trueButton = <HTMLElement>this.container.querySelector('.decision_button__true');
    const falseButton = <HTMLElement>this.container.querySelector('.decision_button__false');
    trueButton.removeAttribute('disabled');
    falseButton.removeAttribute('disabled');
  }

  async saveResult(word: GameWordData, result: boolean) {
    if(result) {
      this.successInRope += 1;
      this.score += this.countForSuccess;
    } else {
      this.successInRope = 0;
    }
    this.countForSuccess = minScorePerWord + Math.floor(this.successInRope / 3) * minScorePerWord;
    this.countForSuccess = this.countForSuccess > maxScorePerWord ? maxScorePerWord : this.countForSuccess;
    (<HTMLElement>document.querySelector('#success-count')).innerText = `${this.countForSuccess}`;
    (<HTMLElement>document.querySelector('#score')).innerText = `${this.score}`;
    if(this.state.loggedIn) {
      let loss = word.optional?.loss || 0;
      let vic = word.optional?.vic || 0;
      let difficulty = word.difficulty || 'base';
      result ? vic += 1 : loss += 1;
      if (!result && difficulty === 'easy') {
        difficulty = 'base';
        loss = 0;
        vic = 0;
      }
      if (vic >= 3 && difficulty === 'base' || vic >= 5 && difficulty === 'hard') {
        difficulty = 'easy';
        loss = 0;
        vic = 0;
      } 
      const data: UserWord = {
        difficulty,
        optional: {
          vic, 
          loss
        }
      };
      if (word.used) {
        await updateUserWord(this.state.userId, word.id, data, this.state.token);
      } else {
        await addUserWord(this.state.userId, word.id, data, this.state.token);
      }
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

  async renderGame() {
    this.successInRope = 0;
    this.score = 0;
    this.countForSuccess = 10;
    this.page = this.state.sprint.page !== -1 ? this.state.sprint.page : this.page;
    this.unit = this.state.sprint.unit !== -1 ? this.state.sprint.unit : this.unit;
    console.log(this.page);
    console.log(this.unit);
    this.words = (await getWords(this.unit, this.page)).data;
    const { word, updatedWords } = await getNewWord(this.words, this.unit, this.page);
    this.words = [ ...updatedWords ];
    this.currentWord = { ...word };
    const sprintCardNode = <HTMLElement>sprintCardTemplate(word).content.cloneNode(true);
    this.container.innerHTML = '';
    this.container.append(sprintCardNode);
    const timerContainer = <HTMLElement>this.container.querySelector('#start-countdown');
    await startTimer(58, timerContainer, async () => { await this.renderResults()});
    const cardContainer = <HTMLElement>this.container.querySelector('#card-sprint');
    const trueButton = <HTMLElement>this.container.querySelector('.decision_button__true');
    const falseButton = <HTMLElement>this.container.querySelector('.decision_button__false');
    cardContainer.addEventListener('click', async (e: Event) => {
      const target = <HTMLElement>e.target;
      trueButton.setAttribute('disabled', 'disabled');
      falseButton.setAttribute('disabled', 'disabled');
      const decision = +<string>target.dataset.value;
      const result = +<string>cardContainer.dataset.result === decision;
      if(result) {
        cardContainer.classList.add('spec');
      } else {
        cardContainer.classList.add('spec-false');
      }
      if(this.currentWord) {
        await this.saveResult(this.currentWord, result);
      }
      await this.updateCard();
    }); 
    cardContainer.addEventListener('animationend', () => {
      cardContainer.classList.remove('spec');
      cardContainer.classList.remove('spec-false');
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
