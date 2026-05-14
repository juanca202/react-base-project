# US-003: Transferencia entre cuentas propias

- **ID:** US-003
- **Estado:** Ready

## Descripción

**Como** usuario autenticado de la aplicación bancaria
**Quiero** realizar una transferencia de dinero entre mis propias cuentas mediante un flujo guiado por pasos
**Para** mover fondos entre mis cuentas de forma inmediata, segura y con confirmación del resultado

## Reglas de negocio

- **RN-01** — El flujo DEBE estar disponible únicamente para usuarios con sesión activa; un usuario no autenticado NO DEBE poder acceder a ningún paso.
- **RN-02** — El flujo DEBE constar de exactamente cuatro pasos secuenciales: (1) selección del tipo de transferencia, (2) ingreso de datos, (3) revisión y confirmación, (4) comprobante de éxito.
- **RN-03** — En el paso 1, el sistema DEBE mostrar al menos las opciones "Entre mis cuentas" y "A terceros"; esta historia cubre únicamente la opción "Entre mis cuentas".
- **RN-04** — En el paso 2, el usuario DEBE seleccionar una cuenta de origen ("Desde") y una cuenta de destino ("Hacia"), ambas pertenecientes al mismo titular autenticado.
- **RN-05** — En el paso 2, el monto a transferir DEBE ser mayor a $0.00; el sistema NO DEBE permitir continuar con monto cero o vacío.
- **RN-06** — En el paso 2, el campo "Concepto" es OPCIONAL; si no se ingresa, el sistema DEBE continuar el flujo sin exigirlo.
- **RN-07** — En el paso 3 ("Revisar transferencia"), el sistema DEBE mostrar: monto, cuenta origen (nombre y número enmascarado), cuenta destino (nombre y número enmascarado), concepto (si fue ingresado) y comisión aplicable antes de que el usuario confirme.
- **RN-08** — La comisión entre cuentas propias DEBE ser $0.00.
- **RN-09** — El usuario DEBE poder cancelar el flujo desde los pasos 2 y 3; al cancelar, el sistema DEBE descartar todos los datos ingresados y NO DEBE ejecutar ninguna operación.
- **RN-10** — Al confirmar en el paso 3, la transferencia DEBE ejecutarse de forma inmediata; el sistema DEBE informar visualmente que la operación es inmediata antes de la confirmación.
- **RN-11** — En el paso 4 ("Comprobante"), el sistema DEBE mostrar: mensaje de éxito, monto transferido, número de comprobante, fecha y hora de la operación, cuentas origen y destino (enmascaradas), concepto y comisión.
- **RN-12** — Desde el comprobante, el usuario DEBE poder: compartir el comprobante, iniciar una nueva transferencia o regresar al inicio de la aplicación.
- **RN-13** — Los números de cuenta DEBEN mostrarse enmascarados en los pasos 3 y 4 (solo los últimos cuatro dígitos visibles; ejemplo: `**** *356`).

## Referencias

