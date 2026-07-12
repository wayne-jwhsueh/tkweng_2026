(function () {
  var container = document.querySelector("[data-news-tabs]");
  var panel = document.getElementById("news-year-panel");
  if (!container || !panel) return;

  function setActiveTab(year) {
    container.querySelectorAll(".news-tab").forEach(function (tab) {
      var isActive = tab.dataset.year === String(year);
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  }

  function updateLangSwitch(year) {
    var langSwitch = document.querySelector(".lang-switch");
    if (!langSwitch) return;
    langSwitch.setAttribute(
      "href",
      langSwitch.getAttribute("href").replace(/\/news\/\d{4}\/?$/, "/news/" + year + "/")
    );
  }

  container.addEventListener("click", function (event) {
    var tab = event.target.closest(".news-tab");
    if (!tab || tab.classList.contains("is-active")) {
      if (tab) event.preventDefault();
      return;
    }

    event.preventDefault();
    var year = tab.dataset.year;

    fetch(tab.href)
      .then(function (response) {
        if (!response.ok) throw new Error("Failed to load year " + year);
        return response.text();
      })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, "text/html");
        var newPanel = doc.getElementById("news-year-panel");
        if (!newPanel) throw new Error("Missing panel in response");

        panel.innerHTML = newPanel.innerHTML;
        setActiveTab(year);
        updateLangSwitch(year);
        document.title = doc.title;
        history.pushState({ year: year }, "", tab.href);
      })
      .catch(function () {
        window.location.href = tab.href;
      });
  });

  window.addEventListener("popstate", function () {
    window.location.reload();
  });
})();
