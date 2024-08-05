'use strict';

const cards = document.querySelector('.cards');

window.onload = () => {
    getAPIKey();
}

async function getAPIKey() {
    try {
        let keyResponse = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys', {
            method: 'POST'
        });
    
        const key = await keyResponse.json();
        
        let resp = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies', {
            method: 'GET',
            headers: {'x-zocom': key.key}
        })

        const planets = await resp.json();
        addPlanetsToFavourites(planets.bodies);
        displayFavourites();

    } catch (error) {
        console.log(error);
    }
}

function addPlanetsToFavourites(planets) {
    const favourites = [];
        for (let i = 0; i < planets.length; i++) {
            if (planets[i].type === 'planet') {
                favourites.push(planets[i]);
            }
        }
        localStorage.setItem('favourites', JSON.stringify(favourites));
}

function displayFavourites() {
    let favourites = JSON.parse(localStorage.getItem('favourites'));
    for (let i = 0; i < favourites.length; i++) {
        createPlanetCard(favourites[i]);
    }
}

function createPlanetCard(planet) {
    let card = document.createElement('article');
    card.classList.add('card');

    let name = document.createElement("h1");
    name.appendChild(document.createTextNode(planet.name));
    card.appendChild(name);
    let latinName = document.createElement("h2");
    latinName.appendChild(document.createTextNode(planet.latinName));
    card.appendChild(latinName);

    cards.appendChild(card);
}

function removeFavourite() {

}
