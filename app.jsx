// Router + language + SEO panel
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{ "showSeo": false, "lang": "en" }/*EDITMODE-END*/;

const parseHash = () => {
  const h = (window.location.hash || '#/').slice(1);
  const [path, qs] = h.split('?');
  const query = Object.fromEntries(new URLSearchParams(qs || ''));
  return { path: path || '/', query };
};

const seoFor = (path, lang) => {
  const t = I18N[lang];
  if (path === '/') return { title: 'Car Accident & Injury Clinics in Florida | UrgiMed', desc: 'Same-day care for car accident, slip & fall, work and sports injuries at our Kissimmee, Davenport, Winter Haven, Lakeland & Tampa clinics. Se habla español.', h1: t.hero_h1, schema: 'MedicalOrganization' };
  if (path === '/locations') return { title: 'UrgiMed Locations: Kissimmee, Davenport, Winter Haven, Lakeland & Tampa', desc: 'Find your nearest UrgiMed injury clinic. Addresses, hours and local phone numbers for Kissimmee, Davenport and Winter Haven — plus the Orlando, Tallahassee and Sebring areas we serve.', h1: t.all_locations_h, schema: 'ItemList' };
  if (path.startsWith('/locations/')) { const l = locBySlug(path.split('/')[2]); if (l) return { title: l.title, desc: l.desc, h1: `Auto Accident Doctors in ${l.city}, FL — UrgiMed ${L(l.label, lang)}`, schema: 'MedicalClinic + FAQPage', loc: l }; }
  if (path === '/privacy') return { title: 'Privacy & Cookie Policy | UrgiMed', desc: 'How UrgiMed collects, uses and protects your information on urgimedical.com, and how to manage cookies.', h1: 'Privacy & Cookie Policy', schema: 'WebPage' };
  if (path.startsWith('/injuries/')) { const i = INJURIES.find(x => x.slug === path.split('/')[2]); if (i) return { title: i.title, desc: i.desc, h1: L(i.h1, lang), schema: 'MedicalWebPage + FAQPage' }; }
  if (path.startsWith('/doctors/')) { const d = DOCTORS.find(x => x.id === path.split('/')[2]); if (d) return { title: `${d.name.split(',')[0]}, ${L(d.role, lang)} | UrgiMed`, desc: `Meet ${d.name}, ${L(d.role, lang)} at UrgiMed. ${L(d.spec, lang)}. Same-day appointments at our Florida clinics.`, h1: d.name, schema: 'Physician', doc: d }; }
  if (path === '/services') return { title: 'Accident & Injury Services in Florida | UrgiMed', desc: 'Chiropractic, physical therapy, pain management, orthopedics, neurology, PRP, X-ray and nerve testing at 11 UrgiMed clinics in Florida.', h1: t.services_page_h, schema: 'ItemList' };
  if (path.startsWith('/services/')) { const s = SERVICE_DETAILS[path.split('/')[2]]; if (s) return { title: s.title, desc: s.desc, h1: L(s.h1, lang), schema: 'MedicalProcedure / MedicalWebPage' }; }
  if (path === '/doctors') return { title: 'Our Physicians: Orthopedic, Pain & Accident Doctors | UrgiMed', desc: 'Meet UrgiMed’s board-certified orthopedic surgeons, pain medicine, neurology and accident care physicians serving our Central Florida clinics.', h1: t.doctors_h, schema: 'Physician (×6)' };
  if (path === '/first-visit') return { title: 'Your First Visit at UrgiMed: What to Expect After an Accident', desc: 'From your first call to your treatment plan: how UrgiMed evaluates, documents and treats accident injuries within Florida’s 14-day rule.', h1: t.fv_title, schema: 'HowTo' };
  if (path === '/for-attorneys') return { title: 'Personal Injury Treatment Partner for Attorneys | UrgiMed', desc: 'Same-day scheduling for your clients, LOPs accepted, fast records and EMC documentation. Contact our case-manager line.', h1: t.atty_title, schema: 'MedicalOrganization' };
  if (path === '/blog') return { title: 'Injury Recovery Blog: Car Accidents, PIP & Pain | UrgiMed', desc: 'Physician-reviewed articles on car accident injuries, Florida’s 14-day PIP rule, whiplash, concussion, slip and fall and workers’ comp from UrgiMed.', h1: t.blog_h1, schema: 'Blog' };
  if (path.startsWith('/blog/')) { const b = BLOG_POSTS.find(x => x.slug === path.split('/')[2]); if (b) { const ti = L(b.title, lang); return { title: (b.seoTitle || ti) + ' | UrgiMed', desc: L(b.excerpt, lang).slice(0, 155), h1: ti, schema: 'BlogPosting + FAQPage', post: b }; } }
  if (path === '/injuries') return { title: 'Injuries We Treat: Car Accident, Slip & Fall, Work, Sports | UrgiMed', desc: 'Physician-led care for car accident, slip and fall, work and sports injuries at our Central Florida clinics. Symptom finder, same-day appointments, on-site imaging.', h1: 'Injuries We Treat', schema: 'MedicalWebPage' };
  if (path === '/pip-insurance') return { title: 'Florida PIP Insurance & Payment Options | UrgiMed', desc: 'How Florida PIP works: the 14-day rule, EMC, what it covers. UrgiMed also accepts health insurance, workers’ comp and Letters of Protection.', h1: 'Florida PIP Insurance & Payment Options After an Accident', schema: 'MedicalWebPage + FAQPage' };
  if (path === '/reviews') return { title: 'UrgiMed Patient Reviews | Google Ratings by Clinic', desc: 'Read Google reviews from UrgiMed patients across our Florida clinics. Davenport rated 5.0 by 130+ patients.', h1: 'UrgiMed Patient Reviews', schema: 'MedicalOrganization + AggregateRating' };
  if (path === '/patient-resources') return { title: 'Patient Resources: Forms, Records, Insurance | UrgiMed', desc: 'What to bring, transportation assistance, records request, no surprise billing and patient portal for UrgiMed patients in Florida.', h1: 'Patient Resources', schema: 'WebPage' };
  if (path === '/for-providers') return { title: 'Refer a Patient: Hospitals, ERs & Providers | UrgiMed', desc: 'Physician-led injury follow-up for your discharged accident patients. Next-day appointments, EMC documentation, reports back to you. 4 Central Florida clinics.', h1: 'Refer a Patient: Hospitals, ERs & Medical Providers', schema: 'MedicalOrganization' };
  if (path === '/sitemap') return { title: 'Sitemap | UrgiMed', desc: 'All UrgiMed pages: injuries, services, clinic locations, physicians and blog.', h1: 'Sitemap', schema: '—' };
  if (path === '/faq') return { title: 'Car Accident & Injury FAQ: PIP, 14-Day Rule, Lawyers | UrgiMed', desc: 'Answers to the questions accident patients ask most: the 14-day rule, PIP, seeing a doctor without a lawyer, what to bring and same-day visits.', h1: t.faq_h, schema: 'FAQPage' };
  if (path === '/about') return { title: 'About UrgiMed: Florida Accident & Injury Medical Group', desc: 'UrgiMed is a Florida multi-specialty group with accident and injury clinics, headquartered in Davenport. Board-certified physicians, bilingual staff.', h1: t.about_title, schema: 'MedicalOrganization' };
  if (path === '/appointment') return { title: 'Book a Same-Day Appointment | UrgiMed', desc: 'Request a same-day appointment at any of our 4 UrgiMed clinics in Central Florida. We call you back to confirm.', h1: t.appt_title, schema: '—' };
  return { title: 'UrgiMed', desc: '', h1: '', schema: '—' };
};

