# ADR-003: Separacion de responsabilidades — Core, Shared, Cross y Features

- Estado: Accepted
- Fecha de creacion: 2026-04-29
- Ultima actualizacion: 2026-04-29
- Decisores: Equipo de Arquitectura
- Tags: nextjs, app-router, rsc, architecture, layering, features, boundaries

## Contexto

A medida que la aplicacion Next.js crece, conviene mantener una separacion clara de responsabilidades para:

- reutilizar codigo entre rutas y dominios sin acoplar features entre si;
- probar y refactorizar por capas con dependencias predecibles;
- respetar el modelo de [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components) y del [App Router](https://nextjs.org/docs/app) (rutas en `src/app/`, convenciones de archivos especiales);
- evitar dependencias circulares y mezclar enrutado con logica de negocio pesada.

Sin lineamientos, el codigo de dominio suele acumularse en `page.tsx`, surgen imports cruzados entre areas de producto y cuesta aplicar limites cliente/servidor de forma consistente.

## Decision

Organizamos el codigo **fuera del arbol de rutas** en capas por responsabilidad tecnica (**layer-based**), y agrupamos la logica de producto por dominio en **features** (**feature-based**), con una capa de **enrutado delgada** en `src/app/`.

### Enfoque hibrido: Feature-Based + Layer-Based + App Router

- **`src/app/` (capa de enrutado):** solo convenciones de Next.js (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `route.ts`, `opengraph-image`, etc.). Las paginas **orquestan** y delegan en modulos de `src/features/` o en utilidades de capas inferiores. Los segmentos de URL y carpetas publicas de rutas siguen en **ingles** (alineado con [`.agents/MEMORY.md`](../../.agents/MEMORY.md)).
- **`src/core/`:** fundacion de la app sin conocimiento de producto ni UI reusable rica.
- **`src/shared/`:** piezas reutilizables entre features (UI, hooks genericos, contratos compartidos).
- **`src/cross/`:** capacidades transversales de dominio o infraestructura compartida por varias features (persistencia, clientes de integracion).
- **`src/features/{nombre-feature}/`** (kebab-case o convencion unica del equipo): reglas de negocio, UI especifica del flujo, acceso a datos de ese dominio.

Las **Server Actions** y **Route Handlers** pueden vivir en `src/app/` (colocados junto a la ruta) si son delgados y delegan en funciones puras o modulos en `src/features/` / `src/cross/`; la logica reusable no debe quedar solo en el archivo de ruta sin capa clara.

### Limites Server / Client Components

- Por defecto los modulos son **Server Components**; anadir [`'use client'`](https://nextjs.org/docs/app/api-reference/directives/use-client) solo en hojas o contenedores que requieran estado del navegador o eventos.
- **Core** y **Cross** deben privilegiar codigo ejecutable en servidor (sin APIs de navegador). Si una pieza es solo cliente, ubicarla en `shared/ui/` o `features/.../ui/` con nombre o carpeta que deje claro el boundary (p. ej. sufijo o subcarpeta `client/`).
- Los **props** entre servidor y cliente deben ser [serializables](https://react.dev/reference/rsc/use-client#serializable-types); los contratos en `shared/contracts/` ayudan a tipar esos limites.

## Capas y responsabilidades

### Capa Core (`src/core/`)

Infraestructura y utilidades **globales** sin dependencias de producto:

- configuracion tipada (p. ej. lectura de env con validacion);
- errores base, tipos de resultado (`Result`, `AppError`);
- constantes globales, helpers puros (fecha, string, id);
- cliente HTTP minimo o envoltorios de `fetch` **sin** reglas de negocio de una feature concreta;
- logging/trazas en servidor cuando existan.

**Principio:** `core` **no** importa de `shared`, `cross` ni `features`.

### Capa Shared (`src/shared/`)

Reutilizable entre varias features, sin reglas de negocio de un solo dominio:

- componentes de presentacion (p. ej. sobre [Base UI](./ADR-002-component-library-base-ui.md));
- hooks genericos;
- validadores o esquemas compartidos (Zod, etc.) cuando sean transversales;
- **contracts** (solo tipos / interfaces / DTOs neutros): ver mas abajo.

**Principio:** `shared` **no** importa de `features`. Puede importar de `core` y `cross`.

#### Comunicacion entre features mediante contracts

Cuando dos features deben coordinarse **sin** acoplamiento directo:

- definir interfaces y tipos en `src/shared/contracts/{dominio}/` (sin implementaciones de negocio de una feature concreta);
- la **composicion** en `src/app/` (layout, page, server action) o un modulo de orquestacion inyecta implementaciones (parametros, factorias, contexto limitado al arbol de cliente si aplica).

No hay equivalente a los **providers** de Angular; el cableado es explicito en React (props, contexto de aplicacion, argumentos a funciones).

### Capa Cross (`src/cross/`)

Dominio o infraestructura **transversal** (varias features):

- adaptadores de persistencia (DB, cache, colas);
- repositorios o gateways compartidos (`TermRepository`, sincronizacion);
- clientes de integraciones externas (pagos, notificaciones, CRM).

**Principio:** `cross` solo importa de `core` (no de `shared` ni `features`).

### Capa Features (`src/features/{feature}/`)

Funcionalidad de producto autocontenida, por ejemplo:

- componentes y flujos de esa area;
- hooks y estado de dominio;
- servicios / casos de uso;
- repositorios que hablan con APIs del feature;
- mappers, modelos y constantes **especificos** del feature.

**Principios:**

- una feature **no** importa otra feature directamente;
- puede usar `core`, `shared` y `cross`;
- coordinacion entre features: **contracts** en `shared/contracts/` + composicion en `app` o acciones del servidor que llaman a ambos modulos sin crear import ciclico entre carpetas de features.

## Ejemplo de estructura (orientativa)

```text
src/
├── app/                          # App Router: rutas, layouts, puntos de entrada
│   ├── layout.tsx
│   ├── page.tsx
│   ├── settings/
│   │   └── page.tsx
│   └── api/                      # Route Handlers si aplica
│       └── health/route.ts
│
├── core/
│   ├── config/
│   ├── errors/
│   └── lib/
│       └── http.ts               # fetch base sin reglas de negocio de feature
│
├── shared/
│   ├── components/
│   ├── hooks/
│   └── contracts/
│       └── billing/              # solo tipos / ports
│           └── index.ts
│
├── cross/
│   ├── persistence/
│   └── integrations/
│       └── notifications/
│
└── features/
    ├── expenses/
    │   ├── components/
    │   ├── lib/
    │   └── data/
    └── settings/
        └── components/
```

Las carpetas `components/`, `services/`, `repositories/` en la raiz de `src/` pueden ir **migrando** hacia `shared/` o `features/` segun corresponda; el objetivo es una unica regla de ubicacion por tipo de codigo.

## Reglas de dependencias

```text
┌──────────┐
│ Features │
└────┬─────┘
     │ puede usar
     ▼
┌──────────┐     ┌──────────┐
│  Shared  │     │  Cross   │
└────┬─────┘     └────┬─────┘
     │ puede usar      │ puede usar
     └────────┬────────┘
              ▼
         ┌──────────┐
         │   Core   │
         └──────────┘

src/app/ (rutas) puede importar de todas las capas, pero debe
permanecer delgado (orquestacion, no logica compleja acoplada).
```

### Permitido

- Feature → Core, Shared, Cross.
- Shared → Core, Cross.
- Cross → Core.
- `src/app/**` → Core, Shared, Cross, Features (preferir delegar en features).

### Prohibido

- Core → Shared, Cross, Features.
- Shared → Features.
- Cross → Shared, Features.
- Feature A → Feature B (import directo).
- Alternativa: contracts en `shared/contracts/` + composicion en `app` o capa de aplicacion.

## Convencion de imports (path aliases)

Para que los imports reflejen la capa:

- **Recomendacion:** alinear `tsconfig.json` (y la resolucion de Vitest) con alias que apunten a `src/`, por ejemplo `"@/*": ["./src/*"]`, de modo que `@/features/expenses/...` y `@/core/...` sean validos.
- **Hasta migrar:** se pueden usar rutas relativas; en imports que **cruzan capas** conviene un alias estable para lectura en code review.

El estado actual del repo puede usar `"@/*": ["./*"]`; la migracion de alias es independiente de la decision de carpetas y puede hacerse por PR dedicado.

## Rutas Next.js vs features

- La **URL** la define `src/app/.../page.tsx` (y segmentos dinamicos `[id]`, grupos `(group)`, etc.).
- La **logica y UI compleja** del caso de uso vive en `src/features/...` y se importa desde la page o layout correspondiente.
- **Server Actions:** pueden declararse en archivos dentro de `src/app/` o, si el equipo prefiere, en `src/features/{feature}/actions.ts` con uso conforme a la [documentacion de Next.js sobre Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations); lo importante es no mezclar reglas de negocio opacas dentro de `page.tsx` sin modulo dedicado.

## Alternativas consideradas

- **Colocar todo el dominio bajo `src/app/{feature}/`:** simple al inicio, pero mezcla convenciones de framework (`page`, `layout`, `route`) con capas de negocio y dificulta lint de fronteras entre modulos.
- **Solo layer-based (todo en `lib/` plano):** ordena por tipo de archivo pero escala mal en equipos grandes sin agrupacion por producto.
- **Monorepo packages por feature:** potente para multiples apps; se descarta como obligatorio hasta que el tamano del repo lo justifique.

## Consecuencias

### Positivas

- Fronteras claras para revisiones, tests y extraccion a paquetes internos en el futuro.
- Alineacion con buenas practicas de Next.js: **app delgado**, RSC por defecto, cliente acotado.
- Menos riesgo de dependencias circulares entre areas de producto.

### Negativas / trade-offs

- Requiere disciplina y revisiones para no “acortar camino” con imports entre features.
- Hace falta tooling opcional (ESLint `import/no-restricted-paths`, `eslint-plugin-boundaries`, etc.) para automatizar reglas.

### Mitigacion

- Documentar excepciones en PR cuando una pieza no encaje en la capa obvia.
- Anadir reglas de lint por fases cuando el arbol de carpetas este estable.

## Referencias

- [Next.js — Project structure and organization](https://nextjs.org/docs/app/getting-started/project-structure)
- [Next.js — Server and Client Components](https://nextjs.org/docs/app/building-your-application/rendering)
- [ADR-001: Calidad de codigo y herramientas](./ADR-001-code-quality-tooling.md)
- [ADR-002: Biblioteca de componentes con Base UI](./ADR-002-component-library-base-ui.md)
- [Indice de ADRs](./README.md)
