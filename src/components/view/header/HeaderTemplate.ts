import { menuItems } from '../../model/menu-items';
import { MenuItem } from '../../model/types';

const drawMenuItem = (item: MenuItem, active: string, loggedIn: boolean): string => {
  return `
    <a href="/${item.href}" title="${!loggedIn && item.auth ? 'Log in to see this page' : item.name}"
    class="main-nav__item${active === item.href ? ' main-nav__item_active' : ''} ${!loggedIn && item.auth ? ' main-nav__item_disabled' : ''}" id="${item.href}-menu-item">${item.name}
    </a>`;
}

export const headerTemplate = (active: string, loggedIn: boolean, userName: string): HTMLTemplateElement => {
  const header = document.createElement('template');
  let menuBody = '';
  for (let item of menuItems) {
    menuBody += drawMenuItem(item, active, loggedIn);
  }
  const loggedOutBlock = `
    <div class="logged-out">
      <button class="button">Войти</button>
    </div>`;
  const loggedInBlock = `
    <div class="logged-in">
      <div class="user-name">${userName}</div>
      <button class="button">Выход</button>
    </div>`;
  header.innerHTML = `
  <div class="logo"><a href="/" class="logo__link"><span class="circle"></span><h1>RS Lang</h1></a></div>
  <nav class="main-nav" id="main-nav">
    ${menuBody}
  </nav>
  ${!loggedIn ? loggedOutBlock : loggedInBlock}
  `;
  return header;
} 
