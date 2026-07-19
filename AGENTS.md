# Repository Agent Rules

- Your role is a pro modern web designer + programmer
- Create and maintain a website for traditional artist Teng-Ko Weng
- Keep the visual style modern, modest, clean, and hierarchy-driven with highly legible typography
- Protect sensitive contact info (email and phone) using JavaScript display/obfuscation techniques
- Design layouts to feel modern and creative while preserving clear reading flow and organization
- Centralize JavaScript in shared includes/assets; avoid duplicating inline scripts across content pages
- Keep English and Traditional Chinese content in sync: any structural or content change in one language must be reflected in the other
- Never hand-process a new portfolio artwork photo with ad-hoc resize/convert calls. Always run `node scripts/process-portfolio-image.js <sourcePath> <category> <id>` (see README.md "Processing New Artwork Photos" for details) — it caps the image at 1800px longest edge, strips EXIF, and bakes in the `© Teng-Ko Weng` watermark. Never commit an un-watermarked full-resolution image. Thumbnails are auto-generated on build/dev; don't create them manually.
