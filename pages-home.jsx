// Home page — simplified, keyword-first
const DoctorCard = ({ d }) => {
  const { t, lang } = useLang();
  const b = DOCTOR_BIOS[d.id] || {};
  const spec = d.chip ? L(d.chip, lang) : L(d.spec, lang);
  return (
    <A to={'/doctors/' + d.id} className="team">
      <div className="img"><img src={b.photo} alt={d.name} loading="lazy" /><span className="spec">{spec}</span></div>
      <div className="body">
        <h3>{d.name}</h3><span className="role">{L(d.role, lang)}</span>
        <span className="more">{t('view_profile')} <I.arrow s={14} /></span>
      </div>
    </A>
  );
};

// Pin positions as % of the map image (1400×1250)
const MAP_PINS = { 'kissimmee': [77.6, 42.8], 'davenport': [75.4, 44.9], 'winter-haven': [73.9, 46.9] };
const MAP_LABEL_X = 50; // labels sit in the Gulf, west of the peninsula
const MAP_LABEL_Y = { 'kissimmee': 28, 'davenport': 41, 'winter-haven': 54 };

const ClinicMap = () => {
  const { t, lang } = useLang();
  const [active, setActive] = React.useState('davenport');
  const loc = locBySlug(active);
  const mapsUrl = 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(loc.street + ', ' + loc.cityState);
  return (
    <div className="cmap">
      <div className="cmap-img">
        <img src="img/florida-map.png" alt={lang === 'en' ? 'Map of UrgiMed clinics in Florida' : 'Mapa de clínicas UrgiMed en Florida'} />
        <svg className="cmap-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {LOCATIONS.map(l => { const [x, y] = MAP_PINS[l.slug]; return <line key={l.slug} x1={x} y1={y} x2={MAP_LABEL_X} y2={MAP_LABEL_Y[l.slug]} className={active === l.slug ? 'on' : ''} />; })}
        </svg>
        {LOCATIONS.map(l => { const [x, y] = MAP_PINS[l.slug]; return (
          <button key={l.slug} className={'pin' + (active === l.slug ? ' on' : '')} style={{ left: x + '%', top: y + '%' }} onMouseEnter={() => setActive(l.slug)} onFocus={() => setActive(l.slug)} onClick={() => setActive(l.slug)} aria-label={L(l.label, lang)}><span></span></button>
        ); })}
        {LOCATIONS.map(l => (
          <button key={'lb-' + l.slug} className={'pin-label' + (active === l.slug ? ' on' : '')} style={{ left: MAP_LABEL_X + '%', top: MAP_LABEL_Y[l.slug] + '%' }} onMouseEnter={() => setActive(l.slug)} onClick={() => setActive(l.slug)}>{l.city}</button>
        ))}
      </div>
      <div className="cmap-card card">
        <div className="eyebrow">{t('nav_locations')}</div>
        <h3 style={{ fontSize: '1.3rem' }}>UrgiMed {L(loc.label, lang)}</h3>
        <Rating gbp={loc.gbp} />
        <p style={{ color: 'var(--ink2)' }}><I.pin s={14} /> {loc.street}<br />{loc.cityState}</p>
        <a href={'tel:' + loc.tel} style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--t6)' }}>{loc.phone}</a>
        <div className="cta-row"><A to={'/locations/' + loc.slug} className="btn btn-primary btn-sm">{lang === 'en' ? 'Clinic page' : 'Ver clínica'}</A><a href={mapsUrl} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">{t('get_directions')}</a></div>
        <div className="cmap-list">{LOCATIONS.map(l => <button key={l.slug} className={active === l.slug ? 'on' : ''} onClick={() => setActive(l.slug)}>{L(l.label, lang)}</button>)}</div>
      </div>
    </div>
  );
};

const HeroForm = () => {
  const { t, lang } = useLang();
  const [sent, setSent] = React.useState(false);
  const [f, setF] = React.useState({ name: '', phone: '', injury: '', clinic: '', when: '' });
  const set = (k) => (e) => setF(s => ({ ...s, [k]: e.target.value }));
  return (
    <div className="hero-form">
      <h2>{lang === 'en' ? 'Become a Patient' : 'Sea Nuestro Paciente'}</h2>
      <p>{lang === 'en' ? 'Same-day care after an accident. We call you back to confirm.' : 'Atención el mismo día tras un accidente. Le llamamos para confirmar.'}</p>
      {sent ? <div className="hf-done"><I.check s={28} c="#27ae60" /><b>{t('appt_done_h')}</b><span>{lang === 'en' ? 'We will call you shortly.' : 'Le llamaremos en breve.'}</span></div> :
      <form onSubmit={(e) => { e.preventDefault(); sendLead('Hero appointment request', collectFields(e.currentTarget)); setSent(true); }}>
        <Honeypot />
        <input placeholder={t('appt_name')} value={f.name} onChange={set('name')} required />
        <input type="tel" placeholder={t('appt_phone')} value={f.phone} onChange={set('phone')} required />
        <select name="Injury" value={f.injury} onChange={set('injury')} required><option value="" disabled>{t('appt_injury')}</option>{INJURIES.map(i => <option key={i.slug} value={i.slug}>{L(i.name, lang)}</option>)}</select>
        <div className="hf-row">
          <input type="date" name="Preferred day" value={f.when} onChange={set('when')} aria-label={t('appt_when')} />
          <select name="Clinic" value={f.clinic} onChange={set('clinic')} required><option value="" disabled>{t('appt_clinic')}</option>{LOCATIONS.map(l => <option key={l.slug} value={l.slug}>{L(l.label, lang)}</option>)}</select>
        </div>
        <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>{t('book_appt')}</button>
      </form>}
    </div>
  );
};

