import { authTemplate, registrationTemplate } from './AuthTemplate';
import './Auth.scss';
import { AutenticationData, RegistrationData } from '../../model/types';
import { authUser, regNewUser } from '../../model/api/auth';

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

  container.addEventListener('click', async(e) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if(target.id === 'reg-button') {
      renderRegForm();
    } else if (target.id === 'registration') {
      const email = document.querySelector('[name="email"]') as HTMLInputElement;
      const name = document.querySelector('[name="password"]') as HTMLInputElement;
      const password = document.querySelector('[name="password"]') as HTMLInputElement;
      const passwordConfirmation = document.querySelector('[name="password-confirm"]') as HTMLInputElement;
      const data: RegistrationData = {
        email: email.value,
        name: name.value,
        password: password.value
      };
      const registration = await regNewUser(data);
      if(registration.status === 200) {
        renderAuthForm();
      }
    } else if (target.id === 'auth-button') {
      const email = document.querySelector('[name="email"]') as HTMLInputElement;
      const password = document.querySelector('[name="password"]') as HTMLInputElement;
      const data: AutenticationData = {
        email: email.value,
        password: password.value
      };
      console.log(await authUser(data));
    }
    
  });
}
