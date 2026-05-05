# Glosario (producto)

Definiciones breves para alinear producto y desarrollo. La implementación técnica detallada vive en código y, cuando aplique, en `docs/product/technical-docs/`.

---

## OTP

Código de un solo uso, típicamente numérico y de corta duración, usado para confirmar una operación sensible. En esta base de proyecto, la verificación demo usa un mock con código fijo documentado en la UI de desarrollo.

---

## Sesión simulada (mock)

Estado de sesión representado por la cookie `mock_session` en la demo; **NO** constituye autenticación real ni cumple requisitos de seguridad de producción.

---

## Transferencia

Operación de envío de fondos entre cuentas del titular mostradas en la demo. La preparación y confirmación usan servicios mock en el cliente; los saldos y cuentas son datos de demostración.
