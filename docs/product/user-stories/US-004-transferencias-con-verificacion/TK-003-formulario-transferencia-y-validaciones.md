# TK-003: Formulario de transferencia y validaciones de negocio

- **ID:** TK-003
- **Estado:** Ready
- **Prioridad:** Alta
- **Historia:** [US-004](./README.md)
- **Unidad de trabajo:** react-base-project

## Descripción

Implementar la segunda etapa del flujo para captura de cuenta origen, cuenta destino, monto y descripción opcional, aplicando validaciones obligatorias de negocio y accesibilidad de errores según **RN-06**, **RN-07**, **RN-08** y **RN-12**.

## Dependencias

- **Orquestación del flujo por etapas** — transición al paso de verificación solo con datos válidos.
- **Datos mock de cuentas disponibles** — opciones para origen y destino durante la demo.
- **Modal o mecanismo de selección de cuentas** — interacción para elegir cuentas conforme al diseño de apoyo.
- **Reglas de validación del formulario** — bloqueo de envío en combinaciones inválidas.

## Referencias

- **Historia:** [US-004 — Transferencias entre cuentas con verificación previa](./README.md)
- **Diseño (Figma):** [Etapa 2 - Formulario de transferencia](https://www.figma.com/design/7pt2W7JSic4ZoAVcgvQ5qD/Pantallas-taller-SDD?node-id=1-2865&m=dev)
- **Diseño (Figma):** [Apoyo UI - Modal de selección de cuentas](https://www.figma.com/design/7pt2W7JSic4ZoAVcgvQ5qD/Pantallas-taller-SDD?node-id=1-3077&m=dev)
- **Documentación técnica:** [GET `/api/accounts` — listado de cuentas para resumen (`Account[]`)](../../technical-docs/api-accounts.md)

## Plan de implementación

1. Construir el formulario con campos obligatorios de origen, destino y monto, y campo opcional de descripción.
2. Integrar selección de cuentas sobre datos demo reutilizables para origen y destino, evitando combinaciones inválidas.
3. Aplicar reglas de validación: origen distinto de destino, monto mayor que cero y monto no superior al saldo disponible de origen.
4. Mostrar mensajes de error accesibles para cada validación incumplida y bloquear el avance mientras exista error.
5. Habilitar la transición a verificación solo cuando el formulario esté completo y válido.
