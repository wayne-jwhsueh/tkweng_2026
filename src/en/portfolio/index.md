---
layout: layouts/base.njk
title: Portfolio
lang: en
description: Selected works and projects
permalink: "/en/portfolio/index.html"
---

<h1>Portfolio</h1>
<p class="meta">Selected projects, artwork series, and archives.</p>

<div class="grid">
  {% for item in collections.portfolio_en %}
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
      <h2><a href="{{ item.url }}">{{ item.data.title }}</a></h2>
      <p>{{ item.data.summary }}</p>
    </div>
  </article>
  {% endfor %}
</div>
