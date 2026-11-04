// Service-area pages: cities UrgiMed serves without a published clinic address (local-SEO landing pages).
const AreaCallout = ({ area }) => {
  const { lang } = useLang();
  const en = lang === 'en';
  return (
    <div className="card" style={{ background: 'var(--t6)', color: '#fff', border: 0, display: 'grid', gap: 10, padding: '24px 26px' }}>
      <div className="eyebrow" style={{ color: 'var(--sage)' }}>{en ? 'Service area' : 'Área de servicio'}</div>
      <h3 style={{ color: '#fff', fontSize: '1.25rem' }}>{en ? `UrgiMed covers ${area.city} and ${area.county}` : `UrgiMed cubre ${area.city} y ${area.county}`}</h3>
      <p style={{ color: 'rgba(255,255,255,.9)', lineHeight: 1.7 }}>{en ? `Call us to learn how we care for accident and injury patients in ${area.city}: evaluation options, transportation help and coordination with your attorney or insurer.` : `Llámenos para saber cómo atendemos a pacientes de accidentes y lesiones en ${area.city}: opciones de evaluación, ayuda con transporte y coordinación con su abogado o aseguradora.`}</p>
      <div className="cta-row"><CallBtn className="btn btn-white" /><A to="/appointment" className="btn btn-outline-inv">{en ? 'Request a callback' : 'Solicitar una llamada'}</A></div>
    </div>
  );
};

const AreasStrip = ({ compact }) => {
  const { lang } = useLang();
  const en = lang === 'en';
  return (
    <div className="areas-strip">
      <div>
        <div className="eyebrow" style={{ marginBottom: 6 }}>{en ? 'Also serving' : 'También atendemos'}</div>
        <h3 style={{ fontSize: '1.2rem', marginBottom: 6 }}>{en ? 'UrgiMed covers other areas of Florida' : 'UrgiMed cubre otras zonas de Florida'}</h3>
        <p style={{ color: 'var(--ink2)', fontSize: '.95rem' }}>{en ? 'Injured in one of these areas? Call us to learn more about your care options.' : '¿Lesionado en una de estas zonas? Llámenos para conocer sus opciones de atención.'} <a href={'tel:' + MAIN_PHONE.tel} style={{ fontWeight: 700 }}>{MAIN_PHONE.display}</a></p>
      </div>
      <div className="areas-links">{SERVICE_AREAS.map(a => <A key={a.slug} to={'/areas/' + a.slug} className="area-pill"><I.pin s={14} /> {a.city}</A>)}</div>
    </div>
  );
};

