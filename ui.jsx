// Shared UI — UrgiMed redesign v2 (Medi Plus layout system, UrgiMed brand)
const LangCtx = React.createContext({ lang: 'en', t: (k) => k, L: (o) => o });
const useLang = () => React.useContext(LangCtx);
const L = (obj, lang) => (obj && typeof obj === 'object' && ('en' in obj) ? (obj[lang] ?? obj.en) : obj);
const svc = (id, lang) => L(SERVICES.find(s => s.id === id), lang);
const locBySlug = (slug) => LOCATIONS.find(l => l.slug === slug);
const nav = (to) => { window.location.hash = '#' + to; };
const A = ({ to, className, style, children, ...rest }) => (
  <a href={'#' + to} className={className} style={style} onClick={(e) => { e.preventDefault(); nav(to); }} {...rest}>{children}</a>
);

const I = {
  phone: (p) => <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>,
  mail: (p) => <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>,
  pin: (p) => <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  clock: (p) => <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  arrow: (p) => <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>,
  check: (p) => <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none" stroke={p.c || '#1a6b6b'} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>,
  chev: (p) => <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: p.open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}><path d="m6 9 6 6 6-6"/></svg>,
  cal: (p) => <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
  globe: (p) => <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/></svg>,
  menu: (p) => <svg width={p.s || 26} height={p.s || 26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>,
  x: (p) => <svg width={p.s || 26} height={p.s || 26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>,
  star: (p) => <svg width={p.s || 16} height={p.s || 16} viewBox="0 0 24 24" fill="#f2b01e"><path d="M12 2l3.1 6.6 7.1.9-5.2 5 1.4 7.1L12 18.2 5.6 21.6 7 14.5 1.8 9.5l7.1-.9z"/></svg>,
  plus: (p) => <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>,
  user: (p) => <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>,
  fb: (p) => <svg width={p.s || 14} height={p.s || 14} viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.3H7.4V14h2.8v8h3.3z"/></svg>,
  ig: (p) => <svg width={p.s || 14} height={p.s || 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>,
  award: (p) => <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M8.2 13.9 7 22l5-3 5 3-1.2-8.1"/></svg>,
  cap: (p) => <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  siren: (p) => <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 18V12a5 5 0 0 1 10 0v6"/><path d="M4 18h16v3H4z"/><path d="M12 3v2M4.5 6.5l1.5 1.5M19.5 6.5 18 8"/></svg>,
  camera: (p) => <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8a2 2 0 0 1 2-2h2l2-3h6l2 3h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="4"/></svg>,
  steth: (p) => <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3v6a6 6 0 0 0 12 0V3"/><path d="M11 15v2a4 4 0 0 0 8 0v-3"/><circle cx="19" cy="11" r="2"/></svg>,
  shield: (p) => <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 4 5v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V5z"/><path d="m9 12 2 2 4-4"/></svg>,
  notebook: (p) => <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="3" width="15" height="18" rx="2"/><path d="M9 3v18M13 8h4M13 12h4"/></svg>,
  clipcheck: (p) => <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2h6v2"/><path d="m9 13 2 2 4-4"/></svg>,
  flag: (p) => <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 21V4"/><path d="M5 4h12l-2 4 2 4H5"/></svg>,
  users: (p) => <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 15a5 5 0 0 1 5.5 5"/></svg>,
  file: (p) => <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h6"/></svg>,
  ice: (p) => <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M4 7l16 10M4 17 20 7"/><path d="m9 4 3 2 3-2M9 20l3-2 3 2M3.5 9.5 6 12l-2.5 2.5M20.5 9.5 18 12l2.5 2.5"/></svg>,
  scan: (p) => <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3"/><path d="M12 7v10M8 10v4M16 10v4"/></svg>,
  run: (p) => <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="15" cy="4" r="2"/><path d="m8 21 3-6 3 2 3-4-4-3-3 3-4-1"/><path d="m13 11 2 3 4 1"/></svg>,
  activity: (p) => <svg width={p.s || 18} height={p.s || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l3-8 4 16 3-8h4"/></svg>,
  flagUS: (p) => <svg width={p.s || 20} height={(p.s || 20) * .7} viewBox="0 0 20 14" aria-hidden="true"><rect width="20" height="14" fill="#fff"/><g fill="#b22234"><rect y="0" width="20" height="1.08"/><rect y="2.15" width="20" height="1.08"/><rect y="4.31" width="20" height="1.08"/><rect y="6.46" width="20" height="1.08"/><rect y="8.62" width="20" height="1.08"/><rect y="10.77" width="20" height="1.08"/><rect y="12.92" width="20" height="1.08"/></g><rect width="8.5" height="7.54" fill="#3c3b6e"/><g fill="#fff"><circle cx="1.6" cy="1.5" r=".55"/><circle cx="4.2" cy="1.5" r=".55"/><circle cx="6.8" cy="1.5" r=".55"/><circle cx="2.9" cy="3" r=".55"/><circle cx="5.5" cy="3" r=".55"/><circle cx="1.6" cy="4.5" r=".55"/><circle cx="4.2" cy="4.5" r=".55"/><circle cx="6.8" cy="4.5" r=".55"/><circle cx="2.9" cy="6" r=".55"/><circle cx="5.5" cy="6" r=".55"/></g></svg>,
  flagES: (p) => <svg width={p.s || 20} height={(p.s || 20) * .7} viewBox="0 0 20 14" aria-hidden="true"><rect width="20" height="14" fill="#aa151b"/><rect y="3.5" width="20" height="7" fill="#f1bf00"/><rect x="5" y="5.4" width="2.6" height="3.2" rx=".4" fill="#aa151b" opacity=".85"/></svg>,
};

const Stars = ({ n = 5 }) => <span style={{ display: 'inline-flex', gap: 2 }}>{Array.from({ length: n }).map((_, i) => <I.star key={i} />)}</span>;

const Rating = ({ gbp, inv }) => {
  const { t } = useLang();
  if (!gbp || !gbp.reviews) return <span className={'chip ' + (inv ? 'inv' : 'warn')}>{t('no_reviews_yet')}</span>;
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 600, color: inv ? '#fff' : 'var(--ink)' }}><Stars /> {gbp.rating.toFixed(1)} <span style={{ fontWeight: 400, color: inv ? 'rgba(255,255,255,.75)' : 'var(--mute)' }}>· {gbp.reviews} {t('reviews_word')} {t('rating_word')}</span></span>;
};

const CallBtn = ({ loc, className = 'btn btn-primary', label }) => {
  const { t } = useLang();
  const tel = loc ? loc.tel : MAIN_PHONE.tel, num = loc ? loc.phone : MAIN_PHONE.display;
  return <a href={'tel:' + tel} className={className}><I.phone s={16} /> {label || t('call')} {num}</a>;
};
const BookBtn = ({ className = 'btn btn-outline', slug }) => { const { t } = useLang(); return <A to={'/appointment' + (slug ? '?c=' + slug : '')} className={className}><I.cal s={16} /> {t('book')}</A>; };

const SectionHead = ({ eyebrow, h, sub, inv, center = true }) => (
  <div className={'sec-title ' + (center ? 'center' : 'left') + (inv ? ' inv' : '')}>
    {eyebrow && <div className={'eyebrow' + (inv ? ' inv' : '')} style={{ marginBottom: 6 }}>{eyebrow}</div>}
    <h2>{h}</h2>
    {sub && <p>{sub}</p>}
    <span className="decor"><span className="inner"></span></span>
  </div>
);

const ClinicCard = ({ loc, compact }) => {
  const { t, lang } = useLang();
  return (
    <A to={'/locations/' + loc.slug} className="card card-hover clinic-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
        <div className="name">{L(loc.label, lang)}</div>
        {loc.hq && <span className="chip sage">{t('hq')}</span>}
      </div>
      <div className="addr">{loc.street}<br />{loc.cityState}</div>
      <div className="tel"><I.phone s={14} /> {loc.phone}</div>
      {!compact && <Rating gbp={loc.gbp} />}
      <div style={{ display: 'flex', gap: 6, marginTop: 2, color: 'var(--t6)', fontWeight: 600, fontSize: '.82rem', alignItems: 'center', textTransform: 'uppercase', letterSpacing: '.04em' }}>{t('same_day')} <I.arrow s={14} /></div>
    </A>
  );
};

const FAQList = ({ items }) => {
  const { lang } = useLang();
  const [open, setOpen] = React.useState(0);
  return (
    <div itemScope itemType="https://schema.org/FAQPage">
      {items.map((f, i) => (
        <div className="faq-item" key={i} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}><span itemProp="name">{L(f.q, lang)}</span><I.chev open={open === i} /></button>
          {open === i && <div className="faq-a" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer"><span itemProp="text">{L(f.a, lang)}</span></div>}
        </div>
      ))}
    </div>
  );
};

const Accordion = ({ items }) => {
  const [open, setOpen] = React.useState(0);
  return <div>{items.map(([q, a], i) => (
    <div key={i} className={'acc' + (open === i ? ' open' : '')}>
      <button className="acc-t" onClick={() => setOpen(open === i ? -1 : i)}><span className="dot"><i></i></span>{q}</button>
      {open === i && <div className="acc-c">{a}</div>}
    </div>
  ))}</div>;
};

const TiWidget = ({ src, label }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    if (document.querySelector('script[src="' + src + '"]')) return;
    const s = document.createElement('script'); s.src = src; s.defer = true; s.async = true; el.appendChild(s);
  }, [src]);
  return <div style={{ position: 'relative', minHeight: 220 }}><div className="widget-box" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>{label}</div><div ref={ref} style={{ position: 'relative', zIndex: 1, minHeight: 220 }}></div></div>;
};

