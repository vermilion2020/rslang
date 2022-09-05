import { getAllCommonStat, getDayCommonStat, getDayGameStat } from '../../model/api';
import {
  ChartAxisData, DateChartData, Stat, StatGame,
} from '../../model/types/stat';

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
};

export const createMonthChartData = async (userId: string, token: string) => {
  const newWordsObj = <{ [key: string]: number }>(await getAllCommonStat(userId, token, 'new')).data;
  const newWordsData: DateChartData[] = [];
  const keysNew = Object.keys(newWordsObj);
  keysNew.forEach((k) => {
    newWordsData.push({ date: Date.parse(k), value: newWordsObj[k] });
  });
  const easyWordsObj = <{ [key: string]: number }>(await getAllCommonStat(userId, token, 'easy')).data;
  const easyWordsData: DateChartData[] = [];
  const keysEasy = Object.keys(easyWordsObj);
  keysEasy.forEach((k) => {
    easyWordsData.push({ date: Date.parse(k), value: newWordsObj[k] });
  });

  return { newWordsData, easyWordsData };
};
