import menuItems from '../../model/menu-items';
import { GameInitial, PagesState, Progress } from '../../model/types';

const routes: { [key: string]: string } = {
  notFound: 'notFound',
  '/': 'main',
  textbook: 'textbook',
  dictionary: 'dictionary',
  sprint: 'sprint',
  audio: 'audio',
  stats: 'stats',
};

export const parseQueryString = () => {
  const queryStr = window.location.hash
    .replace('/#', '')
    .split('/')
    .filter((item) => item !== '#' && item !== '');
  const path = queryStr.length ? queryStr[0] : '/';
  const pageName = routes[path] || routes.notFound;
  return { queryStr, pageName };
};

export const rewriteUrl = (state: PagesState) => {
  const { hash } = window.location;
  if ((hash.includes('sprint') || hash.includes('audio')) && state.gameStarted) {
    window.location.reload();
  }
  if (!hash) {
    window.location.hash = `#${window.location.pathname}`;
    window.location.pathname = '';
  }
};

export const setGameInitial = (queryStr: string[]): GameInitial => {
  let unit = -1; let
    page = -1;
  let source = '';
  if (queryStr[1] && queryStr[1].includes('unit')) {
    unit = +queryStr[1].replace(/([a-zA-Z])+/, '') || 1;
    if (queryStr[2]) {
      page = +queryStr[2] || 1;
    }
    if (queryStr[3]) {
      source = queryStr[3] || '';
    }
  }
  return { unit, page, source };
};

export const setProgress = (queryStr: string[], textbook: Progress) => {
  let { unit, page } = textbook;
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

export const showPageTitle = (page: string) => {
  const currentMenuItem = menuItems.find((item) => item.href === page);
  const pageTitle = currentMenuItem ? currentMenuItem.name : 'RS Lang';
  document.title = pageTitle;
};
