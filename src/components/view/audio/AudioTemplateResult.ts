export const audioTemplateResult: HTMLTemplateElement = document.createElement('template');
audioTemplateResult.innerHTML = `
  <form id="page-result" class="popupAudio">
  <div class="wrapper">
    <div class="head-result">
      <h3 id="result-value" class="result-value">Результат</h3>
      <h3 id="result-words" class="result-words">Посмотреть слова</h3>
    </div>
    <div class="result-info">
      <p class="result-description">Процент правильно изученных слов</p>
      <p class="result-digit">{procentData}%</p>
    </div>
    <div class="footer-result">
      <button class="result-repeat">Повторить</button>
      <button class="result-exit">Выйти</button>
    </div>
  </div>
</form>
  `;

export const audioTemplateWords: HTMLTemplateElement = document.createElement('template');
audioTemplateWords.innerHTML = `
<form id="page-words" class="popupAudio">
<div class="wrapper">
        <div class="head-result">
          <h3 id="result-value" class="result-value">Результат</h3>
          <h3 id="result-words" class="result-words">Посмотреть слова</h3>
        </div>
        <div class="result-info">
          <ul class="result-correct">
          <li class="correct-item"><div class="on-speak"><img class='img-voice' src="../../../assets/images/png/up_volume.png" alt="img voice"></div><span class="eng-word"> - {englishWord}</span><span class="rus-word"> - {russianWord}</span></li>
          </ul>
          <hr>
          <ul class="result-incorrect">
            <li class="incorrect-item"></li>
          </ul>
        </div>
        <div class="footer-result">
          <button class="result-repeat">Повторить</button>
          <button class="result-exit">Выйти</button>
        </div>
      </div>
</form>
`;
