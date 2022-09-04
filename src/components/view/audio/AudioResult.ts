import audioTemplateResult from './templates/AudioTemplateResult';
import { CheckedWord } from '../../../components/model/types/';
import { playWordAudio } from '../../controller/helpers/audio-helper';
import { countAttempts } from '../../model/constants';

export const renderAudioResultPop = (successWords: CheckedWord[], failedWords: CheckedWord[], successTotal: number) => {
  const container = document.querySelector('#popup-audio') as HTMLElement;
  const overlay = document.querySelector('#overlay') as HTMLElement;
  container.innerHTML = '';
  container.classList.remove('hidden');
  overlay.classList.remove('hidden');
  const resultPopNode = <HTMLElement>(
    audioTemplateResult(successWords, failedWords, successTotal).content.cloneNode(true)
  );
  container.appendChild(resultPopNode);

  
  const progressCircular = <HTMLElement>document.querySelector('.progress-backgrd');
  const percent = Math.round((successTotal / countAttempts) * 100) * 3.6;

  progressCircular.style.background = `conic-gradient(#65D72F ${percent}deg, #FF0000 0deg)`;


  container.querySelector('.result-repeat')?.addEventListener('click', (e) => {
    e.preventDefault();
    container.classList.add('hidden');
    overlay.classList.add('hidden');
  });

  container.addEventListener('click', (e: Event) => {
    const totalTab = <HTMLElement>document.querySelector('.result-info-words');
    const wordsTab = <HTMLElement>document.querySelector('.result-info-value');
    const target = e.target as HTMLHeadingElement;
    if (target.id === 'result-words') {
      wordsTab.classList.add('hidden');
      totalTab.classList.remove('hidden');
      document.querySelector('.button_light')?.classList.remove('button_light');
      target.classList.add('button_light');
    } else if (target.id === 'result-value') {
      wordsTab.classList.remove('hidden');
      totalTab.classList.add('hidden');
      document.querySelector('.button_light')?.classList.remove('button_light');
      target.classList.add('button_light');
    } else if (target.classList.contains('img-voice__res')) {
      const wordId = <string>target.dataset.id;
      const audioPath = [...successWords, ...failedWords].find((w) => w.wordId === wordId)?.audio;
      playWordAudio(audioPath);
    } else if (target.classList.contains('close-crose__white')) {
      document.querySelector('#popup-audio')?.classList.add('hidden');
      document.querySelector('#overlay')?.classList.add('hidden');
    }
  });
};

/*export const renderAudioWordsPop = (successWords: CheckedWord[], failedWords: CheckedWord[]) => {
  const container = document.querySelector('#popup-audio') as HTMLElement;
  const overlay = document.querySelector('#overlay') as HTMLElement;
  const formWords = container.querySelector('#page-words') as HTMLFormElement;
  container.innerHTML = '';
  container.classList.remove('hidden');
  overlay.classList.remove('hidden');
    const wordsPopNode = <HTMLElement>audioTemplateWords(successWords, failedWords).content.cloneNode(true);
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
    if (target.id === 'result-value') renderAudioResultPop(successWords, failedWords);
  });
};
*/
