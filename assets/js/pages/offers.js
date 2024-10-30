import * as _page from "./page.js";

window.addEventListener("load", () => { initOffersPage(); });

function initOffersPage() {
    _page.initPage();
    _page.scrollHandler.handlePageScrolling();

    initSelectors();

    //loadOffers();
}

async function loadOffers() {
    try
    {
        initFlats();
    }
    catch(e) {
        console.error(e);
    }
}

async function initFlats() {
    let json = await initFlatsJson();
    for (let entry of json.projects) {
        if (entry.id == project_name) {
            document.querySelector("title").innerHTML = entry.name.concat(" | Corax Inženjering");
            document.getElementById("main-info").querySelector(".heading").querySelector("h1").innerHTML = entry.name;
            await fetch(("../assets/projects/").concat(project_name).concat("/description.txt"))
            .then((res) => res.text())
            .then((text) => {
                document.getElementById("main-info").querySelector(".text").querySelector("p").innerHTML = text;
            }).catch(console.log("error"));
            await fetch(("../assets/projects/").concat(project_name).concat("/items.txt"))
            .then((res) => res.text())
            .then((text) => {
                let items = text.split("\n");
                let container = document.getElementById("main-info").querySelector(".text").querySelector("ul");
                for (let item of items) {
                    let li = document.createElement("li");
                    li.innerHTML = item;
                    container.append(li);
                }
            }).catch(console.log("error"));
            return;
        }
    }
    tools.showElement(body.querySelector("main"), false);
    tools.showElement(document.getElementById("error"), true);
    tools.showElement(footer, false);
}

async function initFlatsJson() {
    let response = await fetch("../assets/data/flats.json");
        if (!response.ok) {
            alert("Error loading project.");
        }
        return await response.json();
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