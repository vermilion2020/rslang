import { getWords} from '../../model/api/words';
import { apiBaseUrl, countWords } from '../../model/constants';
import { GameWordData, WordData } from '../../model/types';
import { loadWords } from '../../controller/helpers';

export const unitSelect = async (target: HTMLElement) => {
  const unitSelectContainer = <HTMLElement>document.querySelector('.select-container');
  const unitId = <string>target.dataset.sett;
  unitSelectContainer.dataset.sett = unitId;
  return +unitId;
};

const setSelectClass = (dataAttr: number, className: string) => {
  (<HTMLElement>document.querySelector(`[data-word="${dataAttr}"]`)).classList.add(className);
}

export const showCorrectAnswer = (word: GameWordData, result: boolean, valueResult: number) => {
  // TODO set scc styles for classes incorrect, correct, guessed
  const gameCard = <HTMLElement>document.querySelector('.game-wrapper');
  const correct = +<string>gameCard.dataset.result;
  document.querySelector('.btn-dont-know')?.classList.add('hidden');
  document.querySelector('.btn-next')?.classList.remove('hidden');
  const imgSrc = `${apiBaseUrl}/${word.image}`;
  const picture = <HTMLElement>document.querySelector('#word-picture');
  picture.setAttribute('src', imgSrc);
  picture.classList.remove('hidden');
  const audio = <HTMLElement>document.querySelector('.speaker-ico');
  audio.classList.remove('hidden');
  if (!result ) {
    if (valueResult !== -1) {
      setSelectClass(valueResult, 'incorrect');
    }
    setSelectClass(correct, 'correct');
  } else {
    setSelectClass(correct, 'guessed');
  }
  (<HTMLElement>document.querySelector('.select-offer')).innerText = <string>word.word;
}

export const resetCardsContent = () => {
  const picture = <HTMLElement>document.querySelector('#word-picture');
  picture.setAttribute('src', '');
  picture.classList.add('hidden');
  const offer = <HTMLElement>document.querySelector('.select-offer');
  offer.innerText = '';
  document.querySelector('.btn-dont-know')?.classList.remove('hidden');
  document.querySelector('.btn-next')?.classList.add('hidden');
  (<HTMLElement>document.querySelector('.speaker-ico')).classList.add('hidden');
}

export const randomTranslates = (word: GameWordData) => {
  let result = Math.round(Math.random() * countWords);
  let translates = word.translates;
  translates.splice(result, 0, word.wordTranslate);
  return { result, translates };
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
