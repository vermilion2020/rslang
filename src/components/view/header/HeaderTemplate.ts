export const headerTemplate: HTMLTemplateElement = document.createElement('template');
headerTemplate.innerHTML = `
  <a href="/"><h1>RS Lang</h1></a>
  <nav class="main-nav" id="main-nav">
    <a href="/textbook" class="main-nav__item" id="textbook-menu-item">Учебник</a>
    <a href="/dictionary" class="main-nav__item" id="dictionary-menu-item">Словарь</a>
    <a href="/sprint" class="main-nav__item" id="sprint-menu-item">Спринт</a>
    <a href="/audio" class="main-nav__item" id="audio-menu-item">Аудиовызов</a>
    <a href="/stats" class="main-nav__item" id="stats-menu-item">Статистика</a>
  </nav>`;