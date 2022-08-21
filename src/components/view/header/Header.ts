import headerTemplate from './HeaderTemplate';
import './Header.scss';
import { PagesState } from '../../model/types';
import { route } from '../../controller/router';
import menuItems from '../../model/menu-items';
import { renderAuthForm } from '../auth/Auth';

const renderHeader = (state: PagesState) => {
  const container = document.querySelector('#header-container') as HTMLElement;
  container.innerHTML = '';
  const headerNode = <HTMLElement>headerTemplate(state.page, state.loggedIn, state.userName).content.cloneNode(true);
  container.appendChild(headerNode);
  const nav = <HTMLElement>container.querySelector('nav');
  const loginButton = <HTMLElement>container.querySelector('.logged-out');
  nav.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLLinkElement;
    if (target.tagName === 'A') {
      e.preventDefault();
      const newLocation = target.href;
      const menuItem = menuItems.find((item) => newLocation.includes(item.href));
      if (!state.loggedIn && menuItem?.auth) {
        return;
      }
      document.querySelector('.main-nav__item_active')?.classList.remove('main-nav__item_active');
      target.classList.add('main-nav__item_active');
      route(e, state);
    }
  });
  if (loginButton) {
    loginButton.addEventListener('click', (e: Event) => {
      renderAuthForm();
    });
  }
};

export default renderHeader;
