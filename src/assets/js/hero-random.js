(function () {
  var img = document.getElementById('hero-bg');
  if (!img) return;

  var poolEl = document.getElementById('gallery-pool');
  if (!poolEl) return;

  var pool;
  try {
    pool = JSON.parse(poolEl.textContent);
  } catch (e) {
    return;
  }
  if (!Array.isArray(pool) || !pool.length) return;

  var lang = document.documentElement.lang || 'en';
  var pick = pool[Math.floor(Math.random() * pool.length)];

  img.src = pick.src;

  var cap = document.getElementById('hero-cap');
  if (cap) cap.textContent = lang === 'zh' ? pick.titleZh : pick.titleEn;

  var link = document.getElementById('hero-link');
  if (link) {
    var galleryPage = lang === 'zh' ? pick.galleryPageZh : pick.galleryPageEn;
    link.href = galleryPage + '#' + pick.id.toLowerCase();
    link.removeAttribute('hidden');
  }
})();

