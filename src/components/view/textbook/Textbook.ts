import { pagingTemplate, textbookTemplate } from './TextbookTemplate';
import './Textbook.scss';
import { Page, PagesState } from '../../model/types/page';
import words from '../../model/mock-words-data';

class Textbook implements Page {
  state: PagesState;

  constructor(state: PagesState) {
    this.state = state;
  }

  async render() {
    this.state.page = 'textbook';
    const textbookNode = <HTMLElement>textbookTemplate(words, this.state.textbook.page).content.cloneNode(true);
    const container = document.querySelector('#main-container') as HTMLDivElement;
    const pagingNode = this.paging();
    container.innerHTML = '';
    container.append(textbookNode);
    container.append(pagingNode);
    return this.state;
  }

  handleButtonsState(first: boolean, last: boolean) {
    const prev = <HTMLElement>document.querySelector('.paging__prev');
    const next = <HTMLElement>document.querySelector('.paging__next');
    first ? prev.classList.add('disabled') : prev.classList.remove('disabled');
    last ? next.classList.add('disabled') : next.classList.remove('disabled');
  }

  async handlePagingClick(e: Event, countPages: number) {
    const target = e.target as HTMLElement;
    let last = false;
    let first = false;
    if (target.dataset.number) {
      this.state.textbook.page = +target.dataset.number;
    } else if (target.classList.contains('paging__prev')) {
      if (this.state.textbook.page <= 1) {
        this.state.textbook.page = 1;
        first = true;
      } else {
        --this.state.textbook.page;
      }
    } else if (target.classList.contains('paging__next')) {
      if (this.state.textbook.page >= countPages) {
        this.state.textbook.page = countPages;
        last = true;
      } else {
        ++this.state.textbook.page;
      }
    }
    this.handleButtonsState(first, last);
    if (!first && !last) {
      await this.changeCurrentPage(1, this.state.textbook.page);
    }
  }

  async changeCurrentPage(unit: number, page: number) {
    // TODO add units paging here also and save together
    window.location.hash = `/${this.state.page}/unit${unit}/${page}`;
    const textbookProgress = { unit: this.state.textbook.unit, page: this.state.textbook.page };
    const textbook = JSON.stringify(textbookProgress);
    localStorage.setItem('textbook', textbook);
    await this.render();
  }

  paging() {
    // TODO contPages should be received from BE and calculated
    const countPages = 5;
    const pagingNode = <HTMLElement>pagingTemplate(countPages, this.state.textbook.page).content.cloneNode(true);
    const paging = <HTMLElement>pagingNode.querySelector('.paging');
    paging.addEventListener('click', async (e) => {
      this.handlePagingClick(e, countPages);
    });
    return pagingNode;
  }
}

export default Textbook;
