import './Dictionary.scss';
import '../textbook/GenerForWords.scss';
import { Page, PagesState } from '../../model/types/page';
import { pagingTemplate, unitTemplate, sectionWords, titleTemplate} from './DictionaryTemplate';
import { loadWords, loadWordsHard } from '../../controller/helpers/word-helper';
import { handleRoute } from '../../controller/router';

class Dictionary implements Page {
  state: PagesState;

  constructor(state: PagesState) {
    this.state = state;
  }

  async render() {
    this.state.page = 'dictionary';
    const container = document.querySelector('#main-container') as HTMLDivElement;
    const sectionDictionary = await this.createSectionDiction();
    // const sectionPlay = this.createSectionPlay();
    container.innerHTML = '';
    container.append(sectionDictionary);
    return this.state;
  }

  async createSectionDiction() {
    const { section, wrapper } = <Record<string, HTMLElement>>sectionWords(this.state.dictionary.unit);
    const titleNode = <HTMLElement>titleTemplate('Словарь').content.cloneNode(true);
    let words = await loadWords(this.state.dictionary.unit, this.state.dictionary.page, this.state.loggedIn);
    if (this.state.dictionary.unit === 7) {
      words = await loadWordsHard(this.state);
    }
    // const textbookNode = <HTMLElement>dictionaryTemplate(words).content.cloneNode(true);
    const pagingNode = this.paging();
    const unitNode = this.units();
  
    wrapper.innerHTML = '';
    wrapper.append(titleNode);
    wrapper.append(unitNode);
    // wrapper.append(textbookNode);
    wrapper.append(pagingNode);
    return section;
  }

  paging() {
    const pagingNode = <HTMLElement>pagingTemplate(this.state.dictionary.unit, this.state.dictionary.page)
      .content.cloneNode(true);
    const paging = <HTMLElement>pagingNode.querySelector('.paging');
    paging.addEventListener('click', async (e) => {
      this.handlePagingClick(e);
    });
    return pagingNode;
  }

  async handlePagingClick(e: Event) {
    const target = e.target as HTMLElement;
    if (target.dataset.number) {
      this.state.dictionary.page = +target.dataset.number;
    } else if (target.classList.contains('paging__prev')) {
      this.state.dictionary.page -= 1;
    } else if (target.classList.contains('paging__next')) {
      this.state.dictionary.page += 1;
    }
    await this.changeCurrentPage(this.state.dictionary.unit, this.state.dictionary.page);
  }



  units() {
    const unitNode = <HTMLElement>unitTemplate(this.state.dictionary.unit, this.state.loggedIn).content.cloneNode(true);
    const units = <HTMLElement>unitNode.querySelector('.units');
    units.addEventListener('click', async (e) => {
      this.handleUnitClick(e);
    });
    return unitNode;
  }

  async handleUnitClick(e: Event) {
    console.log(this.state);
    const target = <HTMLElement>e.target;
    if (target.dataset.unit) {
      this.state.dictionary.unit = +target.dataset.unit;
    }
    await this.changeCurrentPage(this.state.dictionary.unit, this.state.dictionary.page);
  }

  async changeCurrentPage(unit: number, page: number) {
    window.location.hash = `/#/${this.state.page}/unit${unit}/${page}`;
    const dictionaryProgress = { unit: this.state.dictionary.unit, page: this.state.dictionary.page };
    const textbook = JSON.stringify(dictionaryProgress);
    localStorage.setItem('dictionary', textbook);
    await this.render();
  }

}


export default Dictionary;
