---
layout: layouts/base.njk
title: Home
lang: en
description: Artist, author, and portfolio home
permalink: "/en/index.html"
---

{% set homeNewsMaxAgeDays = site.homePageNewsMaxAgeDays %}
{% set latestNews = collections.news_en | filterRecent(homeNewsMaxAgeDays) | latest(1) %}
{% set latestPost = latestNews[0] %}

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
    <p class="hero-eyebrow">{{ site.artistNameEn }} &nbsp;&middot;&nbsp; Artist</p>
    <h1>Painting with<br>Light and Faith</h1>
    <p class="hero-desc">
      Wholehearted devotion to art &mdash; exhibited internationally.
    </p>
    <div class="cta-row">
      <a class="btn btn-primary" href="/en/portfolio/">View Portfolio</a>
      <a class="btn" href="/en/about/">About the Artist</a>
    </div>
    <div class="hero-news-slot"{{ " hidden" if not latestPost }}>
      <a class="hero-news-chip" href="{{ latestPost.url if latestPost else '#' }}" aria-label="Latest news: {{ latestPost.data.title if latestPost else '' }}">
        <span class="hero-news-label">Latest</span>
        <span class="hero-news-title">{{ latestPost.data.title if latestPost else "" }}</span>
        <span class="hero-news-date">{{ latestPost.date | date("MMM yyyy") if latestPost else "" }}</span>
      </a>
    </div>
    <p id="hero-cap" class="hero-caption"></p>
    <a id="hero-link" href="" class="hero-gallery-link" hidden>View in Gallery</a>
  </div>
  <script id="gallery-pool" type="application/json">{{ heroPool | json | safe }}</script>
</section>
