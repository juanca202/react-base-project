# US-001: Pantalla de autenticación

- **ID:** US-001
- **Estado:** Ready

## Descripción

**Como** usuario de la demostración de banca web  
**Quiero** disponer de una pantalla de inicio de sesión con usuario y contraseña  
**Para** identificarme y acceder a las pantallas que el producto restringe a usuarios autenticados

## Reglas de negocio

- **RN-01** — El sistema **DEBE** ofrecer un formulario de inicio de sesión con campos de usuario y contraseña, ambos obligatorios para enviar el formulario.
- **RN-02** — Tras un inicio de sesión exitoso, el sistema **DEBE** redirigir al usuario al resumen (inicio autenticado) y **DEBE** tratarlo como usuario autenticado para el resto del flujo permitido.
- **RN-03** — Si el usuario ya está autenticado e intenta abrir la pantalla de login, el sistema **DEBE** redirigirlo al resumen en lugar de mostrar el formulario de nuevo.
- **RN-04** — El producto **DEBE** implementar un **mecanismo** para marcar **rutas protegidas** a las que solo pueden acceder usuarios autenticados. **DEBE** existir al menos una ruta protegida que demuestre ese mecanismo: quien no haya iniciado sesión **NO DEBE** poder usar ese contenido y el sistema **DEBE** redirigirlo a la pantalla de inicio de sesión. Qué rutas concretas quedarán protegidas **NO** está fijado aquí y se decidirá cuando producto lo defina.
- **RN-05** — Toda acción explícita de cierre de sesión expuesta en la aplicación (encabezado, configuración u otro flujo) **DEBE** dejar al usuario fuera del área autenticada y **DEBE** redirigirlo **siempre** a la misma pantalla de inicio de sesión, sin variar el destino según el punto desde el que cerró.
- **RN-06** — En el alcance de esta historia, la verificación de sesión y el tratamiento de la identidad **DEBEN** implementarse con **mocks** (sin backend ni proveedor de identidad real acordado hasta nueva definición). Las obligaciones anteriores relativas a rutas protegidas y redirecciones **DEBEN** cumplirse en ese mismo alcance y **NO DEBEN** interpretarse como garantías de seguridad de producción.

## Referencias

- **Diseño (Figma):** [Pantallas taller SDD — nodo de referencia](https://www.figma.com/design/7pt2W7JSic4ZoAVcgvQ5qD/Pantallas-taller-SDD?node-id=1-3167&m=dev) (archivo `7pt2W7JSic4ZoAVcgvQ5qD`, nodo `1-3167` en modo Dev).

## Criterios de aceptación

```gherkin
DADO un visitante sin sesión válida
CUANDO solicita una ruta que el producto haya definido como protegida mediante el mecanismo acordado
ENTONCES el sistema lo redirige a la pantalla de login

DADO un visitante sin sesión válida
CUANDO envía el formulario de login con usuario y contraseña no vacíos
ENTONCES el sistema reconoce al usuario como autenticado y lo redirige al resumen

DADO un usuario autenticado
CUANDO solicita la pantalla de login
ENTONCES el sistema lo redirige al resumen

DADO un usuario autenticado
CUANDO ejecuta una acción de cierre de sesión desde cualquier parte de la aplicación que la ofrezca
ENTONCES el sistema deja de considerarlo autenticado y lo redirige a la pantalla de login
```

## Alcance de las pruebas

El alcance de las pruebas para esta historia **DEBE** acotarse a lo siguiente (con mocks según **RN-06**):

1. **Mecanismo de rutas protegidas:** verificar, con al menos una ruta de referencia acogida a ese mecanismo, que quien no tiene sesión válida **NO DEBE** acceder a su contenido y **DEBE** ser redirigido a la pantalla de inicio de sesión (**RN-04**, **RN-06**; primer escenario Gherkin).
2. **Login estando ya autenticado:** verificar que, si el usuario **ya** está autenticado y solicita la pantalla de login, el sistema **DEBE** redirigirlo a la **pantalla inicial** (inicio autenticado / resumen; **RN-03**; tercer escenario Gherkin).
3. **Cierre de sesión en cualquier flujo:** verificar que, tras cerrar sesión desde cualquier punto donde exista la acción (p. ej. encabezado o configuración), el usuario **DEBE** quedar fuera de la sesión y **DEBE** ser llevado **siempre** a la pantalla de inicio de sesión (**RN-05**; cuarto escenario Gherkin).

## Complejidad sugerida

- **Story points:** 3 (Fibonacci: 1, 2, 3, 5, 8, 13)
- **Justificación:** Pantalla de autenticación, mecanismo de rutas protegidas, cierre de sesión y redirecciones en la experiencia.

## Unidades de trabajo

- react-base-project

## Validación

### INVEST

| Letra | Criterio      | Resultado | Notas                                                                                                                                                                                                                                                                                               |
| ----- | ------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **I** | Independiente | Cumple    | Se entiende por valor de negocio y flujo de usuario.                                                                                                                                                                                                                                                |
| **N** | Negociable    | Cumple    | Forma de implementar el comportamiento es negociable en las tareas técnicas.                                                                                                                                                                                                                        |
| **V** | Valiosa       | Cumple    | Sin pantalla y flujo de login no hay acceso al resto del flujo protegido.                                                                                                                                                                                                                           |
| **E** | Estimable     | Cumple    | Criterios y alcance funcional permiten estimar.                                                                                                                                                                                                                                                     |
| **S** | Pequeña       | Cumple    | Acotada a autenticación y acceso al flujo protegido descrito.                                                                                                                                                                                                                                       |
| **T** | Testeable     | Cumple    | El **Alcance de las pruebas** fija el foco obligatorio de verificación (rutas protegidas, login ya autenticado y cierre de sesión con destino único al login). Otros escenarios Gherkin pueden comprobarse según criterio del equipo. Amenazas de seguridad de producción quedan fuera del alcance. |

### Definition of Ready (DoR)

| Criterio DoR                       | Estado | Notas                                                                                                                                                                                                                                                                                   |
| ---------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dependencias listas                | Cumple | Alcance funcional definido sin dependencias externas de producto no indicadas aquí.                                                                                                                                                                                                     |
| Inputs/outputs claros              | Cumple | Entrada: credenciales en formulario; salida: usuario autenticado o no y redirecciones acordadas.                                                                                                                                                                                        |
| Unidades de trabajo definidas      | Cumple | Listadas arriba.                                                                                                                                                                                                                                                                        |
| Sin decisiones técnicas pendientes | Cumple | Para esta historia **no** queda pendiente una decisión técnica abierta: el alcance acordado es **implementación con mocks** (sesión simulada, sin API ni IdP real hasta nueva definición). Las rutas protegidas y las redirecciones al login se realizan en ese mismo alcance de mocks. |
| Referencias de UI                  | Cumple | Enlace a Figma en **Referencias** (pantalla / nodo indicado).                                                                                                                                                                                                                           |
| Sin aclaraciones pendientes        | Cumple | Lo que antes figuraba en observaciones queda cubierto por **RN-04** (catálogo de rutas por definir), **RN-06** (mocks e integración futura) y el resto de reglas.                                                                                                                       |
