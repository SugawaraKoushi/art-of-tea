document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("search-form");
    const submitButton = document.getElementById("send-prompt-btn");

    form.addEventListener("submit", handleSearchSubmit);
});

function handleSearchSubmit(event) {
    event.preventDefault();

    changeLayoutToChat();

    // Получаем значение поля ввода
    const searchInput = document.getElementById("prompt");
    const query = searchInput.value.trim();
    createQueryMessage(query);

    // Отправляем запрос на сервер
    fetch("/controllers/SearchController.php?action=search", {
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
            console.log(data);

            if (data.type === "text") {
                createArticle(data.content);
            } else {
                // создать чаи в цикле
                const teas = data.products;

                teas.forEach((tea) => {
                    createTeaCard(tea);
                });
            }
        })
        .catch((error) => {
            console.log(error);
        });

    return false;
}

function changeLayoutToChat() {
    const messageList = document.querySelector(".message-list");
    messageList.classList.add("show");

    const badgeStackMobile = document.querySelector(".badge-stack.mobile");
    badgeStackMobile.classList.remove("show");
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

function createQueryMessage(query) {
    const messages = document.querySelector(".message-items-container");

    const sendContainer = document.createElement("div");
    sendContainer.classList.add("message-item-container", "send");

    const messageItem = document.createElement("div");
    messageItem.classList.add("message-item");

    const queryNode = document.createTextNode(query);

    messageItem.appendChild(queryNode);
    sendContainer.appendChild(messageItem);
    messages.appendChild(sendContainer);
}

function createArticle(content) {
    const messages = document.querySelector(".message-items-container");

    const recieveContainer = document.createElement("div");
    recieveContainer.classList.add("message-item-container", "recieve");

    const messageItem = document.createElement("div");
    messageItem.classList.add("message-item");

    const textRegular = document.createElement("span");
    textRegular.classList.add("text-regular");

    const text = document.createTextNode(content);

    textRegular.appendChild(text);
    messageItem.appendChild(textRegular);
    recieveContainer.appendChild(messageItem);
    messages.appendChild(recieveContainer);
}

function createTeaCard(tea) {
    const messages = document.querySelector(".message-items-container");

    const recieveContainer = document.createElement("div");
    recieveContainer.classList.add("message-item-container", "recieve");

    const messageItem = document.createElement("div");
    messageItem.classList.add("message-item");

    const textRegular = document.createElement("span");
    const text = document.createTextNode("Вот что я могу Вам предложить:");
    textRegular.appendChild(text);

    const productCard = document.createElement("div");
    productCard.classList.add("message-product-card");

    //---------------------
    const topWrap = document.createElement("div");
    topWrap.classList.add("top-wrap");

    const textWrap = document.createElement("div");
    textWrap.classList.add("text-wrap");

    const productHeader = document.createElement("h6");
    const productHeaderContent = document.createTextNode(tea.name);
    productHeader.appendChild(productHeaderContent);

    const productDescription = document.createElement("span");
    productDescription.classList.add("text-regular", "secondary");
    const productDescriptionContent = document.createTextNode(tea.description);
    productDescription.appendChild(productDescriptionContent);

    textWrap.appendChild(productHeader);
    textWrap.appendChild(productDescription);

    //---------------------
    const previewWrap = document.createElement("div");
    previewWrap.classList.add("preview-wrap");

    const productImg = document.createElement("img");
    productImg.src = "./images/product.png";

    const toggleWrap = document.createElement("div");
    toggleWrap.classList.add("toggle-wrap");

    const input = document.createElement("input");
    input.type = "checkbox";
    input.classList.add("favourite-toggle");

    // label
    const label = document.createElement("label");
    label.classList.add("favourite-icon");

    // SVG пустого сердца
    const emptySvg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    );
    emptySvg.classList.add("toggle-icon-empty");
    emptySvg.setAttribute("width", "24");
    emptySvg.setAttribute("height", "24");
    emptySvg.setAttribute("viewBox", "0 0 24 24");
    emptySvg.setAttribute("fill", "none");

    const emptyPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
    );
    emptyPath.setAttribute(
        "d",
        "M12.8196 5.57998L11.9996 6.40198L11.1756 5.57798C10.1675 4.57003 8.80028 4.00382 7.37472 4.00391C5.94916 4.00401 4.58203 4.5704 3.57407 5.57848C2.56612 6.58657 1.99991 7.95378 2 9.37934C2.00009 10.8049 2.56648 12.172 3.57457 13.18L11.4696 21.075C11.6102 21.2154 11.8008 21.2943 11.9996 21.2943C12.1983 21.2943 12.3889 21.2154 12.5296 21.075L20.4316 13.178C21.4385 12.1698 22.0039 10.8031 22.0038 9.37828C22.0036 7.95341 21.4377 6.58689 20.4306 5.57898C19.9309 5.07903 19.3377 4.68242 18.6847 4.41182C18.0318 4.14123 17.3319 4.00195 16.6251 4.00195C15.9183 4.00195 15.2184 4.14123 14.5654 4.41182C13.9124 4.68242 13.3192 5.08003 12.8196 5.57998Z"
    );
    emptyPath.setAttribute("fill", "white");

    emptySvg.appendChild(emptyPath);

    // SVG заполненного сердца
    const filledSvg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    );
    filledSvg.classList.add("toggle-icon-filled");
    filledSvg.setAttribute("width", "24");
    filledSvg.setAttribute("height", "24");
    filledSvg.setAttribute("viewBox", "0 0 24 24");
    filledSvg.setAttribute("fill", "none");

    const filledPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
    );
    filledPath.setAttribute(
        "d",
        "M12.8196 5.57998L11.9996 6.40198L11.1756 5.57798C10.1675 4.57003 8.80028 4.00382 7.37472 4.00391C5.94916 4.00401 4.58203 4.5704 3.57407 5.57848C2.56612 6.58657 1.99991 7.95378 2 9.37934C2.00009 10.8049 2.56648 12.172 3.57457 13.18L11.4696 21.075C11.6102 21.2154 11.8008 21.2943 11.9996 21.2943C12.1983 21.2943 12.3889 21.2154 12.5296 21.075L20.4316 13.178C21.4385 12.1698 22.0039 10.8031 22.0038 9.37828C22.0036 7.95341 21.4377 6.58689 20.4306 5.57898C19.9309 5.07903 19.3377 4.68242 18.6847 4.41182C18.0318 4.14123 17.3319 4.00195 16.6251 4.00195C15.9183 4.00195 15.2184 4.14123 14.5654 4.41182C13.9124 4.68242 13.3192 5.08003 12.8196 5.57998Z"
    );
    filledPath.setAttribute("fill", "#4db027");

    filledSvg.appendChild(filledPath);

    label.appendChild(emptySvg);
    label.appendChild(filledSvg);

    toggleWrap.appendChild(input);
    toggleWrap.appendChild(label);

    previewWrap.appendChild(productImg);
    previewWrap.appendChild(toggleWrap);

    topWrap.appendChild(textWrap);
    topWrap.appendChild(previewWrap);

    // Создаем основной контейнер
    const bottomWrap = document.createElement("div");
    bottomWrap.className = "bottom-wrap";

    // Создаем группу кнопок
    const buttonGroup = document.createElement("div");
    buttonGroup.className = "button-group";

    // Создаем кнопку "Добавить"
    const addButton = document.createElement("button");
    addButton.className = "button-base-fill large add-button-variant-1";
    addButton.textContent = "Добавить";

    // Создаем блок с кнопками +/-
    const counterBlock = document.createElement("div");
    counterBlock.className = "add-button-variant-2";

    // Кнопка минус
    const minusButton = document.createElement("button");
    minusButton.className = "counter-button minus";
    const minusIcon = document.createElement("img");
    minusIcon.src = "./icons/stroke/20/minus.svg";
    minusIcon.alt = "";
    minusButton.appendChild(minusIcon);

    // Счетчик
    const counter = document.createElement("span");
    counter.className = "text-regular count";
    counter.textContent = "1";

    // Кнопка плюс
    const plusButton = document.createElement("button");
    plusButton.className = "counter-button plus";
    const plusIcon = document.createElement("img");
    plusIcon.src = "./icons/stroke/20/plus.svg";
    plusIcon.alt = "";
    plusButton.appendChild(plusIcon);

    // Добавляем элементы в блок счетчика
    counterBlock.appendChild(minusButton);
    counterBlock.appendChild(counter);
    counterBlock.appendChild(plusButton);

    // Создаем select с опциями
    const select = document.createElement("select");
    select.className = "select-large";

    const option50 = document.createElement("option");
    option50.value = "50";
    option50.textContent = "50гр.";

    const option100 = document.createElement("option");
    option100.value = "100";
    option100.textContent = "100гр.";

    const option150 = document.createElement("option");
    option150.value = "150";
    option150.textContent = "150гр.";

    select.appendChild(option50);
    select.appendChild(option100);
    select.appendChild(option150);

    // Создаем кнопку "О чае"
    const aboutButton = document.createElement("button");
    aboutButton.className = "button-base-secondary";
    aboutButton.textContent = "О чае";

    // Добавляем все элементы в группу кнопок
    buttonGroup.appendChild(addButton);
    buttonGroup.appendChild(counterBlock);
    buttonGroup.appendChild(select);
    buttonGroup.appendChild(aboutButton);

    // Создаем элемент с ценой
    const price = document.createElement("h5");
    price.textContent = `${tea.price} ₽`;

    // Добавляем группу кнопок и цену в основной контейнер
    bottomWrap.appendChild(buttonGroup);
    bottomWrap.appendChild(price);

    productCard.appendChild(topWrap);
    productCard.appendChild(bottomWrap);

    messageItem.appendChild(textRegular);
    messageItem.appendChild(productCard);

    recieveContainer.appendChild(messageItem);
    messages.appendChild(recieveContainer);
}
