# TK-004: Orquestación del flujo y navegación entre etapas

- **ID:** TK-004
- **Estado:** Ready
- **Prioridad:** Media
- **Historia:** [US-004](./README.md)
- **Unidad de trabajo:** react-base-project

## Descripción

Implementar la orquestación del flujo completo de transferencias para garantizar el orden funcional definido en la historia (selector, formulario, verificación y éxito), incluyendo reglas de transición entre etapas y manejo de estados inválidos.

## Dependencias

- **Etapas funcionales implementadas** en TK-001, TK-002 y TK-003.
- **Estado compartido del flujo** con persistencia temporal en cliente.
- **Navegación y guards de flujo** para evitar acceso directo a etapas fuera de secuencia.

## Referencias

- **Historia:** [US-004 — Transferencias entre cuentas con verificación previa](./README.md)

## Plan de implementación

1. Definir el modelo de estado del flujo y las transiciones válidas entre etapas.
2. Implementar el controlador de navegación que fuerce el orden funcional de la historia.
3. Evitar que el usuario llegue a verificación o éxito sin completar y validar etapas previas.
4. Definir el comportamiento de reinicio o salida del flujo cuando se cancela en verificación.
