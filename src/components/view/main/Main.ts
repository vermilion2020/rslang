import { mainTemplate } from "./MainTemplate";
import './Main.scss';
import { Page, PagesState } from "../../model/types/page";

export class Main implements Page {
  state: PagesState;

  constructor(state: PagesState) {
    this.state = state;
  }
  
  async render() {
    this.state.page = 'notFound';
    const notFoundNode = <HTMLElement>mainTemplate.content.cloneNode(true);
    const container = document.querySelector('#main-container') as HTMLDivElement;
    container.innerHTML = '';
    container.append(notFoundNode);
    return this.state;
  }
}
