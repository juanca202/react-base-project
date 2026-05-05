<!-- BEGIN:nextjs-agent-rules -->

# Contexto inicial para agentes

## 1) Orden de referencia (obligatorio)

1. Revisar `docs/adr/README.md` y, según el tema:
   - `docs/adr/ADR-001-code-quality-tooling.md`
   - `docs/adr/ADR-002-component-library-base-ui.md`
   - `docs/adr/ADR-003-separation-of-concerns-layers.md`
2. Si falta una definición o preferencia del repo, revisar `.agents/MEMORY.md`.
3. Si aún hay ambiguedad, preguntar al usuario o actualizar `.agents/MEMORY.md` cuando corresponda.

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
