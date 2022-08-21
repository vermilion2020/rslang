const audioTemplateGame = (nextOr?: string, correctWord?: string, selectedWord?: string): HTMLTemplateElement => {
  const gameBody = document.createElement('template');
  gameBody.innerHTML = `
<div class="main-page__game">
<div class="wrapper">
<section class="header-game">
<div class="indicator">Индикатор ответов</div>
     <div class="close-audio">
      <a href="/" class="close-audio__gamepage"><div class="close-crose__white"></div></a>
     </div>
    </section>
    <section class="content">
        <div class="game-wrapper">
        <div class="visualisation">
<div class="voice-ico"></div>

        <p class="select-offer">${correctWord}</p>
        </div>
          <div class="select-container">
            <button class="select-word" data-word="1">${selectedWord}</button>
            <button class="select-word" data-word="2">${selectedWord}</button>
            <button class="select-word" data-word="3">${selectedWord}</button>
            <button class="select-word" data-word="3">${selectedWord}</button>
            <button class="select-word" data-word="4">${selectedWord}</button>
            
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
