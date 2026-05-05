# TK-001: Selector de tipo de transferencia

- **ID:** TK-001
- **Estado:** Ready
- **Prioridad:** Media
- **Historia:** [US-004](./README.md)
- **Unidad de trabajo:** react-base-project

## Descripción

Implementar la primera etapa del flujo de transferencias en la ruta `/transfers`: pantalla de selección de tipo de transferencia. La vista debe mostrar la opción habilitada para la demo y permitir avanzar al formulario cuando el usuario confirma su elección.

## Dependencias

- **Ruteo y estructura de página** en `src/app` para el acceso a la funcionalidad de transferencias.
- **Estado de flujo en cliente** para persistir el tipo de transferencia seleccionado en la navegación entre etapas.
- **Diseño base de la etapa 1** según referencia de Figma.
- **Ruta de entrada del flujo** definida en `/transfers`.

## Referencias

- **Historia:** [US-004 — Transferencias entre cuentas con verificación previa](./README.md)
- **Diseño:** [Figma — Etapa 1 (Selector de tipo de transferencia)](https://www.figma.com/design/7pt2W7JSic4ZoAVcgvQ5qD/Pantallas-taller-SDD?node-id=1-2814&m=dev)

## Plan de implementación

1. Implementar la UI del selector de tipo de transferencia con la opción habilitada para la demo.
2. Definir el evento de confirmación de selección para navegar a `/transfers/[type]` con el tipo elegido.
3. Persistir el tipo seleccionado en el estado del flujo para las etapas siguientes.
4. Validar que sin selección explícita no se permita avanzar.
