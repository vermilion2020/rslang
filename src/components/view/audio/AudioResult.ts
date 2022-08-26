import { audioTemplateResult, audioTemplateWords } from './AudioTemplateResult';
import './AudioChallenge.scss';

import { getWords } from '../../../components/model/api/words';
import loadWords from '../../controller/helpers/word-helper';

export const renderAudioResultPop = () => {
  const container = document.querySelector('#popup-audio') as HTMLElement;
  const overlay = document.querySelector('#overlay') as HTMLElement;
  const formResu = container.querySelector('#page-result') as HTMLFormElement;
  container.innerHTML = '';
  container.classList.remove('hidden');
  overlay.classList.remove('hidden');
  const resultPopNode = <HTMLElement>audioTemplateResult.content.cloneNode(true);
  container.appendChild(resultPopNode);

  const repeatBtn = <HTMLElement>document.querySelector('.result-repeat');
  repeatBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('click', e.target);
    console.log('GETW: ', getWords);
    console.log('LWORds: ', loadWords);
  });

  container.querySelector('.result-exit')?.addEventListener('click', (e) => {
    e.preventDefault();
    container.classList.add('hidden');
    overlay.classList.add('hidden');
    formResu.reset();
  });

  container.addEventListener('click', (e: Event) => {
    e.preventDefault();
    const target = e.target as HTMLHeadingElement;
    if (target.id === 'result-words') renderAudioWordsPop();
  });
};

export const renderAudioWordsPop = () => {
  const container = document.querySelector('#popup-audio') as HTMLElement;
  const overlay = document.querySelector('#overlay') as HTMLElement;
  const formWords = container.querySelector('#page-words') as HTMLFormElement;
  container.innerHTML = '';
  container.classList.remove('hidden');
  overlay.classList.remove('hidden');
  const wordsPopNode = <HTMLElement>audioTemplateWords.content.cloneNode(true);
  container.appendChild(wordsPopNode);

  container.querySelector('.result-exit')?.addEventListener('click', (e) => {
    e.preventDefault();
    container.classList.add('hidden');
    overlay.classList.add('hidden');
    formWords.reset();
  });

  container.addEventListener('click', (e: Event) => {
    e.preventDefault();
    const target = e.target as HTMLHeadingElement;
    if (target.id === 'result-value') renderAudioResultPop();
  });
};
