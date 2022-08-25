const main = 'https://rslang-learn-words.herokuapp.com';

const words = `${main}/words`;
interface IArrWord {
  word: string;
}
let arrWords: string[];
export const getWords = async (group: number, page: number) => {
  const response = await fetch(`${words}?group=${group}&page=${page}`);
  const letWord = await response.json();
  arrWords = letWord.map((el: IArrWord) => el.word);
  console.log(arrWords);
  return arrWords;
};
// getWords(1, 1);
