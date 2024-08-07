'use strict';

/**
 * When the page is loaded the cards of favourite planets are displayed.
 * 
 * Joel
 */
window.onload = () => {
    displayFavourites();
}

/**
 * Retrieves all the planets from the 'favourites' array in local storage
 * and renders each planet as a card on the Favourites page.
 * 
 * Joel
 */
function displayFavourites() {
    const favourites = JSON.parse(localStorage.getItem('favourites'));
    for (let i = 0; i < favourites.length; i++) {
        createPlanetCard(favourites[i]);
    }
}

/**
 * Creates a card on the Favourites page for the given planet. 
 *
 * @param {*} planet the planet that the card is created for
 * 
 * Joel
 */
function createPlanetCard(planet) {
    const cards = document.querySelector('.cards');
    let card = document.createElement('article');
    card.classList.add('card');
    card.classList.add(planet.name);
    card.appendChild(createNavigation(planet));
    card.appendChild(createLatinNameArea(planet));

    cards.appendChild(card);
}

/**
 * Creates a navigation element for a planet card. Clicking on this element
 * navigates from the favourite page to the clicked planets single page.
 * 
 * @param {*} planet that the navigation is created for.
 * 
 * Joel
 */
function createNavigation(planet) {
    let navigateDIV = document.createElement("div");
    navigateDIV.classList.add('navigate');

    navigateDIV.addEventListener('click', (event) => {
        event.stopPropagation();
        localStorage.setItem('activePlanetId', planet.id);
        window.location.assign("/singlePlanet.html");
    });

    let name = document.createElement("h1");
    name.appendChild(document.createTextNode(planet.name));
    navigateDIV.appendChild(name);
    navigateDIV.append(createPlanetImage(planet.name));

    return navigateDIV;
}

/**
 * Creates a figure element containing an image of a planet.
 * 
 * @param {*} name is the name of the planet whose image element is to be created
 * @returns the created planet figure
 * 
 * Joel
 */
function createPlanetImage(name) {
    let planetFigure = document.createElement('figure');
    let planetImage = document.createElement('img');
    planetImage.setAttribute('src', `/assets/${name}.jpg`);
    planetImage.setAttribute('alt', `${name}`);
    planetFigure.appendChild(planetImage);

    return planetFigure;
}

/**
 * Creates an element containing the latin name of a planet, plus a trash icon.
 * 
 * @param {*} planet whose latin name is used
 * @returns the element containing the latin name as well as a trash icon
 * 
 * Joel
 */
function createLatinNameArea(planet) {
    let div = document.createElement("div");
    div.classList.add('latin-name');
    let latinName = document.createElement("h2");
    latinName.appendChild(document.createTextNode(planet.latinName));
    div.appendChild(latinName);
    div.appendChild(createTrashIcon(planet.name));

    return div;
}

/**
 * Creates a trash icon for a planet card. The trash icon is used to remove
 * a planet from favourites.
 * 
 * @returns the created figure containing the trash icon image.
 * 
 * Joel
 */
function createTrashIcon(name) {
    let figure = document.createElement('figure');
    figure.classList.add('trash-icon');
    figure.addEventListener('click', (event) => {
        event.stopPropagation();
        removeFavourite(name);
    });

    let image = document.createElement('img');
    image.setAttribute('src', '/assets/trash.svg');
    image.setAttribute('alt', 'Remove Favourite');
    figure.appendChild(image);

    return figure;
}

/**
 * Removes the selected planet from the array of favourite planets.
 * The planet's card is also removed from the favourites page.
 * 
 * Joel
 */
function removeFavourite(name) {
    let favourites = JSON.parse(localStorage.getItem('favourites'));
    favourites = favourites.filter(planet => planet.name !== name);
    localStorage.setItem('favourites', JSON.stringify(favourites));
    const cards = document.querySelector('.cards');
    const card = document.querySelector('.' + name);
    cards.removeChild(card);
}
