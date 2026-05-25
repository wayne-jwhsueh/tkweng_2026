---
layout: layouts/base.njk
title: 聯絡
lang: zh
description: 聯絡方式與社群平台
permalink: "/zh/contact/index.html"
---

<h1>聯絡</h1>
<section class="contact-hero">
  <p class="contact-lead">
    如需課程諮詢、展覽合作或作品相關詢問，歡迎透過電子郵件或社群平台聯絡。
  </p>
  <div class="contact-social">
    {% include "components/social-links.njk" %}
  </div>
</section>

<section class="contact-grid" aria-label="工作室聯絡資訊">
  <article class="contact-card">
    <h2>溫哥華西區工作室</h2>
    <ul class="contact-facts">
      <li><i class="fa-solid fa-location-dot fa-fw" aria-label="地址"></i> 306-5970 East Boulevard, Vancouver, BC, V6M 3V4</li>
      <li><i class="fa-solid fa-phone fa-fw" aria-label="電話"></i><span data-secret="phoneA"></span> 或 <span data-secret="phoneB"></span></li>
      <li><i class="fa-solid fa-envelope fa-fw" aria-label="電子郵件"></i><span data-secret="email"></span></li>
      <li><i class="fa-solid fa-clock fa-fw" aria-label="開放時間"></i> 週一至週六，上午 9:00 至下午 6:00</li>
    </ul>
    <p>
      <a href="https://www.google.com/maps/search/?api=1&query=306-5970+East+Boulevard,+Vancouver,+BC,+V6M+3V4" target="_blank" rel="noopener noreferrer">
        在 Google 地圖開啟
      </a>
    </p>
    <iframe
      title="溫哥華工作室地圖"
      src="https://www.google.com/maps?q=306-5970+East+Boulevard,+Vancouver,+BC,+V6M+3V4&output=embed"
      width="100%"
      height="280"
      style="border:0;"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade">
    </iframe>
  </article>

  <article class="contact-card">
    <h2>本拿比工作室</h2>
    <ul class="contact-facts">
      <li><i class="fa-solid fa-location-dot fa-fw" aria-label="地址"></i> 9985 David Drive, Burnaby, BC, V3J 1H4, Canada</li>
      <li><i class="fa-solid fa-phone fa-fw" aria-label="電話"></i><span data-secret="phoneA"></span> 或 <span data-secret="phoneB"></span></li>
      <li><i class="fa-solid fa-envelope fa-fw" aria-label="電子郵件"></i><span data-secret="email"></span></li>
      <li><i class="fa-solid fa-clock fa-fw" aria-label="開放時間"></i> 週一至週六，上午 9:00 至下午 6:00</li>
    </ul>
    <p>
      <a href="https://www.google.com/maps/search/?api=1&query=9985+David+Drive,+Burnaby,+BC,+V3J+1H4,+Canada" target="_blank" rel="noopener noreferrer">
        在 Google 地圖開啟
      </a>
    </p>
    <iframe
      title="本拿比工作室地圖"
      src="https://www.google.com/maps?q=9985+David+Drive,+Burnaby,+BC,+V3J+1H4,+Canada&output=embed"
      width="100%"
      height="280"
      style="border:0;"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade">
    </iframe>
  </article>
</section>
