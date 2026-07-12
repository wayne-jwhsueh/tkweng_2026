(function () {
  var img = document.getElementById('inspiration-bg');
  if (!img) return;

  var poolEl = document.getElementById('inspiration-pool');
  if (!poolEl) return;

  var pool;
  try {
    pool = JSON.parse(poolEl.textContent);
  } catch (e) {
    return;
  }
  if (!Array.isArray(pool) || !pool.length) return;

  var pick = pool[Math.floor(Math.random() * pool.length)];
  img.src = pick.src;
  img.addEventListener('load', function () {
    img.classList.add('is-visible');
  }, { once: true });

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || typeof window.requestAnimationFrame !== 'function') return;

  var section = img.closest('.about-inspiration');
  if (!section) return;

  var SPEED = 1;
  var OVERSCAN_RATIO = 0.3;
  var ticking = false;

  function update() {
    ticking = false;
    var rect = section.getBoundingClientRect();
    var viewportH = window.innerHeight || document.documentElement.clientHeight;
    var maxOffset = rect.height * OVERSCAN_RATIO;
    // Center of the scroll range (top === viewportH/2 - rect.height/2) maps to offset 0,
    // so the image visibly travels through its full overscan as the section crosses the viewport.
    var progress = (viewportH / 2 - (rect.top + rect.height / 2)) / (viewportH / 2 + rect.height / 2);
    var offset = progress * maxOffset * SPEED;
    offset = Math.max(-maxOffset, Math.min(maxOffset, offset));
    img.style.setProperty('--parallax-y', offset.toFixed(1) + 'px');
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
})();
