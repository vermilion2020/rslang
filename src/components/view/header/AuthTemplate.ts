export const registrationTemplate: HTMLTemplateElement = document.createElement('template');
registrationTemplate.innerHTML = `
  <form id="auth-form" class="popup">
    <h2 class="popup__heading">RS Lang</h2>
    <button class="popup__cross-button">X</button>
    <p>Приложение для изучения английского языка с помощью игр.</p>
    <span class="popup__subheading">Регистрация</span>
    <input class="popup__input" required type="email" name="email" placeHolder="Электронная почта">
    <input class="popup__input" required minlength="3" type="text" name="name" placeHolder="Имя">
    <input class="popup__input" required minlength="8" type="password" name="password" placeHolder="Пароль">
    <input class="popup__input" required minlength="8" type="password" name="password-confirm" placeHolder="Повторно пароль">
    <button type="submit" id="registration" class="popup__submit button">Зарегистрироваться</button>
    <span class="popup__copyright">© Все права защищены — 2022 г. RS Lang</span>
  </form>`;

export const authTemplate: HTMLTemplateElement = document.createElement('template');
authTemplate.innerHTML = `
  <form id="auth-form" class="popup">
    <h2 class="popup__heading">RS Lang</h2>
    <button class="popup__cross-button">X</button>
    <p>Приложение для изучения английского языка с помощью игр.</p>
    <span class="popup__subheading">Вход</span>
    <input class="popup__input" required name="email" type="email" placeHolder="Электронная почта">
    <input class="popup__input" required minlength="8" name="password" type="password" placeHolder="Пароль">
    <div class="popup__buttons">
      <button type="submit" id="auth-button" class="button">Вход</button>
      <button id="reg-button" class="button button_light">Регистрация</button>
    </div>
    <span class="popup__copyright">© Все права защищены — 2022 г. RS Lang</span>
    </form>`;
