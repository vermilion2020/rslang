import voiceIcon from '../../../assets/images/png/up_volume.png';
import './AudioChallenge.scss';

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
      <div class="out-pop">
        <div class="container-pop"> 
         <div class="progress-circular__pop">
           <span class="value-pop">0%</span>
         </div>
        </div>
      </div>
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
        <p>Выученные слова - {numAccept}</p>
          <ul class="result-correct">
          <li class="correct-item"><div class="on-speak"><img class='img-voice' src="${voiceIcon}" alt="img voice"></div>  <span class="eng-word"> {  -  englishWord}</span> <span class="rus-word"> {  -  russianWord}</span></li>
          </ul>
          <hr class="hr-line">
          <p>Не выученные слова - {numLose}</p>
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