const AreaPage = ({ slug }) => {
  const { t, lang } = useLang();
  const en = lang === 'en';
  const area = SERVICE_AREAS.find(a => a.slug === slug);
  if (!area) return <main><section className="sec"><div className="wrap">{en ? 'Area not found.' : 'Área no encontrada.'}</div></section></main>;
  const nearest = area.nearest.map(locBySlug).filter(Boolean);
  const inj = INJURIES[0];
  const faq = [
    { q: { en: `Does UrgiMed have a clinic in ${area.city}?`, es: `¿UrgiMed tiene clínica en ${area.city}?` }, a: { en: `UrgiMed serves patients from ${area.city} and ${area.county}. Call ${MAIN_PHONE.display} and our team will explain the care options available to you and help you get seen within Florida’s 14-day PIP window.`, es: `UrgiMed atiende a pacientes de ${area.city} y ${area.county}. Llame al ${MAIN_PHONE.display} y nuestro equipo le explicará las opciones de atención disponibles y le ayudará a ser atendido dentro del plazo de 14 días del PIP.` } },
    FAQ[9], FAQ[0], FAQ[1], FAQ[2], FAQ[3], FAQ[12],
  ];
  return (
    <main>
      <section className="loc-hero"><div className="wrap loc-hero-in">
        <div style={{ display: 'grid', gap: 18 }}>
          <Crumbs items={[['/areas', en ? 'Areas we serve' : 'Zonas que atendemos'], [null, area.city]]} />
          <div className="pill-row"><span className="chip inv"><I.clock s={14} /> {t('hero_pill_1')}</span><span className="chip inv">{t('spanish')}</span><span className="chip inv">{en ? 'No referral needed' : 'Sin referido'}</span></div>
          <h1>{en ? `Auto Accident Doctors Serving ${area.city}, FL` : `Médicos de Accidentes de Auto para ${area.city}, FL`}</h1>
          <p className="lead" style={{ maxWidth: 560 }}>{L(area.lead, lang)}</p>
          <div className="cta-row"><CallBtn className="btn btn-white btn-lg" /><BookBtn className="btn btn-outline-inv btn-lg" /></div>
        </div>
        <AreaCallout area={area} />
      </div></section>

      <section className="sec"><div className="wrap two">
        <div style={{ display: 'grid', gap: 44 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>{en ? 'Car accident & injury care' : 'Atención de accidentes y lesiones'}</div>
            <h2 style={{ marginBottom: 14 }}>{en ? `Hurt in a crash in ${area.city}? Here is what to do.` : `¿Lesionado en un choque en ${area.city}? Esto es lo que debe hacer.`}</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'var(--ink2)' }}>{L(area.body, lang)}</p>
            <dl className="kv" style={{ marginTop: 20 }}><dt>{t('serving')}</dt><dd>{area.areas.join(' · ')}</dd><dt>{en ? 'Nearby roads' : 'Vías cercanas'}</dt><dd>{area.roads}</dd></dl>
          </div>
          <div>
            <h2 style={{ marginBottom: 14, fontSize: '1.45rem' }}>{t('auto_list_h')} {area.city}</h2>
            <ul className="check-list">{L(inj.conditions, lang).map((c, i) => <li key={i}><I.check s={16} /> {c}</li>)}</ul>
            <p style={{ marginTop: 14, color: 'var(--ink2)', lineHeight: 1.7 }}>{t('auto_p2')}</p>
          </div>
          <div>
            <h3 style={{ marginBottom: 14, fontSize: '1.4rem' }}>{t('treat_here')}</h3>
            <div className="grid g2">{INJURIES.map(i => <A key={i.slug} to={'/injuries/' + i.slug} className="card card-hover" style={{ display: 'flex', gap: 12, alignItems: 'center', color: 'var(--ink)', padding: '14px 18px', fontWeight: 800 }}><span className="icon-box sm"><I.plus s={20} /></span>{L(i.name, lang)}</A>)}</div>
          </div>
          <RuleBox />
          <div>
            <h3 style={{ marginBottom: 14, fontSize: '1.4rem' }}>{en ? `How UrgiMed helps patients in ${area.city}` : `Cómo UrgiMed ayuda a pacientes en ${area.city}`}</h3>
            <div className="grid g3">{(en ? [['Call first', 'Tell us where and when the accident happened. We explain your options the same day.'], ['We coordinate your care', 'Evaluation, imaging, EMC documentation and a treatment plan across chiropractic, physical therapy, pain management and orthopedics.'], ['We handle the paperwork', 'PIP billed directly, workers’ comp and Letters of Protection accepted, records to your attorney in days.']] : [['Llame primero', 'Díganos dónde y cuándo ocurrió el accidente. Le explicamos sus opciones el mismo día.'], ['Coordinamos su atención', 'Evaluación, imágenes, documentación EMC y un plan de tratamiento con quiropráctica, terapia física, manejo del dolor y ortopedia.'], ['Nos encargamos del papeleo', 'Facturamos al PIP directamente, aceptamos compensación laboral y Cartas de Protección, y enviamos expedientes a su abogado en días.']]).map(([h, p], i) => <div key={i} className="stepc"><span className="num">0{i + 1}</span><h3>{h}</h3><p>{p}</p></div>)}</div>
          </div>
          <div>
            <h3 style={{ marginBottom: 6 }}>{t('faq_h')}</h3>
            <FAQList items={faq} />
          </div>
        </div>
        <aside className="sticky-side" style={{ display: 'grid', gap: 16 }}>
          <div className="card" style={{ display: 'grid', gap: 14, borderColor: 'var(--t4)' }}>
            <div className="eyebrow">{en ? `Patients in ${area.city}: call to learn more` : `Pacientes en ${area.city}: llame para saber más`}</div>
            <a href={'tel:' + MAIN_PHONE.tel} style={{ fontSize: '1.9rem', fontWeight: 900, color: 'var(--t6)', letterSpacing: '-.02em' }}>{MAIN_PHONE.display}</a>
            <div style={{ color: 'var(--mute)', fontWeight: 700, display: 'flex', gap: 8, alignItems: 'center' }}><I.clock s={16} /> {L(HOURS, lang)}</div>
            <CallBtn className="btn btn-primary" />
            <BookBtn className="btn btn-outline" />
          </div>
          <div className="card mist-bg" style={{ border: 0 }}>
            <h3 style={{ fontSize: '1.05rem', marginBottom: 8 }}>{t('insurance_h')}</h3>
            <p style={{ color: 'var(--mute)', fontSize: '.95rem' }}>{t('insurance_body')}</p>
          </div>
          <div className="card">
            <h3 style={{ fontSize: '1.05rem', marginBottom: 10 }}>{en ? 'Nearest UrgiMed clinics' : 'Clínicas UrgiMed más cercanas'}</h3>
            <div style={{ display: 'grid', gap: 10 }}>{nearest.map(l => <A key={l.slug} to={'/locations/' + l.slug} style={{ display: 'grid', color: 'var(--ink)' }}><b>UrgiMed {L(l.label, lang)}</b><span style={{ color: 'var(--mute)', fontSize: '.85rem' }}>{l.cityState} · {l.phone}</span></A>)}</div>
          </div>
        </aside>
      </div></section>

      <section className="sec-tight mist-bg"><div className="wrap">
        <h3 style={{ marginBottom: 16 }}>{en ? 'Other areas we serve' : 'Otras zonas que atendemos'}</h3>
        <div className="areas-links">{SERVICE_AREAS.filter(a => a.slug !== slug).map(a => <A key={a.slug} to={'/areas/' + a.slug} className="area-pill"><I.pin s={14} /> {a.city}</A>)}{LOCATIONS.map(l => <A key={l.slug} to={'/locations/' + l.slug} className="area-pill solid"><I.pin s={14} /> {L(l.label, lang)}</A>)}</div>
      </div></section>
      <AttorneyBand />
    </main>
  );
};

