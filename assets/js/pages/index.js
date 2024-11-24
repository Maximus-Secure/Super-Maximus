import * as _page from "./page.js";

window.addEventListener("load", () => { initIndexPage(); });

function initIndexPage() {
    _page.initPage();
    _page.scrollHandler.handlePageScrolling();

    initFixedScrolling();
}

let currentScrolledTo = 0;
let mainElement;

function initFixedScrolling() {
    mainElement = document.querySelector("main");
    scrollToChild(0);
    document.addEventListener("wheel", (e) => {
        if (e.deltaY < 0) {
            if (currentScrolledTo == 0) {
                return;
            }
            currentScrolledTo--;
            scrollToChild(currentScrolledTo);
        }
        else if (e.deltaY > 0) {
            if (currentScrolledTo == mainElement.children.length - 1) {
                return;
            }
            currentScrolledTo++;
            scrollToChild(currentScrolledTo);
        }
    });
}

function scrollToChild(index) {
    mainElement.children[index].scrollIntoView({
        behaviour: "smooth", block: "start", inline: "start"
    });
}