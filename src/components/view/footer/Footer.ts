import footerTemplate from './FooterTemplate';
import './Footer.scss';
import { PagesState } from '../../model/types/page';

const renderFooter = (state: PagesState) => {
  const footerNode = <HTMLElement>footerTemplate(state.page).content.cloneNode(true);
  const container = document.querySelector('#footer-container') as HTMLDivElement;
  const mainContainer = document.querySelector('#main-container') as HTMLDivElement;
  if (state.page === 'sprint' || state.page === 'audio') {
    mainContainer.classList.add('main-container-games');
  } else {
    mainContainer.classList.remove('main-container-games');
  }
  
  container.innerHTML = '';
  container.append(footerNode);
};

export default renderFooter;
