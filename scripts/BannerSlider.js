document.addEventListener("DOMContentLoaded", function () {
    // Инициализируем все баннеры на странице
    document.querySelectorAll(".slider").forEach((slider) => {
        initBannerSlider(slider.id);
    });
});

function initBannerSlider(sliderId) {
    const slider = document.getElementById(sliderId);
    const slides = document.querySelectorAll(
        `.slider[id="${sliderId}"] .slide`
    );
    const points = document.querySelectorAll(
        `.pagination-point[data-slider="${sliderId}"]`
    );

    if (!slider || points.length === 0) return;

    const sliderClass = new BannerSlider(slider, slides, points);
    sliderClass.init();
}

class BannerSlider {
    constructor(slider, slides, points) {
        this.slider = slider;
        this.slides = slides;
        this.points = points;
        this.interval = null;
    }

    init() {
        this.slider.addEventListener("scroll", () => this.updatePoints());

        this.points.forEach((point) => {
            point.addEventListener("click", () => {
                const index = parseInt(point.getAttribute("data-index"));
                this.scrollToIndex(index);
                this.updatePoints(index);
            });
        });

        this.updatePoints();
    }

    scrollToIndex(index) {
        if (index >= 0 && index < this.points.length) {
            this.slider.scrollTo({
                left: this.slides[index].offsetLeft,
                behavior: "smooth",
            });
        }
    }

    updatePoints() {
        const scrollPos = this.slider.scrollLeft;
        let activeIndex = 0;

        // Если скролл в самом конце — активируем последний слайд
        if (scrollPos >= this.slides[this.slides.length - 1].offsetLeft) {
            activeIndex = this.slides.length - 1;
        }
        // Иначе ищем активный слайд
        else {
            this.slides.forEach((slide, index) => {
                const slideStart = slide.offsetLeft;
                const slideEnd = slideStart + slide.clientWidth;

                if (scrollPos >= slideStart && scrollPos < slideEnd) {
                    activeIndex = index;
                }
            });
        }

        this.points.forEach((point, index) => {
            point.classList.toggle("active", index === activeIndex);
        });
    }
}