const crumbsFor = (path, seo) => { const parts = path.split('/').filter(Boolean); const items = [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://urgimedical.com/' }]; let acc = ''; parts.forEach((p, i) => { acc += '/' + p; items.push({ '@type': 'ListItem', position: i + 2, name: i === parts.length - 1 ? seo.h1 : p.replace(/-/g, ' '), item: 'https://urgimedical.com' + acc }); }); return { '@type': 'BreadcrumbList', itemListElement: items }; };
const schemaFor = (seo, lang) => {
  const main = schemaMain(seo, lang); const path = window.location.hash.slice(1).split('?')[0] || '/';
  return { '@context': 'https://schema.org', '@graph': path === '/' ? [main] : [main, crumbsFor(path, seo)] };
};
const schemaMain = (seo, lang) => {
  if (seo.loc) { const l = seo.loc; return { '@type': 'MedicalClinic', name: 'UrgiMed ' + l.city, url: 'https://urgimedical.com/locations/' + l.slug, telephone: l.tel, email: l.email, address: { '@type': 'PostalAddress', streetAddress: l.street, addressLocality: l.city, addressRegion: 'FL', postalCode: l.cityState.slice(-5), addressCountry: 'US' }, openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '13:00' }, { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '14:00', closes: '18:00' }], medicalSpecialty: ['Chiropractic', 'PhysicalTherapy', 'Orthopedic', 'PainManagement'], availableLanguage: ['en', 'es'], parentOrganization: { '@type': 'MedicalOrganization', name: 'UrgiMed', url: 'https://urgimedical.com' }, sameAs: ['https://www.facebook.com/UrgimedCare', 'https://www.instagram.com/UrgimedCare/'] }; }
  if (seo.post) { const b = seo.post, d = DOCTORS.find(x => x.id === b.reviewer); return { '@type': 'BlogPosting', headline: L(b.title, lang), image: 'https://urgimedical.com/' + b.img, datePublished: b.date, dateModified: b.date, author: { '@type': 'Organization', name: 'UrgiMed' }, reviewedBy: d ? { '@type': 'Physician', name: d.name } : undefined, publisher: { '@type': 'MedicalOrganization', name: 'UrgiMed', url: 'https://urgimedical.com' }, mainEntityOfPage: 'https://urgimedical.com/blog/' + b.slug, inLanguage: lang }; }
  if (seo.doc) { const d = seo.doc, b = DOCTOR_BIOS[d.id] || {}; return { '@type': 'Physician', name: d.name, image: b.photo, medicalSpecialty: L(d.spec, lang), worksFor: { '@type': 'MedicalOrganization', name: 'UrgiMed', url: 'https://urgimedical.com' }, knowsLanguage: d.langs, url: 'https://urgimedical.com/doctors/' + d.id }; }
  return { '@type': 'MedicalOrganization', '@id': 'https://urgimedical.com/#organization', name: 'UrgiMed', legalName: 'UrgiMed, LLC', alternateName: 'UrgiMedical', slogan: 'Live Life Limitless', url: 'https://urgimedical.com', logo: 'https://urgimedical.com/img/logo-horizontal.png', image: 'https://urgimedical.com/img/hero-pt-care.jpg', description: lang === 'es' ? 'Grupo médico multiespecialidad de Florida dedicado a la recuperación de accidentes y lesiones: accidentes de auto, caídas, lesiones laborales y deportivas.' : 'Florida multi-specialty medical group for accident and injury recovery: car accident, slip and fall, work and sports injuries.', telephone: MAIN_PHONE.tel, email: EMAIL, address: { '@type': 'PostalAddress', streetAddress: '131 Webb Drive, Suite A', addressLocality: 'Davenport', addressRegion: 'FL', postalCode: '33837', addressCountry: 'US' }, contactPoint: [{ '@type': 'ContactPoint', telephone: MAIN_PHONE.tel, contactType: 'customer service', areaServed: 'US-FL', availableLanguage: ['English', 'Spanish'] }, { '@type': 'ContactPoint', email: EMAIL, contactType: 'reservations', availableLanguage: ['English', 'Spanish'] }], openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '13:00' }, { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '14:00', closes: '18:00' }], medicalSpecialty: ['Orthopedic', 'PainManagement', 'Neurology', 'Chiropractic', 'PhysicalTherapy', 'PrimaryCare'], areaServed: [{ '@type': 'State', name: 'Florida' }, ...LOCATIONS.map(l => ({ '@type': 'City', name: l.city }))], department: LOCATIONS.map(l => ({ '@type': 'MedicalClinic', name: 'UrgiMed ' + l.city, url: 'https://urgimedical.com/locations/' + l.slug, telephone: l.tel, email: l.email, address: { '@type': 'PostalAddress', streetAddress: l.street, addressLocality: l.city, addressRegion: 'FL', postalCode: l.cityState.slice(-5), addressCountry: 'US' } })), paymentAccepted: ['PIP (auto insurance)', 'Workers’ compensation', 'Letters of Protection', 'Health insurance'], knowsLanguage: ['en', 'es'], availableLanguage: ['en', 'es'], sameAs: ['https://www.facebook.com/UrgimedCare', 'https://www.instagram.com/UrgimedCare/'] };
};

