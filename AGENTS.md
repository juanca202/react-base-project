<!-- BEGIN:nextjs-agent-rules -->

**`.agents/MEMORY.md`:** si necesitas una definición, flag o preferencia **específica de este repositorio** que no esté en ADRs ni deducible del código, **revisa primero** ese archivo para no tener que consultar al usuario cuando ya esté documentado. Si falta algo imprescindible, pregunta o amplía `.agents/MEMORY.md` cuando corresponda.

**ADRs del repositorio:** antes de asumir decisiones de arquitectura o convenciones base, revisa `docs/adr/README.md` y, según el tema, consulta:

- `docs/adr/ADR-001-code-quality-tooling.md`
- `docs/adr/ADR-002-component-library-base-ui.md`
- `docs/adr/ADR-003-separation-of-concerns-layers.md`

# Esto NO es el Next.js que conoces

Esta versión introduce cambios incompatibles: las APIs, las convenciones y la estructura de archivos pueden diferir de los datos de tu entrenamiento. Lee la guía pertinente en `node_modules/next/dist/docs/` antes de escribir código. Atiende los avisos de obsolescencia.

<!-- END:nextjs-agent-rules -->
