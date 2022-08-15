import { menuItems } from '../../model/menu-items';
import { MenuItem } from '../../model/types';

const drawMenuItem = (item: MenuItem, active: string, loggedIn: boolean): string => {
  return `
    <a href="/${item.href}" title="${!loggedIn && item.auth ? 'Log in to see this page' : item.name}"
    class="main-nav__item${active === item.href ? ' main-nav__item_active' : ''} ${!loggedIn && item.auth ? ' main-nav__item_disabled' : ''}" id="${item.href}-menu-item">${item.name}
    </a>`;
}

export const headerTemplate = (active: string, loggedIn: boolean): HTMLTemplateElement => {
  const header = document.createElement('template');
  let menuBody = '';
  for (let item of menuItems) {
    menuBody += drawMenuItem(item, active, loggedIn);
  }
  header.innerHTML = `
  <a href="/"><h1>RS Lang</h1></a>
  <nav class="main-nav" id="main-nav">
    ${menuBody}
  </nav>`;
  return header;
} 
