import { getWords, getWordTranslates } from "../../model/api/words";
import { GameWordData, WordData } from "../../model/types";

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