import { DateTime } from "./datetime.js";
import { Keymap } from "./keymap.js";
import { Battery } from "./battery.js";
import { Authenticate } from "./authenticate.js";
import { Accounts } from "./accounts.js";
import { Data } from "./data.js";
import { Sessions } from "./session.js";
import { Power } from "./power.js";
import "./mock.js";

async function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

window.wait = wait;

async function initGreeter() {
  if (window.greeter_config?.greeter.debug_mode) {
    // Run debug
  }

  window.themeData = new Data();
  window.datetime = new DateTime();
  window.keymap = new Keymap();
  window.battery = new Battery();
  window.accounts = new Accounts();
  window.authenticate = new Authenticate();
  window.sessions = new Sessions();
  window.power = new Power();
}

if (window._ready_event === undefined) {
  window._ready_event = new Event("GreeterReady");
  window.dispatchEvent(window._ready_event);
}

window.addEventListener("GreeterReady", () => {
  initGreeter();
});
