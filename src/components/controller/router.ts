import { NotFound } from "../view/notFound/NotFound";
import { Main } from "../view/main/Main";
import { Page, PagesState } from "../model/types/page";
import { Textbook } from "../view/textbook/Textbook";
import { Dictionary } from "../view/dictionary/Dictionary";
import { Sprint } from "../view/sprint/Sprint";
import { AudioChallenge } from "../view/audio/AudioChallenge";
import { menuItems } from "../model/menu-items";

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
    case 'stats':
    case 'team':
      page = new Main(state);
      state = await page.render();
      break;
    case 'textbook':
      page = new Textbook(state);
      state = await page.render();
      break;
    case 'dictionary':
      page = new Dictionary(state);
      state = await page.render();
      break;
    case 'sprint':
      page = new Sprint(state);
      state = await page.render();
      break;
    case 'audio':
      page = new AudioChallenge(state);
      state = await page.render();
      break;
    case 'notFound':
      page = new NotFound(state);
      state = await page.render();
      break;
  }
  document.querySelector(`.main-nav__item_active`)?.classList.remove('main-nav__item_active');
  document.querySelector(`#${state.page}-menu-item`)?.classList.add('main-nav__item_active');
  return state;
}

export const route = (e: Event, state: PagesState) => {
  e = e || window.event;
  const target = e.target as HTMLLinkElement;
  window.history.pushState({}, "", target.href);
  handleRoute(state);
}

