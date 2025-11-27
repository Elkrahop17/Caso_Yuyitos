// automation/step_definitions/common.js
require("dotenv").config();
const { Given } = require("@cucumber/cucumber");

/* =========================================================
   Controlador simulado (mock) SOLO para este archivo
========================================================= */

function createDummyExpect() {
  return {
    ok: async () => {},
    contains: async () => {},
    eql: async () => {},
  };
}

const testController = {
  async navigateTo(_url) {
    // Simulado
  },
  async click(_sel) {},
  async typeText(_sel, _text, _opts) {
    return { pressKey: async () => {} };
  },
  async pressKey(_key) {},
  async takeScreenshot(_path) {},
  expect(_actual) {
    return createDummyExpect();
  },
};

async function cap(n) {
  await testController.takeScreenshot(`automation/evidencias/${n}.png`);
}

/* =========================================================
   Step: Que ingreso al BackOffice como administrador
========================================================= */

Given(/Que ingreso al BackOffice como administrador/i, async function () {
  // En ejecución real iría al BO, aquí solo simulamos
  await testController.navigateTo(process.env.BO_URL || "");
  await cap("common_ingreso_bo");
});
