# GET `/api/accounts` — listado de cuentas para resumen (`Account[]`)

## Alcance

Define el contrato HTTP para obtener cuentas del usuario autenticado que se muestran en la landing de resumen.
El DTO de respuesta se denomina `Account`.

## Endpoint

| Aspecto        | Valor                            |
| -------------- | -------------------------------- |
| Metodo         | `GET`                            |
| Ruta           | `/api/accounts`                  |
| Codigo exitoso | `200 OK`                         |
| Respuesta      | `application/json` (`Account[]`) |

Las rutas publicas del proyecto deben usar segmentos en ingles; `/api/accounts` cumple esa convencion.

En el alcance **demo**, la implementacion puede devolver datos estaticos o mock; la integracion con nucleo de cuentas real queda fuera de esta especificacion.

## Respuesta exitosa — `Account[]`

Devuelve un arreglo JSON de `Account`:

| Campo     | Tipo   | Obligatorio | Descripcion                                                                                       |
| --------- | ------ | ----------- | ------------------------------------------------------------------------------------------------- |
| `id`      | string | Si          | Identificador unico de la cuenta.                                                                 |
| `number`  | string | Si          | Numero de cuenta para mostrar (se recomienda enmascarar en UI).                                   |
| `balance` | number | Si          | Monto numerico a mostrar en resumen: saldo para `saving`/`checking` y consumo para `credit-card`. |
| `type`    | string | Si          | Tipo de cuenta. Valores permitidos: `saving`, `checking`, `credit-card`.                          |
| `name`    | string | No          | Nombre visible de la cuenta en UI.                                                                |

## Reglas de negocio (demo)

- **RN-A1** — La respuesta es un arreglo de cero o mas `Account`; para la landing de resumen se espera al menos dos cuentas en escenarios de demo con datos precargados.
- **RN-A2** — Para `type` igual a `saving` o `checking`, `balance` es el saldo mostrado al usuario en el resumen.
- **RN-A3** — Para `type` igual a `credit-card`, `balance` es el **consumo acumulado** a mostrar; no se expone cupo disponible ni limite en este contrato.
- **RN-A4** — El campo `number` se entrega en claro en JSON; el **enmascaramiento en pantalla** (p. ej. ultimos digitos) es responsabilidad de la UI (landing y `accountsCarousel`).

## Consumidores (US-002)

- **Landing de resumen** — obtiene el listado para alimentar la seccion de cuentas.
- **Componente `accountsCarousel`** — recibe la misma forma de datos por props; debe mostrar el monto segun **RN-A2** y **RN-A3** (incluido tarjeta como consumo, no cupo).

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
