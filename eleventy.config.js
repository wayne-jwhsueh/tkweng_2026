module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "public/images": "images" });

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

    return date.toISOString();
  });

  eleventyConfig.addFilter("byType", function (items, type) {
    if (!Array.isArray(items)) {
      return [];
    }

    return items.filter((item) => item.data && item.data.type === type);
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
