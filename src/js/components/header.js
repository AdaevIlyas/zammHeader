export function openCatalog() {
  const catalogBtn = document.querySelector(".js-open-catalog");
  const catalog = document.querySelector(".header-catalog");

  catalogBtn.addEventListener("click", () => {
    catalog.classList.toggle("active");
    catalogBtn.classList.toggle("active");
  });
}

export function category() {
  const categories = document.querySelectorAll("[data-category]");
  const categoryBtn = document.querySelectorAll("[data-category-open]");

  const events = ["click", "mouseenter"];

  events.forEach((event) => {
    categoryBtn.forEach((item) => {
      item.addEventListener(event, () => {
        clearActives();

        item.classList.add("active");

        const category = item.dataset.categoryOpen;

        document
          .querySelector(`[data-category="${category}"]`)
          .classList.add("active");
      });
    });
  });

  function clearActives() {
    [...categories, ...categoryBtn].forEach((item) => {
      item.classList.remove("active");
    });
  }
}
