# TK-001: Pantalla de configuración y enlaces legales

- **ID:** TK-001
- **Estado:** Draft
- **Historia:** [US-003](./README.md)
- **Unidad de trabajo:** react-base-project

## Descripción

Implementar y mantener la pantalla de configuración en la ruta **`/settings`** (segmento en inglés, alineado a las convenciones del repositorio). El acceso **DEBE** estar protegido por sesión según **US-003** (**RN-06**): sin sesión válida, redirigir al inicio de sesión en coherencia con **US-001**. La vista incluye enlaces a privacidad y términos, y cierre de sesión que invalide la sesión y redirija **siempre** a la pantalla de login (**RN-03**). Para los datos de perfil mostrados, consumir el contrato de **Referencias** de forma que se cumpla **RN-05**.

## Dependencias

- **Ruta y acceso** — página bajo `src/app/settings` (URL **`/settings`**); **proxy** (p. ej. `src/proxy.ts`) o mecanismo equivalente con **`/settings`** (y subrutas si existen) en el `matcher` y comprobación de sesión alineada a **US-001** / **TK-001** de autenticación.
- **Contenido o rutas de privacidad y términos** — según alcance de **US-003**.
- **Flujo de sesión / logout** — alineado a **US-001** y **RN-03**.
- **Contrato `Settings`** — lectura de datos del usuario autenticado según `api-settings.md` (solo con sesión válida).

## Referencias

- **Historia:** [US-003 — Configuración y legales](./README.md)
- **Código (referencia):** [`src/app/settings/page.tsx`](../../../../src/app/settings/page.tsx), [`src/proxy.ts`](../../../../src/proxy.ts)
- **Documentación técnica:** [`GET /api/settings` — configuración de usuario (`Settings`)](../../technical-docs/api-settings.md) — contrato para consultar datos de perfil; autorización relacionada con [inicio de sesión por token](../../technical-docs/api-token-login.md) cuando aplique.

## Plan de implementación

1. Mantener la UI de configuración en **`/settings`** y enlaces de navegación del producto que apunten a esa ruta (p. ej. encabezado, retorno desde legales).
2. Incluir **`/settings`** (y subrutas si existen) en el conjunto de rutas **protegidas** del proxy: visitante sin cookie de sesión (o criterio equivalente acordado con **US-001**) → redirección a **`/login`**.
3. Implementar la obtención y presentación de datos de perfil conforme a [`api-settings.md`](../../technical-docs/api-settings.md) y al mecanismo de sesión/token de [`api-token-login.md`](../../technical-docs/api-token-login.md) si aplica al proyecto.
4. Garantizar que el cierre de sesión desde esta pantalla cumpla **US-001** y **RN-03** (invalidar sesión, destino único al login).

## Observaciones

- Revisar con **US-001** / **TK-001** de autenticación que el nombre y la semántica de la cookie o del token en el proxy coincidan tras migraciones (p. ej. `POST /api/token`).
