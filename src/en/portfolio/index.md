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
      <h2><a href="/en/portfolio/realism/">Realism</a></h2>
      <p>Detailed, observed works across still life, portraits, and studies.</p>
      <p class="meta">{{ portfolioGallery.realism | length }} artworks</p>
    </div>
  </article>

  <article class="portfolio-hub-card">
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
      <h2><a href="/en/portfolio/abstract/">Abstract</a></h2>
      <p>Expressive compositions focused on rhythm, spirit, and memory.</p>
      <p class="meta">{{ portfolioGallery.abstract | length }} artworks</p>
    </div>
  </article>
</div>
