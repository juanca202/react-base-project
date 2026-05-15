# TK-003: Paso 2 — Pantalla de ingreso de datos de la transferencia

- **ID:** TK-003
- **Estado:** Ready
- **Historia:** [US-003](./README.md)
- **Unidad de trabajo:** react-base-project
- **Prioridad:** Alta

## Descripción

Implementar la pantalla "TRANSFERIR" en `src/app/transfer/form/page.tsx` donde el usuario selecciona la cuenta origen ("Desde") y la cuenta destino ("Hacia") entre sus cuentas propias mediante un **diálogo de selección** que se abre al pulsar cada botón de cuenta, ingresa el monto (mayor a $0.00) y un concepto opcional. "Continuar" con datos válidos guarda el borrador en el contexto del flujo y navega al paso 3 (`/transfer/review`). "Cancelar" limpia el contexto y regresa a `/transfer`.

## Dependencias

- **`useTransferFlow`** (`src/features/transfers/context/transfer-flow-context.tsx`) — para leer cuentas disponibles y escribir `fromAccount`, `toAccount`, `amount` y `concept` en el estado del flujo; disponible tras TK-001.
- **`GET /api/accounts`** (`src/app/api/accounts/route.ts`) — fuente mock de cuentas; retorna `Account[]` (id, number, balance, type, name). Solo los tipos `saving` y `checking` son elegibles como origen/destino; las cuentas de tipo `credit-card` se excluyen del listado de selección.
- **`Account`** (tipo de `src/app/api/accounts/route.ts`) — tipado de los ítems en el diálogo de selección; campos utilizados: `id`, `number`, `balance`, `type`, `name`.
- **`@base-ui/react` — `Dialog`** — primitivo para el diálogo de selección de cuenta (ADR-002: "Base UI primero" para patrones con accesibilidad y foco compuesto).
- **Función de enmascaramiento** (`src/features/transfers/utils/mask-account.ts`) — para mostrar el número de cuenta en el diálogo; compartida con TK-004 y TK-005.

## Referencias

- **Diseño — Pantalla de ingreso de datos:** [Figma node 36-1794](https://www.figma.com/design/7pt2W7JSic4ZoAVcgvQ5qD/Pantallas-taller-SDD?node-id=36-1794&m=dev)
- **Diseño — Diálogo de selección de cuenta:** [Figma node 1-3077](https://www.figma.com/design/7pt2W7JSic4ZoAVcgvQ5qD/Pantallas-taller-SDD?node-id=1-3077&m=dev)
- **Contrato de cuentas:** [api-accounts.md](../../technical-docs/api-accounts.md)
- **Contrato de transferencia:** [api-transfer.md](../../technical-docs/api-transfer.md)
- **Arquitectura:** [ADR-003 — Separación de responsabilidades Next.js App Router](../../../../docs/adr/ADR-003-separacion-responsabilidades-nextjs-app-router.md)
- **Componentes:** [ADR-002 — Biblioteca de componentes Base UI](../../../../docs/adr/ADR-002-biblioteca-componentes-base-ui.md)

## Plan de implementación

### Página `src/app/transfer/form/page.tsx`

1. Crear la página como Client Component (`'use client'`).
2. Llamar a `fetch('/api/accounts')` al montar (o recibirlo como prop desde el layout); filtrar la respuesta para retener únicamente cuentas con `type === 'saving'` o `type === 'checking'`; las de `type === 'credit-card'` se excluyen del diálogo de selección.
3. Renderizar el encabezado "TRANSFERIR" con botón de retroceso (ícono arrow-left 20px) que navega a `/transfer`.
4. Renderizar los dos botones de cuenta con los estilos indicados en la tabla de especificaciones:
   - **"Desde"** — muestra nombre, prefijo de tipo y número enmascarado de la cuenta origen seleccionada (o estado vacío si no hay selección). Al pulsarlo abre el diálogo en modo `"from"`.
   - **"Hacia"** — idéntico para la cuenta destino; al pulsarlo abre el diálogo en modo `"to"`.
   - Entre los dos botones se superpone el ícono `angles-down` en círculo `#d0f0f6`.
5. Renderizar el campo de monto con label "Ingresa el monto a transferir", estilo de display grande (50px) y solo borde inferior; validar que sea mayor a $0.00 antes de permitir avanzar (RN-05).
6. Renderizar el campo "Concepto (Opcional)" con placeholder "Ej. Pago zapatos".
7. Al presionar "Continuar": validar campos obligatorios; si válidos, guardar `fromAccount`, `toAccount`, `amount` y `concept` en el contexto con `useTransferFlow()` y navegar a `/transfer/review`.
8. Al presionar "Cancelar": llamar `reset()` del contexto y navegar a `/transfer`.

### Componente `src/features/transfers/components/account-select-dialog.tsx`

9. Implementar usando `Dialog` de `@base-ui/react`; presentar como bottom sheet con los estilos de contenedor indicados en la tabla del diálogo.
10. **Cabecera del diálogo**: "CUENTAS" centrado + botón ✕ alineado a la derecha; `bg-white backdrop-blur-[6px]`.
11. **Lista de cuentas**: iterar sobre las cuentas elegibles (`saving`/`checking`) con una fila por cuenta; aplicar estilos de estado normal, seleccionado y deshabilitado según la tabla.
12. **Número enmascarado**: construir con `mask-account.ts`; el prefijo de texto (`"Cta. Ahorros"` / `"Cta. corriente"`) se deriva del campo `type` del `Account`.
13. **Cuentas deshabilitadas**: `balance === 0` → fondo `#e2e2e2` + `opacity-40` en el contenido; evento de clic suprimido.
14. Al seleccionar una cuenta, llamar a la callback `onSelect(account)`, cerrar el diálogo y reflejar la selección en el botón correspondiente.
15. Aplicar tokens CSS del tema (`var(--primary)`, `var(--background-interface)`, etc.) en lugar de valores hex cuando exista variable equivalente.
