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

            default:
                await initFlat(id);
                break;
        }
    }
    catch (e) {
        console.error(e);
    }
}

async function initFlat(id) {
    let json;
    try {
        json = await initJson("../assets/data/flats.json");
    } catch(e) {
        alert("Error loading apartments.");
        throw new Error(e);
    }
    for (let entry of json.flats) {
        if (entry.id != id) {
            continue;
        }
        let textElement = document.getElementById("main-info").querySelector(".text");
        document.querySelector("title").inenrHTML = (entry.name).concat(" - Super Maximus");
        textElement.querySelector(".name").innerHTML = entry.name;
        textElement.querySelector(".floor-size").innerHTML = resolveFloor(entry.floor).concat(" - ").concat(entry.size).concat("m2");
        textElement.querySelector(".structure").innerHTML = resolveStructure(entry.structure);

        let url;
        let galleryElement = document.getElementById("detail-info-gallery");
        let galleryElementImage = galleryElement.querySelector(".main-image");
        let galleryElementImages = galleryElement.querySelector(".images");
        if (entry.images == undefined) {
            tools.showElement(galleryElement, false);
        } else {
            let tempUrl = ("../assets/images/offers/f").concat(id).concat("/renders/");
            galleryElementImage.setAttribute("src", tempUrl.concat(entry.images[0].name));
            for (let image of entry.images) {
                let el = document.createElement("img");
                el.setAttribute("src", tempUrl.concat(image.name));
                el.addEventListener("click", () => {
                    galleryElementImage.setAttribute("src", el.getAttribute("src"));
                });
                galleryElementImages.appendChild(el);
            }
        }

        let backgroundImage = document.getElementById("main-info").querySelector("img");
        if (entry.images) {
            url = ("../assets/images/offers/f").concat(id).concat("/renders/").concat(entry.images[0].name);
        }
        backgroundImage.addEventListener("error", () => { backgroundImage.setAttribute("src", "../assets/images/temp/pocetna.jpg"); });
        backgroundImage.setAttribute("src", url);

        let projectElement = document.getElementById("detail-info-project");

        let planElement = projectElement.querySelector(".plan");
        let planElementImage = planElement.querySelector("img");
        url = ("../assets/images/offers/f").concat(entry.id).concat("/plan.jpg");
        planElementImage.addEventListener("error", () => { tools.showElement(planElement, false); });
        planElementImage.setAttribute("src", url); 

        let locationElement = projectElement.querySelector(".location");
        let locationElementImage = locationElement.querySelector("img");
        url = ("../assets/images/offers/f").concat(entry.id).concat("/location.jpg");
        locationElementImage.addEventListener("error", () => { tools.showElement(locationElement, false); });
        locationElementImage.setAttribute("src", url); 
    }

    let tablesJson;
    try {
        tablesJson = await initJson("../assets/data/flats-tables.json");
    } catch(e) {
        console.error("Could not load tables.");
    }

    if (tablesJson != null) {
        for (let entry of tablesJson.tables) {
            if (entry.id != id) {
                continue;
            }
            const tableBody = document.getElementById("detail-table").querySelector("table").querySelector("tbody");
            for (let row of entry.rooms) {
                const newRowElement = document.createElement("tr");
                const nElement = document.createElement("td");
                nElement.innerHTML = row.n;
                newRowElement.appendChild(nElement);

                const nameElement = document.createElement("td");
                nameElement.innerHTML = row.name;
                newRowElement.appendChild(nameElement);

                const pElement = document.createElement("td");
                pElement.innerHTML = row.p;
                newRowElement.appendChild(pElement);

                const oElement = document.createElement("td");
                oElement.innerHTML = row.o;
                newRowElement.appendChild(oElement);

                const floorElement = document.createElement("td");
                floorElement.innerHTML = row.floor;
                newRowElement.appendChild(floorElement);

                const wallElement = document.createElement("td");
                wallElement.innerHTML = row.wall;
                newRowElement.appendChild(wallElement);

                const ceilingELement = document.createElement("td");
                ceilingELement.innerHTML = row.ceiling;
                newRowElement.appendChild(ceilingELement);
                tableBody.append(newRowElement);
            }
        }
    } else {
        tools.showElement(document.getElementById("detail-table"), false);
    }
}

async function initJson(directory) {
    let response = await fetch(directory);
    if (!response.ok) {
        throw new Error("Error loading json file.");
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
        case "apartment":
            return "GARSONJERA";

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