const SeoBar = ({ seo }) => {
  const { t } = useLang();
  const len = (s, max) => <span className={s.length <= max ? 'ok' : ''} style={{ color: s.length <= max ? undefined : '#f5a3a3' }}> ({s.length}/{max})</span>;
  return (
    <div className="seo-bar"><div className="wrap">
      <b>{t('seo_title')}</b><span>{seo.title}{len(seo.title, 60)}</span>
      <b>{t('seo_desc')}</b><span>{seo.desc}{len(seo.desc, 155)}</span>
      <b>{t('seo_h1')}</b><span>{seo.h1}</span>
      <b>{t('seo_schema')}</b><span className="ok">{seo.schema}</span>
    </div></div>
  );
};

const Tweaks = ({ tweaks, onChange, visible }) => {
  if (!visible) return null;
  return (
    <div className="tweaks">
      <b style={{ fontSize: '.8rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--mute)' }}>Tweaks</b>
      <label>SEO metadata bar <input type="checkbox" checked={tweaks.showSeo} onChange={e => onChange({ showSeo: e.target.checked })} /></label>
      <label>Language <select value={tweaks.lang} onChange={e => onChange({ lang: e.target.value })}><option value="en">English</option><option value="es">Español</option></select></label>
    </div>
  );
};

const App = () => {
  const [route, setRoute] = React.useState(parseHash);
  const [tweaks, setTweaks] = React.useState(() => ({ ...TWEAK_DEFAULTS, lang: localStorage.getItem('urgimed_lang') || TWEAK_DEFAULTS.lang }));
  const [editMode, setEditMode] = React.useState(false);
  const lang = tweaks.lang;
  React.useEffect(() => {
    const onHash = () => { setRoute(parseHash()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', onHash);
    const onMsg = (e) => { if (e.data?.type === '__activate_edit_mode') setEditMode(true); if (e.data?.type === '__deactivate_edit_mode') setEditMode(false); };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => { window.removeEventListener('hashchange', onHash); window.removeEventListener('message', onMsg); };
  }, []);
  const change = (u) => { const next = { ...tweaks, ...u }; setTweaks(next); if (u.lang) localStorage.setItem('urgimed_lang', u.lang); window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { showSeo: next.showSeo, lang: next.lang } }, '*'); };
  const setLang = (l) => change({ lang: l });
  const ctx = React.useMemo(() => ({ lang, t: (k) => I18N[lang][k] ?? I18N.en[k] ?? k, L: (o) => L(o, lang) }), [lang]);
  const seo = seoFor(route.path, lang);
  React.useEffect(() => {
    document.title = seo.title; document.documentElement.lang = lang;
    let m = document.querySelector('meta[name="description"]'); if (m) m.setAttribute('content', seo.desc);
    const og = (k, v, attr = 'property') => { let e = document.querySelector('meta[' + attr + '="' + k + '"]'); if (!e) { e = document.createElement('meta'); e.setAttribute(attr, k); document.head.appendChild(e); } e.setAttribute('content', v); };
    const cleanUrl = 'https://urgimedical.com' + (route.path === '/' ? '/' : route.path);
    const ogImg = 'https://urgimedical.com/' + (seo.post ? seo.post.img : seo.loc ? 'img/w-facade.jpg' : seo.doc && DOCTOR_BIOS[seo.doc.id] && DOCTOR_BIOS[seo.doc.id].photo && !DOCTOR_BIOS[seo.doc.id].photo.startsWith('http') ? DOCTOR_BIOS[seo.doc.id].photo : 'img/hero-pt-care.jpg');
    og('og:title', seo.title); og('og:description', seo.desc); og('og:url', cleanUrl); og('og:image', ogImg); og('og:type', seo.post ? 'article' : 'website'); og('og:locale', lang === 'es' ? 'es_US' : 'en_US');
    og('twitter:title', seo.title, 'name'); og('twitter:description', seo.desc, 'name'); og('twitter:image', ogImg, 'name');
    const cl = document.querySelector('link[rel="canonical"]'); if (cl) cl.setAttribute('href', cleanUrl);
    let s = document.getElementById('ld-json'); if (!s) { s = document.createElement('script'); s.id = 'ld-json'; s.type = 'application/ld+json'; document.head.appendChild(s); }
    s.textContent = JSON.stringify(schemaFor(seo, lang));
  }, [route.path, lang]);
  // soft entrance animations
  React.useEffect(() => {
    const sel = 'main section:not(.banner) > .wrap > *, main section:not(.banner) > .wrap > .grid > *, main .cta3 > *, main .quick .grid > *, main .two > *, main .full > *, main .profile > *, main .facts .row > *, main .inner-head .wrap > *';
    const els = Array.from(document.querySelectorAll(sel)).filter(e => !e.closest('[data-rv]') || e.parentElement.classList.contains('grid'));
    const io = new IntersectionObserver((entries) => { entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }); }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    els.forEach((e, i) => { if (e.classList.contains('in')) return; e.setAttribute('data-rv', ''); const sib = Array.from(e.parentElement.children).indexOf(e); e.style.transitionDelay = Math.min(sib, 7) * 70 + 'ms'; io.observe(e); });
    const t = setTimeout(() => els.forEach(e => { const r = e.getBoundingClientRect(); if (r.top < innerHeight) e.classList.add('in'); }), 900);
    return () => { io.disconnect(); clearTimeout(t); };
  }, [route.path, lang]);

  const p = route.path;
  let page, loc = null;
  if (p === '/') page = <Home />;
  else if (p === '/locations') page = <LocationsIndex />;
  else if (p.startsWith('/locations/')) { loc = locBySlug(p.split('/')[2]); page = <LocationPage slug={p.split('/')[2]} />; }
  else if (p.startsWith('/injuries/')) page = <InjuryPage slug={p.split('/')[2]} />;
  else if (p === '/services') page = <ServicesIndex />;
  else if (p.startsWith('/services/')) page = <ServicePage id={p.split('/')[2]} />;
  else if (p === '/doctors') page = <Doctors />;
  else if (p.startsWith('/doctors/')) page = <DoctorPage id={p.split('/')[2]} />;
  else if (p === '/first-visit') page = <FirstVisit />;
  else if (p === '/for-attorneys') page = <ForAttorneys />;
  else if (p === '/blog') page = <BlogIndex query={route.query} key={route.query.cat || ''} />;
  else if (p.startsWith('/blog/')) page = <BlogPost slug={p.split('/')[2]} />;
  else if (p === '/injuries') page = <InjuriesIndex />;
  else if (p === '/pip-insurance') page = <PipInsurance />;
  else if (p === '/reviews') page = <Reviews />;
  else if (p === '/patient-resources') page = <PatientResources />;
  else if (p === '/for-providers') page = <ForProviders />;
  else if (p === '/sitemap') page = <Sitemap />;
  else if (p === '/faq') page = <FAQPage />;
  else if (p === '/about') page = <About />;
  else if (p === '/appointment') page = <Appointment query={route.query} key={route.query.c || ''} />;
  else if (p === '/privacy') page = <Privacy />;
  else page = <NotFound />;
  const heroImg = (() => { const s = p.split('/')[2] || ''; if (p.startsWith('/injuries/')) return { 'car-accident': 'w-car-accident', 'slip-and-fall': 'w-slip-and-fall', 'work-injury': 'w-work-injury', 'sports-injury': 'w-sports-injury' }[s] || 'w-crash-dummy'; if (p === '/injuries' || p === '/pip-insurance') return 'w-crash-dummy'; if (p.startsWith('/services/')) return /therapy|pt/.test(s) ? 'w-pt-guiding-1' : /neuro/.test(s) ? 'neurology-doctor' : /primary/.test(s) ? 'primary-care' : /ortho/.test(s) ? 'ortho-knee' : /laser/.test(s) ? 'w-cold-laser-1' : /prp|regen/.test(s) ? 'prp-syringe' : /psych/.test(s) ? 'psychology' : /chiro|spine|neck/.test(s) ? 'w-cervical-spine' : 'w-xray-display'; if (p === '/services') return 'w-xray-display'; if (p.startsWith('/doctors') || p === '/reviews' || p === '/about') return 'w-about-team'; if (p.startsWith('/locations') || p.startsWith('/areas')) return 'w-facade'; if (p === '/for-attorneys' || p === '/for-providers') return 'w-xray-lightbox'; if (p.startsWith('/blog')) return 'w-cervical-spine'; return 'w-receptionist'; })();

  React.useEffect(() => { document.body.classList.toggle('is-home', p === '/'); }, [p]);
  return (
    <LangCtx.Provider value={ctx}>
      {tweaks.showSeo && <SeoBar seo={seo} />}
      <Nav route={p} lang={lang} setLang={setLang} />
      <div key={p + lang + (route.query.cat || '')} data-screen-label={p} style={{ '--hero-img': `url(img/${heroImg}.jpg)` }}>{page}</div>
      <Footer />
      <StickyCall loc={loc} />
      <HelpChat />
      <CookieBanner />
      <Tweaks tweaks={tweaks} onChange={change} visible={editMode} />
    </LangCtx.Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
