const mainTemplate: HTMLTemplateElement = document.createElement('template');
// const mainCoverTemplate: HTMLTemplateElement = document.createElement('template');

mainTemplate.innerHTML = `
  <section class="section-cover">
    <div class="cover-text">
      <p class="cover-rs">RS Lang</p>
      <p class="title">Изучай английский с помощью игр
      </p>
      <p class="desc">С RS Lang ты сможешь изучать английский легко, используя только самые простые и эффективные инструменты, занимаясь не больше часа в день."</p>
      <svg class="icon-star4">
        <use xlink:href="./icons/sprite-mainpage.svg#star4"></use>
      </svg>
      <svg class="icon-star6">
        <use xlink:href="./icons/sprite-mainpage.svg#star6"></use>
      </svg>
   </div>
    <div class="cover-img">
      <div class="img-block">
      <img src="images/mock.jpg" alt="title-img" />
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
        <p class="block-title">3,6k</p>
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
      <div class="main-block-sec-2">
        <div class="block-sec-2">
          <p class="title">Учебник</p>
          <p class="desc">Учебник содержит 6 разделов, в каждом разделе по 600 слов. С каждым следующим разделом ты изучаешь все более сложные слова. Раздел имеет несколько страниц и на каждой по 20 слов.<br>
          Начинай постепенно! Просматривая страницы ты можешь перейти в словарь и узнать более подробную информацию.<br>
          Учебник имеет 7-ой раздел, он доступен только для зарегистрированных пользователей. В этот раздел ты можешь заносить наиболее трудные слова.</p>
          <a href="https://rs.school/js/" target="_blank" class="link-arrow">
            <div class="arrow">
              <svg class="icon-arrow">
                <use xlink:href="./icons/sprite-mainpage.svg#arrow"></use>
              </svg>
            </div>
        </a>
        </div>
        <div class="block-sec-2">
          <p class="title">Словарь</p>
          <p class="desc">Словарь это продолжение учебника. В словаре ты можешь узнать применение слов в контексте, прослушать как оно звучит на английском языке. А также отметить слово как сложное или изуенное.</p>
          <a href="https://rs.school/js/" target="_blank" class="link-arrow">
            <div class="arrow">
              <svg class="icon-arrow">
                <use xlink:href="./icons/sprite-mainpage.svg#arrow"></use>
              </svg>
            </div>
           </a>
         </div>
         <div class="block-sec-2">
          <p class="title">Спринт</p>
          <p class="desc">Учись реагировать быстро, моментально понимая английскую речь. В этом тебе поможет наша игра.<br>И еще  результаты своих побед и ошибок ты сможешь увидеть в учебнике.</p>
          <a href="https://rs.school/js/" target="_blank" class="link-arrow">
            <div class="arrow">
              <svg class="icon-arrow">
                <use xlink:href="./icons/sprite-mainpage.svg#arrow"></use>
              </svg>
            </div>
            </a>
         </div>
         <div class="block-sec-2">
            <p class="title">Аудиовызов</p>
            <p class="desc">Название говорит само за себя. Мы говорим -- ты угадываешь.<br>Как и в игре Сплит результаты своих побед и ошибок ты сможешь увидеть в учебнике. Удачи!</p>
            <a href="https://rs.school/js/" target="_blank" class="link-arrow">
              <div class="arrow">
                <svg class="icon-arrow">
                  <use xlink:href="./icons/sprite-mainpage.svg#arrow"></use>
                </svg>
              </div>
            </a>
          </div>
         

      </div>
    </div>

  </section>
  
  
  
  `;

export default mainTemplate;
