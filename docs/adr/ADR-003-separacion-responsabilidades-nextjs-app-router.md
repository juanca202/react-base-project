# ADR-003: Separacion de responsabilidades moderna para Next.js App Router

- Estado: Accepted
- Fecha de creacion: 2026-05-11
- Ultima actualizacion: 2026-05-11
- Decisores: Equipo de arquitectura
- Tags: nextjs, app-router, arquitectura, separacion-responsabilidades, rsc

## Contexto

El proyecto necesita una forma estandar de separar responsabilidades en Next.js moderno con App Router para evitar que la logica de negocio, acceso a datos y reglas de interfaz queden mezcladas en componentes y rutas.

Sin una convencion explicita:

- los componentes de UI tienden a asumir responsabilidades de dominio y de orquestacion;
- los limites entre Server Components, Client Components y Route Handlers se vuelven difusos;
- aumenta el costo de mantenimiento, pruebas y onboarding por falta de ownership claro.

Ademas, el modelo de App Router introduce decisiones explicitas sobre borde server/client, data fetching y caching que requieren reglas de ubicacion para mantener coherencia.

## Decision

Se propone adoptar una separacion de responsabilidades por capas explicitas con organizacion feature-first, usando App Router como borde de entrega.

Alcance de la decision:

1. UI/presentacion: componentes y vistas orientadas a renderizado e interaccion, sin reglas de negocio complejas.
2. Casos de uso/servicios de aplicacion: orquestan flujos, permisos y coordinacion de dominio e infraestructura.
3. Dominio: entidades, value objects y reglas de negocio puras, independientes del framework.
4. Infraestructura/acceso a datos: repositorios, clientes HTTP/DB y adaptadores externos.
5. Validaciones/esquemas: contratos de entrada/salida centralizados para server actions, route handlers y formularios.
6. Bordes server/client: la mayoria de data fetching y mutaciones se ejecutan en server; Client Components solo para estado interactivo y comportamiento del navegador.

Reglas base de ubicacion y ownership:

- Las rutas en `app/` actuan como composicion y entrega, no como capa de negocio.
- Cada feature define su propio modulo vertical y dentro de este respeta las capas anteriores.
- Ninguna capa interna depende de capas externas con mayor acoplamiento (ejemplo: dominio no depende de infraestructura ni de React).
- Los contratos (tipos y esquemas) se versionan junto al caso de uso para evitar deriva entre UI y backend.

## Alternativas consideradas

- Opcion A: Enfoque feature-based puro sin capas explicitas.
  - Pros: alta velocidad inicial y baja friccion estructural para equipos pequenos.
  - Contras: facilita mezcla de responsabilidades dentro de cada feature y dificulta escalar consistencia arquitectonica.
- Opcion B: Arquitectura por capas clasica global sin vertical slices por feature.
  - Pros: limites conceptuales claros y reusable patterns en toda la aplicacion.
  - Contras: tiende a crear carpetas transversales grandes, con alta coordinacion entre equipos y menor ownership por feature.
- Opcion C: Enfoque full-stack en componentes sin separacion estricta (todo en routes/components).
  - Pros: DX simple al inicio y menos abstracciones aparentes.
  - Contras: mayor riesgo de acoplamiento, baja testabilidad de reglas de negocio y deuda tecnica acelerada al crecer producto.
- Opcion D: Capas explicitas dentro de vertical slices en App Router (decision propuesta).
  - Pros: equilibrio entre autonomia por feature y disciplina arquitectonica, con limites claros para server/client.
  - Contras: requiere gobernanza tecnica y mayor esfuerzo inicial de definicion de convenciones.

## Consecuencias

### Positivas

- Ownership mas claro por feature y por capa, reduciendo ambiguedad en PRs.
- Mejor testabilidad al mantener dominio y casos de uso con menor dependencia de framework.
- Menor riesgo de fuga de logica sensible a Client Components.
- Mayor coherencia para escalar App Router con RSC, Server Actions y Route Handlers.

### Negativas / trade-offs

- Aumenta la complejidad inicial de estructura frente a enfoques mas directos.
- Exige disciplina para evitar atajos que rompan limites de capa.
- Puede percibirse como sobreingenieria en features pequenas o prototipos tempranos.
- Requiere acuerdos de naming, ownership y revisiones arquitectonicas periodicas.

## Plan de adopcion (opcional)

- Definir guideline oficial de estructura por feature y capas en `docs/product/technical-docs/`.
- Aplicar la convencion en nuevas features primero (forward-only), evitando migracion masiva inicial.
- Marcar excepciones justificadas en historias/tareas cuando una feature requiera desvio temporal.
- Revisar en 2-3 iteraciones si el estado debe pasar de Proposed a Accepted con base en evidencia de uso.

## Referencias

- [Next.js App Router](https://nextjs.org/docs/app)
- [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Architecture Decision Records](https://github.com/joelparkerhenderson/architecture-decision-record)
- `docs/adr/ADR-001-calidad-codigo-herramientas.md`
- `docs/adr/ADR-002-biblioteca-componentes-base-ui.md`
