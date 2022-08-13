import { NotFound } from "../view/notFound/NotFound";
import { Main } from "../view/main/Main";
import { Page, PagesState } from "../model/types/page";

const routes: {[key: string]: string} = {
  'notFound': 'notFound',
  '/': 'main',
  '/textbook': 'textbook',
  '/dictionary': 'dictionary',
  '/sprint': 'sprint',
  '/audio': 'audio',
  '/stats': 'stats',
  '/team': 'team',
};

export const handleRoute = async (state:PagesState): Promise<PagesState> => {
  const path = window.location.pathname;
  const pageName = routes[path] || routes['notFound'];
  let page: Page;
  switch (pageName) {
    case 'main':
    case 'textbook':
    case 'dictionary':
    case 'sprint':
    case 'audio':
    case 'stats':
    case 'team':
      page = new Main(state);
      state = await page.render();
      break;
    case 'notFound':
      page = new NotFound(state);
      state = await page.render();
      break;
  }
  return state;
}

export const route = (e: Event, state: PagesState) => {
  e = e || window.event;
  e.preventDefault();
  const target = e.target as HTMLLinkElement;
  window.history.pushState({}, "", target.href);
  handleRoute(state);
}

