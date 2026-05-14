# TK-001: Definicion del API de cuentas

- **ID:** TK-001
- **Estado:** Ready
- **Prioridad:** Media
- **Historia:** [US-002](./README.md)
- **Unidad de trabajo:** react-base-project

## Descripción

Definir el contrato del endpoint `GET /api/accounts` para proveer el listado de cuentas que consume la landing de resumen.

## Dependencias

- **US-002 landing de resumen** — consumidor principal de la lista de cuentas.

## Referencias

- **Historia:** [US-002 — Landing](./README.md)
- **Technical doc:** [GET /api/accounts](../../../technical-docs/api-accounts.md)

## Plan de implementación

1. Especificar metodo, ruta, formato de respuesta y reglas de negocio de demo para `GET /api/accounts`.
2. Definir el DTO `Account` con campos `id`, `number`, `balance`, `type` y `name` opcional.
3. Documentar valores permitidos de `type`: `saving`, `checking`, `credit-card`.
4. Alinear el contrato con el consumo esperado por la landing y el componente `accountsCarousel`, incluyendo la regla de que para `credit-card` el valor mostrado corresponde al consumo y no al cupo disponible.

## Observaciones

- Se define un contrato para datos de demo; la integracion con sistemas reales queda fuera del alcance de esta tarea.
- Para cuentas de tipo `credit-card`, el valor en `balance` representa consumo acumulado y no cupo disponible.
