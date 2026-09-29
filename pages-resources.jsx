// Resources: PIP & Insurance, Reviews, Patient Resources, For Providers, Sitemap, Home helpers
const Countdown = () => {
  const { lang } = useLang();
  const [d, setD] = React.useState('');
  const days = d ? Math.floor((new Date(d + 'T12:00:00') - new Date()) / 86400000) + 14 : null;
  const left = days === null ? null : Math.max(0, Math.min(14, days));
  return (
    <div className="card countdown">
      <div><div className="eyebrow">{lang === 'en' ? '14-day PIP calculator' : 'Calculadora PIP de 14 días'}</div><h3>{lang === 'en' ? 'When was your accident?' : '¿Cuándo fue su accidente?'}</h3><input type="date" value={d} max={new Date().toISOString().slice(0, 10)} onChange={e => setD(e.target.value)} /></div>
      <div className={'cd-res' + (left !== null && left <= 3 ? ' urgent' : '')}>
        {left === null ? <p>{lang === 'en' ? 'Enter the date to see how many days you have left to be seen.' : 'Ingrese la fecha para ver cuántos días le quedan.'}</p> : left === 0 ? <><b>0</b><p>{lang === 'en' ? 'The 14-day window has passed. Call us anyway — you may still have options, and your injuries still need care.' : 'El plazo de 14 días ha pasado. Llámenos de todos modos: aún puede tener opciones y sus lesiones necesitan atención.'}</p></> : <><b>{left}</b><p>{lang === 'en' ? `day${left === 1 ? '' : 's'} left to see a doctor and protect your PIP benefits. We can see you today.` : `día${left === 1 ? '' : 's'} para ver a un médico y proteger sus beneficios PIP. Podemos atenderle hoy.`}</p></>}
        <CallBtn className="btn btn-primary btn-sm" />
      </div>
    </div>
  );
};

