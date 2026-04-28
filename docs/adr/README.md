# Registros de Decisiones Arquitectónicas (ADRs)

Este directorio contiene los ADRs del proyecto. Cada ADR documenta una decision arquitectonica relevante, su contexto y sus consecuencias.

En este repositorio, los ADRs se alinean con mejores practicas de Next.js (App Router), React Server Components (RSC), TypeScript y convenciones de despliegue.

## Que son los ADRs

Los ADRs capturan decisiones de arquitectura para:

- **Documentar decisiones:** explicar por que se eligio una alternativa.
- **Compartir conocimiento:** mantener contexto tecnico para el equipo.
- **Mantener consistencia:** reducir decisiones contradictorias en nuevas features.
- **Acelerar onboarding:** entender la arquitectura sin depender de conocimiento oral.

## Formato estandar de ADR

Cada ADR debe incluir, como minimo:

- **Titulo**
- **Estado** (`Proposed`, `Accepted`, `Deprecated`, `Superseded`)
- **Fecha de creacion**
- **Ultima actualizacion**
- **Decisores**
- **Contexto**
- **Decision**
- **Consecuencias**
- **Alternativas consideradas**

## Plantilla recomendada

Usa este bloque como base para nuevos ADRs:

```md
# ADR-XXX: <titulo>

- Estado: Proposed | Accepted | Deprecated | Superseded
- Fecha de creacion: YYYY-MM-DD
- Ultima actualizacion: YYYY-MM-DD
- Decisores: <nombres/roles>
- Tags: nextjs, app-router, rsc, performance, security, etc.

## Contexto

<problema, restricciones, drivers tecnicos o de negocio>

## Decision

<decision concreta y alcance>

## Alternativas consideradas

- Opcion A: <pros/contras>
- Opcion B: <pros/contras>

## Consecuencias

### Positivas

- <impacto esperado>

### Negativas / trade-offs

- <costos o riesgos asumidos>

## Plan de adopcion (opcional)

- <pasos de rollout o migracion>

## Referencias

- <links internos/externos>
```

## Checklist de calidad para ADRs en Next.js

Antes de aceptar un ADR, validar que cubra (si aplica):

- Limites entre **Server Components** y **Client Components** (`'use client'` solo donde se necesite).
- Estrategia de datos: `fetch` en servidor, Server Actions y/o Route Handlers.
- Caching y rendering (`static`, `dynamic`, `revalidate`, invalidacion).
- Manejo de errores (`error.tsx`, `not-found.tsx`, redirecciones).
- Metadata/SEO (`metadata`, `generateMetadata`, Open Graph).
- Performance de assets (`next/image`, `next/font`, `next/script`).
- Consideraciones de seguridad y gestion de secretos.
- Observabilidad y testing de la decision.

## ADRs actuales

- [ADR-001: Calidad de codigo y herramientas para Next.js](./ADR-001-code-quality-tooling.md)

## Backlog sugerido de ADRs (Next.js)

Lista inicial recomendada para este proyecto:

1. Estructura de carpetas en `src/app` y convenciones de rutas.
2. Politica de Server vs Client Components.
3. Estrategia de data fetching y cache invalidation.
4. Estrategia de autenticacion/autorizacion.
5. Estrategia de manejo de errores y estados vacios.
6. Estrategia de testing (unit, integration, e2e).
7. Estrategia de observabilidad (logs, metrics, tracing).
8. Estrategia de despliegue y entornos.

## ADRs vs Skills (separacion de responsabilidades)

Para mantener la documentacion limpia y reutilizable:

- **ADRs (`docs/adr/`)** documentan decisiones arquitectonicas y su justificacion.
- **Skills (`.agents/skills/`)** contienen instrucciones operativas para asistentes de IA.

## Como crear un nuevo ADR

1. Crear `ADR-XXX-<slug>.md` con numeracion secuencial.
2. Copiar la plantilla y completar todos los campos requeridos.
3. Incluir trade-offs y alternativas descartadas.
4. Agregar ejemplos concretos cuando mejore la comprension.
5. Actualizar este indice con el nuevo enlace.

## Estados de ADR

- **Proposed:** decision en evaluacion.
- **Accepted:** decision aprobada e implementada (o comprometida).
- **Deprecated:** decision obsoleta por cambios de contexto.
- **Superseded:** decision reemplazada por otro ADR (referenciarlo).

## Referencias

- [Architecture Decision Records (ADR)](https://github.com/joelparkerhenderson/architecture-decision-record)
- [Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- [Next.js Documentation](https://nextjs.org/docs)
- [Documentacion principal](../README.md)
