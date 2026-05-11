# TK-001: Pantalla de autenticación y flujo de acceso

- **ID:** TK-001
- **Estado:** Ready
- **Prioridad:** Media
- **Historia:** [US-001](./README.md)
- **Unidad de trabajo:** react-base-project

## Descripción

Entregar en la aplicación de referencia el comportamiento descrito en **US-001**, integrando el inicio de sesión con el contrato HTTP documentado en **[api-token-login](../../technical-docs/api-token-login.md)** (`POST /api/token`, `LoginRequest` / `LoginResponse`). La validación de credenciales y la emisión de tokens siguen siendo **simuladas en la demo** (sin proveedor de identidad ni backend de producto real), en línea con **RN-06**. El formulario, rutas protegidas, redirecciones y cierre de sesión con destino único al login deben seguir siendo verificables según la historia.

## Dependencias

- **Contrato de login** — [api-token-login](../../technical-docs/api-token-login.md): petición JSON `username` y `password`; respuesta exitosa con `token` (JWT) y `refresh_token`.
- **Next.js App Router** — páginas públicas y autenticadas, `redirect` / navegación según sesión.
- **Ruta API `POST /api/token`** — implementación en `src/app/api` que cumpla el cuerpo y el `Content-Type` del contrato; emisión de valores mock para JWT y refresh conforme a **RN-06**.
- **Rutas y proxy de la app** — `src/proxy.ts` y rutas bajo `src/app`: decisión de sesión válida coherente con cómo se persisten `token` y `refresh_token` (p. ej. cookies HTTP-only y política `sameSite` acordada en código).
- **Fin de sesión** — alinear `mock-logout` o el recurso de logout usado en la demo para invalidar las mismas cookies / estado que el flujo basado en `/api/token`.
- **Biblioteca de UI base** — componentes de formulario y layout alineados a [ADR-002](../../../../docs/adr/ADR-002-component-library-base-ui.md) cuando aplique.

## Referencias

- **Historia y criterios:** [US-001 — Pantalla de autenticación](./README.md).
- **Contrato HTTP de login:** [api-token-login](../../technical-docs/api-token-login.md).
- **Preferencias de repo (rutas en inglés, mocks):** [`.agents/MEMORY.md`](../../../../.agents/MEMORY.md).
- **Diseño:** [Figma — Pantallas taller SDD](https://www.figma.com/design/7pt2W7JSic4ZoAVcgvQ5qD/Pantallas-taller-SDD?node-id=36-1533&m=dev) (nodo`36-1533`).
- **Punto de partida en código (ajustar si el árbol cambia):** [`src/app/login/page.tsx`](../../../../src/app/login/page.tsx), [`src/app/api/token/route.ts`](../../../../src/app/api/token/route.ts) (a crear o completar según este TK), [`src/app/api/mock-login/route.ts`](../../../../src/app/api/mock-login/route.ts) (sustituir o dejar de usar tras migrar), [`src/app/api/mock-logout/route.ts`](../../../../src/app/api/mock-logout/route.ts), [`src/proxy.ts`](../../../../src/proxy.ts).

## Plan de implementación

### Contrato `POST /api/token` y alcance mock (RN-06)

1. Implementar **`POST /api/token`** con `Content-Type: application/json`, cuerpo **`LoginRequest`** (`username`, `password` obligatorios) y respuesta **`LoginResponse`** (`token`, `refresh_token`) tal como define [api-token-login](../../technical-docs/api-token-login.md). La firma real del JWT, la renovación con `refresh_token` y códigos de error enriquecidos se documentarán en technical-docs o ADR cuando producto o backend lo definan; mientras, usar valores **placeholder de demo** y un **401** con cuerpo JSON mínimo para credenciales rechazadas; documentar en código que no es seguridad de producción.
2. Para credenciales vacías o rechazadas por la regla mock acordada (p. ej. usuario y contraseña no vacíos para éxito, alineado a **RN-01** y al escenario Gherkin de la US), responder **`401`** con cuerpo JSON acotado (el contrato no define el error; usar mensaje estable y documentado en el handler).
3. Dejar de exponer el flujo de login basado solo en **`mock-login`** con `formData` y redirección directa, o redirigir ese recurso al nuevo contrato; una sola vía de entrada debe quedar clara para la demo.

### Persistencia de sesión tras `LoginResponse`

4. Tras **`200`** con `LoginResponse`, persistir el estado de sesión de forma compatible con **RN-02** y con el proxy: p. ej. cookies HTTP-only para el JWT y/o `refresh_token`, o cookie de sesión derivada, siempre explícito en la implementación y coherente con **RN-05** al cerrar sesión.

### Formulario de login (RN-01) y presentación

5. La pantalla de login debe enviar **`username` y `password`** vía cliente (`fetch` o acción de servidor) contra **`/api/token`** con JSON, no sustituir los campos obligatorios del formulario (**RN-01**).
6. Alinear la UI con el nodo de referencia en Figma salvo desviación explícita acordada con producto.

### Establecimiento de sesión y redirección tras login (RN-02)

7. Tras respuesta exitosa del endpoint, considerar al usuario autenticado y **redirigir al resumen / inicio autenticado** (**RN-02**).

### Rutas protegidas y visitante sin sesión (RN-04, primer escenario Gherkin)

8. Mantener un **mecanismo** reutilizable para rutas protegidas; **al menos una** ruta de demostración (**RN-04**). El proxy debe basarse en la misma fuente de verdad que el flujo `/api/token` (cookie o validación mock del JWT según implementación).
9. Visitante sin sesión válida en una ruta protegida → **redirigir a la pantalla de login** (primer escenario Gherkin; alcance de pruebas §1 de la US).

### Usuario ya autenticado en la pantalla de login (RN-03)

10. Si ya hay sesión válida y se solicita la ruta de login → **redirigir al resumen** (**RN-03**; alcance §2).

### Cierre de sesión y destino único (RN-05)

11. Cualquier acción explícita de cierre de sesión debe eliminar cookies / estado asociados a `/api/token` y **redirigir siempre** a la **misma** pantalla de login (**RN-05**; alcance §3).

### Peticiones autenticadas posteriores

12. Donde la demo consuma APIs internas “como autenticadas”, enviar **`Authorization: Bearer <token>`** según [api-token-login](../../technical-docs/api-token-login.md) si el token está disponible en cliente o vía cabeceras inyectadas desde servidor; si la demo solo usa cookies sin exponer el JWT al cliente, documentar esa excepción en el código sin contradecir el contrato documentado para integraciones futuras.

### Verificación según alcance de pruebas de la US

13. Comprobar el **alcance de las pruebas** de la historia (tres ítems): rutas protegidas con ruta de referencia; login estando ya autenticado; cierre de sesión con destino único al login.
14. Mantener trazabilidad de los escenarios Gherkin con el comportamiento implementado (no se exige automatización en esta tarea; sí que la solución permita verificar cada uno).
