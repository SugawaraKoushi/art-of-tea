document.addEventListener("DOMContentLoaded", function () {
    const buttons1 = document.querySelectorAll(".add-button-variant-1");
    const buttons2 = document.querySelectorAll(".add-button-variant-2");

    for (let i = 0; i < buttons2.length; i++) {
        const counterValue = buttons2[i].querySelector(".count");
        counterValue.textContent = "1";
    }

    for (let i = 0; i < buttons1.length; i++) {
        buttons1[i].addEventListener("click", function () {
            buttons1[i].style.display = "none";
            buttons2[i].style.display = "flex";

            const counterValue = buttons2[i].querySelector(".count");
            counterValue.textContent = "1";
        });
    }

    for (let i = 0; i < buttons2.length; i++) {
        const minusBtn = buttons2[i].querySelector(".minus");
        const plusBtn = buttons2[i].querySelector(".plus");
        const counterValue = buttons2[i].querySelector(".count");

        let count = parseInt(counterValue.textContent);

        minusBtn.addEventListener("click", function (e) {
            count = Math.max(0, count - 1);

            if (count === 0) {
                buttons1[i].style.display = "block";
                buttons2[i].style.display = "none";
            }

            counterValue.textContent = count;
        });

        plusBtn.addEventListener("click", function (e) {
            count++;
            counterValue.textContent = count;
        });
    }
});
