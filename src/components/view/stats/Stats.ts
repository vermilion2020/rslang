import { commonStatsTemplate, gameStatsTemplate } from './StatsTemplate';
import './Stats.scss';
import { Page, PagesState, ResponseStat, Stat, StatGame } from '../../model/types';
import { getDayCommonStat, getDayGameStat } from '../../model/api';
import { showPreloader } from '../../controller/helpers';

class Stats implements Page {
  state: PagesState;

  constructor(state: PagesState) {
    this.state = state;
  }

  async render() {
    this.state.page = 'stats';
    const container = document.querySelector('#main-container') as HTMLDivElement;
    showPreloader(container);
    const statData: Stat = (await getDayCommonStat(this.state.userId, this.state.token)).data;
    const statsNode = <HTMLElement>commonStatsTemplate(statData).content.cloneNode(true);
    const sprintStatData: StatGame = (await getDayGameStat(this.state.userId, this.state.token, 'sprint')).data;
    const sprintStatsNode = <HTMLElement>gameStatsTemplate(sprintStatData, 'sprint').content.cloneNode(true);
    const audioStatData: StatGame = (await getDayGameStat(this.state.userId, this.state.token, 'audio')).data;
    const audioStatsNode = <HTMLElement>gameStatsTemplate(audioStatData, 'audio').content.cloneNode(true);
    container.innerHTML = '';
    container.append(statsNode);
    container.append(sprintStatsNode);
    container.append(audioStatsNode);
    return this.state;
  }
}

export default Stats;
