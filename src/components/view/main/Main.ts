import mainTemplate from './MainTemplate';
import './Main.scss';
import { Page, PagesState } from '../../model/types/page';

class Main implements Page {
  state: PagesState;

  constructor(state: PagesState) {
    this.state = state;
  }

  // <img class="img-mock" src="images/mock.png" alt="title-img" />
  // <svg class="icon-star8">
  //   <use xlink:href="./icons/sprite-mainpage.svg#star8"></use>
  // </svg>
  // <img class="icon-set" src="icons/set-x.svg" alt="title-img" />

  addListener() {
    const handleClick = (e: Event) => {
      const target = <HTMLLinkElement>(<HTMLElement>e.target).closest('.link-arrow');
      const menuItem = <HTMLElement>document.getElementById(`${target.dataset.id}-menu-item`);
      document.querySelector('.main-nav__item_active')?.classList.remove('main-nav__item_active');
      menuItem.classList.add('main-nav__item_active');
    };

    const idLinks = ['link-textbook', 'link-dictionary', 'link-sprint', 'link-audio'];

    idLinks.forEach((el: string) => {
      const elem = <HTMLElement>document.getElementById(el);
      elem.addEventListener('click', handleClick);
    });
  }

  async render() {
    this.state.page = 'main';
    const container = document.querySelector('#main-container') as HTMLDivElement;
    const mainNode = <HTMLElement>mainTemplate.content.cloneNode(true);
    container.innerHTML = '';
    container.append(mainNode);
    this.addListener();
    return this.state;
  }
}

export default Main;
