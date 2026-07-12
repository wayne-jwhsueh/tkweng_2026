---
layout: layouts/base.njk
title: Guo-Zhong Qu and Teng-Ko Weng Joint Art Exhibition
lang: en
date: 2015-06-01
ogType: article
tags:
  - news_en
summary: Announcement for a joint exhibition held at Crystal Mall, Burnaby, in July 2015.
type: exhibition
year: 2015
source: backup_2016
cover: /images/news/news_0005_eng.jpg
coverAlt: Poster image for the July 2015 joint exhibition
permalink: "/en/news/2015-06-01--01--joint-art-exhibition/"
---

<div class="news-entry-header">
  <p class="news-entry-date">{{ date | date("yyyy-MM-dd") }}</p>
  <h1 class="news-entry-title">{{ title }}</h1>
  {% if author %}<p class="news-entry-author">{{ 'By' if lang == 'en' else '作者：' }} {{ author }}</p>{% endif %}
</div>

<img class="news-cover-image" src="/images/news/news_0005_eng.jpg" alt="Poster image for the July 2015 joint exhibition" loading="lazy" />

- Date: July 3, 2015 to July 15, 2015
- Venue: CCM Canada at Crystal Mall (2nd Floor), Burnaby
- Opening: July 6 at 2:00 PM

Please join and support the exhibition.

{% from "components/back-to-news.njk" import backToNews %}
{{ backToNews(lang, year) }}
