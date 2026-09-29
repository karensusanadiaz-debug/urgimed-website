// Doctors, Doctor profile, First Visit, For Attorneys, FAQ, About, Appointment
const Doctors = () => {
  const { t } = useLang();
  return (
    <main>
      <PageHead eyebrow={t('nav_doctors')} h1={t('doctors_h')} sub={t('doctors_sub')} img="img/w-pt-medium.jpg" />
      <section className="sec"><div className="wrap"><div className="grid g3">{DOCTORS.map(d => <DoctorCard key={d.id} d={d} />)}</div></div></section>
      <ClinicCTA />
    </main>
  );
};

const DoctorPage = ({ id }) => {
  const { t, lang } = useLang();
  const d = DOCTORS.find(x => x.id === id);
  if (!d) return <main className="sec"><div className="wrap"><h1>Not found</h1></div></main>;
  const b = DOCTOR_BIOS[id] || {};
  const [sent, setSent] = React.useState(false);
  const others = DOCTORS.filter(x => x.id !== id).slice(0, 3);
  return (
    <main>
      <PageHead eyebrow={t('nav_doctors')} h1={d.name} sub={L(d.role, lang)} crumb={<><A to="/doctors">{t('nav_doctors')}</A><span>›</span><span>{d.name}</span></>} />
      <section className="sec"><div className="wrap profile">
        <div>
          <div className="photo"><image-slot id={'docp-' + d.id} shape="rect" src={b.photo} placeholder={lang === 'en' ? 'Physician photo' : 'Foto del médico'}></image-slot></div>
          <div className="card" style={{ marginTop: 16, display: 'grid', gap: 10 }}>
            <div className="eyebrow">{t('call_now')}</div>
            <a href={'tel:' + MAIN_PHONE.tel} style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--ink)' }}>{MAIN_PHONE.display}</a>
            <CallBtn className="btn btn-primary" /><A to={'/appointment?d=' + d.id} className="btn btn-outline">{t('book_appt')}</A>
          </div>
        </div>
        <div>
          <h2 style={{ marginBottom: 4 }}>{d.name}</h2>
          <span style={{ color: 'var(--t6)', fontWeight: 600 }}>{L(d.role, lang)} · {L(d.spec, lang)}</span>
          <div className="awards">
            <div className="award"><I.award s={22} /><span className="k">{t('board')}</span><span className="v">{b.boards ? '✓' : '—'}</span></div>
            <div className="award"><I.clock s={22} /><span className="k">{t('years_exp')}</span><span className="v">{b.years}</span></div>
            <div className="award"><I.globe s={22} /><span className="k">{t('languages')}</span><span className="v">{d.langs.length}</span></div>
            <div className="award"><I.pin s={22} /><span className="k">{t('clinics_word')}</span><span className="v">11</span></div>
          </div>
          {(L(b.bio, lang) || []).map((p, i) => <p key={i} style={{ marginBottom: 14, lineHeight: 1.8 }}>{p}</p>)}
          <ul className="infos">
            <li><span>{t('specialty')}</span><span>{L(d.spec, lang)}</span></li>
            <li><span>{t('board')}</span><span>{b.boards}</span></li>
            <li><span>{t('degrees')}</span><span>{b.edu}</span></li>
            <li><span>{t('training')}</span><span>{b.training}</span></li>
            <li><span>{t('experience')}</span><span>{b.years} {lang === 'en' ? 'years' : 'años'}</span></li>
            <li><span>{t('languages')}</span><span>{d.langs.join(', ')}</span></li>
            <li><span>{t('clinics_word')}</span><span>{lang === 'en' ? 'Multiple UrgiMed locations — call to confirm availability' : 'Varias clínicas UrgiMed — llame para confirmar disponibilidad'}</span></li>
          </ul>
        </div>
      </div></section>

      <section className="sec-tight appt-strip"><div className="wrap">
        <h3>{t('book_with')} {d.name.split(',')[0]}</h3>
        <p style={{ textAlign: 'center', marginTop: -10 }}>{t('book_with_sub')}</p>
        {sent ? <div className="card" style={{ textAlign: 'center', fontWeight: 600, color: 'var(--t7)', background: 'var(--t05)', border: 0 }}>{t('appt_done_h')}. {lang === 'en' ? 'We will call you shortly.' : 'Le llamaremos en breve.'}</div> :
          <form className="appt-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <input placeholder={t('appt_name')} required /><input type="tel" placeholder={t('appt_phone')} required />
            <select defaultValue=""><option value="" disabled>{t('appt_clinic')}</option>{LOCATIONS.map(l => <option key={l.slug} value={l.slug}>{L(l.label, lang)}</option>)}</select>
            <input type="date" />
            <button className="btn btn-primary" type="submit">{t('appt_submit')}</button>
          </form>}
      </div></section>

      <section className="sec"><div className="wrap">
        <SectionHead center={false} h={t('back_to_doctors')} />
        <div className="grid g3">{others.map(o => <DoctorCard key={o.id} d={o} />)}</div>
      </div></section>
    </main>
  );
};

