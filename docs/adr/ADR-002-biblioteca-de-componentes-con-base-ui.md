# ADR-002: Biblioteca de componentes con Base UI

## Estado

Accepted

## Fechas

- Fecha de creacion: 2026-05-06
- Ultima actualizacion: 2026-05-06

## Decisores

- Equipo de Frontend
- Tech Lead

## Tags

- ui
- componentes
- accesibilidad
- base-ui
- arquitectura-frontend

## Contexto

El proyecto necesita una base consistente para construir componentes interactivos con buen soporte de accesibilidad, navegacion por teclado, roles ARIA y patrones compuestos reutilizables.

Hasta ahora, parte de la UI puede resolverse con HTML nativo y utilidades ad hoc, pero esto incrementa variabilidad en implementaciones, riesgo de regresiones de accesibilidad y costo de mantenimiento cuando crecen los patrones de interfaz.

Se requiere una decision explicita para estandarizar la capa base de componentes y establecer una regla de adopcion para nuevos desarrollos y refactors progresivos.

## Decision

Se adopta `@base-ui/react` como biblioteca base prioritaria para componentes de interfaz.

Regla principal:

- Usar primitivos de Base UI por encima de HTML nativo cuando exista un equivalente adecuado para el caso de uso, especialmente en escenarios de accesibilidad, interaccion por teclado, ARIA y patrones compuestos.

Regla de excepcion:

- Si Base UI no cubre el caso, se permite evaluar HTML nativo u otra dependencia especifica.
- Toda excepcion debe documentarse (motivo, alcance, riesgos y criterio de reevaluacion) en el artefacto tecnico correspondiente (US/TK/technical-doc) antes de consolidarse en implementacion.

## Alternativas consideradas

1. **HTML nativo como primera opcion**
   - Pros: cero dependencia adicional, control total del marcado.
   - Contras: mayor esfuerzo para garantizar a11y y patrones complejos de interaccion de forma consistente.

2. **Uso mixto sin biblioteca base definida**
   - Pros: flexibilidad por equipo/componente.
   - Contras: inconsistencia arquitectonica, mayor deuda tecnica y curva de mantenimiento heterogenea.

3. **Otra biblioteca de componentes como base principal**
   - Pros: ecosistemas alternativos con mayor opinion sobre estilos o componentes completos.
   - Contras: menor alineacion con enfoque de primitivos y composicion adoptado para este proyecto en esta decision.

## Consecuencias

### Positivas

- Mayor consistencia en componentes interactivos y patrones compuestos.
- Mejora sistematica en accesibilidad y experiencia de teclado/lectores de pantalla.
- Reduccion de implementaciones ad hoc y menor variabilidad en PRs de UI.
- Base comun para documentacion tecnica y guias de desarrollo de frontend.

### Trade-offs / Costos

- Curva de adopcion inicial del equipo en API y patrones de Base UI.
- Dependencia externa adicional para la capa base de componentes.
- Necesidad de gobernar excepciones para evitar desalineacion progresiva.
- Posibles casos limite donde sea necesario complementar con soluciones fuera de Base UI.

## Referencias

- [Base UI React - Quick Start](https://base-ui.com/react/overview/quick-start.md)
- [Base UI - LLMs context](https://base-ui.com/llms.txt)

## Plan de adopcion

1. Publicar esta decision en `docs/adr` y comunicarla al equipo de frontend.
2. Priorizar Base UI en todo componente nuevo con interaccion, foco o semantica ARIA relevante.
3. Definir una plantilla breve para documentar excepciones (contexto, motivo, alternativa y criterio de reevaluacion).
4. Revisar componentes existentes de mayor impacto y planificar migraciones incrementales en backlog tecnico.
5. Incorporar checklist de cumplimiento en PRs de UI para verificar uso de Base UI o excepcion documentada.
6. Revaluar adopcion y excepciones luego de 2 sprints para ajustar lineamientos si aplica.
