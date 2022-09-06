import voiceIcon from '../../../../assets/images/png/up_volume.png';
import { countAttempts } from '../../../model/constants';
import { GameWordData } from '../../../model/types/words';

export const drawTranslates = (translates: string[]) => {
  let translatesButtons = '';
  for (let i = 0; i < translates.length; i += 1) {
    translatesButtons += `<button class="select-word button" data-word="${i + 1}" value>${i + 1} - ${
      translates[i]
    }</button>`;
  }
  return translatesButtons;
};

const audioTemplateGame = (word: GameWordData, result: number, translates: string[]): HTMLTemplateElement => {
  const gameBody = document.createElement('template');
  const unitClass = ` unit-${word.group + 1}-container`;
  gameBody.innerHTML = `
<div class="main-page-audio${unitClass}">
  <div class="progress">
    <div class="out">
      <div class="container">
        <div class="progress-circular">
          <div class="inside-progress">
            <span class="current-step">1</span> / <span class="value-total">${countAttempts}</span>    
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="wrapper">
    <section class="content">
        <div class="game-wrapper" data-result="${result + 1}">
          <div class="visualisation">
            <div class="voice-ico__block" data-id="${word.id}">
              <img src="" alt="${word.word}" id="word-picture" class="hidden word-picture">
            </div>
            <div class="repeat-word">
            <div class="speaker-ico hidden"><img class='img-voice' src="${voiceIcon}" alt="img voice"></div>
            <p class="select-offer"></p>
          </div>
        </div>
        <div class="select-container__game">
          ${drawTranslates(translates)}
        </div>
        <div class="block-btn__next">
          <button class="btn-dont-know">Пропустить</button>
          <button class="btn-next hidden button">Следующее слово</button>
        </div>
      </div>
    </section>
  </div>
  <div class="close-audio__game" id="close-audio">
      <a href="/" class="close-audio__gamepage"><div class="close-crose__white"></div></a>
  </div>
</div>
`;
  return gameBody;
};

export default audioTemplateGame;
