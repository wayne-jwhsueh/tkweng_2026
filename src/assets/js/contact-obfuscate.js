(function () {
  var secretData = {
    phoneA: [40, 54, 48, 52, 41, 32, 50, 57, 56, 45, 51, 57, 50, 56],
    phoneB: [40, 54, 48, 52, 41, 32, 57, 54, 49, 45, 57, 57, 51, 51],
    email: [112, 115, 97, 108, 109, 115, 119, 101, 110, 103, 64, 121, 97, 104, 111, 111, 46, 99, 111, 109, 46, 116, 119]
  };

  function decode(chars) {
    return String.fromCharCode.apply(null, chars || []);
  }

  var secretElements = document.querySelectorAll("[data-secret]");
  if (!secretElements.length) {
    return;
  }

  secretElements.forEach(function (el) {
    var key = el.getAttribute("data-secret");

    if (!Object.prototype.hasOwnProperty.call(secretData, key)) {
      return;
    }

    var value = decode(secretData[key]);

    if (key === "email") {
      var link = document.createElement("a");
      link.href = "mailto:" + value;
      link.textContent = value;
      el.appendChild(link);
      return;
    }

    el.textContent = value;
  });
})();
