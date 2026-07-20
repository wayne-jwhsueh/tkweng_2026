# tkweng_2026

Modern bilingual static website for tkweng.com, built with Eleventy.

## Goals

- Portfolio-focused presentation with news updates
- Traditional Chinese and English content
- Easy and safe for non-technical future editing
- Static hosting on GitHub Pages

## Tech Stack

- Eleventy (11ty)
- Nunjucks layouts
- Markdown content files
- Plain CSS

## Project Structure

```text
src/
	_data/
		site.json
		portfolioGallery.js
		heroPool.js
		aboutInspirationPool.js
	_includes/
		layouts/
			base.njk
		components/
			header.njk
			footer.njk
			news-cards.njk
			social-links.njk
			back-to-news.njk
		partials/
			seo.njk
			structured-data.njk
	assets/
		css/
			main.css
		js/
	en/
		index.md
		about.md
		cv.md
		services.md
		contact.md
		media.md
		news/
		portfolio/
	zh/
		index.md
		about.md
		cv.md
		services.md
		contact.md
		media.md
		news/
		portfolio/
public/
	images/
eleventy.config.js
package.json
```

## Safe Editing Zones (Important)

For normal updates, only edit files in:

- `src/en/news/`
- `src/zh/news/`
- `src/en/portfolio/`
- `src/zh/portfolio/`
- `src/en/services.md`
- `src/zh/services.md`
- `public/images/`

Avoid editing layouts/config unless you want to change site structure or design.

## Local Development

1. Install Node.js LTS (if not installed)
2. Install dependencies:

```bash
npm install
```

3. Start local server:

```bash
npm run dev
```

4. Build static site:

```bash
npm run build
```

Output folder is `_site/`.

## Content Editing Guide

### Main News Count (User Setting)

To control how many posts appear on the main News page, edit:

- `src/_data/site.json`

Use:

- `"newsMainPageCount": 5`

If omitted or invalid, the site falls back to 5.

### Homepage News Lifespan (User Setting)

The homepage can show a small hero-overlay ticker (1 latest item), filtered by recency.

To control how old a post can be and still appear in the hero ticker, edit:

- `src/_data/site.json`

Use:

- `"homePageNewsMaxAgeDays": 60`

Fallback/stability rule:

- If `homePageNewsMaxAgeDays` is missing, invalid, `0`, or negative, the site automatically falls back to `60`.
- If no posts are within the configured age window, the homepage ticker is hidden.

### Add a News Post

1. Create a new markdown file in `src/en/news/` or `src/zh/news/`
2. Copy front matter from an existing post
3. Update:
	 - `title`
	 - `date`
	 - `summary`
	 - `type` (`exhibition`, `publication`, `video`, or `audio`)
	 - `year` (for archive/filter use)
	 - `permalink`
4. Write content below front matter

News pages stay flat (no deep folders). Media sections such as Videos/Audios are filtered from `type`.

### Add a Portfolio Entry

1. Create a new markdown file in `src/en/portfolio/` or `src/zh/portfolio/`
2. Copy front matter from an existing portfolio item
3. Update:
	 - `title`
	 - `date`
	 - `summary`
	 - `cover`
	 - `permalink`
4. Upload image to `public/images/portfolio/`

### Processing New Artwork Photos (`scripts/process-portfolio-image.js`)

Raw photos from the artist (phone/camera shots of paintings) are usually too
large for the site and have no copyright protection. Use this script to
prepare them before dropping them into `public/images/portfolio/`.

**Purpose:**

- Resizes the image so its longest edge is capped at 1800px (never upscales
  a smaller source)
- Auto-orients and strips EXIF metadata (removes GPS/camera data some phones
  embed)
- Composites a small, semi-transparent `© Teng-Ko Weng` watermark into the
  bottom-right corner
