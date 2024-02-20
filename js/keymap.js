export class Keymap {
  constructor() {
    this._container = document.querySelector("#top-container");

    this._container.focus();
    this._container.addEventListener("keydown", function () {
      const topContainer = document.querySelector("#top-container");
      const bottomContainer = document.querySelector("#bottom-container");
      const passwordInput = document.querySelector("#pass-input");

      bottomContainer.style.opacity = 1;

      if (bottomContainer.style.opacity == 1) {
        topContainer.style.opacity = 0;
        passwordInput.focus();

        bottomContainer.addEventListener("keydown", function (ev) {
          if (ev.key == "Escape") {
            bottomContainer.style.opacity = 0;
            topContainer.style.opacity = 1;
            topContainer.focus();
          }
        });
      }
    });
  }
}
