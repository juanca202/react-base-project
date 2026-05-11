# Historia de usuario (README.md de US-XXX)

Solo **plantilla** para el `README.md` bajo `docs/product/user-stories/US-XXX-[nombre-corto]/`.

Al generar el archivo en el repo del producto, **no** copiar este documento tal cual: crear solo el `README.md` con la plantilla siguiente.

**Contenido por sección:** incluir **solo** lo **acordado** o **inferible con criterio** del mensaje del usuario y del contexto (sin inventar reglas, criterios ni referencias). **No** supuestos presentados como hechos, **no** texto placeholder genérico ni listas «de relleno». Prerrequisitos sin cumplir, datos faltantes, decisiones pendientes o lagunas DoR/INVEST → **Observaciones** (lista explícita). Si una sección aún no tiene material real, dejarla mínima o honestamente incompleta y reflejar el gap en **Observaciones**, en lugar de texto ficticio.

**Estado en cabecera:** **Ready** solo cuando **no** quede ninguna aclaración ni pendiente sin resolver (ni en **Observaciones** ni acordada fuera del documento pero aún abierta). Mientras exista cualquier aclaración pendiente, el **Estado** debe ser **Draft** aunque el resto del DoR o el Gherkin estén completos.

---

# US-XXX: Título corto de la historia de usuario

- **ID:** [US-XXX]
- **Estado:** [Draft / Ready / In Progress / Done]

## Descripción

**Como** [tipo de usuario]
**Quiero** [necesidad / acción]
**Para** [beneficio / resultado esperado]

## Reglas de negocio

[Cada regla **normativa** debe expresar el nivel [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119) adecuado usando las **palabras clave normativas en el idioma de preferencia** del equipo (el mismo que el resto de la US; p. ej. en español: «El sistema **NO DEBE** …», «La UI **DEBERÍA** …»; en inglés: «The system **MUST NOT** …», «The UI **SHOULD** …»). Las claves normativas van en **MAYÚSCULAS** en el cuerpo del enunciado.]

[Cada regla debe tener un **identificador único dentro de la US**, con prefijo **RN-** y número secuencial en dos dígitos con ceros a la izquierda: **RN-01**, **RN-02**, **RN-03**, … (orden de aparición en el documento).]

- **RN-01** — [enunciado de la regla con modalidad RFC 2119 en el idioma de preferencia]
- **RN-02** — […]
- **RN-03** — […]

## Referencias

[**Qué incluir:** referencias de **diseño**, **imágenes** y **cualquier archivo** que el usuario aporte para crear o contextualizar la historia (mockups, wireframes, capturas, PDFs, etc.), además de enlaces externos (p. ej. Figma, prototipos).]

[**Archivos locales:** si el material no es solo un enlace, los ficheros deben vivir en la subcarpeta `**assets/`** dentro de la carpeta de la historia (`docs/product/user-stories/US-XXX-[nombre-corto]/assets/`). En este apartado se enlazan con **ruta relativa** desde el `README.md`, p. ej. `![Descripción](assets/captura.png)` o `[Documento](assets/brief.pdf)`.]

- **Diseño / prototipo (URL):** [nombre descriptivo](https://…)
- **Archivo en `assets/`:** [nombre descriptivo](assets/nombre-del-archivo.ext)
- **…** (añadir tantas entradas como haga falta; si no hay referencias aún, dejar una línea *Ninguna por ahora* o eliminar bullets vacíos según criterio del equipo)

## Criterios de aceptación

[Formato estilo **Given / When / Then** (Gherkin; obligatorio para considerarse "Ready"). Al inicio de cada línea va la **palabra clave del paso** en **TODO MAYÚSCULAS**, en el **idioma de preferencia** del equipo (el mismo que el resto de la US; p. ej. español: **DADO**, **CUANDO**, **ENTONCES**, **Y**, **PERO**; inglés: **GIVEN**, **WHEN**, **THEN**, **AND**, **BUT**). **No** usar **GIVEN** / **WHEN** / **THEN** en un documento redactado en español, ni la inversa. El texto después de la clave sigue ese idioma.]

```gherkin
DADO
CUANDO
ENTONCES
```

## Complejidad sugerida

- **Story points:** [valoración Fibonacci] (Fibonacci: 1, 2, 3, 5, 8, 13)
- **Justificación:**
[justificación corta de la valoración Fibonacci]

## Unidades de trabajo

[**Obligatorio antes de Ready:** indicar qué partes del sistema intervienen. Puede ser **general** (p. ej. frontend, backend) o **específica** (p. ej. client-web, admin-web, micro-autenticacion, micro-catalogo), según cómo organice el equipo el repo.]

- [unidad / área 1]
- [unidad / área 2]

## Validación

### INVEST


| Letra | Criterio      | Resultado                                  | Notas                          |
| ----- | ------------- | ------------------------------------------ | ------------------------------ |
| **I** | Independiente | [valoración: Cumple / No cumple / Parcial] | [Explicación de la valoración] |
| **N** | Negociable    | [valoración: Cumple / No cumple / Parcial] | [Explicación de la valoración] |
| **V** | Valiosa       | [valoración: Cumple / No cumple / Parcial] | [Explicación de la valoración] |
| **E** | Estimable     | [valoración: Cumple / No cumple / Parcial] | [Explicación de la valoración] |
| **S** | Pequeña       | [valoración: Cumple / No cumple / Parcial] | [Explicación de la valoración] |
| **T** | Testeable     | [valoración: Cumple / No cumple / Parcial] | [Explicación de la valoración] |


### Definition of Ready (DoR)


| Criterio DoR                       | Estado                                                 | Notas                                                                                   |
| ---------------------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| Dependencias listas                | [valoración: Cumple / No cumple / Parcial]             | [Explicación de la valoración]                                                          |
| Inputs/outputs claros              | [valoración: Cumple / No cumple / Parcial]             | [Explicación de la valoración]                                                          |
| Unidades de trabajo definidas      | [valoración: Cumple / No cumple / Parcial]             | [Explicación de la valoración]                                                          |
| Sin decisiones técnicas pendientes | [valoración: Cumple / No cumple / Parcial]             | [Explicación de la valoración]                                                          |
| Referencias de UI                  | [valoración: Cumple / No cumple / Parcial / No aplica] | [Explicación de la valoración]                                                          |
| Sin aclaraciones pendientes        | [valoración: Cumple / No cumple / Parcial]             | [Vacío o «Ninguna» en Observaciones; nada pendiente con usuario/producto fuera del doc] |


## Observaciones

- Prerrequisitos o dependencias **aún no listas** (si las hay):
- Datos o aclaraciones **pendientes** del usuario o de producto:
- Decisiones pendientes:
- Otras notas (solo si aportan valor; **no** usar esta sección como copia de instrucciones de plantilla)

