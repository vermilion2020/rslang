import statsTemplate from './StatsTemplate';
import './Stats.scss';
import { Page, PagesState } from '../../model/types/page';
import { showPreloader } from '../../controller/helpers';
import { createDayChartData, createMonthChartData } from '../../controller/helpers/stat-helper';
import { drawChart, drawFullChart } from '../../controller/helpers/chart-helper';

class Stats implements Page {
  state: PagesState;

  constructor(state: PagesState) {
    this.state = state;
  }

  async render() {
    this.state.page = 'stats';
    const container = document.querySelector('#main-container') as HTMLDivElement;
    showPreloader(container);
    const { commonData, sprintData, audioData } = await createDayChartData(this.state.userId, this.state.token);
    const statDay = <HTMLElement>statsTemplate().content.cloneNode(true);
    container.innerHTML = '';
    container.append(statDay);
    drawChart('chartdiv_common', commonData);
    drawChart('chartdiv_sprint', sprintData);
    drawChart('chartdiv_audio', audioData);
    const menu = <HTMLElement>container.querySelector('.stat-menu');
    const { newWordsData, easyWordsData } = await createMonthChartData(this.state.userId, this.state.token);
    drawFullChart('chartdiv_new', newWordsData);
    drawFullChart('chartdiv_easy', easyWordsData);
    menu.addEventListener('click', (e: Event) => {
      const target = <HTMLElement>e.target;
      const dayStatBlock = <HTMLElement>container.querySelector('.day-stat');
      const monthStatBlock = <HTMLElement>container.querySelector('.month-stat');
      if (target.id === 'day-stat') {
        dayStatBlock.classList.remove('hidden');
        monthStatBlock.classList.add('hidden');
      } else {
        dayStatBlock.classList.add('hidden');
        monthStatBlock.classList.remove('hidden');
      }
    });
    return this.state;
  }
}

export default Stats;
