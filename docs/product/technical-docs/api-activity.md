# GET `/api/activity` — actividad reciente para resumen (`Movement[]`)

## Alcance

Define el contrato HTTP para obtener la actividad reciente del usuario autenticado que se muestra en la landing de resumen.
El DTO de respuesta se denomina `Movement`.

## Endpoint

| Aspecto        | Valor                             |
| -------------- | --------------------------------- |
| Metodo         | `GET`                             |
| Ruta           | `/api/activity`                   |
| Codigo exitoso | `200 OK`                          |
| Respuesta      | `application/json` (`Movement[]`) |

Las rutas publicas del proyecto deben usar segmentos en ingles; `/api/activity` cumple esa convencion.

En el alcance **demo**, la implementacion puede devolver datos estaticos o mock; la integracion con nucleo transaccional real queda fuera de esta especificacion.

## Reglas de negocio (demo)

- **RN-M1** — La respuesta es un arreglo de cero o mas `Movement`; para la landing de resumen se esperan al menos tres movimientos en escenarios de demo con datos precargados (criterio US-002).
- **RN-M2** — Cada elemento incluye texto para **descripcion**, **fecha** (`date` en ISO 8601) e **importe con signo** (`amount` positivo o negativo); la UI muestra fecha en forma relativa calculada en frontend a partir de `date`.
- **RN-M3** — Salvo indicacion contraria del producto, conviene ordenar los movimientos del **mas reciente al mas antiguo** para alinear la lista con la seccion de actividad reciente de la maqueta.
- **RN-M4** — `accountNumber` referencia la cuenta asociada; puede coincidir con valores de `number` en `GET /api/accounts` para coherencia de demo.

## Consumidores (US-002)

- **Landing de resumen** — obtiene el listado para la seccion de ultimos movimientos (descripcion, fecha relativa, importe con signo).

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
