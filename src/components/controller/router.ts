import NotFound from '../view/notFound/NotFound';
import Main from '../view/main/Main';
import { Page, PagesState } from '../model/types/page';
import Textbook from '../view/textbook/Textbook';
import Dictionary from '../view/dictionary/Dictionary';
import Sprint from '../view/sprint/Sprint';
import AudioChallenge from '../view/audio/AudioChallenge';
import Stats from '../view/stats/Stats';
import { checkAuthState } from './helpers/auth-helper';
import {
  parseQueryString, rewriteUrl, setGameInitial, setMenu, setProgress, showPageTitle,
} from './helpers/router-helper';
import renderFooter from '../view/footer/Footer';

export const handleRoute = async (state: PagesState): Promise<PagesState> => {
  let newState: PagesState = await checkAuthState(state);
  rewriteUrl();
  const { queryStr, pageName } = parseQueryString();
  let page: Page;
  switch (pageName) {
    case 'main':
      page = new Main(newState);
      newState = await page.render();
      break;
    case 'textbook':
      newState.textbook = setProgress(queryStr, newState.textbook);
      page = new Textbook(newState);
      newState = await page.render();
      break;
    case 'dictionary':
      newState.dictionary = setProgress(queryStr, newState.dictionary);
      page = new Dictionary(newState);
      newState = await page.render();
      break;
    case 'sprint':
      newState.sprint = setGameInitial(queryStr);
      page = new Sprint(newState);
      newState = await page.render();
      break;
    case 'audio':
      newState.audio = setGameInitial(queryStr);
      page = new AudioChallenge(newState);
      newState = await page.render();
      break;
    case 'stats':
      if (!newState.loggedIn) {
        window.location.href = '/';
      }
      page = new Stats(newState);
      newState = await page.render();
      break;
    case 'notFound':
      page = new NotFound(newState);
      newState = await page.render();
      break;
    default:
      page = new Main(newState);
      newState = await page.render();
      break;
  }
  showPageTitle(newState.page);
  renderFooter(newState);
  return newState;
};

export const route = (e: Event, state: PagesState) => {
  const target = e.target as HTMLLinkElement;
  window.history.pushState({}, '', target.href);
  handleRoute(state);
};
