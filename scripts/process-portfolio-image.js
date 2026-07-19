#!/usr/bin/env node
/**
 * Resize, strip metadata from, and watermark a source photo of an artwork,
 * then write it into public/images/portfolio/<category>/<id>.webp.
 *
 * Usage:
 *   node scripts/process-portfolio-image.js <sourcePath> <category> <id> [--no-watermark]
 *
 * Example:
 *   node scripts/process-portfolio-image.js "R0023 - The Apples of my Eye.JPG" realism r0023
 */
const fs = require("fs/promises");
const path = require("path");
const sharp = require("sharp");

const MAX_DIMENSION = 1800;
const WEBP_QUALITY = 82;
const WATERMARK_TEXT = "© Teng-Ko Weng";

function buildWatermarkSvg(width, height) {
  const fontSize = Math.round(height * 0.026);
  const padding = 16;

  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <text
        x="${width - padding}"
        y="${height - padding}"
        text-anchor="end"
        font-family="Georgia, 'Noto Serif TC', serif"
        font-size="${fontSize}"
        fill="#f5f2ea"
        fill-opacity="0.55"
        stroke="#1d1a16"
        stroke-opacity="0.45"
        stroke-width="0.6"
        paint-order="stroke"
      >${WATERMARK_TEXT}</text>
    </svg>
  `);
}

async function processPortfolioImage(sourcePath, category, id, { watermark = true } = {}) {
  const outputDir = path.join(process.cwd(), "public", "images", "portfolio", category);
  const outputPath = path.join(outputDir, `${id.toLowerCase()}.webp`);

  const sourceMeta = await sharp(sourcePath).rotate().metadata();
  const sourceWidth = sourceMeta.width;
  const sourceHeight = sourceMeta.height;
  const scale = Math.min(1, MAX_DIMENSION / Math.max(sourceWidth, sourceHeight));
  const resizedWidth = Math.round(sourceWidth * scale);
  const resizedHeight = Math.round(sourceHeight * scale);

  let pipeline = sharp(sourcePath).rotate().resize({
    width: resizedWidth,
    height: resizedHeight,
    fit: "fill"
  });

  if (watermark) {
    pipeline = pipeline.composite([
      { input: buildWatermarkSvg(resizedWidth, resizedHeight), gravity: "southeast" }
    ]);
  }

  await fs.mkdir(outputDir, { recursive: true });
  await pipeline.webp({ quality: WEBP_QUALITY }).toFile(outputPath);

  return outputPath;
}

async function main() {
  const [sourcePath, category, id, flag] = process.argv.slice(2);

  if (!sourcePath || !category || !id) {
    console.error("Usage: node scripts/process-portfolio-image.js <sourcePath> <category> <id> [--no-watermark]");
    process.exit(1);
  }

  const outputPath = await processPortfolioImage(sourcePath, category, id, {
    watermark: flag !== "--no-watermark"
  });

  console.log(`Wrote ${outputPath}`);
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

module.exports = { processPortfolioImage };
