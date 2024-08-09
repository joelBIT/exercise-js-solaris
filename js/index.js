document.addEventListener("DOMContentLoaded", function () {
  getAPIKey();

  // Function to fetch API key and planet data
  //Nino
  async function getAPIKey() {
    try {
      let keyResponse = await fetch("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys", {
        method: "POST",
      });

      const key = await keyResponse.json();

      // Fetch the planet data using the API key
      let resp = await fetch("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies", {
        method: "GET",
        headers: { "x-zocom": key.key },
      });

      const planets = await resp.json();

      // Update the planet names in the HTML
      //Nino
      updatePlanetNames(planets.bodies);
    } catch (error) {
      console.log(error);
    }
  }

  // Function to update the planet names in the HTML
  //Nino
  function updatePlanetNames(bodies) {
    const planetElements = document.querySelectorAll("nav section");
    // Iterate through each planet data from the API response
    bodies.forEach((body, index) => {
      if (planetElements[index]) {
        planetElements[index].setAttribute("data-name", body.name);
        planetElements[index].addEventListener("click", () => {
          localStorage.setItem("activePlanetId", body.id);
          window.location.assign("/singlePlanet.html");
        });
      }
    });
  }


  // Add mouseover and mouseout event listeners to each planet
  // Nino
  const planets = document.querySelectorAll("nav section");
  planets.forEach((planet) => {
    planet.addEventListener("mouseover", function () {
      const planetName = this.getAttribute("data-name");
      this.style.cursor = "pointer";

      let nameElement = this.querySelector(".planet-name");

      if (!nameElement) {
        nameElement = document.createElement("div");
        nameElement.classList.add("planet-name");
        this.appendChild(nameElement);
      }

      // Set the text content of the planet-name element to the planet name
      nameElement.textContent = planetName;
      nameElement.style.display = "block";
    });

    // Mouseout event to hide the planet name
    planet.addEventListener("mouseout", function () {
      const nameElement = this.querySelector(".planet-name");
      // Hide the planet-name element if it exists
      if (nameElement) {
        nameElement.style.display = "none";
      }
    });
  });
});
