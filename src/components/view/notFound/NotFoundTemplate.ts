export const notFoundTemplate: HTMLTemplateElement = document.createElement('template');
notFoundTemplate.innerHTML = `
  <div class="not-found-container">
    <h2>Nothing is found</h2>
    <h3>Use navigation to open apllication pages</h3>
    <div class="not-found-container__img"></div>
  </div>`;