# ADR-001: Calidad de codigo y herramientas

## Estado

Accepted

## Fechas

- Fecha de creacion: 2026-05-06
- Ultima actualizacion: 2026-05-06

## Decisores

- Equipo de Frontend (pendiente de registrar nombres individuales)

## Tags

- calidad
- tooling
- linting
- testing
- typescript
- ci-cd

## Contexto

El proyecto requiere una base de calidad de codigo consistente para reducir defectos, facilitar revisiones y mantener velocidad de entrega en un stack Next.js + TypeScript.
Actualmente no existe un ADR en `docs/adr/` que formalice las herramientas y politicas minimas de calidad.

Se busca:

- Estandar unico de linting y formato.
- Validacion temprana antes de commit.
- Convencion de mensajes de commit.
- Base de pruebas unitarias/componente.
- Restricciones de tipado para prevenir errores en runtime.

## Decision

Se adopta el siguiente baseline de calidad de codigo y herramientas:

1. **ESLint (flat config) + `eslint-config-next`**
   Como estandar principal de analisis estatico para Next.js y React.
2. **TypeScript estricto (`strict: true`)**
   Como politica de tipado para prevenir errores y mejorar mantenibilidad.
3. **Prettier**
   Para formato automatico y reduccion de friccion en PRs.
4. **Husky + lint-staged**
   Para ejecutar validaciones rapidas sobre archivos staged antes de cada commit.
5. **Commitlint**
   Para validar convenciones de mensajes de commit y mejorar trazabilidad del historial.
6. **Vitest + Testing Library**
   Como stack base para pruebas unitarias y de comportamiento observable en UI.

## Alternativas consideradas

1. **ESLint legado (`.eslintrc`\*) en lugar de flat config**

- Pros: familiaridad en equipos con configuracion antigua.
- Contras: menor alineacion con direccion actual de ESLint y menor claridad modular en nuevas configuraciones.

2. **Sin TypeScript estricto (modo laxo)**

- Pros: menor friccion inicial al migrar o prototipar.
- Contras: mayor riesgo de errores silenciosos, deuda tecnica y regresiones por tipos implicitos.

3. **Solo ESLint sin Prettier**

- Pros: menos herramientas.
- Contras: mas discusiones de estilo y menor consistencia visual del codigo.

4. **Validaciones en CI unicamente (sin hooks locales)**

- Pros: menor carga local para desarrollo.
- Contras: feedback tardio, mas ciclos fallidos y menor productividad en PRs.

5. **Jest en lugar de Vitest**

- Pros: ecosistema maduro y ampliamente conocido.
- Contras: en este contexto, Vitest ofrece arranque y ejecucion mas rapidos en flujos modernos con Vite/tooling compatible.

## Consecuencias

### Positivas

- Mayor consistencia de codigo y estilo entre contribuidores.
- Menor probabilidad de defectos triviales llegando a ramas principales.
- Feedback temprano en pre-commit para lint/formato/convenciones.
- Historial de commits mas estructurado y auditable.
- Base de testing alineada con comportamiento de componentes de UI.

### Trade-offs / Costos

- Aumento de friccion inicial por configuracion y curva de adopcion.
- Mayor tiempo local de commit por hooks.
- Posibles ajustes en reglas para equilibrar productividad y rigurosidad.
- Necesidad de mantenimiento continuo de reglas, dependencias y presets.

## Referencias

- [ESLint - Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files-new)
- [Next.js - ESLint](https://nextjs.org/docs/app/api-reference/config/eslint)
- [TypeScript - TSConfig strict](https://www.typescriptlang.org/tsconfig#strict)
- [Prettier](https://prettier.io/docs/en/)
- [Husky](https://typicode.github.io/husky/)
- [lint-staged](https://github.com/lint-staged/lint-staged)
- [Commitlint](https://commitlint.js.org/)
- [Vitest](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)

## Plan de adopcion

1. Definir y versionar configuracion inicial de ESLint (flat config) y Prettier.
2. Habilitar `strict: true` y registrar excepciones temporales si fueran necesarias.
3. Configurar hooks con Husky + lint-staged para lint/formato en staged.
4. Configurar Commitlint y politica de commits del equipo.
5. Incorporar Vitest + Testing Library con una primera suite minima representativa.
6. Revisar metricas de friccion/calidad tras 2 sprints y ajustar reglas si aplica.
