---
layout: layouts/base.njk
title: Home
lang: en
description: Artist, author, and portfolio home
permalink: "/en/index.html"
---

<section class="hero hero-fullbleed">
  <img
    class="hero-bg-image"
    src="/images/hero/teng_ko_weng___love_follows___16x20___acrylic.webp"
    alt=""
    role="presentation"
    loading="eager"
    fetchpriority="high"
  />
  <div class="hero-overlay" aria-hidden="true"></div>
  <div class="hero-inner">
    <p class="hero-eyebrow">{{ site.artistNameEn }} &nbsp;&middot;&nbsp; Artist</p>
    <h1>Painting with<br>Light and Faith</h1>
    <p class="hero-desc">
      Four decades of oil and acrylic works &mdash; exhibited across Canada, Taiwan, and the United States.
    </p>
    <div class="cta-row">
      <a class="btn btn-primary" href="/en/portfolio/">View Portfolio</a>
      <a class="btn" href="/en/about/">About the Artist</a>
    </div>
    <p class="hero-caption">Love Follows &nbsp;&middot;&nbsp; Acrylic</p>
  </div>
</section>

<section>
  <h2 class="section-title">Featured Projects</h2>
  <div class="grid">
    {% for item in collections.portfolio_en | slice(0, 3) %}
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
        <span class="media-badge" aria-hidden="true">Image Pending</span>
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
  <h2 class="section-title">Latest News</h2>
  <ul class="list-clean">
    {% for post in collections.news_en | slice(0, 3) %}
    <li>
      <a href="{{ post.url }}">{{ post.data.title }}</a>
      <div class="meta">{{ post.date | date("yyyy-MM-dd") }}</div>
    </li>
    {% endfor %}
  </ul>
</section>
