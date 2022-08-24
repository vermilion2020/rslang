import { sprintStartTemplate } from './SprintTemplate';
import './Sprint.scss';
import { Page, PagesState } from '../../model/types/page';
import startTimer from '../../controller/timer';

class Sprint implements Page {
  state: PagesState;
  container = document.querySelector('#main-container') as HTMLDivElement;
  startCountDown = false;

  constructor(state: PagesState) {
    this.state = state;
  }

  handleLevelSelect(e: Event) {
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
        startTimer(5, timerContainer);
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

  async renderGame() {
  }

  async renderResults() {
  }
}

export default Sprint;
