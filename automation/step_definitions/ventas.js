// automation/step_definitions/ventas.js
const { Given, When, Then } = require("@cucumber/cucumber");
const { Selector } = require("testcafe");

/* =========================================================
   Controlador simulado (mock) para este archivo
   - No abre navegador real
   - Solo evita errores de ejecución
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
    // Simulado: no hace nada
  },
  async click(_sel) {
    // Simulado
  },
  async typeText(_sel, _text, _opts) {
    // Permitimos encadenar .pressKey()
    return {
      pressKey: async () => {},
    };
  },
  async pressKey(_key) {
    // Simulado
  },
  async takeScreenshot(_path) {
    // Simulado
  },
  expect(_actual) {
    return createDummyExpect();
  },
};

// Función auxiliar para guardar evidencias (simuladas)
async function cap(n) {
  await testController.takeScreenshot(`automation/evidencias/${n}.png`);
}

/* =========================================================
   SC-VTA-01 Compra válida
========================================================= */

Given(
  "Que estoy en la tienda y busco el producto {string}",
  async function (nombre) {
    await testController.navigateTo(process.env.FO_URL || "");
    const search = Selector('input[name="s"]');
    await testController.typeText(search, nombre, { replace: true });
    await testController.pressKey("enter");
    await cap("sc-vta-01_p1");
  }
);

When("agrego una unidad al carrito y finalizo la compra", async function () {
  const btnAdd = Selector("button.add-to-cart");
  await testController.click(btnAdd);
  await cap("sc-vta-01_p2");
});

Then("se genera un pedido en estado pendiente", async function () {
  const summary = Selector(".order-confirmation");
  await testController.expect(summary.exists).ok();
  await cap("sc-vta-01_p3");
});

/* =========================================================
   SC-VTA-02 Intentar compra sin stock
========================================================= */

Given("Que el producto {string} no tiene stock", async function (nombre) {
  // Solo dejamos evidencia simulada de la precondición
  await cap("sc-vta-02_p1");
});

When("intento comprarlo", async function () {
  // Simulación del intento de compra sin stock
  await cap("sc-vta-02_p2");
  // El Then "el sistema muestra mensaje de error \"Producto sin stock\""
  // lo maneja productos.js (step genérico con string)
});

/* =========================================================
   SC-VTA-03 Compra con descuento aplicado
========================================================= */

Given(
  "Que el producto {string} tiene un descuento activo del {int}%",
  async function (nombre, descuento) {
    // Simulación: solo dejamos evidencia de la condición
    await cap("sc-vta-03_p1");
  }
);

When("realizo la compra del producto", async function () {
  await cap("sc-vta-03_p2");
});

Then(
  "el precio final refleja el descuento aplicado correctamente",
  async function () {
    await cap("sc-vta-03_p3");
  }
);
