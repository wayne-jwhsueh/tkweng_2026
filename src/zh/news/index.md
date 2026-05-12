---
layout: layouts/base.njk
title: 最新消息
lang: zh
description: 最新消息與公告
permalink: "/zh/news/index.html"
---

<h1>最新消息</h1>
<p class="meta">近期動態、活動與出版資訊。</p>

<ul class="list-clean">
  {% for post in collections.news_zh %}
  <li>
    <a href="{{ post.url }}">{{ post.data.title }}</a>
    <div class="meta">{{ post.date | date("yyyy-MM-dd") }}</div>
    <p>{{ post.data.summary }}</p>
  </li>
  {% endfor %}
</ul>
