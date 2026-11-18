(function () {
  var form = document.getElementById("quote-form");
  var statusEl = document.getElementById("form-status");
  var intentSelect = document.getElementById("intent");
  var navToggle = document.getElementById("nav-toggle");
  var TO = "moises@shipnestsupply.com";

  var intentLabels = {
    quote: "Wholesale quote request",
    sample: "Free sample pack request",
    custom: "Custom printed mailers quote",
    partner: "Supplier partnership inquiry",
  };

  function setIntent(value) {
    if (intentSelect && intentLabels[value]) {
      intentSelect.value = value;
    }
  }

  function applyIntentFromLink(link) {
    var intent = link.getAttribute("data-intent");
    if (intent) setIntent(intent);
  }

  document.querySelectorAll("[data-intent]").forEach(function (link) {
    link.addEventListener("click", function () {
      applyIntentFromLink(link);
      if (navToggle) navToggle.checked = false;
    });
  });

  document.querySelectorAll(".site-nav a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (navToggle) navToggle.checked = false;
    });
  });

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var name = (document.getElementById("name").value || "").trim();
      var shop = (document.getElementById("shop").value || "").trim();
      var email = (document.getElementById("email").value || "").trim();
      var intent = intentSelect ? intentSelect.value : "quote";
      var message = (document.getElementById("message").value || "").trim();
      var label = intentLabels[intent] || "Inquiry";

      var subject = "ShipNest: " + label;
      if (shop) subject += " — " + shop;
      else if (name) subject += " — " + name;

      var body = [
        "Name: " + name,
        "Shop or company: " + (shop || "—"),
        "Email: " + email,
        "Interest: " + label,
        "",
        message || "(No additional note)",
      ].join("\n");

      var href =
        "mailto:" +
        TO +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);

      window.location.href = href;

      if (statusEl) {
        statusEl.hidden = false;
        statusEl.textContent =
          "Your email app should open with a message to " +
          TO +
          ". If it doesn’t, please write us directly.";
      }
    });
  }
})();
