let scrollPosition = 0;

export function disable_scroll() {
  scrollPosition = window.scrollY;
  document.body.style.top = `-${scrollPosition}px`;
  document.body.classList.add("dis-scroll");
}

export function enable_scroll() {
  document.body.classList.remove("dis-scroll");
  document.body.style.top = "";
  window.scrollTo(0, scrollPosition);
}
