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
    const contPages = 5;
    const pagingNode = <HTMLElement>pagingTemplate(contPages, this.state.textbook.page).content.cloneNode(true);
    const paging = <HTMLElement>pagingNode.querySelector('.paging');
    paging.addEventListener('click', async (e) => {
      const target = e.target as HTMLElement;
      if (target.dataset.number) {
        await this.changeCurrentPage(1, +target.dataset.number);
      } else if (target.classList.contains('paging__prev')) {
        await this.changeCurrentPage(1, this.state.textbook.page - 1);
      } else if (target.classList.contains('paging__next')) {
        await this.changeCurrentPage(1, this.state.textbook.page + 1);
      }
    });
    return pagingNode;
  }
}

export default Textbook;
