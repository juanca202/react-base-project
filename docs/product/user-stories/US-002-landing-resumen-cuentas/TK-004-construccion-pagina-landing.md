# TK-004: Construccion de la pagina landing de resumen

- **ID:** TK-004
- **Estado:** Ready
- **Prioridad:** Media
- **Historia:** [US-002](./README.md)
- **Unidad de trabajo:** react-base-project

## Descripción

Construir la pagina de landing de resumen para usuarios autenticados, integrando las secciones definidas en US-002 y respetando la estructura visual acordada.

## Dependencias

- **TK-003 accountsCarousel** — bloque superior de cuentas como componente reutilizable.
- **TK-001 API de cuentas** — contrato de datos para alimentar resumen de cuentas.
- **TK-002 API de actividad** — contrato de datos para alimentar actividad reciente.
- **Reglas de autenticacion de US-001** — acceso restringido a contexto autenticado.

## Referencias

- **Historia:** [US-002 — Landing](./README.md)
- **Diseño Figma (nodo 1-1971):** [Pantallas taller SDD](https://www.figma.com/design/7pt2W7JSic4ZoAVcgvQ5qD/Pantallas-taller-SDD?node-id=36-1699&m=dev)
- **Technical doc:** [GET /api/accounts](../../../technical-docs/api-accounts.md)
- **Technical doc:** [GET /api/activity](../../../technical-docs/api-activity.md)

## Plan de implementación

1. Implementar en esta pagina la consulta a `GET /api/accounts` y `GET /api/activity` para obtener los datos de resumen.
2. Integrar `accountsCarousel` en la parte superior de la landing y pasar `accounts` por propiedad (props) al componente.
3. Integrar la seccion de actividad reciente usando el contrato definido para `GET /api/activity` y formato visual alineado a la maqueta.
4. Integrar atajos visibles de navegacion segun US-002, incluyendo transferencias y accesos adicionales definidos en el alcance de demo.
5. Definir comportamiento de rutas no implementadas mediante placeholder de demo para atajos fuera de alcance, evitando errores de navegacion.
6. Validar el acceso protegido de la pagina segun reglas de US-001 para usuarios sin sesion.

## Observaciones

- Esta tarea incluye estructura de pagina, integracion de secciones y placeholders de demo para atajos que apunten a rutas aun no implementadas.
- `accountsCarousel` se mantiene presentacional: recibe `accounts` por props y no consulta servicios directamente.
