import { notFoundTemplate } from "./NotFoundTemplate";
import './NotFound.scss';
import { Page, PagesState } from "../../model/types/page";

export class NotFound implements Page {
  state: PagesState;

  constructor(state: PagesState) {
    this.state = state;
  }
  
  async render() {
    this.state.page = 'notFound';
    const notFoundNode = <HTMLElement>notFoundTemplate.content.cloneNode(true);
    const container = document.querySelector('#main-container') as HTMLDivElement;
    container.innerHTML = '';
    container.append(notFoundNode);
    return this.state;
  }
}
