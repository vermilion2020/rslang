// interface ITemplateGame {
//     nextOr?: string, correctWord?: string, selectedWord?: string
// }
import voiceIcon from '../../../assets/images/png/up_volume.png';
const audioTemplateGame = (
  nextOr?: string,
  correctWord?: string,
  selectedWord?: string,
  counterUp: number = 2,
  counterSet = 10
): HTMLTemplateElement => {
  const gameBody = document.createElement('template');
  gameBody.innerHTML = `
<div class="main-page__game">
<div class="wrapper">
<section class="header-game">
<div class="out">
  <div class="container">
    <div class="progress-circular">
    <div class="inside-progress">
    <span class="value-correct">${counterUp}</span> / <span class="value-total">${counterSet}</span>    
    </div>
    </div>
     </div>
</div>
     <div class="close-audio__game">
      <a href="/" class="close-audio__gamepage"><div class="close-crose__white"></div></a>
     </div>
    </section>
    <section class="content">
        <div class="game-wrapper">
        <div class="visualisation">
        <div class="voice-ico__block">
        <div class="voice-ico"></div>
        <div class="image-word"></div>
        </div>
        <div class="repeat-word">
        <div class="speaker-ico"><img class='img-voice' src="${voiceIcon}" alt="img voice"></div>
        <p class="select-offer">${correctWord}</p>
        </div>
        </div>
          <div class="select-container__game">
            <button class="select-word" data-word="1" value>${selectedWord}</button>
            <button class="select-word" data-word="2" value>${selectedWord}</button>
            <button class="select-word" data-word="3" value>${selectedWord}</button>
            <button class="select-word" data-word="3" value>${selectedWord}</button>
            <button class="select-word" data-word="4" value>${selectedWord}</button>
            
            </div>
          <div class="block-btn__next">
          <button class="btn-next">${nextOr}</button>
          </div>
        </div>
      </section>
</div>
</div>
`;
  return gameBody;
};

export default audioTemplateGame;
