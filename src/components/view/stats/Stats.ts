import { statsTemplate } from "./StatsTemplate";
import './Stats.scss';
import { Page, PagesState } from "../../model/types/page";

export class Stats implements Page {
  state: PagesState;

  constructor(state: PagesState) {
    this.state = state;
  }
  
  async render() {
    this.state.page = 'stats';
    const notFoundNode = <HTMLElement>statsTemplate.content.cloneNode(true);
    const container = document.querySelector('#main-container') as HTMLDivElement;
    container.innerHTML = '';
    container.append(notFoundNode);
    return this.state;
  }
}
