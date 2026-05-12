---
layout: layouts/base.njk
title: Home
lang: en
description: Artist, author, and portfolio home
permalink: "/en/index.html"
---

<section class="hero">
  <div>
    <h1>Creative Work, Writing, and Archives</h1>
    <p>
      Welcome to the official site of T.K. Weng. This space brings together portfolio projects,
      publications, and current updates in one calm and readable archive.
    </p>
    <div class="cta-row">
      <a class="btn btn-primary" href="/en/portfolio/">View Portfolio</a>
      <a class="btn" href="/en/news/">Read News</a>
    </div>
  </div>
  <div class="hero-card">
    <p><strong>Focus Areas</strong></p>
    <p>Painting, writing, mixed media, and selected cultural projects.</p>
    <p class="meta">Bilingual content available in English and Traditional Chinese.</p>
  </div>
</section>

<section>
  <h2 class="section-title">Featured Projects</h2>
  <div class="grid">
    {% for item in collections.portfolio_en | slice(0, 3) %}
    <article class="card">
      <div class="card-body">
        <h3><a href="{{ item.url }}">{{ item.data.title }}</a></h3>
        <p>{{ item.data.summary }}</p>
      </div>
    </article>
    {% endfor %}
  </div>
</section>

<section>
  <h2 class="section-title">Latest News</h2>
  <ul class="list-clean">
    {% for post in collections.news_en | slice(0, 3) %}
    <li>
      <a href="{{ post.url }}">{{ post.data.title }}</a>
      <div class="meta">{{ post.date | date("yyyy-MM-dd") }}</div>
    </li>
    {% endfor %}
  </ul>
</section>
