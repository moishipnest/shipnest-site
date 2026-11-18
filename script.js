(function () {
  var form = document.getElementById("quote-form");
  var statusEl = document.getElementById("form-status");
  var intentSelect = document.getElementById("intent");
  var navToggle = document.getElementById("nav-toggle");
  var navLabel = navToggle && navToggle.querySelector(".visually-hidden");
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

  function setNavOpen(open) {
    if (!navToggle) return;
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    if (navLabel) navLabel.textContent = open ? "Close menu" : "Open menu";
  }

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var open = navToggle.getAttribute("aria-expanded") !== "true";
      setNavOpen(open);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
        setNavOpen(false);
        navToggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 861px)").matches) {
        setNavOpen(false);
      }
    });
  }

  document.querySelectorAll("[data-intent]").forEach(function (link) {
    link.addEventListener("click", function () {
      var intent = link.getAttribute("data-intent");
      if (intent) setIntent(intent);
      setNavOpen(false);
    });
  });

  document.querySelectorAll(".site-nav a").forEach(function (link) {
    link.addEventListener("click", function () {
      setNavOpen(false);
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
