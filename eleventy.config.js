const fs = require("fs/promises");
const path = require("path");
const sharp = require("sharp");

const NEWS_IMAGE_DIR = path.join(process.cwd(), "public", "images", "news");
const NEWS_THUMB_DIR = path.join(process.cwd(), "_site", "images", "news", "thumbs");
const NEWS_THUMB_URL_PREFIX = "/images/news/thumbs/";
const NEWS_THUMB_EXT = ".jpg";

function getNewsThumbFilename(coverUrl) {
  if (typeof coverUrl !== "string" || !coverUrl.startsWith("/images/news/")) {
    return "";
  }

  return `${path.parse(coverUrl).name}-thumb${NEWS_THUMB_EXT}`;
}

function getNewsThumbUrl(coverUrl) {
  const filename = getNewsThumbFilename(coverUrl);
  return filename ? `${NEWS_THUMB_URL_PREFIX}${filename}` : "";
}

async function generateNewsThumbnails() {
  let imageEntries = [];

  try {
    imageEntries = await fs.readdir(NEWS_IMAGE_DIR, { withFileTypes: true });
  } catch (error) {
    if (error && error.code !== "ENOENT") {
      console.warn("Unable to read news images directory.", error);
    }
    return;
  }

  const sourceFiles = imageEntries.filter(
    (entry) => entry.isFile() && /\.(avif|jpe?g|png|webp)$/i.test(entry.name)
  );

  if (!sourceFiles.length) {
    return;
  }

  await fs.mkdir(NEWS_THUMB_DIR, { recursive: true });

  await Promise.all(
    sourceFiles.map(async (entry) => {
      const parsed = path.parse(entry.name);
      const inputPath = path.join(NEWS_IMAGE_DIR, entry.name);
      const outputPath = path.join(NEWS_THUMB_DIR, `${parsed.name}-thumb${NEWS_THUMB_EXT}`);

      await sharp(inputPath)
        .resize({
          width: 560,
          height: 315,
          fit: "cover",
          position: "centre"
        })
        .flatten({ background: "#fffdf9" })
        .jpeg({ quality: 78, progressive: true })
        .toFile(outputPath);
    })
  );
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "public/images": "images" });
  eleventyConfig.addPassthroughCopy({
    "node_modules/photoswipe/dist/photoswipe-lightbox.esm.min.js": "assets/js/photoswipe-lightbox.esm.min.js",
    "node_modules/photoswipe/dist/photoswipe.esm.min.js": "assets/js/photoswipe.esm.min.js",
    "node_modules/photoswipe/dist/photoswipe.css": "assets/css/photoswipe.css",
  });

  eleventyConfig.addFilter("json", (value) => JSON.stringify(value));
  eleventyConfig.addFilter("newsThumbUrl", getNewsThumbUrl);

  eleventyConfig.on("eleventy.before", async () => {
    await generateNewsThumbnails();
  });

  eleventyConfig.addFilter("previewExcerpt", function (value, maxWords) {
    const text = (value || "").toString().replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    const limit = Number.isInteger(maxWords) && maxWords > 0 ? maxWords : 12;
    if (!text) return "";
    const words = text.split(" ");
    return words.length > limit ? words.slice(0, limit).join(" ") + " ..." : text;
  });

  eleventyConfig.addFilter("date", function (value, format) {
    const date = value === "now" ? new Date() : new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    if (format === "yyyy") {
      return String(date.getFullYear());
    }

    if (format === "yyyy-MM-dd") {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    if (format === "MMM yyyy") {
      return new Intl.DateTimeFormat("en", {
        month: "short",
        year: "numeric",
        timeZone: "UTC"
      }).format(date);
    }

    return date.toISOString();
  });

  eleventyConfig.addFilter("byType", function (items, type) {
    if (!Array.isArray(items)) {
      return [];
    }

    return items.filter((item) => item.data && item.data.type === type);
  });

  eleventyConfig.addFilter("latest", function (items, count) {
    if (!Array.isArray(items)) {
      return [];
    }

    const parsedCount = Number.parseInt(count, 10);
    const safeCount = Number.isInteger(parsedCount) && parsedCount > 0 ? parsedCount : 5;
    return items.slice(0, safeCount);
  });

  eleventyConfig.addFilter("filterRecent", function (items, days) {
    if (!Array.isArray(items)) {
      return [];
    }

    const parsedDays = Number.parseInt(days, 10);
    const safeDays = Number.isInteger(parsedDays) && parsedDays > 0 ? parsedDays : 60;
    const maxAgeMs = safeDays * 24 * 60 * 60 * 1000;
    const now = Date.now();

    return items.filter((item) => {
      const itemDate = new Date(item && item.date);
      if (Number.isNaN(itemDate.getTime())) {
        return false;
      }

      return now - itemDate.getTime() <= maxAgeMs;
    });
  });

  eleventyConfig.addFilter("newsYears", function (items) {
    if (!Array.isArray(items)) {
      return [];
    }

    const years = new Set(
      items
        .map((item) => {
          const date = new Date(item.date);
          return Number.isNaN(date.getTime()) ? null : date.getFullYear();
        })
        .filter((year) => year !== null)
    );

    return Array.from(years).sort((a, b) => b - a);
  });

  eleventyConfig.addFilter("byYear", function (items, year) {
    if (!Array.isArray(items)) {
      return [];
    }

    const parsedYear = Number.parseInt(year, 10);
    if (!Number.isInteger(parsedYear)) {
      return [];
    }

    return items.filter((item) => {
      const date = new Date(item.date);
      return !Number.isNaN(date.getTime()) && date.getFullYear() === parsedYear;
    });
  });

  eleventyConfig.addFilter("byPortfolioSection", function (items, section) {
    if (!Array.isArray(items)) {
      return [];
    }

    return items.filter(
      (item) => item && item.data && item.data.portfolioSection === section
    );
  });

  eleventyConfig.addCollection("news_en", function (collectionApi) {
    return collectionApi
      .getFilteredByTag("news_en")
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("news_zh", function (collectionApi) {
    return collectionApi
      .getFilteredByTag("news_zh")
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("portfolio_en", function (collectionApi) {
    return collectionApi
      .getFilteredByTag("portfolio_en")
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("portfolio_zh", function (collectionApi) {
    return collectionApi
      .getFilteredByTag("portfolio_zh")
      .sort((a, b) => b.date - a.date);
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
