# ADR-003: Separacion de responsabilidades en Next.js App Router

## Estado

Accepted

## Fechas

- Fecha de creacion: 2026-05-06
- Ultima actualizacion: 2026-05-06

## Decisores

- Equipo de Frontend
- Tech Lead

## Tags

- nextjs
- app-router
- arquitectura-frontend
- separacion-de-responsabilidades
- rsc
- server-actions
- route-handlers

## Contexto

El proyecto utiliza Next.js con App Router, donde coexisten Server Components, Client Components, Server Actions y Route Handlers. Esta flexibilidad permite optimizar rendimiento y experiencia de desarrollo, pero tambien facilita mezclar responsabilidades de UI, dominio, acceso a datos y contratos en un mismo lugar.

Sin una decision arquitectonica explicita, aparecen riesgos recurrentes:

- Componentes de presentacion con logica de negocio embebida.
- Mutaciones acopladas a UI en capas no adecuadas.
- Dependencias circulares entre modulos de features y utilidades compartidas.
- Contratos de entrada/salida inconsistentes en bordes (HTTP, formularios, acciones de servidor).
- Dificultad para probar, mantener y evolucionar funcionalidades sin regresiones.

Se requiere un estandar moderno, compatible con App Router, que preserve pragmatismo y evite rigidez excesiva.

## Decision

Se adopta una separacion de responsabilidades por capas y bordes, con direccion de dependencias controlada, para el codigo de Next.js (App Router).

Principios obligatorios:

1. Limites Server vs Client Components

- Server Components son la opcion por defecto para composicion de pagina, carga de datos y coordinacion en servidor.
- Client Components se usan solo cuando hay necesidad real de estado/interaccion del navegador, APIs web o hooks de cliente.
- La directiva `use client` se considera frontera de runtime; no se usa como atajo para mover logica de dominio al cliente.
- Componentes cliente no deben importar modulos que contengan logica privada de servidor o acceso directo a infraestructura sensible.

2. Ubicacion de logica de dominio/aplicacion vs UI

- La UI (componentes en `app/` o `features/*/ui`) expresa presentacion y eventos, sin reglas de negocio complejas.
- La logica de aplicacion/dominio vive en modulos dedicados (por ejemplo `features/*/domain` y `features/*/application`), independientes de detalles de render.
- Casos de uso orquestan validaciones de negocio y colaboraciones entre repositorios/servicios; la UI solo invoca esos casos de uso a traves de bordes definidos.
- `shared/` contiene utilidades transversales estables (tipos comunes, helpers puros, contratos base), evitando convertirse en un contenedor generico sin gobernanza.

3. Data fetching y mutaciones sin mezclar presentacion

- Lecturas para render inicial se resuelven en Server Components o en capa de aplicacion invocada desde estos.
- Mutaciones se exponen mediante Server Actions o Route Handlers segun el tipo de consumidor:
  - Server Actions: preferidas para flujos internos acoplados al arbol de UI del App Router (formularios y acciones de interfaz).
  - Route Handlers: preferidos para integraciones externas, consumo por terceros o contratos HTTP explicitos.
- En ambos casos, la implementacion delega en capa de aplicacion/dominio; la frontera (action/handler) no contiene reglas de negocio extensas ni transformaciones dispersas.

4. Capas sugeridas (sin rigidez excesiva)
   Se recomienda la siguiente estructura como guia adaptable por feature:

- `app/`: rutas, layout, composicion de pantalla, limites de runtime.
- `features/<feature>/ui`: componentes de presentacion especificos de la feature.
- `features/<feature>/application`: casos de uso y orquestacion.
- `features/<feature>/domain`: entidades, reglas y politicas de negocio.
- `features/<feature>/infrastructure` (opcional): adaptadores concretos (API/DB/SDK).
- `shared/`: piezas reutilizables transversales y estables.
  La convencion es orientativa; se permite simplificar en features pequenas mientras se mantengan fronteras y dependencias.

5. Regla de dependencias

- Direccion preferente: UI -> application -> domain; infrastructure implementa contratos requeridos por application/domain.
- `shared/` no depende de `features/*`.
- Se prohibe acoplamiento circular entre capas o features.
- Dependencias laterales entre features solo via contratos explicitos (interfaces, DTOs, eventos) y no por importacion directa de detalles internos.

6. Validacion, serializacion y contratos en bordes

- Toda entrada/salida en bordes (Route Handlers, Server Actions, params de ruta, formularios) se valida explicitamente.
- Serializacion/deserializacion se resuelve en fronteras, no en componentes de presentacion.
- DTOs/contratos de transporte se separan de modelos de dominio cuando su evolucion o semantica difieren.
- Errores de validacion y de dominio se mapean de forma consistente a respuestas/estados de UI, evitando filtrar detalles de infraestructura.

## Alternativas consideradas

1. Organizacion centrada en `app/` sin capas por feature
   - Pros: menor costo inicial, onboarding rapido para cambios pequenos.
   - Contras: crecimiento desordenado, mezcla de responsabilidades, mayor dificultad para escalar y testear dominio.

2. Arquitectura estricta en capas con enforcement completo desde el inicio
   - Pros: alta claridad de limites, mejor control de acoplamiento a largo plazo.
   - Contras: sobrecarga inicial, friccion en iteraciones tempranas, riesgo de burocracia para cambios simples.

3. Modelo BFF/HTTP-first con Route Handlers para toda mutacion
   - Pros: contratos HTTP uniformes, facil consumo externo.
   - Contras: overhead para flujos internos de UI, duplicacion de capas para casos donde Server Actions son mas directas.

4. Logica distribuida en hooks y componentes cliente
   - Pros: velocidad de prototipado y cercania con la interfaz.
   - Contras: fuga de reglas de negocio al cliente, menor seguridad de runtime, deuda tecnica y acoplamiento alto.

## Consecuencias

### Positivas

- Mayor mantenibilidad por fronteras claras entre UI, aplicacion y dominio.
- Reduccion de regresiones por mezclas de responsabilidades.
- Mejor capacidad de evolucionar contratos (Server Actions/Route Handlers) sin reescrituras amplias de UI.
- Menor riesgo de exponer detalles sensibles al cliente.
- Escalado por feature con convenciones comunes y flexibilidad pragmatica.

### Trade-offs / Costos

- Mayor inversion inicial en diseno de modulos y contratos.
- Curva de adopcion del equipo para distinguir correctamente bordes y runtime.
- Necesidad de disciplina continua para evitar que `shared/` o `app/` concentren logica indebida.
- En funcionalidades pequenas puede percibirse como sobre-estructura si no se aplica con criterio.

## Referencias

- [Next.js App Router](https://nextjs.org/docs/app)
- [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [ADR-001: Calidad de codigo y herramientas](./ADR-001-calidad-de-codigo-y-herramientas.md)
- [ADR-002: Biblioteca de componentes con Base UI](./ADR-002-biblioteca-de-componentes-con-base-ui.md)

## Plan de adopcion

1. Publicar ADR-003 y socializar la regla de limites Server/Client en el equipo.
2. Definir convencion minima de carpetas por feature (`ui`, `application`, `domain`, `infrastructure` opcional).
3. Revisar features existentes de mayor impacto e identificar mezclas de responsabilidades prioritarias.
4. Mover validaciones/serializacion a bordes en acciones y handlers existentes de forma incremental.
5. Incorporar checklist de dependencias y contratos en revisiones de PR.
6. Revaluar adopcion y friccion tras 2 sprints para ajustar nivel de rigidez.
