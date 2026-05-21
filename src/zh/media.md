---
layout: layouts/base.njk
title: 媒體
lang: zh
description: 訪談、影片與音訊內容
permalink: "/zh/media/index.html"
---

<h1>媒體</h1>
<p class="meta">整理過去的訪談、對談影片與音訊內容。</p>

{% set videos = collections.news_zh | byType("video") %}
{% set audios = collections.news_zh | byType("audio") %}

<section>
  <h2 class="section-title">訪談影片</h2>
  <ul class="list-clean">
    {% for post in videos %}
    <li class="news-item">
      <div class="media-frame{% if not post.data.cover %} is-placeholder{% endif %}">
        <img
          class="news-media"
          src="{{ post.data.cover or '/images/placeholder.jpg' }}"
          alt="{{ post.data.coverAlt or post.data.title }}"
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
</section>

<section>
  <h2 class="section-title">訪談音訊</h2>
  <ul class="list-clean">
    {% for post in audios %}
    <li class="news-item">
      <div class="media-frame{% if not post.data.cover %} is-placeholder{% endif %}">
        <img
          class="news-media"
          src="{{ post.data.cover or '/images/placeholder.jpg' }}"
          alt="{{ post.data.coverAlt or post.data.title }}"
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
</section>
