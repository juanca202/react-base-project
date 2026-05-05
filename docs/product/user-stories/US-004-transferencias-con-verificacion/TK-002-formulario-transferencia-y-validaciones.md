# TK-002: Formulario de transferencia y validaciones

- **ID:** TK-002
- **Estado:** Ready
- **Prioridad:** Alta
- **Historia:** [US-004](./README.md)
- **Unidad de trabajo:** react-base-project

## Descripción

Implementar la segunda etapa del flujo en la ruta `/transfers/[type]`: formulario de transferencia con selección de cuenta origen/destino, monto y descripción opcional, incorporando las validaciones de negocio definidas en la historia.

## Dependencias

- **Datos mock de cuentas** disponibles para la demo (origen, destino, saldo).
- **Estado del flujo** para conservar los datos ingresados al pasar a verificación.
- **Modal de selección de cuentas** y componentes de formulario ya usados en el proyecto.
- **Parámetro dinámico de ruta** `type` proveniente de la selección en `/transfers`.

## Referencias

- **Historia:** [US-004 — Transferencias entre cuentas con verificación previa](./README.md)
- **Diseño:** [Figma — Etapa 2 (Formulario de transferencia)](https://www.figma.com/design/7pt2W7JSic4ZoAVcgvQ5qD/Pantallas-taller-SDD?node-id=1-2865&m=dev)
- **Diseño de apoyo:** [Figma — Modal de selección de cuentas](https://www.figma.com/design/7pt2W7JSic4ZoAVcgvQ5qD/Pantallas-taller-SDD?node-id=1-3077&m=dev)

## Plan de implementación

1. Implementar los campos requeridos del formulario y su comportamiento de entrada/salida de datos.
2. Aplicar validación para impedir origen y destino iguales.
3. Aplicar validación de monto mayor que cero y no superior al saldo disponible en origen.
4. Mostrar errores de validación en formato accesible y bloquear avance cuando existan errores.
5. Habilitar avance a verificación solo con formulario válido, manteniendo la misma ruta `/transfers/[type]` y cambiando el componente renderizado.
