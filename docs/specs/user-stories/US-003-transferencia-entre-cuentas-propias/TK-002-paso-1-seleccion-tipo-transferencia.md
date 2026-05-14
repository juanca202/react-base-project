# TK-002: Paso 1 — Pantalla de selección de tipo de transferencia

- **ID:** TK-002
- **Estado:** Ready
- **Historia:** [US-003](./README.md)
- **Unidad de trabajo:** react-base-project
- **Prioridad:** Alta

## Descripción

Implementar la pantalla "TRANSFERENCIAS" en `src/app/transfer/page.tsx` que presenta las opciones "Entre mis cuentas" y "A terceros". Al seleccionar "Entre mis cuentas", el flujo navega al paso 2 (`/transfer/form`). La opción "A terceros" se renderiza visualmente pero no navega (fuera de alcance según RN-03).

## Dependencias

- **`TransferFlowProvider` / `useTransferFlow`** (`src/features/transfers/context/transfer-flow-context.tsx`) — disponible tras TK-001; la página puede no necesitar leer el contexto en este paso, pero está dentro del layout que lo provee.
- **`SummaryBottomNav`** (`src/components/summary-home/summary-bottom-nav.tsx`) — la barra de navegación inferior es visible en la pantalla según el diseño Figma.

## Referencias

- **Diseño:** [Figma — Paso 1: Selección de tipo de transferencia](https://www.figma.com/design/7pt2W7JSic4ZoAVcgvQ5qD/Pantallas-taller-SDD?node-id=36-1459&m=dev)
- **Arquitectura:** [ADR-003 — Separación de responsabilidades Next.js App Router](../../../../docs/adr/ADR-003-separacion-responsabilidades-nextjs-app-router.md)

## Plan de implementación

1. Reemplazar el contenido de `src/app/transfer/page.tsx` con el componente `TransferSelectPage` (Client Component, dado que tiene interacción de navegación).
2. Renderizar el encabezado "TRANSFERENCIAS" con botón de retroceso que navega a `/summary`.
3. Renderizar la tarjeta "Entre mis cuentas" (icono, título, descripción, flecha) como botón que navega a `/transfer/form` con `useRouter`.
4. Renderizar la tarjeta "A terceros" visualmente idéntica al diseño pero sin acción de navegación (sin `href` ni `onClick` funcional en este alcance).
5. Incluir la barra de navegación inferior alineada con el diseño.
6. Aplicar tokens CSS del tema (`src/theme/index.css`) para colores y tipografía; no usar valores hex fijos cuando exista variable equivalente.
