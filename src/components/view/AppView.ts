import { handleRoute } from '../controller/router';
import { PagesState } from '../model/types';
import { renderHeader } from './header/Header';
import { renderFooter } from './footer/Footer';
import './AppView.scss';

const AppView = async () => {
  const checkAuthState = async(): Promise<boolean> => {
    return false;
  }

  let state: PagesState = {
    page: 'race',
    loggedIn: await checkAuthState(),
  };
  
  state = await handleRoute(state);
 renderHeader(state);
 renderFooter();
};

export default AppView;

