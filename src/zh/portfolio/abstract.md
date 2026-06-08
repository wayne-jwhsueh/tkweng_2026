---
layout: layouts/base.njk
title: 抽象作品集
lang: zh
description: 翁登科抽象作品全覽
permalink: "/zh/portfolio/abstract/index.html"
---

<h1>抽象</h1>
<p class="meta">抽象作品完整檔案。點擊任一作品可開啟燈箱檢視。</p>
<p><a class="btn" href="/zh/portfolio/">返回作品總覽</a></p>

<section class="art-gallery" data-gallery tabindex="-1" aria-label="抽象作品畫廊">
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
      data-medium="{{ art.medium }}"
      data-status="{{ art.saleStatus }}"
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
      <span class="art-status art-status-{{ art.saleStatus | lower }}">
        {% if art.saleStatus == 'T' %}已售{% elseif art.saleStatus == 'F' %}可洽購{% else %}畫家珍藏{% endif %}
      </span>
    </button>
    {% endfor %}
  </div>
</section>
