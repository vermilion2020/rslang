const audioTemplateResult = (): HTMLTemplateElement => {
  const resultPage = document.createElement('template');
  resultPage.innerHTML = `
  <div class="main-page__result">
  <div class="wrapper">
<div></div>

  </div>
  </div>
  `;

  return resultPage;
};

export default audioTemplateResult;
