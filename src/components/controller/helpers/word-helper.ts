import { getUserWords, getWords } from '../../model/api/words';
import { WordData, UserWords } from '../../model/types/words';
import { PagesState } from '../../model/types/page';

const loadWords = async (state: PagesState): Promise<WordData[]> => {
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

export default loadWords;
