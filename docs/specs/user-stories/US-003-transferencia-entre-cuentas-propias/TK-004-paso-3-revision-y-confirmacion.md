# TK-004: Paso 3 — Pantalla de revisión y confirmación de la transferencia

- **ID:** TK-004
- **Estado:** Ready
- **Historia:** [US-003](./README.md)
- **Unidad de trabajo:** react-base-project
- **Prioridad:** Alta

## Descripción

Implementar la pantalla "REVISAR TRANSFERENCIA" en `src/app/transfer/review/page.tsx` que muestra el resumen completo antes de ejecutar la operación: monto, cuentas enmascaradas de origen y destino, concepto (si fue ingresado), comisión $0.00 e indicador "La transferencia se realizará de inmediato". Al confirmar ("Transferir") se llama al endpoint mock `POST /api/transfer`, el resultado (número de comprobante, fecha/hora) se guarda en el contexto y el flujo navega al paso 4 (`/transfer/receipt`). "Cancelar" limpia el contexto y regresa a `/transfer`.

## Dependencias

- **`useTransferFlow`** (`src/features/transfers/context/transfer-flow-context.tsx`) — para leer `fromAccount`, `toAccount`, `amount`, `concept` y escribir el resultado del comprobante (`receiptId`, `timestamp`).
- **`POST /api/transfer`** — endpoint mock a consumir; contrato en `api-transfer.md`; campos requeridos: `sourceAccountNumber`, `targetAccountNumber`, `routerNumber` (valor fijo mock `"021000021"`), `amount`, `description`.
- Función utilitaria de enmascaramiento de número de cuenta (los últimos 4 dígitos; p. ej. `**** *356`); puede vivir en `src/features/transfers/utils/` (RN-13).

## Referencias

- **Diseño:** [Figma — Paso 3: Revisión y confirmación](https://www.figma.com/design/7pt2W7JSic4ZoAVcgvQ5qD/Pantallas-taller-SDD?node-id=1-2920&m=dev)
- **Contrato de transferencia:** [api-transfer.md](../../technical-docs/api-transfer.md)
- **Arquitectura:** [ADR-003 — Separación de responsabilidades Next.js App Router](../../../../docs/adr/ADR-003-separacion-responsabilidades-nextjs-app-router.md)

## Plan de implementación

1. Crear `src/app/transfer/review/page.tsx` como Client Component.
2. Leer del contexto `fromAccount`, `toAccount`, `amount` y `concept`; si alguno está vacío (acceso directo a la ruta sin pasar por el paso 2), redirigir a `/transfer`.
3. Renderizar la tarjeta de resumen con: monto en grande, badge "La transferencia se realizará de inmediato", fila "Desde" (nombre de cuenta + número enmascarado + saldo), fila "Hacia" (nombre de cuenta + número enmascarado + saldo), fila "Concepto" (valor o vacío si no se ingresó), fila "Comisión" → `$0.00`.
4. Los números de cuenta se muestran enmascarados (RN-13); crear o importar la función de enmascaramiento desde `src/features/transfers/utils/mask-account.ts`.
5. Al presionar "Transferir":
   a. Llamar `POST /api/transfer` con los datos del contexto.
   b. Manejar estado de carga (deshabilitar botón mientras se procesa).
   c. En respuesta exitosa: guardar `receiptId` (generado mock) y `timestamp` en el contexto; navegar a `/transfer/receipt`.
   d. En error: mostrar mensaje de error sin limpiar el formulario.
6. Al presionar "Cancelar": llamar `reset()` del contexto y navegar a `/transfer`.
7. Aplicar tokens CSS del tema.
