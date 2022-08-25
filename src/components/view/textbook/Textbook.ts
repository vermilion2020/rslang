import { pagingTemplate, textbookTemplate, unitTemplate } from './TextbookTemplate';
import './Textbook.scss';
import { Page, PagesState } from '../../model/types/page';
import { getWords, getUserWords } from '../../model/api/words';
import loadWords from '../../controller/helpers/word-helper';
import { WordData, UserWords } from '../../model/types/words';

class Textbook implements Page {
  state: PagesState;

  constructor(state: PagesState) {
    this.state = state;
    console.log(this.state);
  }

  async render() {
    this.state.page = 'textbook';
    const words = await loadWords(this.state);
    console.log(words);
    const textbookNode = <HTMLElement>textbookTemplate(words, this.state.textbook.page).content.cloneNode(true);
    const container = document.querySelector('#main-container') as HTMLDivElement;
    const pagingNode = this.paging();
    const unitNode = this.units();
    container.innerHTML = '';
    container.append(unitNode);
    container.append(textbookNode);
    container.append(pagingNode);
    console.log(this.state);
    return this.state;
  }

  // async loadWords() {
  //   let words: WordData[] = [];
  //   const response = await getWords(this.state.textbook.unit - 1, this.state.textbook.page - 1);
  //   if (response.status === 200) {
  //     words = <WordData[]>response.data;
  //   }
  //   if (this.state.loggedIn) {
  //     const responseUser = await getUserWords(this.state.userId, this.state.token);
  //     if (response.status === 200) {
  //       const userWords = <UserWords[] | []>responseUser.data;
  //       if (userWords.length) {
  //         const includWords = words.map((word) => {
  //           const incl = userWords.find((userWord) => word.id === userWord.wordId);
  //           if (incl) {
  //             return { ...word, difficulty: incl.difficulty, optional: incl.optional };
  //           }
  //           return word;
  //         });
  //         words = includWords;
  //       }
  //     }
  //   }
  //   return words;
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
