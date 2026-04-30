# ADR-002: Biblioteca de componentes con Base UI

- Estado: Accepted
- Fecha de creacion: 2026-04-29
- Ultima actualizacion: 2026-04-29
- Decisores: Equipo de Arquitectura
- Tags: react, nextjs, ui, accessibility, base-ui, client-components

## Contexto

Las aplicaciones Next.js (App Router) requieren componentes de interfaz para formularios, botones, dialogos, campos OTP y otros patrones interactivos. Sin una decision explicita sobre la biblioteca de componentes:

- se pueden mezclar HTML nativo y varias librerias de terceros sin criterio;
- la consistencia de comportamiento y accesibilidad varia entre pantallas;
- el mantenimiento se fragmenta (APIs distintas, actualizaciones y bundles);
- los limites entre Server Components y Client Components se vuelven confusos para UI con estado.

Necesitamos una estrategia que:

- establezca una biblioteca base prioritaria, alineada con React;
- defina cuando usar HTML nativo o dependencias adicionales;
- respete el modelo de renderizado de Next.js (RSC por defecto, `'use client'` donde haga falta);
- favorezca primitivas accesibles y componibles, con estilos definidos por el proyecto (p. ej. Tailwind).

## Decision

Usaremos [**Base UI** (`@base-ui/react`)](https://base-ui.com/react/overview/quick-start.md) como biblioteca de componentes base del proyecto. Los primitivos de Base UI deben usarse **prioritariamente** frente a HTML nativo cuando exista un componente equivalente que cubra el caso (accesibilidad, teclado, ARIA, patrones compuestos). Solo cuando Base UI no ofrezca una pieza adecuada se evaluara HTML nativo u otra dependencia, documentando la excepcion.

La documentacion del paquete y el indice orientado a LLMs estan en [Base UI - documentacion](https://base-ui.com/llms.txt).

### Jerarquia de seleccion de componentes

1. **Primera opcion:** componentes de `@base-ui/react` (p. ej. [Button](https://base-ui.com/react/components/button.md), [Input](https://base-ui.com/react/components/input.md), [Field](https://base-ui.com/react/components/field.md), [Form](https://base-ui.com/react/components/form.md), [Dialog](https://base-ui.com/react/components/dialog.md), [OTP Field](https://base-ui.com/react/components/otp-field.md)).
2. **Segunda opcion:** elementos HTML nativos, solo cuando una necesidad concreta lo justifique (ver excepciones).
3. **Tercera opcion:** otra biblioteca o componente especializado, solo si Base UI no cubre el requisito y tras evaluacion breve (mantenimiento, licencia, bundle).

## Implementacion

### Instalacion y paquete

- Dependencia: `@base-ui/react` (instalacion con el gestor del repo, p. ej. `npm i @base-ui/react`). El paquete es **tree-shakable**; solo entra en el bundle lo importado ([quick start](https://base-ui.com/react/overview/quick-start.md)).
- El nombre publico anterior `@base-ui-components/react` queda obsoleto; usar siempre `@base-ui/react` en imports e instalacion.

### Layout y portales

Para dialogos, popovers y otros popups que usan portales, seguir la guia de [Quick start - Portals](https://base-ui.com/react/overview/quick-start.md): p. ej. contenedor raiz con `isolation: isolate` para el apilamiento correcto frente al resto de la pagina. Si aplica la nota de Safari iOS 26+ sobre backdrops, aplicar tambien los estilos globales indicados en la misma pagina.

### Uso prioritario de Base UI

- Aplicar estilos con el sistema del proyecto (p. ej. Tailwind CSS v4 en `theme/` y clases utilitarias), acorde a la guia de [estilizado de Base UI](https://base-ui.com/react/handbook/styling.md).
- Componentes interactivos de Base UI deben vivir en **Client Components** o importarse desde ellos, respetando el limite RSC de Next.js ([`'use client'`](https://nextjs.org/docs/app/api-reference/directives/use-client)).
- Para formularios, preferir composiciones recomendadas en la documentacion ([Form](https://base-ui.com/react/handbook/forms.md), [Field](https://base-ui.com/react/components/field.md)).
- Para codigos OTP de verificacion, usar [OTP Field](https://base-ui.com/react/components/otp-field.md) en lugar de reinventar inputs sueltos, salvo excepcion justificada.

```tsx
// Preferido: primitiva Base UI + estilos del proyecto (ejemplo ilustrativo)
// En Button de Base UI hay que indicar explicitamente type="submit" para enviar formularios.
import { Button } from '@base-ui/react/button';

export function SubmitAction() {
  return (
    <Button type="submit" className="rounded-md bg-zinc-900 px-4 py-2 text-white">
      Enviar
    </Button>
  );
}
```

```tsx
// Evitar cuando Base UI cubre el patron con mejor accesibilidad y comportamiento
// (ej.: solo <input> sin Field/Label/Error asociados de forma consistente)
```

### Excepciones: HTML nativo

Se permite HTML nativo cuando exista una **necesidad particular**, por ejemplo:

- prototipado muy rapido o pantallas internas con requisitos minimos de UI;
- integracion con APIs del navegador que exijan un elemento concreto;
- restricciones de rendimiento en listas muy grandes (evaluar antes un patron aislado);
- el catalogo de Base UI no incluye el patron y un nativo es suficiente con revision de accesibilidad.

La excepcion debe quedar clara en el PR (descripcion o comentario en codigo).

### Otras dependencias de UI

Antes de añadir otra libreria:

1. Comprobar el [indice de componentes de Base UI](https://base-ui.com/llms.txt) y la documentacion de componentes.
2. Evaluar mantenimiento, licencia, tamano de bundle y compatibilidad con React 19 / Next.js del repo.
3. Documentar en el PR el motivo y, si aplica, un **wrapper** interno que unifique API y estilos con el resto de la app.

## Alternativas consideradas

- **Radix UI / primitivos similares:** muy usados y solidos; Base UI se alinea con el mismo enfoque (componible, sin estilos impuestos) y se elige como estandar unico para no duplicar patrones.
- **Material UI (MUI) / Chakra / otras con tema cerrado:** aceleran aspecto visual homogeneo, pero acoplan look & feel y pueden chocar con diseno propio; menos alineado con “styling agnostic” del proyecto.
- **Solo HTML nativo:** maxima flexibilidad y peso minimo, pero mayor carga en accesibilidad y consistencia; descartado como regla general.

## Consecuencias

### Positivas

- Comportamiento y accesibilidad mas predecibles en patrones complejos (dialogos, menus, OTP, etc.).
- Libertad visual total encima de primitivas sin estilo impuesto.
- Una familia de APIs y un solo eje de actualizacion para la capa de UI primitiva.
- Alineacion con Tailwind v4 ya presente en el proyecto ([nota en documentacion Base UI](https://base-ui.com/llms.txt)).

### Negativas / trade-offs

- Es necesario **implementar o reutilizar estilos** (no hay tema Material listo).
- Curva de aprendizaje en composicion y partes (`Root`, `Trigger`, etc. segun componente).
- Los componentes interactivos implican archivos cliente; hay que diseñar bien los limites con RSC.

### Neutras

- Este ADR formaliza la eleccion de UI primitiva; puede complementarse con ADRs futuros (formularios, layout, dialogos) sin reemplazarlo.

## Referencias

- [Base UI - indice / llms.txt](https://base-ui.com/llms.txt)
- [Base UI - Quick start](https://base-ui.com/react/overview/quick-start.md)
- [Base UI - Accesibilidad](https://base-ui.com/react/overview/accessibility.md)
- [Base UI - Formularios (handbook)](https://base-ui.com/react/handbook/forms.md)
- [ADR-001: Calidad de codigo y herramientas](./ADR-001-code-quality-tooling.md)
- [Next.js - use client](https://nextjs.org/docs/app/api-reference/directives/use-client)
