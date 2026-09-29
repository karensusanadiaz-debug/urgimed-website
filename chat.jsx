// UrgiMed help chat — guided assistant (EN/ES) for navigation + contact
const CHAT_T = {
  en: {
    title: 'UrgiMed Care Team', open: 'Online now · replies in minutes', closed: 'Offline · we reply next business day', menu: 'Menu', close: 'Close chat', launch: 'Chat with us',
    nudge: 'Hi! Need help after an accident or finding a clinic?', placeholder: 'Type a message…', send: 'Send',
    hello: 'Hi, I’m the UrgiMed assistant. I can help you book a same-day visit, find your nearest clinic, or connect you with our team. What do you need?',
    q_accident: 'I was in an accident', q_book: 'Book an appointment', q_clinic: 'Find a clinic near me', q_ins: 'Insurance & PIP', q_team: 'Talk to the team', q_pro: 'I’m an attorney / provider', q_menu: 'Back to menu',
    accident: 'I’m sorry to hear that. Florida’s PIP law requires you to see a doctor within 14 days of the crash to keep up to $10,000 in benefits — we can see you today.',
    a_book: 'Book a same-day visit', a_call: 'Call now', a_find: 'Find my nearest clinic', a_rule: 'How the 14-day rule works',
    book: 'Which clinic would you like to visit?', book_pick: 'Great choice. Here’s your clinic:', a_online: 'Book online', a_callclinic: 'Call this clinic', a_callback: 'Ask the team to call me',
    clinic: 'Type your city or ZIP code and I’ll find the closest UrgiMed clinic.', clinic_found: 'Here’s what I found near you:', clinic_none: 'We don’t have a clinic in that area yet. These are our closest options — or browse the map:', a_all: 'See all 11 clinics',
    ins: 'We accept PIP (auto insurance), workers’ comp, most health plans and Letters of Protection — and we bill PIP directly, so no upfront cost after a crash.', a_pip: 'How PIP works', a_res: 'Patient resources',
    team: 'Happy to connect you. How would you like to reach us?', a_email: 'Email us', a_request: 'Request a callback',
    cb_name: 'Sure — what’s your name?', cb_phone: 'Thanks {name}. What’s the best phone number to reach you?', cb_topic: 'And what is this about?', cb_done: 'All set, {name}! A team member will call {phone} during business hours ({hours}). For anything urgent, call {mainphone}.',
    t_appt: 'Appointment', t_ins: 'Insurance / billing', t_records: 'Medical records', t_other: 'Something else',
    pro: 'Welcome. Which best describes you?', a_att: 'For Attorneys', a_prov: 'For Providers & ERs', a_ref: 'Refer a patient',
    hours: 'Our clinics are open {hours}. Same-day appointments are available.', doctors: 'Meet our physicians — board-certified and bilingual.', a_docs: 'See our doctors',
    injuries: 'We treat car accident, slip & fall, work and sports injuries. Which one?', i_car: 'Car accident', i_fall: 'Slip & fall', i_work: 'Work injury', i_sport: 'Sports injury',
    fallback: 'I’m not sure I understood. I can help with the options below — or connect you with a real person.', invalid_phone: 'That doesn’t look like a phone number. Could you re-enter it (e.g. 407-555-0100)?',
    foot: 'Not for emergencies — call 911. This chat does not provide medical advice.', you: 'You', typing: 'typing',
  },
  es: {
    title: 'Equipo UrgiMed', open: 'En línea · respondemos en minutos', closed: 'Fuera de horario · respondemos el próximo día hábil', menu: 'Menú', close: 'Cerrar chat', launch: 'Chatea con nosotros',
    nudge: '¡Hola! ¿Necesita ayuda tras un accidente o para encontrar una clínica?', placeholder: 'Escriba un mensaje…', send: 'Enviar',
    hello: 'Hola, soy el asistente de UrgiMed. Puedo ayudarle a agendar una cita para hoy, encontrar su clínica más cercana o conectarle con nuestro equipo. ¿Qué necesita?',
    q_accident: 'Tuve un accidente', q_book: 'Agendar una cita', q_clinic: 'Buscar una clínica cercana', q_ins: 'Seguros y PIP', q_team: 'Hablar con el equipo', q_pro: 'Soy abogado / proveedor', q_menu: 'Volver al menú',
    accident: 'Lamento escucharlo. La ley PIP de Florida exige ver a un médico dentro de 14 días del choque para conservar hasta $10,000 en beneficios — podemos atenderle hoy.',
    a_book: 'Agendar cita para hoy', a_call: 'Llamar ahora', a_find: 'Buscar mi clínica más cercana', a_rule: 'Cómo funciona la regla de 14 días',
    book: '¿Qué clínica le gustaría visitar?', book_pick: 'Excelente. Esta es su clínica:', a_online: 'Agendar en línea', a_callclinic: 'Llamar a esta clínica', a_callback: 'Que el equipo me llame',
    clinic: 'Escriba su ciudad o código postal y buscaré la clínica UrgiMed más cercana.', clinic_found: 'Esto encontré cerca de usted:', clinic_none: 'Aún no tenemos clínica en esa zona. Estas son las más cercanas — o vea el mapa:', a_all: 'Ver las 11 clínicas',
    ins: 'Aceptamos PIP (seguro de auto), compensación laboral, la mayoría de planes de salud y Cartas de Protección — y facturamos al PIP directamente, sin costo inicial tras un choque.', a_pip: 'Cómo funciona PIP', a_res: 'Recursos para pacientes',
    team: 'Con gusto le conecto. ¿Cómo prefiere comunicarse?', a_email: 'Enviar correo', a_request: 'Solicitar una llamada',
    cb_name: 'Claro — ¿cuál es su nombre?', cb_phone: 'Gracias {name}. ¿A qué número podemos llamarle?', cb_topic: '¿Y sobre qué tema es?', cb_done: '¡Listo, {name}! Un miembro del equipo llamará al {phone} en horario de atención ({hours}). Para algo urgente, llame al {mainphone}.',
    t_appt: 'Cita', t_ins: 'Seguro / facturación', t_records: 'Registros médicos', t_other: 'Otro tema',
    pro: 'Bienvenido. ¿Qué le describe mejor?', a_att: 'Para abogados', a_prov: 'Para proveedores y ER', a_ref: 'Referir un paciente',
    hours: 'Nuestras clínicas abren {hours}. Hay citas disponibles el mismo día.', doctors: 'Conozca a nuestros médicos — certificados y bilingües.', a_docs: 'Ver nuestros médicos',
    injuries: 'Tratamos accidentes de auto, caídas, lesiones laborales y deportivas. ¿Cuál?', i_car: 'Accidente de auto', i_fall: 'Resbalón y caída', i_work: 'Lesión laboral', i_sport: 'Lesión deportiva',
    fallback: 'No estoy seguro de haber entendido. Puedo ayudarle con las opciones abajo — o conectarle con una persona.', invalid_phone: 'Eso no parece un número de teléfono. ¿Puede escribirlo de nuevo (ej. 407-555-0100)?',
    foot: 'No es para emergencias — llame al 911. Este chat no ofrece consejo médico.', you: 'Usted', typing: 'escribiendo',
  },
};
const fmt = (s, o) => s.replace(/\{(\w+)\}/g, (_, k) => o[k] ?? '');
const isOpenNow = () => { const d = new Date(); const day = d.getDay(), h = d.getHours(); return day >= 1 && day <= 5 && h >= 9 && h < 18 && h !== 13; };
const findClinics = (q) => {
  const s = q.toLowerCase().trim(); if (!s) return [];
  const zip = s.match(/\b\d{5}\b/);
  return LOCATIONS.filter(l => (zip && l.cityState.includes(zip[0])) || l.city.toLowerCase().includes(s) || L(l.label, 'en').toLowerCase().includes(s) || (l.areas || []).some(a => a.toLowerCase().includes(s)) || s.split(/[\s,]+/).some(w => w.length > 3 && (l.city.toLowerCase().includes(w) || (l.areas || []).some(a => a.toLowerCase().includes(w))))).slice(0, 3);
};
const routeText = (raw, lang) => {
  const s = raw.toLowerCase();
  if (/\b(accident|crash|choque|accidente|whiplash|latigazo|rear.?end|hit)\b/.test(s)) return 'accident';
  if (/(appointment|book|schedule|cita|agendar|reserv)/.test(s)) return 'book';
  if (/(human|person|agent|someone|representative|persona|alguien|agente|equipo|team)/.test(s)) return 'team';
  if (/(attorney|lawyer|abogado|provider|referr|refer|lop|letter of protection)/.test(s)) return 'pro';
  if (/(insurance|pip|seguro|workers|comp|bill|factur|cost|pay|pagar|precio|price)/.test(s)) return 'ins';
  if (/(hour|open|close|horario|abierto|cierra|abre)/.test(s)) return 'hours';
  if (/(doctor|médico|medico|physician|surgeon|cirujano)/.test(s)) return 'doctors';
  if (/(slip|fall|caída|caida|work injur|trabajo|sport|deport|injur|lesi)/.test(s)) return 'injuries';
  if (/(phone|call|llamar|teléfono|telefono|number|número|numero|email|correo|contact)/.test(s)) return 'team';
  if (/(clinic|location|near|cerca|clínica|clinica|ubicaci|where|dónde|donde|address|direcci|map)/.test(s)) return 'clinic';
  return null;
};