const PipInsurance = () => {
  const { t, lang } = useLang();
  const en = lang === 'en';
  const covers = en ? [['80% of medical expenses', 'Vehicle repairs'], ['60% of lost wages', 'Property damage'], ['Mileage to medical appointments', 'Bills beyond your $10,000 limit'], ['Up to $5,000 in death benefits', 'Pain and suffering (that is a bodily-injury claim)']] : [['80% de gastos médicos', 'Reparación del vehículo'], ['60% de salarios perdidos', 'Daños a la propiedad'], ['Millaje a citas médicas', 'Facturas que excedan los $10,000'], ['Hasta $5,000 por fallecimiento', 'Dolor y sufrimiento (eso es un reclamo de lesiones corporales)']];
  const compare = en ? [['PIP (auto)', 'Car accidents', '14 days', '$10,000 with EMC · $2,500 without', 'Yes'], ['Health insurance', 'Any injury, after PIP is used', 'Plan rules', 'Plan limits', 'Yes — most major plans'], ['Workers’ compensation', 'Injuries on the job', 'Report in 30 days', '100% of authorized care', 'Yes'], ['Letter of Protection', 'Any injury with an attorney', 'None', 'Paid from settlement', 'Yes'], ['Self-pay', 'Anyone', 'None', 'Transparent pricing', 'Yes']] : [['PIP (auto)', 'Accidentes de auto', '14 días', '$10,000 con EMC · $2,500 sin', 'Sí'], ['Seguro de salud', 'Cualquier lesión, tras agotar PIP', 'Reglas del plan', 'Límites del plan', 'Sí — la mayoría'], ['Compensación laboral', 'Lesiones en el trabajo', 'Reportar en 30 días', '100% de la atención autorizada', 'Sí'], ['Carta de Protección', 'Cualquier lesión con abogado', 'Ninguno', 'Se paga del acuerdo', 'Sí'], ['Pago directo', 'Cualquiera', 'Ninguno', 'Precios transparentes', 'Sí']];
  const faq = en ? [['How much does PIP pay in Florida?', 'Up to $10,000 in combined medical and disability benefits when a physician certifies an Emergency Medical Condition (EMC): 80% of medical bills, 60% of lost wages and up to $5,000 in death benefits. Without an EMC the cap is $2,500.'], ['Who can certify an EMC?', 'An MD, DO, dentist, physician assistant or advanced practice nurse. A chiropractor alone cannot. UrgiMed has physicians at every clinic, so your EMC is determined on the first visit.'], ['Do I need PIP if I have health insurance?', 'Yes — Florida requires it, and PIP pays first after a crash. Your health plan may cover eligible costs after PIP is exhausted; UrgiMed accepts both.'], ['Does PIP cover passengers?', 'Yes. Passengers are usually covered under the driver’s PIP or their own policy. We help you sort out which applies.'], ['What if I was not at fault?', 'PIP is no-fault: your own policy pays first. A separate bodily-injury claim against the at-fault driver may cover the rest, which is why documentation matters.'], ['Can I be treated without PIP?', 'Yes. We accept health insurance, workers’ compensation, Letters of Protection and self-pay.']] : [['¿Cuánto paga el PIP en Florida?', 'Hasta $10,000 en beneficios médicos y por discapacidad cuando un médico certifica una Condición Médica de Emergencia (EMC): 80% de facturas médicas, 60% de salarios perdidos y hasta $5,000 por fallecimiento. Sin EMC el límite es $2,500.'], ['¿Quién puede certificar una EMC?', 'Un MD, DO, dentista, asistente médico o enfermera de práctica avanzada. Un quiropráctico solo no puede. UrgiMed tiene médicos en cada clínica.'], ['¿Necesito PIP si tengo seguro de salud?', 'Sí. Florida lo exige y el PIP paga primero. Su plan de salud puede cubrir costos después; UrgiMed acepta ambos.'], ['¿El PIP cubre a los pasajeros?', 'Sí, normalmente bajo el PIP del conductor o su propia póliza.'], ['¿Y si no tuve la culpa?', 'El PIP es sin culpa: su propia póliza paga primero. Un reclamo de lesiones corporales contra el conductor culpable puede cubrir el resto.'], ['¿Puedo tratarme sin PIP?', 'Sí. Aceptamos seguro de salud, compensación laboral, Cartas de Protección y pago directo.']];
  return (
    <main>
      <PageHead eyebrow={t('nav_resources')} h1={en ? 'Florida PIP Insurance & Payment Options After an Accident' : 'Seguro PIP de Florida y Opciones de Pago Tras un Accidente'} sub={en ? 'How Personal Injury Protection works, the 14-day rule, what it covers, and every other way to pay for care at UrgiMed.' : 'Cómo funciona la Protección de Lesiones Personales, la regla de 14 días, qué cubre y todas las demás formas de pagar su atención en UrgiMed.'} img="img/w-car-accident.jpg" />
      <section className="sec"><div className="wrap two">
        <article className="article" style={{ maxWidth: 'none' }}>
          <h2 style={{ marginTop: 0 }}>{en ? 'What is PIP insurance in Florida?' : '¿Qué es el seguro PIP en Florida?'}</h2>
          <p>{en ? 'Personal Injury Protection (PIP), also called no-fault insurance, is required on every Florida vehicle. It pays for your medical care and part of your lost wages after a car accident regardless of who caused the crash. Florida law requires a minimum of $10,000 in PIP coverage.' : 'La Protección de Lesiones Personales (PIP), o seguro sin culpa, es obligatoria en todo vehículo de Florida. Paga su atención médica y parte de sus salarios perdidos tras un accidente, sin importar quién lo causó. La ley exige un mínimo de $10,000.'}</p>
          <h2>{en ? 'How much does PIP pay?' : '¿Cuánto paga el PIP?'}</h2>
          <div className="grid g3" style={{ gap: 12, marginBottom: 20 }}>{(en ? [['80%', 'of reasonable medical expenses'], ['60%', 'of lost wages'], ['$5,000', 'in death benefits']] : [['80%', 'de gastos médicos razonables'], ['60%', 'de salarios perdidos'], ['$5,000', 'por fallecimiento']]).map(([n, l], i) => <div key={i} className="card stat"><b>{n}</b><span>{l}</span></div>)}</div>
          <p>{en ? 'The full $10,000 is available only when a physician determines you have an Emergency Medical Condition (EMC). Without that determination, benefits are capped at $2,500. Because UrgiMed is physician-led, the EMC evaluation happens at your first visit.' : 'Los $10,000 completos solo están disponibles cuando un médico determina que tiene una Condición Médica de Emergencia (EMC). Sin esa determinación, el límite es $2,500. Como UrgiMed está dirigido por médicos, la evaluación EMC ocurre en su primera visita.'}</p>
          <h2>{en ? 'The 14-day rule' : 'La regla de 14 días'}</h2>
          <p>{en ? 'You must receive initial medical care within 14 days of the accident to be eligible for PIP benefits. Use the calculator to see how many days you have left.' : 'Debe recibir atención médica inicial dentro de 14 días del accidente para ser elegible. Use la calculadora para ver cuántos días le quedan.'}</p>
          <Countdown />
          <h2>{en ? 'What PIP covers — and what it does not' : 'Qué cubre el PIP y qué no'}</h2>
          <table className="tbl"><thead><tr><th>{en ? 'PIP covers' : 'El PIP cubre'}</th><th>{en ? 'PIP does not cover' : 'El PIP no cubre'}</th></tr></thead><tbody>{covers.map((r, i) => <tr key={i}><td><I.check s={14} /> {r[0]}</td><td><span className="dot-warn"></span> {r[1]}</td></tr>)}</tbody></table>
          <h2>{en ? 'Every way to pay at UrgiMed' : 'Todas las formas de pagar en UrgiMed'}</h2>
          <p>{en ? 'Unlike clinics that only take PIP, UrgiMed accepts most forms of coverage, so care continues after your auto benefits run out.' : 'A diferencia de clínicas que solo aceptan PIP, UrgiMed acepta la mayoría de coberturas, para que su atención continúe cuando se agoten los beneficios del auto.'}</p>
          <div className="tbl-wrap"><table className="tbl"><thead><tr>{(en ? ['Coverage', 'For', 'Deadline', 'Pays', 'Accepted'] : ['Cobertura', 'Para', 'Plazo', 'Paga', 'Aceptado']).map(h => <th key={h}>{h}</th>)}</tr></thead><tbody>{compare.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{j === 0 ? <b>{c}</b> : j === 4 ? <span style={{ color: 'var(--t6)', fontWeight: 600 }}><I.check s={14} /> {c}</span> : c}</td>)}</tr>)}</tbody></table></div>
          <h2>{en ? 'Filing a PIP claim: step by step' : 'Presentar un reclamo PIP: paso a paso'}</h2>
          <div style={{ display: 'grid', gap: 18, marginBottom: 24 }}>{(en ? [['Report the crash to your auto insurer', 'Open the PIP claim before using health insurance.'], ['Be seen within 14 days', 'UrgiMed sees you the same day, takes X-rays and determines your EMC.'], ['We bill PIP directly', 'You do not pay up front. We send records and bills to the insurer and, if you have one, your attorney.'], ['Keep your receipts and mileage', 'Travel to appointments is reimbursable.'], ['Insurer pays within 30 days of approval', 'Florida gives them 60 days to investigate; we follow up for you.']] : [['Reporte el choque a su aseguradora', 'Abra el reclamo PIP antes de usar el seguro de salud.'], ['Sea atendido en 14 días', 'UrgiMed le atiende el mismo día, toma rayos X y determina su EMC.'], ['Facturamos al PIP directamente', 'No paga por adelantado. Enviamos expedientes y facturas a la aseguradora y a su abogado.'], ['Guarde recibos y millaje', 'El viaje a las citas es reembolsable.'], ['La aseguradora paga en 30 días tras la aprobación', 'Florida les da 60 días para investigar; nosotros hacemos el seguimiento.']]).map(([h, p], i) => <div key={i} className="step"><div className="n">{i + 1}</div><div><h3>{h}</h3><p style={{ margin: 0, fontSize: '.95rem' }}>{p}</p></div></div>)}</div>
          <div className="article-faq"><h2>{en ? 'PIP insurance FAQ' : 'Preguntas frecuentes sobre PIP'}</h2><FAQList items={faq.map(([q, a]) => ({ q, a }))} /></div>
        </article>
        <BlogSidebar />
      </div></section>
      <ClinicCTA />
    </main>
  );
};

