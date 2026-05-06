# Memoria del proyecto (convenciones para agentes)

## Tailwind CSS y theme (`src/theme/index.css`)

- En clases de Tailwind, **preferir tokens del theme** (colores, espaciados, tamaños, radios, sombras, etc.) en lugar de valores fijos en la clase (hex arbitrarios, `px` sueltos) cuando exista un token que encaje.
- Formas habituales: utilidades que Tailwind derive del `@theme` (nombres según tokens en ese archivo) o **arbitrary values con variables**, p. ej. `text-[var(--color-text-danger)]`, `bg-[var(--color-bg-secondary)]`, cuando no haya utilidad dedicada pero exista la variable en `:root` / `@theme`.
- **No añadir nuevas variables** a `src/theme/index.css` solo para un caso puntual. Si no hay variable/token adecuado, **dejar la clase como está** (valor fijo u otra convención ya usada en el archivo).

## Rutas (URLs)

- **Todas las rutas públicas de la aplicación deben estar en español** (segmentos de path legibles para usuarios hispanohablantes: p. ej. `/acerca`, `/contacto`, no `/about`, `/contact`).
- Los nombres de carpetas bajo `app/` deben reflejar esas URLs (App Router); mantener coherencia entre la URL visible y la estructura de rutas.
