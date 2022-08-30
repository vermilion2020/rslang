export interface WordData {
  id: string,
  group: number,
  page: number,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  wordTranslate: string,
  textMeaningTranslate: string,
  textExampleTranslate: string,
  difficulty?: string;
  optional?: {
      vic: number;
      loss: number;
  };
}

export interface WordHardData {
  id: string,
  group: number,
  page: number,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  wordTranslate: string,
  textMeaningTranslate: string,
  textExampleTranslate: string,
  userWord?: {
    difficulty: string;
    optional: {
      vic: number;
      loss: number;
  };
  }
}
export interface UserWords {
  id: string,
  difficulty: string,
  optional: {
      vic: number,
      loss: number
  },
  wordId: string
}
