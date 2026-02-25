export function burger() {
  const burgerBtn = document.querySelector(".burger-btn");
  const burgerMenu = document.querySelector(".burger-menu");
  const closeBtn = document.querySelector(".burger-menu__close");
  const overlay = document.querySelector(".burger-menu__overlay");
  const body = document.querySelector("body");

  const categories = document.querySelectorAll("[data-burger-category-open]");
  const sublinks = document.querySelectorAll("[data-burger-category]");
  const backBtn = document.querySelector(".burger-menu__sublinks-back");
  const burgerBody = document.querySelector(".burger-menu__body");

  const toggleBurger = () => {
    burgerMenu.classList.toggle("active");
    body.classList.toggle("dis-scroll");
  };

  const closeBurger = () => {
    burgerMenu.classList.remove("active");
    body.classList.remove("dis-scroll");
    resetSublinks();
  };

  window.closeBurger = closeBurger;

  const resetSublinks = () => {
    sublinks.forEach((item) => {
      item.classList.remove("active", "in-place");
    });
    burgerMenu.classList.remove("is-sub-active", "is-sub-active-instant");
    burgerBody.classList.remove("is-sub-active");
    backBtn.classList.remove("active");
  };

  if (burgerBtn) {
    burgerBtn.addEventListener("click", toggleBurger);
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeBurger);
  }

  if (overlay) {
    overlay.addEventListener("click", closeBurger);
  }

  categories.forEach((item) => {
    item.addEventListener("click", () => {
      const categoryId = item.dataset.burgerCategoryOpen;
      const targetSublinks = document.querySelector(
        `[data-burger-category="${categoryId}"]`,
      );

      if (targetSublinks) {
        targetSublinks.classList.add("active");
        backBtn.classList.add("active");
        burgerMenu.classList.add("is-sub-active-instant");

        // Force reflow for animation
        targetSublinks.offsetHeight;

        targetSublinks.classList.add("in-place");

        // When animation ends
        targetSublinks.addEventListener(
          "transitionend",
          () => {
            if (targetSublinks.classList.contains("in-place")) {
              burgerMenu.classList.add("is-sub-active");
              burgerBody.classList.add("is-sub-active");
              // Scroll to top of the sublinks
              document.querySelector(".burger-menu__wrapper").scrollTop = 0;
            }
          },
          { once: true },
        );
      }
    });
  });

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      burgerMenu.classList.remove("is-sub-active", "is-sub-active-instant");
      burgerBody.classList.remove("is-sub-active");

      sublinks.forEach((item) => {
        if (item.classList.contains("active")) {
          item.classList.remove("in-place");
          item.addEventListener(
            "transitionend",
            () => {
              if (!item.classList.contains("in-place")) {
                item.classList.remove("active");
              }
            },
            { once: true },
          );
        }
      });

      backBtn.classList.remove("active");
    });
  }
}
