import statsTemplate from './StatsTemplate';
import './Stats.scss';
import { Page, PagesState } from '../../model/types/page';

class Stats implements Page {
  state: PagesState;

  constructor(state: PagesState) {
    this.state = state;
  }

  async render() {
    this.state.page = 'stats';
    const statsNode = <HTMLElement>statsTemplate.content.cloneNode(true);
    const container = document.querySelector('#main-container') as HTMLDivElement;
    container.innerHTML = '';
    container.append(statsNode);
    return this.state;
  }
}

export default Stats;
