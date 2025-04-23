document.addEventListener("DOMContentLoaded", function () {
    const banner = document.getElementById("slider1");
    const button = document.getElementById("open-modal-floating");

    if (!banner || !button) {
        console.error("Не найдены необходимые элементы!");
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    button.classList.remove("hidden");
                } else {
                    button.classList.add("hidden");
                }
            });
        },
        { threshold: 0 }
    );

    observer.observe(banner);
});
