---
name: adr-create
description: Usar este skill cuando el usuario pida **nuevo ADR**, **documentar una decisión arquitectónica** o **alinear** un ADR existente a estas convenciones.
license: MIT
---

## Subagente obligatorio

Este skill **debe** ejecutarse mediante el agente `docs-specialist`. No sustituir por otro agente ni por el asistente general para el trabajo cubierto por este skill. Alcance permitido: **solo documentación** (sin código de aplicación, sin compilar, empaquetar, instalar dependencias con efecto en el producto ni ejecutar pruebas). Las **reglas, plantilla, pasos y ejemplos** del ADR están en este documento; la identidad operativa, las prohibiciones de alcance y el flujo documental general corresponden al agente citado.

# Definir Architecture Decision Record (ADR)

## Purpose

Guiar al agente para **crear o actualizar** un ADR en el repo del producto: archivo `docs/adr/ADR-XXX-<slug>.md` según la plantilla de `references/adr-template.md`, metadatos obligatorios, **trade-offs** y **alternativas** honestas, y **checklist de calidad** alineada con buenas prácticas del stack tecnológico que se use, con nota en **Contexto** o **Observaciones** del flujo al usuario).

**Separación de responsabilidades:** los ADRs en `docs/adr/` documentan **decisiones de arquitectura** y su justificación. Los skills del repositorio contienen **instrucciones operativas** para la IA; no duplicar en un ADR el contenido de un skill ni mezclar propósitos.

## Scope

**Incluye:**

- Estructura bajo `docs/adr/` (archivo `ADR-XXX-<slug>.md` por decisión).
- Redacción con todas las secciones mínimas de la plantilla: título, **Estado**, fechas, **Decisores**, **Tags** (cuando apliquen), **Contexto**, **Decisión**, **Alternativas consideradas**, **Consecuencias** (positivas y negativas/trade-offs), **Referencias**; **Plan de adopción** si hay rollout o migración.
- Numeración **secuencial** `ADR-001`, `ADR-002`, … y **slug** en kebab-case descriptivo.
- Actualización del **índice** en `docs/adr/README.md` (o el archivo que liste ADRs en el repo) con enlace al nuevo o modificado ADR, si ese archivo existe.
- Estado **Superseded:** referenciar el ADR que reemplaza la decisión (y en el ADR nuevo, referenciar al sustituido si el equipo lo documenta así).

**No incluye:**

- Implementar código, migraciones ni cambios de configuración de build (**fuera** del alcance del subagente documental).
- Sustituir **decisiones no acordadas:** si faltan decisores, alcance o alternativas reales, el agente debe **preguntar** o dejar **lagunas explícitas** (no inventar consenso).

## Inputs

Para ejecutar bien el skill, el agente necesita (cuanto más completo, mejor):

- **Qué** problema o tensión arquitectónica se resuelve y **qué** se decide (aunque sea borrador en **Proposed**).
- **Quiénes** participan o aprueban (**Decisores**), o acuerdo de dejar TBD con plan de cierre.
- **Alternativas** que se barajaron, aunque sea a alto nivel, o permiso del usuario para listar «pendiente de taller» con honestidad.
- **ID** `ADR-XXX` si ya existe; si no, inferir el siguiente libre en `docs/adr/`.
- **Stack** del proyecto, para aplicar el **checklist** con sentido.
- Cualquier **ADR previo** o documento que deba citarse en **Referencias**.

Si con lo recibido **no** se puede documentar **Alternativas** o **Consecuencias** sin forzar, el agente debe **ampliar entradas** preguntando al usuario antes de dar el documento por **Accepted**.

## Outputs

1. **Archivo** `docs/adr/ADR-XXX-<slug>.md` con la **misma estructura** que la plantilla empaquetada en `references/adr-template.md` (sin volcar al repo el fichero de referencia tal cual).
2. **Metadatos** coherentes: **Fecha de creacion** y **Ultima actualizacion** (ISO `YYYY-MM-DD`); al editar un ADR existente, actualizar **Ultima actualizacion**.
3. **Índice actualizado** en `AGENTS.md` con enlace al ADR, **si** ese índice existe o el usuario pidió crearlo.
4. Cuando el estado sea **Superseded** o **Deprecated**, vínculos claros entre ADRs en **Referencias** o en los metadatos según convenga al equipo.

## Estados de ADR

- **Proposed:** decisión en evaluación.
- **Accepted:** decisión aprobada e implementada (o comprometida).
- **Deprecated:** decisión obsoleta por cambios de contexto.
- **Superseded:** decisión reemplazada por otro ADR (**referenciar** el ADR sucesor).

## Checklist de calidad (cuando aplique)

Antes de considerar un ADR **Accepted**, validar que el contenido cubra **si aplica** al alcance de la decisión.

Si un ítem **no aplica**, indicarlo brevemente en **Contexto** o **Consecuencias** para evitar ambigüedad.

## Rules

