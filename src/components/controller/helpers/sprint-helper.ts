import { addUserWord, getWords, getWordTranslates, updateUserWord } from "../../model/api/words";
import { maxScorePerWord, minScorePerWord, scoreStep } from "../../model/constants";
import { GameWordData, UserWord, WordData } from "../../model/types";
import { loadWords } from "./word-helper";

export const randomResult = (word: GameWordData) => {
  const result = Math.round(Math.random());
  let translate = '';
  translate = result ? word.wordTranslate : word.translates[0];
  return { result, translate };
}

export const getNewWord = async (words: WordData[], unit: number, currPage: number, loggedIn: boolean) => {
  const wordIndex = Math.floor(Math.random() * words.length);
  const response = await getWordTranslates(words[wordIndex].id, 1);
  const translates = (<GameWordData>response.data).translates;
  const word = {...words[wordIndex], translates};
  let updatedWords = words.filter((_, index) => index !== wordIndex);
  if (updatedWords.length < 3) {
    if (currPage > 1) {
      currPage -= 1;
    } else if (unit > 1){
      unit -= 1;
      currPage = 30;
    } else {
      currPage = 0;
      unit = 0;
    }
    const newWords = await loadWords(unit, currPage, loggedIn);
    updatedWords = [...updatedWords, ...newWords];
  }
  return { word, updatedWords };
}

export const unitSelect = async (target: HTMLElement) => {
  const unitSelect = <HTMLElement>document.querySelector('.start-sprint');
  const unitId = <string>target.dataset.id;
  unitSelect.dataset.id = unitId;
  document.querySelector('.start-countdown')?.classList.remove('hidden');
  return +unitId;
}

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
}

export const updateScoreParameters = (result: boolean, successInRope: number, countForSuccess: number, score: number) => {
  let successCount = successInRope;
  let successReward = countForSuccess;
  let totalSore = score;
  let stepNumber = 0;
  if(result) {
    successCount += 1;
    stepNumber = successCount % scoreStep;
    totalSore += successReward;
    document.querySelector(`.circle[data-value="${stepNumber}"]`)?.classList.add('circle__active');
  } else {
    successCount = 0;
    document.querySelectorAll(`.circle`).forEach(el => el.classList.remove('circle__active'));
  }
  successReward = minScorePerWord + Math.floor(successCount / scoreStep) * minScorePerWord;
  successReward = successReward > maxScorePerWord ? maxScorePerWord : successReward;
  if(stepNumber === 0) {
    document.querySelectorAll(`.circle`).forEach(el => el.classList.remove('circle__active'));
  }
  (<HTMLElement>document.querySelector('#success-count')).innerText = `${successReward}`;
  (<HTMLElement>document.querySelector('#score')).innerText = `${totalSore}`;
  return { successCount, successReward, totalSore}
}

export const updateWordData = async (result: boolean, word: GameWordData, userId: string, token: string) => {
  let loss = word.optional?.loss || 0;
  let vic = word.optional?.vic || 0;
  let difficulty = word.difficulty || 'base';
  result ? vic += 1 : loss += 1;
  if (!result && difficulty === 'easy') {
    difficulty = 'base';
    loss = 0;
    vic = 0;
  }
  if (vic >= 3 && difficulty === 'base' || vic >= 5 && difficulty === 'hard') {
    difficulty = 'easy';
    loss = 0;
    vic = 0;
  } 
  const data: UserWord = {
    difficulty,
    optional: {
      vic, 
      loss
    }
  };
  if (word.used) {
    await updateUserWord(userId, word.id, data, token);
  } else {
    await addUserWord(userId, word.id, data, token);
  }
}

export const disableDecisionButtons = () => {
  const trueButton = <HTMLElement>document.querySelector('.decision_button__true');
  const falseButton = <HTMLElement>document.querySelector('.decision_button__false');
  trueButton.setAttribute('disabled', 'disabled');
  falseButton.setAttribute('disabled', 'disabled');
}

export const getDecisionResult = (container: HTMLElement, decision: number) => {
  const result = +<string>container.dataset.result === decision;
  if(result) {
    container.classList.add('border-true');
    setTimeout(() => { container.classList.remove('border-true');},1000);
  } else {
    container.classList.add('border-false');
    setTimeout(() => { container.classList.remove('border-false');},1000);
  }
  return result;
}