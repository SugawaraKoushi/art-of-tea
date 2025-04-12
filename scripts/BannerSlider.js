document.addEventListener("DOMContentLoaded", function () {
    initBannerSlider();
});

function initBannerSlider() {
    const slider = document.getElementById("slider");
    const points = document.querySelectorAll(".pagination-point"); // Добавлена точка перед классом

    // Проверка существования элементов
    if (!slider) {
        console.error("Элемент слайдера (slider) не найден");
        return;
    }

    if (points.length === 0) {
        console.error("Точки пагинации (pagination-point) не найдены");
        return;
    }

    function scrollToIndex(index) {
        if (index >= 0 && index < points.length) {
            // Проверка валидности индекса
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

    // Инициализация
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

    // Обновляем точки при первой загрузке
    updatePoints();
}
