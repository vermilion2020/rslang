import headerTemplate from './HeaderTemplate';
import './Header.scss';
import './Auth.scss';
import { Page, PagesState } from '../../model/types';
import { route } from '../../controller/router';
import menuItems from '../../model/menu-items';
import { authTemplate, registrationTemplate } from './AuthTemplate';
import { handleAuth, handleLogout, handleRegistration } from '../../controller/helpers/auth-helper';

class Header implements Page {
  state: PagesState;

  popupContainer: HTMLElement;

  overlay = document.querySelector('#overlay') as HTMLElement;

  form = document.querySelector('#auth-form') as HTMLFormElement;

  constructor(state: PagesState) {
    this.state = state;
    this.popupContainer = document.querySelector('#popup') as HTMLElement;
    this.popupContainer.addEventListener('click', async (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      if (target.id === 'reg-button') {
        this.renderRegForm();
      } else if (target.id === 'registration') {
        this.state = await handleRegistration(this.state);
        if (this.state.loggedIn) {
          this.render();
        }
      } else if (target.id === 'auth-button') {
        this.state = await handleAuth(this.state);
        if (this.state.loggedIn) {
          this.render();
        }
      }
      if (this.state.loggedIn) {
        this.clearPopup();
        this.render();
      }
    });

    window.addEventListener('keypress', async (e: KeyboardEvent) => {
      let key = e.key;
      if (key === 'Enter') {
        this.state = await handleAuth(this.state);
        if (this.state.loggedIn) {
          this.renderRegForm();
        } else {
          this.renderAuthForm();
        }
      }
    });
  }

  clearPopup() {
    this.popupContainer.classList.add('hidden');
    this.overlay.classList.add('hidden');
  }

  showPopup() {
    this.popupContainer.classList.remove('hidden');
    this.overlay.classList.remove('hidden');
  }

  renderRegForm() {
    this.popupContainer.innerHTML = '';
    const regNode = <HTMLElement>registrationTemplate.content.cloneNode(true);
    this.popupContainer.appendChild(regNode);
    this.popupContainer.querySelector('.popup__cross-button')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.clearPopup();
    });
  }

  renderAuthForm() {
    this.popupContainer.innerHTML = '';
    this.popupContainer.classList.remove('hidden');
    this.overlay.classList.remove('hidden');
    const authNode = <HTMLElement>authTemplate.content.cloneNode(true);
    this.popupContainer.appendChild(authNode);
    this.popupContainer.querySelector('.popup__cross-button')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.clearPopup();
    });
  }

  handleItemClick(e: Event) {
    const target = e.target as HTMLLinkElement;
    if (target.tagName === 'A') {
      e.preventDefault();
      const newLocation = target.href;
      const menuItem = menuItems.find((item) => newLocation.includes(item.href));
      if (!this.state.loggedIn && menuItem?.auth) {
        return;
      }
      route(e, this.state);
    }
    document.querySelector('.main-nav__item_active')?.classList.remove('main-nav__item_active');
    target.classList.add('main-nav__item_active');
  }

  async render() {
    const headerContainer = document.querySelector('#header-container') as HTMLElement;
    headerContainer.innerHTML = '';
    const headerNode = <HTMLElement>(
      headerTemplate(this.state.page, this.state.loggedIn, this.state.userName).content.cloneNode(true)
    );
    headerContainer.appendChild(headerNode);
    const nav = <HTMLElement>headerContainer.querySelector('nav');
    const logo = <HTMLElement>headerContainer.querySelector('.logo__link');
    const loginButton = <HTMLElement>headerContainer.querySelector('#log-in');
    const logoutButton = <HTMLElement>headerContainer.querySelector('#log-out');

    [nav, logo].forEach((el) => {
      el.addEventListener('click', (e: Event) => {
        this.handleItemClick(e);
      });
    });
    if (loginButton) {
      loginButton.addEventListener('click', () => {
        this.renderAuthForm();
      });
    }
    if (logoutButton) {
      logoutButton.addEventListener('click', () => {
        this.state = handleLogout(this.state);
      });
    }
    return this.state;
  }
}

export default Header;
