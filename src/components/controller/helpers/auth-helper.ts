import { authUser, getToken, regNewUser } from '../../model/api/auth';
import { PagesState } from '../../model/types/page';
import {
  AutenticationData, RegistrationData, SignInResponse,
} from '../../model/types/auth';

export const clearLocalStorage = () => {
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('expire');
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('userName');
  localStorage.removeItem('dictionary');
  localStorage.removeItem('textbook');
  window.location.reload();
};

export const handleLogout = (state: PagesState) => {
  const newState = { ...state };
  newState.loggedIn = false;
  newState.token = '';
  newState.refreshToken = '';
  newState.userId = '';
  newState.userName = '';
  clearLocalStorage();
  return newState;
};

export const checkAuthState = async (state: PagesState): Promise<PagesState> => {
  if (!state.token) {
    return state;
  }
  let newState = { ...state };
  const refreshDead = state.expire + 16200000;
  const now = Date.now();
  if (now > state.expire && now < refreshDead) {
    try {
      const response = await getToken(newState.userId, state.refreshToken);
      newState.expire = Date.now() + 7200000;
      newState.refreshToken = response.data.refreshToken;
      newState.token = response.data.token;
      localStorage.setItem('refreshToken', newState.refreshToken);
      localStorage.setItem('expire', `${newState.expire}`);
      localStorage.setItem('token', newState.token);
    } catch {
      newState = { ...handleLogout(newState) };
    }
  } else if (now >= refreshDead) {
    newState = { ...handleLogout(newState) };
  } else {
    newState.loggedIn = true;
  }
  return newState;
};

export const updateStateOnAuth = (state: PagesState, data: SignInResponse) => {
  const newState = { ...state };
  newState.loggedIn = true;
  newState.token = data.token;
  newState.refreshToken = data.refreshToken;
  newState.userId = data.userId;
  newState.userName = data.name;
  const dateExpire = Date.now() + 7200000;
  newState.expire = dateExpire;
  localStorage.setItem('refreshToken', data.refreshToken);
  localStorage.setItem('expire', `${dateExpire}`);
  localStorage.setItem('token', data.token);
  localStorage.setItem('userId', data.userId);
  localStorage.setItem('userName', data.name);
  return newState;
};

export const handleAuth = async (state: PagesState) => {
  let newState = { ...state };
  const email = document.querySelector('[name="email"]') as HTMLInputElement;
  const password = document.querySelector('[name="password"]') as HTMLInputElement;
  const authData: AutenticationData = {
    email: email.value,
    password: password.value,
  };
  try {
    const response = await authUser(authData);
    if (response.status === 200) {
      const responseData = <SignInResponse>response.data;
      newState = { ...updateStateOnAuth(newState, responseData) };
      window.location.reload();
    }
  } catch (e) {
    alert('Логин или пароль не верны! Попробуйте снова!');
  }
  return newState;
};

export const handleRegistration = async (state: PagesState) => {
  let newState = { ...state };
  const email = document.querySelector('[name="email"]') as HTMLInputElement;
  const name = document.querySelector('[name="name"]') as HTMLInputElement;
  const password = document.querySelector('[name="password"]') as HTMLInputElement;
  const passwordConfirmation = document.querySelector('[name="password-confirm"]') as HTMLInputElement;
  const data: RegistrationData = {
    email: email.value,
    name: name.value,
    password: password.value,
  };
  if (password.value !== passwordConfirmation.value) {
    alert('Пароли должны совпадать!');
    return newState;
  }
  let regResult = null;
  try {
    regResult = await regNewUser(data);
  } catch (e) {
    alert('Аккаунт с таким имейлом уже существует!');
  }
  try {
    const authData: AutenticationData = {
      email: email.value,
      password: password.value,
    };
    if (regResult) {
      const response = await authUser(authData);
      if (response.status === 200) {
        const responseData = <SignInResponse>response.data;
        newState = { ...updateStateOnAuth(newState, responseData) };
      }
    }
  } catch (e) {
    alert('Логин или пароль не верны! Попробуйте снова!');
  }
  return newState;
};
