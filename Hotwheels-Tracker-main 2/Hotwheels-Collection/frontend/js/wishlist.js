// Toggle wishlist function (added/removes car and updates button state)
function toggleWishlist(name, image, year, series, button) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const index = wishlist.findIndex((car) => car.name === name);

  if (index > -1) {
    // Remove car from wishlist
    wishlist.splice(index, 1);
    button.innerHTML = "🤍"; // Empty heart
    showToast(`Removed ${name} from wishlist`); // Show toast when car is removed
  } else {
    // Add car to wishlist
    wishlist.push({ name, image, year, series });
    button.innerHTML = "❤️"; // Filled heart
    showToast(`Added ${name} to wishlist`); // Show toast when car is added
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  console.log("Updated Wishlist:", wishlist);

  // Update UI
  updateWishlistUI();
}

// Initialize heart state based on whether the car is in the wishlist
function initializeWishlistHeartState() {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  // For each car card, check if it's in the wishlist and set heart icon accordingly
  const heartButtons = document.querySelectorAll(".wishlist-btn");
  heartButtons.forEach((button) => {
    const carName = button.dataset.carName;
    const carInWishlist = wishlist.some((car) => car.name === carName);

    // Set the heart to red if the car is in the wishlist, else empty
    if (carInWishlist) {
      button.innerHTML = "❤️"; // Filled heart
    } else {
      button.innerHTML = "🤍"; // Empty heart
    }
  });
}

// Display wishlist items and provide remove and transfer buttons
function updateWishlistUI() {
  const wishlistContainer = document.getElementById("wishlist-container");
  if (!wishlistContainer) return;

  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlistContainer.innerHTML = "";

  if (wishlist.length === 0) {
    wishlistContainer.innerHTML = `<p>No cars in wishlist.</p>`;
    return;
  }

  // Inside your updateWishlistUI() function

  wishlist.forEach((car) => {
    const carElement = document.createElement("div");
    carElement.classList.add("car-card");
    carElement.innerHTML = `
    <img src="${car.image}" alt="${car.name}" class="car-image">
    <h3>${car.name} (${car.year})</h3>
    <p>Series: ${car.series}</p>
    <button onclick="removeFromWishlist('${car.name}')">🤍</button>
    <div class="buttons-container">
      <button class="remove-btn" onclick="removeFromWishlist('${car.name}')">Remove from Wishlist</button>
      <button class="transfer-btn" onclick="transferToCollection('${car.name}', '${car.image}', '${car.year}', '${car.series}')">Transfer to Collection</button>
    </div>
  `;
    wishlistContainer.appendChild(carElement);
  });
}

// Remove car from wishlist
window.removeFromWishlist = (name) => {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlist = wishlist.filter((car) => car.name !== name);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  updateWishlistUI();
};

// Transfer car to collection
window.transferToCollection = (name, image, year, series) => {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  let collection = JSON.parse(localStorage.getItem("myCollection")) || [];

  // Find the car from wishlist
  const carIndex = wishlist.findIndex((car) => car.name === name);
  if (carIndex > -1) {
    // Move car from wishlist to collection
    const car = wishlist.splice(carIndex, 1)[0]; // Remove car from wishlist
    collection.push(car); // Add car to collection

    // Update localStorage
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    localStorage.setItem("myCollection", JSON.stringify(collection));

    // Update the UI
    updateWishlistUI();
    updateCollectionUI();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // Initialize heart state when page loads
  initializeWishlistHeartState();

  // Fetch and update wishlist UI
  updateWishlistUI();
});

// Show a popup notification (toast) for 3 seconds
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
