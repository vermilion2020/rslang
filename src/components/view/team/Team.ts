import { teamTemplate } from "./TeamTemplate";
import './Team.scss';
import { Page, PagesState } from "../../model/types/page";

export class Team implements Page {
  state: PagesState;

  constructor(state: PagesState) {
    this.state = state;
  }
  
  async render() {
    this.state.page = 'team';
    const notFoundNode = <HTMLElement>teamTemplate.content.cloneNode(true);
    const container = document.querySelector('#main-container') as HTMLDivElement;
    container.innerHTML = '';
    container.append(notFoundNode);
    return this.state;
  }
}
