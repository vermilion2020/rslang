import { authTemplate, registrationTemplate } from './AuthTemplate';
import './Auth.scss';
import * as crypto from 'crypto-ts';
import CRYPTO_KEY from '../../model/constants';

export const renderRegForm = () => {
  const container = document.querySelector('#popup') as HTMLElement;
  const overlay = document.querySelector('#overlay') as HTMLElement;
  const form = container.querySelector('#reg-form') as HTMLFormElement;
  container.innerHTML = '';
  container.classList.remove('hidden');
  overlay.classList.remove('hidden');
  const regNode = <HTMLElement>registrationTemplate.content.cloneNode(true);
  container.appendChild(regNode);

  container.querySelector('.popup__cross-button')?.addEventListener('click', (e) => {
    e.preventDefault();
    container.classList.add('hidden');
    overlay.classList.add('hidden');
    form.reset();
  });
/* 
  (container.querySelector('#req-form') as HTMLFormElement).addEventListener('submit', (e) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const email = target.querySelector('[name="email"]') as HTMLInputElement;
    const password = target.querySelector('[name="password"]') as HTMLInputElement;
    const passwordHash = crypto.AES.encrypt(password.value, CRYPTO_KEY);
    container.classList.add('hidden');
    overlay.classList.add('hidden');
    target.reset();
  }); */
}

export const renderAuthForm = () => {
  const container = document.querySelector('#popup') as HTMLElement;
  const overlay = document.querySelector('#overlay') as HTMLElement;
  const form = container.querySelector('#auth-form') as HTMLFormElement;
  container.innerHTML = '';
  container.classList.remove('hidden');
  overlay.classList.remove('hidden');
  const authNode = <HTMLElement>authTemplate.content.cloneNode(true);
  container.appendChild(authNode);
  container.querySelector('.popup__cross-button')?.addEventListener('click', (e) => {
    e.preventDefault();
    container.classList.add('hidden');
    overlay.classList.add('hidden');
    form.reset();
  });

  (container.querySelector('#auth-form') as HTMLFormElement).addEventListener('submit', (e) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const email = target.querySelector('[name="email"]') as HTMLInputElement;
    const password = target.querySelector('[name="password"]') as HTMLInputElement;
    const passwordHash = crypto.AES.encrypt(password.value, CRYPTO_KEY);
    //container.classList.add('hidden');
   //overlay.classList.add('hidden');
   // target.reset();
  });

  container.addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    console.log(target.id);
    if(target.id === 'reg-button') {
      renderRegForm();
    }
    
  });
}