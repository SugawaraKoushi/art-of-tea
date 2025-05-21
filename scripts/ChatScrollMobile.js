document.addEventListener("DOMContentLoaded", function() {
    const btn = document.querySelector(".scroll-down-button");
    const messagesContainer = document.querySelector(".message-items-container");
    let messages = document.querySelectorAll(".message-product-card");
    let currentCardIndex = 0;
    const scrollTime = 200;

    function checkScroll() {
        const container = messagesContainer;
        const hasContent = container.scrollHeight > container.clientHeight;
        const isAtBottom = container.scrollHeight - container.clientHeight <= container.scrollTop + 5;        
        btn.classList.toggle("visible", hasContent && !isAtBottom);
    }

    function initialize() {
        void messagesContainer.offsetHeight;
        
        let attempts = 0;
        const maxAttempts = 5;
        
        const checkInterval = setInterval(() => {
            checkScroll();
            attempts++;
            
            if (attempts >= maxAttempts || messagesContainer.scrollHeight > 0) {
                clearInterval(checkInterval);
            }
        }, 100);
    }

    btn.addEventListener("click", function() {      
        // Если последняя карточка, то скроллим в самый низ
        if (messages.length === 0) {
            smoothScrollTo(messagesContainer, messagesContainer.scrollHeight, scrollTime);
            return;
        }
        
        // Есле не последняя карточка, то скроллим к следующей
        if (currentCardIndex >= messages.length) {
            smoothScrollTo(messagesContainer, messagesContainer.scrollHeight, scrollTime);
            currentCardIndex = 0;
            return;
        }
        
        const card = messages[currentCardIndex];
        const cardPosition = Math.min(
            card.offsetTop - messagesContainer.offsetTop,
            messagesContainer.scrollHeight - messagesContainer.clientHeight
        );
        
        smoothScrollTo(messagesContainer, cardPosition, scrollTime);
        currentCardIndex++;
    });

    const observer = new MutationObserver(function(mutations) {
        messages = document.querySelectorAll(".message-product-card");
        currentCardIndex = 0;
        
        setTimeout(checkScroll, 50);
    });
    
    observer.observe(messagesContainer, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true
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
                setTimeout(checkScroll, 50); // Проверка после завершения
            }
        }

        requestAnimationFrame(animateScroll);
    }

    initialize();

    messagesContainer.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
});