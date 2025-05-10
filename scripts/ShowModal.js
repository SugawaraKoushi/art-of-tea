function showModal() {
    const modal = document.getElementById("modal");
    modal.setAttribute("show", "true");
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.setAttribute("show", "false");
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

function handleInputFocusOut() {
    const btn = document.getElementById("send-prompt-btn");
    btn.style.background = "#e4e4e4";
}

function handleInputFocusIn() {
    const btn = document.getElementById("send-prompt-btn");
    btn.style.background = "#4db027";
}