1. **Plantilla:** el contenido debe seguir `references/adr-template.md`; **no** incluir en el ADR párrafos instructivos de la plantilla de referencia (p. ej. «Solo plantilla») como si fueran parte de la decisión.
2. **Numeración:** usar el siguiente `ADR-XXX` libre revisando archivos existentes en `docs/adr/`; **no** reutilizar números salvo corrección explícita acordada con el usuario.
3. **Slug:** nombre de archivo `ADR-XXX-<slug>.md` con **slug** en minúsculas, **kebab-case**, corto y descriptivo.
4. **Honestidad:** alternativas y trade-offs **reales**; si algo no se evaluó, decirlo en lugar de listar opciones inventadas.
5. **Proposed vs Accepted:** **Accepted** solo cuando decisores, alcance y consecuencias estén alineados con lo acordado; si el usuario solo quiere volcar una propuesta, usar **Proposed**.
6. **Referencias:** enlaces internos (otros ADRs, `docs/...`) y externos (Next.js, RFCs, posts); rutas relativas coherentes con el repo.
7. **Índice:** si existe `docs/adr/README.md` con lista de ADRs, **añadir** el nuevo enlace manteniendo orden por número o por fecha según el estilo del archivo.

## Steps

1. Revisar **Inputs**; si falta información esencial para no contradecir el alcance, **parar** y preguntar al usuario.
2. Crear `docs/adr/` si no existe.
3. Fijar `**ADR-XXX`**: usar el proporcionado o el siguiente libre (listar `ADR-*.md`).
4. Fijar **slug** en kebab-case; validar con el usuario si el título o el slug son ambiguos.
5. Escribir `ADR-XXX-<slug>.md` aplicando la plantilla de `references/adr-template.md`, rellenando metadatos y secciones con contenido real.
6. Aplicar el **checklist de calidad Next.js** donde corresponda al tema del ADR; documentar N/A donde proceda.
7. Actualizar **Ultima actualizacion**; en ADRs nuevos, igualar creación y última actualización salvo que el usuario indique lo contrario.
8. Actualizar `**docs/adr/README.md`** (o índice del repo) si existe.
9. Entregar resumen al usuario: ruta del archivo, estado elegido y pendientes si los hay.

## Examples

**Ejemplo 1 — Input mínimo viable**

- *Input:* «ADR para usar Server Actions para mutaciones en lugar de solo API routes.»
- *Output:* `docs/adr/ADR-00X-server-actions-mutaciones.md` con Contexto, Decisión, alternativas (p. ej. Route Handlers vs Server Actions), consecuencias positivas/negativas, checklist tocado donde aplique, estado **Proposed** o **Accepted** según acuerdo del usuario.

**Ejemplo 2 — Falta información**

- *Input:* «Documenta que usamos Redis para sesiones.»
- *Output (comportamiento):* Preguntas sobre decisores, alternativas evaluadas (cookie JWT, DB, etc.), implicaciones de despliegue y secretos antes de cerrar **Accepted**.

**Ejemplo 3 — Supersedes**

- *Input:* «El ADR-003 sobre capas queda reemplazado por uno nuevo de feature folders.»
- *Output:* Nuevo `ADR-00Y-....md` en **Accepted**, ADR antiguo actualizado a **Superseded** con enlace al nuevo; índice actualizado.

## Anti-patterns

- ADR **vago** («usamos buenas prácticas») sin decisión acotada ni alternativas.
- Marcar **Accepted** sin **alternativas** o **consecuencias** creíbles.
- **Inventar** decisores o reuniones que no ocurrieron.
- Olvidar actualizar el **índice** de `docs/adr/` cuando el repo lo mantiene.
- Duplicar el contenido de una **skill** operativa dentro del ADR en lugar de referenciar el propósito y la decisión arquitectónica.
- Numeración **ADR-XXX** duplicada o saltos sin motivo documentado.

## Notes

### Convención de nombre de archivo

- Formato: `ADR-XXX-<slug>.md` con **XXX** numérico en tres dígitos si el equipo sigue ese padding (`ADR-001`, …); si el repo usa otro esquema, alinearse a los archivos existentes.
- **Slug:** minúsculas, kebab-case, sin espacios.

### Referencia empaquetada

La plantilla del cuerpo del ADR está en `references/adr-template.md` dentro del paquete del skill; sirve como **molde** para el contenido en `docs/adr/`, no como documento a versionar como archivo `adr-template.md` en el producto.

### Backlog sugerido (ideas de ADRs en proyectos Next.js)

Lista de inspiración; **no** crear archivos salvo petición del usuario: estructura de `src/app` y rutas; política Server vs Client Components; data fetching e invalidación de caché; autenticación/autorización; errores y estados vacíos; testing; observabilidad; despliegue y entornos.

### Lecturas externas (referencia del equipo)

- [Architecture Decision Records (ADR)](https://github.com/joelparkerhenderson/architecture-decision-record)
- [Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)