const FirstVisit = () => {
  const { t, lang } = useLang();
  const steps = t('steps');
  const imgs = ['img/w-receptionist.jpg', 'img/w-xray-display.jpg', 'img/w-pt-guiding-1.jpg', 'img/w-cold-laser-2.jpg'];
  const bring = { en: ['Photo ID', 'Auto or health insurance card', 'Police / crash report (if you have it)', 'Photos of the accident or injuries', 'Attorney contact (optional)'], es: ['Identificación con foto', 'Tarjeta de seguro de auto o salud', 'Reporte policial (si lo tiene)', 'Fotos del accidente o lesiones', 'Contacto de su abogado (opcional)'] };
  return (
    <main>
      <PageHead eyebrow={t('nav_firstvisit')} h1={t('fv_title')} sub={t('fv_sub')} img="img/w-receptionist.jpg">
        <div className="cta-row" style={{ marginTop: 26, justifyContent: 'center' }}><CallBtn className="btn btn-white" /><BookBtn className="btn btn-outline-inv" /></div>
      </PageHead>
      <section className="sec"><div className="wrap" style={{ display: 'grid', gap: 'clamp(32px,5vw,64px)' }}>{steps.map(([h, p], i) => (
        <div key={i} className="full" style={{ direction: i % 2 ? 'rtl' : 'ltr' }}>
          <div style={{ direction: 'ltr' }}><div className="step"><div className="n">{i + 1}</div><div><h2 style={{ fontSize: '1.5rem', marginBottom: 8 }}>{h}</h2><p style={{ fontSize: '1.02rem' }}>{p}</p>{i === 0 && <ul style={{ marginTop: 14, paddingLeft: 0, listStyle: 'none', display: 'grid', gap: 6 }}>{bring[lang].map((b, j) => <li key={j} style={{ display: 'flex', gap: 8, fontWeight: 500, color: 'var(--ink2)' }}><I.check s={16} /> {b}</li>)}</ul>}</div></div></div>
          <div style={{ direction: 'ltr', borderRadius: 4, overflow: 'hidden', aspectRatio: '4/3' }}><img src={imgs[i]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" /></div>
        </div>
      ))}</div></section>
      <section className="sec-tight mist-bg"><div className="wrap"><RuleBox /></div></section>
      <ClinicCTA />
    </main>
  );
};

const ForAttorneys = () => {
  const { t, lang } = useLang();
  const [sent, setSent] = React.useState(false);
  return (
    <main>
      <PageHead eyebrow={t('nav_attorneys')} h1={t('atty_title')} sub={t('atty_sub')} img="img/w-xray-lightbox.jpg">
        <div className="cta-row" style={{ marginTop: 26, justifyContent: 'center' }}><a href={'mailto:' + EMAIL} className="btn btn-white" style={{ textTransform: 'none' }}>{EMAIL}</a><a href={'tel:' + MAIN_PHONE.tel} className="btn btn-outline-inv"><I.phone s={16} /> {MAIN_PHONE.display}</a></div>
      </PageHead>
      <section className="sec"><div className="wrap">
        <div className="grid g3" style={{ rowGap: 40, marginBottom: 56 }}>{t('atty_points').map(([h, p], i) => <div key={i} className="svc"><span className="icon-box"><I.check s={24} c="currentColor" /></span><div><h3>{h}</h3><p>{p}</p></div></div>)}</div>
        <div className="two">
          <div style={{ display: 'grid', gap: 24 }}>
            <SectionHead center={false} h={lang === 'en' ? '11 clinics, one point of contact' : '11 clínicas, un solo punto de contacto'} />
            <p style={{ fontSize: '1.02rem', lineHeight: 1.8, marginTop: -30 }}>{lang === 'en' ? 'Refer a client to any UrgiMed clinic and our case-manager desk schedules them within 24 hours, confirms the appointment with your office and returns the initial evaluation, EMC determination and imaging within five business days. Ongoing treatment notes, final narrative reports and itemized bills follow the same channel.' : 'Refiera a un cliente a cualquier clínica UrgiMed y nuestra mesa de administradores de casos lo programa en 24 horas, confirma la cita con su oficina y devuelve la evaluación inicial, la determinación EMC y las imágenes en cinco días hábiles. Las notas de tratamiento, informes narrativos finales y facturas detalladas siguen el mismo canal.'}</p>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))' }}>{LOCATIONS.map(l => <A key={l.slug} to={'/locations/' + l.slug} className="card card-hover" style={{ padding: '12px 14px', color: 'var(--ink)', display: 'grid', gap: 2 }}><b>{L(l.label, lang)}</b><span style={{ color: 'var(--t6)', fontWeight: 600, fontSize: '.88rem' }}>{l.phone}</span></A>)}</div>
          </div>
          <aside className="sticky-side"><div className="card" style={{ display: 'grid', gap: 14 }}>
            <div><div className="eyebrow">{t('atty_form_h')}</div><p style={{ marginTop: 4 }}>{t('atty_form_sub')}</p></div>
            {sent ? <div className="t05-bg" style={{ borderRadius: 4, padding: 20, fontWeight: 600, color: 'var(--t7)' }}>{lang === 'en' ? 'Thank you — our case manager will reply within one business day.' : 'Gracias, nuestro administrador de casos responderá en un día hábil.'}</div> : <>
              <div className="field"><label>{t('atty_name')}</label><input /></div>
              <div className="field"><label>{t('atty_firm')}</label><input /></div>
              <div className="field"><label>{t('atty_email')}</label><input type="email" /></div>
              <div className="field"><label>{t('atty_msg')}</label><textarea></textarea></div>
              <button className="btn btn-primary" onClick={() => setSent(true)}>{t('send')}</button>
            </>}
          </div></aside>
        </div>
      </div></section>
    </main>
  );
};

