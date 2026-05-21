# TK-003: Componente accountsCarousel para resumen de cuentas

- **ID:** TK-003
- **Estado:** Ready
- **Prioridad:** Media
- **Historia:** [US-002](./README.md)
- **Unidad de trabajo:** react-base-project

## Descripción

Crear el componente `accountsCarousel` como elemento superior de la pantalla de landing para mostrar cuentas con nombre, numero de cuenta y saldo/consumo, conforme a **US-002**.

## Dependencias

- **Pantalla de landing de US-002** — integración del componente en la parte superior de la vista de inicio.
- **Datos de cuentas provistos por la pantalla landing** — fuente de nombre, numero de cuenta y saldo/consumo para renderizar cada tarjeta.

## Referencias

- **Historia:** [US-002 — Landing](./README.md)
- **Diseño Figma (nodo 1-1971):** [Pantallas taller SDD](https://www.figma.com/design/7pt2W7JSic4ZoAVcgvQ5qD/Pantallas-taller-SDD?node-id=36-1699&m=dev)
- **Diseño Figma (detalle de cuenta, nodo 1-2503):** [Pantallas taller SDD](https://www.figma.com/design/7pt2W7JSic4ZoAVcgvQ5qD/Pantallas-taller-SDD?node-id=1-2503&m=dev)
- **Guía técnica CSS Scroll Snap:** [MDN — Basic concepts of scroll snap](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_snap/Basic_concepts)

## Plan de implementación

1. Definir la API de props de `accountsCarousel` para recibir una coleccion de cuentas con nombre, numero de cuenta y saldo/consumo.
2. Implementar el carrusel con un contenedor de scroll horizontal y snap de elementos (`scroll-snap-type` en contenedor y `scroll-snap-align` en cada tarjeta), evitando dependencias de librerias de carrusel para este alcance.
3. Verificar que los textos, formato y orden visual coinciden con la maqueta y reglas de negocio de cuentas en la historia, y que el snap mantiene una navegacion fluida en mobile.
4. Alinear el render del monto con el contrato de `GET /api/accounts`: para `credit-card` mostrar consumo (campo `balance`) y no cupo disponible.

## Observaciones

- Esta tarea cubre unicamente el bloque superior de cuentas; movimientos y atajos se documentan en tareas posteriores.
- `accountsCarousel` es un componente presentacional: no realiza consultas a servicios y solo consume `accounts` por props.