const Reviews = () => {
  const { t, lang } = useLang();
  const en = lang === 'en';
  const rated = LOCATIONS.filter(l => l.gbp && l.gbp.reviews);
  const total = rated.reduce((a, l) => a + l.gbp.reviews, 0);
  const avg = (rated.reduce((a, l) => a + l.gbp.rating * l.gbp.reviews, 0) / total).toFixed(1);
  return (
    <main>
      <PageHead eyebrow={t('nav_resources')} h1={en ? 'UrgiMed Patient Reviews' : 'Reseñas de Pacientes de UrgiMed'} sub={en ? `${avg} average across ${total}+ Google reviews. Real patients, real recoveries, at 11 Florida clinics.` : `${avg} de promedio en más de ${total} reseñas de Google. Pacientes reales, recuperaciones reales, en 11 clínicas de Florida.`} img="img/w-pt-guiding-1.jpg">
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, alignItems: 'center', marginTop: 16, fontWeight: 600, color: 'var(--ink)' }}><Stars /> {avg} · {total}+ {t('reviews_word')}</div>
      </PageHead>
      <section className="sec"><div className="wrap"><SectionHead h={en ? 'Latest Google reviews' : 'Últimas reseñas de Google'} /><TiWidget src="https://cdn.trustindex.io/loader.js?582277b6570c2478d72635ed4d0" label={en ? 'Google reviews widget (Trustindex) loads here' : 'Widget de reseñas de Google (Trustindex)'} /></div></section>
      <section className="sec mist-bg"><div className="wrap">
        <SectionHead center={false} h={en ? 'Ratings by clinic' : 'Calificaciones por clínica'} sub={en ? 'Google ratings as of September 2026. Tap a clinic to read its reviews or leave your own.' : 'Calificaciones de Google a septiembre de 2026.'} />
        <div className="grid g3">{LOCATIONS.map(l => <div key={l.slug} className="card" style={{ display: 'grid', gap: 8 }}><b style={{ color: 'var(--ink)' }}>UrgiMed {L(l.label, lang)}</b><Rating gbp={l.gbp} /><div className="cta-row" style={{ gap: 8 }}><A to={'/locations/' + l.slug} className="btn btn-outline btn-sm">{en ? 'Clinic page' : 'Ver clínica'}</A><a href={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('UrgiMed ' + l.street + ' ' + l.cityState)} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">{en ? 'Leave a review' : 'Dejar reseña'}</a></div></div>)}</div>
      </div></section>
      <ClinicCTA />
    </main>
  );
};

