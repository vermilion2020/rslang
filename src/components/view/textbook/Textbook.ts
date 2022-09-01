import {
  pagingTemplate, textbookTemplate, unitTemplate, sectionWords, titleTemplate, playTemplate,
} from './TextbookTemplate';
import './Textbook.scss';
import { Page, PagesState } from '../../model/types/page';
import { loadWords, loadWordsHard } from '../../controller/helpers/word-helper';

class Textbook implements Page {
  state: PagesState;

  constructor(state: PagesState) {
    this.state = state;
  }

  async render() {
    this.state.page = 'textbook';
    const container = document.querySelector('#main-container') as HTMLDivElement;
    const sectionWord = await this.createSectionWords();
    const sectionPlay = this.createSectionPlay();
    container.innerHTML = '';
    container.append(sectionWord);
    container.append(sectionPlay);
    this.addListener();
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
    window.location.hash = `/${this.state.page}/unit${unit}/${page}`;
    const textbookProgress = { unit: this.state.textbook.unit, page: this.state.textbook.page };
    const textbook = JSON.stringify(textbookProgress);
    localStorage.setItem('textbook', textbook);
    await this.render();
  }

  async createSectionWords() {
    const { section, wrapper } = <Record<string, HTMLElement>>sectionWords(this.state.textbook.unit);
    const titleNode = <HTMLElement>titleTemplate('Учебник').content.cloneNode(true);
    let words = await loadWords(this.state.textbook.unit, this.state.textbook.page, this.state.loggedIn);
    if (this.state.textbook.unit === 7) {
      words = await loadWordsHard(this.state);
    }
    const textbookNode = <HTMLElement>textbookTemplate(words).content.cloneNode(true);
    const pagingNode = this.paging();
    const unitNode = this.units();

    wrapper.innerHTML = '';
    wrapper.append(titleNode);
    wrapper.append(unitNode);
    wrapper.append(textbookNode);
    wrapper.append(pagingNode);
    return section;
  }

  paging() {
    const pagingNode = <HTMLElement>pagingTemplate(
      this.state.textbook.unit,
      this.state.textbook.page,
    ).content.cloneNode(true);
    const paging = <HTMLElement>pagingNode.querySelector('.paging');
    paging.addEventListener('click', async (e) => {
      this.handlePagingClick(e);
    });
    return pagingNode;
  }

  units() {
    const unitNode = <HTMLElement>unitTemplate(
      this.state.textbook.unit,
      this.state.loggedIn,
    ).content.cloneNode(true);
    const units = <HTMLElement>unitNode.querySelector('.units');
    units.addEventListener('click', async (e) => {
      this.handleUnitClick(e);
    });
    return unitNode;
  }

  createSectionPlay() {
    const playNode = <HTMLElement>playTemplate(
      this.state.textbook.unit,
      this.state.textbook.page,
    ).content.cloneNode(true);
    return playNode;
  }

  addListener() {
    const handleClick = (e: Event) => {
      const target = <HTMLLinkElement>(<HTMLElement>e.target);
      const menuItem = <HTMLElement>document.getElementById(`${target.dataset.id}-menu-item`);
      document.querySelector('.main-nav__item_active')?.classList.remove('main-nav__item_active');
      menuItem.classList.add('main-nav__item_active');
    };

    const classBtn = ['.btn-audio', '.btn-sprint', '.btn-to-menu'];

    classBtn.forEach((el: string) => {
      const elem = <HTMLElement>document.querySelector(el);
      elem.addEventListener('click', handleClick);
    });
  }
}

export default Textbook;
