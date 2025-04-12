document.addEventListener("DOMContentLoaded", function () {
    initBannerSlider();
});

function initBannerSlider() {
    const slider = document.getElementById("slider");
    const points = document.querySelectorAll(".pagination-point");

    function scrollToIndex(index) {
        if (index >= 0 && index < points.length) {
            slider.scrollTo({
                left: index * slider.clientWidth,
                behavior: "smooth",
            });
        }
    }

    function updatePoints() {
        const scrollPos = slider.scrollLeft;
        const slideWidth = slider.clientWidth;
        const activeIndex = Math.round(scrollPos / slideWidth);

        points.forEach((point, index) => {
            point.classList.toggle("active", index === activeIndex);
        });
    }

    slider.addEventListener("scroll", updatePoints);

    points.forEach((point) => {
        point.addEventListener("click", function () {
            const index = parseInt(this.getAttribute("data-index"));
            if (!isNaN(index)) {
                // Проверка что индекс - число
                scrollToIndex(index);
            }
        });
    });

    updatePoints();
}
