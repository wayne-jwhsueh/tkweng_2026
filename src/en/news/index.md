---
layout: layouts/base.njk
title: News
lang: en
description: Latest updates and announcements
permalink: "/en/news/index.html"
---

<h1>News</h1>
<p class="meta">Recent updates, events, and publication notes.</p>

<ul class="list-clean">
  {% for post in collections.news_en %}
  <li>
    <a href="{{ post.url }}">{{ post.data.title }}</a>
    <div class="meta">{{ post.date | date("yyyy-MM-dd") }}</div>
    <p>{{ post.data.summary }}</p>
  </li>
  {% endfor %}
</ul>
