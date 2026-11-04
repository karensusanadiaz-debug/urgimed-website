// Legal pages (Privacy & Cookies, Terms) + cookie consent banner + 404 view.
const { getConsent, setConsent, useConsent } = window;

const CookieBanner = () => {
  const { lang } = useLang();
  const c = useConsent();
  const [more, setMore] = React.useState(false);
  if (c) return null;
  const en = lang === 'en';
  return (
    <div className="ckb" role="dialog" aria-live="polite" aria-label={en ? 'Cookie consent' : 'Consentimiento de cookies'}>
      <div className="ckb-in">
        <div className="ckb-txt">
          <b>{en ? 'We use cookies' : 'Usamos cookies'}</b>
          <p>{en ? 'Essential cookies keep the site working (language, this choice). With your permission we also load Google Reviews and Instagram widgets, which set third-party cookies. No medical information is stored in cookies.' : 'Las cookies esenciales mantienen el sitio funcionando (idioma, esta elección). Con su permiso también cargamos los widgets de Google Reviews e Instagram, que colocan cookies de terceros. No guardamos información médica en cookies.'} <A to="/privacy">{en ? 'Privacy & cookie policy' : 'Política de privacidad y cookies'}</A></p>
          {more && <ul className="ckb-list"><li><b>{en ? 'Essential' : 'Esenciales'}</b> — {en ? 'language preference, cookie choice, form anti-spam timer. Always on.' : 'preferencia de idioma, elección de cookies, temporizador antispam. Siempre activas.'}</li><li><b>{en ? 'Third-party widgets' : 'Widgets de terceros'}</b> — {en ? 'Trustindex (Google Reviews, Instagram feed). Optional.' : 'Trustindex (Google Reviews, feed de Instagram). Opcionales.'}</li></ul>}
        </div>
        <div className="ckb-act">
          <button className="btn btn-primary" onClick={() => setConsent('all')}>{en ? 'Accept all' : 'Aceptar todo'}</button>
          <button className="btn btn-outline" onClick={() => setConsent('essential')}>{en ? 'Essential only' : 'Solo esenciales'}</button>
          <button className="ckb-more" onClick={() => setMore(m => !m)}>{more ? (en ? 'Hide details' : 'Ocultar detalles') : (en ? 'Details' : 'Detalles')}</button>
        </div>
      </div>
    </div>
  );
};

const LegalSection = ({ h, children }) => <section style={{ display: 'grid', gap: 10 }}><h2 style={{ fontSize: '1.3rem' }}>{h}</h2>{children}</section>;