const PatientResources = () => {
  const { t, lang } = useLang();
  const en = lang === 'en';
  const [sent, setSent] = React.useState(false);
  const cards = en ? [['/first-visit', 'Your first visit', 'What to bring, how long it takes, what happens.'], ['/pip-insurance', 'PIP & insurance', 'How PIP, health insurance, workers’ comp and LOPs work.'], ['/faq', 'FAQ', 'The questions accident patients ask most.'], ['/locations', 'Hours & locations', 'Mon–Fri 9–6 at 11 clinics. Same-day appointments.'], ['https://patient.urgimedical.com/', 'Patient portal', 'Results, appointments and messages.'], ['/blog', 'Recovery blog', 'Physician-reviewed articles.']] : [['/first-visit', 'Su primera visita', 'Qué traer, cuánto dura, qué sucede.'], ['/pip-insurance', 'PIP y seguros', 'Cómo funcionan PIP, seguro de salud, compensación laboral y LOP.'], ['/faq', 'Preguntas frecuentes', 'Las preguntas más comunes.'], ['/locations', 'Horarios y clínicas', 'Lun–Vie 9–6 en 11 clínicas. Citas el mismo día.'], ['https://patient.urgimedical.com/', 'Portal del paciente', 'Resultados, citas y mensajes.'], ['/blog', 'Blog de recuperación', 'Artículos revisados por médicos.']];
  return (
    <main>
      <PageHead eyebrow={t('nav_resources')} h1={en ? 'Patient Resources' : 'Recursos para Pacientes'} sub={en ? 'Everything you need before, during and after treatment at UrgiMed.' : 'Todo lo que necesita antes, durante y después de su tratamiento en UrgiMed.'} img="img/w-receptionist.jpg" />
      <section className="sec"><div className="wrap grid g3">{cards.map(([to, h, p]) => to.startsWith('http') ? <a key={to} href={to} target="_blank" rel="noreferrer" className="card card-hover res-card"><h3>{h}</h3><p>{p}</p><span>↗</span></a> : <A key={to} to={to} className="card card-hover res-card"><h3>{h}</h3><p>{p}</p><I.arrow s={18} /></A>)}</div></section>
      <section className="sec mist-bg"><div className="wrap two">
        <div style={{ display: 'grid', gap: 32 }}>
          <div><h2 style={{ marginBottom: 10 }}>{en ? 'Transportation assistance' : 'Ayuda con transporte'}</h2><p>{en ? 'No ride after your accident? Ask when you call. We help patients arrange transportation to and from appointments at every clinic.' : '¿Sin transporte tras su accidente? Pregunte al llamar. Ayudamos a coordinar transporte a las citas en todas las clínicas.'}</p></div>
          <div><h2 style={{ marginBottom: 10 }}>{en ? 'No surprise billing' : 'Sin facturas sorpresa'}</h2><p>{en ? 'Under the federal No Surprises Act you are protected from unexpected out-of-network bills for emergency care. UrgiMed explains your coverage before treatment begins and provides a Good Faith Estimate on request for self-pay patients.' : 'Bajo la ley federal No Surprises Act usted está protegido de facturas inesperadas fuera de la red. UrgiMed explica su cobertura antes del tratamiento y entrega un Estimado de Buena Fe a pacientes de pago directo.'}</p></div>
          <div><h2 style={{ marginBottom: 10 }}>{en ? 'Se habla español' : 'Se habla español'}</h2><p>{en ? 'Bilingual staff at every clinic, and Haitian Creole at Pine Hills. Forms and instructions are available in Spanish.' : 'Personal bilingüe en cada clínica y criollo haitiano en Pine Hills. Formularios e instrucciones disponibles en español.'}</p></div>
        </div>
        <aside><div className="card" style={{ display: 'grid', gap: 14 }}>
          <div><div className="eyebrow">{en ? 'Records request' : 'Solicitud de expedientes'}</div><p style={{ marginTop: 4, fontSize: '.92rem' }}>{en ? 'Patients and attorneys: request medical records or billing. Delivered within 5 business days.' : 'Pacientes y abogados: solicite expedientes médicos o facturación. Entrega en 5 días hábiles.'}</p></div>
          {sent ? <div className="t05-bg" style={{ borderRadius: 4, padding: 20, fontWeight: 600, color: 'var(--t7)' }}>{en ? 'Request received. We will confirm by email.' : 'Solicitud recibida. Confirmaremos por correo.'}</div> : <>
            <div className="field"><label>{en ? 'Patient name' : 'Nombre del paciente'}</label><input /></div>
            <div className="field"><label>{en ? 'Date of birth' : 'Fecha de nacimiento'}</label><input type="date" /></div>
            <div className="field"><label>{t('appt_clinic')}</label><select defaultValue=""><option value="">—</option>{LOCATIONS.map(l => <option key={l.slug}>{L(l.label, lang)}</option>)}</select></div>
            <div className="field"><label>{en ? 'Email for delivery' : 'Correo para entrega'}</label><input type="email" /></div>
            <button className="btn btn-primary" onClick={() => setSent(true)}>{t('send')}</button>
          </>}
        </div></aside>
      </div></section>
      <ClinicCTA />
    </main>
  );
};

