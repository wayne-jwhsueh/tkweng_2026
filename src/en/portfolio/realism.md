---
layout: layouts/base.njk
title: Realism Gallery
lang: en
description: Realism works by Teng-Ko Weng
permalink: "/en/portfolio/realism/index.html"
---

<h1>Realism</h1>
<p class="meta">A full archive of realism works. Click any artwork to view in lightbox mode.</p>
<p><a class="btn" href="/en/portfolio/">Back to Portfolio</a></p>

<section class="art-gallery" data-gallery tabindex="-1" aria-label="Realism artwork gallery">
  <div class="art-grid">
    {% for art in portfolioGallery.realism %}
    <button
      class="art-tile"
      type="button"
      data-gallery-item
      data-full="{{ art.src }}"
      data-thumb="{{ art.thumb }}"
      data-title="{{ art.titleEn }}"
      data-year="{{ art.year }}"
      data-size="{{ art.size }}"
      data-medium="{{ art.medium }}"
      data-status="{{ art.saleStatus }}"
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
        {% if art.saleStatus == 'T' %}Sold{% elseif art.saleStatus == 'F' %}For Sale{% else %}Not For Sale{% endif %}
      </span>
    </button>
    {% endfor %}
  </div>

  <dialog class="gallery-dialog" data-gallery-dialog aria-label="Artwork detail">
    <div class="gallery-dialog-inner">
      <div class="gallery-dialog-topbar">
        <p class="gallery-dialog-meta">
          <span data-gallery-dialog-caption>Artwork</span>
          <span data-gallery-dialog-count>1 / 1</span>
        </p>
        <button class="gallery-close" type="button" data-gallery-close aria-label="Close viewer">Close</button>
      </div>
      <ul class="gallery-detail-list">
        <li><span>Year</span><strong data-gallery-dialog-year>-</strong></li>
        <li><span>Size</span><strong data-gallery-dialog-size>-</strong></li>
        <li><span>Medium</span><strong data-gallery-dialog-medium>-</strong></li>
        <li><span>Status</span><strong data-gallery-dialog-status>-</strong></li>
      </ul>
      <figure class="gallery-stage">
        <img data-gallery-dialog-image src="/images/placeholder.jpg" alt="Artwork" />
      </figure>
      <div class="gallery-dialog-controls">
        <button type="button" data-gallery-prev aria-label="Previous artwork">Previous</button>
        <button type="button" data-gallery-next aria-label="Next artwork">Next</button>
      </div>
    </div>
  </dialog>
</section>
