import { getUserWords, getWords, getWordsHard } from '../../model/api/words';
import { WordData, UserWords, WordHardData } from '../../model/types/words';
import { PagesState } from '../../model/types/page';

export const loadWords = async (state: PagesState): Promise<WordData[]> => {
  let words: WordData[] = [];
  const response = await getWords(state.textbook.unit - 1, state.textbook.page - 1);
  if (response.status === 200) {
    words = <WordData[]>response.data;
  }
  if (state.loggedIn) {
    const responseUser = await getUserWords(state.userId, state.token);
    if (response.status === 200) {
      const userWords = <UserWords[] | []>responseUser.data;
      if (userWords.length) {
        const includWords = words.map((word) => {
          const incl = userWords.find((userWord) => word.id === userWord.wordId);
          if (incl) {
            return { ...word, difficulty: incl.difficulty, optional: incl.optional };
          }
          return word;
        });
        words = includWords;
      }
    }
  }
  return words;
};

export const loadWordsHard = async (state: PagesState): Promise<WordData[]> => {
  let words: WordData[] = [];
  const response = await getWordsHard(state.userId, state.token);
  if (response.status === 200) {
    const dataServ: WordHardData[] = response.data[0].paginatedResults;
    words = dataServ.map((word: WordHardData) => {
      console.log(word);
      const newWord = { ...word, difficulty: word.userWord?.difficulty, optional: word.userWord?.optional };
      delete newWord.userWord;
      return newWord;
    });
  }
  return words;
};

export default loadWords;
