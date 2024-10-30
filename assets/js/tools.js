export function showElement(element, show) {
	if (show) {
		element.classList.add("active");
		element.classList.remove("inactive");
	}
	else {
		element.classList.remove("active");
		element.classList.add("inactive");
	}
}

export function isElementVisible(element) {
	return element.classList.contains("active");
}