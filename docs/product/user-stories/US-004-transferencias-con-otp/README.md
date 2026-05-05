# US-004: Transferencias entre cuentas con confirmación OTP

- **ID:** US-004
- **Estado:** Draft

## Descripción

**Como** usuario autenticado  
**Quiero** transferir fondos entre mis cuentas indicando monto y concepto, y confirmar con un código OTP  
**Para** completar la operación con un segundo factor simulado acorde a la demo

El flujo **DEBE** funcionar con datos y servicios mock en el cliente para la demostración. Un entorno productivo **DEBE** sustituir mocks por APIs reales, generación y envío de OTP, y límites/regulatorios aplicables.

## Reglas de negocio

- **RN-01** — El usuario **DEBE** poder seleccionar cuenta de origen y cuenta de destino entre las opciones disponibles en la demo.
- **RN-02** — El sistema **NO DEBE** permitir que origen y destino sean la misma cuenta en una misma operación.
- **RN-03** — El monto **DEBE** ser estrictamente mayor que cero y **NO DEBE** superar el saldo disponible de la cuenta de origen.
- **RN-04** — Tras validar los datos de la transferencia, el sistema **DEBE** solicitar un código OTP de seis dígitos y **DEBE** permitir reenvío simulado del código.
- **RN-05** — Solo si el OTP es válido según las reglas del mock acordado, el sistema **DEBE** mostrar confirmación con identificador de operación, cuentas, monto y descripción opcional.
- **RN-06** — Los mensajes de error de validación (incluido OTP inválido o incompleto) **DEBEN** mostrarse de forma accesible (p. ej. rol `alert` donde ya se usa en la implementación de referencia).

## Referencias

- **Implementación de referencia (código):** [Página de transferencias](../../../../src/app/transfers/page.tsx)
- **Implementación de referencia (código):** [Flujo UI transferencias](../../../../src/features/transfers/ui/transfer-flow.tsx)
- **Implementación de referencia (código):** [Reglas y datos mock](../../../../src/features/transfers/api/transfers-mock.ts)
- **Implementación de referencia (código):** [Mock de verificación OTP](../../../../src/features/otp-verification/api/verify-otp-mock.ts)
- **Glosario:** [OTP](../../glossary.md), [Transferencia (entre cuentas propias)](../../glossary.md)
- **Diseño / prototipo (URL):** Ninguno por ahora.

## Criterios de aceptación

```gherkin
DADO un usuario autenticado
CUANDO abre la pantalla de transferencias
ENTONCES ve el formulario de nueva transferencia con selección de cuentas, monto y descripción opcional

DADO un usuario en el paso de datos
CUANDO origen y destino son la misma cuenta
ENTONCES el sistema muestra error y no avanza a OTP

DADO un usuario en el paso de datos
CUANDO el monto es cero o negativo o supera el saldo de origen
ENTONCES el sistema muestra error y no avanza a OTP

DADO datos válidos de transferencia
CUANDO confirma continuar
ENTONCES el sistema pasa al paso OTP y muestra el resumen del monto y cuentas

DADO el paso OTP
CUANDO introduce un código de seis dígitos inválido según el mock
ENTONCES el sistema muestra error y no marca éxito

DADO el paso OTP
CUANDO introduce el código válido del mock
ENTONCES el sistema muestra la pantalla de éxito con referencia de operación y detalle

DADO un visitante sin sesión
CUANDO intenta abrir transferencias
ENTONCES es redirigido al login según US-001
```

## Complejidad sugerida

- **Story points:** 5 (Fibonacci: 1, 2, 3, 5, 8, 13)
- **Justificación:** Varios pasos de UI, validaciones de negocio, OTP y estados de carga/error; integración futura con backend real aumentaría el riesgo fuera de esta US demo.

## Unidades de trabajo

- react-base-project

## Validación

### INVEST

| Letra | Criterio      | Resultado | Notas                                                               |
| ----- | ------------- | --------- | ------------------------------------------------------------------- |
| **I** | Independiente | Parcial   | Depende de autenticación (US-001) y listado de cuentas mock.        |
| **N** | Negociable    | Cumple    | Sustitución de mocks y catálogo de cuentas negociable.              |
| **V** | Valiosa       | Cumple    | Flujo core de la demo bancaria.                                     |
| **E** | Estimable     | Cumple    | Reglas y pantallas acotadas en código de referencia.                |
| **S** | Pequeña       | Parcial   | Variedad de pasos; aún acotable a un solo flujo de usuario.         |
| **T** | Testeable     | Cumple    | Ya hay pruebas de página en repo para transferencias (extensibles). |

### Definition of Ready (DoR)

| Criterio DoR                       | Estado    | Notas                                                     |
| ---------------------------------- | --------- | --------------------------------------------------------- |
| Dependencias listas                | Parcial   | Depende de US-001 para acceso a `/transfers`.             |
| Inputs/outputs claros              | Cumple    | Entradas de formulario y resultado éxito/error.           |
| Unidades de trabajo definidas      | Cumple    | Listadas arriba.                                          |
| Sin decisiones técnicas pendientes | Parcial   | Contrato API real y OTP productivo fuera de alcance demo. |
| Referencias de UI                  | Parcial   | Sin Figma; referencia es código.                          |
| Sin aclaraciones pendientes        | No cumple | Ver **Observaciones** sobre OTP productivo y diseño.      |

## Observaciones

- **OTP demo:** el código válido es fijo en mock (`verify-otp-mock`); **NO** es seguro ni representativo de producción.
- **Diseño:** sin Figma; la UI de referencia está en `src/features/transfers` y `src/app/transfers`.
- **Página `/otp`:** existe un formulario OTP independiente del flujo de transferencias; queda fuera del alcance explícito de esta US salvo que producto la una en una historia aparte.
