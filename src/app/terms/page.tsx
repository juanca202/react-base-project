import Link from 'next/link';

export default function TermsPage() {
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
          <h1 className="text-2xl font-semibold tracking-tight">Términos y condiciones de uso</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            <strong>Vigencia:</strong> 29 de abril de 2026. <strong>Última actualización:</strong>{' '}
            29 de abril de 2026.
          </p>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Estos términos regulan el acceso y uso de la aplicación web{' '}
            <strong>react-base-project</strong> (el &quot;servicio&quot;), prestado por{' '}
            <strong>[Nombre o razón social]</strong> (&quot;nosotros&quot;, &quot;nos&quot;). Al
            utilizar el servicio, usted (&quot;usuario&quot;) acepta estos términos. Si no está de
            acuerdo, no utilice el servicio. Este texto es una plantilla para entornos de
            desarrollo; debe ser revisado por asesoría jurídica antes de un uso comercial.
          </p>
        </header>

        <section className="space-y-3" aria-labelledby="terms-1">
          <h2 id="terms-1" className="text-lg font-semibold">
            1. Descripción del servicio
          </h2>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            El servicio consiste en [describir brevemente la funcionalidad: gestión de cuenta,
            verificación por OTP, ajustes, etc.]. Nos reservamos el derecho de modificar, suspender
            o discontinuar funciones con el fin de mejorar la seguridad, el rendimiento o el
            cumplimiento normativo, procurando avisar con antelación razonable cuando ello sea
            viable y no esté prohibido por ley o por motivos de urgencia.
          </p>
        </section>

        <section className="space-y-3" aria-labelledby="terms-2">
          <h2 id="terms-2" className="text-lg font-semibold">
            2. Elegibilidad y registro
          </h2>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            El usuario declara ser mayor de edad y tener capacidad legal para contratar en su
            jurisdicción. La información facilitada en el registro debe ser veraz y mantenerse
            actualizada. Usted es responsable de la confidencialidad de sus credenciales y de toda
            actividad realizada con su cuenta; debe notificarnos de inmediato cualquier uso no
            autorizado.
          </p>
        </section>

        <section className="space-y-3" aria-labelledby="terms-3">
          <h2 id="terms-3" className="text-lg font-semibold">
            3. Uso aceptable
          </h2>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            Queda prohibido utilizar el servicio de forma que:
          </p>
          <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            <li>vulnere leyes aplicables, derechos de terceros o estos términos;</li>
            <li>
              intente acceder no autorizado a sistemas, datos o cuentas de otros usuarios (p. ej.
              ataques, ingeniería inversa maliciosa, scraping abusivo);
            </li>
            <li>
              introduzca malware, sobrecargue la infraestructura de forma deliberada o interfiera
              con el correcto funcionamiento del servicio;
            </li>
            <li>
              utilice el servicio para enviar spam, suplantar identidades o distribuir contenido
              ilícito u ofensivo según la legislación vigente.
            </li>
          </ul>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            Podremos suspender o cancelar cuentas que incumplan estas reglas, previa notificación
            cuando sea posible, salvo que la gravedad del incumplimiento exija actuación inmediata.
          </p>
        </section>

        <section className="space-y-3" aria-labelledby="terms-4">
          <h2 id="terms-4" className="text-lg font-semibold">
            4. Propiedad intelectual e industrial
          </h2>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            El software, diseños, marcas, textos de la interfaz y demás elementos del servicio son
            titularidad nuestra o de nuestros licenciantes. No se concede ninguna licencia sobre
            ellos salvo la licencia limitada, no exclusiva, intransferible y revocable para acceder
            y usar el servicio conforme a estos términos. El contenido que el usuario cargue en el
            servicio continúa siendo suyo; nos otorga una licencia no exclusiva para alojarlo,
            procesarlo y mostrarlo en la medida necesaria para prestar el servicio.
          </p>
        </section>

        <section className="space-y-3" aria-labelledby="terms-5">
          <h2 id="terms-5" className="text-lg font-semibold">
            5. Verificación y seguridad (OTP)
          </h2>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            Cuando el servicio incluya verificación por código de un solo uso (OTP), el usuario se
            compromete a no compartir códigos con terceros ni a intentar eludir los controles de
            seguridad. Los envíos de códigos pueden estar sujetos a límites de frecuencia para
            prevenir abusos. No garantizamos la entrega instantánea de SMS o correos dependiendo de
            operadores externos.
          </p>
        </section>

        <section className="space-y-3" aria-labelledby="terms-6">
          <h2 id="terms-6" className="text-lg font-semibold">
            6. Disponibilidad y soporte
          </h2>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            El servicio se presta &quot;tal cual&quot; y según disponibilidad. Podrán producirse
            interrupciones por mantenimiento, actualizaciones o causas de fuerza mayor. El soporte,
            si existe, se prestará por los canales indicados en la aplicación o en la documentación
            del proyecto.
          </p>
        </section>

        <section className="space-y-3" aria-labelledby="terms-7">
          <h2 id="terms-7" className="text-lg font-semibold">
            7. Exclusión y limitación de responsabilidad
          </h2>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            En la máxima medida permitida por la ley aplicable, quedan excluidas las garantías
            implícitas de comerciabilidad, idoneidad para un fin concreto y no infracción. No
            seremos responsables por daños indirectos, lucro cesante, pérdida de datos o
            interrupción del negocio, salvo que la normativa imperativa disponga lo contrario (por
            ejemplo, en relación con consumidores).
          </p>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            Cuando la responsabilidad no pueda excluirse, esta quedará limitada, en su conjunto por
            todos los conceptos reclamables en un periodo de doce (12) meses, al importe que el
            usuario haya abonado por el servicio en dicho periodo o, si el servicio es gratuito, a{' '}
            <strong>[cifra simbólica o 0 €]</strong>, salvo dolo o culpa grave de nuestra parte.
          </p>
        </section>

        <section className="space-y-3" aria-labelledby="terms-8">
          <h2 id="terms-8" className="text-lg font-semibold">
            8. Indemnización
          </h2>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            El usuario mantendrá indemne a [Nombre o razón social], sus administradores, empleados y
            colaboradores frente a reclamaciones de terceros derivadas de un uso ilícito del
            servicio o del incumplimiento de estos términos, incluidos honorarios razonables de
            abogados cuando proceda.
          </p>
        </section>

        <section className="space-y-3" aria-labelledby="terms-9">
          <h2 id="terms-9" className="text-lg font-semibold">
            9. Enlaces a terceros
          </h2>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            El servicio puede contener enlaces a sitios web de terceros. No controlamos ni asumimos
            responsabilidad sobre sus contenidos o políticas de privacidad. El acceso a dichos
            sitios es bajo su propio riesgo.
          </p>
        </section>

        <section className="space-y-3" aria-labelledby="terms-10">
          <h2 id="terms-10" className="text-lg font-semibold">
            10. Duración y baja
          </h2>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            Estos términos permanecen vigentes mientras use el servicio. Puede dejar de utilizarlo
            en cualquier momento. Podremos dar de baja su cuenta por incumplimiento grave, con los
            efectos previstos en la sección de uso aceptable. Tras la baja, aplicarán las reglas de
            conservación y supresión de datos descritas en la política de privacidad.
          </p>
        </section>

        <section className="space-y-3" aria-labelledby="terms-11">
          <h2 id="terms-11" className="text-lg font-semibold">
            11. Ley aplicable y jurisdicción
          </h2>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            Estos términos se rigen por las leyes de <strong>[país]</strong>, sin perjuicio de las
            normas imperativas de protección al consumidor del lugar de residencia habitual del
            usuario consumidor en la Unión Europea. Las partes se someten a los juzgados y
            tribunales de <strong>[ciudad]</strong>, salvo que la ley atribuya competencia
            indelegable a otros tribunales (p. ej. domicilio del consumidor).
          </p>
        </section>

        <section className="space-y-3" aria-labelledby="terms-12">
          <h2 id="terms-12" className="text-lg font-semibold">
            12. Independencia de las cláusulas y contacto
          </h2>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            Si alguna cláusula fuera declarada nula o ineficaz, el resto permanecerá en vigor.
            Cualquier renuncia a un derecho deberá constar por escrito. Para notificaciones
            relativas a estos términos: <strong>[legal@ejemplo.com]</strong>.
          </p>
        </section>
      </article>
    </div>
  );
}
