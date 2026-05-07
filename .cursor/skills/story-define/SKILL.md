---
name: story-define
description: Crear historias US-XXX bajo docs/product con plantilla, criterios y Definition of Ready; aclarar con el usuario si faltan datos. Usar al crear o documentar una historia de usuario o alinear una US a estas convenciones.
license: MIT
---

## Subagente obligatorio

Este skill **debe** ejecutarse mediante el agente **`docs-specialist`**. No sustituir por otro agente ni por el asistente general para el trabajo cubierto por este skill. Alcance permitido: **solo documentación** (sin código de aplicación, sin compilar, empaquetar, instalar dependencias con efecto en el producto ni ejecutar pruebas). Las **reglas, plantillas, pasos y ejemplos** de la US están en este documento; la identidad operativa, las prohibiciones de alcance y el flujo documental general corresponden al agente citado.

# Definir historia de usuario

## Purpose

Guiar al agente para **crear o reorganizar** una historia de usuario en el repo del producto: carpeta `US-XXX-[nombre-corto]/`, `README.md` según la plantilla de `references/user-story.md`, validación **INVEST** y **Definition of Ready**, **story points** en Fibonacci, criterios estilo **Given / When / Then** (Gherkin: **clave al inicio de cada línea en MAYÚSCULAS**, en el **idioma de preferencia** del usuario —regla 1—) cuando la historia aspire a **Ready**, y **caracterización normativa** alineada semánticamente con **[RFC 2119](https://www.rfc-editor.org/rfc/rfc2119)** en descripción y reglas de negocio usando las **formas léxicas en ese mismo idioma** (p. ej. **DEBE** / **NO DEBE** en español, **MUST** / **MUST NOT** en inglés); cada regla de negocio con identificador **RN-01**, **RN-02**, … (secuencial en el ámbito de la US).

Usar este skill cuando el usuario pida **nueva historia**, **documentar una US** o **alinear** una historia a estas convenciones.

## Scope

**Incluye:**

- Estructura bajo `docs/product/user-stories/` (carpeta de la US, `README.md`, `assets/` cuando haya recursos).
- Redacción del `README.md` con todas las secciones de la plantilla (descripción, reglas de negocio, **Referencias** — diseño, enlaces y archivos en `assets/` —, criterios, complejidad, INVEST, DoR, observaciones).
- Orientación sobre `docs/product/technical-docs/` y enlaces relativos cuando el usuario pida documentación técnica explícita.
- Criterios para `**docs/product/glossary.md`** cuando aparezcan términos de dominio que deban definirse.
- Cuando la historia quede en estado **Ready** (o ya lo esté al cerrar el trabajo), **sugerir al usuario** que puede crear las **tareas** (`**TK-XXX-...md**`) necesarias para implementarla, siguiendo el skill **story-plan**; si el usuario pide crearlas en continuidad, aplicar la **política stubs vs. TK completo** de la regla 13.

**No incluye:**

- Implementar código o tareas de desarrollo (**usar** skill **story-implement** o flujos de implementación).
- Redactar `**TK-XXX-...md`** al margen de **story-plan** (metadatos, `**work-units.md**`, plantilla de `references/task.md`); este skill **no** sustituye **story-plan**, pero **sí** debe sugerir el paso y, si el usuario lo pide, **continuar con story-plan** según la regla 13.
- Sustituir decisiones de producto no acordadas: si faltan datos, el agente debe preguntar o dejar el hueco explícito en **Observaciones** vinculado a `TK-XXX`, no inventar reglas.

## Inputs

Para ejecutar bien el skill, el agente necesita (cuanto más completo, mejor):

- **Qué** se quiere lograr (valor para usuario/negocio) y **quién** es el actor.
- **Reglas de negocio** y **criterios de aceptación** en lenguaje de dominio, o material suficiente para redactarlos.
- **ID** `US-XXX` si ya existe; si no, el agente puede inferirlo revisando carpetas existentes.
- Si hay **UI**: referencias a wireframes, mockups, diseño alta fidelidad o acuerdo explícito de dónde vivirán (p. ej. `assets/`, Figma).
- Cualquier **dependencia** con otras US o sistemas que condicionen INVEST o el DoR.
- Opcional: `**.agent/MEMORY.md`** (carpeta `.agent/` en la raíz del repo del producto), con `**preferred language:`** (véase Rules).

Si con lo recibido **no** se puede valorar INVEST con honestidad, el agente debe **ampliar entradas** preguntando al usuario antes de crear archivos.

## Outputs

Exactamente lo que debe quedar en el repo objetivo cuando el skill se aplica con éxito:

1. **Carpeta** `docs/product/user-stories/US-XXX-[nombre-corto]/` (nombre corto en minúsculas, kebab-case, según convenciones en [Notes](#notes)).
2. `**README.md`** en esa carpeta con la **misma estructura** que la plantilla empaquetada en `references/user-story.md` (sin copiar el archivo de referencia al repo del producto como tal).
3. Subcarpeta `**assets/`** si el usuario aporta o se guardarán **archivos** (imágenes, PDFs, etc.) vinculados en la sección **Referencias** del `README.md`; enlaces relativos desde el `README.md`, p. ej. `assets/nombre.png` (véase plantilla en `**references/user-story.md**`).
4. **Opcional:** documentos nuevos o actualizados en `**docs/product/technical-docs/`** y enlazados desde el `README.md` o desde tareas, **solo si** el usuario lo pidió o el contexto lo exige.
5. **Opcional:** entradas en `**docs/product/glossary.md`** cuando se usen términos que requieran definición (ver [Notes](#notes)).

El contenido del `README.md` debe incluir **INVEST** y **DoR** rellenados (o honestamente marcados con lagunas en **Observaciones**), **story points** propuestos con **justificación**, y bloque Gherkin en criterios de aceptación (palabras clave de paso en **MAYÚSCULAS**, en el **idioma de preferencia** —p. ej. **DADO**/**CUANDO**/**ENTONCES** o **GIVEN**/**WHEN**/**THEN**—) si el estado buscado es **Ready**.

## Rules

1. **Idioma de preferencia del contenido de la US (`README.md`, notas, criterios en lenguaje natural):** determinarlo en este orden: (1) inferencia del idioma del mensaje o petición del usuario en el turno actual; (2) si existe `**.agent/MEMORY.md**` en el repo del producto, leer la línea `**preferred language:`** (p. ej. `preferred language: es`) y usar ese código ISO 639-1; (3) si no existe el archivo o no hay esa línea, **preguntar al usuario** en qué idioma prefiere la documentación y, con la respuesta, **crear** `**.agent/MEMORY.md**` (o añadir la línea si el archivo existe) con `**preferred language: <código ISO>**` (p. ej. `es`, `en`). Redactar descripción, reglas de negocio, INVEST, DoR y observaciones en ese idioma. **Gherkin:** cada línea de paso empieza por la **palabra clave** en **MAYÚSCULAS** en **ese mismo idioma** (regla 6): p. ej. **DADO** / **CUANDO** / **ENTONCES** / **Y** / **PERO** en español, o **GIVEN** / **WHEN** / **THEN** / **AND** / **BUT** en inglés; el **resto de la línea** sigue el mismo idioma. **Modalidad normativa (RFC 2119):** los **niveles de requisito** en descripción y reglas de negocio deben usar las **formas en ese mismo idioma**, en **MAYÚSCULAS** para la palabra clave normativa (regla 11 y [Notes — RFC 2119](#rfc-2119)); **no** mezclar inglés y español en las claves Gherkin ni en las claves normativas salvo acuerdo explícito en **Observaciones**. **Identificadores técnicos** pueden seguir la convención del código donde aplique.
2. **Puerta INVEST:** no crear carpeta ni `README.md` si faltan datos para completar la validación sin forzar; **preguntar** antes (actor, beneficio, alcance, dependencias, datos, permisos, criterios testeables).
3. **Decisiones de producto:** deben estar reflejadas en el texto; si algo sigue abierto, indicarlo en **Observaciones** con **qué `TK-XXX`** (o artefacto) lo cerrará — **no** asumir en silencio.
4. **Referencias (diseño y archivos):** el `README.md` debe incluir la sección **Referencias** según la plantilla: enlaces de **diseño** (p. ej. Figma, prototipos) e **imágenes o archivos** que el usuario aporte para la historia. Los **ficheros** no deben quedar solo en el chat: **copiarlos** (o crear el binario) bajo `**US-XXX-.../assets/`** y citarlos en **Referencias** con ruta relativa (`assets/...`). Sin referencias de UI/diseño cuando la historia es de **interfaz**, **no** declarar **Ready** para implementación de esa UI.
5. **Plantilla y contenido:** el `README.md` debe seguir `**references/user-story.md`**; **no** volcar el fichero de referencia completo ni sus párrafos instructivos (p. ej. «Qué incluir», textos de ayuda) como si fueran contenido de la historia. Cada sección lleva **solo** información **real** (acordada o demostrable); **sin** supuestos como hechos, **sin** listas o marcadores de relleno. Prerrequisitos sin cumplir, datos faltantes y pendientes → **Observaciones** en lista explícita; si una sección no tiene material, mantenerla mínima y honesta respecto al gap.
6. **Ready:** Escenarios en **Gherkin** de obligado cumplimiento para considerar la historia **Ready**. Cada línea de paso debe empezar por la **palabra clave** del tipo de paso en **TODO MAYÚSCULAS**, en el **idioma de preferencia** (regla 1): p. ej. **DADO** / **CUANDO** / **ENTONCES** (y **Y**, **PERO** si aplica) en español, o **GIVEN** / **WHEN** / **THEN** (y **AND**, **BUT**) en inglés. **No** usar minúsculas ni formato título (`Dado`, `Given`) en la clave. **No** usar claves Gherkin en inglés si el idioma de preferencia es otro (ni al revés). El resto de la línea va en el mismo idioma. DoR rellenado según plantilla y criterio del equipo. El metadato **Estado: Ready** **solo** si **no** hay aclaraciones ni pendientes sin resolver: ningún ítem real en **Observaciones** que siga abierto y nada acordado «para después» con usuario/producto que no esté cerrado en el texto; mientras quede cualquier aclaración pendiente, **Estado: Draft** (fila **Sin aclaraciones pendientes** del DoR en **No cumple** o **Parcial** con notas hasta cerrarlas).
7. **Story points:** solo valores **Fibonacci** 1, 2, 3, 5, 8, 13 con **justificación breve**.
8. **Funcional vs técnico:** el `README.md` de la US es **funcional**; detalle de implementación va a `**technical-docs/`** o `**TK-XXX`** (skill story-plan), no sustituye la narrativa de negocio en la historia.
9. **Prelación historia frente a tareas:** Si algo en un `**TK-XXX`** (u otra tarea) **contradice** el `README.md` de la US, **prevalece la historia**. La historia **preexiste** a las tareas y fija el alcance funcional y las reglas de negocio acordadas; las tareas **se alinean** a la US, no al revés. Ante conflicto: **corregir o replantear las tareas** (o pedir aclaración al usuario) — **no** rebajar ni sobrescribir la US por el texto de una tarea.
10. **Unidades de trabajo antes de Ready:** Una historia **no** puede estar **Ready** si **no** están **identificadas** las **unidades de trabajo** afectadas (quién o qué capa/sistema interviene). Puede ser **granularidad general** (p. ej. *frontend* y *backend*) o **específica** según el repo (p. ej. *client-web*, *admin-web*, *micro-autenticacion*, *micro-catalogo*). Debe constar en el `README.md` (sección **Unidades de trabajo** de la plantilla) y alinearse con la fila **Unidades de trabajo definidas** del DoR en **Cumple**; si faltan, quedarse en **Draft** o marcar DoR en **No cumple** / **Parcial** con plan en **Observaciones**.
11. **RFC 2119 (niveles de requisito):** En **Descripción** (incluido contexto bajo Como/Quiero/Para si añade requisitos) y en **Reglas de negocio**, aplicar la **semántica** del [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119) (BCP 14). Las **palabras clave normativas en el texto** deben ir en el **idioma de preferencia** (regla 1), en **MAYÚSCULAS**, usando el **mapeo** de [Notes — RFC 2119](#rfc-2119) para ese idioma (p. ej. español: **DEBE**, **NO DEBE**, **DEBERÍA**, **NO DEBERÍA**, **PUEDE**, **OPCIONAL**; inglés: **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, **MAY**, **OPTIONAL**). El RFC define los términos en inglés; en documentación no inglesa se **traduce la etiqueta**, no solo el resto de la frase. Objetivo: obligaciones y prohibiciones **sin ambigüedad** para prueba y cumplimiento. Formulaciones coloquiales sin etiqueta explícita (“debería”, “conviene” en minúsculas sin **DEBERÍA**) **no** sustituyen al etiquetado cuando el requisito es normativo. Los **criterios Gherkin** deben ser **coherentes** con las reglas normativas, sin contradecir una **obligación** o **prohibición** explícita (p. ej. **DEBE** / **NO DEBE** en `es`, **MUST** / **MUST NOT** en `en`). Véase [Notes — RFC 2119](#rfc-2119).
12. **Identificadores de reglas de negocio (RN-XX):** En la sección **Reglas de negocio** del `README.md`, cada regla lleva un id **único en el ámbito de esa US**: prefijo **RN-** y número secuencial. Formato: **RN-01**, **RN-02**, … **RN-09**, **RN-10**, … (dos dígitos con ceros a la izquierda hasta **RN-99**; a partir de la regla 100, **RN-100**, etc.). El orden es el de la lista en el documento; al **reordenar o añadir** reglas, **renumerar** para mantener secuencia continua **1…n** sin saltos, salvo que el equipo acuerde otra política y lo deje en **Observaciones**. Referencias cruzadas (Gherkin, tareas, código) deben citar el id cuando ayude a la trazabilidad (p. ej. «según **RN-02**»).
13. **Ready y planificación de tareas (story-plan):** Si el `README.md` queda en **Ready** o la US ya estaba **Ready** al terminar, **incluir en la respuesta al usuario** una sugerencia explícita: puede crear los `**TK-XXX**` necesarios para implementarla usando **story-plan**. Si el usuario **pide** crear o bosquejar tareas en **continuidad** con ese trabajo, el agente debe ejecutar **story-plan** con esta política: **por defecto**, solo **stubs en Draft** — metadatos mínimos, enlace a la US, en **Descripción** del TK un **objetivo breve y concreto** por tarea (**qué** debe lograrse; alineado a criterios y unidades de la historia), **no** el cómo ni detalle de implementación (sin contratos, pasos técnicos extensos, criterios de desarrollo finos ni inventar diseño técnico). **Solo** si el usuario **describe de forma explícita y concreta** una o más tareas (alcance, entregables o condiciones suficientes), redactar el **TK completo** según **story-plan** (hasta **Ready** en el TK cuando el contenido aportado lo permita, sin rellenar huecos con supuestos).

## Steps

1. Revisar **Inputs**; si hay ambigüedad que impida INVEST riguroso, **parar** y preguntar al usuario hasta tener respuestas suficientes.
2. Fijar `**US-XXX`**: usar el proporcionado o el siguiente libre en `docs/product/user-stories/` (revisar carpetas `US-*`).
3. Proponer `**nombre-corto`** en kebab-case, corto y descriptivo (convenciones en [Notes](#notes)); validar con el usuario si hace falta.
4. Crear `docs/product/user-stories/` si no existe; crear `US-XXX-[nombre-corto]/` y `**assets/`** si hay o habrá archivos locales (imágenes, PDFs, etc.) listados en **Referencias**.
5. Escribir `**README.md**` aplicando la plantilla de `**references/user-story.md**`, rellenando con la información acordada (descripción y reglas con modalidad **RFC 2119** en el **idioma de preferencia**, cada regla con id **RN-01**, **RN-02**, …, sección **Referencias** con diseño/enlaces y archivos bajo `assets/` si aplica, criterios Gherkin con **claves de paso en MAYÚSCULAS** en ese idioma, complejidad, **unidades de trabajo**, tablas INVEST y DoR, observaciones).
6. Si el usuario pide **DTOs, entidades, endpoints o reglas técnicas**: asegurar `**docs/product/technical-docs/`**, documentar en kebab-case y enlazar con rutas relativas desde la US (p. ej. `../../technical-docs/contrato-api.md`).
7. Completar **INVEST** letra a letra; si alguna no cumple, documentarlo en **Observaciones** sin disimular.
8. Proponer **story points** (Fibonacci) y **justificación** acorde a alcance, riesgo e incertidumbre.
9. Completar **Definition of Ready** en el `README.md`; si se pretende **Ready**, verificar Gherkin (claves de paso en **MAYÚSCULAS**, idioma de preferencia, regla 6), coherencia de **claves normativas** con ese idioma (regla 11), **unidades de trabajo** (regla 10), referencias de UI según **Rules** y **sin aclaraciones pendientes** (regla 6): si **Observaciones** aún lista pendientes o hay aclaraciones abiertas, mantener **Estado: Draft** y valorar DoR en consecuencia.
10. Si el estado de la historia es **Ready** (nuevo o confirmado en la revisión), **sugerir** el siguiente paso: definir tareas `**TK-XXX**` con **story-plan**. Si en el mismo hilo el usuario pide crear o esbozar esas tareas, aplicar la regla 13 (stubs por defecto; TK completo solo si el usuario describe concretamente la tarea o aporta el detalle necesario).

## Examples

**Ejemplo 1 — Input mínimo viable**

- *Input:* «US nueva: como farmacéutico quiero ver alertas de interacción al añadir un medicamento a la receta, para evitar recetas inseguras. Reglas: mostrar alerta antes de guardar; permitir continuar con justificación.»
- *Output:* Carpeta `docs/product/user-stories/US-0XX-alertas-interaccion-receta/` con `README.md` completo (Como/Quiero/Para, reglas, Gherkin con caso feliz y excepción, INVEST/DoR rellenados, puntos y justificación, observaciones vacías o con dependencias explícitas).

**Ejemplo 2 — Falta información (sin archivos aún)**

- *Input:* «Historia de exportar informes.»
- *Output (comportamiento):* El agente **no** crea carpetas; responde con preguntas concretas (quién exporta, formatos, permisos, qué es “informe”, criterios de éxito medibles) hasta poder rellenar INVEST y Gherkin.

**Ejemplo 3 — UI**

- *Input:* Misma historia con UI + enlace a Figma y capturas en `assets/`.
- *Output:* `README.md` con referencias a diseño; fila **Referencias de UI** en DoR en **Cumple** o **Parcial** con notas; estado **Ready** solo si Gherkin y DoR lo permiten.

**Ejemplo 4 — Ready y tareas**

- *Input:* Historia cerrada en **Ready**; el usuario dice: «crea las tareas para implementarla» sin detallar cada una.
- *Output:* Respuesta que **sugiere** planificación con **story-plan** y, al ejecutarla, varios `**TK-XXX-....md`** en **Draft** (stubs: en **Descripción**, objetivo breve por tarea — *qué* lograr — sin cómo ni detalle de implementación). Si el usuario añade: «TK-002: implementar el endpoint POST /recetas con el DTO acordado en technical-docs X», entonces ese TK puede ir **completo** según **story-plan** con la información dada, sin inventar lo no dicho.

## Anti-patterns

- Crear la US con **vaguedad** (“mejorar UX”, “optimizar”) sin criterios verificables.
- Marcar **Ready** **sin** bloque Gherkin o **sin** referencias de diseño cuando la historia es de **UI**.
- Poner **Estado: Ready** con **Observaciones** que aún listen aclaraciones o pendientes sin resolver (debe quedar **Draft** hasta cerrarlos; regla 6).
- Inventar **reglas de negocio** o exclusiones que el usuario no dio.
- Poner en el `README.md` de la US el **detalle técnico** principal (nombres de clases, endpoints, esquemas) en lugar de remitir a `technical-docs/` o `TK-XXX`.
- Copiar `**references/user-story.md`** al repo del producto como artefacto en lugar de generar solo el `**README.md`**.
- **Rellenar** el `README.md` con texto de ayuda de la plantilla, marcadores genéricos o **supuestos** en secciones que debían quedar vacías o mínimas; los pendientes van en **Observaciones**.
- Omitir la sección **Referencias** o dejar **fuera del repo** imágenes/archivos que el usuario aportó para la historia **sin** guardarlos en `**assets/`** y enlazarlos desde el `README.md`.
- Omitir **Observaciones** cuando hay decisiones pendientes sin mapa a `**TK-XXX`**.
- Resolver un conflicto **a favor de una tarea** y **degradar** el `README.md` de la US: la US prevalece (ver regla 9 en **Rules**).
- Declarar **Ready** **sin** lista explícita de **unidades de trabajo** (regla 10).
- Redactar **reglas de negocio obligatorias** solo con modalidad vaga (“debería”, “conviene”) **sin** nivel **RFC 2119** cuando el equipo sigue esta convención.
- **Contradecir** en Gherkin una obligación o prohibición **explícita** de las reglas normativas (regla 11).
- Listar reglas de negocio **sin** identificador **RN-XX** o con numeración duplicada o inconsecuente (regla 12).
- Poner la **clave** de cada paso Gherkin en minúsculas o formato título (`dado`, `Dado`) en lugar de **TODO MAYÚSCULAS** (p. ej. **DADO** / **GIVEN** según idioma de preferencia; regla 6).
- Mezclar **claves Gherkin** o **claves normativas RFC 2119** en un idioma distinto al de preferencia del documento (p. ej. **GIVEN** en una US en español, o **DEBE** en una US en inglés) sin acuerdo en **Observaciones** (reglas 1, 6 y 11).
- Cerrar una US en **Ready** **sin** sugerir que puede definirse las tareas de implementación (**story-plan**).
- Crear **TK completos** con detalle técnico **inventado** o **asumido** cuando el usuario **solo** pidió tareas genéricas o «las necesarias» **sin** describir cada tarea concretamente (en ese caso: **stubs Draft**, regla 13).
- Dar por **Ready** un TK que debía ser solo **stub** hasta que el usuario o **story-plan** completen el detalle.

## Notes

### Estructura de carpetas

Cada historia vive bajo `**docs/product/user-stories/`**:

```
docs/product/
├── technical-docs/              (Opcional — documentación técnica transversal o por feature)
│   └── ...
└── user-stories/
    └── US-[Número]-[Nombre-corto]/
        ├── README.md                (Historia de usuario — contexto funcional)
        ├── TK-XXX-[nombre-tarea].md (Opcional — skill story-plan)
        └── assets/
            ├── imagen-1.png
            └── ...
```

`**technical-docs/`:** DTOs, entidades, endpoints, reglas **técnicas**; reglas de **negocio** en el `README.md` de la US. Enlaces relativos desde la carpeta de la US (p. ej. `../../technical-docs/contrato-api.md`).

**`README.md` — sección Referencias:** enlaces de diseño y listado de **archivos** bajo `**assets/`** (diseño, capturas, PDFs, etc.) que el usuario aporte; no sustituye `technical-docs/` ni decisiones de implementación.

### Convenciones del nombre de carpeta

- Formato: `US-XXX-[nombre-corto]` con `US-XXX` en mayúsculas.
- Nombre corto: **minúsculas**, **kebab-case**, corto (quitar artículos y palabras vacías).
- Ejemplos: `US-001-seleccion-item-sdp-desde-receta`, `US-004-resumen-costos-receta`, `US-007-importar-receta`.
- Archivos de apoyo (imágenes, PDFs, etc.) en `**assets/`**; enlazarlos desde la sección **Referencias** del `README.md` con rutas relativas, p. ej. `![Descripción](assets/nombre-imagen.png)` o `[Brief](assets/documento.pdf)`.

### RFC 2119

Semántica [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119) (BCP 14) para **requisitos normativos**; en el `README.md`, las **etiquetas** que aparecen en el texto deben estar en el **idioma de preferencia** (regla 1), en **MAYÚSCULAS**.

| Nivel (semántica RFC 2119) | Forma en inglés (`en`) | Forma sugerida en español (`es`) |
| -------------------------- | ---------------------- | -------------------------------- |
| Obligación absoluta | **MUST** / **REQUIRED** / **SHALL** | **DEBE** / **ES OBLIGATORIO** (elegir una convención y ser consistente) |
| Prohibición absoluta | **MUST NOT** / **SHALL NOT** | **NO DEBE** / **ESTÁ PROHIBIDO** (elegir una convención y ser consistente) |
| Recomendación fuerte | **SHOULD** / **RECOMMENDED** | **DEBERÍA** / **ES RECOMENDABLE** |
| Desaconsejado salvo causa | **SHOULD NOT** / **NOT RECOMMENDED** | **NO DEBERÍA** / **NO ES RECOMENDABLE** |
| Permiso u opcionalidad | **MAY** / **OPTIONAL** | **PUEDE** / **OPCIONAL** |

Para otros idiomas, usar equivalentes establecidos por el equipo con la misma correspondencia semántica. Cada ítem en **Reglas de negocio** lleva además su id **RN-01**, **RN-02**, … (regla 12). En **Criterios de aceptación** (Gherkin), las **claves de cada paso** van en **MAYÚSCULAS** en el **mismo idioma de preferencia** (p. ej. **CUANDO** en español, **WHEN** en inglés); el enunciado del paso, en ese idioma. No hace falta repetir la tabla en cada US; basta aplicar las claves con criterio. Si el usuario pide **no** usar RFC 2119 en reglas/descripción, documentarlo en **Observaciones** y usar lenguaje claro acordado con el equipo (**el formato Gherkin MAYÚSCULAS por línea se mantiene** salvo petición explícita en contra).

### Glosario (`docs/product/glossary.md`)

Si aparecen términos de dominio o abreviaturas que deben ser compartibles entre producto y desarrollo, **crear** o **reutilizar** entrada en `**docs/product/glossary.md`**.

- Solo **definiciones** de términos; **no** pegar implementación (eso: `technical-docs/`, ADRs, `TK-XXX`).
- Definiciones **breves** en contexto producto/dominio; uso coherente y enlace al glosario en el `README.md` si aplica.

### Referencia empaquetada

La plantilla del `README.md` está en `**references/user-story.md`** dentro del paquete del skill; sirve como **molde** para el contenido en el repo del producto, no como documento a versionar tal cual en la historia.