const Words = ({ text, from = 0 }) => text.split(' ').map((w, i) => <span key={i} className="w" style={{ animationDelay: (from + i) * 0.07 + 0.15 + 's' }}>{w}{'\u00A0'}</span>);

const Home = () => {
  const { t, lang } = useLang();
  const [run, setRun] = React.useState(0);
  React.useEffect(() => { const id = requestAnimationFrame(() => setRun(r => r + 1)); return () => cancelAnimationFrame(id); }, [lang]);
  const why = lang === 'en' ? [['Seen the same day', 'Call before 5 PM and we see you today.'], ['All specialists under one roof', 'MD, chiropractic, PT, pain management, orthopedics, neurology.'], ['X-ray & ultrasound on site', 'Diagnosis and treatment plan at the first visit.'], ['Documentation for your claim', 'EMC, records and bills to your insurer or attorney in days.'], ['Se habla español', 'Bilingual staff at every clinic.']]
    : [['Atención el mismo día', 'Llame antes de las 5 PM y le atendemos hoy.'], ['Todos los especialistas bajo un techo', 'Médico, quiropráctica, TF, dolor, ortopedia, neurología.'], ['Rayos X y ultrasonido en el sitio', 'Diagnóstico y plan de tratamiento en la primera visita.'], ['Documentación para su reclamo', 'EMC, expedientes y facturas a su aseguradora o abogado en días.'], ['Se habla español', 'Personal bilingüe en cada clínica.']];
  return (
    <main>
      <section className="banner-v3">
        <div className="wrap banner-v3-in">
          <div className="cap">
            <h1 key={'h1' + run + lang} className="anim-title">{lang === 'en' ? <><Words text="Car Accident & Injury Clinics" /><b><Words text="Across Florida" from={5} /></b></> : <><Words text="Clínicas de Accidentes y Lesiones" /><b><Words text="en toda Florida" from={5} /></b></>}</h1>
            <p key={'p' + run + lang} className="hv-sub">{lang === 'en' ? 'Same-day appointments at 3 Central Florida clinics. Board-certified physicians, X-ray on site, PIP billed directly. Se habla español.' : 'Citas el mismo día en 3 clínicas del centro de Florida. Médicos certificados, rayos X en sitio, facturamos al PIP directamente. Se habla español.'}</p>
            <div className="cta-row" style={{ gap: 12 }}>
              <BookBtn className="btn btn-primary btn-lg" />
              <a href={'tel:' + MAIN_PHONE.tel} className="btn btn-outline btn-lg hv-callbtn"><I.phone s={16} /> {MAIN_PHONE.display}</a>
            </div>
          </div>
          <div className="hv">
            <div className="hv-photo"><img src="img/hero-pt-care.jpg" alt="UrgiMed physical therapist guiding a patient through a shoulder exercise in the clinic" /></div>
            <div className="hv-card hv-c1"><span className="hv-ic"><I.star s={20} /></span><div><b>5.0 {lang === 'en' ? 'on Google' : 'en Google'}</b><small>130+ {lang === 'en' ? 'patient reviews' : 'reseñas de pacientes'}</small></div></div>
            <div className="hv-card hv-c2"><span className="hv-ic"><I.clock s={20} /></span><div><b>{lang === 'en' ? 'Same-day care' : 'Atención el mismo día'}</b><small>{lang === 'en' ? 'No referral needed' : 'Sin referido'}</small></div></div>
          </div>
        </div>
        <div className="wrap hv-form"><HeroForm /></div>
      </section>

      <section className="quick"><div className="wrap grid g4">
        <A to="/appointment" className="qcard"><span className="qicon"><I.cal s={40} /></span><h3>{lang === 'en' ? 'Appointment' : 'Cita'}</h3></A>
        <A to="/doctors" className="qcard"><span className="qicon"><I.user s={40} /></span><h3>{lang === 'en' ? 'Doctors' : 'Médicos'}</h3></A>
        <a href={'tel:' + MAIN_PHONE.tel} className="qcard"><span className="qicon"><I.phone s={40} /></span><h3>{lang === 'en' ? 'Call us' : 'Llámenos'}</h3></a>
        <A to="/locations" className="qcard"><span className="qicon"><I.pin s={40} /></span><h3>{lang === 'en' ? 'Locations' : 'Clínicas'}</h3></A>
      </div></section>

      <section className="sec"><div className="wrap">
        <SectionHead h={t('what_happened')} />
        <div className="grid g4">{INJURIES.map(inj => (
          <A key={inj.slug} to={'/injuries/' + inj.slug} className="spec" style={{ color: 'inherit' }}>
            <div className="ph"><img src={inj.img} alt={L(inj.name, lang) + (lang === 'en' ? ' treatment at UrgiMed' : ' — tratamiento en UrgiMed')} loading="lazy" /></div>
            <h3>{L(inj.name, lang)}</h3>
            <span className="btn btn-outline btn-sm">{lang === 'en' ? 'Read more' : 'Leer más'}</span>
          </A>
        ))}</div>
        <p style={{ textAlign: 'center', marginTop: 28 }}>{lang === 'en' ? 'Not sure which applies? ' : '¿No sabe cuál aplica? '}<A to="/injuries" style={{ fontWeight: 600 }}>{lang === 'en' ? 'Check your symptoms →' : 'Revise sus síntomas →'}</A></p>
      </div></section>

      <GetStarted />

      <section className="sec mist-bg"><div className="wrap full">
        <img src="img/w-about-team.jpg" alt="UrgiMed care team welcoming patients in the clinic lobby" style={{ maxHeight: 460 }} loading="lazy" />
        <div>
          <SectionHead center={false} h={t('about_more')} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: 12 }}>Live Life Limitless</h3>
          <p style={{ marginBottom: 24, fontSize: '1.02rem' }}>{lang === 'en' ? 'Florida’s multi-specialty group for accident and injury recovery. 3 Central Florida clinics. Board-certified physicians. Bilingual staff.' : 'El grupo multiespecialidad de Florida para la recuperación de accidentes y lesiones. 3 clínicas en el centro de Florida. Médicos certificados. Personal bilingüe.'}</p>
          <A to="/about" className="btn btn-primary">{t('nav_about')}</A>
        </div>
      </div></section>

      <section className="offer"><div className="wrap">
        <div className="o rule"><div className="eyebrow-inv">{lang === 'en' ? 'Florida law · Statute 627.736' : 'Ley de Florida · Estatuto 627.736'}</div><div className="rule-num"><span className="big">14</span><span className="days">{lang === 'en' ? 'days' : 'días'}</span></div><h3>{lang === 'en' ? 'See a doctor within 14 days of a crash — or lose your PIP benefits.' : 'Vea a un médico dentro de 14 días del choque — o pierda sus beneficios PIP.'}</h3><p>{lang === 'en' ? 'Your Personal Injury Protection (PIP) coverage only pays if you receive initial treatment within 14 days of the accident. Miss the window and your insurer can deny the claim entirely. Whiplash and other symptoms often appear days later — get evaluated even if you feel fine.' : 'Su cobertura de Protección contra Lesiones Personales (PIP) solo paga si recibe tratamiento inicial dentro de los 14 días del accidente. Si pasa el plazo, la aseguradora puede negar el reclamo por completo. El latigazo cervical y otros síntomas suelen aparecer días después — hágase evaluar aunque se sienta bien.'}</p><div className="rule-facts"><div><b>{lang === 'en' ? 'Same day' : 'Mismo día'}</b><span>{lang === 'en' ? 'we see you today, no referral' : 'le atendemos hoy, sin referido'}</span></div><div><b>{lang === 'en' ? 'Any fault' : 'Sin culpa'}</b><span>{lang === 'en' ? 'covered no matter who caused it' : 'cubierto sin importar la culpa'}</span></div><div><b>{lang === 'en' ? 'Day 15' : 'Día 15'}</b><span>{lang === 'en' ? 'your claim can be denied' : 'su reclamo puede ser negado'}</span></div></div><div className="cta-row" style={{ justifyContent: 'center' }}><CallBtn className="btn btn-white" label={t('call_now')} /><A to="/pip-insurance" className="btn btn-outline-inv">{lang === 'en' ? 'How PIP works' : 'Cómo funciona PIP'}</A></div></div>
      </div></section>

      <section className="sec"><div className="wrap">
        <SectionHead h={t('services_h')} />
        <div className="grid g4" style={{ rowGap: 28 }}>{SERVICES.map(s => (
          <A key={s.id} to={'/services/' + s.id} className="svc" style={{ color: 'inherit', alignItems: 'center' }}><span className="icon-box"><I.check s={24} c="currentColor" /></span><h3 style={{ margin: 0 }}>{L(s, lang)}</h3></A>
        ))}</div>
        <div style={{ textAlign: 'center', marginTop: 32 }}><A to="/services" className="btn btn-outline">{t('all_services')}</A></div>
      </div></section>

      <section className="sec cream-bg"><div className="wrap full" style={{ alignItems: 'start' }}>
        <div><SectionHead center={false} h={t('why_h')} /><Accordion items={why} /></div>
        <div className="masonry">
          <div className="m1"><img src="img/w-xray-display.jpg" alt="UrgiMed physician reviewing a digital X-ray with a patient" loading="lazy" /></div>
          <div><img src="img/w-cold-laser-1.jpg" alt="Cold laser therapy session at an UrgiMed clinic" loading="lazy" /></div>
          <div><img src="img/w-pt-guiding-2.jpg" alt="Physical therapist guiding a patient through a rehabilitation exercise" loading="lazy" /></div>
        </div>
      </div></section>

      <section className="facts sec"><img className="bg" src="img/w-facade.jpg" alt="" /><div className="wrap">
        <div><h2>{lang === 'en' ? <><b>3 clinics across Central Florida.</b> Same-day care.</> : <><b>3 clínicas en el centro de Florida.</b> Atención el mismo día.</>}</h2><A to="/locations" className="btn btn-outline-inv">{t('find_clinic')}</A></div>
        <div className="row">
          <div><span className="icon-box inv" style={{ margin: '0 auto' }}><I.pin s={24} /></span><div className="n">3</div><p>{t('clinics_word')}</p></div>
          <div><span className="icon-box inv" style={{ margin: '0 auto' }}><I.user s={24} /></span><div className="n" style={{ fontSize: '1.6rem', lineHeight: 1.2, paddingTop: 10 }}>{lang === 'en' ? 'Board-certified' : 'Certificados'}</div><p>{lang === 'en' ? 'Physicians' : 'Médicos'}</p></div>
          <div><span className="icon-box inv" style={{ margin: '0 auto' }}><I.star s={24} /></span><div className="n">5.0</div><p>Google · Davenport</p></div>
        </div>
      </div></section>

      <section className="sec"><div className="wrap">
        <SectionHead center={false} h={t('doctors_h')} />
        <div className="grid g4">{DOCTORS.slice(0, 4).map(d => <DoctorCard key={d.id} d={d} />)}</div>
        <div style={{ textAlign: 'center', marginTop: 32 }}><A to="/doctors" className="btn btn-primary">{t('back_to_doctors')}</A></div>
      </div></section>

      <HomeFAQ />

      <section className="sec mist-bg"><div className="wrap">
        <SectionHead h={t('reviews_h')} />
        <TiWidget src="https://cdn.trustindex.io/loader.js?582277b6570c2478d72635ed4d0" label={lang === 'en' ? 'Google reviews widget (Trustindex) loads here' : 'Widget de reseñas de Google (Trustindex)'} />
      </div></section>

      <section className="sec" id="clinics"><div className="wrap">
        <SectionHead h={t('clinics_h')} sub={lang === 'en' ? 'Tap a pin for the address, phone and directions.' : 'Toque un pin para ver dirección, teléfono y cómo llegar.'} />
        <ClinicMap />
        <AreasStrip />
      </div></section>

      <section className="sec"><div className="wrap">
        <SectionHead center={false} h={lang === 'en' ? 'From the blog' : 'Del blog'} sub={lang === 'en' ? 'Physician-reviewed answers to the questions accident patients ask most.' : 'Respuestas revisadas por médicos a las preguntas más frecuentes.'} />
        <div className="grid g3">{BLOG_POSTS.slice(0, 3).map(b => <PostCard key={b.slug} p={b} />)}</div>
        <div style={{ textAlign: 'center', marginTop: 32 }}><A to="/blog" className="btn btn-outline">{t('all_posts')}</A></div>
      </div></section>

      <section className="sec mist-bg"><div className="wrap">
        <SectionHead h={t('insta_h')} sub="@UrgimedCare" />
        <TiWidget src="https://cdn.trustindex.io/loader-feed.js?30e218165825245d5006e361f11" label={lang === 'en' ? 'Loading Instagram posts…' : 'Cargando publicaciones de Instagram…'} />
        <div style={{ marginTop: 18 }}><InstaGrid posts={IG_POSTS} /></div>
      </div></section>

      <AttorneyBand />
    </main>
  );
};
Object.assign(window, { Home, HeroForm, DoctorCard, ClinicMap, MAP_PINS });
