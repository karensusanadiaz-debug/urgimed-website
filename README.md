# UrgiMed website — deploy to GitHub Pages

Static site: no build step. Everything runs in the browser.

## 1. Create the repository
1. On github.com click **New repository**.
2. Name it `urgimed-website` (or `<your-username>.github.io` to publish at the root domain).
3. Keep it **Public** (required for free Pages) and click **Create repository**.

## 2. Upload the files
1. In the new repo click **uploading an existing file**.
2. Drag the **contents** of this folder (not the folder itself) into the drop zone — `index.html` must end up at the repo root, alongside `img/`, `app.jsx`, etc.
3. Commit to the `main` branch.

## 3. Turn on GitHub Pages
1. Repo → **Settings → Pages**.
2. Source: **Deploy from a branch** · Branch: `main` · Folder: `/ (root)` → **Save**.
3. Wait ~1 minute. Your site is live at `https://<your-username>.github.io/urgimed-website/`.

## Notes
- Page links use `#/…` hash routes, so every page works on Pages without server config.
- `.nojekyll` is included so GitHub serves all files as-is.
- To update the site: upload the changed files again (or use GitHub Desktop / `git push`).
- Custom domain (e.g. `urgimedical.com`): Settings → Pages → Custom domain, then add the CNAME record at your DNS provider.
