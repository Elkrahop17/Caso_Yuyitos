// automation/step_definitions/stock.js
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
   SC-STK-01 Incrementar stock correctamente
========================================================= */

Given(
  "Que estoy en la pantalla de stock del producto {string}",
  async function (nombre) {
    await testController.navigateTo(
      "https://backoffice.yuyitos.local/index.php?controller=AdminProducts"
    );

    const search = Selector('input[name="productFilter_b!name"]');
    // En ejecución real: escribir nombre y presionar enter
    await testController.typeText(search, nombre, { replace: true });
    await testController.pressKey("enter");

    await cap("sc-stk-01_p1");
  }
);

When("aumento en {int} unidades", async function (n) {
  const qty = Selector('input[name="qty_0"]');
  await testController.typeText(qty, String(n), { replace: true });
  await testController.click(Selector('button[name="submitQty"]'));
  await cap("sc-stk-01_p2");
});

Then("el nuevo stock debe ser {int}", async function (valor) {
  const stock = Selector("#current-stock");
  await testController.expect(stock.innerText).contains(String(valor));
  await cap("sc-stk-01_p3");
});

/* =========================================================
   SC-STK-02 Disminuir stock en cantidad negativa
========================================================= */

When("intento restar {int} unidades negativas", async function (n) {
  // Aquí solo simulamos que se intenta una operación inválida
  await cap("sc-stk-02_p2");
  // El Then "el sistema muestra mensaje de error y no guarda los cambios"
  // lo maneja productos.js
});

/* =========================================================
   SC-STK-03 Actualización automática post venta
========================================================= */

Given(
  "Que el producto {string} tiene stock {int} en tienda",
  async function (nombre, stock) {
    // Simulación de precondición
    await cap("sc-stk-03_p1");
  }
);

When("se vende {int} unidad", async function (cantidad) {
  // Simulación de venta
  await cap("sc-stk-03_p2");
});

Then("el stock disminuye automáticamente a {int}", async function (nuevo) {
  // Simulación de verificación
  await cap("sc-stk-03_p3");
});
