import PhotoSwipeLightbox from "/assets/js/photoswipe-lightbox.esm.min.js";
import PhotoSwipe from "/assets/js/photoswipe.esm.min.js";

const pageLang = document.documentElement.lang === "zh" ? "zh" : "en";

const privateCollectionLabel = { en: "Private Collection", zh: "私人收藏" };

const metaLabels = {
  en: { year: "Year", size: "Size", medium: "Medium", status: "Status" },
  zh: { year: "年份", size: "尺寸", medium: "媒材", status: "狀態" },
};

const descToggleLabels = {
  en: "Show description",
  zh: "顯示描述",
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
          el.innerHTML = `<div class="pswp-caption">
  <div class="pswp-caption-title">
    <span class="pswp-caption-name">${item.alt}</span>
    <span class="pswp-caption-count">${pswp.currIndex + 1}\u2009/\u2009${dataSource.length}</span>
  </div>
  <ul class="pswp-meta-list${item._privateCollection ? "" : " pswp-meta-list--3col"}">
    <li><span>${labels.year}</span><strong>${item._year || "\u2014"}</strong></li>
    <li><span>${labels.size}</span><strong>${item._size || "\u2014"}</strong></li>
    <li><span>${labels.medium}</span><strong>${item._medium || "\u2014"}</strong></li>
    ${statusLi}
  </ul>
</div>`;
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

    lightbox.pswp.ui.registerElement({
      name: "artwork-desc-toggle",
      title: descToggleLabels[lang],
      ariaLabel: descToggleLabels[lang],
      order: 8,
      isButton: true,
      html: {
        isCustomSVG: true,
        inner: '<circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" stroke-width="2"/>'
          + '<line x1="16" y1="14.5" x2="16" y2="22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'
          + '<circle cx="16" cy="10" r="1.6" fill="currentColor"/>',
        outlineID: "pswp__icn-desc",
      },
      onClick: () => {
        if (descPanelEl) descPanelEl.classList.toggle("is-open");
      },
      onInit: (el, pswp) => {
        function updateVisibility() {
          const item = pswp.currSlide && pswp.currSlide.data;
          el.style.display = item && item._desc ? "" : "none";
        }
        pswp.on("change", updateVisibility);
        updateVisibility();
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
