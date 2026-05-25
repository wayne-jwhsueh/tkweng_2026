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
    <div class="media-frame">
      <img
        class="card-media"
        src="{{ portfolioGallery.realism[0].thumb if portfolioGallery.realism[0] else '/images/placeholder.jpg' }}"
        alt="寫實作品集封面"
        width="500"
        height="350"
        loading="lazy"
      />
    </div>
    <div class="card-body">
      <h2><a href="/zh/portfolio/xie-shi/">寫實</a></h2>
      <p>聚焦靜物、人物與生活觀察的細膩表現。</p>
      <p class="meta">{{ portfolioGallery.realism | length }} 件作品</p>
    </div>
  </article>

  <article class="portfolio-hub-card">
    <div class="media-frame">
      <img
        class="card-media"
        src="{{ portfolioGallery.abstract[0].thumb if portfolioGallery.abstract[0] else '/images/placeholder.jpg' }}"
        alt="抽象作品集封面"
        width="500"
        height="350"
        loading="lazy"
      />
    </div>
    <div class="card-body">
      <h2><a href="/zh/portfolio/chou-xiang/">抽象</a></h2>
      <p>以節奏、情感與記憶展開的抽象創作。</p>
      <p class="meta">{{ portfolioGallery.abstract | length }} 件作品</p>
    </div>
  </article>
</div>
