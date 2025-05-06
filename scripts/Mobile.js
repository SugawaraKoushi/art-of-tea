const mediaQuery = window.matchMedia("(max-width: 860px)");

function handleWidthChange(e) {
    const bannerTitle = document.querySelector("h1.title");

    console.log(bannerTitle);

    if (!e.matches) {
        bannerTitle.classList.remove("mobile");
    } else {
        bannerTitle.classList.add("mobile");
    }
}

handleWidthChange(mediaQuery);

mediaQuery.addListener(handleWidthChange);
