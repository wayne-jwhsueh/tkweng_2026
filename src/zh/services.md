---
layout: layouts/base.njk
title: 服務
lang: zh
description: 藝術課程、委託創作與諮詢服務
permalink: "/zh/services/index.html"
---

<h1>服務</h1>
<p class="meta">
  翁登科提供多項結合數十年專業經驗的服務，涵蓋油畫教學、委託創作與藝術諮詢。
  如需洽詢，請至<a href="/zh/contact/">聯絡頁面</a>。
</p>

<div class="services-tabs-wrap">
  <div class="services-tablist" data-service-tabs role="tablist" aria-label="瀏覽服務項目">
    <span class="service-tab-indicator" aria-hidden="true"></span>
    <button class="service-tab" id="tab-lessons" data-tab="lessons" role="tab" aria-selected="true" aria-controls="panel-lessons">
      <i class="fa-solid fa-palette service-tab-icon" aria-hidden="true"></i>
      <span class="service-tab-label">藝術課程</span>
    </button>
    <button class="service-tab" id="tab-commission" data-tab="commission" role="tab" aria-selected="false" aria-controls="panel-commission" tabindex="-1">
      <i class="fa-solid fa-paintbrush service-tab-icon" aria-hidden="true"></i>
      <span class="service-tab-label">委託創作</span>
    </button>
    <button class="service-tab" id="tab-consultation" data-tab="consultation" role="tab" aria-selected="false" aria-controls="panel-consultation" tabindex="-1">
      <i class="fa-solid fa-comments service-tab-icon" aria-hidden="true"></i>
      <span class="service-tab-label">藝術諮詢</span>
    </button>
  </div>

  <div class="service-panels">
    <section class="service-panel" id="panel-lessons" role="tabpanel" aria-labelledby="tab-lessons" data-panel="lessons">
      <h2 class="service-panel-title">
        <span class="icon-badge"><i class="fa-solid fa-palette" aria-hidden="true"></i></span>
        藝術課程
      </h2>
      <p>
        提供六種不同年齡、程度與目標的課程，從大學入學作品集準備到輕鬆的創意學習皆有涵蓋。課程以中文授課為主。
      </p>
      <ul class="service-list">
        <li><strong>升學作品班</strong> — 適合8年級或以上的學生；通過創作大學級別的申請作品集提供專業指導。旨在鼓勵學生在開發作品時進行概念性和創造性的批判思考。</li>
        <li><strong>進階培訓班</strong> — 適合對藝術競賽和個性化藝術輔導感興趣的人士。不限年齡，專為促進個人藝術發展而設計。</li>
        <li><strong>繪畫基礎班</strong> — 適合10歲以上、有志於追求創意藝術的人士；通過建立必不可少的基礎技法來開展學習。</li>
        <li><strong>兒童繪畫班</strong> — 適合6至9歲、有興趣培養創造性繪畫能力及自我表達技巧的兒童。</li>
        <li><strong>成人繪畫班</strong> — 為對藝術感興趣並將其作為休閒愛好的成年人提供的一個互動與創作社區。</li>
        <li><strong>角色概念與設計簡介</strong> — 適合10歲以上；專注於適合2D或3D製作的角色創作與概念設計流程。</li>
      </ul>
      <p class="cta-row">
        <a class="btn btn-primary" href="https://www.gloriousart.ca/" target="_blank" rel="noopener">
          前往 GloriousArt.ca 查看完整課程資訊
        </a>
      </p>
    </section>

    <section class="service-panel" id="panel-commission" role="tabpanel" aria-labelledby="tab-commission" data-panel="commission" hidden>
      <h2 class="service-panel-title">
        <span class="icon-badge"><i class="fa-solid fa-paintbrush" aria-hidden="true"></i></span>
        委託創作
      </h2>
      <p>
        依委託需求創作原創油畫，適合：
      </p>
      <ul class="service-list">
        <li>家族與個人肖像</li>
        <li>出版品與書籍封面插畫</li>
        <li>紀念性與禮品畫作</li>
        <li>室內與建築空間藝術品</li>
        <li>社區與機構專案</li>
      </ul>
      <p class="service-panel-foot">
        每件委託均由翁登科親自處理，從構圖、尺寸到媒材皆與委託方密切溝通。
      </p>
    </section>

    <section class="service-panel" id="panel-consultation" role="tabpanel" aria-labelledby="tab-consultation" data-panel="consultation" hidden>
      <h2 class="service-panel-title">
        <span class="icon-badge"><i class="fa-solid fa-comments" aria-hidden="true"></i></span>
        藝術諮詢
      </h2>
      <p>
        由資深藝術家提供實用的專業建議，包含：
      </p>
      <ul class="service-list">
        <li>裝裱與作品呈現建議</li>
        <li>居家或展覽空間的陳設與燈光安排</li>
        <li>收藏方向與風格建議</li>
        <li>現有作品的狀況評估與保養指引</li>
        <li>購藏作品的參考意見</li>
      </ul>
      <p class="service-panel-foot">
        有時一個專業的誠實建議就能帶來顯著改變——例如為一幅老舊收藏畫更換合適畫框，
        往往能讓整件作品煥然一新。
      </p>
    </section>
  </div>
</div>

<script src="/assets/js/services-tabs.js" defer></script>
