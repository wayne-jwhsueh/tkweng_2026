---
layout: layouts/base.njk
title: Services
lang: en
description: Art lessons, commissioned paintings, restoration, and consultation
permalink: "/en/services/index.html"
---

<h1>Services</h1>
<p class="meta">
  Teng-Ko Weng offers a range of services built on decades of professional experience in oil painting,
  teaching, and artistic practice. For enquiries, please use the <a href="/en/contact/">contact page</a>.
</p>

<div class="services-tabs-wrap">
  <div class="services-tablist" data-service-tabs role="tablist" aria-label="Browse services">
    <span class="service-tab-indicator" aria-hidden="true"></span>
    <button class="service-tab" id="tab-lessons" data-tab="lessons" role="tab" aria-selected="true" aria-controls="panel-lessons">
      <i class="fa-solid fa-palette service-tab-icon" aria-hidden="true"></i>
      <span class="service-tab-label">Art Lessons</span>
    </button>
    <button class="service-tab" id="tab-commission" data-tab="commission" role="tab" aria-selected="false" aria-controls="panel-commission" tabindex="-1">
      <i class="fa-solid fa-paintbrush service-tab-icon" aria-hidden="true"></i>
      <span class="service-tab-label">Commissioned Work</span>
    </button>
    <button class="service-tab" id="tab-restoration" data-tab="restoration" role="tab" aria-selected="false" aria-controls="panel-restoration" tabindex="-1">
      <i class="fa-solid fa-toolbox service-tab-icon" aria-hidden="true"></i>
      <span class="service-tab-label">Restoration &amp; Repair</span>
    </button>
    <button class="service-tab" id="tab-consultation" data-tab="consultation" role="tab" aria-selected="false" aria-controls="panel-consultation" tabindex="-1">
      <i class="fa-solid fa-comments service-tab-icon" aria-hidden="true"></i>
      <span class="service-tab-label">Consultation</span>
    </button>
  </div>

  <div class="service-panels">
    <section class="service-panel" id="panel-lessons" role="tabpanel" aria-labelledby="tab-lessons" data-panel="lessons">
      <h2 class="service-panel-title">
        <span class="icon-badge"><i class="fa-solid fa-palette" aria-hidden="true"></i></span>
        Art Lessons
      </h2>
      <p>
        Six class types are offered for different ages, levels, and goals — from university portfolio preparation
        to casual creative development. Lessons are conducted primarily in Mandarin.
      </p>
      <ul class="service-list">
        <li><strong>Portfolio Preparation Class</strong> — For students grade 8 or above; professional guidance is offered through the creation of university-level application portfolios. Designed to encourage students to think critically, conceptually, and creatively.</li>
        <li><strong>Gifted Training Class</strong> — For those interested in competitions and personalized arts tutoring. Tailored for any age to foster individual artistic development.</li>
        <li><strong>Foundational Painting Class</strong> — For those over 10 years old; designed for those aspiring to pursue the creative arts by building essential foundational techniques.</li>
        <li><strong>Children's Painting Class</strong> — For kids age 6-9 interested in developing creative drawing and self-expression skills.</li>
        <li><strong>Adults' Painting Class</strong> — A community for adults interested in art as a leisurely pastime and exploring creative expressions.</li>
        <li><strong>Intro to Character Concept and Design</strong> — For ages 10+; focuses on character creation and design pipelines suitable for 2D or 3D productions.</li>
      </ul>
      <p class="cta-row">
        <a class="btn btn-primary" href="https://www.gloriousart.ca/" target="_blank" rel="noopener">
          View Full Class Details at GloriousArt.ca
        </a>
      </p>
    </section>

    <section class="service-panel" id="panel-commission" role="tabpanel" aria-labelledby="tab-commission" data-panel="commission" hidden>
      <h2 class="service-panel-title">
        <span class="icon-badge"><i class="fa-solid fa-paintbrush" aria-hidden="true"></i></span>
        Commissioned Work
      </h2>
      <p>
        Custom original paintings created to your brief. Suitable for:
      </p>
      <ul class="service-list">
        <li>Family and personal portraits</li>
        <li>Publication and book cover illustrations</li>
        <li>Commemorative and gift paintings</li>
        <li>Interior and architectural artwork</li>
        <li>Community and institutional projects</li>
      </ul>
      <p class="service-panel-foot">
        Each commission is handled personally, with close collaboration on composition, scale, and medium.
      </p>
    </section>

    <section class="service-panel" id="panel-restoration" role="tabpanel" aria-labelledby="tab-restoration" data-panel="restoration" hidden>
      <h2 class="service-panel-title">
        <span class="icon-badge"><i class="fa-solid fa-toolbox" aria-hidden="true"></i></span>
        Oil Painting Restoration and Repair
      </h2>
      <p>
        Specialist care for aging and damaged oil paintings, including:
      </p>
      <ul class="service-list">
        <li>Surface crack assessment and repair</li>
        <li>Canvas stabilisation and relining consultation</li>
        <li>Varnish removal and re-varnishing</li>
        <li>Colour touch-up and retouching</li>
      </ul>
      <p class="service-panel-foot">
        Suitable for family heirlooms, collected works, and paintings that have been in storage.
        Condition assessment available before any work begins.
      </p>
    </section>

    <section class="service-panel" id="panel-consultation" role="tabpanel" aria-labelledby="tab-consultation" data-panel="consultation" hidden>
      <h2 class="service-panel-title">
        <span class="icon-badge"><i class="fa-solid fa-comments" aria-hidden="true"></i></span>
        Artwork Consultation
      </h2>
      <p>
        Practical advice and guidance from an experienced professional eye, including:
      </p>
      <ul class="service-list">
        <li>Framing and presentation recommendations</li>
        <li>Display and lighting arrangement for home or gallery</li>
        <li>Style and composition direction for collectors</li>
        <li>Condition review and care advice for existing works</li>
        <li>Art acquisition guidance</li>
      </ul>
      <p class="service-panel-foot">
        Sometimes a single honest opinion makes a significant difference — as anyone who has ever
        transformed a dull old painting by changing its frame will know.
      </p>
    </section>
  </div>
</div>

<script src="/assets/js/services-tabs.js" defer></script>
