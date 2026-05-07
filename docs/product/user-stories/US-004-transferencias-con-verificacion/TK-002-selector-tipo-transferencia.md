# TK-002: Selector de tipo de transferencia

- **ID:** TK-002
- **Estado:** Ready
- **Prioridad:** Media
- **Historia:** [US-004](./README.md)
- **Unidad de trabajo:** react-base-project

## Descripción

Implementar la primera etapa del flujo con el selector de tipo de transferencia, permitiendo elegir la opción habilitada para la demo y habilitando el avance al formulario, conforme a **RN-05**.

## Dependencias

- **Orquestación del flujo por etapas** — definición del paso inicial y transición al formulario.
- **Catálogo demo de tipos de transferencia** — fuente de opción habilitada para la historia.
- **UI de etapa inicial** — composición visual y estados de selección para continuar.

## Referencias

- **Historia:** [US-004 — Transferencias entre cuentas con verificación previa](./README.md)
- **Diseño (Figma):** [Etapa 1 - Selector de tipo de transferencia](https://www.figma.com/design/7pt2W7JSic4ZoAVcgvQ5qD/Pantallas-taller-SDD?node-id=36-1459&m=dev)

## Plan de implementación

1. Implementar la vista de selector como primer paso visible al entrar al flujo de transferencias.
2. Renderizar la opción de transferencia habilitada para demo y registrar la selección en el estado compartido.
3. Restringir el avance al formulario hasta tener una opción válida seleccionada.
4. Validar la coherencia de textos y acciones de continuidad con los criterios de aceptación de la US.
