import { addUserWord, getWords, getWordTranslates, updateUserWord } from "../../model/api/words";
import { maxScorePerWord, minScorePerWord } from "../../model/constants";
import { GameWordData, UserWord, WordData } from "../../model/types";

export const randomResult = (word: GameWordData) => {
  const result = Math.round(Math.random());
  let translate = '';
  translate = result ? word.wordTranslate : word.translates[0];
  return { result, translate };
}

export const getNewWord = async (words: WordData[], level: number, currPage: number) => {
  const wordIndex = Math.floor(Math.random() * words.length);
  const response = await getWordTranslates(words[wordIndex].id, 1);
  const word = <GameWordData>response.data;
  let updatedWords = words.filter((_, index) => index !== wordIndex);
  if (updatedWords.length < 3) {
    if (currPage > 1) {
      currPage -= 1;
    } else if (level > 1){
      level -= 1;
      currPage = 30;
    } else {
      currPage = 0;
      level = 0;
    }
    const newWords = (await getWords(level, currPage)).data;
    updatedWords = [...updatedWords, ...newWords];
  }
  return { word, updatedWords };
}

export const unitSelect = async (target: HTMLElement) => {
  const unitSelect = <HTMLElement>document.querySelector('.start-sprint');
  const previousUnitId = unitSelect.dataset.id;
  const unitId = <string>target.dataset.id;
  unitSelect.dataset.id = unitId;
  unitSelect.classList.remove(`unit-${previousUnitId}`);
  unitSelect.classList.add(`unit-${unitId}`);
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
  if(result) {
    successCount += 1;
    totalSore += successReward;
  } else {
    successCount = 0;
  }
  successReward = minScorePerWord + Math.floor(successInRope / 3) * minScorePerWord;
  successReward = successReward > maxScorePerWord ? maxScorePerWord : successReward;
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

export const getDecisionResult = (container: HTMLElement, target: HTMLElement) => {
  const decision = +<string>target.dataset.value;
  const result = +<string>container.dataset.result === decision;
  if(result) {
    container.classList.add('spec');
  } else {
    container.classList.add('spec-false');
  }
  return result;
}