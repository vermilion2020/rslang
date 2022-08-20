import NotFound from '../view/notFound/NotFound';
import Main from '../view/main/Main';
import { Page, PagesState, Progress } from '../model/types/page';
import Textbook from '../view/textbook/Textbook';
import Dictionary from '../view/dictionary/Dictionary';
import Sprint from '../view/sprint/Sprint';
import AudioChallenge from '../view/audio/AudioChallenge';
import Stats from '../view/stats/Stats';

const routes: { [key: string]: string } = {
  notFound: 'notFound',
  '/': 'main',
  textbook: 'textbook',
  dictionary: 'dictionary',
  sprint: 'sprint',
  audio: 'audio',
  stats: 'stats',
};

const checkAuthState = async (state: PagesState): Promise<PagesState> => state;

// TODO add auth logic
// Add user data if exist token in localstorage and it is valid

const rewriteUrl = () => {
  const { hash } = window.location;
  if (!hash) {
    window.location.hash = `#${window.location.pathname}`;
    window.location.pathname = '';
  }
};

const setProgress = (queryStr: string[], textbook: Progress) => {
  let { unit } = textbook;
  let { page } = textbook;
  if (queryStr[1] && queryStr[1].includes('unit')) {
    unit = +queryStr[1].replace(/([a-zA-Z])+/, '') || 1;
    if (queryStr[2]) {
      page = +queryStr[2] || 1;
    }
  }
  return { unit, page };
};

export const handleRoute = async (state: PagesState): Promise<PagesState> => {
  checkAuthState(state);
  rewriteUrl();
  const queryStr = window.location.hash
    .replace('/#', '')
    .split('/')
    .filter((item) => item !== '#' && item !== '');
  console.log(queryStr);
  const path = queryStr.length ? queryStr[0] : '/';
  const pageName = routes[path] || routes.notFound;
  let page: Page;
  let newState = state;
  switch (pageName) {
    case 'main':
      page = new Main(state);
      newState = await page.render();
      break;
    case 'textbook':
      newState.textbook = setProgress(queryStr, newState.textbook);
      page = new Textbook(newState);
      newState = await page.render();
      break;
    case 'dictionary':
      page = new Dictionary(state);
      newState = await page.render();
      break;
    case 'sprint':
      page = new Sprint(state);
      newState = await page.render();
      break;
    case 'audio':
      page = new AudioChallenge(state);
      newState = await page.render();
      break;
    case 'stats':
      if (!state.loggedIn) {
        window.location.pathname = '/';
        handleRoute(state);
      }
      page = new Stats(state);
      newState = await page.render();
      break;
    case 'notFound':
      page = new NotFound(state);
      newState = await page.render();
      break;
    default:
      page = new Main(state);
      newState = await page.render();
      break;
  }
  return newState;
};

export const route = (e: Event, state: PagesState) => {
  const target = e.target as HTMLLinkElement;
  window.history.pushState({}, '', target.href);
  handleRoute(state);
};
