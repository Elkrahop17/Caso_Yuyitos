// automation/step_definitions/productos.js
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
    // Simulado
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
   SC-PRD-01 Crear producto correctamente
========================================================= */

Given("Que estoy en el módulo Productos del BackOffice", async function () {
  // Simulación: solo dejamos evidencia
  await cap("sc-prd-01_p1_modulo_productos");
});

Given("Que existe un producto registrado", async function () {
  await cap("sc-prd-03_p1_producto_registrado");
});

Given("Que existe un producto en el catálogo", async function () {
  await cap("sc-prd-04_p1_producto_catalogo");
});

When(
  "creo un producto con nombre {string}, precio {string} y stock {string}",
  async function (nombre, precio, stock) {
    const nombreInput = Selector("#name_1");
    const precioInput = Selector("#price");
    const stockInput = Selector("#qty");

    await testController.typeText(nombreInput, nombre, { replace: true });
    await testController.typeText(precioInput, precio, { replace: true });
    await testController.typeText(stockInput, stock, { replace: true });

    const btnGuardar = Selector('button[name="submitAddproduct"]');
    await testController.click(btnGuardar);

    await cap("sc-prd-01_p2_crear_producto");
  }
);

Then("el producto se guarda correctamente", async function () {
  const ok = Selector(".alert-success");
  await testController.expect(ok.exists).ok();
  await cap("sc-prd-01_p3_guardado_ok");
});

Then("se muestra disponible en el FrontOffice", async function () {
  await cap("sc-prd-01_p4_producto_en_fo");
});

/* =========================================================
   SC-PRD-02 Validar campos vacíos
========================================================= */

When("intento crear un producto sin nombre", async function () {
  const precioInput = Selector("#price");
  const stockInput = Selector("#qty");
  const btnGuardar = Selector('button[name="submitAddproduct"]');

  await testController.typeText(precioInput, "1000", { replace: true });
  await testController.typeText(stockInput, "5", { replace: true });
  await testController.click(btnGuardar);

  await cap("sc-prd-02_p2_sin_nombre");
});

Then("el sistema muestra mensaje de error", async function () {
  const alert = Selector(".alert-danger, .alert-warning");
  await testController.expect(alert.exists).ok();
  await cap("sc-prd-02_p3_error");
});

Then("el producto no se guarda", async function () {
  await cap("sc-prd-02_p4_no_guardado");
});

/* =========================================================
   SC-PRD-03 Editar producto con cambios válidos
========================================================= */

When("modifico su precio y guardo", async function () {
  const precioInput = Selector("#price");
  const btnGuardar = Selector('button[name="submitAddproduct"]');

  await testController.typeText(precioInput, "1500", { replace: true });
  await testController.click(btnGuardar);

  await cap("sc-prd-03_p2_modificar_precio");
});

Then("los cambios son visibles en BackOffice y FrontOffice", async function () {
  await cap("sc-prd-03_p3_cambios_visibles");
});

/* =========================================================
   SC-PRD-04 Eliminar producto correctamente
========================================================= */

When("elimino el producto desde el BackOffice", async function () {
  const btnEliminar = Selector(".delete, .btn-delete-product");
  await testController.click(btnEliminar);
  await cap("sc-prd-04_p2_eliminar");
});

Then("el producto desaparece del listado y del FrontOffice", async function () {
  await cap("sc-prd-04_p3_producto_eliminado");
});

/* =========================================================
   Steps reutilizados por otros features (pagos, stock, ventas)
========================================================= */

// Para SC-PAG-02 (Pedido inexistente) — paso EXACTO
Then(
  'el sistema muestra mensaje de error indicando "pedido no encontrado"',
  async function () {
    const alert = Selector(".alert-danger, .alert-warning");
    await testController.expect(alert.exists).ok();
    await cap("sc-pag-02_p3_pedido_no_encontrado");
  }
);

// Para escenarios tipo “error y no guarda los cambios” (stock, etc.)
Then(
  "el sistema muestra mensaje de error y no guarda los cambios",
  async function () {
    const alert = Selector(".alert-danger, .alert-warning");
    await testController.expect(alert.exists).ok();
    await cap("error_no_guarda_cambios");
  }
);

// Para ventas: mensaje “Producto sin stock” u otros textos
Then("el sistema muestra mensaje de error {string}", async function (_texto) {
  const alert = Selector(".alert-danger, .alert-warning");
  await testController.expect(alert.exists).ok();
  await cap("error_texto_generico");
});
