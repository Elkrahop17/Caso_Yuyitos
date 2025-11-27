Feature: Gestión de Productos
  Como administrador quiero gestionar los productos para mantener actualizado el catálogo.

  @positivo
  Scenario: SC-PRD-01 Crear producto correctamente
    Given Que ingreso al BackOffice como administrador
    And Que estoy en el módulo Productos del BackOffice
    When creo un producto con nombre "Aceite 1L Marca X", precio "1400" y stock "20"
    Then el producto se guarda correctamente
    And se muestra disponible en el FrontOffice

  @negativo
  Scenario: SC-PRD-02 Validar campos vacíos
    Given Que ingreso al BackOffice como administrador
    And Que estoy en el módulo Productos del BackOffice
    When intento crear un producto sin nombre
    Then el sistema muestra mensaje de error
    And el producto no se guarda

  @positivo
  Scenario: SC-PRD-03 Editar producto con cambios válidos
    Given Que existe un producto registrado
    When modifico su precio y guardo
    Then los cambios son visibles en BackOffice y FrontOffice

  @positivo
  Scenario: SC-PRD-04 Eliminar producto correctamente
    Given Que existe un producto en el catálogo
    When elimino el producto desde el BackOffice
    Then el producto desaparece del listado y del FrontOffice
