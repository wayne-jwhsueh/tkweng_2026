const portfolioGallery = require("./portfolioGallery.js");

module.exports = portfolioGallery.abstract.map((art) => ({ src: art.src }));
