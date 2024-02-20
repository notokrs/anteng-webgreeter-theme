export class Authenticate {
  constructor() {
    this._inputPassword = document.querySelector("#pass-input");
    this._showPassword = document.querySelector("#show-pass");
    this._response = document.querySelector("#response");
    this._password = "";
    this.init();
  }

  submit() {
    this._inputPassword?.addEventListener("keydown", (ev) => {
      if (ev.key == "Enter") {
        this._password = this._inputPassword?.value ?? "";
        this.doRespond();
      }
    });
  }

  setAuthenticationDone() {
    window.lightdm?.authentication_complete.connect(() => {
      if (window.lightdm?.is_authenticated) {
        this._authenticationDone();
      } else {
        this._authenticationFailed();
      }
    });
  }

  setShowPassword() {
    this._showPassword.addEventListener("click", function() {
      const passwordInput = document.querySelector("#pass-input");

      if (passwordInput.type == "password") {
        passwordInput.type = "text";

        this.classList.remove("mdi-eye-outline");
        this.classList.add("mdi-eye-off-outline");
      } else {
        passwordInput.type = "password";

        this.classList.remove("mdi-eye-off-outline");
        this.classList.add("mdi-eye-outline");
      }

      passwordInput.focus();
    });
  }

  doRespond() {
    if (!this._inputPassword) return;

    const user = window.accounts.getDefaultAccount();

    this._inputPassword.blur();
    this._inputPassword.disabled = true;

    if (
      user == window.accounts.guestUser &&
      window.lightdm?.has_guest_account
    ) {
      window.lightdm.authenticate_as_guest();
    } else {
      window.lightdm?.respond(this._password);
    }
  }

  startAuthentication() {
    window.lightdm?.cancel_authentication();

    const user = window.accounts.getDefaultAccount();
    if (user == window.accounts.guestUser && window.lightdm?.has_guest_account)
      return;

    window.lightdm?.authenticate(user?.username ?? null);
  }

  async _authenticationDone() {
    this._response.classList.toggle("hide");
    this._response.innerHTML = "<p>Login sukses, mengalihkan</p>";
    await window.wait(500);

    const defSession = window.sessions.getSelectedSession();
    const body = document.querySelector("body");

    if (body) body.style.opacity = "0";
    await window.wait(1000);

    // console.log("Session started with", defSession?.key);
    window.lightdm?.start_session(defSession?.key ?? null);
  }

  async _authenticationFailed() {
    this.startAuthentication();

    this._response.classList.toggle("hide");
    this._response.innerHTML = "<p>Login gagal</p>";

    if (this._inputPassword) {
      this._inputPassword.blur();
      this._inputPassword.value = "";
      this._inputPassword.disabled = false;
      this._inputPassword.focus();
    }

    await window.wait(5000);
    this._response.classList.toggle("hide");
  }

  init() {
    this.submit();
    this.setAuthenticationDone();
    this.setShowPassword();
    // console.log("Start authentication");
    this.startAuthentication();
  }
}
