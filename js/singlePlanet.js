"use strict";
window.onload = () => {
  getAPIKey();
  document
    .querySelector(".planet-home_button")
    .addEventListener("click", () => {
      console.log("Navigate back to main page");
      window.location.href = "../index.html";
    });
  document
    .querySelector(".planet-favourite_button")
    .addEventListener("click", () => {
      favouriteButtonClick();
    });
};
async function getAPIKey() {
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
    displayPlanet();
  } catch (error) {
    console.log(error);
  }
}

function getActivePlanet() {
  let activeId = JSON.parse(localStorage.getItem("activePlanetId"));
  let activePlanet;
  JSON.parse(localStorage.getItem("bodies")).forEach((planet) => {
    if (planet.id == activeId) {
      activePlanet = planet;
    }
  });
  return activePlanet;
}

function displayPlanet() {
  let activePlanet = getActivePlanet();

  document.querySelector(".planet_name").textContent =
    activePlanet.name.toUpperCase();
  document.querySelector(".planet_latinName").textContent =
    activePlanet.latinName.toUpperCase();
  document.querySelector(".planet_text").textContent = activePlanet.desc;
  document.querySelector(".planet-info_omkrets").textContent =
    activePlanet.circumference + " km";
  document.querySelector(".planet-info_maxTemp").textContent =
    activePlanet.temp.day + " C";
  document.querySelector(".planet-info_distans").textContent =
    activePlanet.distance + " km";
  document.querySelector(".planet-info_minTemp").textContent =
    activePlanet.temp.night + " C";
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
  let figure3 = document.querySelector(".planet-image_3");
  figure3.style.backgroundColor = color;
  let figure2 = document.querySelector(".planet-image_2");
  figure2.style.backgroundColor = color + "1a";
  let figure1 = document.querySelector(".planet-image_1");
  figure1.style.backgroundColor = color + "0f";

  updateButtonText();
}

function updateButtonText() {
  console.log("1");
  let planet = getActivePlanet();
  console.log(isFavourite(planet));
  if (isFavourite(getActivePlanet())) {
    document.querySelector(".planet-favourite_button").textContent =
      "REMOVE FROM FAVOURITES";
    console.log("good");
  } else {
    document.querySelector(".planet-favourite_button").textContent =
      "ADD TO FAVOURITES";
    console.log("bad");
  }
}

function favouriteButtonClick() {
  let planet = getActivePlanet();
  if (isFavourite(planet)) {
    removeFavourite(planet);
    console.log("removed from favourites");
  } else {
    addPlanetToFavourites(planet);
    console.log("added to favourites");
  }
  updateButtonText();
}

function isFavourite(planet) {
  let favourites = JSON.parse(localStorage.getItem("favourites"));
  let exists = false;
  if (favourites) {
    console.log("2");
    favourites = Array.isArray(favourites) ? favourites : [favourites];
    console.log("3");
    favourites.forEach((favourite) => {
      if (favourite.id === planet.id) {
        console.log("4");
        exists = true;
      }
    });
  }
  return exists;
}

function addPlanetToFavourites(planet) {
  let favourites = JSON.parse(localStorage.getItem("favourites"));
  if (favourites) {
    favourites = Array.isArray(favourites) ? favourites : [favourites];
    favourites.push(planet);
  } else {
    favourites = planet;
  }
  localStorage.setItem("favourites", JSON.stringify(favourites));
}

function removeFavourite(planet) {
  let favourites = JSON.parse(localStorage.getItem("favourites"));
  let index = -1;
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
}
