export function legalCalc() {
  const parent = document.querySelector(".header");
  const block = document.querySelector(".header__head-left");
  const positionPoint = document.querySelector(".header__catalog");
  if (!parent || !block || !positionPoint) return;

  //   выключить <=620px
  const media = window.matchMedia("(min-width: 1221px)");

  function init() {
    if (!media.matches) {
      block.style.maxWidth = "";
      return;
    }

    const parentStyle = getComputedStyle(parent);
    const parentPaddingLeft = parseInt(parentStyle.paddingLeft);

    const positionPointRect = positionPoint.getBoundingClientRect();
    const place =
      positionPointRect.left + positionPointRect.width - parentPaddingLeft;

    block.style.maxWidth = place + "px";
  }

  init();
  window.addEventListener("resize", init);
}

export function searchCalc() {
  const search = document.querySelector(".js-search-open");
  const positionPoint = document.querySelector(".header__nav");
  const searchModal = document.querySelector(".search-modal");
  const searchModalField = searchModal.querySelector(".search-inner");

  if (!search || !positionPoint || !searchModalField) return;

  // Работаем в диапазоне от начала десктопа до 1921px
  const media = window.matchMedia("(min-width: 1920px)");

  function init() {
    if (!media.matches) {
      search.style.marginRight = "";
      searchModal.style.paddingLeft = "";
      searchModalField.style.maxWidth = "";
      return;
    }

    // Сбрасываем margin для корректного замера текущего положения
    search.style.marginRight = "";
    searchModal.style.paddingLeft = "";
    searchModalField.style.maxWidth = "";

    const searchRect = search.getBoundingClientRect();
    const positionPointRect = positionPoint.getBoundingClientRect();

    const diff = positionPointRect.right - searchRect.right;

    search.style.marginRight = -diff + "px";
    searchModal.style.paddingLeft = searchRect.left + "px";
    searchModalField.style.maxWidth = search.clientWidth + "px";
  }

  init();
  window.addEventListener("resize", init);
}
