import * as _page from "./page.js";

window.addEventListener("load", () => { initOffersPage(); });

function initOffersPage() {
    _page.initPage();
    _page.scrollHandler.handlePageScrolling();

    initSelectors();

    loadOffers();
}

async function loadOffers() {
    try {
        let template = await initItemTemplate();
        await initFlats(template);
    }
    catch (e) {
        console.error(e);
    }
}

async function initItemTemplate() {
    return fetch("../assets/page-parts/project-item.html")
        .then((response) => response.text())
        .then((html) => {
            const parser = new DOMParser();
            return parser.parseFromString(html, "text/html").querySelector("body").querySelector(".item");
        });
}

let flats = [];
const rowItems = 4;

async function initFlats(template) {
    let counter = 0;
    let container = document.getElementById("offers");
    let currentRow;
    let json = await initFlatsJson();
    for (let entry of json.flats) {
        if (counter % rowItems == 0) {
            currentRow = document.createElement("div");
            currentRow.classList.add("row");
            container.appendChild(currentRow);
        }
        let newItem = template.cloneNode(true);
        currentRow.appendChild(newItem);
        newItem.setAttribute("href", ("../offer?o=").concat(entry.id).concat("&t=f"));
        newItem.querySelector("img").setAttribute("src", "https://placehold.co/512x512?text=PROBNI STAN"); //TODO
        newItem.querySelector(".name").innerHTML = entry.name;
        newItem.querySelector(".floor-size").innerHTML = resolveFloor(entry.floor).concat(" - ").concat(entry.size).concat("m2");
        newItem.querySelector(".structure").innerHTML = resolveStructure(entry.structure);
        flats.push(newItem);
        counter++;
    }
}

async function initFlatsJson() {
    let response = await fetch("../assets/data/flats.json");
    if (!response.ok) {
        alert("Error loading project.");
    }
    return await response.json();
}

function resolveFloor(floor) {
    switch (floor) {
        case "basement":
            return "Podrum";

        case "ground":
            return "Prizemlje";

        case "first":
            return "Prvi Sprat";

        case "second":
            return "Drugi Sprat";

        case "third":
            return "Treći Sprat";

        case "fourth":
            return "Četvrti Sprat";

        case "attic":
            return "Potkrovlje";

        default:
            return "ERROR";
    }
}

function resolveStructure(structure) {
    switch (structure) {
        case "one-room":
            return "JEDNOSOBAN";

        case "two-room":
            return "DVOSOBAN";

        case "three-room":
            return "TROSOBAN";

        default:
            return "ERROR";
    }
}

let floorOption;
let structureOption;
let sizeOption;

function initSelectors() {
    let items = document.getElementById("selector").querySelector(".content").querySelector(".wrapper").querySelector(".selections").querySelectorAll(".item");
    for (let item of items) {
        item.querySelector(".options").addEventListener("mouseover", () => {
            tools.showElement(item.querySelector("ul"), true);
        });
        item.querySelector(".options").addEventListener("mouseout", () => {
            tools.showElement(item.querySelector("ul"), false);
        });
    }

    let floorOptionElement = document.getElementById("floor-options");
    let floorOptionList = floorOptionElement.querySelector("ul");

    let structureOptionElement = document.getElementById("structure-options");
    let structureOptionList = structureOptionElement.querySelector("ul");

    let sizeOptionElement = document.getElementById("size-options");
    let sizeOptionList = sizeOptionElement.querySelector("ul");

    floorOption = floorOptionElement.querySelector("ul").getAttribute("data-selected");
    structureOption = structureOptionElement.querySelector("ul").getAttribute("data-selected");
    sizeOption = sizeOptionElement.querySelector("ul").getAttribute("data-selected");

    for (let item of floorOptionList.children) {
        item.addEventListener("click", () => {
            floorOption = item.getAttribute("data-value");
            floorOptionElement.querySelector("h2").innerHTML = item.innerHTML;
            floorOptionList.setAttribute("data-selected", floorOption);
            tools.showElement(floorOptionList, false);
        });
    }

    for (let item of structureOptionList.children) {
        item.addEventListener("click", () => {
            structureOption = item.getAttribute("data-value");
            structureOptionElement.querySelector("h2").innerHTML = item.innerHTML;
            structureOptionList.setAttribute("data-selected", structureOption);
            tools.showElement(structureOptionList, false);
        });
    }

    for (let item of sizeOptionList.children) {
        item.addEventListener("click", () => {
            sizeOption = item.getAttribute("data-value");
            sizeOptionElement.querySelector("h2").innerHTML = item.innerHTML;
            sizeOptionList.setAttribute("data-selected", sizeOption);
            tools.showElement(sizeOptionList, false);
        });
    }
}