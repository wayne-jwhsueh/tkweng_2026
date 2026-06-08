module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "public/images": "images" });
  eleventyConfig.addPassthroughCopy({
    "node_modules/photoswipe/dist/photoswipe-lightbox.esm.min.js": "assets/js/photoswipe-lightbox.esm.min.js",
    "node_modules/photoswipe/dist/photoswipe.esm.min.js": "assets/js/photoswipe.esm.min.js",
    "node_modules/photoswipe/dist/photoswipe.css": "assets/css/photoswipe.css",
  });

  eleventyConfig.addFilter("json", (value) => JSON.stringify(value));

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
