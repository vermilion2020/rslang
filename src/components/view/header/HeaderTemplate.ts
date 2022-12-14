import menuItems from '../../model/menu-items';
import { MenuItem } from '../../model/types/menu-item';

const drawMenuItem = (item: MenuItem, active: string, loggedIn: boolean): string => `
    <a href="/#/${item.href}" title="${!loggedIn && item.auth ? 'Log in to see this page' : item.name}"
    class="main-nav__item${active === item.href ? ' main-nav__item_active' : ''} ${
  !loggedIn && item.auth ? ' main-nav__item_disabled' : ''
}" id="${item.href}-menu-item">${item.name}
    </a>`;

const headerTemplate = (active: string, loggedIn: boolean, userName: string, width: number): HTMLTemplateElement => {
  const header = document.createElement('template');
  const menuBody = menuItems.map((item) => drawMenuItem(item, active, loggedIn)).join('');
  const userNameHeader = userName.length > 8 ? `${userName.slice(0, 8)}..` : userName;
  let visibility = '';
  if (width < 1000) {
    visibility = ' hidden';
  }
  const loggedOutBlock = `
    <div class="logged-out">
      <button class="button" id="log-in">Войти</button>
    </div>`;
  const loggedInBlock = `
    <div class="logged-in">
      <div class="user-name" title="${userName}">${userNameHeader}</div>
      <button class="button" id="log-out">Выход</button>
    </div>`;
  header.innerHTML = `

  <div class="logo"><a href="/#/" class="logo__link"></span><h1>RS Lang</h1></a></div>
  <div class="wrapper-burger${visibility}">
    <nav class="main-nav${visibility}" id="main-nav">
      ${menuBody}
    </nav>
    ${!loggedIn ? loggedOutBlock : loggedInBlock}
  </div>
  <div class="burger"></div>
  `;
  return header;
};
export default headerTemplate;
