// Injury pages (data-driven) — pillar layout
const InjuryPage = ({ slug }) => {
  const { t, lang } = useLang();
  const inj = INJURIES.find(i => i.slug === slug);
  if (!inj) return <main className="sec"><div className="wrap"><h1>Not found</h1></div></main>;
  const x = INJURY_EXTRA[slug] || {};
  const steps = t('steps');
  const faqIdx = slug === 'car-accident' ? [1, 2, 3, 4, 7] : slug === 'work-injury' ? [9, 0, 4, 5, 6] : [0, 3, 4, 5, 6];
  const related = BLOG_POSTS.filter(p => (slug === 'car-accident' && ['car-accident', 'pip', 'whiplash', 'concussion'].includes(p.cat)) || (slug === 'slip-and-fall' && p.cat === 'slip-fall') || (slug === 'work-injury' && p.cat === 'work') || (slug === 'sports-injury' && ['pain', 'chiro'].includes(p.cat))).slice(0, 3);
  return (
    <main>
      <section className="hero"><div className="wrap hero-in">
        <div style={{ display: 'grid', gap: 18 }}>
          <div className="pill-row">{INJURIES.map(i => <A key={i.slug} to={'/injuries/' + i.slug} className="chip inv" style={{ background: i.slug === slug ? 'var(--t6)' : undefined, color: i.slug === slug ? '#fff' : undefined }}>{L(i.name, lang)}</A>)}</div>
          <h1>{L(inj.h1, lang)}</h1>
          <p className="lead" style={{ maxWidth: 580 }}>{L(inj.lead, lang)}</p>
          <div className="cta-row"><CallBtn className="btn btn-white btn-lg" /><BookBtn className="btn btn-outline-inv btn-lg" /></div>
          <A to="/locations" style={{ color: 'var(--t6)', fontWeight: 600, display: 'inline-flex', gap: 8, alignItems: 'center' }}><I.pin s={16} /> {t('find_clinic')} — 11 {t('clinics_word').toLowerCase()}</A>
        </div>
        <div className="hero-photo"><img src={inj.img} alt="" /></div>
      </div></section>

      {x.todo && <section className="sec mist-bg"><div className="wrap">
        <SectionHead center={false} h={lang === 'en' ? `What to do after a ${L(inj.name, 'en').toLowerCase()} in Florida` : `Qué hacer después de un ${L(inj.name, 'es').toLowerCase()} en Florida`} />
        <div className="grid g3" style={{ gap: 20 }}>{L(x.todo, lang).map(([h, p], i) => { const Ic = I[(x.todo.icons || [])[i]] || I.check; const key = /doctor|médico/i.test(h); return <div key={i} className={'stepc' + (key ? ' key' : '')}><span className="num">{lang === 'en' ? 'STEP' : 'PASO'} {i + 1}</span><div className="ic"><Ic s={28} /></div><h3>{h}</h3><p>{p}</p></div>; })}</div>
      </div></section>}

      <section className="sec"><div className="wrap two">
        <div style={{ display: 'grid', gap: 40 }}>
          <p style={{ fontSize: '1.12rem', lineHeight: 1.8, color: 'var(--ink2)' }}>{L(inj.body, lang)}</p>
          <div className="grid g2" style={{ gap: 28 }}>
            <div><h2 style={{ fontSize: '1.45rem', marginBottom: 14 }}>{t('conditions_h')}</h2><ul className="check-list" style={{ gridTemplateColumns: '1fr' }}>{L(inj.conditions, lang).map((c, i) => <li key={i}><I.check s={16} /> {c}</li>)}</ul></div>
            {x.symptoms && <div><h2 style={{ fontSize: '1.45rem', marginBottom: 14 }}>{lang === 'en' ? 'Symptoms to watch for' : 'Síntomas a vigilar'}</h2><ul className="check-list" style={{ gridTemplateColumns: '1fr' }}>{L(x.symptoms, lang).map((c, i) => <li key={i}><span className="dot-warn"></span> {c}</li>)}</ul></div>}
          </div>
          {x.services && <div>
            <h2 style={{ fontSize: '1.45rem', marginBottom: 16 }}>{lang === 'en' ? 'How we treat it' : 'Cómo lo tratamos'}</h2>
            <div className="grid g2" style={{ gap: 12 }}>{x.services.map(id => { const d = SERVICE_DETAILS[id]; return <A key={id} to={'/services/' + id} className="card card-hover svc-mini"><img src={d.img} alt="" loading="lazy" /><div><b>{svc(id, lang)}</b><span>{L(d.lead, lang).split('.')[0]}.</span></div><I.arrow s={16} /></A>; })}</div>
          </div>}
          <div>
            <h2 style={{ fontSize: '1.45rem', marginBottom: 18 }}>{t('first_visit_h')}</h2>
            <div style={{ display: 'grid', gap: 22 }}>{steps.map(([h, p], i) => <div className="step" key={i}><div className="n">{i + 1}</div><div><h3 style={{ marginBottom: 4 }}>{h}</h3><p style={{ fontSize: '.95rem' }}>{p}</p></div></div>)}</div>
          </div>
          {slug === 'car-accident' && <RuleBox />}
          <div><h2 style={{ fontSize: '1.45rem', marginBottom: 6 }}>{t('faq_h')}</h2><FAQList items={faqIdx.map(i => FAQ[i])} /></div>
        </div>
        <aside className="sticky-side" style={{ display: 'grid', gap: 16 }}>
          <div className="card" style={{ display: 'grid', gap: 14, borderTop: '3px solid var(--t6)' }}>
            <div className="eyebrow">{t('call_now')}</div>
            <a href={'tel:' + MAIN_PHONE.tel} style={{ fontSize: '1.9rem', fontWeight: 700, color: 'var(--t6)' }}>{MAIN_PHONE.display}</a>
            <div style={{ fontWeight: 500, display: 'flex', gap: 8, alignItems: 'center', fontSize: '.9rem' }}><I.clock s={16} /> {L(HOURS, lang)}</div>
            <CallBtn className="btn btn-primary" /><BookBtn className="btn btn-outline" />
            <A to="/locations" className="btn btn-ghost"><I.pin /> {t('find_clinic')}</A>
          </div>
          <div className="card mist-bg" style={{ border: 0 }}>
            <h3 style={{ fontSize: '1.05rem', marginBottom: 8 }}>{t('insurance_h')}</h3>
            <p style={{ fontSize: '.92rem' }}>{t('insurance_body')}</p>
            <A to="/pip-insurance" style={{ fontWeight: 600, fontSize: '.9rem', display: 'inline-block', marginTop: 8 }}>{t('nav_pip')} →</A>
          </div>
          <div style={{ borderRadius: 4, overflow: 'hidden', aspectRatio: '4/5' }}><img src={slug === 'car-accident' ? 'img/neck-xray.jpg' : 'img/w-xray-lightbox.jpg'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" /></div>
        </aside>
      </div></section>

      {related.length > 0 && <section className="sec mist-bg"><div className="wrap"><SectionHead center={false} h={t('related_posts')} /><div className="grid g3">{related.map(r => <PostCard key={r.slug} p={r} />)}</div></div></section>}
      <ClinicCTA />
      <AttorneyBand />
    </main>
  );
};

const SymptomFinder = () => {
  const { t, lang } = useLang();
  const [sel, setSel] = React.useState([]);
  const toggle = (i) => setSel(s => s.includes(i) ? s.filter(x => x !== i) : [...s, i]);
  const score = (key, list) => { const m = {}; sel.forEach(i => SYMPTOMS[i][key].forEach((id, r) => { m[id] = (m[id] || 0) + (3 - Math.min(r, 2)); })); return Object.entries(m).sort((a, b) => b[1] - a[1]).map(e => e[0]); };
  const inj = score('inj'), svcs = score('svc').slice(0, 4);
  return (
    <div className="symp">
      <div>
        <div className="eyebrow" style={{ marginBottom: 8 }}>{lang === 'en' ? 'Symptom finder' : 'Buscador de síntomas'}</div>
        <h2 style={{ marginBottom: 6 }}>{lang === 'en' ? 'What are you feeling?' : '¿Qué siente?'}</h2>
        <p style={{ marginBottom: 18 }}>{lang === 'en' ? 'Select everything that applies. We will point you to the right injury page and specialists.' : 'Seleccione todo lo que aplique. Le indicaremos la página de lesión y los especialistas adecuados.'}</p>
        <div className="symp-chips">{SYMPTOMS.map((s, i) => <button key={i} className={sel.includes(i) ? 'on' : ''} onClick={() => toggle(i)}>{L(s, lang)}</button>)}</div>
      </div>
      <div className="card symp-res">
        {sel.length === 0 ? <div className="symp-empty"><I.plus s={28} /><p>{lang === 'en' ? 'Pick one or more symptoms to see recommendations.' : 'Elija uno o más síntomas para ver recomendaciones.'}</p></div> : <>
          <div className="eyebrow">{lang === 'en' ? 'Likely related to' : 'Probablemente relacionado con'}</div>
          <div style={{ display: 'grid', gap: 8, margin: '10px 0 18px' }}>{inj.map(slug => { const i = INJURIES.find(x => x.slug === slug); return <A key={slug} to={'/injuries/' + slug} className="symp-row"><img src={i.img} alt="" /><b>{L(i.name, lang)}</b><I.arrow s={16} /></A>; })}</div>
          <div className="eyebrow">{lang === 'en' ? 'Specialists you may see' : 'Especialistas que podría ver'}</div>
          <div className="pill-row" style={{ margin: '10px 0 18px' }}>{svcs.map(id => <A key={id} to={'/services/' + id} className="chip">{svc(id, lang)}</A>)}</div>
          <p style={{ fontSize: '.85rem', color: 'var(--mute2)', marginBottom: 14 }}>{lang === 'en' ? 'This tool is informational and not a diagnosis. Severe symptoms — chest pain, loss of consciousness, heavy bleeding — need emergency care.' : 'Esta herramienta es informativa y no un diagnóstico. Síntomas graves requieren atención de emergencia.'}</p>
          <CallBtn className="btn btn-primary" />
        </>}
      </div>
    </div>
  );
};

const InjuriesIndex = () => {
  const { t, lang } = useLang();
  return (
    <main>
      <PageHead eyebrow={t('nav_injuries')} h1={lang === 'en' ? 'Injuries We Treat: Car Accident, Slip & Fall, Work and Sports Injuries' : 'Lesiones que Tratamos: Accidentes de Auto, Caídas, Laborales y Deportivas'} sub={lang === 'en' ? 'Physician-led evaluation, on-site imaging and a coordinated treatment plan at 11 Florida clinics. Same-day appointments.' : 'Evaluación dirigida por médicos, imágenes en el sitio y un plan coordinado en 11 clínicas de Florida. Citas el mismo día.'} img="img/w-car-accident.jpg" />
      <section className="sec"><div className="wrap">
        <div className="grid g4">{INJURIES.map(inj => (
          <A key={inj.slug} to={'/injuries/' + inj.slug} className="spec" style={{ color: 'inherit' }}>
            <div className="ph"><img src={inj.img} alt="" loading="lazy" /></div>
            <h3>{L(inj.name, lang)}</h3>
            <p>{L(inj.lead, lang).split('.')[0]}.</p>
            <span className="btn btn-outline btn-sm">{t('learn_more')}</span>
          </A>
        ))}</div>
      </div></section>
      <section className="sec mist-bg"><div className="wrap"><SymptomFinder /></div></section>
      <section className="sec-tight"><div className="wrap"><RuleBox /></div></section>
      <ClinicCTA />
    </main>
  );
};
Object.assign(window, { InjuryPage, SymptomFinder, InjuriesIndex });