const Nav = ({ route, lang, setLang }) => {
  const { t } = useLang();
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => setOpen(false), [route]);
  const car = <svg className="car" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>;
  const menus = [
    { to: '/locations', label: t('nav_locations'), wide: true, items: LOCATIONS.map(l => ['/locations/' + l.slug, L(l.label, lang)]), all: ['/locations', t('all_locations')] },
    { to: '/injuries', label: t('nav_injuries'), items: INJURIES.map(i => ['/injuries/' + i.slug, L(i.name, lang)]), all: ['/injuries', t('all_injuries')] },
    { to: '/services', label: t('nav_services'), wide: true, items: SERVICES.map(s => ['/services/' + s.id, L(s, lang)]), all: ['/services', t('all_services')] },
    { to: '/doctors', label: t('nav_doctors'), items: DOCTORS.map(d => ['/doctors/' + d.id, d.name]), all: ['/doctors', t('back_to_doctors')] },
    { to: '/first-visit', label: t('nav_resources'), items: [['/first-visit', t('nav_firstvisit')], ['/pip-insurance', t('nav_pip')], ['/faq', t('nav_faq')], ['/blog', t('nav_blog')], ['/reviews', t('nav_reviews')], ['/patient-resources', t('nav_patient_resources')]], all: ['/about', t('nav_about')] },
    { to: '/for-attorneys', label: t('nav_refer'), items: [['/for-attorneys', t('nav_attorneys')], ['/for-providers', t('nav_providers')]], all: ['https://urgimedical.com/referral', t('referral') + ' ↗'] },
  ];
  const on = (m) => route.startsWith(m.to) || (m.items || []).some(([to]) => to.startsWith('/') && route.startsWith(to));
  const DDLink = ({ to, className, children }) => to.startsWith('http') ? <a href={to} target="_blank" rel="noreferrer" className={className}>{children}</a> : <A to={to} className={className}>{children}</A>;
  return (
    <>
      <div className="topbar"><div className="wrap">
        <span className="l"><span><I.phone s={15} /> <a href={'tel:' + MAIN_PHONE.tel}>{MAIN_PHONE.display}</a></span><span><I.clock s={15} /> {L(HOURS, lang)}</span></span>
        <span className="r">
          <a className="hide-m" href="https://urgimedical.com/referral" target="_blank" rel="noreferrer"><I.plus s={14} /> {t('referral')}</a>
          <a className="hide-m" href="https://patient.urgimedical.com/" target="_blank" rel="noreferrer"><I.user s={14} /> {t('patient_login')}</a>
          <span className="lang-sw" role="group" aria-label="Language"><button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')} aria-pressed={lang === 'en'}><I.flagUS s={18} /> EN</button><button className={lang === 'es' ? 'on' : ''} onClick={() => setLang('es')} aria-pressed={lang === 'es'}><I.flagES s={18} /> ES</button></span>
          <span className="soc hide-m"><span style={{ opacity: .85 }}>{lang === 'en' ? 'Follow us' : 'Síganos'}</span><a href="https://www.facebook.com/UrgimedCare" target="_blank" rel="noreferrer" aria-label="Facebook"><I.fb s={15} /></a><a href="https://www.instagram.com/UrgimedCare/" target="_blank" rel="noreferrer" aria-label="Instagram"><I.ig s={15} /></a></span>
        </span>
      </div></div>
      <header className="header"><div className="wrap">
        <A to="/" aria-label="UrgiMed home"><img src="img/logo-horizontal.png" alt="UrgiMed — Live Life Limitless" style={{ height: 48, width: 'auto' }} /></A>
        <ul className="hnav" aria-label="Main">{menus.map(m => (
          <li key={m.to}><A to={m.to} className={on(m) ? 'on' : ''} aria-haspopup={m.items ? 'true' : undefined}>{m.label}{m.items && car}</A>
            {m.items && <div className={'dd' + (m.wide ? ' wide' : '')}>{m.items.map(([to, l]) => <A key={to} to={to} className={route === to ? 'on' : ''}>{l}<I.arrow s={12} /></A>)}<DDLink to={m.all[0]} className="all">{m.all[1]}<I.arrow s={12} /></DDLink></div>}
          </li>
        ))}</ul>
        <div className="hact">
          <A to="/appointment" className="btn btn-primary btn-appt hide-m">{t('book_appt')} <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg></A>
          <button className="burger" onClick={() => setOpen(true)} aria-label="Menu"><I.menu /></button>
        </div>
      </div></header>
      {open && <div className="drawer" onClick={() => setOpen(false)}><div className="drawer-in" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}><img src="img/logo-horizontal.png" alt="UrgiMed" style={{ height: 40 }} /><button className="burger" style={{ color: 'var(--t6)' }} onClick={() => setOpen(false)} aria-label="Close"><I.x /></button></div>
        {menus.map(m => <React.Fragment key={m.to}><A to={m.to} className="nl">{m.label}</A>{m.items && m.items.map(([to, l]) => <A key={to} to={to} className="sub">{l}</A>)}</React.Fragment>)}
        <A to="/about" className="nl">{t('nav_about')}</A>
        <a className="nl" href="https://urgimedical.com/referral" target="_blank" rel="noreferrer">{t('referral')}</a>
        <a className="nl" href="https://patient.urgimedical.com/" target="_blank" rel="noreferrer">{t('patient_login')}</a>
        <div style={{ marginTop: 'auto', display: 'grid', gap: 10, paddingTop: 16 }}><CallBtn className="btn btn-primary" /><BookBtn /></div>
      </div></div>}
    </>
  );
};

