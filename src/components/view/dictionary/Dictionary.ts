import { dictionaryTemplate } from "./DictionaryTemplate";
import './Dictionary.scss';
import { Page, PagesState } from "../../model/types/page";

export class Dictionary implements Page {
  state: PagesState;

  constructor(state: PagesState) {
    this.state = state;
  }
  
  async render() {
    this.state.page = 'dictionary';
    const notFoundNode = <HTMLElement>dictionaryTemplate.content.cloneNode(true);
    const container = document.querySelector('#main-container') as HTMLDivElement;
    container.innerHTML = '';
    container.append(notFoundNode);
    return this.state;
  }
}
