const notFoundTemplate: HTMLTemplateElement = document.createElement('template');
notFoundTemplate.innerHTML = `
  <section class="sec-not-found">
    <div class="not-found-container">

      <img class="icon-404" src="icons/404.svg" alt="title-img" />
      <p class="sec-not-found-title">Nothing is found</p>
      <p class="sec-not-found-desc">По вашему запросу ничего не найдено.</p>
    </div>
  </section>`;

export default notFoundTemplate;
