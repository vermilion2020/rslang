import { footerTemplate } from "./FooterTemplate";
import './Footer.scss';
import { route } from "../../controller/router";
import { PagesState } from "../../model/types";
  
export const renderFooter = (state: PagesState) => {
    const footerNode = <HTMLElement>footerTemplate.content.cloneNode(true);
    const container = document.querySelector('#footer-container') as HTMLDivElement;
    container.innerHTML = '';
    container.append(footerNode);
    container.addEventListener('click', (e: Event) => {
      if ((e.target as HTMLElement).classList.contains('main-nav__item')) {
        e.preventDefault();
        route(e, state);
      }
    });
  }
