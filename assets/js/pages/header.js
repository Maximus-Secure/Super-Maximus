export function initHeader() {
    handleHeaderScroll();
    window.addEventListener("scroll", () => {
        handleHeaderScroll();
    });
}

function handleHeaderScroll() {
    if (window.scrollY > 0) {
        tools.showElement(header, true);
    } else {
        tools.showElement(header, false);
    }
}