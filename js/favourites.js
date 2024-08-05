'use strict';

async function getAPIKey() {
    try {
        let keyResponse = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys', {
            method: 'POST'
        });
    
        const key = await keyResponse.json();
        console.log(key.key);
        
        let resp = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies', {
            method: 'GET',
            headers: {'x-zocom': key.key}
        })

        const planets = await resp.json();
        console.log(planets.bodies);

    } catch (error) {
        console.log(error);
    }
}


getAPIKey();