---
layout: layouts/base.njk
title: 抽象作品集
lang: zh
description: 翁登科抽象作品全覽
permalink: "/zh/portfolio/chou-xiang/index.html"
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
      data-full="{{ art.src }}"
      data-thumb="{{ art.thumb }}"
      data-title="{{ art.titleZh }}"
      data-year="{{ art.year }}"
      data-size="{{ art.size }}"
      data-medium="{{ art.medium }}"
      data-status="{{ art.saleStatus }}"
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
        {% if art.saleStatus == 'T' %}已售{% elseif art.saleStatus == 'F' %}可洽購{% else %}非賣品{% endif %}
      </span>
    </button>
    {% endfor %}
  </div>

  <dialog class="gallery-dialog" data-gallery-dialog aria-label="作品檢視">
    <div class="gallery-dialog-inner">
      <div class="gallery-dialog-topbar">
        <p class="gallery-dialog-meta">
          <span data-gallery-dialog-caption>作品</span>
          <span data-gallery-dialog-count>1 / 1</span>
        </p>
        <button class="gallery-close" type="button" data-gallery-close aria-label="關閉檢視器">關閉</button>
      </div>
      <ul class="gallery-detail-list">
        <li><span>年份</span><strong data-gallery-dialog-year>-</strong></li>
        <li><span>尺寸</span><strong data-gallery-dialog-size>-</strong></li>
        <li><span>媒材</span><strong data-gallery-dialog-medium>-</strong></li>
        <li><span>狀態</span><strong data-gallery-dialog-status>-</strong></li>
      </ul>
      <figure class="gallery-stage">
        <img data-gallery-dialog-image src="/images/placeholder.jpg" alt="作品" />
      </figure>
      <div class="gallery-dialog-controls">
        <button type="button" data-gallery-prev aria-label="上一件作品">上一件</button>
        <button type="button" data-gallery-next aria-label="下一件作品">下一件</button>
      </div>
    </div>
  </dialog>
</section>
