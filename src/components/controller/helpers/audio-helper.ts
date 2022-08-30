import { addUserWord, getWords, getWordTranslates, updateUserWord } from '../../model/api/words';
import { maxScorePerWord, minScorePerWord, scoreStep } from '../../model/constants';
import { GameWordData, UserWord, WordData } from '../../model/types';

export const levelSelect = async (target: HTMLElement) => {
  const levelSelect = <HTMLElement>document.querySelector('.select-container');
  const unitId = <string>target.dataset.sett;
  levelSelect.dataset.sett = unitId;
  return +unitId;
};

export const updateGameContent = async (word: GameWordData) => {
  const content = <HTMLElement>document.querySelector('.content');
};
