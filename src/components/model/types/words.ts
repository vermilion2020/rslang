export interface WordData {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
  difficulty?: string;
  optional?: {
    vic: number;
    loss: number;
  };
  used?: boolean;
}

export interface CheckedWord {
  wordId: string;
  word: string;
  wordTranslate: string;
  transcription: string;
  audio: string;
  result: boolean;
  difficulty?: '' | 'hard' | 'easy';
  vic?: number;
  loss?: number;
}

export type GameWordData = WordData & { translates: string[] };

export interface UserWord {
  difficulty: string;
  optional: {
    vic: number;
    loss: number;
  };
}

export interface WordHardData {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
  userWord?: UserWord;
}

export interface UserWords {
  id: string;
  difficulty: string;
  optional: {
    vic: number;
    loss: number;
  };
  wordId: string;
}