- Re-encodes as a WebP (quality 82, matching the site's thumbnail compression)
  with the correct lowercase filename Eleventy expects (e.g. `r0036.webp`)

**Usage:**

```bash
node scripts/process-portfolio-image.js <sourcePath> <category> <id> [--no-watermark]
```

- `sourcePath` — path to the raw photo (any filename/extension)
- `category` — `realism` or `abstract`
- `id` — target artwork ID, e.g. `r0036` (lowercase; becomes the filename)
- `--no-watermark` — optional, skips the watermark step

Example:

```bash
node scripts/process-portfolio-image.js "C:\Users\me\Downloads\R0036 - New Painting.jpg" realism r0036
```

This writes `public/images/portfolio/realism/r0036.webp`. Thumbnails are
generated automatically from that file on the next `npm run build` / `npm run dev`
(see `generatePortfolioThumbnails()` in `eleventy.config.js`) — no manual
thumbnail step needed.

**Important:** Since this repository is public, never commit an
un-watermarked full-resolution image. Keep the raw/original photos only in a
private location outside the repo (e.g. local disk, private cloud storage) —
this script's output (with the watermark baked in) is the only version that
should ever be committed.

## Image Randomizers

Several spots on the site pick a random image from the portfolio instead of a fixed one:

- **Hero background** (homepage) — `src/_data/heroPool.js` + `src/assets/js/hero-random.js`
- **About page inspiration parallax image** — `src/_data/aboutInspirationPool.js` + `src/assets/js/about-inspiration-parallax.js`
- **Portfolio hub thumbnails** — `src/assets/js/portfolio-thumb-random.js` (reads pools embedded per-thumb via `data-random-thumb`)

All three pools are derived from `src/_data/portfolioGallery.js`, which builds the full `realism`/`abstract` artwork lists from `public/images/portfolio/` and also exports filtered `realismForRandom` / `abstractForRandom` versions.

### Exclusion List

`portfolioGallery.js` has a `RANDOM_EXCLUDE_IDS` set (artwork IDs like `R0032`, `A0031`, etc.) — images in this set are skipped by every randomizer but still appear normally in the full portfolio gallery pages. Use this to keep specific pieces (e.g. sold, sensitive, or lower-quality-photo works) out of random rotation without removing them from the gallery.

To exclude/include an image from random rotation, edit the `RANDOM_EXCLUDE_IDS` set in `src/_data/portfolioGallery.js`. The ID is the uppercased image filename (without extension), e.g. `public/images/portfolio/abstract/a0004.jpg` → `A0004`.

### Notes for Future Maintenance

- Adding a new portfolio image automatically makes it eligible for all randomizers unless its ID is added to `RANDOM_EXCLUDE_IDS`.
- Randomization happens client-side (pools are serialized to JSON in the page and picked via `Math.random()` in the browser), so the same page load is consistent but differs between visits/reloads.
- `legacyZhTitleMap` and `portfolioLegacyMeta.json` in `src/_data/` hold migrated per-artwork metadata (titles, sale status, description) keyed by the same uppercased ID — keep IDs consistent across these files when renaming/adding images.
- Add an optional `descEn` / `descZh` string field to any entry in `portfolioLegacyMeta.json` to give that artwork a longer description/story. When set, a small toggle button appears in the lightbox toolbar for that artwork; clicking it reveals the description in a panel over the image. Items without these fields show no toggle button. These fields may contain raw HTML (e.g. `<a href="...">read more here</a>`) — the HTML is rendered as-is, not escaped, so keep it valid and trusted (never paste unsanitized user input here), and avoid the literal text `</script>` inside the value. Keep `descEn`/`descZh` in sync when both are set, per the site's bilingual content rule.

## GitHub Pages Deployment

This project includes a GitHub Actions workflow that builds with Eleventy and deploys `_site` to GitHub Pages.

When deploying:

1. Push to `main`
2. In GitHub repo settings, enable Pages and set source to GitHub Actions

## Migration Notes (WordPress -> Eleventy)

- Move old WordPress page/post content into markdown files in language folders
- Keep one topic per markdown file
- Keep image files under `public/images/` with clear names
- Keep URLs stable by controlling `permalink` in each file
- Keep Chinese content in Traditional Chinese
