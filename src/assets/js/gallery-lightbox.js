import PhotoSwipeLightbox from "/assets/js/photoswipe-lightbox.esm.min.js";
import PhotoSwipe from "/assets/js/photoswipe.esm.min.js";

const pageLang = document.documentElement.lang === "zh" ? "zh" : "en";

const privateCollectionLabel = { en: "Private Collection", zh: "私人收藏" };

const metaLabels = {
  en: { year: "Year", size: "Size", medium: "Medium", status: "Status" },
  zh: { year: "年份", size: "尺寸", medium: "媒材", status: "狀態" },
};

const descToggleLabels = {
  en: "Inspiration",
  zh: "靈感",
};

const descCloseLabels = {
  en: "Close description",
  zh: "關閉描述",
};

document.querySelectorAll("[data-gallery]").forEach((gallery) => {
  const items = Array.from(gallery.querySelectorAll("[data-gallery-item]"));
  if (!items.length) return;

  const descMapScript = gallery.querySelector("[data-gallery-descriptions]");
  let descMap = {};
  try {
    descMap = descMapScript ? JSON.parse(descMapScript.textContent || "{}") : {};
  } catch (_) {
    descMap = {};
  }

  const dataSource = items.map((btn) => ({
    src: btn.dataset.full || btn.dataset.thumb,
    // No msrc: the gallery thumbnail is a fixed square crop, but artwork
    // aspect ratios vary. PhotoSwipe stretches msrc uniformly assuming it
    // matches the full image's aspect ratio, so a square placeholder for a
    // non-square artwork visibly "pops" to the right shape once the full
    // image loads. Omitting it uses a plain placeholder sized to the real
    // width/height instead, so there's nothing to pop.
    width: Number(btn.dataset.width) || 1600,
    height: Number(btn.dataset.height) || 1200,
    alt: btn.dataset.title || "",
    _year: btn.dataset.year || "",
    _size: btn.dataset.size || "",
    _medium: btn.dataset.medium || "",
    _privateCollection: btn.dataset.private === "true",
    _desc: descMap[btn.dataset.id] || "",
  }));

  const lang = pageLang;
  const labels = metaLabels[lang];

  const lightbox = new PhotoSwipeLightbox({
    pswpModule: PhotoSwipe,
    bgOpacity: 0.9,
    getThumbBoundsFn: (index) => {
      const btn = items[index];
      if (!btn) return;
      const img = btn.querySelector("img");
      if (!img) return;
      const rect = img.getBoundingClientRect();
      const imageWidth = Number(btn.dataset.width) || rect.width;
      const imageHeight = Number(btn.dataset.height) || rect.height;

      // Thumbnail is cropped via object-fit: cover, so replicate PhotoSwipe's
      // own cropped-bounds math (fill the thumb box, center-crop) rather than
      // just returning the thumb's raw box — otherwise the opening animation
      // starts from the wrong shape/position and visibly "pops" once
      // PhotoSwipe recalculates the real bounds.
      const fillZoomLevel = Math.max(rect.width / imageWidth, rect.height / imageHeight);
      const offsetX = (rect.width - imageWidth * fillZoomLevel) / 2;
      const offsetY = (rect.height - imageHeight * fillZoomLevel) / 2;

      return {
        x: rect.left + offsetX,
        y: rect.top + offsetY,
        w: imageWidth * fillZoomLevel,
        innerRect: {
          w: rect.width,
          h: rect.height,
          x: offsetX,
          y: offsetY,
        },
      };
    },
  });

  // Custom bottom caption bar with artwork metadata, plus a toggleable
  // description panel (only for items that have a descEn/descZh) shown on
  // top of the image rather than inline, since descriptions can be long.
  lightbox.on("uiRegister", () => {
    lightbox.pswp.ui.registerElement({
      name: "artwork-caption",
      order: 9,
      isButton: false,
      appendTo: "root",
      onInit: (el, pswp) => {
        function updateCaption() {
          const item = pswp.currSlide && pswp.currSlide.data;
          if (!item) return;
          const statusLi = item._privateCollection
            ? `<li><span>${labels.status}</span><strong>${privateCollectionLabel[lang]}</strong></li>`
            : "";
          const descButton = item._desc
            ? `<button type="button" class="pswp-desc-cta">
        <svg class="pswp-desc-cta-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path d="M12 2a7 7 0 0 0-4 12.7c.6.5.9 1.2.9 2v.3a1 1 0 0 0 1 1h4.2a1 1 0 0 0 1-1v-.3c0-.8.3-1.5.9-2A7 7 0 0 0 12 2z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
          <line x1="10" y1="21" x2="14" y2="21" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
          <line x1="10.5" y1="18.3" x2="13.5" y2="18.3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
        </svg>
        <span>${descToggleLabels[lang]}</span>
      </button>`
            : "";
          el.innerHTML = `<div class="pswp-caption">
  <div class="pswp-caption-title">
    <span class="pswp-caption-name">${item.alt}</span>
    <span class="pswp-caption-count">${pswp.currIndex + 1}\u2009/\u2009${dataSource.length}</span>
  </div>
  <div class="pswp-caption-row">
    <ul class="pswp-meta-list${item._privateCollection ? "" : " pswp-meta-list--3col"}">
      <li><span>${labels.year}</span><strong>${item._year || "\u2014"}</strong></li>
      <li><span>${labels.size}</span><strong>${item._size || "\u2014"}</strong></li>
      <li><span>${labels.medium}</span><strong>${item._medium || "\u2014"}</strong></li>
      ${statusLi}
    </ul>
    ${descButton}
  </div>
</div>`;
          if (item._desc) {
            el.querySelector(".pswp-desc-cta").addEventListener("click", () => {
              if (descPanelEl) descPanelEl.classList.toggle("is-open");
            });
          }
        }
        pswp.on("change", updateCaption);
      },
    });

    let descPanelEl = null;

    lightbox.pswp.ui.registerElement({
      name: "artwork-desc-panel",
      order: 8,
      isButton: false,
      appendTo: "root",
      onInit: (el, pswp) => {
        el.classList.add("pswp-desc-panel");
        descPanelEl = el;

        function closeDescPanel() {
          el.classList.remove("is-open");
        }

        // Backdrop click (anywhere that isn't the text box or its contents,
        // e.g. a link) closes the panel, same as an explicit close button.
        el.addEventListener("click", (e) => {
          if (e.target === el || e.target.closest(".pswp-desc-panel-close")) {
            closeDescPanel();
          }
        });

        // PhotoSwipe attaches an unconditional wheel listener on its root
        // element that always preventDefault()s to pan/zoom the image —
        // stopping propagation here (before it bubbles that far) both keeps
        // the background image still and lets the browser natively scroll
        // the description text normally.
        el.addEventListener("wheel", (e) => {
          e.stopPropagation();
        });

        function updateDescPanel() {
          const item = pswp.currSlide && pswp.currSlide.data;
          el.classList.remove("is-open");
          el.innerHTML = item && item._desc
            ? `<div class="pswp-desc-panel-inner">`
              + `<button type="button" class="pswp-desc-panel-close" aria-label="${descCloseLabels[lang]}">&times;</button>`
              + `<div class="pswp-desc-panel-body">${item._desc}</div>`
              + `</div>`
            : "";
        }
        pswp.on("change", updateDescPanel);
      },
    });
  });

  items.forEach((btn, index) => {
    btn.addEventListener("click", () => lightbox.loadAndOpen(index, dataSource));
  });

  lightbox.init();

  // Deep-link: open image matching URL hash on page load (e.g. /en/portfolio/realism/#r0015)
  const hashId = window.location.hash.slice(1).toUpperCase();
  if (hashId) {
    const deepIndex = items.findIndex(
      (btn) => (btn.dataset.id || "").toUpperCase() === hashId
    );
    if (deepIndex >= 0) {
      lightbox.loadAndOpen(deepIndex, dataSource);
    }
  }
});
