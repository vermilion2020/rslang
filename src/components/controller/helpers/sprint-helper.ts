import { saveGameStat } from '../../model/api';
import { addUserWord, getWordTranslates, updateUserWord } from '../../model/api/words';
import { maxScorePerWord, minScorePerWord, scoreStep } from '../../model/constants';
import { GameWordData, StatData, UserWord, WordData } from '../../model/types';
import { loadWords } from './word-helper';

export const randomResult = (word: GameWordData) => {
  const result = Math.round(Math.random());
  let translate = '';
  translate = result ? word.wordTranslate : word.translates[0];
  return { result, translate };
};

export const getNewWord = async (
  words: WordData[],
  unit: number,
  currPage: number,
  loggedIn: boolean,
  translateCounts: number,
  source: string
) => {
  let currentPage = currPage;
  let currentUnit = unit;
  const wordIndex = Math.floor(Math.random() * words.length);
  const response = await getWordTranslates(words[wordIndex].id, translateCounts);
  const { translates } = <GameWordData>response.data;
  const word = { ...words[wordIndex], translates };
  let updatedWords = [...words.slice(0, wordIndex), ...words.slice(wordIndex + 1, words.length)];
  if (updatedWords.length < 1) {
    if (currentPage > 1) {
      currentPage -= 1;
    } else if (unit > 1) {
      currentUnit -= 1;
      currentPage = 30;
    } else {
      currentPage = -1;
      currentUnit = -1;
    }

    if (currentPage !== -1) {
      let newWords = await loadWords(currentUnit, currentPage, loggedIn);
      if (source === 'textbook' || source === 'dictionary') {
        newWords = newWords.filter((word) => word.difficulty !== 'easy');
      }
      updatedWords = [...updatedWords, ...newWords];
    }
  }
  return { word, updatedWords };
};

export const unitSelect = async (target: HTMLElement) => {
  const unitSelectContainer = <HTMLElement>document.querySelector('.start-sprint');
  const unitId = <string>target.dataset.id;
  unitSelectContainer.dataset.id = unitId;
  document.querySelector('.start-countdown')?.classList.remove('hidden');
  return +unitId;
};

export const updateCardContent = async (word: GameWordData) => {
  const card = <HTMLElement>document.querySelector('#card-sprint');
  const cardWord = <HTMLElement>document.querySelector('#card-word');
  const cardTranslate = <HTMLElement>document.querySelector('#card-translate');
  const { result, translate } = randomResult(word);
  card.dataset.result = `${result}`;
  card.dataset.word = word.id;
  cardWord.innerHTML = word.word;
  cardTranslate.innerHTML = translate;
  const trueButton = <HTMLElement>document.querySelector('.decision_button__true');
  const falseButton = <HTMLElement>document.querySelector('.decision_button__false');
  trueButton.removeAttribute('disabled');
  falseButton.removeAttribute('disabled');
};

export const updateScoreParameters = (
  result: boolean,
  successInRope: number,
  countForSuccess: number,
  score: number,
  unit: number
) => {
  let successCount = successInRope;
  let successReward = countForSuccess;
  let totalSore = score;
  let stepNumber = 0;
  if (result) {
    successCount += 1;
    stepNumber = successCount % scoreStep;
    totalSore += successReward;
    document.querySelector(`.circle[data-value="${stepNumber}"]`)?.classList.add(`circle-${unit}__active`);
  } else {
    successCount = 0;
    document.querySelectorAll('.circle').forEach((el) => el.classList.remove(`circle-${unit}__active`));
  }
  successReward = minScorePerWord + Math.floor(successCount / scoreStep) * minScorePerWord;
  successReward = successReward > maxScorePerWord ? maxScorePerWord : successReward;
  if (stepNumber === 0) {
    document.querySelectorAll('.circle').forEach((el) => el.classList.remove(`circle-${unit}__active`));
  }
  (<HTMLElement>document.querySelector('#success-count')).innerText = `${successReward}`;
  (<HTMLElement>document.querySelector('#score')).innerText = `${totalSore}`;
  return { successCount, successReward, totalSore };
};

export const updateWordData = async (
  result: boolean,
  word: GameWordData,
  userId: string,
  token: string,
  source: string
) => {
  let loss = word.optional?.loss || 0;
  let vic = word.optional?.vic || 0;
  let difficulty = word.difficulty || 'base';
  if (result) {
    vic += 1;
  } else {
    loss += 1;
  }
  if (!result && difficulty === 'easy') {
    difficulty = 'base';
    loss = 0;
    vic = 0;
  }
  if ((vic >= 3 && difficulty === 'base') || (vic >= 5 && difficulty === 'hard')) {
    difficulty = 'easy';
    loss = 0;
    vic = 0;
  }
  const data: UserWord = {
    difficulty,
    optional: {
      vic,
      loss,
      source: source,
    },
  };
  if (word.used) {
    await updateUserWord(userId, word.id, data, token);
  } else {
    await addUserWord(userId, word.id, data, token);
  }
};

export const saveGameStatistics = async (
  userId: string,
  token: string,
  maxSuccess: number,
  successAnswers: number,
  totalAnswers: number,
  source: string
) => {
  const maxData: StatData = {
    field: 'maxSuccess',
    value: maxSuccess,
    source: source,
    totalValue: 0,
  };
  await saveGameStat(userId, token, maxData);
  let percentData: StatData = {
    field: 'successPercent',
    value: successAnswers,
    source: source,
    totalValue: totalAnswers,
  };
  await saveGameStat(userId, token, percentData);
};

export const disableDecisionButtons = () => {
  const trueButton = <HTMLElement>document.querySelector('.decision_button__true');
  const falseButton = <HTMLElement>document.querySelector('.decision_button__false');
  trueButton.setAttribute('disabled', 'disabled');
  falseButton.setAttribute('disabled', 'disabled');
};

export const getDecisionResult = (container: HTMLElement, decision: number) => {
  const result = +(<string>container.dataset.result) === decision;
  if (result) {
    container.classList.add('background-true');
    setTimeout(() => {
      container.classList.remove('background-true');
    }, 1000);
  } else {
    container.classList.add('background-false');
    setTimeout(() => {
      container.classList.remove('background-false');
    }, 1000);
  }
  return result;
};
