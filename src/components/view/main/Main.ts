import mainTemplate from './MainTemplate';
import './Main.scss';
import { Page, PagesState } from '../../model/types/page';

class Main implements Page {
  state: PagesState;

  constructor(state: PagesState) {
    this.state = state;
  }

  addListener() {
    const handleClick = (e: Event) => {
      e.preventDefault();
      const target = <HTMLAnchorElement>(<HTMLElement>e.target).closest('.link-arrow');
      const namePage: string = target.id.slice(5);
      const metuItem = <HTMLElement>document.getElementById(`${namePage}-menu-item`);
      metuItem.click();
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
    this.addListener();
    return this.state;
  }
}

export default Main;
