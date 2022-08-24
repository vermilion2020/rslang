const mainTemplate: HTMLTemplateElement = document.createElement('template');
// const mainCoverTemplate: HTMLTemplateElement = document.createElement('template');

mainTemplate.innerHTML = `
  <section class="section-cover">
    <div class="cover-text">
      <p class="cover-rs">RS Lang</p>
      <p class="title">Изучай английский<br>с помощью игр
      </p>
      <p class="desc">С RS Lang ты сможешь изучать английский легко, используя только самые простые и эффективные инструменты, занимаясь не больше часа в день.</p>
      <svg class="icon-star4">
        <use xlink:href="./icons/sprite-mainpage.svg#star4"></use>
      </svg>
      <svg class="icon-star6">
        <use xlink:href="./icons/sprite-mainpage.svg#star6"></use>
      </svg>
   </div>
    <div class="cover-img">
      <div class="img-block">
        <img class="img-mock" src="images/mock.png" alt="title-img" />
      <svg class="icon-star8">
        <use xlink:href="./icons/sprite-mainpage.svg#star8"></use>
      </svg>
        <img class="icon-set" src="icons/set-x.svg" alt="title-img" />
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
          <a href="https://rs.school/js/" target="_blank" class="link-arrow">
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
          <p>А также отметить слово как сложное или изуенное.</p>
          </div>
          <a href="https://rs.school/js/" target="_blank" class="link-arrow">
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
            <p>Учись реагировать быстро, моментально понимая английскую речь. В этом тебе поможет наша игра.</p>
            <p>И еще  результаты своих побед и ошибок ты сможешь увидеть в учебнике.</p>
          </div>

          <a href="https://rs.school/js/" target="_blank" class="link-arrow">
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
              <p>Название говорит само за себя. Мы говорим - ты угадываешь. Как и в игре Спринт результаты своих побед и ошибок ты сможешь увидеть в учебнике.</p>
              <p>Удачи!</p>
            </div>
            <a href="https://rs.school/js/" target="_blank" class="link-arrow">
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

   <section class="sec-4">
    <div class="wrapper-sec-4">
      <p class="sec-4-title">О команде</>
      <hr>
      <div class="main-block-sec-4">
        <p class="number">1</p>
        <div class="desc-sec-4">
          <p class="name">Мила</p>
          <p class="position">Team-leader, frontend developer</p>
          <p class="position-desc">Разработка Игры Аудиовызов, регистрации и создание сервера для приложения.</p>
          <div class="git-block">
            <a href="https://github.com/vermilion2020" target="_blank" class="git-link">Github: vermilion2020</a>
          </div>
          <img class="photo" src="images/photo-mila.png" alt="mila"/>
        </div>
        <div></div>
        <div class="line-team">      <hr></div>
        <p class="number">2</p>
        <div class="desc-sec-4">
          <p class="name">Роман</p>
          <p class="position">Frontend developer</p>
          <p class="position-desc">Разработка Игры Аудиовызов, регистрации и создание сервера для приложения.</p>
          <div class="git-block">
            <a href="https://github.com/googray" target="_blank" class="git-link">Github: googray</a>
          </div>
          <img class="photo" src="images/photo-mila.png" alt="roman"/>
        </div>
        <div></div>
        <div class="line-team">      <hr></div>
        <p class="number">3</p>
        <div class="desc-sec-4">
          <p class="name">Галина</p>
          <p class="position">Frontend developer</p>
          <p class="position-desc">Разработка Игры Аудиовызов, регистрации и создание сервера для приложения.</p>
          <div class="git-block">
            <a href="https://github.com/halina-k" target="_blank" class="git-link">Github:  halina-k</a>
          </div>
          <img class="photo" src="images/photo-mila.png" alt="halina"/>
        </div>
      </div>
    </div>
   </section>
  
  
  
  `;

export default mainTemplate;
