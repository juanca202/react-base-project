# TK-002: Definicion del API de actividad reciente

- **ID:** TK-002
- **Estado:** Ready
- **Prioridad:** Media
- **Historia:** [US-002](./README.md)
- **Unidad de trabajo:** react-base-project

## Descripción

Definir el contrato del endpoint `GET /api/activity` para proveer la actividad reciente que consume la landing de resumen.

## Dependencias

- **US-002 landing de resumen** — consumidor principal de la lista de movimientos recientes.

## Referencias

- **Historia:** [US-002 — Landing](./README.md)
- **Technical doc:** [GET /api/activity](../../../technical-docs/api-activity.md)

## Plan de implementación

1. Especificar metodo, ruta, formato de respuesta y reglas de negocio de demo para `GET /api/activity`.
2. Definir el DTO `Movement` con campos `accountNumber`, `date`, `description` y `amount`.
3. Alinear formato y contenido del contrato con la seccion de actividad reciente de la landing.
4. Documentar ejemplos de respuesta para movimientos con importes positivos y negativos.

## Observaciones

- Se define un contrato para datos de demo; la integracion con sistemas reales queda fuera del alcance de esta tarea.
