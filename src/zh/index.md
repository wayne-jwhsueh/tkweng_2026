---
layout: layouts/base.njk
title: 首頁
lang: zh
description: 藝術創作與著作網站首頁
permalink: "/zh/index.html"
---

{% set homeNewsMaxAgeDays = site.homePageNewsMaxAgeDays %}
{% set latestNews = collections.news_zh | filterRecent(homeNewsMaxAgeDays) | latest(1) %}
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
    <p class="hero-eyebrow">{{ site.artistNameZh }} &nbsp;&middot;&nbsp; 畫家</p>
    <h1>光與信仰<br>交織的筆觸</h1>
    <p class="hero-desc">
      四十年油畫與壓克力創作，展出足跡遍及加拿大、台灣與美國。
    </p>
    <div class="cta-row">
      <a class="btn btn-primary" href="/zh/portfolio/">瀏覽作品</a>
      <a class="btn" href="/zh/about/">關於畫家</a>
    </div>
    <div class="hero-news-slot"{{ " hidden" if not latestPost }}>
      <a class="hero-news-chip" href="{{ latestPost.url if latestPost else '#' }}" aria-label="最新消息：{{ latestPost.data.title if latestPost else '' }}">
        <span class="hero-news-label">最新</span>
        <span class="hero-news-title">{{ latestPost.data.title if latestPost else "" }}</span>
        <span class="hero-news-date">{{ latestPost.date | date("MMM yyyy") if latestPost else "" }}</span>
      </a>
    </div>
    <p id="hero-cap" class="hero-caption"></p>
    <a id="hero-link" href="" class="hero-gallery-link" hidden>查看作品</a>
  </div>
  <script id="gallery-pool" type="application/json">{{ heroPool | json | safe }}</script>
</section>
