function addToCollection(carName, carImage, carYear, carSeries) {
  let collection = JSON.parse(localStorage.getItem("myCollection")) || [];

  if (!collection.some((car) => car.name === carName)) {
    collection.push({
      name: carName,
      image: carImage,
      year: carYear,
      series: carSeries,
    });
    localStorage.setItem("myCollection", JSON.stringify(collection));

    animateFlyingCar(carName, carImage); // Call animation function
  }
}

function animateFlyingCar(carName, carImage) {
  console.log(`Animating ${carName} to My Collection`); // Debugging

  const myCollectionNav = document.getElementById("my-collection-nav");

  if (!myCollectionNav) {
    console.error("My Collection navbar not found.");
    return;
  }

  // Create a flying car element
  const flyingCar = document.createElement("img");
  flyingCar.src = carImage;
  flyingCar.classList.add("flying-car-animation");
  document.body.appendChild(flyingCar);

  // Get positions
  const button = document.querySelector(
    `[data-car-name="${carName}"] .add-to-collection`
  );
  if (!button) {
    console.error("Car button not found.");
    return;
  }

  const buttonRect = button.getBoundingClientRect();
  const navRect = myCollectionNav.getBoundingClientRect();

  // Set initial position
  flyingCar.style.position = "fixed";
  flyingCar.style.top = `${buttonRect.top}px`;
  flyingCar.style.left = `${buttonRect.left}px`;
  flyingCar.style.width = "80px";
  flyingCar.style.height = "auto";
  flyingCar.style.zIndex = "1000";

  // Start animation
  setTimeout(() => {
    flyingCar.style.transition = "transform 0.8s ease-in-out, opacity 0.8s";
    flyingCar.style.transform = `translate(${
      navRect.left - buttonRect.left
    }px, ${navRect.top - buttonRect.top}px) scale(0.5)`;
    flyingCar.style.opacity = "0";
  }, 50);

  // Remove the clone after animation
  setTimeout(() => {
    flyingCar.remove();
  }, 900);
}
