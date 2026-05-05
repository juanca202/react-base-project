# Progress

## user-story: US-002

status: in-progress
work-unit: "react-base-project"
implementador-filter: "Juan Carlos Altamirano"

### tasks

- id: TK-001
  title: Definicion del API de cuentas
  status: done
  files:
  - src/shared/contracts/accounts.ts
  - src/features/landing/api/accounts-mock.ts
  - src/app/api/accounts/route.ts
    notes:
  - Se implemento el DTO Account y el endpoint GET /api/accounts con datos mock.

- id: TK-002
  title: Definicion del API de actividad reciente
  status: done
  files:
  - src/shared/contracts/activity.ts
  - src/features/landing/api/activity-mock.ts
  - src/app/api/activity/route.ts
    notes:
  - Se implemento el DTO Movement y el endpoint GET /api/activity con datos mock.

- id: TK-003
  title: Componente accountsCarousel para resumen de cuentas
  status: done
  files:
  - src/features/landing/ui/accounts-carousel.tsx
    notes:
  - Componente presentacional implementado con scroll horizontal y CSS scroll snap.
  - El render de credit-card etiqueta el monto como consumo.

- id: TK-004
  title: Construccion de la pagina landing de resumen
  status: done
  files:
  - src/app/page.tsx
  - src/app/transfers/page.tsx
    notes:
  - Landing integrada consumiendo GET /api/accounts y GET /api/activity.
  - Atajo de transferencias funcional y atajos fuera de alcance con placeholder visible.
