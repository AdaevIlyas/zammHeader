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
