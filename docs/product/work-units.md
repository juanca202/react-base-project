# Unidades de trabajo

Catálogo de unidades usadas en el metadato **Unidad de trabajo** de las tareas (`TK-XXX` bajo `docs/product/user-stories/US-.../`).

---

## react-base-project

Aplicación Next.js (rutas y páginas bajo `src/app`, `layout.tsx`, estilos globales, encabezado con sesión, componentes de servidor y de cliente, proxy en `src/proxy.ts`), rutas API mock bajo `src/app/api` incluido el contrato **`POST /api/token`** descrito en `docs/product/technical-docs/api-token-login.md` (emisión mock de JWT y refresh), y módulos de dominio bajo `src/features` con UI en cliente, datos mock y llamadas que simulan latencia y reglas. El alcance es la experiencia y la lógica simulada en el front en un solo código base; no incluye microservicios externos, persistencia real, despliegue ni infraestructura.
