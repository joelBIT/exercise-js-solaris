'use strict';

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
        console.log(planets.bodies);
        const favourites = [];
        for (let i = 0; i < planets.bodies.length; i++) {
            if (planets.bodies[i].type === 'planet') {
                favourites.push(planets.bodies[i]);
            }
        }
        localStorage.setItem('favourites', JSON.stringify(favourites));
        displayFavourites();

    } catch (error) {
        console.log(error);
    }
}

function displayFavourites() {
    console.log(localStorage.getItem('favourites'));
    console.log(JSON.parse(localStorage.getItem('favourites')));
}

function removeFavourite() {

}


getAPIKey();