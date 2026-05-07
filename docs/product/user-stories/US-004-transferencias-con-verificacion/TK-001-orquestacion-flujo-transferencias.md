# TK-001: Orquestación del flujo de transferencias por etapas

- **ID:** TK-001
- **Estado:** Ready
- **Prioridad:** Alta
- **Historia:** [US-004](./README.md)
- **Unidad de trabajo:** react-base-project

## Descripción

Implementar la orquestación del flujo de transferencias en un recorrido guiado de cuatro etapas (selector, formulario, verificación y éxito), asegurando el orden obligatorio y la navegación controlada entre pasos conforme a **RN-04**.

## Dependencias

- **Pantalla de transferencias de US-004** — contenedor principal del flujo y render condicional por etapa.
- **Estado compartido de transferencia** — datos mínimos para persistir selección de tipo, cuentas, monto y descripción durante el recorrido.
- **Acciones de navegación interna** — avanzar, retroceder y reiniciar flujo sin perder consistencia de estado.

## Referencias

- **Historia:** [US-004 — Transferencias entre cuentas con verificación previa](./README.md)
- **Diseño (Figma):** [Etapa 1 - Selector de tipo de transferencia](https://www.figma.com/design/7pt2W7JSic4ZoAVcgvQ5qD/Pantallas-taller-SDD?node-id=36-1459&m=dev)
- **Diseño (Figma):** [Etapa 2 - Formulario de transferencia](https://www.figma.com/design/7pt2W7JSic4ZoAVcgvQ5qD/Pantallas-taller-SDD?node-id=36-1794&m=dev)
- **Diseño (Figma):** [Etapa 3 - Verificación de transferencia](https://www.figma.com/design/7pt2W7JSic4ZoAVcgvQ5qD/Pantallas-taller-SDD?node-id=1-2920&m=dev)
- **Diseño (Figma):** [Etapa 4 - Confirmación de éxito](https://www.figma.com/design/7pt2W7JSic4ZoAVcgvQ5qD/Pantallas-taller-SDD?node-id=1-2984&m=dev)

## Plan de implementación

1. Definir el contenedor del flujo de transferencias y la máquina de etapas con secuencia obligatoria `selector -> formulario -> verificación -> éxito`.
2. Centralizar el estado de la operación para que cada etapa consuma y actualice solo la parte que le corresponde.
3. Asegurar que no se pueda acceder a etapas posteriores sin cumplir los prerrequisitos de datos de etapas anteriores.
4. Exponer acciones explícitas para avanzar/cancelar/volver según reglas de la historia y mantener el reinicio del flujo tras una operación exitosa.