const ChatIcon = ({ s = 26 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a8 8 0 0 1-8 8H7l-4 3V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8z"/><path d="M8 11h8M8 14.5h5"/></svg>;

const HelpChat = () => {
  const { lang } = useLang();
  const T = CHAT_T[lang] || CHAT_T.en;
  const c = (k, o) => fmt(T[k] || CHAT_T.en[k] || k, o || {});
  const [open, setOpen] = React.useState(false);
  const [msgs, setMsgs] = React.useState([]);
  const [quick, setQuick] = React.useState([]);
  const [typing, setTyping] = React.useState(false);
  const [text, setText] = React.useState('');
  const [mode, setMode] = React.useState(null); // null | 'find' | 'cb_name' | 'cb_phone' | 'cb_topic'
  const [cb, setCb] = React.useState({});
  const [unread, setUnread] = React.useState(0);
  const [nudge, setNudge] = React.useState(false);
  const listRef = React.useRef(null), inputRef = React.useRef(null), started = React.useRef(false), timers = React.useRef([]);
  const openNow = isOpenNow();

  React.useEffect(() => { if (sessionStorage.getItem('um_chat_nudged')) return; const t = setTimeout(() => { if (!open) { setNudge(true); sessionStorage.setItem('um_chat_nudged', '1'); } }, 7000); return () => clearTimeout(t); }, []);
  React.useEffect(() => { if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight; }, [msgs, typing, quick]);
  React.useEffect(() => { if (!open) return; const k = (e) => { if (e.key === 'Escape') setOpen(false); }; window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, [open]);
  React.useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const go = (to) => { nav(to); if (window.innerWidth < 700) setOpen(false); };
  const push = (m) => setMsgs(ms => [...ms, { id: Date.now() + Math.random(), ...m }]);
  const bot = (m, delay = 450) => new Promise(res => { setTyping(true); const t = setTimeout(() => { setTyping(false); push({ from: 'bot', ...m }); if (!open) setUnread(u => u + 1); res(); }, delay); timers.current.push(t); });
  const me = (t) => push({ from: 'me', text: t });

  const mainQuick = () => setQuick([['accident', c('q_accident')], ['book', c('q_book')], ['clinic', c('q_clinic')], ['ins', c('q_ins')], ['team', c('q_team')], ['pro', c('q_pro')]]);
  const clinicActions = (l) => [{ label: c('a_online'), to: '/appointment?c=' + l.slug }, { label: c('a_callclinic'), tel: l.tel, sub: l.phone }, { label: L(l.label, lang), to: '/locations/' + l.slug, ghost: true }];

  const flow = async (id, payload) => {
    setMode(null); setQuick([]);
    switch (id) {
      case 'menu': await bot({ text: c('hello') }); mainQuick(); break;
      case 'accident': await bot({ text: c('accident'), actions: [{ label: c('a_book'), to: '/appointment', primary: true }, { label: c('a_call'), tel: MAIN_PHONE.tel, sub: MAIN_PHONE.display }, { label: c('a_find'), do: 'clinic' }, { label: c('a_rule'), to: '/pip-insurance', ghost: true }] }); setQuick([['menu', c('q_menu')]]); break;
      case 'book': await bot({ text: c('book') }); setQuick([...LOCATIONS.map(l => ['pick:' + l.slug, L(l.label, lang)]), ['menu', c('q_menu')]]); break;
      case 'pick': { const l = locBySlug(payload); await bot({ text: c('book_pick'), clinics: [l.slug], actions: [...clinicActions(l), { label: c('a_callback'), do: 'cb', ghost: true }] }); setQuick([['menu', c('q_menu')]]); break; }
      case 'clinic': await bot({ text: c('clinic'), actions: [{ label: c('a_all'), to: '/locations', ghost: true }] }); setMode('find'); setQuick([['menu', c('q_menu')]]); setTimeout(() => inputRef.current && inputRef.current.focus(), 50); break;
      case 'find': { const hits = findClinics(payload); if (hits.length) await bot({ text: c('clinic_found'), clinics: hits.map(l => l.slug), actions: [{ label: c('a_all'), to: '/locations', ghost: true }] }); else await bot({ text: c('clinic_none'), clinics: ['davenport', 'orlando-east-colonial'], actions: [{ label: c('a_all'), to: '/locations', primary: true }] }); setQuick([['book', c('q_book')], ['team', c('q_team')], ['menu', c('q_menu')]]); break; }
      case 'ins': await bot({ text: c('ins'), actions: [{ label: c('a_pip'), to: '/pip-insurance', primary: true }, { label: c('a_res'), to: '/patient-resources' }, { label: c('a_callback'), do: 'cb', ghost: true }] }); setQuick([['menu', c('q_menu')]]); break;
      case 'team': await bot({ text: c('team'), actions: [{ label: c('a_call'), tel: MAIN_PHONE.tel, sub: MAIN_PHONE.display, primary: true }, { label: c('a_email'), href: 'mailto:' + EMAIL, sub: EMAIL }, { label: c('a_request'), do: 'cb' }] }); setQuick([['menu', c('q_menu')]]); break;
      case 'cb': await bot({ text: c('cb_name') }); setMode('cb_name'); setQuick([]); setTimeout(() => inputRef.current && inputRef.current.focus(), 50); break;
      case 'cb_name': setCb({ name: payload }); await bot({ text: c('cb_phone', { name: payload }) }); setMode('cb_phone'); break;
      case 'cb_phone': { const digits = payload.replace(/\D/g, ''); if (digits.length < 10) { await bot({ text: c('invalid_phone') }); setMode('cb_phone'); break; } setCb(x => ({ ...x, phone: payload })); await bot({ text: c('cb_topic') }); setMode('cb_topic'); setQuick([['topic:' + c('t_appt'), c('t_appt')], ['topic:' + c('t_ins'), c('t_ins')], ['topic:' + c('t_records'), c('t_records')], ['topic:' + c('t_other'), c('t_other')]]); break; }
      case 'topic': await bot({ text: c('cb_done', { name: cb.name, phone: cb.phone, hours: L(HOURS, lang), mainphone: MAIN_PHONE.display }), actions: [{ label: c('a_call'), tel: MAIN_PHONE.tel, sub: MAIN_PHONE.display, ghost: true }] }, 700); setQuick([['menu', c('q_menu')]]); break;
      case 'pro': await bot({ text: c('pro'), actions: [{ label: c('a_att'), to: '/for-attorneys', primary: true }, { label: c('a_prov'), to: '/for-providers' }, { label: c('a_ref'), href: 'https://urgimedical.com/referral' }, { label: c('a_callback'), do: 'cb', ghost: true }] }); setQuick([['menu', c('q_menu')]]); break;
      case 'hours': await bot({ text: c('hours', { hours: L(HOURS, lang) }), actions: [{ label: c('a_book'), to: '/appointment', primary: true }, { label: c('a_find'), do: 'clinic' }] }); setQuick([['menu', c('q_menu')]]); break;
      case 'doctors': await bot({ text: c('doctors'), actions: [{ label: c('a_docs'), to: '/doctors', primary: true }] }); setQuick([['menu', c('q_menu')]]); break;
      case 'injuries': await bot({ text: c('injuries'), actions: [{ label: c('i_car'), to: '/injuries/car-accident' }, { label: c('i_fall'), to: '/injuries/slip-and-fall' }, { label: c('i_work'), to: '/injuries/work-injury' }, { label: c('i_sport'), to: '/injuries/sports-injury' }] }); setQuick([['menu', c('q_menu')]]); break;
      default: await bot({ text: c('fallback') }); mainQuick();
    }
  };

  const start = () => { if (started.current) return; started.current = true; flow('menu'); };
  const toggle = () => { setNudge(false); setOpen(o => { if (!o) { setUnread(0); setTimeout(start, 150); } return !o; }); };
  const onQuick = ([id, label]) => { me(label); const [k, v] = id.split(':'); flow(k, v); };
  const onAction = (a) => { if (a.do) { me(a.label); flow(a.do); } else if (a.to) go(a.to); };
  const submit = (e) => { e.preventDefault(); const v = text.trim(); if (!v) return; setText(''); me(v);
    if (mode === 'find') return flow('find', v);
    if (mode === 'cb_name') return flow('cb_name', v);
    if (mode === 'cb_phone') return flow('cb_phone', v);
    if (mode === 'cb_topic') return flow('topic', v);
    const r = routeText(v, lang); if (r) return flow(r);
    const hits = findClinics(v); if (hits.length) return flow('find', v);
    flow('fallback'); };

  return (
    <div className={'hchat' + (open ? ' is-open' : '')}>
      {nudge && !open && <button className="hchat-nudge" onClick={toggle}><span>{c('nudge')}</span><i onClick={(e) => { e.stopPropagation(); setNudge(false); }} aria-label="Dismiss">×</i></button>}
      <button className="hchat-launch" onClick={toggle} aria-expanded={open} aria-label={open ? c('close') : c('launch')}>{open ? <I.x s={24} /> : <ChatIcon />}{!open && unread > 0 && <b className="badge">{unread}</b>}</button>
      {open && <div className="hchat-panel" role="dialog" aria-label={c('title')}>
        <div className="hchat-head">
          <span className="av">U</span>
          <div className="who"><b>{c('title')}</b><span className={'st' + (openNow ? ' on' : '')}><i></i>{openNow ? c('open') : c('closed')}</span></div>
          <button className="ib" onClick={() => flow('menu')} title={c('menu')} aria-label={c('menu')}><I.menu s={18} /></button>
          <button className="ib" onClick={() => setOpen(false)} aria-label={c('close')}><I.x s={20} /></button>
        </div>
        <div className="hchat-msgs" ref={listRef} aria-live="polite">
          {msgs.map(m => m.from === 'me' ? <div key={m.id} className="m me"><span>{m.text}</span></div> : (
            <div key={m.id} className="m bot">
              <span className="bub">{m.text}</span>
              {m.clinics && <div className="ccards">{m.clinics.map(slug => { const l = locBySlug(slug); if (!l) return null; return <div key={slug} className="ccard"><b>{L(l.label, lang)}</b><span>{l.street}<br />{l.cityState}</span><div className="row"><a href={'tel:' + l.tel}><I.phone s={13} /> {l.phone}</a><a href={'#/locations/' + l.slug} onClick={(e) => { e.preventDefault(); go('/locations/' + l.slug); }}><I.pin s={13} /> {lang === 'en' ? 'Details' : 'Detalles'}</a><a href={'#/appointment?c=' + l.slug} onClick={(e) => { e.preventDefault(); go('/appointment?c=' + l.slug); }}><I.cal s={13} /> {lang === 'en' ? 'Book' : 'Agendar'}</a></div></div>; })}</div>}
              {m.actions && <div className="acts">{m.actions.map((a, i) => a.tel ? <a key={i} className={'act' + (a.primary ? ' pri' : '') + (a.ghost ? ' gh' : '')} href={'tel:' + a.tel}><I.phone s={14} /><span>{a.label}{a.sub && <small>{a.sub}</small>}</span></a> : a.href ? <a key={i} className={'act' + (a.primary ? ' pri' : '') + (a.ghost ? ' gh' : '')} href={a.href} target={a.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"><I.mail s={14} /><span>{a.label}{a.sub && <small>{a.sub}</small>}</span></a> : <button key={i} className={'act' + (a.primary ? ' pri' : '') + (a.ghost ? ' gh' : '')} onClick={() => onAction(a)}><span>{a.label}</span><I.arrow s={14} /></button>)}</div>}
            </div>))}
          {typing && <div className="m bot"><span className="bub typing" aria-label={c('typing')}><i></i><i></i><i></i></span></div>}
        </div>
        {quick.length > 0 && !typing && <div className="hchat-quick">{quick.map(q => <button key={q[0]} onClick={() => onQuick(q)}>{q[1]}</button>)}</div>}
        <form className="hchat-input" onSubmit={submit}><input ref={inputRef} value={text} onChange={e => setText(e.target.value)} placeholder={mode === 'find' ? (lang === 'en' ? 'City or ZIP…' : 'Ciudad o código postal…') : c('placeholder')} aria-label={c('placeholder')} inputMode={mode === 'cb_phone' ? 'tel' : 'text'} /><button type="submit" aria-label={c('send')} disabled={!text.trim()}><I.arrow s={18} /></button></form>
        <div className="hchat-foot">{c('foot')}</div>
      </div>}
    </div>
  );
};
Object.assign(window, { HelpChat });
