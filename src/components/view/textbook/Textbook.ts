import { pagingTemplate, textbookTemplate } from './TextbookTemplate';
import './Textbook.scss';
import { Page, PagesState } from '../../model/types/page';
import getWords from '../../model/api/words';
import WordData from '../../model/types/words';
// import words from '../../model/mock-words-data';

class Textbook implements Page {
  state: PagesState;

  constructor(state: PagesState) {
    this.state = state;
  }

  async render() {
    this.state.page = 'textbook';
    let words: WordData[] = [];
    const response = await getWords(this.state.textbook.unit - 1, this.state.textbook.page - 1);
    if (response.status === 200) {
      words = <WordData[]>response.data;
    }
    const textbookNode = <HTMLElement>textbookTemplate(words, this.state.textbook.page).content.cloneNode(true);
    const container = document.querySelector('#main-container') as HTMLDivElement;
    const pagingNode = this.paging();
    container.innerHTML = '';
    container.append(textbookNode);
    container.append(pagingNode);
    return this.state;
  }

  // handleButtonsState(first: boolean, last: boolean) {
  //   const prev = <HTMLElement>document.querySelector('.paging__prev');
  //   const next = <HTMLElement>document.querySelector('.paging__next');
  //   prev.setAttribute('disabled', 'disabled');
  //   if (first) {
  //     prev.setAttribute('disabled', 'disabled');
  //   } else {
  //     prev.removeAttribute('disabled');
  //   }
  //   if (last) {
  //     next.setAttribute('disabled', 'disabled');
  //   } else {
  //     next.removeAttribute('disabled');
  //   }
  // }

  async handlePagingClick(e: Event) {
    const target = e.target as HTMLElement;
    if (target.dataset.number) {
      this.state.textbook.page = +target.dataset.number;
    } else if (target.classList.contains('paging__prev')) {
      this.state.textbook.page -= 1;
    } else if (target.classList.contains('paging__next')) {
      this.state.textbook.page += 1;
    }
    await this.changeCurrentPage(1, this.state.textbook.page);
    console.log(this.state);
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
    const pagingNode = <HTMLElement>pagingTemplate(this.state.textbook.page).content.cloneNode(true);
    const paging = <HTMLElement>pagingNode.querySelector('.paging');
    paging.addEventListener('click', async (e) => {
      this.handlePagingClick(e);
    });
    return pagingNode;
  }
}

export default Textbook;
