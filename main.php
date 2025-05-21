<main>
    <div class="layout">
        <div class="slider-container">
            <div class="slider" id="slider1">
                <div class="slide" onclick="showModal()">
                    <img class="slide-background" src="images/slide 1 bg.png" alt="ng" />
                    <h1 class="title">ПЕРСОНАЛЬНЫЙ АСИСТЕНТ</h1>
                    <button class="button-base-secondary very-large" id="open-modal">
                        <img src="icons/fill/20/stars.svg" alt="" />
                        Ввести запрос
                    </button>
                    <img class="avatar" src="images/avatar.png" alt="avatar" />
                    <div class="message">
                        Добрый день!</br>
                        Я Ваш личный ассистент</br>
                        Чем я могу помочь?
                    </div>
                </div>
                <div class="slide">
                    <img class="slide-background" src="images/slide 2 bg.png" alt="">
                </div>
            </div>
            <div class="pagination-slider" id="pagination-slider">
                <div class="pagination-point active" data-index="0" data-slider="slider1"></div>
                <div class="pagination-point" data-index="1" data-slider="slider1"></div>
                <div class="pagination-point" data-index="2" data-slider="slider1"></div>
                <div class="pagination-point" data-index="3" data-slider="slider1"></div>
            </div>
        </div>
    </div>
    <button class="button-floating hidden" id="open-modal-floating" onclick="showModal()">
        <img src="images/avatar 2.png" alt="">
    </button>
    <?php require 'modal.php'; ?>
</main>