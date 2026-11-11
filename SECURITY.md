# UrgiMed website — Security & maintenance

This is a **static site** (HTML + JS in the browser, hosted on GitHub Pages). There is no CMS, no database, no admin login and no plugins — which removes most attack surface by design. The items below map each requirement to what is implemented in the files and what must be configured in GitHub / DNS.

## Implemented in the site files

| # | Requirement | Where | What it does |
|---|---|---|---|
| 1 | Cookie & privacy policy | `pages-legal.jsx` → `/#/privacy`, `CookieBanner` | Consent banner (Accept all / Essential only, bilingual). Choice stored in `localStorage`. Third-party widgets (Trustindex Google Reviews, Instagram) load **only after "Accept all"**. Policy page lets users change the choice. Linked in footer. |
| 2 | robots.txt blocking suspicious paths | `robots.txt` | Disallows `/wp-admin/`, `/wp-login.php`, `/xmlrpc.php`, `/.git/`, `/.env`, `/admin/`, backups, SQL/ZIP, `/uploads/`; blocks aggressive scrapers; points to sitemap. |
| 3 | 404 page | `404.html` + `NotFound` in app | GitHub Pages serves `404.html` for unknown URLs. It redirects legacy deep links (`/locations/davenport`) to the hash route, otherwise shows a branded page with call/home buttons. Unknown hash routes show the in-app 404. |
| 6 | Captcha / anti-spam | `ui.jsx` → `sendLead`, `HeroForm`, chat | Invisible **honeypot** field (bots fill it → silently dropped), **time check** (submissions faster than 3 s are rejected), phone format validation, FormSubmit server-side spam filtering. See "Optional: Google reCAPTCHA" below. |
| 8 | HTTPS | `index.html` CSP `upgrade-insecure-requests`, canonical `https://` | All assets are `https://`; any `http://` request is upgraded. **Also enable "Enforce HTTPS" in GitHub Pages settings (see below).** |
| 10 | XSS & CSRF | `index.html` `<meta http-equiv="Content-Security-Policy">`, `Referrer-Policy`, `sendLead` | CSP allows scripts only from this origin, unpkg (pinned with SRI hashes), and Trustindex; blocks `object`/`embed` and restricts form targets. React escapes all rendered text (no `dangerouslySetInnerHTML` is used). Forms post JSON to FormSubmit over HTTPS with no session cookies, so there is no CSRF-able authenticated state; the honeypot + timer + `Origin`-checked endpoint cover forged posts. **Clickjacking:** `frame-ancestors` is ignored in a meta CSP — GitHub Pages cannot send response headers, so if framing protection matters host on Netlify/Cloudflare Pages and add `X-Frame-Options: SAMEORIGIN` + `Content-Security-Policy: frame-ancestors 'self'` in `_headers`. |
| 11 | Image descriptions | all `.jsx` | Every content image has a descriptive `alt` (injury, service, doctor, clinic). Purely decorative background images keep `alt=""` per WCAG. |
| — | security.txt | `.well-known/security.txt` | Standard contact for researchers to report vulnerabilities. |

## Configure in GitHub (one-time, 10 minutes)

| # | Requirement | Steps |
|---|---|---|
| 4 | Manager / admin protection | There is no site admin panel. The only "admin" is the GitHub repo: **Settings → Password and authentication → enable 2FA** for every collaborator; **Settings → Branches → Add rule for `main`**: require pull request, block force-push and deletion; limit collaborators to the people who edit the site. |
| 5 | Updates & automated updates | No plugins. Libraries are loaded from CDN at **pinned versions with integrity hashes** (React 18.3.1, Babel 7.29.0) so they cannot change silently. Enable **Settings → Code security → Dependabot alerts + security updates** to be notified of advisories. Review the pinned versions quarterly. |
| 7 | File protection | Never commit secrets (`.env`, keys). The repo contains only public assets. Keep `index-classic.html` and drafts out of the deployed branch or behind `robots.txt` (already disallowed). Add `.nojekyll` (included) so GitHub serves files as-is. |
| 8 | HTTPS | **Settings → Pages → Enforce HTTPS** (tick). With a custom domain, add the CNAME/A records GitHub lists and wait for the certificate. |
| 9 | Security alerts | GitHub: Dependabot alerts + secret scanning (Settings → Code security). Google Search Console: verify `urgimedical.com` → "Security issues" and "Manual actions" email alerts. Uptime: free monitor (UptimeRobot/Better Stack) on `https://urgimedical.com` with SMS/email to marketing@urgimedical.com. FormSubmit sends a confirmation on first submission — click it once. |

## Optional: Google reCAPTCHA v3 (if spam ever gets through)
1. Create keys at google.com/recaptcha (type v3, domain `urgimedical.com`).
2. Add `<script src="https://www.google.com/recaptcha/api.js?render=SITE_KEY">` to `index.html` and `https://www.google.com https://www.gstatic.com` to `script-src` / `frame-src` in the CSP.
3. In `sendLead` (ui.jsx) call `grecaptcha.execute(SITE_KEY,{action:'lead'})` and send the token as `g-recaptcha-response`; FormSubmit verifies it when `_captcha` is true.

## HIPAA note
Web forms collect contact details only (name, phone, injury type). Do not add free-text medical history fields; full intake happens in the clinic's EHR. FormSubmit is not a BAA-covered vendor — if you later want medical details online, switch to a HIPAA-compliant form provider (e.g. Jotform HIPAA, Formstack) and update the Privacy page.

## SEO structure (items 12–15)
| # | Requirement | Where |
|---|---|---|
| 12 | Sitemap | `sitemap.xml` (all 56 pages, lastmod, hreflang en/es) + human sitemap at `/#/sitemap`; referenced from `robots.txt`. Regenerate when pages are added. |
| 13 | Internal links | `RelatedLinks` block at the bottom of every injury, service and clinic page (treatments ↔ injuries ↔ clinics ↔ blog), "Also serving" strip, footer columns, nav dropdowns. |
| 14 | Breadcrumbs | Visible `Crumbs` on all inner pages (Home › Section › Page) + `BreadcrumbList` JSON-LD on every non-home route. |
| 15 | Open Graph / Twitter | Static defaults in `index.html`; per-page og:title/description/url/image/type/locale and twitter:* updated on every route in `app.jsx`. Blog posts use their cover image, clinics the facade photo. |
| 10b | Organization schema | `MedicalOrganization` with @id, legalName, slogan, logo, image, contactPoint (EN/ES), opening hours, medicalSpecialty, areaServed (state + cities), the 5 clinics as `department` (MedicalClinic with address/phone), paymentAccepted, sameAs. Clinic pages emit `MedicalClinic`, doctors `Physician`, posts `BlogPosting`, FAQs `FAQPage`. |
