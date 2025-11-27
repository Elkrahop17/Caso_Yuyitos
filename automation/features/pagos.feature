Feature: Gestión de Pagos
  Como administrador quiero registrar y actualizar los pagos de los pedidos para mantener un control correcto.

  @positivo
  Scenario: SC-PAG-01 Marcar pedido como pagado
    Given Que estoy en la pantalla de detalle del pedido "101"
    When cambio su estado a "Pago aceptado"
    Then el pedido se actualiza correctamente

  @negativo
  Scenario: SC-PAG-02 Pedido inexistente
    Given Que no existe el pedido con identificador "999"
    When ingreso un número de pedido inválido
    Then el sistema muestra mensaje de error indicando "pedido no encontrado"