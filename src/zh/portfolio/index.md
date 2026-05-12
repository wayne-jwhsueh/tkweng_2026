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
    {% if item.data.cover %}
    <img src="{{ item.data.cover }}" alt="{{ item.data.coverAlt or item.data.title }}" />
    {% endif %}
    <div class="card-body">
      <h2><a href="{{ item.url }}">{{ item.data.title }}</a></h2>
      <p>{{ item.data.summary }}</p>
    </div>
  </article>
  {% endfor %}
</div>
