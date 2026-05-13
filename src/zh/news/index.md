---
layout: layouts/base.njk
title: 最新消息
lang: zh
description: 最新消息與公告
permalink: "/zh/news/index.html"
---

<h1>最新消息</h1>
<p class="meta">近期動態、活動與出版資訊。</p>

<h2 class="section-title">全部消息</h2>
<ul class="list-clean">
  {% for post in collections.news_zh %}
  <li>
    <a href="{{ post.url }}">{{ post.data.title }}</a>
    <div class="meta">{{ post.date | date("yyyy-MM-dd") }}</div>
    <p>{{ post.data.summary }}</p>
  </li>
  {% endfor %}
</ul>

<h2 class="section-title">媒體：影片</h2>
<ul class="list-clean">
  {% for post in collections.news_zh | byType("video") %}
  <li>
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
  {% for post in collections.news_zh | byType("audio") %}
  <li>
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
