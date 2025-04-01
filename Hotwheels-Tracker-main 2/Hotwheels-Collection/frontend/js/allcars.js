function displayCars(cars) {
  const carsContainer = document.getElementById("cars-container");
  carsContainer.innerHTML = ""; // Clear previous entries

  cars.forEach((car) => {
    const carElement = document.createElement("div");
    carElement.classList.add("car-card");

    carElement.innerHTML = `
      <div class="w-full h-96 flex flex-col items-center rounded-lg shadow-md bg-white overflow-hidden">
          <div class="w-full h-3/4 flex items-center justify-center bg-gray-100">
              <img src="${car.image}" alt="${car.name}" 
                  class="w-auto h-full object-contain" 
                  onerror="this.src='placeholder.jpg';">
          </div>
          <div class="w-full h-1/4 p-2 flex flex-col items-center justify-between">
              <h3 class="text-sm font-semibold text-center">${car.name} (${car.year})</h3>
              <p class="text-xs text-gray-600 text-center"><strong>Series:</strong> ${car.series}</p>
              <div class="flex items-center gap-3">
                  <button 
                      class="px-3 py-1 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 transition duration-200"
                      onclick="addToCollection('${car.name}', '${car.image}', '${car.year}', '${car.series}')">
                      Add to Collection
                  </button>
                  <button 
                      class="wishlist-btn text-2xl hover:text-red-500 transition duration-200" 
                      onclick="toggleWishlist('${car.name}', '${car.image}', '${car.year}', '${car.series}', this)">
                      🤍
                  </button>
              </div>
          </div>
      </div>
    `;

    carsContainer.appendChild(carElement);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:5001/cars"); // ✅ Fetch data from backend
    const carsData = await response.json(); // ✅ Store all cars data
    displayCars(carsData); // Call displayCars with the fetched data
  } catch (error) {
    console.error("Error fetching cars:", error);
  }
});

// Wishlist Toggle Function
function toggleWishlist(name, image, year, series, button) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const index = wishlist.findIndex((car) => car.name === name);

  if (index > -1) {
    // Remove car from wishlist
    wishlist.splice(index, 1);
    button.innerHTML = "🤍"; // Empty heart
  } else {
    // Add car to wishlist
    wishlist.push({ name, image, year, series });
    button.innerHTML = "❤️"; // Filled heart
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  console.log("Updated Wishlist:", wishlist); // Debugging line
}
function showToast(message) {
  const toast = document.createElement("div");
  toast.classList.add(
    "toast",
    "fixed",
    "bottom-5",
    "left-1/2",
    "transform",
    "-translate-x-1/2",
    "bg-green-500",
    "text-white",
    "py-2",
    "px-4",
    "rounded",
    "shadow-lg"
  );
  toast.innerHTML = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}
