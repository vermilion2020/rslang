import { getWordTranslates } from "../../model/api/words";
import { GameWordData, WordData } from "../../model/types";

export const randomResult = (word: GameWordData) => {
  const result = Math.round(Math.random());
  let translate = '';
  translate = result ? word.translates[0] : word.wordTranslate;
  return { result, translate };
}

export const getNewWord = async (words: WordData[]) => {
  const wordIndex = Math.floor(Math.random() * words.length);
  const response = await getWordTranslates(words[wordIndex].id, 1);
  const word = <GameWordData>response.data;
  const updatedWords = words.filter((_, index) => index !== wordIndex);
  return { word, updatedWords };
}