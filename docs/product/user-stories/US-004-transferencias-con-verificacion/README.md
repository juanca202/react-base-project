# US-004: Transferencias entre cuentas con verificación previa

- **ID:** US-004
- **Estado:** Draft

## Descripción

**Como** usuario autenticado  
**Quiero** realizar una transferencia siguiendo un flujo guiado por pasos  
**Para** completar la operación de forma clara, validada y con confirmación de éxito en un flujo guiado

## Reglas de negocio

- **RN-01** — El flujo **DEBE** funcionar con datos y servicios mock en el cliente para la demostración.
- **RN-02** — Se **ASUME** que el mecanismo de control de sesión ya existe y está operativo; esta historia parte de un usuario autenticado.
- **RN-03** — Un entorno productivo **DEBE** sustituir mocks por APIs reales, confirmación transaccional real y límites/regulatorios aplicables.
- **RN-04** — El recorrido de la historia **DEBE** respetar este orden funcional: selector de tipo de transferencia, formulario de transferencia, verificación y confirmación de éxito.
- **RN-05** — La entrada al flujo **DEBE** iniciar en un selector de tipo de transferencia y **DEBE** permitir elegir la opción habilitada para la demo.
- **RN-06** — En el formulario, el usuario **DEBE** poder seleccionar cuenta de origen y cuenta de destino entre las opciones disponibles en la demo.
- **RN-07** — El sistema **NO DEBE** permitir que origen y destino sean la misma cuenta en una misma operación.
- **RN-08** — El monto **DEBE** ser estrictamente mayor que cero y **NO DEBE** superar el saldo disponible de la cuenta de origen.
- **RN-09** — Al enviar datos válidos del formulario, el flujo **DEBE** pasar a una pantalla de verificación con resumen completo de la operación.
- **RN-10** — En verificación, el usuario **DEBE** poder confirmar o cancelar antes de ejecutar la transferencia.
- **RN-11** — Al confirmar en verificación, el sistema **DEBE** mostrar la confirmación de éxito con identificador de operación, cuentas, monto y descripción opcional.
- **RN-12** — Los mensajes de error de validación del formulario **DEBEN** mostrarse de forma accesible (p. ej. rol `alert` donde ya se usa en la implementación de referencia).

## Referencias

- **Glosario:** [Transferencia (entre cuentas propias)](../../glossary.md)
- **Diseño / prototipo (URL):**
  - Etapa 1 - Selector de tipo de transferencia: [Figma](https://www.figma.com/design/7pt2W7JSic4ZoAVcgvQ5qD/Pantallas-taller-SDD?node-id=1-2814&m=dev)
  - Etapa 2 - Formulario de transferencia: [Figma](https://www.figma.com/design/7pt2W7JSic4ZoAVcgvQ5qD/Pantallas-taller-SDD?node-id=1-2865&m=dev)
  - Etapa 3 - Verificación de transferencia: [Figma](https://www.figma.com/design/7pt2W7JSic4ZoAVcgvQ5qD/Pantallas-taller-SDD?node-id=1-2920&m=dev)
  - Etapa 4 - Confirmación de éxito: [Figma](https://www.figma.com/design/7pt2W7JSic4ZoAVcgvQ5qD/Pantallas-taller-SDD?node-id=1-2984&m=dev)
  - Apoyo UI - Modal de selección de cuentas: [Figma](https://www.figma.com/design/7pt2W7JSic4ZoAVcgvQ5qD/Pantallas-taller-SDD?node-id=1-3077&m=dev)

## Criterios de aceptación

```gherkin
DADO un usuario autenticado
CUANDO abre la pantalla de transferencias
ENTONCES ve primero el selector de tipo de transferencia

DADO un usuario en el selector de tipo de transferencia
CUANDO elige la opción de transferencia habilitada para la demo
ENTONCES avanza al formulario de transferencia con selección de cuentas, monto y descripción opcional

DADO un usuario en el paso de datos
CUANDO origen y destino son la misma cuenta
ENTONCES el sistema muestra error y no avanza a verificación

DADO un usuario en el paso de datos
CUANDO el monto es cero o negativo o supera el saldo de origen
ENTONCES el sistema muestra error y no avanza a verificación

DADO datos válidos de transferencia
CUANDO confirma continuar
ENTONCES el sistema pasa al paso de verificación y muestra el resumen del monto y cuentas

DADO un usuario en verificación
CUANDO confirma la operación
ENTONCES el sistema ejecuta la transferencia y muestra la pantalla de éxito con referencia de operación y detalle

DADO que el usuario ya está autenticado
CUANDO inicia el flujo de transferencias
ENTONCES la historia evalúa solo el flujo funcional de transferencia definido en esta US
```

## Complejidad sugerida

- **Story points:** 5 (Fibonacci: 1, 2, 3, 5, 8, 13)
- **Justificación:** Varios pasos de UI, validaciones de negocio y estados de carga/error; integración futura con backend real aumentaría el riesgo fuera de esta US demo.

## Unidades de trabajo

- react-base-project

## Validación

### INVEST

| Letra | Criterio      | Resultado | Notas                                                                 |
| ----- | ------------- | --------- | --------------------------------------------------------------------- |
| **I** | Independiente | Cumple    | Asume sesión existente; se enfoca en el flujo de transferencias.      |
| **N** | Negociable    | Cumple    | Sustitución de mocks y catálogo de cuentas negociable.                |
| **V** | Valiosa       | Cumple    | Flujo core de la demo bancaria.                                       |
| **E** | Estimable     | Cumple    | Reglas y pantallas acotadas en código de referencia.                  |
| **S** | Pequeña       | Cumple    | Flujo acotado a 4 etapas con alcance funcional claramente delimitado. |
| **T** | Testeable     | Cumple    | Ya hay pruebas de página en repo para transferencias (extensibles).   |

### Definition of Ready (DoR)

| Criterio DoR                       | Estado  | Notas                                                          |
| ---------------------------------- | ------- | -------------------------------------------------------------- |
| Dependencias listas                | Cumple  | Se asume resuelto el control de sesión fuera de esta US.       |
| Inputs/outputs claros              | Cumple  | Flujo definido en 4 etapas, con entrada y salida por paso.     |
| Unidades de trabajo definidas      | Cumple  | Listadas arriba.                                               |
| Sin decisiones técnicas pendientes | Parcial | Contrato API real de transferencias fuera de alcance demo.     |
| Referencias de UI                  | Cumple  | Figma referenciado para las 4 etapas del flujo.                |
| Sin aclaraciones pendientes        | Parcial | Ver **Observaciones** sobre integración real y casos de error. |

## Observaciones

- **Diseño:** el flujo base queda definido con 4 etapas (selector, formulario, verificación, éxito). Se recomienda documentar en una tarea adicional variantes de error y cancelación.
- **Integración futura:** la ejecución real de transferencias, conciliación y trazabilidad operativa quedan para integración backend fuera de esta US demo.
- **Autenticación/sesión:** queda fuera del alcance de esta historia; se considera un prerrequisito ya implementado.
