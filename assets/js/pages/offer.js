import * as _page from "./page.js";

window.addEventListener("load", () => { initOfferPage(); });

function initOfferPage() {
    _page.initPage();
    _page.scrollHandler.handlePageScrolling();

    loadOffer(getOfferId(), getOfferType());
}

function getOfferId() {
    return new URLSearchParams(window.location.search).get("o");
}

function getOfferType() {
    return new URLSearchParams(window.location.search).get("t");
}

async function loadOffer(id, type) {
    try {
        switch(type) {
            case "f":
                await initFlat(id);
                break;
        }
    }
    catch (e) {
        console.error(e);
    }
}

async function initFlat(id) {
    let json = await initFlatsJson();
    for (let entry of json.flats) {
        if (entry.id != id) {
            continue;
        }
        let textElement = document.getElementById("main-info").querySelector(".text");
        textElement.querySelector(".name").innerHTML = entry.name;
        textElement.querySelector(".floor-size").innerHTML = resolveFloor(entry.floor).concat(" - ").concat(entry.size).concat("m2");
        textElement.querySelector(".structure").innerHTML = resolveStructure(entry.structure);
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