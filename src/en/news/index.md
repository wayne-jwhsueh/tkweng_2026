---
layout: layouts/base.njk
title: News
lang: en
description: Latest updates and announcements
permalink: "/en/news/index.html"
---

<h1>News</h1>
<p class="meta">Recent updates, events, and publication notes.</p>

<h2 class="section-title">All Updates</h2>
<ul class="list-clean">
  {% for post in collections.news_en %}
  <li>
    <a href="{{ post.url }}">{{ post.data.title }}</a>
    <div class="meta">{{ post.date | date("yyyy-MM-dd") }}</div>
    <p>{{ post.data.summary }}</p>
  </li>
  {% endfor %}
</ul>

<h2 class="section-title">Media: Videos</h2>
<ul class="list-clean">
  {% for post in collections.news_en | byType("video") %}
  <li>
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
  {% for post in collections.news_en | byType("audio") %}
  <li>
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
