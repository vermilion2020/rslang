const mainTemplate: HTMLTemplateElement = document.createElement('template');

mainTemplate.innerHTML = `
  <section class="section-cover">
    <div class="cover-text">
      <p class="cover-rs">RS Lang</p>
      <p class="title">Изучай английский<br>с помощью игр
      </p>
      <p class="desc">С RS Lang ты сможешь изучать английский легко, используя только самые простые и эффективные инструменты, занимаясь не больше часа в день.</p>
      <div class="main-star-icons">
        <svg class="icon-star4">
          <use xlink:href="./icons/sprite-mainpage.svg#star4"></use>
        </svg>
        <svg class="icon-star6">
          <use xlink:href="./icons/sprite-mainpage.svg#star6"></use>
        </svg>
      </div>
   </div>
    <div class="cover-img">
      <div class="img-block">
        <img class="icon-mane-gr" src="icons/mane-gr.svg" alt="title-img" />
        <img class="icon-mane-adapt" src="icons/mane-adapt.svg" alt="title-img" />
        <img class="icon-mane-mobile" src="icons/mane-mobile.svg" alt="title-img" />
      </div>
    </div>
  </section>

  <section class="sec-1">
    <div class="wrapper-sec">
      <div class="sec-block">
        <p class="block-title">3,6k</p>
        <p class="block-desc">слов<br>в приложении</p>
       </div>
      <div class="sec-block">
        <p class="block-title">2</p>
        <p class="block-desc">крутейшие<br>игры</p>
      </div>
     <div class="sec-block">
        <p class="block-title">%</p>
        <p class="block-desc">отслеживание<br>прогресса</p>
     </div>
     <div class="sec-block">
        <svg class="icon-bookmark">
           <use xlink:href="./icons/sprite-mainpage.svg#bookmark"></use>
        </svg>
        <p class="block-desc">персональные<br>метки к словам</p>
    </div>
    </div>
  </section>

  <section class="sec-2">
    <div class="wrapper-sec-2">
      <p class="sec-2-title">Возможности приложения</>
      <hr>
      <div class="main-block-sec-2">
          <p class="title">Учебник</p>
          <div class="desc-sec-2">
            <p>Учебник содержит 6 разделов, в каждом разделе по 600 слов. С каждым следующим разделом ты изучаешь все более сложные слова. Раздел имеет несколько страниц и на каждой по 20 слов.</p>
            <p>Начинай постепенно! Просматривая страницы ты можешь перейти в словарь и узнать более подробную информацию.</p>
            <p>Учебник имеет 7-ой раздел, он доступен только для зарегистрированных пользователей. В этот раздел ты можешь заносить наиболее трудные слова.</p>
          </div>
          <a href="/#/textbook" class="link-arrow" id="link-textbook" data-id="textbook">
            <div class="arrow">
              <svg class="icon-arrow">
                <use xlink:href="./icons/sprite-mainpage.svg#arrow"></use>
              </svg>
            </div>
          </a>
          <div></div>
          <div class="line">      <hr></div>
          <p class="title">Словарь</p>
          <div class="desc-sec-2">
          <p>Словарь это продолжение учебника. В словаре ты можешь узнать применение слов в контексте, прослушать как оно звучит на английском языке.</p>
          <p>А также отметить слово как сложное или изученное.</p>
          </div>
          <a href="/#/dictionary" class="link-arrow" id="link-dictionary" data-id="dictionary">
            <div class="arrow">
              <svg class="icon-arrow">
                <use xlink:href="./icons/sprite-mainpage.svg#arrow"></use>
              </svg>
            </div>
           </a>
           <div></div>
           <div class="line">      <hr></div>
          <p class="title">Спринт</p>
          <div class="desc-sec-2">
          <p>Проверь и закрепи выученные слова. В игре тебе нужно угадать правильный перевод из предложенных вариантов</p>
          <p>И еще результаты своих побед и ошибок ты сможешь увидеть в учебнике и статистике.</p>
          </div>

          <a href="/#/sprint" class="link-arrow" id="link-sprint" data-id="sprint">
            <div class="arrow">
              <svg class="icon-arrow">
                <use xlink:href="./icons/sprite-mainpage.svg#arrow"></use>
              </svg>
            </div>
            </a>
            <div></div>
            <div class="line">      <hr></div>
            <p class="title">Аудиовызов</p>
            <div class="desc-sec-2">
            <p>Учись реагировать быстро, моментально понимая английскую речь. Мы говорим - ты угадываешь.</p>
            <p>Как и в игре Спринт, результаты своих побед и ошибок ты сможешь увидеть в учебнике и статистике.</p>
            <p>Удачи!</p>
            </div>
            <a href="/#/audio" class="link-arrow" id="link-audio" data-id="audio">
              <div class="arrow">
                <svg class="icon-arrow">
                  <use xlink:href="./icons/sprite-mainpage.svg#arrow"></use>
                </svg>
              </div>
            </a>
            <div></div>
            <div class="line">      <hr></div>
      </div>
    </div>
   </section>


   <section class="sec-decor">
    <div class="wrapper-sec-decor">
      <div class="decor-1">
        <img class="icon-dec" src="icons/decor-1.svg" alt="decor"/>
      </div>
      <div class="decor-2">
        <img class="icon-dec" src="icons/decor-2.svg" alt="decor"/>
      </div>
      <div class="decor-3">
        <img class="icon-dec" src="icons/decor-3.svg" alt="decor"/>
      </div>
    </div>
   </section>



   <section class="sec-4">
    <div class="wrapper-sec-4">
      <p class="sec-4-title">О команде</>
      <hr>
      <div class="main-block-sec-4">
      <img class="photo" src="images/mila-photo.png" alt="mila"/>
        <div class="desc-sec-4">
          <p class="name">Мила</p>
          <p class="position">Team-leader, frontend developer</p>
          <p class="position-desc">Разработка игры Спринт, авторизации, статистики, доработка бэкенда.</p>
          <div class="git-block">
            <a href="https://github.com/vermilion2020" target="_blank" class="git-link">Github: vermilion2020</a>
          </div>

        </div>
        <div></div>
        <div class="line-team">      <hr></div>
        <img class="photo" src="images/roman-photo.png" alt="roman"/>
        <div class="desc-sec-4">
          <p class="name">Роман</p>
          <p class="position">Frontend developer</p>
          <p class="position-desc">Разработка игры Аудиовызов.</p>
          <div class="git-block">
            <a href="https://github.com/googray" target="_blank" class="git-link">Github: googray</a>
          </div>
          
        </div>
        <div></div>
        <div class="line-team">      <hr></div>
        <img class="photo" src="images/halina-photo.png" alt="halina"/>
        <div class="desc-sec-4">
          <p class="name">Галина</p>
          <p class="position">Frontend developer</p>
          <p class="position-desc">Разработка главной страницы, словаря и учебника.</p>
          <div class="git-block">
            <a href="https://github.com/halina-k" target="_blank" class="git-link">Github:  halina-k</a>
          </div>
        </div>
      </div>
    </div>
   </section>
  
  
  
  `;

export default mainTemplate;
