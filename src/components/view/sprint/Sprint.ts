import sprintTemplate from './SprintTemplate';
import './Sprint.scss';
import { Page, PagesState } from '../../model/types/page';

class Sprint implements Page {
  state: PagesState;

  constructor(state: PagesState) {
    this.state = state;
  }

  async render() {
    this.state.page = 'sprint';
    const notFoundNode = <HTMLElement>sprintTemplate.content.cloneNode(true);
    const container = document.querySelector('#main-container') as HTMLDivElement;
    container.innerHTML = '';
    container.append(notFoundNode);
    return this.state;
  }
}

export default Sprint;
