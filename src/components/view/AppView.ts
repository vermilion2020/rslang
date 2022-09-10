import { handleRoute } from '../controller/router';
import { PagesState } from '../model/types/page';
import getInitialState from '../controller/state';
import './AppView.scss';
import Header from './header/Header';
import { setMenu } from '../controller/helpers';

const AppView = async () => {
  let state: PagesState = getInitialState();
  state = await handleRoute(state);
  const header = new Header(state);
  state = await header.render();
  window.addEventListener('hashchange', async () => {
    state = await handleRoute(state);
  });
  
  window.addEventListener('resize', setMenu);
  window.addEventListener('load', setMenu);
};

export default AppView;
