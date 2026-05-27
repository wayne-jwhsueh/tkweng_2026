const portfolioGallery = require("./portfolioGallery.js");

module.exports = [
  ...portfolioGallery.realism.map((art) => ({
    id: art.id,
    src: art.src,
    titleEn: art.titleEn,
    titleZh: art.titleZh,
    galleryPageEn: "/en/portfolio/realism/",
    galleryPageZh: "/zh/portfolio/realism/"
  })),
  ...portfolioGallery.abstract.map((art) => ({
    id: art.id,
    src: art.src,
    titleEn: art.titleEn,
    titleZh: art.titleZh,
    galleryPageEn: "/en/portfolio/abstract/",
    galleryPageZh: "/zh/portfolio/abstract/"
  }))
];
