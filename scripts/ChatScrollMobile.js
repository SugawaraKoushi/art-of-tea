document.addEventListener("DOMContentLoaded", function () {
    const btn = document.querySelector(".scroll-down-button");
    const messagesContainer = document.querySelector(
        ".message-items-container"
    );
    let currentCardIndex = 0;
    const scrollTime = 200;

    // Получаем актуальный список карточек
    function getMessages() {
        return document.querySelectorAll(".message-product-card");
    }

    function checkScroll() {
        const container = messagesContainer;
        const hasContent = container.scrollHeight > container.clientHeight;
        const isAtBottom =
            container.scrollHeight - container.clientHeight <=
            container.scrollTop + 5;
        btn.classList.toggle("visible", hasContent && !isAtBottom);
    }

    function initialize() {
        checkScroll();

        // Дополнительная проверка после небольшой задержки
        setTimeout(checkScroll, 300);
    }

    btn.addEventListener("click", function () {
        const messages = getMessages();

        // Если нет карточек - скроллим вниз
        if (messages.length === 0) {
            smoothScrollTo(
                messagesContainer,
                messagesContainer.scrollHeight,
                scrollTime
            );
            return;
        }

        // Если дошли до конца
        if (currentCardIndex >= messages.length) {
            smoothScrollTo(
                messagesContainer,
                messagesContainer.scrollHeight,
                scrollTime
            );
            return;
        }

        // Скроллим к текущей карточке
        const card = messages[currentCardIndex];
        const cardPosition = Math.min(
            card.offsetTop - messagesContainer.offsetTop,
            messagesContainer.scrollHeight - messagesContainer.clientHeight
        );

        smoothScrollTo(messagesContainer, cardPosition, scrollTime);
        currentCardIndex++;
    });

    const observer = new MutationObserver(function (mutations) {
        // При изменениях просто проверяем скролл
        setTimeout(checkScroll, 100);
    });

    observer.observe(messagesContainer, {
        childList: true,
        subtree: true,
    });

    function smoothScrollTo(element, to, duration) {
        const start = element.scrollTop;
        const change = to - start;
        const startTime = performance.now();

        if (duration <= 0) {
            element.scrollTop = to;
            checkScroll();
            return;
        }

        function animateScroll(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            element.scrollTop = start + change * progress;

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            } else {
                checkScroll();
            }
        }

        requestAnimationFrame(animateScroll);
    }

    initialize();

    messagesContainer.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
});
