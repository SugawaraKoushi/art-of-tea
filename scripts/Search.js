document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("search-form");
    const submitButton = document.getElementById("send-prompt-btn");

    form.addEventListener("submit", handleSearchSubmit);
});

function handleSearchSubmit(event) {
    event.preventDefault(); // Отменяем стандартную отправку формы

    // Получаем значение поля ввода
    const searchInput = document.getElementById("prompt");
    const query = searchInput.value.trim();

    // Отправляем запрос на сервер
    fetch("../controllers/SearchController.php?action=search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Ошибка сети");
            }
            return response.json();
        })
        .then((data) => {
            if (data.success) {
                // Успешный ответ - обрабатываем результаты
                displayResults(data.data);
            } else {
                // Сервер вернул ошибку
                showError(data.error || "Произошла ошибка при поиске");
            }
        })
        .catch((error) => {
            // Ошибка сети или парсинга JSON
            showError(error.message);
        })
        .finally(() => {
            // Восстанавливаем кнопку
            submitButton.disabled = false;
            submitButton.textContent = "Найти";
        });

    return false; // Предотвращаем отправку формы
}

function displayResults(results) {
    const resultsContainer = document.getElementById("search-results");
    resultsContainer.innerHTML = ""; // Очищаем предыдущие результаты

    if (results.length === 0) {
        resultsContainer.innerHTML = "<p>Ничего не найдено</p>";
        return;
    }

    const list = document.createElement("ul");
    results.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
    });

    resultsContainer.appendChild(list);
}

function showError(message) {
    const errorContainer = document.getElementById("error-message");
    errorContainer.textContent = message;
    errorContainer.style.display = "block";

    // Скрываем ошибку через 5 секунд
    setTimeout(() => {
        errorContainer.style.display = "none";
    }, 5000);
}
