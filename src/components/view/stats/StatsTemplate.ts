export const dayStatsTemplate = (): HTMLTemplateElement => {
  const todayDate = (new Date()).toLocaleDateString('ru');
  const stat = document.createElement('template');
  stat.innerHTML = `
    <section class="stat-container">
      <div class="stat-menu">
        <button class="button" id="day-stat">Дневная статистика</button>
        <button class="button" id="month-stat">Долгосрочная статистика</button>
      </div>
      <div class="day-stat">
        <div class="common-stat stat-block">
          <h2>Общая статистика на ${todayDate}</h2>
          <div id="chartdiv_common" class="chartdiv"></div>
        </div>
        <div class="sprint-stat stat-block">
          <h2>По игре Спринт</h2>
          <div id="chartdiv_sprint" class="chartdiv"></div>
        </div>
        <div class="audio-stat stat-block">
          <h2>По игре Аудиовызов</h2>
          <div id="chartdiv_audio" class="chartdiv"></div>
        </div>
      </div>
      <div class="month-stat hidden">
        <div class="common-stat stat-long-block">
            <h2>Новые слова за месяц</h2>
            <div id="chartdiv_new" class="chartdiv-long"></div>
        </div>
        <div class="common-stat stat-long-block">
            <h2>Изученные слова за месяц</h2>
            <div id="chartdiv_easy" class="chartdiv-long"></div>
        </div>
      </div>
    </section>`;
  return stat;
} 
