import mainTemplate from './MainTemplate';
import './Main.scss';
import { Page, PagesState } from '../../model/types/page';
import { handleRoute } from '../../controller/router';

class Main implements Page {
  state: PagesState;

  constructor(state: PagesState) {
    this.state = state;
  }

  addListener(state: PagesState) {
    const handleClick = (e: Event) => {
      e.preventDefault();
      const target = <HTMLLinkElement>(<HTMLElement>e.target).closest('.link-arrow');
      window.history.pushState({}, '', target.href);
      handleRoute(state);
    };

    const idLinks = ['link-textbook', 'link-dictionary', 'link-sprint', 'link-audio'];

    idLinks.forEach((el: string) => {
      const elem = <HTMLElement>document.getElementById(el);
      elem.addEventListener('click', handleClick);
    });
  }

  async render() {
    this.state.page = 'main';
    const notFoundNode = <HTMLElement>mainTemplate.content.cloneNode(true);
    const container = document.querySelector('#main-container') as HTMLDivElement;
    container.innerHTML = '';
    container.append(notFoundNode);
    this.addListener(this.state);
    return this.state;
  }
}

export default Main;
