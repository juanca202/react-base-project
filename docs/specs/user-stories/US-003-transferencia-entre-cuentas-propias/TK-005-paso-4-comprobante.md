# TK-005: Paso 4 — Pantalla de comprobante de éxito

- **ID:** TK-005
- **Estado:** Ready
- **Historia:** [US-003](./README.md)
- **Unidad de trabajo:** react-base-project
- **Prioridad:** Alta

## Descripción

Implementar la pantalla "COMPROBANTE" en `src/app/transfer/receipt/page.tsx` que confirma el éxito de la transferencia mostrando: mensaje "¡Transferencia exitosa!", monto, número de comprobante, fecha y hora, cuentas origen y destino enmascaradas, concepto y comisión $0.00. Ofrece tres acciones de salida: compartir el comprobante (usando Web Share API con fallback), iniciar una nueva transferencia (navega a `/transfer` y llama `reset()`) e ir al inicio (navega a `/summary` y llama `reset()`).

## Dependencias

- **`useTransferFlow`** (`src/features/transfers/context/transfer-flow-context.tsx`) — para leer `fromAccount`, `toAccount`, `amount`, `concept`, `receiptId` y `timestamp`; si alguno está vacío, redirigir a `/transfer`.
- **Función de enmascaramiento** (`src/features/transfers/utils/mask-account.ts`) — para mostrar cuentas con `**** *XXX` (RN-13); compartida con TK-004.
- **Web Share API** (`navigator.share`) — para la acción "Compartir"; si el navegador no la soporta, copiar al portapapeles como fallback.

## Referencias

- **Diseño:** [Figma — Paso 4: Comprobante de éxito](https://www.figma.com/design/7pt2W7JSic4ZoAVcgvQ5qD/Pantallas-taller-SDD?node-id=1-2984&m=dev)
- **Contrato de transferencia:** [api-transfer.md](../../technical-docs/api-transfer.md)
- **Arquitectura:** [ADR-003 — Separación de responsabilidades Next.js App Router](../../../../docs/adr/ADR-003-separacion-responsabilidades-nextjs-app-router.md)

## Plan de implementación

1. Crear `src/app/transfer/receipt/page.tsx` como Client Component.
2. Leer del contexto `fromAccount`, `toAccount`, `amount`, `concept`, `receiptId` y `timestamp`; si alguno está vacío (acceso directo a la URL), redirigir a `/transfer`.
3. Renderizar la tarjeta de comprobante con:
   - Logotipo del banco e ícono de check de éxito.
   - Mensaje "¡Transferencia exitosa!" en color primario.
   - Monto transferido en tipografía grande.
   - Número de comprobante (`receiptId`) y fecha/hora formateada (`timestamp`).
   - Fila "Desde": nombre de cuenta + número enmascarado.
   - Fila "Hacia": nombre de cuenta + número enmascarado.
   - Fila "Concepto": valor (o vacío si no se ingresó).
   - Fila "Comisión": `$0.00`.
4. Renderizar tres botones de salida (RN-12):
   - **"Compartir"** (primario): intentar `navigator.share({ text: resumen del comprobante })`; si no disponible, copiar texto al portapapeles con `navigator.clipboard.writeText`.
   - **"Nueva transferencia"** (secundario, con borde): llamar `reset()` del contexto y navegar a `/transfer`.
   - **"Ir al inicio"** (terciario, solo texto): llamar `reset()` del contexto y navegar a `/summary`.
5. Aplicar tokens CSS del tema; el fondo de la tarjeta incluye el patrón decorativo del logotipo del banco según el diseño Figma (puede implementarse con un elemento `<img>` con opacidad reducida o como background).
