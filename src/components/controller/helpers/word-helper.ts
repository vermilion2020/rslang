import { getUserWords, getWords, getWordsHard } from '../../model/api/words';
import { WordData, UserWords, WordHardData } from '../../model/types/words';
import { PagesState } from '../../model/types/page';

export const loadWords = async (unit: number, page: number, loggedIn: boolean): Promise<WordData[]> => {
  let words: WordData[] = [];
  const response = await getWords(unit - 1, page - 1);
  if (response.status === 200) {
    words = <WordData[]>response.data;
  }
  if (loggedIn) {
    const userId = localStorage.getItem('userId') || '';
    const token = localStorage.getItem('token') || '';
    const responseUser = await getUserWords(userId, token);
    if (response.status === 200) {
      const userWords = <UserWords[] | []>responseUser.data;
      if (userWords.length) {
        const includWords = words.map((word) => {
          const incl = userWords.find((userWord) => word.id === userWord.wordId);
          if (incl) {
            return {
              ...word, difficulty: incl.difficulty, optional: incl.optional, used: true,
            };
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
      const newWord = { ...word, difficulty: word.userWord?.difficulty, optional: word.userWord?.optional };
      delete newWord.userWord;
      return newWord;
    });
  }
  return words;
};