const ForProviders = () => {
  const { t, lang } = useLang();
  const en = lang === 'en';
  const [sent, setSent] = React.useState(false);
  const pts = en ? [['Follow-up within 24 hours', 'ER and urgent-care discharges seen the next business day at any of 11 clinics.'], ['EMC determination', 'MD/DO evaluation and PIP documentation at the first visit.'], ['Imaging on site', 'X-ray and ultrasound; MRI coordinated with partner centers.'], ['Reports back to you', 'Initial evaluation and progress notes returned to the referring provider.'], ['Multi-specialty', 'Chiropractic, PT, pain management, orthopedics, neurology, psychology.'], ['Bilingual', 'Spanish at every clinic; Creole at Pine Hills.']] : [['Seguimiento en 24 horas', 'Altas de emergencias y urgencias atendidas al siguiente día hábil en 11 clínicas.'], ['Determinación EMC', 'Evaluación MD/DO y documentación PIP en la primera visita.'], ['Imágenes en el sitio', 'Rayos X y ultrasonido; MRI coordinada con centros asociados.'], ['Informes para usted', 'Evaluación inicial y notas de progreso al proveedor referente.'], ['Multiespecialidad', 'Quiropráctica, TF, dolor, ortopedia, neurología, psicología.'], ['Bilingüe', 'Español en cada clínica; criollo en Pine Hills.']];
  return (
    <main>
      <PageHead eyebrow={t('nav_refer')} h1={en ? 'Refer a Patient: Hospitals, ERs & Medical Providers' : 'Refiera un Paciente: Hospitales, Emergencias y Proveedores'} sub={en ? 'A physician-led injury network for your accident patients after discharge. Same-week follow-up, complete documentation, reports back to you.' : 'Una red de lesiones dirigida por médicos para sus pacientes accidentados tras el alta. Seguimiento la misma semana, documentación completa, informes para usted.'} img="img/w-xray-display.jpg">
        <div className="cta-row" style={{ marginTop: 26, justifyContent: 'center' }}><a href="https://urgimedical.com/referral" target="_blank" rel="noreferrer" className="btn btn-primary">{t('referral')} ↗</a><a href={'tel:' + MAIN_PHONE.tel} className="btn btn-outline"><I.phone s={16} /> {MAIN_PHONE.display}</a></div>
      </PageHead>
      <section className="sec"><div className="wrap">
        <div className="grid g3" style={{ rowGap: 40, marginBottom: 56 }}>{pts.map(([h, p], i) => <div key={i} className="svc"><span className="icon-box"><I.check s={24} c="currentColor" /></span><div><h3>{h}</h3><p>{p}</p></div></div>)}</div>
        <div className="two">
          <div style={{ display: 'grid', gap: 20 }}>
            <SectionHead center={false} h={en ? 'Who refers to UrgiMed' : 'Quién refiere a UrgiMed'} />
            <ul className="check-list" style={{ marginTop: -30 }}>{(en ? ['Emergency departments and urgent cares', 'Primary care physicians', 'Personal injury attorneys', 'Employers and workers’ comp adjusters', 'Athletic trainers and coaches', 'Chiropractors needing MD co-management'] : ['Salas de emergencia y urgencias', 'Médicos de atención primaria', 'Abogados de lesiones personales', 'Empleadores y ajustadores', 'Entrenadores deportivos', 'Quiroprácticos que necesitan co-manejo médico']).map((s, i) => <li key={i}><I.check s={16} /> {s}</li>)}</ul>
            <A to="/for-attorneys" className="btn btn-outline" style={{ justifySelf: 'start' }}>{t('nav_attorneys')}</A>
          </div>
          <aside className="sticky-side"><div className="card" style={{ display: 'grid', gap: 14 }}>
            <div><div className="eyebrow">{en ? 'Quick referral' : 'Referencia rápida'}</div><p style={{ marginTop: 4 }}>{en ? 'We call the patient within one business hour.' : 'Llamamos al paciente en una hora hábil.'}</p></div>
            {sent ? <div className="t05-bg" style={{ borderRadius: 4, padding: 20, fontWeight: 600, color: 'var(--t7)' }}>{en ? 'Referral received. Thank you.' : 'Referencia recibida. Gracias.'}</div> : <>
              <div className="field"><label>{en ? 'Your name & practice' : 'Su nombre y consultorio'}</label><input /></div>
              <div className="field"><label>{en ? 'Patient name' : 'Nombre del paciente'}</label><input /></div>
              <div className="field"><label>{en ? 'Patient phone' : 'Teléfono del paciente'}</label><input type="tel" /></div>
              <div className="field"><label>{en ? 'Injury / notes' : 'Lesión / notas'}</label><textarea></textarea></div>
              <button className="btn btn-primary" onClick={() => setSent(true)}>{t('send')}</button>
            </>}
          </div></aside>
        </div>
      </div></section>
      <ClinicCTA />
    </main>
  );
};

