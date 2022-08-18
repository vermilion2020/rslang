import headerTemplate from './HeaderTemplate';
import './Header.scss';
import { PagesState } from '../../model/types';
import { route } from '../../controller/router';
import menuItems from '../../model/menu-items';

const renderHeader = (state: PagesState) => {
  const CONTAINER = document.querySelector('#header-container') as HTMLElement;
  CONTAINER.innerHTML = '';
  const headerNode = <HTMLElement>headerTemplate(state.page, state.loggedIn, state.userName).content.cloneNode(true);
  CONTAINER.appendChild(headerNode);
  const nav = <HTMLElement>CONTAINER.querySelector('nav');
  nav.addEventListener('click', (e: Event) => {
    if ((e.target as HTMLElement).tagName === 'A') {
      e.preventDefault();
      const newLocation = (e.target as HTMLLinkElement).href;
      const menuItem = menuItems.find((item) => newLocation.includes(item.href));
      if (!state.loggedIn && menuItem?.auth) {
        return;
      }
      route(e, state);
    }
  });
};

export default renderHeader;
