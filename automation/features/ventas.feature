Feature: Gestión de Ventas
  Como cliente quiero realizar compras para adquirir productos disponibles en la tienda.

  @positivo
  Scenario: SC-VTA-01 Compra válida
    Given Que estoy en la tienda y busco el producto "Aceite 1L Marca X"
    When agrego una unidad al carrito y finalizo la compra
    Then se genera un pedido en estado pendiente

  @negativo
  Scenario: SC-VTA-02 Intentar compra sin stock
    Given Que el producto "Aceite Premium" no tiene stock
    When intento comprarlo
    Then el sistema muestra mensaje de error "Producto sin stock"

  @positivo
  Scenario: SC-VTA-03 Compra con descuento aplicado
    Given Que el producto "Aceite 1L Marca X" tiene un descuento activo del 10%
    When realizo la compra del producto
    Then el precio final refleja el descuento aplicado correctamente
