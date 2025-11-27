Feature: Gestión de Clientes
  Como cliente quiero registrar, editar y eliminar mi cuenta para mantener actualizados mis datos.

  @positivo
  Scenario: SC-CLT-01 Crear cuenta correctamente
    Given Que estoy en el formulario de registro de clientes
    When ingreso un correo "usuario@yuyitos.cl" y una contraseña válida
    Then la cuenta se crea exitosamente

  @negativo
  Scenario: SC-CLT-02 Intentar registro con correo existente
    Given Que ya existe un cliente con correo "usuario@yuyitos.cl"
    When intento crear otra cuenta con el mismo correo
    Then el sistema muestra mensaje "correo ya registrado"

  @positivo
  Scenario: SC-CLT-03 Editar información de cliente
    Given Que inicio sesión como cliente
    When modifico mis datos personales y guardo los cambios
    Then el sistema actualiza correctamente la información

  @positivo
  Scenario: SC-CLT-04 Eliminar cuenta correctamente
    Given Que inicio sesión como cliente
    When elimino mi cuenta desde el perfil
    Then la cuenta se elimina del sistema y no permite acceder nuevamente
