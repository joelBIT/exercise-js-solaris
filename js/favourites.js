'use strict';

const cards = document.querySelector('.cards');

window.onload = () => {
    displayFavourites();  // Used later when the application is more finished
}

/**
 * Used for testing purposes. Each planet in the API is added to the 'favourites' array. Later, a planet
 * is added to the 'favourites' array by clicking on a button in the singlePlanet page.
 */
function addPlanetsToFavourites(planets) {
    const favourites = [];
        for (let i = 0; i < planets.length; i++) {
            favourites.push(planets[i]);
        }
        localStorage.setItem('favourites', JSON.stringify(favourites));
}

/**
 * Retrieves all the planets from the 'favourites' array in local storage
 * and renders each planet as a card on the Favourites page.
 */
function displayFavourites() {
    let favourites = JSON.parse(localStorage.getItem('favourites'));
    for (let i = 0; i < favourites.length; i++) {
        createPlanetCard(favourites[i]);
    }
}

/**
 * Creates a card on the Favourites page for the given planet. 
 */
function createPlanetCard(planet) {
    let card = document.createElement('article');
    card.classList.add('card');
    card.classList.add(planet.name);
    let navigatediv = document.createElement("div");
    navigatediv.classList.add('navigate');

    navigatediv.addEventListener('click', (event) => {
        event.stopPropagation();
        localStorage.setItem('activePlanetId', planet.id);
        window.location.assign("/singlePlanet.html");
    });

    let name = document.createElement("h1");
    name.appendChild(document.createTextNode(planet.name));
    navigatediv.appendChild(name);

    let planetFigure = document.createElement('figure');
    let planetImage = document.createElement('img');
    planetImage.setAttribute('src', `/assets/${planet.name}.jpg`);
    planetImage.setAttribute('alt', `${planet.name}`);
    planetFigure.appendChild(planetImage);
    navigatediv.append(planetFigure);

    card.appendChild(navigatediv);

    let div = document.createElement("div");
    div.classList.add('trash');
    let latinName = document.createElement("h2");
    latinName.appendChild(document.createTextNode(planet.latinName));
    div.appendChild(latinName);

    let figure = document.createElement('figure');
    figure.classList.add('trash-icon');
    figure.addEventListener('click', (event) => {
        event.stopPropagation();
        removeFavourite(planet.name);
    });

    let image = document.createElement('img');
    image.setAttribute('src', '/assets/trash.svg');
    image.setAttribute('alt', 'Remove Favourite');
    figure.appendChild(image);
    div.appendChild(figure);
    card.append(div);

    cards.appendChild(card);
}

/**
 * Removes the selected favourite planet from the array of favourite planets.
 * The index of the planet is retrieved and then that index is used to remove the
 * corresponding planet from the favourites array.
 */
function removeFavourite(name) {
    let favourites = JSON.parse(localStorage.getItem('favourites'));
    let index = -1;
    for (let i = 0; i < favourites.length; i++) {
        if (favourites[i].name === name) {
            index = i;
        }
    }

    if (index > -1) {
        favourites.splice(index, 1);
        let card = document.querySelector('.' + name);
        cards.removeChild(card);
        localStorage.setItem('favourites', JSON.stringify(favourites));
    }
}
