const portfolioGallery = require("./portfolioGallery.js");

module.exports = portfolioGallery.abstractForRandom.map((art) => ({ src: art.src }));
