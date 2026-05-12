# Memoria del proyecto (convenciones para agentes)

## Tailwind y tema (`src/theme/index.css`)

- En clases de Tailwind con colores específicos, preferir las variables CSS definidas en `src/theme/index.css` (y expuestas al proyecto según el setup actual) en lugar de valores fijos (hex, rgb, etc.).
- Lo mismo aplica a espaciados, tamaños y tokens similares cuando exista una variable equivalente en el theme.
- No agregar nuevas variables al theme salvo que el equipo lo pida explícitamente.
- Si no hay una variable que encaje con lo necesario, dejar la clase Tailwind tal como está (no inventar tokens ni ampliar el theme por conveniencia del agente).
