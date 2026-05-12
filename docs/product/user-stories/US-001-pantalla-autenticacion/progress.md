# Progress

## user-story: US-001

status: in-progress
work-unit: react-base-project

### tasks

- id: TK-001
  title: Pantalla de autenticación y flujo de acceso
  status: done
  files:
  - src/proxy.ts
  - src/app/api/token/route.ts
  - src/app/api/logout/route.ts
  - src/app/api/me/route.ts
  - src/app/login/page.tsx
  - src/app/login/login-form.tsx
  - src/app/login/figma-assets.ts
  - src/app/summary/page.tsx
  - src/app/summary/logout-button.tsx
  - src/app/layout.tsx
  - src/app/page.tsx
  - src/lib/auth/constants.ts
  - src/lib/auth/cookie-options.ts
  - src/lib/auth/jwt-demo.ts
  - src/lib/auth/session-edge.ts
  - public/brand/figma-login/\*.svg
    notes:
  - Next.js 16 usa convención `src/proxy.ts` (sin `middleware.ts` simultáneo).
  - Logo e iconos de login desde Figma (nodo 36:1533) en `public/brand/figma-login/` (`figma-assets.ts`).
  - Fase de tests automatizados no ejecutada en este ciclo; pendiente de decisión del usuario (story-implement).
