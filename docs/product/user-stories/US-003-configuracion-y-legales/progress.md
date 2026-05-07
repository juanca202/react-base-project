# Progress

## user-story: US-003

status: done
work-unit: react-base-project

### tasks

- id: TK-001
  title: Pantalla de configuración y enlaces legales
  status: done
  files:
  - docs/product/user-stories/US-003-configuracion-y-legales/progress.md
  - src/app/api/settings/route.ts
  - src/app/settings/page.tsx
  - src/app/privacy/page.tsx
  - src/app/terms/page.tsx
  - src/lib/mock-settings-user.ts
  - src/proxy.ts
  - src/features/landing/ui/resumen-header.tsx
    notes:
  - GET /api/settings mock con cookie de sesión; perfil derivado del sub del JWT.
  - /settings protegida en proxy; enlaces a /privacy y /terms; logout vía POST /api/mock-logout e igual destino que resumen.
  - Acceso principal desde ícono de perfil en ResumenHeader (US-002).

### tests

- status: skipped
  notes: Fase de pruebas no solicitada por el usuario en esta pasada.