const Sitemap = () => {
  const { t, lang } = useLang();
  const groups = [
    [t('footer_company'), [['/', t('home')], ['/about', t('nav_about')], ['/doctors', t('nav_doctors')], ['/first-visit', t('nav_firstvisit')], ['/pip-insurance', t('nav_pip')], ['/faq', t('nav_faq')], ['/reviews', t('nav_reviews')], ['/patient-resources', t('nav_patient_resources')], ['/blog', t('nav_blog')], ['/for-attorneys', t('nav_attorneys')], ['/for-providers', t('nav_providers')], ['/appointment', t('book_appt')]]],
    [t('nav_injuries'), [['/injuries', t('all_injuries')], ...INJURIES.map(i => ['/injuries/' + i.slug, L(i.name, lang)])]],
    [t('nav_services'), [['/services', t('all_services')], ...SERVICES.map(s => ['/services/' + s.id, L(s, lang)])]],
    [t('nav_locations'), [['/locations', t('all_locations')], ...LOCATIONS.map(l => ['/locations/' + l.slug, 'UrgiMed ' + L(l.label, lang)])]],
    [t('nav_doctors'), DOCTORS.map(d => ['/doctors/' + d.id, d.name])],
    [t('nav_blog'), BLOG_POSTS.map(b => ['/blog/' + b.slug, L(b.title, lang)])],
  ];
  return (
    <main>
      <PageHead eyebrow="UrgiMed" h1={lang === 'en' ? 'Sitemap' : 'Mapa del sitio'} />
      <section className="sec"><div className="wrap grid g3" style={{ alignItems: 'start' }}>{groups.map(([h, links]) => <div key={h}><h3 style={{ marginBottom: 12, paddingBottom: 8, borderBottom: '2px solid var(--t05)' }}>{h}</h3><div style={{ display: 'grid', gap: 6, fontSize: '.92rem' }}>{links.map(([to, l]) => <A key={to} to={to}>{l}</A>)}</div></div>)}</div></section>
    </main>
  );
};

