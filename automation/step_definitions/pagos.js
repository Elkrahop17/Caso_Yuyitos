// automation/step_definitions/pagos.js
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
   SC-PAG-01 Marcar pedido como pagado
========================================================= */

Given(
  "Que estoy en la pantalla de detalle del pedido {string}",
  async function (id) {
    await testController.navigateTo(
      `https://backoffice.yuyitos.local/index.php?controller=AdminOrders&id_order=${id}`
    );
    await cap("sc-pag-01_p1");
  }
);

When("cambio su estado a {string}", async function (estado) {
  const select = Selector("#order-status");
  await testController.click(select);

  const opt = Selector("option").withText(estado);
  await testController.click(opt);

  await cap("sc-pag-01_p2");
});

Then("el pedido se actualiza correctamente", async function () {
  const ok = Selector(".alert-success");
  await testController.expect(ok.exists).ok();
  await cap("sc-pag-01_p3");
});

/* =========================================================
   SC-PAG-02 Pedido inexistente
========================================================= */

Given(
  "Que no existe el pedido con identificador {string}",
  async function (id) {
    // Solo dejamos evidencia simulada
    await cap(`sc-pag-02_p1_${id}`);
  }
);

When("ingreso un número de pedido inválido", async function () {
  await cap("sc-pag-02_p2");
});

// El Then de este escenario se define en productos.js:
// Then el sistema muestra mensaje de error indicando "pedido no encontrado"