const AreasIndex = () => {
  const { t, lang } = useLang();
  const en = lang === 'en';
  return (
    <main>
      <PageHead eyebrow={t('nav_locations')} h1={en ? 'Areas We Serve Across Florida' : 'Zonas que Atendemos en Florida'} sub={en ? 'Beyond our clinics in Kissimmee, Davenport and Winter Haven, UrgiMed cares for accident and injury patients in these areas. Call to learn more about your options.' : 'Además de nuestras clínicas en Kissimmee, Davenport y Winter Haven, UrgiMed atiende a pacientes de accidentes y lesiones en estas zonas. Llame para conocer sus opciones.'} />
      <section className="sec"><div className="wrap">
        <div className="grid g3">{SERVICE_AREAS.map(a => (
          <A key={a.slug} to={'/areas/' + a.slug} className="card card-hover" style={{ display: 'grid', gap: 8, color: 'var(--ink)' }}>
            <div className="eyebrow">{a.county}</div>
            <h3 style={{ fontSize: '1.2rem' }}>{en ? `Auto accident doctors serving ${a.city}` : `Médicos de accidentes de auto para ${a.city}`}</h3>
            <p style={{ color: 'var(--ink2)', fontSize: '.93rem' }}>{a.areas.slice(0, 4).join(' · ')}</p>
            <span style={{ color: 'var(--t6)', fontWeight: 700, fontSize: '.85rem', display: 'inline-flex', gap: 6, alignItems: 'center' }}>{en ? 'Call to learn more' : 'Llame para saber más'} <I.arrow s={14} /></span>
          </A>
        ))}</div>
        <div style={{ marginTop: 40 }}><AreasStrip /></div>
      </div></section>
      <ClinicCTA />
    </main>
  );
};
Object.assign(window, { AreaPage, AreasIndex, AreasStrip });
