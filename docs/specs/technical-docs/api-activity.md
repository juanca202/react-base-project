# GET `/api/activity` — actividad reciente para resumen (`Movement[]`)

## Alcance

Define el contrato HTTP para obtener la actividad reciente del usuario autenticado que se muestra en la landing de resumen.
El DTO de respuesta se denomina `Movement`.

## Endpoint

| Aspecto   | Valor                             |
| --------- | --------------------------------- |
| Metodo    | `GET`                             |
| Ruta      | `/api/activity`                   |
| Respuesta | `application/json` (`Movement[]`) |

Las rutas publicas del proyecto deben usar segmentos en ingles; `/api/activity` cumple esa convencion.

## Autenticacion

El recurso **requiere** contexto de usuario autenticado, con el mismo patron que `/api/me` y `/api/accounts`:

- Cabecera `Authorization: Bearer <JWT>` emitido por `POST /api/token`, **o**
- Cookie de sesion demo `ACCESS_TOKEN_COOKIE` con el mismo JWT.

Si no hay token valido o el JWT no es legible en la demo, la respuesta es **401** (ver **Errores**).

## Errores

| Codigo | Cuerpo (JSON)                 | Cuando                                                    |
| ------ | ----------------------------- | --------------------------------------------------------- |
| `401`  | `{ "error": "unauthorized" }` | Sin credenciales validas o token demo ilegible / ausente. |

No se define cuerpo de error adicional para esta demo mas alla de `unauthorized`.

## Reglas de negocio (demo)

- Los datos son **mock**; no hay integracion con nucleo de movimientos real.
- El listado debe permitir a la landing mostrar al menos **tres** movimientos con descripcion, fecha e importe con signo.
- Se recomienda ordenar los elementos del arreglo del **mas reciente al mas antiguo** para que la UI muestre primero la actividad ultima.
- `date` es ISO 8601 en UTC o con offset; la UI puede derivar fecha relativa en cliente.

## Respuesta exitosa — `Movement[]`

Devuelve un arreglo JSON de `Movement`:

| Campo           | Tipo   | Obligatorio | Descripcion                                                  |
| --------------- | ------ | ----------- | ------------------------------------------------------------ |
| `accountNumber` | string | Si          | Numero de cuenta asociado al movimiento.                     |
| `date`          | string | Si          | Fecha del movimiento en formato ISO 8601.                    |
| `description`   | string | Si          | Descripcion breve del movimiento para mostrar en la UI.      |
| `amount`        | number | Si          | Importe numerico del movimiento; admite positivo y negativo. |

**Ejemplo:**

```json
[
  {
    "accountNumber": "001234567890",
    "date": "2026-05-05T09:30:00Z",
    "description": "Transferencia recibida",
    "amount": 250.0
  },
  {
    "accountNumber": "001234567890",
    "date": "2026-05-04T21:10:00Z",
    "description": "Pago de servicio",
    "amount": -42.75
  },
  {
    "accountNumber": "009876543210",
    "date": "2026-05-04T08:05:00Z",
    "description": "Compra comercio",
    "amount": -15.9
  }
]
```

## Notas de implementacion

- Este contrato cubre el alcance demo de actividad reciente en la landing.
- El formato visual de fecha relativa en la UI se calcula en frontend a partir de `date`.
- La implementacion de referencia en el repo expone el tipo TypeScript `Movement` en `src/app/api/activity/route.ts` (exportado junto al handler `GET`).
