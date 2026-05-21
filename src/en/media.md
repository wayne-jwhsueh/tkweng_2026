---
layout: layouts/base.njk
title: Media
lang: en
description: Interviews, videos, and audio features
permalink: "/en/media/index.html"
---

<h1>Media</h1>
<p class="meta">Interviews, talks, and audio features from past activities.</p>

{% set videos = collections.news_en | byType("video") %}
{% set audios = collections.news_en | byType("audio") %}

<section>
  <h2 class="section-title">Interview Videos</h2>
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
        <span class="media-badge" aria-hidden="true">Image Pending</span>
        {% endif %}
      </div>
      <a href="{{ post.url }}">{{ post.data.title }}</a>
      <div class="meta">{{ post.date | date("yyyy-MM-dd") }}</div>
      <p>{{ post.data.summary }}</p>
    </li>
    {% else %}
    <li>
      <p class="meta">No video items yet.</p>
    </li>
    {% endfor %}
  </ul>
</section>

<section>
  <h2 class="section-title">Interview Audios</h2>
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
        <span class="media-badge" aria-hidden="true">Image Pending</span>
        {% endif %}
      </div>
      <a href="{{ post.url }}">{{ post.data.title }}</a>
      <div class="meta">{{ post.date | date("yyyy-MM-dd") }}</div>
      <p>{{ post.data.summary }}</p>
    </li>
    {% else %}
    <li>
      <p class="meta">No audio items yet.</p>
    </li>
    {% endfor %}
  </ul>
</section>
