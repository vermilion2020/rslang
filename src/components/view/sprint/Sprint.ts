import { sprintCardTemplate, sprintStartTemplate } from './SprintTemplate';
import './Sprint.scss';
import { Page, PagesState } from '../../model/types/page';
import startTimer from '../../controller/timer';
import { countPages } from '../../model/constants';
import { getWords } from '../../model/api/words';
import { WordData } from '../../model/types';
import { getNewWord, randomResult } from '../../controller/helpers/sprint-helper';

class Sprint implements Page {
  state: PagesState;
  container = document.querySelector('#main-container') as HTMLDivElement;
  startCountDown = false;
  words: WordData[] = [];

  constructor(state: PagesState) {
    this.state = state;
  }

  async handleLevelSelect(e: Event) {
    const target = <HTMLElement>e.target;
      const levelSelect = <HTMLElement>document.querySelector('.start-sprint');
      if(target.classList.contains('level-select__button') && !this.startCountDown) {
        const previousLevelId = levelSelect.dataset.id;
        const timerContainer = <HTMLElement>document.querySelector('#start-countdown');
        const levelId = target.dataset.id;
        levelSelect.dataset.id = levelId;
        levelSelect.classList.remove(`level-${previousLevelId}`);
        levelSelect.classList.add(`level-${levelId}`);
        document.querySelector('.start-countdown')?.classList.remove('hidden');
        this.startCountDown = true;
        await startTimer(5, timerContainer);
        this.renderGame();
      }
  }

  async render() {
    this.state.page = 'sprint';
    const sprintNode = <HTMLElement>sprintStartTemplate().content.cloneNode(true);
    this.container.innerHTML = '';
    this.container.append(sprintNode);
    this.container.addEventListener('click', (e: Event) => { this.handleLevelSelect(e) });
    return this.state;
  }

  async updateCard() {
    const card = <HTMLElement>this.container.querySelector('#card-sprint');
    const cardWord = <HTMLElement>this.container.querySelector('#card-word');
    const cardTranslate = <HTMLElement>this.container.querySelector('#card-translate');
    const results = await getNewWord(this.words);
    this.words = [ ...results.updatedWords ];
    const { result, translate } = randomResult(results.word);
    card.dataset.result = `${result}`;
    card.dataset.words = results.word.id;
    cardWord.innerHTML = results.word.word;
    cardTranslate.innerHTML = translate;

  }

  async renderGame(level = 1, page?: number) {
    let currPage = !page 
      ? Math.floor(Math.random() * countPages) + 1
      : page;
    this.words = (await getWords(level, currPage)).data;
    const { word, updatedWords } = await getNewWord(this.words);
    this.words = [ ...updatedWords ];
    const sprintCardNode = <HTMLElement>sprintCardTemplate(word).content.cloneNode(true);
    this.container.innerHTML = '';
    this.container.append(sprintCardNode);
    this.container.addEventListener('click', async (e: Event) => { 
      const target = <HTMLElement>e.target;
      if (target.classList.contains('level-select__button')) {
        this.handleLevelSelect(e);
      } else if (target.classList.contains('decision_button')) {
        await this.updateCard();
      }
    });
  }

  async renderResults() {
  }
}

export default Sprint;
