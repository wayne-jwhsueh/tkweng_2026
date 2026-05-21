---
layout: layouts/base.njk
title: News Archive
lang: zh
description: 依年份整理的歷年消息
permalink: "/zh/news/archive/index.html"
---

<h1>News Archive</h1>
<p class="meta">依年份瀏覽歷年消息。</p>

{% set years = collections.news_zh | newsYears %}

{% if years.length %}
<ul class="list-clean">
  {% for year in years %}
  <li><a href="#year-{{ year }}">{{ year }}</a></li>
  {% endfor %}
</ul>

{% for year in years %}
<h2 class="section-title" id="year-{{ year }}">{{ year }}</h2>
<ul class="list-clean">
  {% for post in collections.news_zh | byYear(year) %}
  <li>
    <a href="{{ post.url }}">{{ post.data.title }}</a>
    <div class="meta">{{ post.date | date("yyyy-MM-dd") }}</div>
    <p>{{ post.data.summary }}</p>
  </li>
  {% endfor %}
</ul>
{% endfor %}
{% else %}
<p class="meta">目前尚無彙整內容。</p>
{% endif %}

<p><a class="btn" href="/zh/news/">返回最新消息</a></p>
