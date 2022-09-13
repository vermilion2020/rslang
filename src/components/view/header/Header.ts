import headerTemplate from './HeaderTemplate';
import './Header.scss';
import './Auth.scss';
import { Page, PagesState } from '../../model/types/page';
import { route } from '../../controller/router';
import menuItems from '../../model/menu-items';
import { authTemplate, registrationTemplate } from './AuthTemplate';
import { handleAuth, handleLogout, handleRegistration } from '../../controller/helpers/auth-helper';
import { setMenu } from '../../controller/helpers';

class Header implements Page {
  state: PagesState;

  popupContainer: HTMLElement;

  currentForm: string;

  overlay = document.querySelector('#overlay') as HTMLElement;

  form = document.querySelector('#auth-form') as HTMLFormElement;

  constructor(state: PagesState) {
    this.state = state;
    this.currentForm = 'auth';
    this.popupContainer = document.querySelector('#popup') as HTMLElement;
    this.popupContainer.addEventListener('click', async (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      if (target.id === 'reg-button') {
        this.renderRegForm();
      } else if (target.id === 'back-button') {
        this.renderAuthForm();
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

    document.addEventListener('keypress', async (e: KeyboardEvent) => {
      const email = document.querySelector('[name="email"]') as HTMLElement;
      const { key } = e;
      if (key === 'Enter' && this.currentForm === 'auth' && email) {
        e.preventDefault();
        this.state = await handleAuth(this.state);
      } else if (key === 'Enter' && this.currentForm === 'reg' && email) {
        e.preventDefault();
        this.state = await handleRegistration(this.state);
        if (this.state.loggedIn) {
          this.render();
        }
      }
    });
  }

  clearPopup() {
    this.popupContainer.classList.add('hidden');
    this.popupContainer.innerHTML = '';
    this.overlay.classList.add('hidden');
  }

  showPopup() {
    this.popupContainer.classList.remove('hidden');
    this.overlay.classList.remove('hidden');
    const burger = document.querySelector('.burger');
    if(window.innerWidth < 1000) {
      document.querySelector('.wrapper-burger')?.classList.add('hidden');
    }
  }

  renderRegForm() {
    this.currentForm = 'reg';
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
    this.currentForm = 'auth';
    this.showPopup();
    const authNode = <HTMLElement>authTemplate.content.cloneNode(true);
    this.popupContainer.appendChild(authNode);
    this.popupContainer.querySelector('.popup__cross-button')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.clearPopup();
    });
  }

  async handleItemClick(e: Event) {
    const target = e.target as HTMLLinkElement;
    if (target.tagName === 'A') {
      e.preventDefault();
      const overlay = <HTMLElement>document.querySelector('#overlay');
      if (!overlay.classList.contains('hidden')) {
        setMenu();
      }
      const newLocation = target.href;
      const menuItem = menuItems.find((item) => newLocation.includes(item.href));
      if (!this.state.loggedIn && menuItem?.auth) {
        return;
      }
      await route(e, this.state);
      if (target.id === '/#/-menu-item') {
        const teamSection = <HTMLElement>document.querySelector('.sec-4');
        teamSection.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }
    }
  }

  async render() {
    const headerContainer = document.querySelector('#header-container') as HTMLElement;
    headerContainer.innerHTML = '';
    const headerNode = <HTMLElement>(
      headerTemplate(this.state.page, this.state.loggedIn, this.state.userName, window.innerWidth).content.cloneNode(true)
    );
    headerContainer.appendChild(headerNode);
    
    const logo = <HTMLElement>headerContainer.querySelector('.logo__link');
    const loginButton = <HTMLElement>headerContainer.querySelector('#log-in');
    const logoutButton = <HTMLElement>headerContainer.querySelector('#log-out');
    const burger = <HTMLElement>document.querySelector('.burger');
    const nav = <HTMLElement>document.querySelector('#main-nav');

    // правки по меню
    const wrapperMenu = <HTMLElement>document.querySelector('.wrapper-burger');

    const overlay = <HTMLElement>document.querySelector('#overlay');
    const toggleMenu = () => {
      wrapperMenu.classList.toggle('hidden');
      nav.classList.remove('hidden');
      overlay.classList.toggle('hidden');
    }
    overlay.addEventListener('click', () => {
      const authForm = document.querySelector('#auth-form');
      const audioForm = document.querySelector('#popup-audio');
      if (!authForm || authForm.classList.contains('hidden')) {
        overlay.classList.add('hidden');
        if(window.innerWidth < 1000) {
          document.querySelector('.wrapper-burger')?.classList.add('hidden');
        }
        if(audioForm) {
          audioForm.classList.add('hidden');
        }
      }
    });
    burger.addEventListener('click', toggleMenu);
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
