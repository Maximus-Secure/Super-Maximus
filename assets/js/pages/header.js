export function initHeader() {
    handleHeaderScroll();
    window.addEventListener("scroll", () => {
        handleHeaderScroll();
    });

    initHamburger();
}

let hamburger;
let hamburgerMenu;
let hamburgerMenuCloser;

function initHamburger() {
	hamburger = header.querySelector(".wrapper").querySelector(".hamburger");
	hamburgerMenu = header.querySelector(".hamburger-menu");
	hamburgerMenuCloser = hamburgerMenu.querySelector(".close");
	hamburger.addEventListener("click", () => {
		tools.showElement(hamburger, false);
		tools.showElement(hamburgerMenu, true);
	});
	hamburgerMenuCloser.addEventListener("click", () => {
		tools.showElement(hamburger, true);
		tools.showElement(hamburgerMenu, false);
	});
}

function handleHeaderScroll() {
    if (window.scrollY > 0) {
        tools.showElement(header, true);
    } else {
        tools.showElement(header, false);
    }
}