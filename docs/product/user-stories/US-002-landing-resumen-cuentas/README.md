# US-002: Landing — resumen de cuentas y atajos

- **ID:** US-002
- **Estado:** Draft

## Descripción

**Como** usuario autenticado  
**Quiero** ver un resumen de mis cuentas, los últimos movimientos y atajos a operaciones frecuentes  
**Para** tener contexto financiero rápido y acceder con menos pasos a transferencias u otros servicios

La página de inicio **DEBE** estar disponible solo en contexto autenticado según las reglas de **US-001**. Los datos mostrados en la demo **PUEDEN** ser estáticos o mock mientras producto no defina integración con núcleo de cuentas real.

## Reglas de negocio

- **RN-01** — La pantalla de inicio **DEBE** mostrar al menos una sección de cuentas con nombre, identificador enmascarado y saldo presentado al usuario.
- **RN-02** — La pantalla **DEBE** mostrar una lista de últimos movimientos con descripción, fecha relativa y signo del importe.
- **RN-03** — La pantalla **DEBE** ofrecer atajos visibles hacia la funcionalidad de transferencias y, si el producto las mantiene en el alcance, hacia otros servicios indicados en la maqueta de la demo.
- **RN-04** — Los textos y estructura **DEBEN** ser comprensibles en español acorde a la audiencia de la banca digital de demostración.

## Referencias

- **Implementación de referencia (código):** [Página de inicio](../../../../src/app/page.tsx)
- **Diseño / prototipo (URL):** Ninguno por ahora.

## Criterios de aceptación

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

- **Story points:** 3 (Fibonacci: 1, 2, 3, 5, 8, 13)
- **Justificación:** UI de varias secciones y datos mock; sin integración backend real en la demo actual.

## Unidades de trabajo

- react-base-project

## Validación

### INVEST

| Letra | Criterio      | Resultado | Notas                                           |
| ----- | ------------- | --------- | ----------------------------------------------- |
| **I** | Independiente | Parcial   | Depende de sesión activa definida en US-001.    |
| **N** | Negociable    | Cumple    | Origen de datos y número de cuentas negociable. |
| **V** | Valiosa       | Cumple    | Punto central de navegación tras login.         |
| **E** | Estimable     | Cumple    | Alcance visible en la página de referencia.     |
| **S** | Pequeña       | Cumple    | Una página de resumen con secciones claras.     |
| **T** | Testeable     | Cumple    | Contenido y enlaces verificables por pruebas.   |

### Definition of Ready (DoR)

| Criterio DoR                       | Estado    | Notas                                                    |
| ---------------------------------- | --------- | -------------------------------------------------------- |
| Dependencias listas                | Parcial   | Requiere US-001 operativa para el escenario autenticado. |
| Inputs/outputs claros              | Cumple    | Lista de cuentas/movimientos y enlaces de atajos.        |
| Unidades de trabajo definidas      | Cumple    | Listadas arriba.                                         |
| Sin decisiones técnicas pendientes | Parcial   | Origen de datos definitivo para no-demo no cerrado.      |
| Referencias de UI                  | Parcial   | Sin Figma; referencia es código.                         |
| Sin aclaraciones pendientes        | No cumple | Ver **Observaciones** sobre atajos sin página destino.   |

## Observaciones

- **Diseño:** falta enlace a Figma u otro artefacto de diseño maestro.
- **Atajos:** enlaces como «Servicios» y «Pagos QR» pueden apuntar a rutas aún no implementadas; el comportamiento 404 o placeholder **DEBE** decidirse con producto.
- **Datos:** saldos y movimientos son demo; integración con sistemas reales **DEBE** tratarse en historias posteriores.
