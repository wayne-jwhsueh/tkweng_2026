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
	_includes/
		layouts/
			base.njk
		components/
			header.njk
			footer.njk
	assets/
		css/
			main.css
	en/
		index.md
		about.md
		services.md
		contact.md
		news/
		portfolio/
	zh/
		index.md
		about.md
		services.md
		contact.md
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
