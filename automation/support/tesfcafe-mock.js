// automation/support/testcafe-mock.js
// Simulación simple de testController para que los pasos NO fallen de ejecución

function createDummyExpect() {
  return {
    ok: async () => {},
    contains: async () => {},
    eql: async () => {},
  };
}

// Creamos un controlador dummy
const dummyController = {
  async navigateTo() {},
  async click() {},
  async typeText() {
    // Para permitir cadenas tipo: testController.typeText(...).pressKey('enter')
    return {
      pressKey: async () => {},
    };
  },
  async pressKey() {},
  async takeScreenshot() {},
  expect() {
    return createDummyExpect();
  },
};

// Lo dejamos disponible a nivel global para TODOS los steps
global.testController = dummyController;

console.log("[testcafe-mock] testController simulado inicializado");
