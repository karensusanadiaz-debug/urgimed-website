// Locations index + single location page
const LocationsIndex = () => {
  const { t, lang } = useLang();
  const en = lang === 'en';
  const [q, setQ] = React.useState(''), [reg, setReg] = React.useState(''), [pc, setPc] = React.useState(false);
  const match = (l) => (!reg || l.region === reg) && (!pc || l.primaryCare) && (!q || (l.city + ' ' + L(l.label, lang) + ' ' + l.cityState + ' ' + l.areas.join(' ')).toLowerCase().includes(q.toLowerCase()));
  const shown = LOCATIONS.filter(match);
  return (
    <main>
      <PageHead eyebrow={t('nav_locations')} h1={t('all_locations_h')} sub={t('all_locations_sub')} img="img/w-facade.jpg">
        <div className="pill-row" style={{ marginTop: 18, justifyContent: 'center' }}><span className="chip inv"><I.clock s={14} /> {L(HOURS, lang)}</span><span className="chip inv">{t('same_day')}</span><span className="chip inv">{t('spanish')}</span></div>
      </PageHead>
      <section className="sec-tight"><div className="wrap">
        <div className="loc-filters">
          <div className="field" style={{ flex: 1, minWidth: 220 }}><input placeholder={en ? 'Search city, ZIP or neighborhood' : 'Buscar ciudad, código postal o vecindario'} value={q} onChange={e => setQ(e.target.value)} /></div>
          <div className="cat-bar"><button className={!reg ? 'on' : ''} onClick={() => setReg('')}>{en ? 'All regions' : 'Todas las regiones'}</button>{REGIONS.map(r => <button key={r.id} className={reg === r.id ? 'on' : ''} onClick={() => setReg(reg === r.id ? '' : r.id)}>{L(r, lang)}</button>)}<button className={pc ? 'on' : ''} onClick={() => setPc(!pc)}>{svc('primary-care', lang)}</button></div>
        </div>
        <p style={{ marginTop: 14, fontSize: '.9rem' }}>{shown.length} {en ? (shown.length === 1 ? 'clinic' : 'clinics') : (shown.length === 1 ? 'clínica' : 'clínicas')}</p>
      </div></section>
      {REGIONS.map(r => {
        const locs = shown.filter(l => l.region === r.id);
        if (!locs.length) return null;
        return (
          <section className="sec-tight" key={r.id} style={{ paddingTop: 0 }}><div className="wrap">
            <h2 style={{ fontSize: '1.4rem', marginBottom: 18, display: 'flex', gap: 10, alignItems: 'center' }}><I.pin s={20} /> {L(r, lang)} <span style={{ color: 'var(--mute2)', fontWeight: 700, fontSize: '1rem' }}>· {locs.length}</span></h2>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))' }}>{locs.map(l => <ClinicCard key={l.slug} loc={l} />)}</div>
          </div></section>
        );
      })}
      {shown.length === 0 && <section className="sec-tight"><div className="wrap"><div className="card" style={{ textAlign: 'center' }}>{en ? 'No clinic matches. Call us and we will find the closest one.' : 'Ninguna clínica coincide. Llámenos y encontraremos la más cercana.'} <a href={'tel:' + MAIN_PHONE.tel} style={{ fontWeight: 700 }}>{MAIN_PHONE.display}</a></div></div></section>}
      <section className="sec"><div className="wrap"><SectionHead h={t('clinics_h')} /><ClinicMap /></div></section>
      <section className="sec-tight"><div className="wrap"><RuleBox /></div></section>
      <AttorneyBand />
    </main>
  );
};

