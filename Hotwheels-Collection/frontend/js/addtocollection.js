function fadeInPage() {
  document.body.style.opacity = 0.7;
}

function addToCollection(carName, carImage, carYear, carSeries) {
  alert(`${carName} added to your collection!`);

  let collection = JSON.parse(localStorage.getItem("myCollection")) || [];

  if (!collection.some((car) => car.name === carName)) {
    // Prevent duplicates
    collection.push({
      name: carName,
      image: carImage,
      year: carYear,
      series: carSeries,
    });
    localStorage.setItem("myCollection", JSON.stringify(collection));
    console.log("Car added:", collection); // Debugging log
  } else {
    console.log("Car already exists in collection.");
  }
}
