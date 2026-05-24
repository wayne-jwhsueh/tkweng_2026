---
layout: layouts/base.njk
title: Contact
lang: en
description: Contact and social channels
permalink: "/en/contact/index.html"
---

<h1>Contact</h1>
<section class="contact-hero">
  <p class="contact-lead">
    For classes, exhibition collaboration, and artwork inquiries, please contact by email or social channels.
  </p>
  <div class="contact-social">
    <a href="https://www.facebook.com/tengkoweng.weng">Facebook</a>
    <a href="https://www.instagram.com/tengkoweng">Instagram</a>
  </div>
</section>

<section class="contact-grid" aria-label="Studio contacts">
  <article class="contact-card">
    <h2>Vancouver Studio</h2>
    <ul class="contact-facts">
      <li><strong>Address:</strong> 306-5970 East Boulevard, Vancouver, BC, V6M 3V4</li>
      <li><strong>Phone:</strong> <span data-secret="phoneA"></span> or <span data-secret="phoneB"></span></li>
      <li><strong>Email:</strong> <span data-secret="email"></span></li>
      <li><strong>Hours:</strong> Monday to Saturday, 9:00 AM to 6:00 PM</li>
    </ul>
    <p>
      <a href="https://www.google.com/maps/search/?api=1&query=306-5970+East+Boulevard,+Vancouver,+BC,+V6M+3V4" target="_blank" rel="noopener noreferrer">
        Open in Google Maps
      </a>
    </p>
    <iframe
      title="Vancouver Studio Map"
      src="https://www.google.com/maps?q=306-5970+East+Boulevard,+Vancouver,+BC,+V6M+3V4&output=embed"
      width="100%"
      height="280"
      style="border:0;"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade">
    </iframe>
  </article>

  <article class="contact-card">
    <h2>Burnaby Studio</h2>
    <ul class="contact-facts">
      <li><strong>Address:</strong> 9985 David Drive, Burnaby, BC, V3J 1H4, Canada</li>
      <li><strong>Phone:</strong> <span data-secret="phoneA"></span> or <span data-secret="phoneB"></span></li>
      <li><strong>Email:</strong> <span data-secret="email"></span></li>
      <li><strong>Hours:</strong> Monday to Saturday, 9:00 AM to 6:00 PM</li>
    </ul>
    <p>
      <a href="https://www.google.com/maps/search/?api=1&query=9985+David+Drive,+Burnaby,+BC,+V3J+1H4,+Canada" target="_blank" rel="noopener noreferrer">
        Open in Google Maps
      </a>
    </p>
    <iframe
      title="Burnaby Studio Map"
      src="https://www.google.com/maps?q=9985+David+Drive,+Burnaby,+BC,+V3J+1H4,+Canada&output=embed"
      width="100%"
      height="280"
      style="border:0;"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade">
    </iframe>
  </article>
</section>

<script>
  (function () {
    var secretData = {
      phoneA: [40, 54, 48, 52, 41, 32, 50, 57, 56, 45, 51, 57, 50, 56],
      phoneB: [40, 54, 48, 52, 41, 32, 57, 54, 49, 45, 57, 57, 51, 51],
      email: [112, 115, 97, 108, 109, 115, 119, 101, 110, 103, 64, 121, 97, 104, 111, 111, 46, 99, 111, 109, 46, 116, 119]
    };

    function decode(chars) {
      return String.fromCharCode.apply(null, chars);
    }

    document.querySelectorAll("[data-secret]").forEach(function (el) {
      var key = el.getAttribute("data-secret");
      var value = decode(secretData[key] || []);

      if (key === "email") {
        var link = document.createElement("a");
        link.href = "mailto:" + value;
        link.textContent = value;
        el.appendChild(link);
        return;
      }

      el.textContent = value;
    });
  })();
</script>
