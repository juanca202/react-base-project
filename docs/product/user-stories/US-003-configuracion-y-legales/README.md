# US-003: Configuración y enlaces legales

- **ID:** US-003
- **Estado:** Draft

## Descripción

**Como** usuario autenticado  
**Quiero** un punto central desde el que consultar términos y privacidad y gestionar lo referente a mi usuario (incluida la salida de la aplicación cuando corresponda)  
**Para** cumplir la transparencia legal y tener control claro sobre mi sesión y preferencias asociadas a mi cuenta

El objetivo del alcance es **implementar** las pantallas y flujos según diseño y reglas de negocio: **no** se asume que las vistas o rutas ya existan en el producto; las crea el trabajo derivado de esta historia.

## Reglas de negocio

- **RN-01** — La pantalla de configuración **DEBE** permitir navegar a la política de privacidad y a los términos y condiciones mediante enlaces claros.
- **RN-02** — El usuario **DEBE** poder volver al flujo principal (p. ej. enlace explícito al inicio) desde la pantalla de configuración.
- **RN-03** — Cualquier acción explícita de «cerrar sesión» en esta pantalla **DEBE** cumplir lo definido en **US-001**: invalidar la sesión y redirigir **siempre** a la pantalla de inicio de sesión (mismo destino que cualquier otro flujo de cierre de sesión acordado).
- **RN-04** — La lista de opciones **DEBE** presentarse como navegación reconocible (p. ej. lista o grupo de enlaces con estados hover/focus acordes a accesibilidad básica).
- **RN-05** — Los datos de perfil y la información de cuenta mostrados en la pantalla de configuración **DEBEN** corresponder al usuario autenticado en la sesión actual; la pantalla **NO DEBE** exponer datos de otra persona.
- **RN-06** — El acceso a la pantalla de configuración **DEBE** estar protegido por sesión: un visitante sin sesión válida **NO DEBE** obtener el contenido de esa pantalla y **DEBE** ser redirigido al inicio de sesión, de forma coherente con **US-001**.

## Referencias

- **Diseño / prototipo (URL):** [Pantallas taller SDD — nodo de configuración](https://www.figma.com/design/7pt2W7JSic4ZoAVcgvQ5qD/Pantallas-taller-SDD?node-id=1-1117&m=dev)

## Criterios de aceptación

```gherkin
DADO un visitante sin sesión válida
CUANDO intenta acceder a la pantalla de configuración
ENTONCES el sistema lo redirige a la pantalla de inicio de sesión

DADO un usuario autenticado
CUANDO accede a la pantalla de configuración
ENTONCES ve enlaces a privacidad y términos y un vínculo para volver al inicio

DADO un usuario autenticado con sesión válida
CUANDO la pantalla de configuración muestra la información de perfil o cuenta
ENTONCES la información corresponde al usuario de esa sesión y no a otro usuario

DADO un usuario autenticado en configuración
CUANDO elige la política de privacidad
ENTONCES accede al contenido de política de privacidad del producto

DADO un usuario autenticado en configuración
CUANDO elige términos y condiciones
ENTONCES accede al contenido de términos y condiciones del producto

DADO un usuario autenticado en configuración
CUANDO ejecuta la acción de cerrar sesión
ENTONCES deja de estar autenticado y es redirigido a la pantalla de inicio de sesión
```

## Complejidad sugerida

- **Story points:** 2 (Fibonacci: 1, 2, 3, 5, 8, 13)
- **Justificación:** Alcance acotado (navegación legal, coherencia de datos de usuario según **RN-05**, salida alineada a **US-001**); la implementación de vistas sigue el diseño enlazado.

## Unidades de trabajo

- react-base-project

## Validación

### INVEST

| Letra | Criterio      | Resultado | Notas                                                                                                                                |
| ----- | ------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **I** | Independiente | Parcial   | La semántica de sesión y logout **DEBE** alinearse con **US-001**. Las pantallas y rutas se entregan en el alcance de esta historia. |
| **N** | Negociable    | Cumple    | Orden de ítems y etiquetas negociables.                                                                                              |
| **V** | Valiosa       | Cumple    | Cumplimiento normativo y UX de salida y gestión de usuario.                                                                          |
| **E** | Estimable     | Cumple    | Flujos y reglas funcionales acotados; detalle de integración en tareas de implementación.                                            |
| **S** | Pequeña       | Cumple    | Conjunto coherente de pantallas de configuración y enlaces legales.                                                                  |
| **T** | Testeable     | Cumple    | Navegación y resultado de logout verificables.                                                                                       |

### Definition of Ready (DoR)

| Criterio DoR                       | Estado  | Notas                                                                                                                                           |
| ---------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Dependencias listas                | Parcial | **US-001** para cierre de sesión y destino de login; el resto del alcance es implementación propia de esta historia.                            |
| Inputs/outputs claros              | Cumple  | Destinos de contenido legal, configuración y resultado de cierre de sesión.                                                                     |
| Unidades de trabajo definidas      | Cumple  | Listadas arriba.                                                                                                                                |
| Sin decisiones técnicas pendientes | Parcial | **RN-06** (acceso protegido por sesión); **RN-03** / **US-001** (logout); contratos HTTP y ruta URL concreta en **TK-001** y `technical-docs/`. |
| Referencias de UI                  | Cumple  | Figma enlazado en **Referencias**.                                                                                                              |
| Sin aclaraciones pendientes        | Cumple  | Ninguna.                                                                                                                                        |
