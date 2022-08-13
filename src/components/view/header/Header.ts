import { headerTemplate } from "./HeaderTemplate";
import './Header.scss';
import { PagesState } from "../../model/types";
import { route } from "../../controller/router";
  
export const renderHeader = (state: PagesState) => {
  const CONTAINER = document.querySelector('#header-container') as HTMLElement;
  CONTAINER.innerHTML = '';
  const headerNode = <HTMLElement>headerTemplate.content.cloneNode(true);
  headerNode.querySelector(`#${state.page}-menu-item`)?.classList.add('main-nav__item_active')
  CONTAINER.appendChild(headerNode);
  const nav = <HTMLElement>CONTAINER.querySelector('nav');
  nav.addEventListener('click', (e: Event) => {
    if ((e.target as HTMLElement).tagName === 'A') {
      route(e, state);
    }
  });
};
