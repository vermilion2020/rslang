import mainTemplate from './MainTemplate';
import './Main.scss';
import { Page, PagesState } from '../../model/types/page';

class Main implements Page {
  state: PagesState;

  constructor(state: PagesState) {
    this.state = state;
  }

  async render() {
    this.state.page = 'main';
    const notFoundNode = <HTMLElement>mainTemplate.content.cloneNode(true);
    const container = document.querySelector('#main-container') as HTMLDivElement;
    container.innerHTML = '';
    container.append(notFoundNode);
    return this.state;
  }
}

export default Main;
