(function () {
  document.querySelectorAll('[data-random-thumb]').forEach(function (img) {
    var pool = readPool(img.getAttribute('data-random-thumb'));
    if (!pool || !pool.length) return;

    img.src = pool[Math.floor(Math.random() * pool.length)];
  });

  function readPool(id) {
    var el = document.getElementById(id);
    if (!el) return null;
    try {
      return JSON.parse(el.textContent);
    } catch (e) {
      return null;
    }
  }
})();
