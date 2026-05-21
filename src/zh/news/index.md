---
layout: layouts/base.njk
title: 最新消息
lang: zh
description: 最新消息與公告
permalink: "/zh/news/index.html"
---

<h1>最新消息</h1>
<p class="meta">近期動態、活動與出版資訊。</p>

{% set latestCount = site.newsMainPageCount or 5 %}
{% set latestNews = collections.news_zh | latest(latestCount) %}

<div class="news-toolbar" aria-label="消息顯示設定">
  <label for="news-count-zh">顯示筆數</label>
  <select id="news-count-zh" name="news-count-zh">
    <option value="5"{% if latestCount == 5 %} selected{% endif %}>5</option>
    <option value="10"{% if latestCount == 10 %} selected{% endif %}>10</option>
    <option value="15"{% if latestCount == 15 %} selected{% endif %}>15</option>
    <option value="20"{% if latestCount == 20 %} selected{% endif %}>20</option>
  </select>
</div>

<ul class="list-clean" id="news-list-zh">
  {% for post in collections.news_zh %}
  <li class="news-item" data-news-index="{{ loop.index }}"{% if loop.index > latestCount %} style="display: none"{% endif %}>
    <div class="media-frame{% if not post.data.cover %} is-placeholder{% endif %}">
      <img
        class="news-media"
        src="{{ post.data.cover or '/images/placeholder.jpg' }}"
        alt="{{ post.data.coverAlt or post.data.title }}"
        width="800"
        height="450"
        loading="lazy"
      />
      {% if not post.data.cover %}
      <span class="media-badge" aria-hidden="true">圖片待定</span>
      {% endif %}
    </div>
    <a href="{{ post.url }}">{{ post.data.title }}</a>
    <div class="meta">{{ post.date | date("yyyy-MM-dd") }}</div>
    <p>{{ post.data.summary }}</p>
  </li>
  {% endfor %}
</ul>

<h2 class="section-title">媒體：影片</h2>
<ul class="list-clean">
  {% for post in latestNews | byType("video") %}
  <li class="news-item">
    <div class="media-frame{% if not post.data.cover %} is-placeholder{% endif %}">
      <img
        class="news-media"
        src="{{ post.data.cover or '/images/placeholder.jpg' }}"
        alt="{{ post.data.coverAlt or post.data.title }}"
        width="800"
        height="450"
        loading="lazy"
      />
      {% if not post.data.cover %}
      <span class="media-badge" aria-hidden="true">圖片待定</span>
      {% endif %}
    </div>
    <a href="{{ post.url }}">{{ post.data.title }}</a>
    <div class="meta">{{ post.date | date("yyyy-MM-dd") }}</div>
    <p>{{ post.data.summary }}</p>
  </li>
  {% else %}
  <li>
    <p class="meta">目前沒有影片內容。</p>
  </li>
  {% endfor %}
</ul>

<h2 class="section-title">媒體：音訊</h2>
<ul class="list-clean">
  {% for post in latestNews | byType("audio") %}
  <li class="news-item">
    <div class="media-frame{% if not post.data.cover %} is-placeholder{% endif %}">
      <img
        class="news-media"
        src="{{ post.data.cover or '/images/placeholder.jpg' }}"
        alt="{{ post.data.coverAlt or post.data.title }}"
        width="800"
        height="450"
        loading="lazy"
      />
      {% if not post.data.cover %}
      <span class="media-badge" aria-hidden="true">圖片待定</span>
      {% endif %}
    </div>
    <a href="{{ post.url }}">{{ post.data.title }}</a>
    <div class="meta">{{ post.date | date("yyyy-MM-dd") }}</div>
    <p>{{ post.data.summary }}</p>
  </li>
  {% else %}
  <li>
    <p class="meta">目前沒有音訊內容。</p>
  </li>
  {% endfor %}
</ul>

<section>
  <h2 class="section-title">News Archive</h2>
  <p><a class="btn" href="/zh/news/archive/">News Archive</a></p>
</section>

<script>
  (function () {
    const select = document.getElementById("news-count-zh");
    const rows = Array.from(document.querySelectorAll("#news-list-zh [data-news-index]"));
    if (!select || !rows.length) {
      return;
    }

    const initialCount = Number.parseInt("{{ latestCount }}", 10) || 5;
    if (!select.value || select.value === "") {
      select.value = String(initialCount);
    }

    function applyVisibleCount(value) {
      const limit = Number.parseInt(value, 10);
      const safeLimit = Number.isInteger(limit) && limit > 0 ? limit : initialCount;

      rows.forEach((row, index) => {
        row.style.display = index < safeLimit ? "" : "none";
      });
    }

    select.addEventListener("change", function (event) {
      applyVisibleCount(event.target.value);
    });

    applyVisibleCount(select.value);
  })();
</script>
