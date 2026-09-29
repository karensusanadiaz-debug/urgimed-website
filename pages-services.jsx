// Services index + service page
const ServicesIndex = () => {
  const { t, lang } = useLang();
  return (
    <main>
      <PageHead eyebrow={t('nav_services')} h1={t('services_page_h')} sub={t('services_sub')} img="img/w-cold-laser-2.jpg" />
      <section className="sec"><div className="wrap grid g3">{SERVICES.map(s => { const d = SERVICE_DETAILS[s.id]; return (
        <A key={s.id} to={'/services/' + s.id} className="spec" style={{ color: 'inherit' }}>
          <div className="ph"><img src={d.img} alt="" loading="lazy" /></div>
          <h3>{L(s, lang)}{s.id === 'primary-care' && <span className="chip sage" style={{ marginLeft: 8, verticalAlign: 'middle' }}>Davenport</span>}</h3>
          <span className="btn btn-outline btn-sm">{lang === 'en' ? 'Learn more' : 'Más información'}</span>
        </A>
      ); })}</div></section>
      <section className="sec-tight mist-bg"><div className="wrap"><RuleBox /></div></section>
      <ClinicCTA />
    </main>
  );
};

const ServicePage = ({ id }) => {
  const { t, lang } = useLang();
  const s = SERVICES.find(x => x.id === id), d = SERVICE_DETAILS[id];
  if (!s || !d) return <main className="sec"><div className="wrap"><h1>Not found</h1></div></main>;
  const others = SERVICES.filter(x => x.id !== id).slice(0, 6);
  const isPC = id === 'primary-care';
  const dav = locBySlug('davenport');
  return (
    <main>
      <PageHead eyebrow={t('nav_services')} h1={L(d.h1, lang)} sub={L(d.lead, lang)} img={d.img} crumb={<><A to="/services">{t('nav_services')}</A><span>›</span><span>{L(s, lang)}</span></>}>
        <div className="cta-row" style={{ marginTop: 26, justifyContent: 'center' }}><CallBtn loc={isPC ? dav : null} className="btn btn-primary" /><BookBtn slug={isPC ? 'davenport' : undefined} className="btn btn-outline" /></div>
      </PageHead>
      <section className="sec"><div className="wrap two">
        <div style={{ display: 'grid', gap: 36 }}>
          <div style={{ borderRadius: 4, overflow: 'hidden', aspectRatio: '16/9' }}><img src={d.img2 || d.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>{L(d.body, lang)}</p>
          <div><h2 style={{ fontSize: '1.5rem', marginBottom: 16 }}>{t('we_treat')}</h2><ul className="check-list">{L(d.treats, lang).map((c, i) => <li key={i}><I.check s={16} /> {c}</li>)}</ul></div>
          <div><h2 style={{ fontSize: '1.5rem', marginBottom: 16 }}>{lang === 'en' ? 'Where' : 'Dónde'}</h2>
            {isPC ? <ClinicCard loc={dav} /> : <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))' }}>{LOCATIONS.map(l => <A key={l.slug} to={'/locations/' + l.slug} className="card card-hover" style={{ padding: '10px 14px', color: 'var(--ink)', fontWeight: 600, fontSize: '.92rem' }}>{L(l.label, lang)}</A>)}</div>}
          </div>
        </div>
        <aside className="sticky-side" style={{ display: 'grid', gap: 16 }}>
          <div className="card" style={{ display: 'grid', gap: 12 }}>
            <div className="eyebrow">{t('call_now')}</div>
            <a href={'tel:' + (isPC ? dav.tel : MAIN_PHONE.tel)} style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--ink)' }}>{isPC ? dav.phone : MAIN_PHONE.display}</a>
            <CallBtn loc={isPC ? dav : null} className="btn btn-primary" /><BookBtn slug={isPC ? 'davenport' : undefined} className="btn btn-outline" />
          </div>
          <div className="card mist-bg" style={{ border: 0 }}><h3 style={{ marginBottom: 10 }}>{t('nav_services')}</h3><div style={{ display: 'grid', gap: 8 }}>{others.map(o => <A key={o.id} to={'/services/' + o.id} style={{ fontWeight: 500 }}>› {L(o, lang)}</A>)}<A to="/services" style={{ fontWeight: 600, marginTop: 4 }}>{t('all_services')} →</A></div></div>
        </aside>
      </div></section>
      <ClinicCTA />
    </main>
  );
};
Object.assign(window, { ServicesIndex, ServicePage });