const StickyCall = ({ loc }) => (
  <div className="sticky-call"><CallBtn loc={loc} className="btn btn-primary" /><BookBtn slug={loc && loc.slug} className="btn btn-outline" /></div>
);

const Footer = () => {
  const { t, lang } = useLang();
  return (
    <footer className="footer"><div className="wrap">
      <div className="footer-grid">
        <div>
          <img src="img/logo-horizontal.png" alt="UrgiMed" style={{ height: 44, filter: 'brightness(0) invert(1)', opacity: .92, marginBottom: 16 }} />
          <p style={{ maxWidth: 280, lineHeight: 1.7 }}>{t('footer_tag')}</p>
          <div style={{ display: 'flex', gap: 10, marginTop: 18 }}><a className="icon-box sm inv" href="https://www.facebook.com/UrgimedCare" target="_blank" rel="noreferrer" aria-label="Facebook"><I.fb s={18} /></a><a className="icon-box sm inv" href="https://www.instagram.com/UrgimedCare/" target="_blank" rel="noreferrer" aria-label="Instagram"><I.ig s={18} /></a></div>
        </div>
        <div><h4>{t('footer_injuries')}</h4><div style={{ display: 'grid', gap: 8 }}>{INJURIES.map(i => <A key={i.slug} to={'/injuries/' + i.slug}>{L(i.name, lang)}</A>)}</div></div>
        <div><h4>{t('nav_services')}</h4><div style={{ display: 'grid', gap: 8 }}>{SERVICES.slice(0, 6).map(s => <A key={s.id} to={'/services/' + s.id}>{L(s, lang)}</A>)}<A to="/services" style={{ color: 'var(--sage)', fontWeight: 600 }}>{t('all_services')} →</A></div></div>
        <div><h4>{t('nav_doctors')}</h4><div style={{ display: 'grid', gap: 8 }}>{DOCTORS.map(d => <A key={d.id} to={'/doctors/' + d.id}>{d.name.split(',')[0]}</A>)}</div></div>
        <div><h4>{t('nav_resources')}</h4><div style={{ display: 'grid', gap: 8 }}><A to="/about">{t('nav_about')}</A><A to="/first-visit">{t('nav_firstvisit')}</A><A to="/pip-insurance">{t('nav_pip')}</A><A to="/faq">{t('nav_faq')}</A><A to="/blog">{t('nav_blog')}</A><A to="/reviews">{t('nav_reviews')}</A><A to="/patient-resources">{t('nav_patient_resources')}</A></div></div>
        <div><h4>{lang === 'en' ? 'Quick links' : 'Enlaces rápidos'}</h4><div style={{ display: 'grid', gap: 8 }}><A to="/for-attorneys">{t('nav_attorneys')}</A><A to="/for-providers">{t('nav_providers')}</A><A to="/appointment">{t('book_appt')}</A><a href="https://urgimedical.com/referral" target="_blank" rel="noreferrer">{t('referral')}</a><a href="https://patient.urgimedical.com/" target="_blank" rel="noreferrer">{t('patient_login')}</a></div></div>
      </div>
      <div className="footer-contact">
        <span><I.phone s={15} /><a href={'tel:' + MAIN_PHONE.tel} style={{ color: '#fff', fontWeight: 700 }}>{MAIN_PHONE.display}</a></span>
        <span><I.mail s={15} /><a href={'mailto:' + EMAIL}>{EMAIL}</a></span>
        <span><I.clock s={15} />{L(HOURS, lang)}</span>
      </div>
      <div className="footer-cta">
        <div><h3>{t('footer_cta_h')}</h3><p>{t('footer_cta_p')}</p></div>
        <A to="/locations" className="btn btn-sage btn-lg"><I.pin s={16} /> {t('find_clinic')}</A>
      </div>
      <div className="footer-bottom"><span>© 2026 UrgiMed, LLC. {t('rights')}</span><span style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}><a href="#">{t('privacy')}</a><a href="#">{t('hipaa')}</a><a href="#">{t('terms')}</a><A to="/sitemap">{t('nav_sitemap')}</A></span></div>
    </div></footer>
  );
};

