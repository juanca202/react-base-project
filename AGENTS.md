<!-- BEGIN:nextjs-agent-rules -->

# Contexto inicial para agentes

## 1) Reglas y decisiones del proyecto (orden de consulta obligatorio)

1. Las decisiones y reglas del proyecto se consultan primero en `.agents/MEMORY.md`.
2. Luego revisar `docs/adr` segun el tema cuando existan ADRs.
3. Si hay ambiguedades entre reglas o decisiones, preguntar al usuario antes de proceder.
4. Si la respuesta del usuario puede servir para futuras consideraciones, preguntarle si desea guardarla en `.agents/MEMORY.md` antes de actualizar ese archivo.

## 2) Regla clave de Next.js

Esta versión introduce cambios incompatibles: las APIs, las convenciones y la estructura de archivos pueden diferir de los datos de entrenamiento.

- Usar como referencia principal el skill `/next-best-practices`.
- Como respaldo, consultar `node_modules/next/dist/docs/`.
- No asumir que prácticas históricas de Next.js siguen vigentes.
- Atender avisos de obsolescencia.

## 3) Uso obligatorio de agentes especializados

- Implementación HTML/UI: usar `.agents/agents/ui-specialist.md`.
- Testing: usar `.agents/agents/quality-specialist.md`.
- Documentación: usar `.agents/agents/docs-specialist.md`.

## 4) Implementación desde diseños en Figma (obligatorio)

- Para implementar desde diseños con referencia Figma, es obligatorio usar el skill `/figma-implement-design`.

<!-- END:nextjs-agent-rules -->
