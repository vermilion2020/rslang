import { getAllCommonStat, getDayCommonStat, getDayGameStat } from "../../model/api";
import { ChartAxisData, Stat, StatGame } from "../../model/types";
import { drawFullChart } from "./chart-helper";

export const createDayChartData = async (userId: string, token: string) => {
  const statData: Stat = (await getDayCommonStat(userId, token)).data;
  const sprintStatData: StatGame = (await getDayGameStat(userId, token, 'sprint')).data;
  const audioStatData: StatGame = (await getDayGameStat(userId, token, 'audio')).data;
  const commonData: ChartAxisData[] = [
    { label: 'Изученные слова', value: statData.easy },
    { label: 'Новые слова', value: statData.new },
    { label: '% правильных ответов', value: statData.percent },
  ];
  const sprintData: ChartAxisData[] = [
    { label: 'Новые слова', value: sprintStatData.new },
    { label: '% правильных ответов', value: sprintStatData.percent },
    { label: 'Серия ответов', value: sprintStatData.maxSuccess },
  ];
  const audioData: ChartAxisData[] = [
    { label: 'Новые слова', value: audioStatData.new },
    { label: '% правильных ответов', value: audioStatData.percent },
    { label: 'Серия ответов', value: audioStatData.maxSuccess },
  ];

  return { commonData, sprintData, audioData };
}

export const createMonthChartData = async (userId: string, token: string) => {
  const newWordsObj = <{ [key: string]: number }>(await getAllCommonStat(userId, token, 'new')).data;
  let newWordsData = [];
  for (let w in newWordsObj) {
    newWordsData.push({date: Date.parse(w), value: newWordsObj[w]});
  }
  const easyWordsObj = <{ [key: string]: number }>(await getAllCommonStat(userId, token, 'easy')).data;
  let easyWordsData = [];
  for (let w in easyWordsObj) {
    easyWordsData.push({date: Date.parse(w), value: easyWordsObj[w]});
  }

  return { newWordsData, easyWordsData };
}