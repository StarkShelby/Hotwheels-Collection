document.addEventListener("DOMContentLoaded", () => {
  const myCollectionNav = document.getElementById("mycollection-navbar");

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-collection")) {
      const card = event.target.closest(".car-card");
      if (!card || !myCollectionNav) return;

      // Clone the card for animation
      const clone = card.cloneNode(true);
      document.body.appendChild(clone);
      clone.style.position = "fixed";
      clone.style.zIndex = "1000";
      clone.style.pointerEvents = "none"; // Prevent interaction

      // Get card & nav positions
      const cardRect = card.getBoundingClientRect();
      const navRect = myCollectionNav.getBoundingClientRect();

      // Position clone over original
      clone.style.top = `${cardRect.top}px`;
      clone.style.left = `${cardRect.left}px`;
      clone.style.width = `${cardRect.width}px`;
      clone.style.height = `${cardRect.height}px`;
      clone.style.transition =
        "transform 0.8s ease-in-out, opacity 0.8s ease-in-out";

      // Small delay before animation starts
      setTimeout(() => {
        clone.style.transform = `translate(${navRect.left - cardRect.left}px, ${
          navRect.top - cardRect.top
        }px) rotate(30deg) scale(0.5)`;
        clone.style.opacity = "0.2";
      }, 50);

      // Remove the clone after animation
      setTimeout(() => {
        clone.remove();
      }, 900);
    }
  });
});
