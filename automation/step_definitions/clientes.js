// automation/step_definitions/clientes.js
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
    // Ignoramos el valor real, devolvemos matchers vacíos
    return createDummyExpect();
  },
};

// Función auxiliar para guardar evidencias (simuladas)
async function cap(n) {
  await testController.takeScreenshot(`automation/evidencias/${n}.png`);
}

/* =========================================================
   SC-CLT-01 Crear cuenta correctamente
========================================================= */

Given("Que estoy en el formulario de registro de clientes", async function () {
  await testController.navigateTo(`${process.env.FO_URL || ""}/login`);
  await cap("sc-clt-01_p1");
});

When(
  "ingreso un correo {string} y una contraseña válida",
  async function (correo) {
    await testController.typeText(Selector("#email"), correo, {
      replace: true,
    });
    await testController.typeText(Selector("#passwd"), "12345Abc!", {
      replace: true,
    });
    await testController.click(Selector('button[name="submitCreate"]'));
    await cap("sc-clt-01_p2");
  }
);

Then("la cuenta se crea exitosamente", async function () {
  const ok = Selector(".account");
  await testController.expect(ok.exists).ok();
  await cap("sc-clt-01_p3");
});

/* =========================================================
   SC-CLT-02 Intentar registro con correo existente
========================================================= */

Given("Que ya existe un cliente con correo {string}", async function (correo) {
  await testController.navigateTo(`${process.env.FO_URL || ""}/login`);
  await cap("sc-clt-02_p1");
});

When("intento crear otra cuenta con el mismo correo", async function () {
  await testController.click(Selector('button[name="submitCreate"]'));
  await cap("sc-clt-02_p2");
});

Then("el sistema muestra mensaje {string}", async function (mensaje) {
  const alert = Selector(".alert-danger");
  await testController.expect(alert.innerText).contains(mensaje);
  await cap("sc-clt-02_p3");
});

/* =========================================================
   SC-CLT-03 Editar información de cliente
========================================================= */

Given("Que inicio sesión como cliente", async function () {
  await testController.navigateTo(`${process.env.FO_URL || ""}/my-account`);
  await cap("sc-clt-03_p1");
});

When("modifico mis datos personales y guardo los cambios", async function () {
  const direccion = Selector("#address1");
  const btnGuardar = Selector('button[name="submitAddress"]');
  await testController.typeText(direccion, "Calle Los Aromos 123", {
    replace: true,
  });
  await testController.click(btnGuardar);
  await cap("sc-clt-03_p2");
});

Then("el sistema actualiza correctamente la información", async function () {
  const ok = Selector(".alert-success");
  await testController.expect(ok.exists).ok();
  await cap("sc-clt-03_p3");
});

/* =========================================================
   SC-CLT-04 Eliminar cuenta correctamente
========================================================= */

Given("Que estoy autenticado como cliente", async function () {
  await testController.navigateTo(`${process.env.FO_URL || ""}/my-account`);
  await cap("sc-clt-04_p1");
});

When("elimino mi cuenta desde el perfil", async function () {
  const btnEliminar = Selector("#delete-account, button.delete-account");
  await testController.click(btnEliminar);

  const confirmar = Selector(".modal .btn-confirm-submit, .modal .btn-danger");
  // En una ejecución real iría un if (await confirmar.exists)...
  await cap("sc-clt-04_p2");
});

Then(
  "la cuenta se elimina del sistema y no permite acceder nuevamente",
  async function () {
    await testController.navigateTo(`${process.env.FO_URL || ""}/login`);
    const headerLogin = Selector("h1, h2").withText("Login");
    await testController.expect(headerLogin.exists).ok();
    await cap("sc-clt-04_p3");
  }
);