- **Paso 1 — Selección de tipo de transferencia:** [Figma node 36-1459](https://www.figma.com/design/7pt2W7JSic4ZoAVcgvQ5qD/Pantallas-taller-SDD?node-id=36-1459&m=dev)
- **Paso 2 — Ingreso de datos de la transferencia:** [Figma node 36-1794](https://www.figma.com/design/7pt2W7JSic4ZoAVcgvQ5qD/Pantallas-taller-SDD?node-id=36-1794&m=dev)
- **Paso 3 — Revisión y confirmación:** [Figma node 1-2920](https://www.figma.com/design/7pt2W7JSic4ZoAVcgvQ5qD/Pantallas-taller-SDD?node-id=1-2920&m=dev)
- **Paso 4 — Comprobante de éxito:** [Figma node 1-2984](https://www.figma.com/design/7pt2W7JSic4ZoAVcgvQ5qD/Pantallas-taller-SDD?node-id=1-2984&m=dev)

## Criterios de aceptación

```gherkin
Escenario: Flujo completo exitoso de transferencia entre cuentas propias
  DADO que el usuario tiene sesión activa y al menos dos cuentas de ahorros propias
  CUANDO navega a la sección "Transferir" y selecciona "Entre mis cuentas"
  ENTONCES el sistema muestra el paso 2 con los selectores de cuenta origen y destino

  DADO que el usuario está en el paso 2 con cuenta origen "Gastos" y cuenta destino "Departamento" seleccionadas
  CUANDO ingresa un monto válido (mayor a $0.00) y presiona "Continuar"
  ENTONCES el sistema avanza al paso 3 mostrando el resumen con monto, cuentas enmascaradas, concepto (si aplica) y comisión $0.00

  DADO que el usuario está en el paso 3 con todos los datos correctos
  CUANDO presiona "Transferir"
  ENTONCES el sistema ejecuta la transferencia de inmediato y muestra el paso 4 con el comprobante (número, fecha/hora, cuentas enmascaradas, monto y comisión)

Escenario: Cancelar flujo desde el paso 2
  DADO que el usuario está en el paso 2 con datos parcialmente ingresados
  CUANDO presiona "Cancelar"
  ENTONCES el sistema descarta los datos y regresa a la pantalla anterior sin ejecutar ninguna operación

Escenario: Cancelar flujo desde el paso 3
  DADO que el usuario está en el paso 3 revisando los datos
  CUANDO presiona "Cancelar"
  ENTONCES el sistema descarta la operación y regresa a la pantalla anterior sin ejecutar ninguna transferencia

Escenario: Monto inválido (cero o vacío)
  DADO que el usuario está en el paso 2
  CUANDO intenta continuar con monto $0.00 o el campo de monto vacío
  ENTONCES el sistema NO DEBE avanzar al paso 3 y DEBE indicar visualmente que el monto es inválido

Escenario: Acceso sin sesión activa
  DADO que no existe sesión activa del usuario
  CUANDO intenta acceder a cualquier paso del flujo de transferencia
  ENTONCES el sistema redirige al inicio de sesión sin mostrar datos de cuentas
```

## Complejidad sugerida

- **Story points:** 8
- **Justificación:**
  Flujo de cuatro pasos con estado compartido entre pantallas, validaciones en el ingreso de datos, enmascaramiento de cuentas, lógica mock de ejecución inmediata y pantalla de comprobante con múltiples acciones de salida. Alcance acotado a cuentas propias (sin integración con terceros), pero la coordinación de pasos y la representación fiel de los cuatro diseños Figma elevan la estimación por encima de una pantalla simple.

## Unidades de trabajo

- **react-base-project** — flujo de transferencia bajo `src/features/transfers/` (páginas multi-paso, lógica mock de ejecución, datos de cuentas, enmascaramiento) y rutas bajo `src/app`.

## Validación

### INVEST

| Letra | Criterio      | Resultado | Notas                                                                                                               |
| ----- | ------------- | --------- | ------------------------------------------------------------------------------------------------------------------- |
| **I** | Independiente | Cumple    | No depende de US-001 ni US-002 en tiempo de implementación; puede desarrollarse en paralelo.                        |
| **N** | Negociable    | Cumple    | El alcance está limitado a "Entre mis cuentas"; la opción "A terceros" queda explícitamente fuera de esta historia. |
| **V** | Valiosa       | Cumple    | Permite al usuario mover fondos entre sus cuentas de forma inmediata desde la app, funcionalidad bancaria central.  |
| **E** | Estimable     | Cumple    | Cuatro diseños Figma disponibles; alcance acotado a un solo tipo de transferencia con datos mock.                   |
| **S** | Pequeña       | Parcial   | Son cuatro pantallas enlazadas; la historia podría dividirse, pero el flujo completo aporta mayor valor integrado.  |
| **T** | Testeable     | Cumple    | Criterios Gherkin definidos; casos de flujo completo, cancelación y validación de monto cubiertos.                  |

### Definition of Ready (DoR)

| Criterio DoR                       | Estado  | Notas                                                                                                  |
| ---------------------------------- | ------- | ------------------------------------------------------------------------------------------------------ |
| Dependencias listas                | Cumple  | No requiere que US-001 ni US-002 estén implementadas; solo que exista sesión activa (mock disponible). |
| Inputs/outputs claros              | Cumple  | Cuatro pantallas Figma definen la UI; reglas de negocio y criterios Gherkin cubren entradas y salidas. |
| Unidades de trabajo definidas      | Cumple  | `react-base-project` identificado; área `src/features/transfers/` definida.                           |
| Sin decisiones técnicas pendientes | Cumple  | Flujo mock; sin integración real de backend ni API externa en el alcance de esta historia.             |
| Referencias de UI                  | Cumple  | Los cuatro pasos tienen pantallas en Figma referenciadas con URLs directas.                            |
| Sin aclaraciones pendientes        | Cumple  | Ninguna aclaración abierta con producto o usuario.                                                     |

## Observaciones

- La opción "A terceros" visible en el paso 1 queda fuera del alcance de esta historia; se navega únicamente por "Entre mis cuentas".
- Los datos de cuentas (nombres, números, saldos) son mock; no existe integración con backend real en este proyecto.
- El número de comprobante y la fecha/hora del paso 4 son generados de forma simulada en el front.
