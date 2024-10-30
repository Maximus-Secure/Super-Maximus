import * as _page from "./page.js";

window.addEventListener("load", () => { initIndexPage(); });

function initIndexPage() {
    _page.initPage();
    _page.scrollHandler.handlePageScrolling();
}