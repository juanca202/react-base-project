# ADR-002: Biblioteca de componentes base con Base UI

- Estado: Accepted
- Fecha de creacion: 2026-05-11
- Ultima actualizacion: 2026-05-11
- Decisores: Equipo de arquitectura
- Tags: frontend, componentes, accesibilidad, base-ui, nextjs

## Contexto

El proyecto necesita una base de componentes reutilizables que reduzca implementaciones ad hoc de patrones de interfaz complejos (dialogos, menus, popovers, selects) y mejore consistencia en accesibilidad.

Con HTML nativo como primera opcion para todos los casos, el equipo asume mas trabajo manual para:

- manejo de teclado y foco;
- atributos y relaciones ARIA;
- estados compuestos y comportamiento consistente entre componentes.

Se busca una decision que priorice accesibilidad y velocidad de implementacion sin bloquear casos donde no exista un primitivo adecuado.

## Decision

Se adopta `@base-ui/react` como biblioteca base de componentes del proyecto.

Alcance de la decision:

1. Se priorizan primitivos de Base UI frente a HTML nativo cuando exista componente equivalente.
2. La prioridad aplica especialmente a casos con requisitos de accesibilidad, teclado, ARIA y patrones compuestos.
3. Si Base UI no ofrece una pieza adecuada para el caso, se permite evaluar HTML nativo u otra dependencia puntual.
4. Toda excepcion debe documentarse explicitamente (motivo, alternativa elegida e impacto) en el artefacto de diseno/decision correspondiente del trabajo.

## Alternativas consideradas

- Opcion A: Priorizar HTML nativo como base principal.
  - Pros: cero dependencias adicionales y control total de la implementacion.
  - Contras: mayor costo recurrente para implementar accesibilidad y patrones complejos de forma consistente.
- Opcion B: Adoptar biblioteca headless alternativa (por ejemplo Radix UI u otras similares).
  - Pros: ecosistema conocido y primitives maduros en el mercado.
  - Contras: no existe evaluacion comparativa formal documentada en este momento; cambiar de biblioteca ahora agregaria costo de evaluacion y decision adicional.
- Opcion C: Adoptar Base UI como biblioteca base (decision tomada).
  - Pros: primitives orientados a accesibilidad y composicion; reduce implementaciones manuales repetitivas.
  - Contras: incorpora dependencia externa y curva de aprendizaje del equipo.

## Consecuencias

### Positivas

- Mayor consistencia en componentes interactivos y comportamiento de teclado/foco.
- Menor esfuerzo de implementacion para patrones de UI compuestos.
- Base comun para estandarizar criterios de accesibilidad en el sistema de componentes.

### Negativas / trade-offs

- Dependencia del roadmap y cambios de una libreria externa.
- Necesidad de capacitar al equipo en APIs y patrones de Base UI.
- Algunos componentes o casos limite pueden requerir wrappers o adaptaciones propias.
- Se mantiene una ruta de excepcion (HTML nativo/u otra dependencia), lo que exige disciplina documental para evitar fragmentacion.

## Plan de adopcion (opcional)

- Definir guideline de uso: "Base UI primero" para nuevos componentes equivalentes.
- Identificar componentes interactivos prioritarios para adopcion inicial.
- Registrar excepciones de manera explicita en historias/tareas o ADRs relacionados cuando corresponda.
- Revisar periodicamente si las excepciones recurrentes justifican ajustes en la estrategia.

## Referencias

- [Base UI Quick Start](https://base-ui.com/react/overview/quick-start.md)
- [Base UI LLMs](https://base-ui.com/llms.txt)
