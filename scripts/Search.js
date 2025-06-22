var teaCardId = 0;

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("search-form");
    form.addEventListener("submit", handleSearchSubmit);
});

function handleSearchSubmit(event) {
    event.preventDefault();

    changeLayoutToChat();

    // Получаем значение поля ввода
    const searchInput = document.getElementById("prompt");
    const query = searchInput.value.trim();
    searchInput.value = "";
    createQueryMessage(query);
    createLoader();

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

            console.log(response.text());

            return response.json();
        })
        .then((data) => {
            deleteLoader();
            console.log(data);

            if (data.content == null && data.products == null) {
                createNoContentMessage();
            } else {
                if (data.type === "text") {
                    createArticle(data.content);
                } else {
                    const teas = data.products;

                    createTeaCardsContainer();

                    teas.forEach((tea) => {
                        createTeaCard(tea);
                    });
                }
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

function createLoader() {
    const messages = document.querySelector(".message-items-container");

    const recieveContainer = document.createElement("div");
    recieveContainer.classList.add("message-item-container", "recieve");
    recieveContainer.setAttribute("id", "loader");

    const messageItem = document.createElement("div");
    messageItem.classList.add("message-item");

    const textRegular = document.createElement("span");
    const text = document.createTextNode("Думаю и скоро отвечу...");
    textRegular.appendChild(text);

    messageItem.appendChild(textRegular);

    recieveContainer.appendChild(messageItem);
    messages.appendChild(recieveContainer);
}

function deleteLoader() {
    const messages = document.querySelector(".message-items-container");
    const loader = document.querySelector(
        ".message-item-container.recieve#loader"
    );
    messages.removeChild(loader);
}

function createNoContentMessage() {
    const messages = document.querySelector(".message-items-container");

    const recieveContainer = document.createElement("div");
    recieveContainer.classList.add("message-item-container", "recieve");

    const messageItem = document.createElement("div");
    messageItem.classList.add("message-item");

    const textRegular = document.createElement("span");
    const text = document.createTextNode(
        "К сожалению ничего не могу предложить"
    );
    textRegular.appendChild(text);

    messageItem.appendChild(textRegular);

    recieveContainer.appendChild(messageItem);
    messages.appendChild(recieveContainer);
}

function createArticle(content) {
    const messages = document.querySelector(".message-items-container");

    const recieveContainer = document.createElement("div");
    recieveContainer.classList.add("message-item-container", "recieve");

    const messageItem = document.createElement("div");
    messageItem.classList.add("message-item");

    const textRegular = document.createElement("span");
    textRegular.classList.add("text-regular");
    const text = content.split("\n").join("<br>");
    textRegular.innerHTML = text;

    messageItem.appendChild(textRegular);
    recieveContainer.appendChild(messageItem);
    messages.appendChild(recieveContainer);
}

function createTeaCardsContainer() {
    const messages = document.querySelector(".message-items-container");

    const recieveContainer = document.createElement("div");
    recieveContainer.classList.add("message-item-container", "recieve");

    const messageItem = document.createElement("div");
    messageItem.classList.add("message-item");

    const textRegular = document.createElement("span");
    const text = document.createTextNode("Вот что я могу Вам предложить:");
    textRegular.appendChild(text);

    messageItem.appendChild(textRegular);

    recieveContainer.appendChild(messageItem);
    messages.appendChild(recieveContainer);
}

function createTeaCard(tea) {
    ++teaCardId;

    const messages = document.querySelector(
        ".message-items-container .message-item-container.recieve:last-child > .message-item"
    );

    const productCard = document.createElement("div");
    productCard.classList.add("message-product-card");
    productCard.setAttribute("id", "tea-card-" + teaCardId);

    // Создаем контейнер для верхней части
    const topWrap = document.createElement("div");
    topWrap.classList.add("top-wrap");

    // Создаем контейнер для описания
    const textWrap = document.createElement("div");
    textWrap.classList.add("text-wrap");

    // Создаем заголовок
    const productHeader = document.createElement("h6");
    const productHeaderContent = document.createTextNode(tea.name);
    productHeader.appendChild(productHeaderContent);

    // Создаем описание
    const productDescription = document.createElement("span");
    productDescription.classList.add("text-regular", "secondary");
    const productDescriptionContent = tea.description.split("\n").join("<br>");
    productDescription.innerHTML = productDescriptionContent;

    // Добавляем заголовок и описание в контейнер верхней части
    textWrap.appendChild(productHeader);
    textWrap.appendChild(productDescription);

    // Создаем контейнер для изображения
    const previewWrap = document.createElement("div");
    previewWrap.classList.add("preview-wrap");

    // Создаем изображение
    const productImg = document.createElement("img");
    productImg.src = "./images/product.png";

    // Создаем контейнер для чекбокса "Любимое"
    const toggleWrap = document.createElement("div");
    toggleWrap.classList.add("toggle-wrap");

    // Создаем чекбокс
    const input = document.createElement("input");
    input.type = "checkbox";
    input.classList.add("favourite-toggle");
    input.setAttribute("id", "favourite-toggle-tea-" + teaCardId);

    // Создаем лейбл для него
    const label = document.createElement("label");
    label.classList.add("favourite-icon");
    label.setAttribute("for", "favourite-toggle-tea-" + teaCardId);

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

    // Добавляем все в обратном порядке
    filledSvg.appendChild(filledPath);

    label.appendChild(emptySvg);
    label.appendChild(filledSvg);

    toggleWrap.appendChild(input);
    toggleWrap.appendChild(label);

    previewWrap.appendChild(productImg);
    previewWrap.appendChild(toggleWrap);

    topWrap.appendChild(textWrap);
    topWrap.appendChild(previewWrap);

    // Создаем контейнер для нижней части
    const bottomWrap = document.createElement("div");
    bottomWrap.className = "bottom-wrap";

    // Создаем группу кнопок
    const buttonGroup = document.createElement("div");
    buttonGroup.className = "button-group";

    // Создаем кнопку "Добавить"
    const addButton = document.createElement("button");
    addButton.className = "button-base-fill large add-button-variant-1";
    addButton.setAttribute("id", "tea-card-button-variant-1-" + teaCardId);
    addButton.textContent = "Добавить";

    // Создаем блок с кнопками +/-
    const counterBlock = document.createElement("div");
    counterBlock.className = "add-button-variant-2";
    counterBlock.setAttribute("id", "tea-card-button-variant-2-" + teaCardId);

    // Кнопка минус
    const minusButton = document.createElement("button");
    minusButton.className = "counter-button minus";
    const minusIcon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    );
    minusIcon.setAttribute("width", "20");
    minusIcon.setAttribute("height", "20");
    minusIcon.setAttribute("viewBox", "0 0 20 20");
    minusIcon.setAttribute("fill", "#4DB027");

    const minusIconPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
    );
    minusIconPath.setAttribute(
        "d",
        "M2.75 9.00004L10 9L16.75 9.00004C16.9489 9.00004 17.1397 9.07906 17.2803 9.21971C17.421 9.36036 17.5 9.55113 17.5 9.75004C17.5 9.94895 17.421 10.1397 17.2803 10.2804C17.1397 10.421 16.9489 10.5 16.75 10.5H10H2.75C2.55109 10.5 2.36032 10.421 2.21967 10.2804C2.07902 10.1397 2 9.94895 2 9.75004C2 9.55113 2.07902 9.36036 2.21967 9.21971C2.36032 9.07906 2.55109 9.00004 2.75 9.00004Z"
    );
    minusIconPath.setAttribute("fill", "#4DB027");

    minusIcon.appendChild(minusIconPath);
    minusButton.appendChild(minusIcon);

    // Счетчик
    const counter = document.createElement("span");
    counter.className = "text-regular count";
    counter.textContent = "1";

    // Кнопка плюс
    const plusButton = document.createElement("button");
    plusButton.className = "counter-button plus";
    const plusIcon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    );
    plusIcon.setAttribute("width", "16");
    plusIcon.setAttribute("height", "16");
    plusIcon.setAttribute("viewBox", "0 0 16 16");
    plusIcon.setAttribute("fill", "#4DB027");

    const plusIconPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
    );
    plusIconPath.setAttribute(
        "d",
        "M8.5 0.75C8.5 0.551088 8.42098 0.360322 8.28033 0.21967C8.13968 0.0790175 7.94891 0 7.75 0C7.55109 0 7.36032 0.0790175 7.21967 0.21967C7.07902 0.360322 7 0.551088 7 0.75V7H0.75C0.551088 7 0.360322 7.07902 0.21967 7.21967C0.0790175 7.36032 0 7.55109 0 7.75C0 7.94891 0.0790175 8.13968 0.21967 8.28033C0.360322 8.42098 0.551088 8.5 0.75 8.5H7V14.75C7 14.9489 7.07902 15.1397 7.21967 15.2803C7.36032 15.421 7.55109 15.5 7.75 15.5C7.94891 15.5 8.13968 15.421 8.28033 15.2803C8.42098 15.1397 8.5 14.9489 8.5 14.75V8.5H14.75C14.9489 8.5 15.1397 8.42098 15.2803 8.28033C15.421 8.13968 15.5 7.94891 15.5 7.75C15.5 7.55109 15.421 7.36032 15.2803 7.21967C15.1397 7.07902 14.9489 7 14.75 7H8.5V0.75Z"
    );
    plusIconPath.setAttribute("fill", "#4DB027");

    plusIcon.appendChild(plusIconPath);
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

    messages.appendChild(productCard);
}

function handlePromptClick(event) {
    const promptText = event.currentTarget.textContent.trim();
    const promptArea = document.getElementById("prompt");

    promptArea.value = promptText;
    handleSearchSubmit(event);
}
