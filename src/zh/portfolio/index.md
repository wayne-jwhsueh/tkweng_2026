---
layout: layouts/base.njk
title: 作品
lang: zh
description: 精選作品與專案
permalink: "/zh/portfolio/index.html"
---

<h1>作品</h1>
<p class="meta">精選創作、系列計畫與典藏紀錄。</p>

<div class="grid">
  {% for item in collections.portfolio_zh %}
  <article class="card">
    <div class="media-frame{% if not item.data.cover %} is-placeholder{% endif %}">
      <img
        class="card-media"
        src="{{ item.data.cover or '/images/placeholder.jpg' }}"
        alt="{{ item.data.coverAlt or item.data.title }}"
        width="500"
        height="350"
        loading="lazy"
      />
      {% if not item.data.cover %}
      <span class="media-badge" aria-hidden="true">圖片待定</span>
      {% endif %}
    </div>
    <div class="card-body">
      <h2><a href="{{ item.url }}">{{ item.data.title }}</a></h2>
      <p>{{ item.data.summary }}</p>
    </div>
  </article>
  {% endfor %}
</div>
