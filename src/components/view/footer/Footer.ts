import { footerTemplate } from "./FooterTemplate";
import './Footer.scss';
  
export const renderFooter = () => {
    const footerNode = <HTMLElement>footerTemplate.content.cloneNode(true);
    const container = document.querySelector('#footer-container') as HTMLDivElement;
    container.innerHTML = '';
    container.append(footerNode);
  }
