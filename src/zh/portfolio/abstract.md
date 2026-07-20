---
layout: layouts/base.njk
title: 抽象作品集
lang: zh
description: 翁登科抽象作品全覽
image: /images/portfolio/abstract/a0001.jpg
permalink: "/zh/portfolio/abstract/index.html"
---

<h1>抽象</h1>
<p class="meta">抽象作品完整檔案。點擊任一作品可放大檢視。</p>

<section class="art-gallery" data-gallery tabindex="-1" aria-label="抽象作品畫廊">
  <script type="application/json" data-gallery-descriptions>{{ portfolioGallery.abstractDescZh | json | safe }}</script>
  <div class="art-grid">
    {% for art in portfolioGallery.abstract %}
    <button
      class="art-tile"
      type="button"
      data-gallery-item
      data-id="{{ art.id }}"
      data-full="{{ art.src }}"
      data-thumb="{{ art.thumb }}"
      data-title="{{ art.titleZh }}"
      data-year="{{ art.year }}"
      data-size="{{ art.size }}"
      data-medium="{{ art.mediumZh }}"
      data-private="{{ 'true' if art.privateCollection else 'false' }}"
      data-width="{{ art.width }}"
      data-height="{{ art.height }}"
      aria-label="開啟 {{ art.titleZh }}"
    >
      <img
        src="{{ art.thumb }}"
        alt="{{ art.titleZh }}"
        loading="lazy"
        onerror="this.onerror=null;this.src='/images/placeholder.jpg'"
      />
      <span class="art-label">{{ art.id }}</span>
    </button>
    {% endfor %}
  </div>
</section>

<p class="portfolio-contact-note">作品收藏、展覽及合作邀請，歡迎<a href="/zh/contact/">與藝術家聯絡</a>。</p>

<p class="portfolio-back-footer"><a class="btn btn-primary" href="/zh/portfolio/">返回作品總覽</a></p>
