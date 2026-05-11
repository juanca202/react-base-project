# ADR-001: Calidad de codigo y herramientas

- Estado: Accepted
- Fecha de creacion: 2026-05-11
- Ultima actualizacion: 2026-05-11
- Decisores: Equipo de arquitectura
- Tags: nextjs, typescript, linting, formatting, testing, developer-experience

## Contexto

El proyecto necesita una base comun para mantener calidad de codigo, consistencia de estilo y deteccion temprana de errores durante desarrollo local y en revisiones.

Sin una linea base compartida:

- aumentan las diferencias de estilo y convenciones entre contribuciones;
- se incrementa el costo de revision y mantenimiento;
- se detectan errores de tipo y calidad demasiado tarde.

Se decide consolidar un stack de herramientas que cubra analisis estatico, formato, validaciones pre-commit y pruebas unitarias/de componentes.

## Decision

Se adopta la siguiente base de calidad de codigo:

1. ESLint con Flat Config y `eslint-config-next`.
2. TypeScript con modo `strict`.
3. Prettier para formateo consistente.
4. Husky + lint-staged para validaciones automaticas en `pre-commit`.
5. Commitlint para validar formato de mensajes de commit.
6. Vitest + Testing Library para pruebas unitarias y de UI a nivel componente.

Alcance de esta decision:

- aplica a nuevas contribuciones y a cambios en archivos tocados durante mantenimiento;
- prioriza feedback rapido en entorno local y reglas claras para el equipo;
- no define aun umbrales numericos de cobertura minima.

## Alternativas consideradas

- Opcion A: Configuracion minima (solo ESLint basico y sin hooks).
  - Pros: menor friccion inicial y setup mas simple.
  - Contras: menor consistencia, mayor carga manual en revisiones, riesgo de defectos de estilo/tipo no detectados a tiempo.
- Opcion B: Solo formateo automatico (Prettier) sin reglas de calidad ni pruebas.
  - Pros: uniformidad visual rapida.
  - Contras: no cubre errores logicos, de tipos o malas practicas de framework.
- Opcion C: Stack de calidad propuesto en este ADR.
  - Pros: combinacion equilibrada entre calidad, consistencia y productividad.
  - Contras: mayor costo inicial de configuracion y disciplina del equipo para sostener reglas.

## Consecuencias

### Positivas

- Menor variabilidad de estilo y estructura entre PRs.
- Deteccion mas temprana de errores de tipos y reglas de framework.
- Revisiones mas enfocadas en comportamiento y arquitectura, no en formato.
- Flujo de contribucion mas predecible para el equipo.

### Negativas / trade-offs

- Incremento de tiempo en `pre-commit` por validaciones automaticas.
- Curva de aprendizaje para contributors en reglas y convenciones.
- Posibles falsos positivos iniciales hasta ajustar reglas al contexto real del proyecto.
- Necesidad de mantener configuraciones al dia ante cambios de Next.js y herramientas.

## Plan de adopcion (opcional)

- Definir configuracion inicial y reglas base por herramienta.
- Aplicar validaciones en `pre-commit` con alcance incremental sobre archivos modificados.
- Documentar criterios minimos de calidad para PRs en guia de contribucion.
- Revisar en una iteracion posterior politicas de cobertura y umbrales minimos.

## Referencias

- [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files-new)
- [eslint-config-next](https://nextjs.org/docs/app/api-reference/config/eslint)
- [TypeScript strict](https://www.typescriptlang.org/tsconfig#strict)
- [Prettier](https://prettier.io/docs/en/)
- [Husky](https://typicode.github.io/husky/)
- [lint-staged](https://github.com/lint-staged/lint-staged)
- [Commitlint](https://commitlint.js.org/)
- [Vitest](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
