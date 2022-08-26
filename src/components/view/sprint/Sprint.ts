import { sprintCardTemplate, sprintStartTemplate } from './SprintTemplate';
import './Sprint.scss';
import { Page, PagesState } from '../../model/types/page';
import startTimer from '../../controller/timer';
import { countPages } from '../../model/constants';
import { getWords, getWordTranslates } from '../../model/api/words';
import { GameWordData, WordData } from '../../model/types';

class Sprint implements Page {
  state: PagesState;
  container = document.querySelector('#main-container') as HTMLDivElement;
  startCountDown = false;

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

  async getNewWord(words: WordData[]) {
    const wordIndex = Math.floor(Math.random() * words.length);
    const response = await getWordTranslates(words[wordIndex].id, 1);
    const word = <GameWordData>response.data;
    const updatedWords = words.filter((_, index) => index !== wordIndex);
    return { word, updatedWords };
  }

  async renderGame(level = 1, page?: number) {
    let currPage = !page 
      ? Math.floor(Math.random() * countPages) + 1
      : page;
    
    const words: WordData[] = (await getWords(level, currPage)).data;
    const { word, updatedWords } = await this.getNewWord(words);
    const sprintNode = <HTMLElement>sprintCardTemplate(word).content.cloneNode(true);
    this.container.innerHTML = '';
    this.container.append(sprintNode);
    this.container.addEventListener('click', (e: Event) => { this.handleLevelSelect(e) });
  }

  async renderResults() {
  }
}

export default Sprint;
