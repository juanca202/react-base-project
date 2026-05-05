# Preferencias del repositorio

- **Rutas URL y segmentos de ruta:** deben estar en **inglés** (nombres de carpetas bajo `app/`, `href`, redirects, etc.). No usar español en paths públicos.

- **Backend (estado actual):** no hay servicio de backend real acordado todavía; el comportamiento que en producción sería de API o IdP **debe** simularse con **mocks** (rutas API de demo, datos en memoria, etc.) hasta que exista integración.

- **Regla de referencias (technical-docs):** los documentos en `docs/product/technical-docs/` **no deben** incluir referencias a tareas (`TK-XXX`) ni a historias (`US-XXX`).

- **Regla de referencias (tareas TK):** las tareas bajo `docs/product/user-stories/US-XXX-.../TK-XXX-...` **sí pueden** referenciar documentos técnicos en `docs/product/technical-docs/`.

- **Regla de referencias (historias US):** los `README.md` de historias (`US-XXX`) **no deben** incluir referencias a tareas (`TK-XXX`) ni a documentos técnicos (`docs/product/technical-docs/`).

- preferred language: es
