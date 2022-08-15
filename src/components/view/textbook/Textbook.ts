import { textbookTemplate } from "./TextbookTemplate";
import './Textbook.scss';
import { Page, PagesState } from "../../model/types/page";

export class Textbook implements Page {
  state: PagesState;

  constructor(state: PagesState) {
    this.state = state;
  }
  
  async render() {
    this.state.page = 'textbook';
    const notFoundNode = <HTMLElement>textbookTemplate.content.cloneNode(true);
    const container = document.querySelector('#main-container') as HTMLDivElement;
    container.innerHTML = '';
    container.append(notFoundNode);
    return this.state;
  }
}
