import { handleRoute } from '../controller/router';
import { PagesState } from '../model/types';
import { renderHeader } from './header/Header';
import { renderFooter } from './footer/Footer';
import './AppView.scss';

const AppView = async () => {
  
  const getInitialState = (): PagesState => {
    return {
      loggedIn: false,
      page: 'main',
      refreshToken: '',
      token: '',
      userId: '',
      userName: 'Vasya'
    }
    //TODO get from local storage
    //token, refresh token, userId
  }
  

  let state: PagesState = getInitialState();

  state = await handleRoute(state);
 renderHeader(state);
 renderFooter(state);
};

export default AppView;