const Privacy = () => {
  const { t, lang } = useLang();
  const en = lang === 'en';
  const c = useConsent();
  const P = ({ children }) => <p style={{ lineHeight: 1.8, color: 'var(--ink2)' }}>{children}</p>;
  return (
    <main>
      <PageHead eyebrow={en ? 'Legal' : 'Legal'} h1={en ? 'Privacy & Cookie Policy' : 'Política de Privacidad y Cookies'} sub={en ? 'Last updated November 2026. How UrgiMed collects, uses and protects your information on this website.' : 'Actualizado en noviembre de 2026. Cómo UrgiMed recopila, usa y protege su información en este sitio.'} />
      <section className="sec"><div className="wrap" style={{ maxWidth: 820, display: 'grid', gap: 36 }}>
        <LegalSection h={en ? '1. Who we are' : '1. Quiénes somos'}><P>{en ? 'UrgiMed, LLC operates accident and injury clinics in Florida. This policy covers urgimedical.com and the forms, chat and widgets on it. It does not replace our HIPAA Notice of Privacy Practices, which you receive as a patient.' : 'UrgiMed, LLC opera clínicas de accidentes y lesiones en Florida. Esta política cubre urgimedical.com y los formularios, el chat y los widgets que contiene. No reemplaza nuestro Aviso de Prácticas de Privacidad HIPAA, que recibe como paciente.'}</P></LegalSection>
        <LegalSection h={en ? '2. Information you give us' : '2. Información que nos proporciona'}><P>{en ? 'When you book, request a callback, refer a patient or use the chat, we collect the details you type: name, phone, email, preferred clinic, injury type and your message. It is sent by encrypted connection (HTTPS) to our intake team at info@urgimedical.com and used only to contact you about care. Please do not include detailed medical history in web forms — we will collect it securely at your visit.' : 'Cuando agenda, solicita una llamada, refiere a un paciente o usa el chat, recopilamos los datos que escribe: nombre, teléfono, correo, clínica preferida, tipo de lesión y su mensaje. Se envían por conexión cifrada (HTTPS) a nuestro equipo de admisión en info@urgimedical.com y se usan solo para contactarle sobre su atención. No incluya historial médico detallado en formularios web; lo recopilaremos de forma segura en su visita.'}</P></LegalSection>
        <LegalSection h={en ? '3. Cookies and local storage' : '3. Cookies y almacenamiento local'}>
          <P>{en ? 'Essential: your language choice, your cookie decision and a short timer that blocks automated spam on forms. These contain no personal data.' : 'Esenciales: su idioma, su decisión sobre cookies y un temporizador breve que bloquea spam automatizado en formularios. No contienen datos personales.'}</P>
          <P>{en ? 'Optional (only after you accept): Trustindex widgets that display our Google Reviews and Instagram feed. These providers may set their own cookies under their policies (Google, Meta, Trustindex).' : 'Opcionales (solo tras aceptar): widgets de Trustindex que muestran nuestras reseñas de Google y el feed de Instagram. Estos proveedores pueden colocar sus propias cookies bajo sus políticas (Google, Meta, Trustindex).'}</P>
          <div className="card" style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}><span><b>{en ? 'Your current choice:' : 'Su elección actual:'}</b> {c === 'all' ? (en ? 'All cookies' : 'Todas las cookies') : c === 'essential' ? (en ? 'Essential only' : 'Solo esenciales') : (en ? 'Not set' : 'Sin definir')}</span><span style={{ display: 'flex', gap: 8 }}><button className="btn btn-primary btn-sm" onClick={() => setConsent('all')}>{en ? 'Accept all' : 'Aceptar todo'}</button><button className="btn btn-outline btn-sm" onClick={() => setConsent('essential')}>{en ? 'Essential only' : 'Solo esenciales'}</button></span></div>
        </LegalSection>
        <LegalSection h={en ? '4. Third-party services' : '4. Servicios de terceros'}><P>{en ? 'Google Fonts (typography), unpkg.com (site libraries), FormSubmit (secure delivery of form submissions to our inbox), Trustindex (reviews and Instagram widgets), Google Maps links. We do not sell or rent personal information.' : 'Google Fonts (tipografía), unpkg.com (librerías del sitio), FormSubmit (entrega segura de formularios a nuestro correo), Trustindex (widgets de reseñas e Instagram), enlaces a Google Maps. No vendemos ni alquilamos información personal.'}</P></LegalSection>
        <LegalSection h={en ? '5. Security' : '5. Seguridad'}><P>{en ? 'The site is served over HTTPS only, uses a Content Security Policy to prevent script injection, pins every third-party library to a verified version, and has no administrator login or database that could be attacked. Form submissions include anti-bot checks.' : 'El sitio se sirve solo por HTTPS, usa una Política de Seguridad de Contenido para prevenir inyección de scripts, fija cada librería de terceros a una versión verificada y no tiene inicio de sesión de administrador ni base de datos que pueda atacarse. Los formularios incluyen verificaciones antibots.'}</P></LegalSection>
        <LegalSection h={en ? '6. Your rights & contact' : '6. Sus derechos y contacto'}><P>{en ? 'You may ask what information we hold about you from this website, correct it or request deletion by emailing info@urgimedical.com or calling (407) 807-6262. Patient medical records are governed by HIPAA and Florida law; request them through Patient Resources.' : 'Puede solicitar qué información tenemos de usted a través de este sitio, corregirla o pedir su eliminación escribiendo a info@urgimedical.com o llamando al (407) 807-6262. Los expedientes médicos se rigen por HIPAA y la ley de Florida; solicítelos en Recursos para Pacientes.'}</P><A to="/patient-resources" className="btn btn-outline btn-sm">{t('nav_patient_resources')}</A></LegalSection>
        <p className="disclaimer">{en ? 'This policy is a template prepared for UrgiMed and should be reviewed by legal counsel before publication.' : 'Esta política es una plantilla preparada para UrgiMed y debe ser revisada por asesoría legal antes de publicarse.'}</p>
      </div></section>
    </main>
  );
};

const NotFound = () => {
  const { t, lang } = useLang();
  const en = lang === 'en';
  return (
    <main>
      <section className="sec" style={{ minHeight: '60vh', display: 'grid', alignItems: 'center' }}><div className="wrap" style={{ textAlign: 'center', display: 'grid', gap: 18, justifyItems: 'center' }}>
        <div className="eyebrow">404</div>
        <h1>{en ? 'This page is not here' : 'Esta página no existe'}</h1>
        <p style={{ maxWidth: 520 }}>{en ? 'The link may be old or mistyped. If you were hurt in an accident, the fastest way to get help is to call us.' : 'El enlace puede ser antiguo o estar mal escrito. Si se lesionó en un accidente, la forma más rápida de recibir ayuda es llamarnos.'}</p>
        <div className="cta-row" style={{ justifyContent: 'center' }}><CallBtn className="btn btn-primary btn-lg" /><A to="/" className="btn btn-outline btn-lg">{t('home')}</A><A to="/locations" className="btn btn-outline btn-lg">{t('find_clinic')}</A></div>
      </div></section>
    </main>
  );
};
Object.assign(window, { CookieBanner, Privacy, NotFound });
