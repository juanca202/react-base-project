---
name: simple-design-system-community-tailwind
description: Reglas operativas del design system para Tailwind v4 en este proyecto.
---

# Contexto y objetivos

Este proyecto debe implementar el sistema visual **Simple Design System (Community)** sobre Tailwind v4 usando tokens centralizados en `src/theme/index.css`.

Objetivos:

- asegurar consistencia visual entre vistas;
- evitar valores hardcodeados cuando exista token;
- mantener accesibilidad WCAG 2.2 AA como baseline de implementación.

# Design tokens y foundations

## Colores

El equipo **must** usar los tokens `--color-bg-*` y `--color-text-*` definidos en `src/theme/index.css` antes de introducir valores locales.

Ejemplos de uso:

- fondos: `bg-bg-default`, `bg-bg-brand`, `bg-bg-warning-secondary`;
- texto: `text-text-default`, `text-text-brand`, `text-text-danger`;
- estados: `hover:bg-bg-brand-hover`, `disabled:bg-bg-disabled`.

## Tipografía

El equipo **must** usar los tamaños y líneas definidos por token en componentes base:

- title/page;
- heading/subheading;
- body base/small.

Recomendación:

- títulos de pantalla **should** mapearse al estilo `Title Page`;
- cuerpo por defecto **should** mapearse a `Body Base`.

## Espaciado y radios

El equipo **must** usar la escala de espacios (`--spacing-*`) y radios (`--radius-*`) como fuente única para layout y componentes.

Regla:

- evitar saltos ad-hoc entre componentes; el ritmo vertical **must** salir de `100/200/300/400/600/800/1200`.

## Elevación

Las superficies con elevación **must** usar `--shadow-100` a `--shadow-400`.

Regla:

- overlays y paneles flotantes **should** comenzar en `shadow-200`;
- modales o capas prominentes **should** usar `shadow-300` o `shadow-400`.

# Reglas por componente

## Botones

Anatomía:

- contenedor clickable;
- etiqueta textual;
- opcional: icono líder o trailing.

Estados requeridos (must):

- `default`, `hover`, `focus-visible`, `active`, `disabled`, `loading`.

Interacciones:

- teclado: activación con `Enter` y `Space`;
- puntero/touch: objetivo táctil mínimo de 40px de alto.

Overflow:

- texto largo **must** truncar o wrapear sin romper layout;
- si hay iconos, el label **must** mantener legibilidad.

## Inputs y formularios

Anatomía:

- label;
- control;
- texto de ayuda;
- error state.

Estados requeridos (must):

- `default`, `hover`, `focus-visible`, `error`, `disabled`, `read-only`.

Acciones:

- foco visible **must** tener indicador perceptible por teclado;
- errores **must** combinar color + texto (no solo color).

OTP específico:

- celdas OTP **must** soportar navegación por teclado;
- validación **must** comunicar errores por `role="alert"` cuando aplique.

## Navegación

- elementos activos **must** tener indicador visual persistente;
- estado hover/focus **must** mantener contraste AA;
- navegación por teclado **must** permitir recorrer links en orden lógico.

## Overlays (dialog, popover, menu)

- apertura/cierre **must** ser operable por teclado;
- `Esc` **must** cerrar cuando aplique;
- foco inicial y retorno de foco **must** estar controlados.

## Feedback y data display

- banners de éxito/aviso/error **must** usar tokens semánticos;
- tablas o listas extensas **must** definir manejo de overflow horizontal;
- estados vacíos **must** incluir mensaje + acción recomendada.

# Requisitos de accesibilidad y criterios testeables

Checklist mínimo:

- contraste de texto y UI **must** cumplir WCAG 2.2 AA;
- todo control interactivo **must** ser accesible por teclado;
- `:focus-visible` **must** ser visible en todos los controles;
- formularios **must** exponer label asociado y mensaje de error legible;
- contenido crítico de estado **must** anunciarse con roles ARIA adecuados.

Criterios verificables:

- tab order continuo y sin trampas;
- sin pérdida de funcionalidad con zoom 200%;
- sin pérdida de información en viewport móvil.

# Contenido y tono

Estilo editorial:

- copy breve, claro y accionable;
- verbos directos;
- mensajes de error con causa y siguiente paso.

Ejemplos:

- correcto: “Código incorrecto. Inténtalo de nuevo.”
- evitar: “Error desconocido.” sin guía de acción.

# Anti-patrones y prohibiciones

El equipo **must not**:

- hardcodear colores/espaciados cuando exista token;
- quitar `focus-visible` por razones estéticas;
- introducir variantes locales que dupliquen una variante global;
- depender solo del color para comunicar error, warning o éxito.

# QA checklist

- [ ] Cada componente usa tokens del sistema (sin hex sueltos en UI nueva).
- [ ] Existen estados `default/hover/focus-visible/disabled/loading` donde aplique.
- [ ] Navegación y acciones críticas operan con teclado.
- [ ] Contraste y mensajes de error cumplen WCAG 2.2 AA.
- [ ] Contenido largo, vacío y overflow tiene comportamiento definido.
