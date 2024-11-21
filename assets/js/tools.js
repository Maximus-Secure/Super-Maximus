export function showElement(element, show) {
	if (show) {
		if (isElementVisible(element)) {
			return;
		}
		element.classList.add("active");
		element.classList.remove("inactive");
	}
	else {
		if (!isElementVisible(element)) {
			return;
		}
		element.classList.remove("active");
		element.classList.add("inactive");
	}
}

export function isElementVisible(element) {
	return element.classList.contains("active");
}