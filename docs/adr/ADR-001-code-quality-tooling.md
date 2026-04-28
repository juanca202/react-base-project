# ADR-001: Calidad de codigo y herramientas para Next.js

- Estado: Accepted
- Fecha de creacion: 2025-12-31
- Ultima actualizacion: 2026-01-06
- Decisores: Equipo de Arquitectura
- Tags: nextjs, quality, linting, formatting, commits, testing, typescript

## Contexto

Mantener calidad y consistencia en un equipo requiere estandares claros y automatizacion.
Sin un stack de herramientas integrado:

- aparecen inconsistencias de estilo entre desarrolladores;
- bugs y riesgos se detectan tarde;
- los code reviews se desvían hacia formato en lugar de logica;
- el historial de commits pierde trazabilidad;
- el control de calidad depende de validaciones manuales.

En un proyecto Next.js (App Router), ademas, necesitamos validar practicas especificas:

- reglas de React Server Components y Client Components;
- uso de APIs modernas de Next.js y React;
- convenciones de performance (Core Web Vitals, assets optimizados);
- seguridad de tipos y calidad de pruebas.

## Decision

Adoptamos una cadena de herramientas de calidad para el proyecto con enfoque Next.js:

1. **ESLint (flat config) + `eslint-config-next`:** linting de codigo, reglas de Next.js y Core Web Vitals.
2. **TypeScript en modo estricto:** verificacion de tipos en tiempo de compilacion.
3. **Prettier:** formateo automatico consistente.
4. **Husky + lint-staged:** validaciones pre-commit solo sobre archivos staged.
5. **Commitlint:** enforcement de Conventional Commits.
6. **Vitest + Testing Library:** base de testing automatizado para calidad funcional.

Esta decision cubre tanto herramientas ya activas como estandar objetivo para el flujo completo de calidad del repositorio.

## Implementacion

### 1) ESLint para Next.js

**Proposito:** analisis estatico y reglas especificas de Next.js.

**Configuracion actual:** `eslint.config.mjs`

Se usa flat config con:

- `eslint-config-next/core-web-vitals`
- `eslint-config-next/typescript`

Comando de uso:

```bash
npm run lint
```

### 2) TypeScript estricto

**Proposito:** reducir errores en runtime mediante tipos.

**Configuracion actual:** `tsconfig.json`

Reglas relevantes:

- `strict: true`
- `moduleResolution: "bundler"`
- plugin de Next (`"name": "next"`)

Esto refuerza contratos de datos, props y boundaries entre capas.

### 3) Prettier

**Proposito:** unificar estilo de codigo de forma automatica.

**Estado:** estandar adoptado; configuracion/scripting se mantiene o incorpora como parte de la baseline de calidad.

Lineamientos recomendados:

- usar un unico archivo de configuracion (`.prettierrc` o equivalente);
- ejecutar formateo automatico en archivos staged via `lint-staged`;
- evitar discutir formato en PRs.

### 4) Husky + lint-staged

**Proposito:** bloquear commits con problemas de calidad antes de llegar al remoto.

**Estado:** estandar adoptado para hooks locales:

- `pre-commit`: ejecutar `lint-staged` (lint + formateo sobre staged).
- `commit-msg`: ejecutar `commitlint`.

### 5) Commitlint (Conventional Commits)

**Proposito:** mantener historial legible, trazable y automatizable.

Formato esperado:

```text
<type>(<scope>): <description>
```

Tipos recomendados:

- `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Ejemplos:

- `feat(auth): add Google sign-in`
- `fix(api): handle null response in profile endpoint`
- `refactor(ui): split dashboard widgets by domain`

### 6) Testing (Vitest + Testing Library)

**Proposito:** detectar regresiones y validar comportamiento.

**Scripts actuales:**

```bash
npm run test
npm run test:run
```

Se prioriza cubrir:

- logica de negocio reusable;
- componentes criticos de UI;
- escenarios de integracion clave.

## Flujo de trabajo esperado

1. Desarrollo local de cambios.
2. `git add` de archivos.
3. En commit:
   - pre-commit ejecuta lint/formateo sobre staged;
   - commit-msg valida Conventional Commits.
4. Verificaciones adicionales antes de push:
   - `npm run lint`
   - `npm run test:run`
   - `npm run build`

## Integracion CI/CD

El pipeline debe replicar y reforzar la calidad local:

```yaml
- name: Lint
  run: npm run lint

- name: Test
  run: npm run test:run

- name: Build
  run: npm run build
```

Opcionalmente, agregar chequeo de formateo cuando Prettier este en CI.

## Alternativas consideradas

- **Solo lint en CI (sin hooks locales):** reduce setup local, pero retrasa feedback.
- **Sin Conventional Commits:** menor friccion inicial, peor trazabilidad del historial.
- **Sin formatter automatico:** aumenta discusiones de estilo y ruido en reviews.

## Consecuencias

### Positivas

- consistencia de codigo entre contributors;
- deteccion temprana de errores;
- PRs mas enfocadas en logica de negocio;
- mejor historial para release notes y auditoria;
- onboarding tecnico mas rapido.

### Negativas / trade-offs

- friccion inicial por setup y disciplina de commits;
- posible rechazo de commits hasta corregir calidad;
- mantenimiento continuo de reglas y dependencias.

### Mitigaciones

- documentar claramente comandos y convenciones;
- proveer ejemplos de mensajes de commit;
- revisar reglas de lint/formato por version de Next.js;
- usar CI como red de seguridad.

## Referencias

- [Next.js Documentation](https://nextjs.org/docs)
- [ESLint Documentation](https://eslint.org/docs/latest/)
- [eslint-config-next](https://nextjs.org/docs/app/api-reference/config/eslint)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/docs/)
- [Husky](https://typicode.github.io/husky/)
- [lint-staged](https://github.com/lint-staged/lint-staged)
- [Commitlint](https://commitlint.js.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
