import './Dictionary.scss';
import '../textbook/GenerForWords.scss';
import { Page, PagesState } from '../../model/types/page';
import { sectionWords, dictionaryTemplate } from './DictionaryTemplate';
import { pagingTemplate, unitTemplate, titleTemplate, playTemplate } from '../textbook/TextbookTemplate';
import { loadWords, loadWordsHard, addWordData, addDataPerPage, showPreloader } from '../../controller/helpers/word-helper';

class Dictionary implements Page {
  state: PagesState;

  constructor(state: PagesState) {
    this.state = state;
  }

  async render() {
    this.state.page = 'dictionary';
    const container = document.querySelector('#main-container') as HTMLDivElement;
    let {dataPerPage, statusPage, overPages} = await this.createDataPerPage();
    const sectionDictionary = await this.createSectionDiction(overPages, dataPerPage, statusPage);
    const sectionPlay = this.createSectionPlay(statusPage);
    container.innerHTML = '';
    container.append(sectionDictionary);
    container.append(sectionPlay);
    this.addListener(this.state);
    this. addListenerScroll();
    return this.state;
  }

  async createDataPerPage() {
    let overPages = 1;
    const currentPage = this.state.dictionary.page;
    if (currentPage + 2 >= 30) {
      overPages = 26;
    }
    if (currentPage + 2 < 30 && currentPage - 2 > 1) {
      overPages = currentPage - 2;
    }
    let dataPerPage = [false, false, false, false, false];
    if (this.state.loggedIn) {
      dataPerPage = await addDataPerPage(this.state.userId, this.state.token, this.state.dictionary.unit, overPages);
    }
    const currentIndex = currentPage - overPages;
    const statusPage = dataPerPage[currentIndex];
    return {
      dataPerPage: dataPerPage,
      statusPage: statusPage,
      overPages: overPages,
    }
  }

  async createSectionDiction(overPages: number, dataPerPage: boolean[], statusPage:boolean) {
    const { section, wrapper } = <Record<string, HTMLElement>>sectionWords(this.state.dictionary.unit, statusPage);
    const titleNode = <HTMLElement>titleTemplate('Словарь').content.cloneNode(true);
    let words = await loadWords(this.state.dictionary.unit, this.state.dictionary.page, this.state.loggedIn);
    if (this.state.dictionary.unit === 7) {
      words = await loadWordsHard(this.state);
    }
    const dictionaryNode = <HTMLElement>dictionaryTemplate(words, this.state.loggedIn).content.cloneNode(true);
    const pagingNode = await this.paging(overPages, dataPerPage, statusPage);
    const unitNode = this.units();

    wrapper.innerHTML = '';
    wrapper.append(titleNode);
    wrapper.append(unitNode);
    wrapper.append(pagingNode);
    wrapper.append(dictionaryNode);
    return section;
  }

  async paging(overPages: number, dataPerPage: boolean[], statusPage: boolean) {

    const pagingNode = <HTMLElement>pagingTemplate(
      'dictionary',
      statusPage,
      this.state.dictionary.unit,
      this.state.dictionary.page,
      dataPerPage,
      overPages,
      'textbook',
      'в учебник'
      )
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
    const target = <HTMLElement>e.target;
    if (target.dataset.unit) {
      this.state.dictionary.unit = +target.dataset.unit;
      this.state.dictionary.page = 1;
    }
    await this.changeCurrentPage(this.state.dictionary.unit, this.state.dictionary.page);
  }

  async changeCurrentPage(unit: number, page: number) {
    window.location.hash = `/${this.state.page}/unit${unit}/${page}`;
    const dictionaryProgress = { unit: this.state.dictionary.unit, page: this.state.dictionary.page };
    const dictionary = JSON.stringify(dictionaryProgress);
    localStorage.setItem('dictionary', dictionary);
  }

  createSectionPlay(statusPage: boolean) {
    const playNode = <HTMLElement>playTemplate(this.state.dictionary.unit, this.state.dictionary.page, 'dictionary', statusPage)
      .content.cloneNode(true);
    return playNode;
  }

  addListener(state: PagesState) {
    const changeRadio = async (e: Event) => {
      const cardId = (<HTMLInputElement>e.target).name;
      const card = <HTMLElement>document.getElementById(cardId);
      const lebelEl = document.getElementById(cardId)?.querySelector('.label');
      const inputValue = (<HTMLInputElement>e.target).value;
      const inputChecked = (<HTMLInputElement>e.target).checked;
      if (inputValue === 'hard') {
        if (inputChecked) {
          lebelEl?.classList.add('hard');
          lebelEl?.classList.remove('easy');
          await addWordData(state.userId, cardId, state.token, 'hard');
        } else {
          lebelEl?.classList.remove('hard');
          await addWordData(state.userId, cardId, state.token, 'base');
          if (state.dictionary.unit === 7) {
            if (card.parentNode) { card.parentNode.removeChild(card); }
          }
        }
      }
      if (inputValue === 'easy') {
        if (inputChecked) {
          lebelEl?.classList.add('easy');
          lebelEl?.classList.remove('hard');
          if (state.dictionary.unit === 7) {
            if (card.parentNode) { card.parentNode.removeChild(card); }
          }
          await addWordData(state.userId, cardId, state.token, 'easy');
        } else {
          lebelEl?.classList.remove('easy');
          await addWordData(state.userId, cardId, state.token, 'base');
        }
      }
    };

    const radios = document.querySelectorAll('.radio-dif');
    radios.forEach((r) => r.addEventListener('click', changeRadio));
    const audioBtn = document.querySelectorAll('.btn-audio-diction');
    audioBtn.forEach((a) => a.addEventListener('click', this.playAudio));

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

  addListenerScroll() {
    const btnToGame = <HTMLElement>document.querySelector(".linc-to-game");
    const currentGame = <HTMLElement>document.querySelector(".section-game");

    const scrollToGame = (e: Event) => {
      currentGame.scrollIntoView({block: "center", behavior: "smooth"});
    }
    btnToGame.addEventListener('click', scrollToGame);
  }

  playAudio(e: Event) {
    const target = (<HTMLElement>e.target)?.closest('.btn-audio-diction');
    target?.setAttribute('disabled', 'disabled');
    const playlist: string[] = [
      target?.getAttribute('data-audio') || '',
      target?.getAttribute('data-audioMeaning') || '',
      target?.getAttribute('data-audioExample') || '',
    ];
    const audio = new Audio();
    let treck = 0;

    audio.onended = function () {
      treck += 1;
      if (treck < 3) {
        audio.src = `https://rslang-learn-words.herokuapp.com/${playlist[treck]}`;
        audio.play();
      } else {
        target?.removeAttribute('disabled');
      }
    };

    audio.src = `https://rslang-learn-words.herokuapp.com/${playlist[0]}`;
    audio.play();
  }
}

export default Dictionary;
