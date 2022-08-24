const footerTemplate: HTMLTemplateElement = document.createElement('template');
footerTemplate.innerHTML = `
  <p class="copyright">
      2022 
  </p>
  <div class="github-link--wrapper">
    <a class="github-link" href="https://github.com/halina-k" class="github" title="Halina Kulakova" target="_blank">
      <svg class="icon-git">
        <use xlink:href="./icons/sprite-footer.svg#logo-git"></use>
      </svg>
      <p>HK</p>
    </a>
    <a class="github-link" href="https://github.com/googray" class="github" title="Roman Shatrov" target="_blank">
      <svg class="icon-git">
        <use xlink:href="./icons/sprite-footer.svg#logo-git"></use>
      </svg>
    <p>RS</p>
    </a>
    <a class="github-link" href="https://github.com/vermilion2020" class="github" title="Militsa Tuseeva" target="_blank">
      <svg class="icon-git">
        <use xlink:href="./icons/sprite-footer.svg#logo-git"></use>
      </svg>
    <p>TM</p>
    </a>
  </div>
  <a href="https://rs.school/js/" target="_blank" class="link-rs">
    <svg class="icon-rs">
      <use xlink:href="./icons/sprite-footer.svg#logo-rs-school"></use>
    </svg>
  </a>`;
export default footerTemplate;
