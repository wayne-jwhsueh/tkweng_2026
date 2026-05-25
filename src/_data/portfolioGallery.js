const fs = require("node:fs");
const path = require("node:path");
const legacyMeta = require("./portfolioLegacyMeta.json");

const PORTFOLIO_ROOT = path.join(process.cwd(), "public", "images", "portfolio");

function fileId(fileName) {
  return path.parse(fileName).name.toUpperCase();
}

function sortByFileName(files) {
  return files.sort((a, b) => a.localeCompare(b, "en", { numeric: true, sensitivity: "base" }));
}

function parseDescription(description, fallbackTitle) {
  const parts = String(description || "")
    .split("/")
    .map((part) => part.trim())
    .filter(Boolean);

  const title = parts[0] || fallbackTitle;
  const tail = parts.slice(1);

  let year = "";
  let size = "";
  let medium = "";

  tail.forEach((token) => {
    if (!year && /^\d{4}$/.test(token)) {
      year = token;
      return;
    }

    if (!size && /(x|cm|"|\d+f$|\d+p$)/i.test(token)) {
      size = token;
      return;
    }

    if (!medium) {
      medium = token;
    }
  });

  return {
    title,
    year,
    size,
    medium
  };
}

function loadCategory(category, labels) {
  const categoryDir = path.join(PORTFOLIO_ROOT, category);
  const thumbsDir = path.join(categoryDir, "thumbs");
  const categoryMeta = legacyMeta[category] || {};

  if (!fs.existsSync(categoryDir)) {
    return [];
  }

  const imageFiles = sortByFileName(
    fs
      .readdirSync(categoryDir)
      .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
  );

  return imageFiles.map((fileName, index) => {
    const thumbPath = path.join(thumbsDir, fileName);
    const hasThumb = fs.existsSync(thumbPath);
    const id = fileId(fileName);
    const meta = categoryMeta[id] || {};
    const details = parseDescription(meta.description, `${labels.en} ${String(index + 1).padStart(2, "0")}`);
    const sequence = String(index + 1).padStart(2, "0");

    return {
      id,
      src: `/images/portfolio/${category}/${fileName}`,
      thumb: hasThumb
        ? `/images/portfolio/${category}/thumbs/${fileName}`
        : `/images/portfolio/${category}/${fileName}`,
      titleEn: details.title || `${labels.en} ${sequence}`,
      titleZh: details.title || `${labels.zh} ${sequence}`,
      year: details.year,
      size: details.size,
      medium: details.medium,
      legacyDescription: meta.description || "",
      saleStatus: meta.saleStatus || "N"
    };
  });
}

module.exports = {
  realism: loadCategory("realism", { en: "Realism", zh: "寫實" }),
  abstract: loadCategory("abstract", { en: "Abstract", zh: "抽象" })
};