// Home helpers
const GetStarted = () => {
  const { t, lang } = useLang();
  const s = lang === 'en' ? [['Call or book online', 'Same-day appointments at all 11 clinics. No referral needed.'], ['Come in for your evaluation', 'Physician exam, X-ray or ultrasound and your EMC determination — in one visit.'], ['Leave with a plan', 'Chiropractic, therapy, pain management and specialists coordinated for you. We handle the paperwork.']] : [['Llame o reserve en línea', 'Citas el mismo día en las 11 clínicas. Sin referencia.'], ['Venga a su evaluación', 'Examen médico, rayos X o ultrasonido y su determinación EMC en una sola visita.'], ['Salga con un plan', 'Quiropráctica, terapia, manejo del dolor y especialistas coordinados. Nosotros hacemos el papeleo.']];
  return (
    <section className="sec"><div className="wrap">
      <SectionHead h={lang === 'en' ? 'How do I get started?' : '¿Cómo empiezo?'} sub={lang === 'en' ? 'Getting care after an accident is simpler than you think.' : 'Recibir atención tras un accidente es más simple de lo que cree.'} />
      <div className="grid g3">{s.map(([h, p], i) => <div key={i} className="card gs"><div className="n">{i + 1}</div><h3>{h}</h3><p>{p}</p></div>)}</div>
      <div className="cta-row" style={{ justifyContent: 'center', marginTop: 32 }}><CallBtn className="btn btn-primary" /><BookBtn /></div>
    </div></section>
  );
};
const HomeFAQ = () => {
  const { t, lang } = useLang();
  const items = [FAQ[0], FAQ[1], FAQ[2], FAQ[4], FAQ[6], { q: { en: 'What makes UrgiMed different from other injury clinics?', es: '¿Qué hace diferente a UrgiMed?' }, a: { en: 'We are physician-led. MDs, DOs and board-certified orthopedic surgeons work alongside our chiropractors and therapists, so your Emergency Medical Condition is certified on day one, imaging is read in-house, and every specialty is under one roof. We also accept health insurance, workers’ comp and Letters of Protection — not only PIP.', es: 'Estamos dirigidos por médicos. MDs, DOs y cirujanos ortopédicos certificados trabajan junto a nuestros quiroprácticos y terapeutas, así su EMC se certifica el primer día y todas las especialidades están bajo un techo. Además aceptamos seguro de salud, compensación laboral y Cartas de Protección, no solo PIP.' } }];
  return (
    <section className="sec"><div className="wrap two">
      <div><SectionHead center={false} h={t('faq_h')} /><FAQList items={items} /><A to="/faq" className="btn btn-outline" style={{ marginTop: 22 }}>{t('nav_faq')}</A></div>
      <aside style={{ display: 'grid', gap: 16 }}><Countdown /><div className="card mist-bg" style={{ border: 0 }}><h3 style={{ marginBottom: 6 }}>{t('nav_pip')}</h3><p style={{ fontSize: '.92rem' }}>{lang === 'en' ? 'How PIP, health insurance, workers’ comp and Letters of Protection pay for your care.' : 'Cómo PIP, seguro de salud, compensación laboral y Cartas de Protección pagan su atención.'}</p><A to="/pip-insurance" style={{ fontWeight: 600, fontSize: '.9rem' }}>{t('learn_more')} →</A></div></aside>
    </div></section>
  );
};
Object.assign(window, { Countdown, PipInsurance, Reviews, PatientResources, ForProviders, Sitemap, GetStarted, HomeFAQ });
