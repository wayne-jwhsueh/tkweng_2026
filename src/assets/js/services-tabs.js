(function () {
  var tablists = document.querySelectorAll("[data-service-tabs]");

  tablists.forEach(function (tablist) {
    var tabs = Array.prototype.slice.call(tablist.querySelectorAll(".service-tab"));
    var indicator = tablist.querySelector(".service-tab-indicator");
    var wrap = tablist.closest(".services-tabs-wrap");
    if (!wrap || !tabs.length) return;

    function moveIndicator(tab) {
      if (!indicator) return;
      indicator.style.width = tab.offsetWidth + "px";
      indicator.style.transform = "translateX(" + tab.offsetLeft + "px)";
    }

    function activate(tab, options) {
      options = options || {};
      tabs.forEach(function (t) {
        var isActive = t === tab;
        t.classList.toggle("is-active", isActive);
        t.setAttribute("aria-selected", isActive ? "true" : "false");
        t.setAttribute("tabindex", isActive ? "0" : "-1");
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.hidden = !isActive;
      });
      moveIndicator(tab);
      tab.scrollIntoView({ inline: "center", block: "nearest" });
      if (options.focus) tab.focus();
      if (options.updateHash) {
        history.replaceState(null, "", "#" + tab.dataset.tab);
      }
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        activate(tab, { updateHash: true });
      });

      tab.addEventListener("keydown", function (event) {
        var targetIndex = null;
        if (event.key === "ArrowRight") targetIndex = (index + 1) % tabs.length;
        else if (event.key === "ArrowLeft") targetIndex = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === "Home") targetIndex = 0;
        else if (event.key === "End") targetIndex = tabs.length - 1;

        if (targetIndex !== null) {
          event.preventDefault();
          activate(tabs[targetIndex], { focus: true, updateHash: true });
        }
      });
    });

    var hash = window.location.hash.replace("#", "");
    var initial = tabs.filter(function (t) { return t.dataset.tab === hash; })[0] || tabs[0];
    activate(initial);

    window.addEventListener("resize", function () {
      var active = tablist.querySelector(".service-tab.is-active");
      if (active) moveIndicator(active);
    });
  });
})();
