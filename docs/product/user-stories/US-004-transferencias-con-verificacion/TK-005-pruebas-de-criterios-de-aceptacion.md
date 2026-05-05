# TK-005: Pruebas de criterios de aceptación del flujo de transferencias

- **ID:** TK-005
- **Estado:** Ready
- **Prioridad:** Alta
- **Historia:** [US-004](./README.md)
- **Unidad de trabajo:** react-base-project

## Descripción

Diseñar e implementar pruebas automatizadas que validen los criterios de aceptación de la historia para el flujo completo de transferencias, incluyendo navegación por etapas, validaciones de formulario y confirmación de éxito.

## Dependencias

- **Flujo funcional completo** implementado (selector, formulario, verificación y éxito).
- **Datos mock estables** para cuentas y ejecución de transferencia.
- **Infraestructura de pruebas del proyecto** para páginas y flujos de interacción.

## Referencias

- **Historia:** [US-004 — Transferencias entre cuentas con verificación previa](./README.md)

## Plan de implementación

1. Cubrir con pruebas el acceso al selector como primera etapa visible del flujo.
2. Cubrir el avance de selector a formulario y la validación de origen/destino distintos.
3. Cubrir validación de monto inválido (cero, negativo y superior al saldo).
4. Cubrir transición a verificación con datos válidos y visualización del resumen.
5. Cubrir confirmación en verificación y visualización de pantalla de éxito con referencia.
