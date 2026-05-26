(function () {
  const galleries = Array.from(document.querySelectorAll("[data-gallery]"));
  if (!galleries.length) {
    return;
  }

  galleries.forEach((gallery) => {
    const items = Array.from(gallery.querySelectorAll("[data-gallery-item]"));
    const dialog = gallery.querySelector("[data-gallery-dialog]");
    const imageEl = gallery.querySelector("[data-gallery-dialog-image]");
    const captionEl = gallery.querySelector("[data-gallery-dialog-caption]");
    const countEl = gallery.querySelector("[data-gallery-dialog-count]");
    const yearEl = gallery.querySelector("[data-gallery-dialog-year]");
    const sizeEl = gallery.querySelector("[data-gallery-dialog-size]");
    const mediumEl = gallery.querySelector("[data-gallery-dialog-medium]");
    const statusEl = gallery.querySelector("[data-gallery-dialog-status]");

    const pageLang = document.documentElement.getAttribute("lang") === "zh" ? "zh" : "en";

    const statusLabelMap = {
      en: {
        T: "Sold",
        F: "For Sale",
        N: "Artist Collection"
      },
      zh: {
        T: "已售",
        F: "可洽購",
        N: "畫家珍藏"
      }
    };

    if (!items.length || !dialog || !imageEl || !captionEl || !countEl) {
      return;
    }

    let currentIndex = 0;

    function render(index) {
      const item = items[index];
      const full = item.getAttribute("data-full") || item.getAttribute("data-thumb");
      const title = item.getAttribute("data-title") || "Artwork";
      const year = item.getAttribute("data-year") || "-";
      const size = item.getAttribute("data-size") || "-";
      const medium = item.getAttribute("data-medium") || "-";
      const status = item.getAttribute("data-status") || "N";

      imageEl.src = full;
      imageEl.alt = title;
      captionEl.textContent = title;
      countEl.textContent = `${index + 1} / ${items.length}`;
      if (yearEl) {
        yearEl.textContent = year;
      }
      if (sizeEl) {
        sizeEl.textContent = size;
      }
      if (mediumEl) {
        mediumEl.textContent = medium;
      }
      if (statusEl) {
        statusEl.textContent = statusLabelMap[pageLang][status] || statusLabelMap[pageLang].N;
      }
      currentIndex = index;
    }

    function open(index) {
      render(index);
      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        dialog.setAttribute("open", "open");
      }
    }

    function close() {
      if (typeof dialog.close === "function") {
        dialog.close();
      } else {
        dialog.removeAttribute("open");
      }
    }

    function next() {
      render((currentIndex + 1) % items.length);
    }

    function previous() {
      render((currentIndex - 1 + items.length) % items.length);
    }

    items.forEach((item, index) => {
      item.addEventListener("click", () => open(index));
      item.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          open(index);
        }
      });
    });

    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        close();
      }
    });

    dialog.querySelector("[data-gallery-close]")?.addEventListener("click", close);
    dialog.querySelector("[data-gallery-next]")?.addEventListener("click", next);
    dialog.querySelector("[data-gallery-prev]")?.addEventListener("click", previous);

    document.addEventListener("keydown", (event) => {
      if (!dialog.open) {
        return;
      }

      if (event.key === "Escape") {
        close();
      }

      if (event.key === "ArrowRight") {
        next();
      }

      if (event.key === "ArrowLeft") {
        previous();
      }
    });
  });
})();