const AttorneyBand = () => {
  const { t, lang } = useLang();
  return (
    <section className="sec-tight ink-bg"><div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
      <div style={{ maxWidth: 680 }}><div className="eyebrow inv" style={{ marginBottom: 6 }}>{t('attorney_h')}</div><p style={{ fontSize: '1.05rem' }}>{lang === 'en' ? 'Same-day scheduling · LOPs accepted · Records in days' : 'Citas el mismo día · LOP aceptadas · Expedientes en días'}</p></div>
      <div className="cta-row"><A to="/for-attorneys" className="btn btn-primary">{t('attorney_cta')}</A><a href="https://urgimedical.com/referral" target="_blank" rel="noreferrer" className="btn btn-outline">{t('referral')}</a></div>
    </div></section>
  );
};

const RuleBox = ({ loc }) => {
  const { t } = useLang();
  return (
    <div className="rule-box">
      <div className="big">14</div>
      <div><h3>{t('rule_h')}</h3><p style={{ fontSize: '.95rem' }}>{t('rule_body')}</p></div>
      <CallBtn loc={loc} className="btn btn-primary" label={t('call_now')} />
    </div>
  );
};

const ClinicCTA = ({ h, sub }) => {
  const { t, lang } = useLang();
  return (
    <section className="sec cream-bg"><div className="wrap">
      <SectionHead h={h || t('injury_cta_h')} sub={sub || t('injury_cta_sub')} />
      <div className="grid g4">{LOCATIONS.map(l => (
        <A key={l.slug} to={'/locations/' + l.slug} className="card card-hover" style={{ borderRadius: 3, padding: '14px 16px', color: 'var(--ink)', display: 'flex', flexDirection: 'column', gap: 2, borderTop: '3px solid var(--sage)' }}>
          <b style={{ fontSize: '.98rem' }}>{L(l.label, lang)}</b><span style={{ color: 'var(--t6)', fontWeight: 600, fontSize: '.92rem' }}>{l.phone}</span>
        </A>
      ))}</div>
    </div></section>
  );
};

const PageHead = ({ eyebrow, h1, sub, crumb, img, children }) => {
  const { t } = useLang();
  return (
    <section className="inner-head">{img && <img className="bg" src={img} alt="" />}<div className="wrap">
      <div className="crumb"><A to="/">{t('home')}</A><span>›</span>{crumb ? <>{crumb}</> : <span>{eyebrow}</span>}</div>
      <h1>{h1}</h1>
      {sub && <p className="lead">{sub}</p>}
      <span className="decor" style={{ marginTop: 16, background: 'transparent', borderColor: 'var(--sage)' }}><span className="inner" style={{ background: 'var(--sage)' }}></span></span>
      {children}
    </div></section>
  );
};

Object.assign(window, { LangCtx, useLang, L, svc, locBySlug, nav, A, I, Stars, Rating, CallBtn, BookBtn, ClinicCard, FAQList, Accordion, TiWidget, SectionHead, Nav, StickyCall, Footer, AttorneyBand, RuleBox, ClinicCTA, PageHead });
