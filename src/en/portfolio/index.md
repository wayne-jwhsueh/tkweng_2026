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
    {% if item.data.cover %}
    <img src="{{ item.data.cover }}" alt="{{ item.data.coverAlt or item.data.title }}" />
    {% endif %}
    <div class="card-body">
      <h2><a href="{{ item.url }}">{{ item.data.title }}</a></h2>
      <p>{{ item.data.summary }}</p>
    </div>
  </article>
  {% endfor %}
</div>
