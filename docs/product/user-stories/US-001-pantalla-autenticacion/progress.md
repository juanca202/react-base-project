# Progress

## user-story: US-001-pantalla-autenticacion

status: done

work-unit: react-base-project

### tasks

- id: TK-001
  title: Pantalla de autenticación y flujo de acceso
  status: done
  files:
  - src/app/api/token/route.ts
  - src/app/api/mock-login/route.ts
  - src/app/api/mock-logout/route.ts
  - src/app/login/login-form.tsx
  - src/app/login/page.tsx
  - src/app/layout.tsx
  - src/app/settings/logout-button.tsx
  - src/lib/demo-auth.ts
  - src/proxy.ts
    notes:
  - Login vía POST /api/token + cookies HTTP-only alineadas a demo-auth; mock-login devuelve 410; logout limpia cookies y redirige a /login; settings sign out usa POST mock-logout.
