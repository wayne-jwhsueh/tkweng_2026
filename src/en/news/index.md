---
layout: layouts/base.njk
title: News
lang: en
description: Latest updates and announcements
permalink: "/en/news/index.html"
---

<h1>News</h1>
<p class="meta">Recent updates, events, and publication notes.</p>

{% set latestCount = site.newsMainPageCount or 5 %}
{% set latestNews = collections.news_en | latest(latestCount) %}

<div class="news-toolbar" aria-label="News display settings">
  <label for="news-count-en">Latest news to show</label>
  <select id="news-count-en" name="news-count-en">
    <option value="5"{% if latestCount == 5 %} selected{% endif %}>5</option>
    <option value="10"{% if latestCount == 10 %} selected{% endif %}>10</option>
    <option value="15"{% if latestCount == 15 %} selected{% endif %}>15</option>
    <option value="20"{% if latestCount == 20 %} selected{% endif %}>20</option>
  </select>
</div>

<ul class="list-clean" id="news-list-en">
  {% for post in collections.news_en %}
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
      <span class="media-badge" aria-hidden="true">Image Pending</span>
      {% endif %}
    </div>
    <a href="{{ post.url }}">{{ post.data.title }}</a>
    <div class="meta">{{ post.date | date("yyyy-MM-dd") }}</div>
    <p>{{ post.data.summary }}</p>
  </li>
  {% endfor %}
</ul>

<h2 class="section-title">Media: Videos</h2>
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
      <span class="media-badge" aria-hidden="true">Image Pending</span>
      {% endif %}
    </div>
    <a href="{{ post.url }}">{{ post.data.title }}</a>
    <div class="meta">{{ post.date | date("yyyy-MM-dd") }}</div>
    <p>{{ post.data.summary }}</p>
  </li>
  {% else %}
  <li>
    <p class="meta">No videos yet.</p>
  </li>
  {% endfor %}
</ul>

<h2 class="section-title">Media: Audios</h2>
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
      <span class="media-badge" aria-hidden="true">Image Pending</span>
      {% endif %}
    </div>
    <a href="{{ post.url }}">{{ post.data.title }}</a>
    <div class="meta">{{ post.date | date("yyyy-MM-dd") }}</div>
    <p>{{ post.data.summary }}</p>
  </li>
  {% else %}
  <li>
    <p class="meta">No audios yet.</p>
  </li>
  {% endfor %}
</ul>

<script>
  (function () {
    const select = document.getElementById("news-count-en");
    const rows = Array.from(document.querySelectorAll("#news-list-en [data-news-index]"));
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
