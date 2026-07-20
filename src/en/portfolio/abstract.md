---
layout: layouts/base.njk
title: Abstract Gallery
lang: en
description: Abstract works by Teng-Ko Weng
image: /images/portfolio/abstract/a0001.jpg
permalink: "/en/portfolio/abstract/index.html"
---

<h1>Abstract</h1>
<p class="meta">A full archive of abstract works. Click any artwork to view in lightbox mode.</p>

<section class="art-gallery" data-gallery tabindex="-1" aria-label="Abstract artwork gallery">
  <script type="application/json" data-gallery-descriptions>{{ portfolioGallery.abstractDescEn | json | safe }}</script>
  <div class="art-grid">
    {% for art in portfolioGallery.abstract %}
    <button
      class="art-tile"
      type="button"
      data-gallery-item
      data-id="{{ art.id }}"
      data-full="{{ art.src }}"
      data-thumb="{{ art.thumb }}"
      data-title="{{ art.titleEn }}"
      data-year="{{ art.year }}"
      data-size="{{ art.size }}"
      data-medium="{{ art.medium }}"
      data-status="{{ art.saleStatus }}"
      data-width="{{ art.width }}"
      data-height="{{ art.height }}"
      aria-label="Open {{ art.titleEn }}"
    >
      <img
        src="{{ art.thumb }}"
        alt="{{ art.titleEn }}"
        loading="lazy"
        onerror="this.onerror=null;this.src='/images/placeholder.jpg'"
      />
      <span class="art-label">{{ art.id }}</span>
      <span class="art-status art-status-{{ art.saleStatus | lower }}">
        {% if art.saleStatus == 'T' %}Sold{% elseif art.saleStatus == 'F' %}For Sale{% else %}Artist Collection{% endif %}
      </span>
    </button>
    {% endfor %}
  </div>
</section>

<p class="portfolio-back-footer"><a class="btn btn-primary" href="/en/portfolio/">Back to Portfolio</a></p>
