---
layout: layouts/base.njk
title: 作品
lang: zh
description: 精選作品與專案
permalink: "/zh/portfolio/index.html"
---

<h1>作品</h1>
<p class="meta">依作品類型瀏覽完整藝術檔案。</p>

<div class="portfolio-hub-grid">
  <article class="portfolio-hub-card">
    <a class="portfolio-hub-link" href="/zh/portfolio/realism/" aria-label="瀏覽：寫實">
      <div class="media-frame">
        <img
          class="card-media"
          src="{{ portfolioGallery.realism[0].thumb if portfolioGallery.realism[0] else '/images/placeholder.jpg' }}"
          alt="寫實作品集封面"
          width="500"
          height="350"
          loading="lazy"
          data-random-thumb="realism-thumb-pool"
        />
        <script id="realism-thumb-pool" type="application/json">{{ portfolioGallery.realism | pluck("thumb") | json | safe }}</script>
      </div>
      <div class="card-body">
        <h2>寫實</h2>
        <p>描繪靜物、人物與日常恩典的細膩之作。</p>
        <p class="meta">{{ portfolioGallery.realism | length }} 件作品</p>
      </div>
    </a>
  </article>

  <article class="portfolio-hub-card">
    <a class="portfolio-hub-link" href="/zh/portfolio/abstract/" aria-label="瀏覽：抽象">
      <div class="media-frame">
        <img
          class="card-media"
          src="{{ portfolioGallery.abstract[0].thumb if portfolioGallery.abstract[0] else '/images/placeholder.jpg' }}"
          alt="抽象作品集封面"
          width="500"
          height="350"
          loading="lazy"
          data-random-thumb="abstract-thumb-pool"
        />
        <script id="abstract-thumb-pool" type="application/json">{{ portfolioGallery.abstract | pluck("thumb") | json | safe }}</script>
      </div>
      <div class="card-body">
        <h2>抽象</h2>
        <p>描繪信仰與生命情感交織的抽象創作。</p>
        <p class="meta">{{ portfolioGallery.abstract | length }} 件作品</p>
      </div>
    </a>
  </article>
</div>
