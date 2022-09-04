const audioTemplate: HTMLTemplateElement = document.createElement('template');
audioTemplate.innerHTML = `
  <div class="main-page-audio">
  <div class="wrapper">
    <section class="header-audio">
    </section>
    <section class="content">
        <div class="audio-content__wrapper">
          <h2 class="audio-main__title">Аудиовызов</h2>
          <h4 class="audio-main__subtitle">Тренировка Аудиовызов улучшает Ваше восприятие речи на слух</h4>
          <ul class="control-explanation">
            <li class="control-explanation__item">Используйте цифровые клавиши от 1 до 5</li>
            <li class="control-explanation__item">Используйте enter - чтобы пропустить вопрос</li>
          </ul>

          <p class="select-unit-offer">Выберите раздел:</p>
          <div class="select-container">
            <button class="select-level level-one" data-sett="1">Раздел 1</button>
            <button class="select-level level-two" data-sett="2">Раздел 2</button>
            <button class="select-level level-three" data-sett="3">Раздел 3</button>
            <button class="select-level level-four" data-sett="4">Раздел 4</button>
            <button class="select-level level-five" data-sett="5">Раздел 5</button>
            <button class="select-level level-six" data-sett="6">Раздел 6</button>
          </div>
          <div class="block-btn__start">
          <button class="btn-start">Начать</button>
          </div>
        </div>
      </section>

  </div>
  </div>`;

export default audioTemplate;
