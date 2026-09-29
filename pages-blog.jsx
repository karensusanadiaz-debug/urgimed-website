// Blog index + post pages
const fmtDate = (iso, lang) => new Date(iso + 'T12:00:00').toLocaleDateString(lang === 'es' ? 'es-US' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
const catOf = (id) => BLOG_CATEGORIES.find(c => c.id === id);

const PostCard = ({ p, big }) => {
  const { t, lang } = useLang();
  const d = DOCTORS.find(x => x.id === p.reviewer);
  return (
    <A to={'/blog/' + p.slug} className={'post' + (big ? ' big' : '')}>
      <div className="post-img"><img src={p.img} alt="" loading="lazy" /><span className="chip post-cat">{L(catOf(p.cat), lang)}</span></div>
      <div className="post-body">
        <div className="post-meta"><span>{fmtDate(p.date, lang)}</span><span>·</span><span>{p.read} {t('min_read')}</span></div>
        <h3>{L(p.title, lang)}</h3>
        <p>{L(p.excerpt, lang)}</p>
        <div className="post-foot"><span className="post-rev"><I.user s={13} /> {t('reviewed_by')} {d ? d.name : ''}</span><span className="post-more">{t('read_more')} <I.arrow s={14} /></span></div>
      </div>
    </A>
  );
};

const BlogSidebar = ({ current }) => {
  const { t, lang } = useLang();
  const popular = BLOG_POSTS.filter(p => p.slug !== current).slice(0, 4);
  return (
    <aside className="blog-side">
      <div className="card side-cta">
        <div className="eyebrow inv">{t('same_day')}</div>
        <h3>{lang === 'en' ? 'Injured? Talk to a doctor today.' : '¿Lesionado? Hable con un médico hoy.'}</h3>
        <a href={'tel:' + MAIN_PHONE.tel} className="side-tel">{MAIN_PHONE.display}</a>
        <BookBtn className="btn btn-white" />
      </div>
      <div className="card"><h4 className="side-h">{t('popular_posts')}</h4><div className="side-list">{popular.map(p => <A key={p.slug} to={'/blog/' + p.slug} className="side-post"><img src={p.img} alt="" loading="lazy" /><span><b>{L(p.title, lang)}</b><small>{fmtDate(p.date, lang)}</small></span></A>)}</div></div>
      <div className="card"><h4 className="side-h">{t('categories')}</h4><div className="side-cats">{BLOG_CATEGORIES.map(c => { const n = BLOG_POSTS.filter(p => p.cat === c.id).length; return n ? <A key={c.id} to={'/blog?cat=' + c.id}>{L(c, lang)} <span>{n}</span></A> : null; })}</div></div>
      <div className="card mist-bg" style={{ border: 0 }}><h4 className="side-h">{t('rule_h')}</h4><p style={{ fontSize: '.92rem' }}>{lang === 'en' ? 'See a doctor within 14 days of a crash or lose your PIP benefits.' : 'Vea a un médico dentro de 14 días del choque o pierda sus beneficios PIP.'}</p><A to="/blog/florida-14-day-rule-car-accident" style={{ fontWeight: 600, fontSize: '.9rem' }}>{t('read_more')} →</A></div>
    </aside>
  );
};

const BlogIndex = ({ query }) => {
  const { t, lang } = useLang();
  const cat = query && query.cat;
  const [shown, setShown] = React.useState(6);
  const posts = BLOG_POSTS.filter(p => !cat || p.cat === cat);
  const featured = !cat && posts.find(p => p.featured);
  const rest = posts.filter(p => p !== featured);
  return (
    <main>
      <PageHead eyebrow={t('nav_blog')} h1={cat ? L(catOf(cat), lang) : t('blog_h1')} sub={cat ? '' : t('blog_sub')} img="img/w-xray-lightbox.jpg" crumb={cat ? <><A to="/blog">{t('nav_blog')}</A><span>›</span><span>{L(catOf(cat), lang)}</span></> : null} />
      <section className="sec-tight"><div className="wrap">
        <div className="cat-bar"><A to="/blog" className={!cat ? 'on' : ''}>{t('all_posts')}</A>{BLOG_CATEGORIES.filter(c => BLOG_POSTS.some(p => p.cat === c.id)).map(c => <A key={c.id} to={'/blog?cat=' + c.id} className={cat === c.id ? 'on' : ''}>{L(c, lang)}</A>)}</div>
      </div></section>
      <section className="sec" style={{ paddingTop: 0 }}><div className="wrap blog-layout">
        <div>
          {featured && <PostCard p={featured} big />}
          <div className="grid g2" style={{ marginTop: featured ? 30 : 0 }}>{rest.slice(0, shown).map(p => <PostCard key={p.slug} p={p} />)}</div>
          {shown < rest.length && <div style={{ textAlign: 'center', marginTop: 36 }}><button className="btn btn-outline" onClick={() => setShown(s => s + 6)}>{t('load_more')}</button></div>}
        </div>
        <BlogSidebar />
      </div></section>
      <ClinicCTA />
    </main>
  );
};

const BlogPost = ({ slug }) => {
  const { t, lang } = useLang();
  const p = BLOG_POSTS.find(x => x.slug === slug);
  if (!p) return <main className="sec"><div className="wrap"><h1>Not found</h1></div></main>;
  const d = DOCTORS.find(x => x.id === p.reviewer), b = DOCTOR_BIOS[p.reviewer] || {};
  const body = L(p.body, lang), faq = L(p.faq, lang) || [];
  const toc = body.filter(x => x[0] === 'h2').map(x => x[1]);
  const related = BLOG_POSTS.filter(x => x.slug !== slug && x.cat === p.cat).concat(BLOG_POSTS.filter(x => x.slug !== slug && x.cat !== p.cat)).slice(0, 3);
  const [copied, setCopied] = React.useState(false);
  const share = () => { navigator.clipboard && navigator.clipboard.writeText(location.href); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9\u00C0-\u024F]+/g, '-');
  return (
    <main>
      <section className="post-hero"><div className="wrap">
        <div className="crumb"><A to="/">{t('home')}</A><span>›</span><A to="/blog">{t('nav_blog')}</A><span>›</span><A to={'/blog?cat=' + p.cat}>{L(catOf(p.cat), lang)}</A></div>
        <h1>{L(p.title, lang)}</h1>
        <div className="post-hero-meta">
          {d && <A to={'/doctors/' + d.id} className="rev"><img src={b.photo} alt="" /><span><small>{t('reviewed_by')}</small><b>{d.name}</b></span></A>}
          <span><I.cal s={14} /> {fmtDate(p.date, lang)}</span><span><I.clock s={14} /> {p.read} {t('min_read')}</span>
          <button className="share" onClick={share}>{copied ? t('copied') : t('share')}</button>
        </div>
      </div></section>
      <section className="sec" style={{ paddingTop: 0 }}><div className="wrap blog-layout">
        <article className="article">
          <div className="post-cover"><img src={p.img} alt="" /></div>
          <p className="article-lead">{L(p.excerpt, lang)}</p>
          {toc.length > 2 && <nav className="toc"><b>{t('in_this_article')}</b><ol>{toc.map((h, i) => <li key={i}><a href={'#' + slugify(h)} onClick={(e) => { e.preventDefault(); const el = document.getElementById(slugify(h)); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: 'smooth' }); }}>{h}</a></li>)}</ol></nav>}
          {body.map((blk, i) => {
            if (blk[0] === 'h2') return <h2 key={i} id={slugify(blk[1])}>{blk[1]}</h2>;
            if (blk[0] === 'p') return <p key={i}>{blk[1]}</p>;
            if (blk[0] === 'ul') return <ul key={i}>{blk[1].map((li, j) => <li key={j}><I.check s={16} /> {li}</li>)}</ul>;
            if (blk[0] === 'cta') { const c = BLOG_CTA[blk[1]]; if (!c) return null; const [h, s] = c[lang] || c.en; return <div key={i} className="article-cta"><div><h3>{h}</h3><p>{s}</p></div><div className="cta-row"><CallBtn className="btn btn-white" /><A to={c.to} className="btn btn-outline-inv">{t('learn_more')}</A></div></div>; }
            return null;
          })}
          {faq.length > 0 && <div className="article-faq"><h2>{t('faq_h')}</h2><FAQList items={faq.map(([q, a]) => ({ q, a }))} /></div>}
          {d && <A to={'/doctors/' + d.id} className="reviewer-box"><img src={b.photo} alt="" /><div><div className="eyebrow">{t('medical_reviewer')}</div><h3>{d.name}</h3><p>{L(d.role, lang)} · {L(d.spec, lang)}</p><span style={{ fontWeight: 600, color: 'var(--t6)' }}>{t('view_profile')} →</span></div></A>}
          <p className="disclaimer">{t('disclaimer')}</p>
        </article>
        <BlogSidebar current={slug} />
      </div></section>
      <section className="sec mist-bg"><div className="wrap"><SectionHead center={false} h={t('related_posts')} /><div className="grid g3">{related.map(r => <PostCard key={r.slug} p={r} />)}</div></div></section>
      <ClinicCTA />
    </main>
  );
};
Object.assign(window, { BlogIndex, BlogPost, PostCard, fmtDate });
