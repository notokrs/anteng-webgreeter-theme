export class Accounts {
  constructor() {
    this._userImage = document.querySelector("#user-image");
    this._userLabel = document.querySelector("#user-label");
    this._userList = document.querySelector("#user-list");
    this._userListButton = document.querySelector("#btn-user-list");
    this._userListDropdown = document.querySelector("#users-dropdown");
    this._passwordInput = document.querySelector("#pass-input");

    this.guestUser = null;
    this._defaultUser = null;
    this._usersObject = null;

    this.init();
  }

  getDefaultUserName() {
    return this._defaultUser?.username;
  }

  getDefaultAccount() {
    return this._defaultUser;
  }

  setDefaultAccount() {
    const img = this._userImage?.querySelector("img");

    if (!img) return;
    img.src = this._defaultUser?.image ?? "";

    if (img.src.trim().length == 0) img.style.visibility = "hidden";

    img.onerror = function () {
      img.style.visibility = "hidden";
    };
    img.onload = function () {
      img.style.visibility = "";
    };

    if (this._userLabel) {
      const name =
        this._defaultUser?.display_name ??
        this._defaultUser?.username ??
        "No user";

      this._userLabel.innerText = `${name}`;
    }

    if (window.sessions) window.sessions.updateOnStartup();
  }

  updateOnStartup() {
    if (!this._usersObject) return;

    const dfUserName = window.themeData.userName;
    let user = window.lightdm?.users.find(
      (value) => value.username == dfUserName,
    );

    if (!user) {
      user = this._usersObject.length > 0 ? this._usersObject[0] : undefined;
    }

    if (!user || this._usersObject.length <= 1) {
      this._userListButton.style.display = "none";
    }

    this._defaultUser = user ?? null;
    this.setDefaultAccount();
  }

  setGuestAccount() {
    if (window.lightdm?.has_guest_account) {
      const guestName = `guest-account-${Math.floor(Math.random() * 1000)}`;
      this.guestUser = {
        username: guestName,
        display_name: "Guest",
        image: "",
        background: "",
        layout: "",
        layouts: [],
        session: "",
        language: "",
        logged_in: false,
        home_directory: "",
      };
      this._usersObject?.push(this.guestUser);
    }
  }

  setAccountList() {
    if (!this._usersObject || !this._userListDropdown) return;

    this._userListDropdown.innerHTML = "";

    for (const v of this._usersObject) {
      const name = v.display_name;
      const li = document.createElement("li");
      const button = document.createElement("button");

      button.classList.add("btn");
      button.innerText = name;
      button.addEventListener("click", () => {
        this.updateDefaults(v);
        this.setDefaultAccount();
        this._userListDropdown?.classList.toggle("hide");
        this._passwordInput.focus();

        window.authenticate.startAuthentication();
      });

      li.appendChild(button);
      this._userListDropdown.appendChild(li);
    }
  }

  updateDefaults(user) {
    if (!user) return;

    this._defaultUser = user;
    window.themeData.userName = user.username;
    window.themeData.save();
  }

  setKey() {
    this._userListDropdown?.addEventListener("keydown", (ev) => {
      if (ev.key == "Escape") {
        this._userListDropdown?.classList.add("hide");
        this._userListButton?.focus();
      }
    });

    document
      .querySelector("#bottom-container")
      ?.addEventListener("click", (ev) => {
        if (!ev.target) return;

        if (
          ev.target == this._userListButton ||
          ev.target.parentElement == this._userListButton
        ) {
          this._userListDropdown?.classList.toggle("hide");
        } else if (
          ev.target != this._userList &&
          ev.target.closest(".dropdown") == null
        ) {
          this._userListDropdown?.classList.add("hide");
        }
      });
  }

  init() {
    if (!window.lightdm) return;

    this._usersObject = window.lightdm.users;
    this.updateOnStartup();
    this.setAccountList();
    this.setKey();
  }
}
