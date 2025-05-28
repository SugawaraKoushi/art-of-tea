var products = 0;

document.addEventListener("DOMContentLoaded", function () {
    initButtons();

    document.addEventListener("click", function (e) {
        if (e.target.closest(".add-button-variant-1")) {
            const button1 = e.target.closest(".add-button-variant-1");
            const index = Array.from(
                document.querySelectorAll(".add-button-variant-1")
            ).indexOf(button1);
            const button2 = document.querySelectorAll(".add-button-variant-2")[
                index
            ];

            button1.style.display = "none";
            button2.style.display = "flex";

            const counterValue = button2.querySelector(".count");
            counterValue.textContent = "1";
            products++;
        }

        // Обработка клика на минус
        if (e.target.closest(".minus")) {
            const minusBtn = e.target.closest(".minus");
            const button2 = minusBtn.closest(".add-button-variant-2");
            const index = Array.from(
                document.querySelectorAll(".add-button-variant-2")
            ).indexOf(button2);
            const button1 = document.querySelectorAll(".add-button-variant-1")[
                index
            ];

            const counterValue = button2.querySelector(".count");
            let count = parseInt(counterValue.textContent);
            count = Math.max(0, count - 1);

            if (count === 0) {
                button1.style.display = "block";
                button2.style.display = "none";
            }

            counterValue.textContent = count;
            products--;
        }

        // Обработка клика на плюс
        if (e.target.closest(".plus")) {
            const plusBtn = e.target.closest(".plus");
            const button2 = plusBtn.closest(".add-button-variant-2");
            const counterValue = button2.querySelector(".count");
            let count = parseInt(counterValue.textContent);
            count++;
            counterValue.textContent = count;
            products++;
        }

        const bucketCount = document.querySelectorAll(".bucket-indicator");

        if (products <= 0) {
            products = 0;
            bucketCount.forEach((count) => {
                count.style.display = "none";
            });
        } else {
            bucketCount.forEach((count) => {
                count.style.display = "block";
            });
        }
    });
});

function initButtons() {
    const buttons2 = document.querySelectorAll(".add-button-variant-2");
    buttons2.forEach((button) => {
        const counterValue = button.querySelector(".count");
        counterValue.textContent = "1";
    });
}
