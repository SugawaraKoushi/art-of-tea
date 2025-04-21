document.addEventListener("DOMContentLoaded", function () {
    // Инициализируем все баннеры на странице
    document.querySelectorAll(".slider").forEach((slider) => {
        initBannerSlider(slider.id);
    });
});

function initBannerSlider(sliderId) {
    const slider = document.getElementById(sliderId);
    const points = document.querySelectorAll(
        `.pagination-point[data-slider="${sliderId}"]`
    );

    if (!slider || points.length === 0) return;

    const sliderClass = new BannerSlider(slider, points);
    sliderClass.init();
}

class BannerSlider {
    constructor(slider, points) {
        this.slider = slider;
        this.points = points;
        this.interval = null;
    }

    init() {
        this.slider.addEventListener("scroll", () => this.updatePoints());

        this.points.forEach((point) => {
            point.addEventListener("click", () => {
                const index = parseInt(point.getAttribute("data-index"));
                this.scrollToIndex(index);
            });
        });

        this.updatePoints();
    }

    scrollToIndex(index) {
        if (index >= 0 && index < this.points.length) {
            this.slider.scrollTo({
                left: index * this.slider.clientWidth,
                behavior: "smooth",
            });
        }
    }

    updatePoints() {
        const scrollPos = this.slider.scrollLeft;
        const slideWidth = this.slider.clientWidth;
        const activeIndex = Math.round(scrollPos / slideWidth);

        this.points.forEach((point, index) => {
            point.classList.toggle("active", index === activeIndex);
        });
    }
}
