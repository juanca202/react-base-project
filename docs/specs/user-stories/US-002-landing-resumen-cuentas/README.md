# US-002: Landing — resumen de cuentas y atajos

- Estado: Ready
- Fecha de creación: 2026-05-04
- Última actualización: 2026-05-21

## Descripción

**COMO** usuario autenticado  
**QUIERO** ver un resumen de mis cuentas, los últimos movimientos y atajos a operaciones frecuentes  
**PARA** tener contexto financiero rápido y acceder con menos pasos a transferencias u otros servicios

## Referencias

- **Diseño / prototipo:** [Pantallas taller SDD — frame nodo 1-1605](https://www.figma.com/design/7pt2W7JSic4ZoAVcgvQ5qD/Pantallas-taller-SDD?node-id=1-1605&m=dev)

## Criterios de aceptación

### Reglas de negocio

- **RN-01** — La pantalla de inicio **DEBE** mostrar al menos una sección de cuentas con nombre, identificador enmascarado y saldo presentado al usuario.
- **RN-02** — La pantalla **DEBE** mostrar una lista de últimos movimientos con descripción, fecha relativa y signo del importe.
- **RN-03** — La pantalla **DEBE** ofrecer atajos visibles hacia la funcionalidad de transferencias y, si el producto las mantiene en el alcance, hacia otros servicios indicados en la maqueta de la demo.
- **RN-04** — Los textos y estructura **DEBEN** ser comprensibles en español acorde a la audiencia de la banca digital de demostración.
- **RN-05** — La página de inicio **DEBE** estar disponible solo en contexto autenticado según las reglas de **US-001**; para la ejecución de esta historia se **ASUME** que **US-001** ya está implementada y operativa, y los datos mostrados en la demo **PUEDEN** ser estáticos o mock mientras producto no defina integración con núcleo de cuentas real.
- **RN-06** — Los atajos como «Servicios» y «Pagos QR» **DEBEN** definir con producto su comportamiento cuando apunten a rutas no implementadas (404 o placeholder).
- **RN-07** — Los saldos y movimientos de esta historia son de demo y la integración con sistemas reales **DEBE** planificarse en historias posteriores.

### Escenarios

```gherkin
DADO un usuario autenticado
CUANDO accede al resumen (ruta de inicio)
ENTONCES ve al menos dos cuentas con saldo y número enmascarado

DADO un usuario autenticado en el resumen
CUANDO revisa la sección de movimientos
ENTONCES ve al menos tres movimientos con descripción, fecha e importe con signo

DADO un usuario autenticado en el resumen
CUANDO usa el atajo de transferencias
ENTONCES navega a la ruta de transferencias del producto

DADO un visitante sin sesión
CUANDO intenta abrir el resumen
ENTONCES es redirigido según las reglas de autenticación (véase US-001)
```

## Complejidad sugerida

- **Story points:** 3
- **Justificación:** UI de varias secciones y datos mock; sin integración backend real en la demo actual.

## Unidades de trabajo

- react-base-project

## Validación

### INVEST

| Letra | Criterio      | Resultado | Notas                                           |
| ----- | ------------- | --------- | ----------------------------------------------- |
| **I** | Independiente | Cumple    | Se ejecuta asumiendo US-001 ya implementada.    |
| **N** | Negociable    | Cumple    | Origen de datos y número de cuentas negociable. |
| **V** | Valiosa       | Cumple    | Punto central de navegación tras login.         |
| **E** | Estimable     | Cumple    | Alcance visible en la maqueta de Figma.         |
| **S** | Pequeña       | Cumple    | Una página de resumen con secciones claras.     |
| **T** | Testeable     | Cumple    | Contenido y enlaces verificables por pruebas.   |

### Definition of Ready (DoR)

| Criterio DoR                       | Estado | Notas                                                                                                                               |
| ---------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| Dependencias listas                | Cumple | US-001 se asume implementada para esta ejecución.                                                                                   |
| Inputs/outputs claros              | Cumple | Lista de cuentas/movimientos y enlaces de atajos.                                                                                   |
| Unidades de trabajo definidas      | Cumple | Listadas arriba.                                                                                                                    |
| Sin decisiones técnicas pendientes | Cumple | Para el alcance demo de esta historia, el origen de datos mock/estático queda aceptado; la integración real se difiere según RN-07. |
| Referencias de UI                  | Cumple | Enlace a Figma en **Referencias**.                                                                                                  |
| Sin aclaraciones pendientes        | Cumple | Dependencias, atajos y datos demo formalizados en **RN-05**, **RN-06**, **RN-07** y **Observaciones**.                              |

## Observaciones

- **Dependencia:** requiere **US-001** implementada y operativa para el contexto autenticado y las redirecciones (**RN-05**).
- Comportamiento de atajos «Servicios» y «Pagos QR» cuando apunten a rutas no implementadas: definir con producto (404 o placeholder; **RN-06**).
- Datos de cuentas y movimientos: demo con mocks o estáticos; integración con sistemas reales queda para historias posteriores (**RN-07**).
