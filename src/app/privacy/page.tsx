import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-prose p-6 pb-16 text-zinc-800 dark:text-zinc-200">
      <Link
        href="/settings"
        className="text-sm text-zinc-600 underline underline-offset-4 hover:text-foreground dark:text-zinc-400"
      >
        ← Volver a ajustes
      </Link>

      <article className="mt-6 space-y-8">
        <header className="space-y-2 border-b border-zinc-200 pb-6 dark:border-zinc-800">
          <h1 className="text-2xl font-semibold tracking-tight">Política de privacidad</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            <strong>Vigencia:</strong> 29 de abril de 2026. <strong>Última actualización:</strong>{' '}
            29 de abril de 2026.
          </p>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            El presente documento describe cómo <strong>react-base-project</strong> (en adelante, la
            &quot;aplicación&quot; o &quot;nosotros&quot;) trata los datos personales de las
            personas usuarias (&quot;usted&quot;). Es un texto de referencia para desarrollo; antes
            de publicar un producto real debe revisarlo un asesor legal y adaptarlo a su tratamiento
            concreto de datos.
          </p>
        </header>

        <section className="space-y-3" aria-labelledby="priv-1">
          <h2 id="priv-1" className="text-lg font-semibold">
            1. Responsable del tratamiento
          </h2>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            Responsable: <strong>[Nombre o razón social]</strong>. Domicilio:{' '}
            <strong>[Dirección]</strong>. Correo de contacto para privacidad:{' '}
            <strong>[privacidad@ejemplo.com]</strong>. Si designa un delegado de protección de datos
            (DPO), indíquelo aquí con sus datos de contacto.
          </p>
        </section>

        <section className="space-y-3" aria-labelledby="priv-2">
          <h2 id="priv-2" className="text-lg font-semibold">
            2. Datos que podemos tratar
          </h2>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            Según las funciones que active en la aplicación, podríamos tratar, entre otros:
          </p>
          <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            <li>
              <strong>Datos de cuenta:</strong> identificador, nombre o alias, dirección de correo
              electrónico, hash de contraseña u otros mecanismos de autenticación.
            </li>
            <li>
              <strong>Datos de uso y dispositivo:</strong> dirección IP truncada o completa, tipo de
              navegador, sistema operativo, zona horaria, identificadores de sesión, registros de
              acceso y eventos de seguridad.
            </li>
            <li>
              <strong>Datos que usted introduce voluntariamente</strong> en formularios,
              preferencias o contenidos que envíe a través de la aplicación.
            </li>
            <li>
              <strong>Códigos de verificación (OTP)</strong> y metadatos asociados al envío o
              validación, cuando utilice flujos de doble factor o verificación de identidad.
            </li>
          </ul>
        </section>

        <section className="space-y-3" aria-labelledby="priv-3">
          <h2 id="priv-3" className="text-lg font-semibold">
            3. Finalidades y bases legales
          </h2>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            Tratamos los datos personales para las finalidades que resulten necesarias en cada caso,
            entre ellas:
          </p>
          <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            <li>
              <strong>Prestación del servicio y ejecución del contrato</strong> (art. 6.1.b RGPD /
              equivalente local): crear y mantener la cuenta, autenticación, soporte técnico,
              comunicaciones operativas sobre el servicio.
            </li>
            <li>
              <strong>Cumplimiento de obligaciones legales</strong> (art. 6.1.c): conservación de
              registros, respuesta a autoridades cuando proceda legalmente.
            </li>
            <li>
              <strong>Interés legítimo</strong> (art. 6.1.f), previo análisis de proporcionalidad:
              mejora del producto, métricas agregadas, prevención del fraude, seguridad de la
              información y de la red.
            </li>
            <li>
              <strong>Consentimiento</strong> (art. 6.1.a): comunicaciones comerciales, cookies no
              esenciales u otras finalidades que exijan consentimiento expreso, cuando así lo exija
              la normativa.
            </li>
          </ul>
        </section>

        <section className="space-y-3" aria-labelledby="priv-4">
          <h2 id="priv-4" className="text-lg font-semibold">
            4. Conservación
          </h2>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            Conservamos los datos el tiempo necesario para las finalidades indicadas y, en su caso,
            mientras exista una relación contractual o un plazo legal de prescripción o archivos
            obligatorios. Tras la baja de la cuenta, aplicaremos políticas de borrado o
            anonimización conforme a la normativa aplicable y a nuestras políticas internas de
            retención documentadas.
          </p>
        </section>

        <section className="space-y-3" aria-labelledby="priv-5">
          <h2 id="priv-5" className="text-lg font-semibold">
            5. Destinatarios y encargados del tratamiento
          </h2>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            No vendemos sus datos personales. Podemos comunicarlos a proveedores que actúen como{' '}
            <strong>encargados del tratamiento</strong> (por ejemplo: alojamiento en la nube, envío
            de correo transaccional, analítica, monitorización de errores), siempre con contrato o
            cláusulas tipo que exija la ley. También podrán conocerlos autoridades judiciales o
            administrativas cuando exista obligación legal.
          </p>
        </section>

        <section className="space-y-3" aria-labelledby="priv-6">
          <h2 id="priv-6" className="text-lg font-semibold">
            6. Transferencias internacionales
          </h2>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            Si algún proveedor trata datos fuera del Espacio Económico Europeo u otra región con
            normativa de protección de datos, adoptaremos las garantías previstas (por ejemplo,
            cláusulas contractuales tipo aprobadas por la Comisión Europea u otras medidas
            reconocidas).
          </p>
        </section>

        <section className="space-y-3" aria-labelledby="priv-7">
          <h2 id="priv-7" className="text-lg font-semibold">
            7. Seguridad
          </h2>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            Aplicamos medidas técnicas y organizativas apropiadas al riesgo (cifrado en tránsito
            cuando proceda, controles de acceso, registro de actividades, copias de seguridad,
            formación del personal). Ningún sistema es invulnerable; si se produce una violación de
            seguridad que afecte a sus datos y deba notificarse, lo haremos conforme a la ley.
          </p>
        </section>

        <section className="space-y-3" aria-labelledby="priv-8">
          <h2 id="priv-8" className="text-lg font-semibold">
            8. Derechos de las personas interesadas
          </h2>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            Cuando la normativa aplicable lo reconozca (p. ej. RGPD en la UE), usted puede ejercer
            derechos de acceso, rectificación, supresión, limitación del tratamiento, portabilidad,
            oposición y, en su caso, retirar el consentimiento sin afectar a la licitud del
            tratamiento previo. También puede presentar reclamación ante la autoridad de control
            competente (en España, la{' '}
            <a
              href="https://www.aepd.es"
              className="text-zinc-900 underline underline-offset-2 hover:opacity-80 dark:text-zinc-100"
              rel="noopener noreferrer"
            >
              AEPD
            </a>
            ).
          </p>
        </section>

        <section className="space-y-3" aria-labelledby="priv-9">
          <h2 id="priv-9" className="text-lg font-semibold">
            9. Cookies y tecnologías similares
          </h2>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            Si la aplicación utiliza cookies o almacenamiento local, se informará mediante un banner
            o política de cookies específica, indicando finalidad, duración y cómo aceptar o
            rechazar las no esenciales, de acuerdo con la normativa de la Unión Europea (ePrivacy) y
            guías de la autoridad de control.
          </p>
        </section>

        <section className="space-y-3" aria-labelledby="priv-10">
          <h2 id="priv-10" className="text-lg font-semibold">
            10. Menores de edad
          </h2>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            El servicio no está dirigido a menores de 16 años (o la edad que exija su jurisdicción).
            Si tiene conocimiento de que un menor nos ha facilitado datos, contacte con nosotros
            para adoptar las medidas oportunas.
          </p>
        </section>

        <section className="space-y-3" aria-labelledby="priv-11">
          <h2 id="priv-11" className="text-lg font-semibold">
            11. Cambios en esta política
          </h2>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            Podremos actualizar este documento para reflejar cambios legales o del servicio.
            Publicaremos la versión vigente en esta misma URL e indicaremos la fecha de última
            actualización. Cuando el cambio sea sustancial, podremos notificarlo por correo
            electrónico o mediante un aviso en la aplicación.
          </p>
        </section>

        <section className="space-y-3" aria-labelledby="priv-12">
          <h2 id="priv-12" className="text-lg font-semibold">
            12. Contacto
          </h2>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            Para cualquier consulta sobre esta política o el ejercicio de derechos, escriba a{' '}
            <strong>[privacidad@ejemplo.com]</strong>, indicando su nombre, un medio de contacto y
            el derecho que desea ejercer.
          </p>
        </section>
      </article>
    </div>
  );
}
