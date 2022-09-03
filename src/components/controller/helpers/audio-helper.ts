import { apiBaseUrl, countWords } from '../../model/constants';
import { GameWordData } from '../../model/types';

export const unitSelect = async (e: Event | KeyboardEvent) => {
  const target = <HTMLElement>e.target;
    let unitId = 0;
    if ('key' in e) {
      unitId = Number.parseInt(e.key, 10)
    }
    else if (target.classList.contains('select-level')) {
      unitId = +<string>target.dataset.sett;
    }
  const unitSelectContainer = <HTMLElement>document.querySelector('.select-container');
  unitSelectContainer.dataset.sett = `${unitId}`;
  return unitId;
};

const setSelectClass = (dataAttr: number, className: string) => {
  (<HTMLElement>document.querySelector(`[data-word="${dataAttr}"]`)).classList.add(className);
}

export const disableDecisionButtons = () => {
  const selectButtons = <NodeListOf<HTMLElement>>document.querySelectorAll('.select-word');
  selectButtons.forEach((el) => el.setAttribute('disabled', 'disabled'));
  (<HTMLElement>document.querySelector('.btn-dont-know'))
    .setAttribute('disabled', 'disabled');
};

export const enableDecisionButtons = () => {
  const selectButtons = <NodeListOf<HTMLElement>>document.querySelectorAll('.select-word');
  selectButtons.forEach((el) => el.removeAttribute('disabled'));
  (<HTMLElement>document.querySelector('.btn-dont-know'))
    .removeAttribute('disabled');
};

export const playWordAudio = async (audioPath?: string) => {
  if (audioPath) {
    const player = <HTMLAudioElement>document.querySelector('#audio');
    player.src = `${apiBaseUrl}/${audioPath}`;
    player.currentTime = 0;
    player.muted = false;
    try {
      await player.play();
    } catch {
      console.log('don\'t start audio on reload');
    }
  }
}

export const showCorrectAnswer = (word: GameWordData, result: boolean, valueResult: number) => {
  // TODO set scc styles for classes incorrect, correct, guessed
  const gameCard = <HTMLElement>document.querySelector('.game-wrapper');
  const correct = +<string>gameCard.dataset.result;
  document.querySelector('.btn-dont-know')?.classList.add('hidden');
  document.querySelector('.btn-next')?.classList.remove('hidden');
  const imgSrc = `${apiBaseUrl}/${word.image}`;
  const picture = <HTMLElement>document.querySelector('#word-picture');
  picture.setAttribute('src', imgSrc);
  picture.classList.remove('hidden');
  const audio = <HTMLElement>document.querySelector('.speaker-ico');
  audio.classList.remove('hidden');
  if (!result ) {
    if (valueResult !== -1) {
      setSelectClass(valueResult, 'incorrect');
    }
    setSelectClass(correct, 'correct');
  } else {
    setSelectClass(correct, 'guessed');
  }
  (<HTMLElement>document.querySelector('.select-offer')).innerText = <string>word.word;
}

export const resetCardsContent = () => {
  const picture = <HTMLElement>document.querySelector('#word-picture');
  if(picture) {
    picture.setAttribute('src', '');
    picture.classList.add('hidden');
  }
  const offer = <HTMLElement>document.querySelector('.select-offer');
  if(offer) {
    offer.innerText = '';
  }
  document.querySelector('.btn-dont-know')?.classList.remove('hidden');
  document.querySelector('.btn-next')?.classList.add('hidden');
  (<HTMLElement>document.querySelector('.speaker-ico')).classList.add('hidden');
  enableDecisionButtons();
}

export const randomTranslates = (word: GameWordData) => {
  let result = Math.floor(Math.random() * countWords);
  let translates = word.translates;
  translates.splice(result, 0, word.wordTranslate);
  return { result, translates };
};

