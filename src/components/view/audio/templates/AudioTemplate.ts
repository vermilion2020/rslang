const audioTemplate: HTMLTemplateElement = document.createElement('template');
audioTemplate.innerHTML = `
  <div class="main-page">
  <div class="wrapper">
    <section class="header-audio">
     <div class="close-audio">
      <a href="/" class="close-audio__firstpage"><div class="close-crose__white"></div></a>
     </div>
    </section>
    <section class="content">
        <div class="audio-content__wrapper">
          <h2 class="audio-main__title">Аудиовызов</h2>
          <h4 class="audio-main__subtitle">Тренировка Аудиовызов улучшает Ваше восприятие речи на слух</h4>
          <ul class="control-explanation">
            <li class="control-explanation__item">Используйте мышь, чтобы выбрать.</li>
            <li class="control-explanation__item">Используйте цифровые клавиши от 1 до 5</li>
            <li class="control-explanation__item">Используйте enter - чтобы пропустить вопрос</li>
          </ul>

          <p class="select-offer">Выберите уровень</p>
          <div class="select-container">
            <button class="select-level" data-sett="1">Раздел 1</button>
            <button class="select-level" data-sett="2">Раздел 2</button>
            <button class="select-level" data-sett="3">Раздел 3</button>
            <button class="select-level" data-sett="4">Раздел 4</button>
            <button class="select-level" data-sett="5">Раздел 5</button>
            <button class="select-level" data-sett="6">Раздел 6</button>
          </div>
          <div class="block-btn__start">
          <button class="btn-start">Начать</button>
          </div>
        </div>
      </section>

  </div>
  </div>`;

export default audioTemplate;
