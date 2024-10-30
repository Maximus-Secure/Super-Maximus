let scrollElements = [];
let pageTopElements = [];

let initializedScroll = false;

export function initScroll() {
	if (initializedScroll) {
		return;
	}
	initializedScroll = true;
	let scrolls = document.querySelectorAll("[data-scroll]");
	for (const scroll of scrolls) {
		scrollElements.push(new ScrollElement(scroll));
	}
	window["__debug_scrolls__"] = scrollElements;
	let pageTopScrolls = document.querySelectorAll("[data-page-top-only]");
	for (const pageTop of pageTopScrolls) {
		pageTopElements.push(new PageTopScrollElement(pageTop));
	}
	window
	window.addEventListener("scroll", () => { handlePageScrolling(); });
}

export function handlePageScrolling() {
	handleScrollElements();
	handleTopPageScroll();
}

function handleTopPageScroll() {
	if (window.scrollY > 0) {
		for (let pageTop of pageTopElements) {
			tools.showElement(pageTop.element, false);
		}
	} else {
		for (let pageTop of pageTopElements) {
			if (pageTop.mode == "multiple") {
				tools.showElement(pageTop.element, true);
			}
		}
	}
}

function showScrollElement(scroll, show) {
	tools.showElement(scroll.element, show);
}

function PageTopScrollElement(element) {
	this.element = element;
	this.mode = this.element.getAttribute("data-mode");
	if (!this.mode) {
		this.mode = "once";
	} else {
		if (this.mode != "once" && this.mode != "multiple") {
			this.mode = "once";
		}
	}
	this.inverted = false;
	if (this.element.getAttribute("data-inverted")) {
		this.inverted = true;
	}
}

function ScrollElement(element) {
	this.element = element;
	this.active = false;
	this.mode = this.element.getAttribute("data-mode");
	if (!this.mode) {
		this.mode = "once";
	} else {
		if (this.mode != "once" && this.mode != "multiple" && this.mode !="center") {
			this.mode = "once";
		}
	}
	this.direction = this.element.getAttribute("data-direction");
	if (!this.direction) {
		this.direction = "default";
	} else {
		if (this.direction != "default" && this.direction != "both") {
			this.direction = "default";
		}
	}
	this.offset = parseInt(this.element.getAttribute("data-offset"));
	if (!this.offset) {
		this.offset = 0;
	}
}

function isScrollWithinCenter(scroll) {
	return (window.innerHeight / 2 >= scroll.element.getBoundingClientRect().top + (scroll.element.getBoundingClientRect().height / 2));
}

function isScrollWithinOffsetBottom(scroll) {
	if (0 <= scroll.element.getBoundingClientRect().bottom - scroll.offset) {
		return true;
	}
	else if (0 > scroll.element.getBoundingClientRect().bottom) {
		return false;
	}
	return false;
};

function isScrollWithinOffsetTop(scroll) {
	if (window.innerHeight >= scroll.element.getBoundingClientRect().top + scroll.offset) {
		return true;
	}
	else if (window.innerHeight < scroll.element.getBoundingClientRect().top) {
		return false;
	}
	return false;
};

function handleScrollElements() {
	for (let scroll of scrollElements) {
		if (!scroll.element) {
			continue;
		}
		scroll.active = handleScrollElement(scroll);
		showScrollElement(scroll, scroll.active);
	}
}

function handleScrollElement(scroll) {
	switch (scroll.mode) {
		case "center":
			if (isScrollWithinCenter(scroll) || scroll.active) {
				return true;
			}
			return false;
		case "once":
			if (isScrollWithinOffsetTop(scroll) || scroll.active) {
				return true;
			}
			return false;
		case "multiple":
			if (scroll.direction == "both") {
				if (isScrollWithinOffsetTop(scroll) && isScrollWithinOffsetBottom(scroll)) {
					return true;
				}
				return false;
			}
			else if (scroll.direction == "default") {
				if (isScrollWithinOffsetTop(scroll)) {
					return true;
				}
				return false;
			}
			return true;
	}
}