const FAQPage = () => {
  const { t } = useLang();
  return (
    <main>
      <PageHead eyebrow={t('nav_faq')} h1={t('faq_h')} img="img/w-cervical-spine.jpg" />
      <section className="sec"><div className="wrap two"><div><FAQList items={FAQ} /></div><aside className="sticky-side"><RuleBox /></aside></div></section>
      <ClinicCTA />
    </main>
  );
};

const About = () => {
  const { t, lang } = useLang();
  const stats = [['11', t('clinics_word')], ['5.0', lang === 'en' ? 'Google rating, Davenport HQ' : 'Calificación Google, sede Davenport'], ['6', lang === 'en' ? 'Board-certified physicians' : 'Médicos certificados'], ['2', lang === 'en' ? 'Languages at every clinic' : 'Idiomas en cada clínica']];
  return (
    <main>
      <PageHead eyebrow={t('nav_about')} h1={t('about_title')} sub={t('about_sub')} img="img/w-facade.jpg" />
      <section className="sec"><div className="wrap full">
        <div style={{ display: 'grid', gap: 12 }}>
          <div style={{ borderRadius: 4, overflow: 'hidden', aspectRatio: '4/3' }}><img src="img/w-facade.jpg" alt="UrgiMed clinic exterior" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
          <div style={{ borderRadius: 4, overflow: 'hidden', aspectRatio: '16/9' }}><img src="img/w-about-team.jpg" alt={lang === 'en' ? 'UrgiMed care team in the clinic lobby' : 'Equipo de UrgiMed en la recepción de la clínica'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
        </div>
        <div style={{ display: 'grid', gap: 24 }}>
          <SectionHead center={false} h={t('about_more')} />
          <p style={{ fontSize: '1.02rem', lineHeight: 1.8, marginTop: -30 }}>{t('about_body')}</p>
          <div className="grid g2">{stats.map(([n, l], i) => <div key={i} className="card" style={{ padding: '18px 20px' }}><div style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--t6)', lineHeight: 1 }}>{n}</div><div style={{ fontWeight: 500, marginTop: 6, fontSize: '.92rem' }}>{l}</div></div>)}</div>
          <A to="/doctors" className="btn btn-primary" style={{ justifySelf: 'start' }}>{t('doctors_h')}</A>
        </div>
      </div></section>
      <section className="sec mist-bg"><div className="wrap"><SectionHead h={t('doctors_h')} /><div className="grid g3">{DOCTORS.map(d => <DoctorCard key={d.id} d={d} />)}</div></div></section>
      <ClinicCTA h={t('clinics_h')} sub={t('clinics_sub')} />
    </main>
  );
};

const Appointment = ({ query }) => {
  const { t, lang } = useLang();
  const doc = DOCTORS.find(d => d.id === (query && query.d));
  const [f, setF] = React.useState({ clinic: (query && query.c) || '', injury: '', name: '', phone: '', when: '' });
  const [done, setDone] = React.useState(false);
  const set = (k) => (e) => setF(s => ({ ...s, [k]: e.target.value }));
  const loc = locBySlug(f.clinic);
  const ok = f.clinic && f.injury && f.name && f.phone;
  return (
    <main>
      <PageHead eyebrow={t('book_appt')} h1={doc ? `${t('book_with')} ${doc.name.split(',')[0]}` : t('appt_title')} sub={t('appt_sub')} img="img/w-receptionist.jpg" />
      <section className="sec"><div className="wrap two">
        <div className="card" style={{ display: 'grid', gap: 16, maxWidth: 640 }}>
          {done ? <div style={{ display: 'grid', gap: 12, textAlign: 'center', padding: 20 }}><span className="icon-box" style={{ margin: '0 auto', borderColor: '#27ae60' }}><I.check s={28} c="#27ae60" /></span><h2>{t('appt_done_h')}</h2><p className="lead">{t('appt_done')} <b>UrgiMed {loc && L(loc.label, lang)}</b>.</p><button className="btn btn-outline" style={{ justifySelf: 'center' }} onClick={() => { setDone(false); setF({ clinic: '', injury: '', name: '', phone: '', when: '' }); }}>{t('appt_another')}</button></div> : <>
            <div className="field"><label>{t('appt_clinic')}</label><select value={f.clinic} onChange={set('clinic')}><option value="">—</option>{LOCATIONS.map(l => <option key={l.slug} value={l.slug}>{L(l.label, lang)} — {l.street}</option>)}</select></div>
            <div className="field"><label>{t('appt_injury')}</label><div className="grid g2" style={{ gap: 8 }}>{INJURIES.map(i => <button key={i.slug} type="button" onClick={() => setF(s => ({ ...s, injury: i.slug }))} className="btn" style={{ minHeight: 46, textTransform: 'none', border: '1px solid ' + (f.injury === i.slug ? 'var(--t6)' : '#dcdcdc'), background: f.injury === i.slug ? 'var(--t6)' : '#fff', color: f.injury === i.slug ? '#fff' : 'var(--ink2)', borderRadius: 3 }}>{L(i.name, lang)}</button>)}</div></div>
            <div className="grid g2"><div className="field"><label>{t('appt_name')}</label><input value={f.name} onChange={set('name')} /></div><div className="field"><label>{t('appt_phone')}</label><input type="tel" value={f.phone} onChange={set('phone')} /></div></div>
            <div className="field"><label>{t('appt_when')}</label><input type="date" value={f.when} onChange={set('when')} /></div>
            <button className="btn btn-primary btn-lg" disabled={!ok} style={{ opacity: ok ? 1 : .5 }} onClick={() => setDone(true)}>{t('appt_submit')}</button>
          </>}
        </div>
        <aside style={{ display: 'grid', gap: 16 }}>
          {loc ? <ClinicCard loc={loc} /> : <div className="card mist-bg" style={{ border: 0 }}><h3 style={{ marginBottom: 8 }}>{t('call_now')}</h3><a href={'tel:' + MAIN_PHONE.tel} style={{ fontSize: '1.6rem', fontWeight: 700 }}>{MAIN_PHONE.display}</a><p style={{ marginTop: 6 }}>{L(HOURS, lang)}</p></div>}
          <RuleBox loc={loc} />
        </aside>
      </div></section>
    </main>
  );
};
Object.assign(window, { Doctors, DoctorPage, FirstVisit, ForAttorneys, FAQPage, About, Appointment });
