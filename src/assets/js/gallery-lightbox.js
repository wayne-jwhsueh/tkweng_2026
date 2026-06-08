import PhotoSwipeLightbox from "/assets/js/photoswipe-lightbox.esm.min.js";
import PhotoSwipe from "/assets/js/photoswipe.esm.min.js";

const pageLang = document.documentElement.lang === "zh" ? "zh" : "en";

const statusLabels = {
  en: { T: "Sold", F: "For Sale", N: "Artist Collection" },
  zh: { T: "已售", F: "可洽購", N: "畫家珍藏" },
};

const metaLabels = {
  en: { year: "Year", size: "Size", medium: "Medium", status: "Status" },
  zh: { year: "年份", size: "尺寸", medium: "媒材", status: "狀態" },
};

document.querySelectorAll("[data-gallery]").forEach((gallery) => {
  const items = Array.from(gallery.querySelectorAll("[data-gallery-item]"));
  if (!items.length) return;

  const dataSource = items.map((btn) => ({
    src: btn.dataset.full || btn.dataset.thumb,
    msrc: btn.dataset.thumb,
    width: Number(btn.dataset.width) || 1600,
    height: Number(btn.dataset.height) || 1200,
    alt: btn.dataset.title || "",
    cropped: true,
    _year: btn.dataset.year || "",
    _size: btn.dataset.size || "",
    _medium: btn.dataset.medium || "",
    _status: btn.dataset.status || "N",
  }));

  const lang = pageLang;
  const labels = metaLabels[lang];
  const statusMap = statusLabels[lang];

  const lightbox = new PhotoSwipeLightbox({
    pswpModule: PhotoSwipe,
    bgOpacity: 0.9,
    getThumbBoundsFn: (index) => {
      const btn = items[index];
      if (!btn) return;
      const img = btn.querySelector("img");
      if (!img) return;
      const rect = img.getBoundingClientRect();
      return { x: rect.left, y: rect.top + window.scrollY, w: rect.width };
    },
  });

  // Custom bottom caption bar with artwork metadata
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
          const statusText = statusMap[item._status] || statusMap["N"];
          el.innerHTML = `<div class="pswp-caption">
  <div class="pswp-caption-title">
    <span class="pswp-caption-name">${item.alt}</span>
    <span class="pswp-caption-count">${pswp.currIndex + 1}\u2009/\u2009${dataSource.length}</span>
  </div>
  <ul class="pswp-meta-list">
    <li><span>${labels.year}</span><strong>${item._year || "\u2014"}</strong></li>
    <li><span>${labels.size}</span><strong>${item._size || "\u2014"}</strong></li>
    <li><span>${labels.medium}</span><strong>${item._medium || "\u2014"}</strong></li>
    <li><span>${labels.status}</span><strong>${statusText}</strong></li>
  </ul>
</div>`;
        }
        pswp.on("change", updateCaption);
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
