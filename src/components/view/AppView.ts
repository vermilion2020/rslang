import { handleRoute } from '../controller/router';
import { PagesState } from '../model/types';
import { renderHeader } from './header/Header';
import { renderFooter } from './footer/Footer';
import './AppView.scss';

const AppView = async () => {
  let state: PagesState = {
    page: 'race',
  };
  state = await handleRoute(state);
 renderHeader(state);
 renderFooter();
};

export default AppView;

