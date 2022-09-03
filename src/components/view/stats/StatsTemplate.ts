import { Stat, StatGame } from "../../model/types/stat";

export const commonStatsTemplate = (dayStat: Stat): HTMLTemplateElement => {
  const todayDate = (new Date()).toLocaleDateString('ru');
  const stat = document.createElement('template');
  stat.innerHTML = `
    <div class="main-page">
      <h2>Общая статистика на ${todayDate}</h2>
      <table>
        <tr><th>Новые слова</th><th>Изученные слова</th><th>Процент правильных ответов</th></tr>
        <tr><td>${dayStat.new}</td><td>${dayStat.easy}</td><td>${dayStat.percent}</td></tr>
      </table>
    </div>`;
  return stat;
} 

export const gameStatsTemplate = (dayStat: StatGame, gameName: string): HTMLTemplateElement => {
  const todayDate = (new Date()).toLocaleDateString('ru');
  const stat = document.createElement('template');
  stat.innerHTML = `
    <div class="main-page">
      <h2>Cтатистика по игре ${gameName} на ${todayDate}</h2>
      <table>
        <tr><th>Новые слова</th><th>Процент правильных ответов</th><th>Самая длинная цепочка угаданных слов</th></tr>
        <tr><td>${dayStat.new}</td><td>${dayStat.percent}</td><td>${dayStat.maxSuccess}</td></tr>
    </div>`;
  return stat;
} 
