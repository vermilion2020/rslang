import NotFound from '../view/notFound/NotFound';
import Main from '../view/main/Main';
import { Page, PagesState, Progress } from '../model/types/page';
import Textbook from '../view/textbook/Textbook';
import Dictionary from '../view/dictionary/Dictionary';
import Sprint from '../view/sprint/Sprint';
import AudioChallenge from '../view/audio/AudioChallenge';
import Stats from '../view/stats/Stats';
import { checkAuthState } from './helpers/auth-helper';
import menuItems from '../model/menu-items';

const routes: { [key: string]: string } = {
  notFound: 'notFound',
  '/': 'main',
  textbook: 'textbook',
  dictionary: 'dictionary',
  sprint: 'sprint',
  audio: 'audio',
  stats: 'stats',
};

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
  if (!unit) { unit = 1; }
  if (!page) { page = 1; }
  return { unit, page };
};

const showPageTitle = (page: string) => {
  const currentMenuItem = menuItems.find((item) => item.href === page);
  const pageTitle = currentMenuItem ? currentMenuItem.name : 'RS Lang';
  document.title = pageTitle;
};

export const handleRoute = async (state: PagesState): Promise<PagesState> => {
  let newState: PagesState = { ...await checkAuthState(state) };
  rewriteUrl();
  window.scrollTo(0, 0);
  const queryStr = window.location.hash
    .replace('/#', '')
    .split('/')
    .filter((item) => item !== '#' && item !== '');
  const path = queryStr.length ? queryStr[0] : '/';
  const pageName = routes[path] || routes.notFound;
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
      page = new Sprint(newState);
      newState = await page.render();
      break;
    case 'audio':
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
  return newState;
};

export const route = (e: Event, state: PagesState) => {
  const target = e.target as HTMLLinkElement;
  window.history.pushState({}, '', target.href);
  handleRoute(state);
};
