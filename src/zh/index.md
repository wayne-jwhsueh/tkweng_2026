---
layout: layouts/base.njk
title: 首頁
lang: zh
description: 藝術創作與著作網站首頁
permalink: "/zh/index.html"
---

<section class="hero">
  <div>
    <h1>創作、文字與作品典藏</h1>
    <p>
      歡迎來到翁登科官方網站。這裡整理作品、出版與最新消息，
      以清楚舒適的方式呈現，方便長期閱讀與保存。
    </p>
    <div class="cta-row">
      <a class="btn btn-primary" href="/zh/portfolio/">瀏覽作品</a>
      <a class="btn" href="/zh/news/">最新消息</a>
    </div>
  </div>
  <div class="hero-card">
    <p><strong>重點領域</strong></p>
    <p>繪畫、寫作、複合媒材與文化專案。</p>
    <p class="meta">網站提供繁體中文與英文內容。</p>
  </div>
</section>

<section>
  <h2 class="section-title">精選作品</h2>
  <div class="grid">
    {% for item in collections.portfolio_zh | slice(0, 3) %}
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
        <h3><a href="{{ item.url }}">{{ item.data.title }}</a></h3>
        <p>{{ item.data.summary }}</p>
      </div>
    </article>
    {% endfor %}
  </div>
</section>

<section>
  <h2 class="section-title">最新消息</h2>
  <ul class="list-clean">
    {% for post in collections.news_zh | slice(0, 3) %}
    <li>
      <a href="{{ post.url }}">{{ post.data.title }}</a>
      <div class="meta">{{ post.date | date("yyyy-MM-dd") }}</div>
    </li>
    {% endfor %}
  </ul>
</section>
