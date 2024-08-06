"use strict";
window.onload = () => {
  getBodies();
  document
    .querySelector(".planet-home_button")
    .addEventListener("click", () => {
      window.location.href = "../index.html";
    });
  document
    .querySelector(".planet-favourite_button")
    .addEventListener("click", () => {
      favouriteButtonClick();
    });
  displayPlanet();
};

// Gets the bodies from the api and stores them in localestorage
async function getBodies() {
  try {
    let keyResponse = await fetch(
      "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys",
      {
        method: "POST",
      }
    );

    const key = await keyResponse.json();

    let resp = await fetch(
      "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies",
      {
        method: "GET",
        headers: { "x-zocom": key.key },
      }
    );
    const planets = await resp.json();
    localStorage.setItem("bodies", JSON.stringify(planets.bodies));
  } catch (error) {
    console.log(error);
  }
}

// Returns the currently active planet using the active ID stored in localstorage
function getActivePlanet() {
  try {
    let activeId = JSON.parse(localStorage.getItem("activePlanetId"));
    let activePlanet;
    JSON.parse(localStorage.getItem("bodies")).forEach((planet) => {
      if (planet.id == activeId) {
        activePlanet = planet;
      }
    });
    return activePlanet;
  } catch (error) {
    console.log(error);
  }
}

// Updates the elements content and style to that of the active planet
function displayPlanet() {
  let activePlanet = getActivePlanet();
  try {
    document.querySelector(".planet_name").textContent =
      activePlanet.name.toUpperCase();
    document.querySelector(".planet_latinName").textContent =
      activePlanet.latinName.toUpperCase();
    document.querySelector(".planet_text").textContent = activePlanet.desc;
    document.querySelector(".planet-info_omkrets").textContent =
      activePlanet.circumference + " km";
    document.querySelector(".planet-info_maxTemp").textContent =
      activePlanet.temp.day + "C";
    document.querySelector(".planet-info_distans").textContent =
      activePlanet.distance + " km";
    document.querySelector(".planet-info_minTemp").textContent =
      activePlanet.temp.night + "C";
    const planetMoonsRef = document.querySelector(".planet-moons");
    activePlanet.moons.forEach((moon) => {
      let m = document.createElement("li");
      m.textContent = moon;
      planetMoonsRef.appendChild(m);
    });

    let color;
    switch (activePlanet.id) {
      case 0: {
        color = "#FFD029";
        break;
      }
      case 1: {
        color = "#888888";
        break;
      }
      case 2: {
        color = "#E7CDCD";
        break;
      }
      case 3: {
        color = "#428ED4";
        break;
      }
      case 4: {
        color = "#EF5F5F";
        break;
      }
      case 5: {
        color = "#E29468";
        break;
      }
      case 6: {
        color = "#C7AA72";
        break;
      }
      case 7: {
        color = "#C9D4F1";
        break;
      }
      case 8: {
        color = "#7A91A7";
        break;
      }
    }
    let figure3 = document.querySelector(".planet-image_inner");
    figure3.style.backgroundColor = color;
    let figure2 = document.querySelector(".planet-image_middle");
    figure2.style.backgroundColor = color + "1a";
    let figure1 = document.querySelector(".planet-image_outer");
    figure1.style.backgroundColor = color + "0f";

    let button = document.querySelector(".planet-favourite_button");
    button.style.backgroundColor = color;
  } catch (error) {
    console.log(error);
  }
  updateButtonText();
}

// Updates the text of the button depending on if the active planet is a favourite or not
function updateButtonText() {
  try {
    if (isFavourite(getActivePlanet())) {
      document.querySelector(".planet-favourite_button").textContent =
        "REMOVE FROM FAVOURITES";
    } else {
      document.querySelector(".planet-favourite_button").textContent =
        "ADD TO FAVOURITES";
    }
  } catch (error) {
    console.log(error);
  }
}

// Calls the remove or add favourute function depending on status of active planet
function favouriteButtonClick() {
  let planet = getActivePlanet();
  try {
    if (isFavourite(planet)) {
      removeFavourite(planet);
      console.log("removed from favourites");
    } else {
      addPlanetToFavourites(planet);
      console.log("added to favourites");
    }
  } catch (error) {
    console.log(error);
  }
  updateButtonText();
}

// Returns true if the given planet is a favourite
function isFavourite(planet) {
  let favourites = getFavourites();
  let exists = false;
  try {
    if (favourites) {
      favourites = Array.isArray(favourites) ? favourites : [favourites];
      favourites.forEach((favourite) => {
        if (favourite.id === planet.id) {
          exists = true;
        }
      });
    }
    return exists;
  } catch (error) {
    console.log(error);
  }
}

// Returns the favourite planets
function getFavourites() {
  try {
    let favourites = JSON.parse(localStorage.getItem("favourites"));
    return favourites;
  } catch (error) {
    console.log(error);
  }
}

// Adds the input planet to favourites in localstorage
function addPlanetToFavourites(planet) {
  let favourites = getFavourites();
  try {
    if (favourites) {
      favourites = Array.isArray(favourites) ? favourites : [favourites];
      favourites.push(planet);
    } else {
      favourites = planet;
    }
    localStorage.setItem("favourites", JSON.stringify(favourites));
  } catch (error) {
    console.log(error);
  }
}

// Removes the input planet to favourites from localstorage
function removeFavourite(planet) {
  let favourites = getFavourites();
  let index = -1;
  try {
    if (favourites.length) {
      for (let i = 0; i < favourites.length; i++) {
        if (favourites[i].id == planet.id) {
          index = i;
        }
      }
      favourites.splice(index, 1);
      console.log("removed at index " + index);
      localStorage.setItem("favourites", JSON.stringify(favourites));
    } else {
      localStorage.removeItem("favourites");
    }
  } catch (error) {
    console.log(error);
  }
}
