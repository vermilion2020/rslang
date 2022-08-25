import { pagingTemplate, textbookTemplate, unitTemplate, sectionWords } from './TextbookTemplate';
import './Textbook.scss';
import { Page, PagesState } from '../../model/types/page';
// import { getWords, getUserWords } from '../../model/api/words';
import loadWords from '../../controller/helpers/word-helper';
// import { WordData, UserWords } from '../../model/types/words';

class Textbook implements Page {
  state: PagesState;

  constructor(state: PagesState) {
    this.state = state;
  }

  async render() {
    this.state.page = 'textbook';
    const container = document.querySelector('#main-container') as HTMLDivElement;
    const sectionWord = await this.createSectionWords();
    container.innerHTML = '';
    container.append(sectionWord);
    return this.state;
  }

  async handlePagingClick(e: Event) {
    const target = e.target as HTMLElement;
    if (target.dataset.number) {
      this.state.textbook.page = +target.dataset.number;
    } else if (target.classList.contains('paging__prev')) {
      this.state.textbook.page -= 1;
    } else if (target.classList.contains('paging__next')) {
      this.state.textbook.page += 1;
    }
    await this.changeCurrentPage(this.state.textbook.unit, this.state.textbook.page);
  }

  async handleUnitClick(e: Event) {
    const target = <HTMLElement>e.target;
    if (target.dataset.unit) {
      this.state.textbook.unit = +target.dataset.unit;
    }
    await this.changeCurrentPage(this.state.textbook.unit, this.state.textbook.page);
  }

  async changeCurrentPage(unit: number, page: number) {
    // TODO add units paging here also and save together

    window.location.hash = `/${this.state.page}/unit${unit}/${page}`;
    const textbookProgress = { unit: this.state.textbook.unit, page: this.state.textbook.page };
    const textbook = JSON.stringify(textbookProgress);
    localStorage.setItem('textbook', textbook);
    await this.render();
  }

  async createSectionWords() {
    const sectionNode = <HTMLElement>sectionWords(this.state.textbook.unit);
    const words = await loadWords(this.state);
    const textbookNode = <HTMLElement>textbookTemplate(words).content.cloneNode(true);
    const pagingNode = this.paging();
    const unitNode = this.units();

    sectionNode.innerHTML = '';
    sectionNode.append(unitNode);
    sectionNode.append(textbookNode);
    sectionNode.append(pagingNode);
    return sectionNode;
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

  units() {
    const unitNode = <HTMLElement>unitTemplate(this.state.textbook.unit).content.cloneNode(true);
    const units = <HTMLElement>unitNode.querySelector('.units');
    units.addEventListener('click', async (e) => {
      this.handleUnitClick(e);
    });
    return unitNode;
  }
}

export default Textbook;
