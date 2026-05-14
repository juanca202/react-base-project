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
- **`getDemoAccountsForUser`** (`src/app/api/accounts/route.ts`) — fuente mock de cuentas; se carga en servidor y se pasa como prop a la página client.
- **`Account`** (tipo de `src/app/api/accounts/route.ts`) — tipado de los ítems en el diálogo de selección.
- **`@base-ui/react` — `Dialog`** — primitivo para el diálogo de selección de cuenta (ADR-002: "Base UI primero" para patrones con accesibilidad y foco compuesto).
- **Función de enmascaramiento** (`src/features/transfers/utils/mask-account.ts`) — para mostrar el número de cuenta en el diálogo; compartida con TK-004 y TK-005.

## Referencias

- **Diseño — Pantalla de ingreso de datos:** [Figma node 36-1794](https://www.figma.com/design/7pt2W7JSic4ZoAVcgvQ5qD/Pantallas-taller-SDD?node-id=36-1794&m=dev)
- **Diseño — Diálogo de selección de cuenta:** [Figma node 1-3077](https://www.figma.com/design/7pt2W7JSic4ZoAVcgvQ5qD/Pantallas-taller-SDD?node-id=1-3077&m=dev)
- **Contrato de transferencia:** [api-transfer.md](../../technical-docs/api-transfer.md)
- **Arquitectura:** [ADR-003 — Separación de responsabilidades Next.js App Router](../../../../docs/adr/ADR-003-separacion-responsabilidades-nextjs-app-router.md)
- **Componentes:** [ADR-002 — Biblioteca de componentes Base UI](../../../../docs/adr/ADR-002-biblioteca-componentes-base-ui.md)

## Plan de implementación

### Página `src/app/transfer/form/page.tsx`

1. Crear la página como Client Component (`'use client'`).
2. Recibir la lista de cuentas del usuario como prop (cargada en servidor en el layout o en un Server Component padre) o bien llamar a `fetch('/api/accounts')` en `useEffect` al montar.
3. Renderizar el encabezado "TRANSFERIR" con botón de retroceso que navega a `/transfer`.
4. Renderizar los dos botones de cuenta:
   - **"Desde"** — muestra nombre, tipo y número enmascarado de la cuenta origen seleccionada (o estado vacío si no hay selección). Al pulsarlo abre el diálogo de selección en modo `"from"`.
   - **"Hacia"** — igual para la cuenta destino; al pulsarlo abre el diálogo en modo `"to"`.
   - Entre los dos botones se muestra el ícono de doble flecha hacia abajo (ver diseño Figma).
5. Renderizar el campo de monto con validación (no vacío y mayor a $0.00); mostrar indicación visual de error si el usuario intenta continuar con valor inválido (RN-05).
6. Renderizar el campo "Concepto (Opcional)" con placeholder "Ej. Pago zapatos".
7. Al presionar "Continuar": validar campos obligatorios; si válidos, guardar `fromAccount`, `toAccount`, `amount` y `concept` en el contexto con `useTransferFlow()` y navegar a `/transfer/review`.
8. Al presionar "Cancelar": llamar `reset()` del contexto y navegar a `/transfer`.

### Componente `src/features/transfers/components/account-select-dialog.tsx`

Extraer el diálogo como componente reutilizable:

9. Implementar usando `Dialog` de `@base-ui/react`; el diálogo se presenta como un **bottom sheet** con bordes superiores redondeados (`border-radius: 12px` en esquinas `tl` y `tr`), fondo `var(--background-interface, #f2f3f7)`.

10. **Cabecera del diálogo**: título "CUENTAS" centrado + botón de cierre (icono ✕) alineado a la derecha; fondo blanco con `backdrop-filter: blur(6px)` y bordes superiores redondeados.

11. **Lista de cuentas**: una fila por cuenta con:
    - Nombre de la cuenta (ej. "Gastos") en `text-[#474747]` tamaño 14px.
    - Número enmascarado (ej. `Cta. Ahorros ********142`) en `text-[#757575]` tamaño 12px — usar la función de `mask-account.ts` conservando los últimos 3 dígitos con 8 asteriscos de prefijo.
    - Saldo alineado a la derecha (ej. `$231.88`) en `text-[#474747]` 12px.
    - Texto "Saldo disponible" debajo del saldo en `text-[#757575]` 12px.

12. **Estado seleccionado**: la cuenta actualmente activa muestra fondo `var(--state-layers/primary/opacity-100, #d0f0f6)` y borde `1px solid var(--primary, #008292)`.

13. **Estado deshabilitado**: cuentas con saldo `$0.00` se renderizan con fondo `var(--background-button, #e2e2e2)` y opacidad `0.4`; no son seleccionables.

14. Al seleccionar una cuenta, el diálogo llama a la callback (`onSelect`) con la cuenta elegida, cierra el diálogo y actualiza el botón correspondiente ("Desde" o "Hacia") en la pantalla.

15. Aplicar tokens CSS del tema en todos los elementos; no usar valores hex fijos cuando exista variable equivalente.
