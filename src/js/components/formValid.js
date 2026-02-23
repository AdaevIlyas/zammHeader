export function formValid() {
  document.addEventListener("DOMContentLoaded", () => {
    const forms = document.querySelectorAll("form");

    forms.forEach((form) => {
      // ── Текстовые инпуты (.ui-input__field) ──────────────────────────────
      const inputs = form.querySelectorAll(".ui-input__field");

      inputs.forEach((input) => {
        const parent = input.closest(".ui-input");
        if (!parent) return;

        /* Проверка заполненности с учётом маски телефона:
           Inputmask оставляет '_' на незаполненных позициях,
           поэтому для tel считаем поле заполненным только без '_' */
        const isFilled = () => {
          if (input.type === "tel") {
            return input.value.trim() !== "" && !input.value.includes("_");
          }
          return input.value.trim() !== "";
        };

        /* Хотя бы один символ введён (для show-text):
           для tel убираем всё кроме цифр — если длина > 1
           (цифра '7' из '+7' не считается) */
        const hasAnyText = () => {
          if (input.type === "tel") {
            return input.value.replace(/\D/g, "").length > 1;
          }
          return input.value.length > 0;
        };

        /* success: поле заполнено корректно */
        const checkValue = () => {
          // show-text: есть хоть один символ
          if (hasAnyText()) {
            parent.classList.add("show-text");
          } else {
            parent.classList.remove("show-text");
          }

          if (isFilled()) {
            parent.classList.add("success");
            parent.classList.remove("error");
          } else {
            parent.classList.remove("success");
          }
        };

        /* focus */
        input.addEventListener("focus", () => {
          parent.classList.add("focus");
        });

        input.addEventListener("blur", () => {
          parent.classList.remove("focus");
          checkValue();
        });

        input.addEventListener("input", checkValue);

        // Проверить сразу (если поле предзаполнено)
        checkValue();
      });

      // ── Чекбоксы с required (.ui-checkbox__input[required]) ──────────────
      const checkboxes = form.querySelectorAll(
        ".ui-checkbox__input[data-required]"
      );

      checkboxes.forEach((checkbox) => {
        const parent = checkbox.closest(".ui-checkbox");
        if (!parent) return;

        // Снимаем ошибку при смене состояния
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) {
            parent.classList.remove("error");
          }
        });
      });

      // ── Отправка формы ────────────────────────────────────────────────────
      form.addEventListener("submit", (e) => {
        let hasError = false;

        // Проверяем текстовые поля
        inputs.forEach((input) => {
          const parent = input.closest(".ui-input");
          if (!parent) return;

          if (input.hasAttribute("data-required")) {
            const filled =
              input.type === "tel"
                ? input.value.trim() !== "" && !input.value.includes("_")
                : input.value.trim() !== "";

            if (!filled) {
              parent.classList.add("error");
              parent.classList.remove("success");
              hasError = true;
            }
          }
        });

        // Проверяем обязательные чекбоксы
        checkboxes.forEach((checkbox) => {
          const parent = checkbox.closest(".ui-checkbox");
          if (!parent) return;

          if (!checkbox.checked) {
            parent.classList.add("error");
            hasError = true;
          }
        });

        if (hasError) {
          e.preventDefault();
        }
      });
    });
  });
}