const LocationPage = ({ slug }) => {
  const { t, lang } = useLang();
  const loc = locBySlug(slug);
  if (!loc) return <main className="sec"><div className="wrap"><h1>Not found</h1></div></main>;
  const services = [...CORE_SERVICES, ...(loc.primaryCare ? ['primary-care'] : [])];
  const mapsUrl = 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(loc.street + ', ' + loc.cityState);
  const localFaq = [...FAQ.slice(0, 2), { q: { en: `Where do I park at UrgiMed ${loc.city}?`, es: `¿Dónde estaciono en UrgiMed ${loc.city}?` }, a: { en: `Free parking directly in front of the clinic at ${loc.street}. Access via ${loc.roads}.`, es: `Estacionamiento gratuito frente a la clínica en ${loc.street}. Acceso por ${loc.roads}.` } }, ...FAQ.slice(3, 8)];
  const nearby = loc.nearby.map(locBySlug).filter(Boolean);
  const themes = { en: ['Seen the same day, without long waits', 'Staff explains PIP and paperwork in plain language', 'Coordinated care between chiropractic, PT and the MD'], es: ['Atención el mismo día, sin largas esperas', 'El personal explica el PIP y el papeleo con claridad', 'Atención coordinada entre quiropráctica, TF y el médico'] };
  return (
    <main>
      <section className="loc-hero"><div className="wrap loc-hero-in">
        <div style={{ display: 'grid', gap: 18 }}>
          <div className="pill-row"><span className="chip inv"><I.clock s={14} /> {t('hero_pill_1')}</span><span className="chip inv">{t('spanish')}</span>{loc.primaryCare && <span className="chip inv">{t('primary_care_here')}</span>}{loc.hq && <span className="chip inv">{t('hq')}</span>}</div>
          <h1>UrgiMed {L(loc.label, lang)}: {lang === 'en' ? 'Car Accident, Slip & Fall and Work Injury Care' : 'Accidentes de Auto, Caídas y Lesiones Laborales'}</h1>
          <Rating gbp={loc.gbp} inv />
          <div className="cta-row"><CallBtn loc={loc} className="btn btn-white btn-lg" /><BookBtn slug={loc.slug} className="btn btn-outline-inv btn-lg" /></div>
          <div className="loc-facts">
            <div className="fact"><div className="k">{t('address')}</div><div className="v">{loc.street}<br />{loc.cityState}{loc.zipNote && <span title="Verify ZIP: 32811 vs 32808" style={{ color: 'var(--sage)', fontSize: '.75rem', marginLeft: 6 }}>*</span>}<br /><a href={mapsUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--sage)', display: 'inline-flex', gap: 6, alignItems: 'center', marginTop: 6, fontSize: '.9rem' }}>{t('get_directions')} <I.arrow s={14} /></a></div></div>
            <div className="fact"><div className="k">{t('hours')}</div><div className="v">{HOURS_ROWS.map((r, i) => <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: '.92rem' }}><span style={{ color: 'rgba(255,255,255,.75)', fontWeight: 700 }}>{L(r.d, lang)}</span><span>{L(r.h, lang)}</span></div>)}</div></div>
          </div>
        </div>
        <div style={{ borderRadius: 24, overflow: 'hidden', aspectRatio: '4/3', boxShadow: '0 30px 60px rgba(0,0,0,.3)', position: 'relative' }}>
          <image-slot id={'ext-' + loc.slug} shape="rect" placeholder={(lang === 'en' ? 'Drop a photo of the ' : 'Foto del exterior de ') + loc.city + (lang === 'en' ? ' clinic exterior (with signage)' : ' (con letrero)')} src={loc.slug === 'kissimmee' ? 'img/w-facade.jpg' : undefined}></image-slot>
        </div>
      </div></section>

      <section className="sec"><div className="wrap two">
        <div style={{ display: 'grid', gap: 44 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>{t('about_clinic')}</div>
            <h2 style={{ marginBottom: 14 }}>UrgiMed {loc.city}</h2>
            <p style={{ fontSize: '1.08rem', lineHeight: 1.7, color: 'var(--ink2)' }}>{L(loc.about, lang)}</p>
            <dl className="kv" style={{ marginTop: 20 }}><dt>{t('serving')}</dt><dd>{loc.areas.join(' · ')}</dd><dt>{t('directions_via')}</dt><dd>{loc.roads}</dd></dl>
          </div>
          <div>
            <h3 style={{ marginBottom: 14, fontSize: '1.4rem' }}>{t('treat_here')}</h3>
            <div className="grid g2">{INJURIES.map(inj => (
              <A key={inj.slug} to={'/injuries/' + inj.slug} className="card card-hover" style={{ display: 'flex', gap: 12, alignItems: 'center', color: 'var(--ink)', padding: '14px 18px', fontWeight: 800 }}><span className="icon-box sm"><I.plus s={20} /></span>{L(inj.name, lang)}</A>
            ))}</div>
          </div>
          <div>
            <h3 style={{ marginBottom: 14 }}>{t('services_here')}</h3>
            <ul className="check-list">{services.map(id => <li key={id}><I.check s={16} /> {svc(id, lang)}{id === 'primary-care' && <span className="chip sage" style={{ fontSize: '.7rem' }}>{lang === 'en' ? 'Only here' : 'Solo aquí'}</span>}</li>)}</ul>
          </div>
          <div>
            <h3 style={{ marginBottom: 14 }}>{t('photos_h')}</h3>
            <div className="photo-strip">
              <image-slot id={'p1-' + loc.slug} shape="rounded" radius="14" placeholder={lang === 'en' ? 'Reception' : 'Recepción'} src={loc.hq ? 'img/w-receptionist.jpg' : undefined}></image-slot>
              <image-slot id={'p2-' + loc.slug} shape="rounded" radius="14" placeholder={lang === 'en' ? 'Treatment room' : 'Sala de tratamiento'} src={loc.hq ? 'img/w-pt-guiding-1.jpg' : undefined}></image-slot>
              <image-slot id={'p3-' + loc.slug} shape="rounded" radius="14" placeholder={lang === 'en' ? 'Equipment / team' : 'Equipo'} src={loc.hq ? 'img/w-cold-laser-2.jpg' : undefined}></image-slot>
            </div>
          </div>
          <RuleBox loc={loc} />
          <div>
            <h3 style={{ marginBottom: 14 }}>{t('reviews_here')}</h3>
            <div className="card" style={{ display: 'grid', gap: 14 }}>
              <Rating gbp={loc.gbp} />
              {loc.gbp && loc.gbp.reviews ? <ul style={{ display: 'grid', gap: 8, paddingLeft: 0, listStyle: 'none' }}>{themes[lang].map((s, i) => <li key={i} style={{ display: 'flex', gap: 10, color: 'var(--ink2)', fontWeight: 600 }}><I.check s={16} /> {s}</li>)}</ul> : <p style={{ color: 'var(--mute)' }}>{lang === 'en' ? 'This listing is new. Google reviews from this clinic will appear here.' : 'Este listado es nuevo. Las reseñas de Google de esta clínica aparecerán aquí.'}</p>}
              <div className="map-ph" style={{ aspectRatio: 'auto', minHeight: 64, padding: 12, fontSize: '.85rem' }}>{lang === 'en' ? 'Embedded Google reviews widget for this listing' : 'Widget de reseñas de Google de este listado'}</div>
            </div>
          </div>
          <div>
            <h3 style={{ marginBottom: 6 }}>{t('faq_h')}</h3>
            <FAQList items={localFaq} />
          </div>
        </div>

        <aside className="sticky-side" style={{ display: 'grid', gap: 16 }}>
          <div className="card" style={{ display: 'grid', gap: 14, borderColor: 'var(--t4)' }}>
            <div className="eyebrow">{t('call_now')}</div>
            <a href={'tel:' + loc.tel} style={{ fontSize: '1.9rem', fontWeight: 900, color: 'var(--t6)', letterSpacing: '-.02em' }}>{loc.phone}</a>
            <div style={{ color: 'var(--mute)', fontWeight: 700, display: 'flex', gap: 8, alignItems: 'center' }}><I.clock s={16} /> {L(HOURS, lang)}</div>
            <CallBtn loc={loc} className="btn btn-primary" />
            <BookBtn slug={loc.slug} className="btn btn-outline" />
            <a href={mapsUrl} target="_blank" rel="noreferrer" className="btn btn-ghost"><I.pin /> {t('get_directions')}</a>
          </div>
          <div className="card mist-bg" style={{ border: 0 }}>
            <h3 style={{ fontSize: '1.05rem', marginBottom: 8 }}>{t('insurance_h')}</h3>
            <p style={{ color: 'var(--mute)', fontSize: '.95rem' }}>{t('insurance_body')}</p>
            <A to="/for-attorneys" style={{ display: 'inline-flex', gap: 6, alignItems: 'center', fontWeight: 800, marginTop: 10 }}>{t('nav_attorneys')} <I.arrow s={14} /></A>
          </div>
          <div className="map-ph"><span>{t('map_h')}<br /><span style={{ fontWeight: 600, fontSize: '.85rem' }}>{loc.street}, {loc.cityState}</span></span></div>
          <div className="card">
            <h3 style={{ fontSize: '1.05rem', marginBottom: 10 }}>{t('team_here')}</h3>
            <div style={{ display: 'grid', gap: 10 }}>{DOCTORS.slice(0, 3).map(d => <A key={d.id} to={'/doctors/' + d.id} style={{ display: 'flex', gap: 10, alignItems: 'center', color: 'var(--ink)' }}><span style={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', flex: 'none', background: 'var(--sage1)' }}><img src={(DOCTOR_BIOS[d.id] || {}).photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></span><span><b style={{ display: 'block', fontSize: '.95rem' }}>{d.name}</b><span style={{ color: 'var(--mute)', fontSize: '.82rem' }}>{L(d.role, lang)}</span></span></A>)}</div>
          </div>
        </aside>
      </div></section>

      <section className="sec-tight mist-bg"><div className="wrap">
        <h3 style={{ marginBottom: 16 }}>{t('nearby_h')}</h3>
        <div className="grid g3">{nearby.map(n => <ClinicCard key={n.slug} loc={n} compact />)}</div>
      </div></section>
      <AttorneyBand />
    </main>
  );
};
Object.assign(window, { LocationsIndex, LocationPage });
