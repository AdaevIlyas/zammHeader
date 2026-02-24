import { disable_scroll, enable_scroll } from "../functions/scroll";

const modals = document.querySelectorAll("[data-modal]");
const openBtns = document.querySelectorAll("[data-modal-open]");

export function modal() {
  if (!modals.length) return;

  // Открытие модалки по data-modal-open="callback" / "email"
  openBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.modalOpen;
      openModal(target);
    });
  });

  // Закрытие по кнопке .modal__close
  modals.forEach((modal) => {
    const closeBtn = modal.querySelector(".modal__close");
    const overlay = modal.querySelector(".modal__overlay");

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        closeModal(modal);
      });
    }

    // Закрытие по клику на оверлей
    if (overlay) {
      overlay.addEventListener("click", () => {
        closeModal(modal);
      });
    }
  });

  // Закрытие по нажатию Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const activeModal = document.querySelector(".modal.active");
      if (activeModal) {
        closeModal(activeModal);
      }
    }
  });
}

export function openModal(name) {
  const target = document.querySelector(`[data-modal="${name}"]`);
  if (!target) return;

  // Закрыть все открытые модалки перед открытием новой
  modals.forEach((m) => m.classList.remove("active"));

  target.classList.add("active");
  disable_scroll();
}

export function closeModal(modal) {
  modal.classList.remove("active");
  enable_scroll();
}
