# TK-001: Pantalla de configuración y enlaces legales

- **ID:** TK-001
- **Estado:** Ready
- **Prioridad:** Media
- **Historia:** [US-003](./README.md)
- **Unidad de trabajo:** react-base-project

## Descripción

Implementar y mantener la pantalla de configuración en la ruta **`/settings`** (segmento en inglés, alineado a las convenciones del repositorio). El acceso **DEBE** estar protegido por sesión según **US-003** (**RN-06**): sin sesión válida, redirigir al inicio de sesión en coherencia con **US-001**. La vista incluye enlaces a privacidad y términos, y cierre de sesión que invalide la sesión y redirija **siempre** a la pantalla de login (**RN-03**). Para completar la información del usuario en pantalla, consumir `GET /api/settings` y mapear `user.username`, `user.firstName`, `user.lastName` y `user.email` según el contrato técnico.

## Dependencias

- **Ruta y acceso** — página bajo `src/app/settings` (URL **`/settings`**); **proxy** (p. ej. `src/proxy.ts`) o mecanismo equivalente con **`/settings`** (y subrutas si existen) en el `matcher` y comprobación de sesión alineada a **US-001** / **TK-001** de autenticación.
- **Contenido o rutas de privacidad y términos** — según alcance de **US-003**.
- **Flujo de sesión / logout** — alineado a **US-001** y **RN-03**.
- **Contrato `Settings`** — lectura de datos del usuario autenticado según `api-settings.md` (solo con sesión válida).

## Referencias

- **Historia:** [US-003 — Configuración y legales](./README.md)
- **Diseño (Figma):** [Pantallas taller SDD — pantalla de configuración (Dev, nodo `36:1639`)](https://www.figma.com/design/7pt2W7JSic4ZoAVcgvQ5qD/Pantallas-taller-SDD?node-id=36-1639&m=dev)
- **Documentación técnica:** [`GET /api/settings` — configuración de usuario (`Settings`)](../../technical-docs/api-settings.md) — contrato para consultar datos de perfil; autorización relacionada con [inicio de sesión por token](../../technical-docs/api-token-login.md) cuando aplique.

## Plan de implementación

1. Mantener la UI de configuración en **`/settings`** y asegurar como acceso principal el ícono de perfil de usuario en la pantalla inicial de **US-002**, además de cualquier enlace secundario (p. ej. retorno desde legales).
2. Incluir **`/settings`** (y subrutas si existen) en el conjunto de rutas **protegidas** del proxy: visitante sin cookie de sesión (o criterio equivalente acordado con **US-001**) → redirección a **`/login`**.
3. Implementar la consulta a `GET /api/settings` y la presentación de datos de perfil (`username`, `firstName`, `lastName`, `email`) conforme a [`api-settings.md`](../../technical-docs/api-settings.md), aplicando el mecanismo de sesión/token de [`api-token-login.md`](../../technical-docs/api-token-login.md) cuando corresponda.
4. Garantizar que el cierre de sesión desde esta pantalla cumpla **US-001** y **RN-03** (invalidar sesión, destino único al login).
