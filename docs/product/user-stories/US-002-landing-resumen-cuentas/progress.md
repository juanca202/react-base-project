# Progress

## user-story: US-002

status: completed
work-unit: react-base-project

### tasks

- id: TK-001
  title: Definicion del API de cuentas
  status: done
  files:
  - docs/product/technical-docs/api-accounts.md
  - src/app/api/accounts/route.ts
    notes:
  - Contrato ampliado con autenticacion, errores y reglas demo; ruta GET mock alineada a /api/me.

- id: TK-002
  title: Definicion del API de actividad reciente
  status: done
  files:
  - docs/product/technical-docs/api-activity.md
  - src/app/api/activity/route.ts
    notes:
  - Contrato ampliado con autenticacion, errores y reglas demo; GET mock alineado a /api/me.

- id: TK-003
  title: Componente accountsCarousel para resumen de cuentas
  status: done
  files:
  - src/components/accounts-carousel/accounts-carousel.tsx
    notes:
  - Presentacional; scroll horizontal + snap; EUR es-; tarjeta muestra consumo y aclaratoria RN.

- id: TK-004
  title: Construccion de la pagina landing de resumen
  status: done
  files:
  - src/app/summary/page.tsx
  - src/lib/server/internal-fetch.ts
  - src/components/recent-activity-list/recent-activity-list.tsx
  - src/components/landing-shortcuts/landing-shortcuts.tsx
  - src/app/transfer/page.tsx
  - src/app/services/page.tsx
  - src/app/pay-qr/page.tsx
  - src/proxy.ts
    notes:
  - Datos vía fetch interno /api/accounts y /api/activity; atajos y placeholders; rutas protegidas en proxy.
