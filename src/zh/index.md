---
layout: layouts/base.njk
title: 首頁
lang: zh
description: 藝術創作與著作網站首頁
permalink: "/zh/index.html"
---

<section class="hero hero-fullbleed">
  <img
    id="hero-bg"
    class="hero-bg-image"
    src=""
    alt=""
    role="presentation"
  />
  <div class="hero-overlay" aria-hidden="true"></div>
  <div class="hero-inner">
    <p class="hero-eyebrow">{{ site.artistNameZh }} &nbsp;&middot;&nbsp; 畫家</p>
    <h1>光與信仰<br>交織的筆觸</h1>
    <p class="hero-desc">
      四十年油畫與壓克力創作，展出足跡遍及加拿大、台灣與美國。
    </p>
    <div class="cta-row">
      <a class="btn btn-primary" href="/zh/portfolio/">瀏覽作品</a>
      <a class="btn" href="/zh/about/">關於畫家</a>
    </div>
    <p id="hero-cap" class="hero-caption"></p>
    <a id="hero-link" href="" class="hero-gallery-link" hidden>查看作品</a>
  </div>
  <script id="gallery-pool" type="application/json">{{ heroPool | json | safe }}</script>
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
