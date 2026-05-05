<!-- BEGIN:nextjs-agent-rules -->

# Contexto inicial para agentes

## 1) Orden de referencia (obligatorio)

1. Revisar primero `.agents/MEMORY.md`.
2. Revisar los ADR segun el tema:
   - [ADR-001: Calidad de codigo y herramientas para Next.js](docs/adr/ADR-001-code-quality-tooling.md)
   - [ADR-002: Biblioteca de componentes con Base UI](docs/adr/ADR-002-component-library-base-ui.md)
   - [ADR-003: Separacion de responsabilidades — Core, Shared, Cross y Features](docs/adr/ADR-003-separation-of-concerns-layers.md)
3. Si hay ambiguedades, preguntar al usuario y actualizar `.agents/MEMORY.md`.

## 2) Regla clave de Next.js

Esta versión introduce cambios incompatibles: las APIs, las convenciones y la estructura de archivos pueden diferir de los datos de entrenamiento.

- Usar como referencia principal el skill `/next-best-practices`.
- Como respaldo, consultar `node_modules/next/dist/docs/`.
- No asumir que prácticas históricas de Next.js siguen vigentes.
- Atender avisos de obsolescencia.

## 3) Enrutamiento por tipo de trabajo

- Implementación HTML/UI: `@.agents/agents/ui-specialist.md`
- Testing: `@.agents/agents/quality-specialist.md`
- Documentación: `@.agents/agents/docs-specialist.md`
- Implementación desde diseños con referencia Figma: `/figma-implement-design`

<!-- END:nextjs-agent-rules -->
