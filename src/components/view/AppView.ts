import { handleRoute } from '../controller/router';
import { PagesState } from '../model/types';
import renderHeader from './header/Header';
import renderFooter from './footer/Footer';
import getInitialState from '../controller/state';
import './AppView.scss';

const AppView = async () => {
  let state: PagesState = getInitialState();
  state = await handleRoute(state);
  renderHeader(state);
  renderFooter();
  document.addEventListener('hashchange', () => {
    handleRoute(state);
  });
};

export default AppView;
