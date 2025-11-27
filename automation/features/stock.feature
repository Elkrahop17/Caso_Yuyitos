Feature: Gestión de Stock
  Como administrador quiero controlar el stock de los productos para mantener la disponibilidad actualizada.

  @positivo
  Scenario: SC-STK-01 Incrementar stock correctamente
    Given Que estoy en la pantalla de stock del producto "Aceite 1L Marca X"
    When aumento en 10 unidades
    Then el nuevo stock debe ser 30

  @negativo
  Scenario: SC-STK-02 Disminuir stock en cantidad negativa
    Given Que estoy en la pantalla de stock del producto "Aceite 1L Marca X"
    When intento restar 5 unidades negativas
    Then el sistema muestra mensaje de error y no guarda los cambios

  @positivo
  Scenario: SC-STK-03 Validar actualización automática post venta
    Given Que el producto "Aceite 1L Marca X" tiene stock 30 en tienda
    When se vende 1 unidad
    Then el stock disminuye automáticamente a 29
