---
layout: layouts/base.njk
title: Portfolio
lang: en
description: Selected works and projects
permalink: "/en/portfolio/index.html"
---

<h1>Portfolio</h1>
<p class="meta">Browse the complete artwork archive by category.</p>

<div class="portfolio-hub-grid">
  <article class="portfolio-hub-card">
    <a class="portfolio-hub-link" href="/en/portfolio/realism/" aria-label="Browse: Realism">
      <div class="media-frame">
        <img
          class="card-media"
          src="{{ portfolioGallery.realism[0].thumb if portfolioGallery.realism[0] else '/images/placeholder.jpg' }}"
          alt="Realism gallery cover"
          width="500"
          height="350"
          loading="lazy"
          data-random-thumb="realism-thumb-pool"
        />
        <script id="realism-thumb-pool" type="application/json">{{ portfolioGallery.realism | pluck("thumb") | json | safe }}</script>
      </div>
      <div class="card-body">
        <h2>Realism</h2>
        <p>Careful studies of still life, portraits, and quiet moments.</p>
        <p class="meta">{{ portfolioGallery.realism | length }} artworks</p>
      </div>
    </a>
  </article>

  <article class="portfolio-hub-card">
    <a class="portfolio-hub-link" href="/en/portfolio/abstract/" aria-label="Browse: Abstract">
      <div class="media-frame">
        <img
          class="card-media"
          src="{{ portfolioGallery.abstract[0].thumb if portfolioGallery.abstract[0] else '/images/placeholder.jpg' }}"
          alt="Abstract gallery cover"
          width="500"
          height="350"
          loading="lazy"
          data-random-thumb="abstract-thumb-pool"
        />
        <script id="abstract-thumb-pool" type="application/json">{{ portfolioGallery.abstract | pluck("thumb") | json | safe }}</script>
      </div>
      <div class="card-body">
        <h2>Abstract</h2>
        <p>Expressive visions exploring faith, life, and its emotions.</p>
        <p class="meta">{{ portfolioGallery.abstract | length }} artworks</p>
      </div>
    </a>
  </article>
</div>
