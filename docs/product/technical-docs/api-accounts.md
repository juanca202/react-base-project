# GET `/api/accounts` — listado de cuentas para resumen (`Account[]`)

## Alcance

Define el contrato HTTP para obtener cuentas del usuario autenticado que se muestran en la landing de resumen.
El DTO de respuesta se denomina `Account`.

## Endpoint

| Aspecto   | Valor                            |
| --------- | -------------------------------- |
| Metodo    | `GET`                            |
| Ruta      | `/api/accounts`                  |
| Respuesta | `application/json` (`Account[]`) |

Las rutas publicas del proyecto deben usar segmentos en ingles; `/api/accounts` cumple esa convencion.

## Autenticacion

El recurso **requiere** contexto de usuario autenticado alineado a **US-001** y al patron de `/api/me`:

- Cabecera `Authorization: Bearer <JWT>` emitido por `POST /api/token`, **o**
- Cookie de sesion demo `ACCESS_TOKEN_COOKIE` con el mismo JWT.

Si no hay token valido o el JWT no es legible en la demo, la respuesta es **401** (ver **Errores**).

## Errores

| Codigo | Cuerpo (JSON)                 | Cuando                                                    |
| ------ | ----------------------------- | --------------------------------------------------------- |
| `401`  | `{ "error": "unauthorized" }` | Sin credenciales validas o token demo ilegible / ausente. |

No se define cuerpo de error adicional para esta demo mas alla de `unauthorized`.

## Reglas de negocio (demo)

- Los datos son **mock** fijos o derivados solo del usuario demo autenticado; no hay nucleo de cuentas real (RN-07 US-002).
- El listado debe ser suficiente para la landing: al menos dos cuentas con `balance` y `number` para enmascarado en UI.
- Para `type` = `credit-card`, el campo `balance` es **consumo acumulado**; **no** representa cupo disponible ni limite de credito (el signo concreto sigue la convencion numerica del mock).
- `saving` y `checking`: `balance` es saldo a favor del titular en moneda de la demo.

## Respuesta exitosa — `Account[]`

Devuelve un arreglo JSON de `Account`:

| Campo     | Tipo   | Obligatorio | Descripcion                                                                                       |
| --------- | ------ | ----------- | ------------------------------------------------------------------------------------------------- |
| `id`      | string | Si          | Identificador unico de la cuenta.                                                                 |
| `number`  | string | Si          | Numero de cuenta para mostrar (se recomienda enmascarar en UI).                                   |
| `balance` | number | Si          | Monto numerico a mostrar en resumen: saldo para `saving`/`checking` y consumo para `credit-card`. |
| `type`    | string | Si          | Tipo de cuenta. Valores permitidos: `saving`, `checking`, `credit-card`.                          |
| `name`    | string | No          | Nombre visible de la cuenta en UI.                                                                |

**Ejemplo:**

```json
[
  {
    "id": "acc-001",
    "number": "001234567890",
    "balance": 1250.5,
    "type": "saving",
    "name": "Cuenta principal"
  },
  {
    "id": "acc-002",
    "number": "009876543210",
    "balance": 420.0,
    "type": "checking"
  },
  {
    "id": "acc-003",
    "number": "4111111111111111",
    "balance": -120.75,
    "type": "credit-card",
    "name": "Tarjeta clasica"
  }
]
```

## Notas de implementacion

- Este contrato cubre el alcance demo del resumen de cuentas.
- Para `credit-card`, `balance` representa consumo acumulado; el cupo disponible no se expone en este endpoint.
- La implementacion de referencia en el repo expone tipos TypeScript `Account` y `AccountType` en `src/app/api/accounts/route.ts` (exportados junto al handler `GET`).
