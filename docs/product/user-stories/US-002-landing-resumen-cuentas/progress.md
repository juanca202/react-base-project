# Progress

## user-story: US-002

status: done
work-unit: react-base-project

### tasks

- id: TK-001
  title: Definicion del API de cuentas
  status: done
  files:
  - docs/product/technical-docs/api-accounts.md
    notes:
  - Contrato GET /api/accounts reforzado con codigo 200, RN demo y consumidores landing/accountsCarousel.

- id: TK-002
  title: Definicion del API de actividad reciente
  status: done
  files:
  - docs/product/technical-docs/api-activity.md
    notes:
  - Contrato GET /api/activity reforzado con codigo 200, RN demo, orden sugerido y consumidor landing.

- id: TK-003
  title: Componente accountsCarousel para resumen de cuentas
  status: done
  files:
  - src/features/landing/types/account.ts
  - src/features/landing/ui/accounts-carousel.tsx
    notes:
  - AccountsCarousel presentacional con scroll-snap horizontal; tarjeta clara (saving/checking) y degradado (credit-card); etiqueta Consumo para tarjeta; máscara de número; sin tabs Figma (fuera de alcance TK).

- id: TK-004
  title: Construccion de la pagina landing de resumen
  status: done
  files:
  - src/app/api/accounts/route.ts
  - src/app/api/activity/route.ts
  - src/app/api/session/route.ts
  - src/app/resumen/page.tsx
  - src/app/transferencias/page.tsx
  - src/app/servicios/page.tsx
  - src/app/pagos-qr/page.tsx
  - src/app/proximos-pagos/page.tsx
  - src/app/retirar/page.tsx
  - src/features/landing/mock/demo-resumen-data.ts
  - src/features/landing/types/movement.ts
  - src/features/landing/lib/transaction-calendar-parts.ts
  - src/features/landing/ui/recent-activity.tsx
  - src/features/landing/ui/demo-placeholder.tsx
  - src/proxy.ts
    notes:
  - APIs GET mock con cookie de sesión (401 sin auth); landing fetch paralelo; UI alineada a Figma Home (36:1699); actividad con bloque día/mes estilo calendario; barra inferior y secciones Pagos frecuentes / próximos pagos; GET /api/session para saludo.
