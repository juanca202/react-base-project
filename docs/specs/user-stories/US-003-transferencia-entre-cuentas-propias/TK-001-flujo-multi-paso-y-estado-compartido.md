# TK-001: Flujo multi-paso y estado compartido de transferencia

- **ID:** TK-001
- **Estado:** Ready
- **Historia:** [US-003](./README.md)
- **Unidad de trabajo:** react-base-project
- **Prioridad:** Alta

## Descripción

Establecer la estructura de rutas y el mecanismo de estado compartido que orquesta los cuatro pasos del flujo de transferencia entre cuentas propias (selección → ingreso de datos → revisión → comprobante), de modo que cada paso pueda leer y escribir los datos de la operación en curso y la navegación entre pasos funcione correctamente.

Entregable observable: navegar a `/transfer` y recorrer los cuatro pasos sin pérdida de datos entre pantallas, con opción de cancelar desde el paso 2 o 3.

## Dependencias

- **`src/app/transfer/page.tsx`** — placeholder existente que será reemplazado por el paso 1 (TK-002).
- **`src/app/api/accounts/route.ts`** — expone `getDemoAccountsForUser` y el tipo `Account`; el contexto de flujo almacenará cuentas mock de este origen.
- **`src/features/transfers/`** — carpeta a crear; albergará el contexto, los tipos y los componentes del flujo (alineado a ADR-003: módulo vertical por feature con capas explícitas).

## Referencias

- **Arquitectura:** [ADR-003 — Separación de responsabilidades Next.js App Router](../../../../docs/adr/ADR-003-separacion-responsabilidades-nextjs-app-router.md)
- **Contrato de transferencia:** [api-transfer.md](../../technical-docs/api-transfer.md)

## Plan de implementación

1. Crear `src/features/transfers/types/transfer-flow.types.ts` con los tipos del estado del flujo:
   - `TransferFlowState`: cuentas disponibles, cuenta origen seleccionada, cuenta destino seleccionada, monto, concepto, resultado del comprobante (número, fecha/hora).
   - `TransferFlowActions`: setters para cada campo y `reset()`.

2. Crear `src/features/transfers/context/transfer-flow-context.tsx` (Client Component):
   - `TransferFlowContext` (React Context).
   - `TransferFlowProvider` que inicializa el estado con `useState` o `useReducer` y expone el contexto.
   - Hook `useTransferFlow()` que lanza error si se usa fuera del Provider.

3. Crear `src/app/transfer/layout.tsx` como Client Component que envuelve sus hijos con `TransferFlowProvider`; este layout se aplica a todas las sub-rutas del flujo.

4. Crear la estructura de sub-rutas (páginas vacías o con stub hasta que TK-002 a TK-005 las implementen):
   - `src/app/transfer/page.tsx` — paso 1: selección de tipo de transferencia.
   - `src/app/transfer/form/page.tsx` — paso 2: ingreso de datos.
   - `src/app/transfer/review/page.tsx` — paso 3: revisión y confirmación.
   - `src/app/transfer/receipt/page.tsx` — paso 4: comprobante.

5. Verificar que la navegación entre rutas conserva el estado del contexto (el Provider vive en el layout, no se desmonta al cambiar de sub-ruta).
