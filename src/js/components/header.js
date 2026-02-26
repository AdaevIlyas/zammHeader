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
  const categoriesBack = document.querySelector(".js-header-catalog-back");
  const categoriesWrapper = document.querySelector(
    ".js-header-catalog-wrapper",
  );

  let categoryOpen = "";

  let timeout = null;

  const events = ["click", "mouseenter"];

  events.forEach((event) => {
    if (document.body.clientWidth <= 620 && event === "mouseenter") {
      return;
    }

    categoryBtn.forEach((item) => {
      item.addEventListener(event, () => {
        clearActives();

        item.classList.add("active");
        categoriesWrapper.classList.add("active");

        const category = item.dataset.categoryOpen;

        categoryOpen = category;

        if (timeout) {
          clearTimeout(timeout);
        }

        document
          .querySelector(`[data-category="${category}"]`)
          .classList.add("active");
      });
    });
  });

  categoriesBack.addEventListener("click", () => {
    categories.forEach((category) => {
      if (category.dataset.category === categoryOpen) {
        if (timeout) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
          category.classList.remove("active");
        }, 300);
      }
    });
    categoriesWrapper.classList.remove("active");

    categoryOpen = "";
  });

  function clearActives() {
    categoriesWrapper.classList.remove("active");
    [...categories, ...categoryBtn].forEach((item) => {
      item.classList.remove("active");
    });

    categoryOpen = "";
  }
}
