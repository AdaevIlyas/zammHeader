import { disable_scroll, enable_scroll } from "../functions/scroll";

export function search() {
  const searchOpen = document.querySelector(".js-search-open");
  const searchBlock = document.querySelector(".js-search-block");
  const searchModal = document.querySelector(".search-modal");
  const searchInput = searchBlock.querySelector("input");
  const searchMenu = searchModal.querySelector(".search-menu");
  const searchOverlay = searchModal.querySelector(".search-overlay");
  const searchClear = searchBlock.querySelector(".search__clear");

  searchOpen.addEventListener("click", () => {
    searchBlock.classList.add("active");
    searchModal.classList.add("active");
    searchMenu.classList.add("active");
    searchOverlay.classList.add("active");

    disable_scroll();
    searchInput.focus();
  });

  searchOverlay.addEventListener("click", () => {
    searchBlock.classList.remove("active");
    searchModal.classList.remove("active");
    searchMenu.classList.remove("active");
    searchOverlay.classList.remove("active");

    enable_scroll();
  });

  searchInput.addEventListener("input", () => {
    if (searchInput.value.length > 0) {
      searchBlock.classList.add("active-input");
    } else {
      searchBlock.classList.remove("active-input");
    }
  });

  searchClear.addEventListener("click", () => {
    searchInput.value = "";
    searchBlock.classList.remove("active-input");
  });
}
