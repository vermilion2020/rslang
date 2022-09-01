import { addUserWord, getWords, getWordTranslates, updateUserWord } from '../../model/api/words';
import { maxScorePerWord, minScorePerWord, scoreStep } from '../../model/constants';
import { GameWordData, UserWord, WordData } from '../../model/types';
import { loadWords } from '../../controller/helpers';

export const levelSelect = async (target: HTMLElement) => {
  const levelSelect = <HTMLElement>document.querySelector('.select-container');
  const unitId = <string>target.dataset.sett;
  levelSelect.dataset.sett = unitId;
  return +unitId;
};

export const randomResultAu = (word: GameWordData) => {
  const result = Math.round(Math.random());
  let translate = '';
  translate = result ? word.wordTranslate : word.translates[0];
  return { result, translate };
};
//not applied yet
export const getNewWord = async (
  words: WordData[],
  level: number,
  currPage: number,
  unit: number,
  page: number,
  state: boolean
) => {
  //   const wordIndex = Math.floor(Math.random() * words.length);
  //   const response = await getWordTranslates(words[wordIndex].id, 1);
  //   const word = <GameWordData>response.data;
  ////from updateCard,
  words = await loadWords(unit, page, state);
  const wordIndex = Math.floor(Math.random() * (words.length - 5));
  const selected = words.slice(wordIndex, wordIndex + 5);
  const quessWord = selected[Math.floor(Math.random() * 6)];
  //not worked properly
  const indexUsed = words.findIndex((el) => (el.id = quessWord.id));
  //     console.log('indexUsed', indexUsed);

  let updatedWords = words.filter((_, index) => index !== indexUsed);
  if (updatedWords.length < 3) {
    if (currPage > 1) {
      currPage -= 1;
    } else if (level > 1) {
      level -= 1;
      currPage = 30;
    } else {
      currPage = 0;
      level = 0;
    }
    const newWords = (await getWords(level, currPage)).data;
    updatedWords = [...updatedWords, ...newWords];
  }
  return { words, updatedWords };
};
