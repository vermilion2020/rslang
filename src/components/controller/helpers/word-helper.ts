import { getUserWords, getUserWord, getWords, getWordsHard, addUserWord, updateUserWord, checkData } from '../../model/api/words';
import { WordData, UserWords, WordHardData, UserWord } from '../../model/types/words';
import { PagesState } from '../../model/types/page';
import axios from 'axios';


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
            return { ...word, difficulty: incl.difficulty, optional: incl.optional, used: true };
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
      const id = '_id';
      const newWord = {
        ...word,
        difficulty: word.userWord?.difficulty,
        optional: word.userWord?.optional,
        id: word[id],
      };
      delete newWord.userWord;
      return newWord;
    });
  }
  return words;
};

export const addWordData = async (userId: string, wordId: string, token: string, status: string) => {
  let word;
  try {
    const response = await getUserWord(userId, wordId, token);
    if (response.status === 200) {
      word = <UserWord>response.data;
      const wordData = {
        difficulty: `${status}`,
        optional: {
          vic: word.optional.vic,
          loss: word.optional.loss,
        },
      };
      updateUserWord(userId, wordId, wordData, token);
    }
  } catch {
    const wordData = {
      difficulty: `${status}`,
      optional: {
        vic: 0,
        loss: 0,
      },
    };
    addUserWord(userId, wordId, wordData, token);
  }
};

export const addDataPerPage = async (userId: string, token: string, unit: number, page: number) => {
  let data;
  try {
    const response = await checkData(userId, token, unit - 1, page - 1);
    if (response.status === 200) {
      data = response.data;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
  return data;
};
