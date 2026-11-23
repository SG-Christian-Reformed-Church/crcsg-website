/**
 * ============================================================================
 *  CRCSG WEBSITE INTERACTIONS & CONFIG HYDRATION
 * ============================================================================
 *  Vanilla JavaScript (no frameworks, no build tools, works everywhere).
 */
(function () {
  "use strict";

  var config = window.CRCSG_CONFIG || {};

  /**
   * Safely look up a nested path like "pastor.email" on an object.
   */
  function getByPath(obj, path) {
    if (!obj || !path) return undefined;
    var parts = path.split(".");
    var current = obj;
    for (var i = 0; i < parts.length; i++) {
      if (current == null || typeof current !== "object") return undefined;
      current = current[parts[i]];
    }
    return current;
  }

  /**
   * Hydrate static fallback text & links from window.CRCSG_CONFIG.
   * Attributes:
   *  - data-config="path"          -> sets element.textContent
   *  - data-config-href="path"     -> sets href (optional data-href-prefix="mailto:" or "tel:")
   *  - data-copy-config="path"     -> sets data-copy-value for Copy buttons
   */
  function hydrateFromConfig() {
    var textNodes = document.querySelectorAll("[data-config]");
    for (var i = 0; i < textNodes.length; i++) {
      var el = textNodes[i];
      var val = getByPath(config, el.getAttribute("data-config"));
      if (typeof val === "string" && val.trim() !== "") {
        el.textContent = val;
      }
    }

    var hrefNodes = document.querySelectorAll("[data-config-href]");
    for (var j = 0; j < hrefNodes.length; j++) {
      var link = hrefNodes[j];
      var hrefVal = getByPath(config, link.getAttribute("data-config-href"));
      if (typeof hrefVal === "string" && hrefVal.trim() !== "") {
        var prefix = link.getAttribute("data-href-prefix") || "";
        link.setAttribute("href", prefix + hrefVal);
      }
    }

    var copyNodes = document.querySelectorAll("[data-copy-config]");
    for (var k = 0; k < copyNodes.length; k++) {
      var btn = copyNodes[k];
      var copyVal = getByPath(config, btn.getAttribute("data-copy-config"));
      if (typeof copyVal === "string" && copyVal.trim() !== "") {
        btn.setAttribute("data-copy-value", copyVal);
      }
    }

    // YouTube auto-updating Uploads playlist embed
    var ytUploads = getByPath(config, "youtube.uploadsPlaylistId");
    if (typeof ytUploads === "string" && ytUploads.trim() !== "") {
      var embedUrl =
        "https://www.youtube.com/embed/videoseries?list=" +
        encodeURIComponent(ytUploads);
      var ytFrames = document.querySelectorAll("[data-youtube-uploads-embed]");
      for (var m = 0; m < ytFrames.length; m++) {
        if (ytFrames[m].getAttribute("src") !== embedUrl) {
          ytFrames[m].setAttribute("src", embedUrl);
        }
      }
    }

    // Safeguarding PDF iframe
    var pdfPreview = getByPath(config, "safeguardingPdf.previewUrl");
    if (typeof pdfPreview === "string" && pdfPreview.trim() !== "") {
      var pdfFrames = document.querySelectorAll("[data-safeguarding-pdf-embed]");
      for (var n = 0; n < pdfFrames.length; n++) {
        if (pdfFrames[n].getAttribute("src") !== pdfPreview) {
          pdfFrames[n].setAttribute("src", pdfPreview);
        }
      }
    }

    // Current year in footer copyright
    var yearNodes = document.querySelectorAll("[data-current-year]");
    var yearStr = String(new Date().getFullYear());
    for (var y = 0; y < yearNodes.length; y++) {
      yearNodes[y].textContent = yearStr;
    }
  }

  /**
   * Populate Leadership cards dynamically from CRCSG_CONFIG.leadership
   * so volunteers only edit site-config.js when elders or officers change.
   */
  function renderLeadershipDirectory() {
    var root = document.querySelector("[data-leadership-grid]");
    var data = config.leadership;
    if (!root || !data) return;

    function createEl(tag, className, text) {
      var el = document.createElement(tag);
      if (className) el.className = className;
      if (text !== undefined) el.textContent = text;
      return el;
    }

    function createActionRow(email, phone) {
      var actions = createEl("div", "leader-actions");
      if (email) {
        var mailLink = createEl("a", "text-link", email);
        mailLink.href = "mailto:" + email;
        actions.appendChild(mailLink);

        var copyBtn = createEl("button", "copy-btn copy-btn--subtle", "Copy email");
        copyBtn.type = "button";
        copyBtn.setAttribute("data-copy-value", email);
        copyBtn.setAttribute("aria-label", "Copy email address " + email);
        actions.appendChild(copyBtn);
      }
      if (phone) {
        var phoneHref = phone.replace(/[^+\d]/g, "");
        if (phoneHref.charAt(0) === "0") {
          phoneHref = "+61" + phoneHref.slice(1);
        }
        var telLink = createEl("a", "text-link", phone);
        telLink.href = "tel:" + phoneHref;
        actions.appendChild(telLink);
      }
      return actions;
    }

    root.innerHTML = "";

    // 1. Pastor card
    if (data.pastor) {
      var pastorCard = createEl("article", "card leader-card");
      pastorCard.appendChild(createEl("span", "role-badge", "Minister / Pastor"));
      pastorCard.appendChild(createEl("h3", "leader-name", data.pastor.name));
      pastorCard.appendChild(
        createEl(
          "p",
          "leader-desc",
          "Preaching, pastoral care, and spiritual oversight of our congregation."
        )
      );
      pastorCard.appendChild(createActionRow(data.pastor.email, data.pastor.phone));
      root.appendChild(pastorCard);
    }

    // 2. Elders card
    if (Array.isArray(data.elders) && data.elders.length > 0) {
      var eldersCard = createEl("article", "card leader-card leader-card--wide");
      eldersCard.appendChild(createEl("span", "role-badge", "Elders (Session)"));
      eldersCard.appendChild(createEl("h3", "leader-name", "Serving Elders"));
      eldersCard.appendChild(
        createEl(
          "p",
          "leader-desc",
          "Church Council (Session) currently includes " +
            data.elders.length +
            " Elders alongside our Pastor and Deacon."
        )
      );

      var list = createEl("ul", "elder-list");
      for (var i = 0; i < data.elders.length; i++) {
        var elder = data.elders[i];
        var item = createEl("li", "elder-item");
        var info = createEl("div", "elder-info");
        info.appendChild(createEl("strong", "", elder.name));
        if (elder.note) {
          info.appendChild(createEl("span", "elder-note", elder.note));
        }
        item.appendChild(info);
        if (elder.email) {
          item.appendChild(createActionRow(elder.email));
        }
        list.appendChild(item);
      }
      eldersCard.appendChild(list);
      root.appendChild(eldersCard);
    }

    // 3. Deacon card
    if (data.deacon) {
      var deaconCard = createEl("article", "card leader-card");
      deaconCard.appendChild(createEl("span", "role-badge role-badge--timber", "Deacon"));
      deaconCard.appendChild(createEl("h3", "leader-name", data.deacon.name));
      deaconCard.appendChild(
        createEl(
          "p",
          "leader-desc",
          "Mercy ministry, practical support, and caring for members and neighbours in need."
        )
      );
      deaconCard.appendChild(createActionRow(data.deacon.email));
      root.appendChild(deaconCard);
    }

    // 4. Clerk card
    if (data.clerk) {
      var clerkCard = createEl("article", "card leader-card");
      clerkCard.appendChild(createEl("span", "role-badge role-badge--sand", "Session Clerk"));
      clerkCard.appendChild(createEl("h3", "leader-name", data.clerk.name));
      clerkCard.appendChild(
        createEl(
          "p",
          "leader-desc",
          "Council correspondence, minutes, and church membership administration."
        )
      );
      clerkCard.appendChild(createActionRow(data.clerk.email));
      root.appendChild(clerkCard);
    }
  }

  /**
   * Copy-to-clipboard buttons with visual confirmation & screen-reader live region.
   */
  function initCopyButtons() {
    var announcer = document.getElementById("copy-live-region");
    if (!announcer) {
      announcer = document.createElement("div");
      announcer.id = "copy-live-region";
      announcer.className = "sr-only";
      announcer.setAttribute("aria-live", "polite");
      document.body.appendChild(announcer);
    }

    function fallbackCopy(text) {
      var textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      var ok = false;
      try {
        ok = document.execCommand("copy");
      } catch (e) {
        ok = false;
      }
      document.body.removeChild(textarea);
      return ok;
    }

    function showCopiedFeedback(button, value) {
      if (!button.dataset.originalLabel) {
        button.dataset.originalLabel = button.textContent.trim();
      }
      button.classList.add("is-copied");
      button.textContent = "Copied!";
      announcer.textContent = value + " copied to clipboard.";

      clearTimeout(button._copyTimer);
      button._copyTimer = setTimeout(function () {
        button.classList.remove("is-copied");
        button.textContent = button.dataset.originalLabel || "Copy";
      }, 2200);
    }

    document.addEventListener("click", function (event) {
      var btn = event.target.closest("[data-copy-value]");
      if (!btn) return;
      var value = btn.getAttribute("data-copy-value");
      if (!value) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(value)
          .then(function () {
            showCopiedFeedback(btn, value);
          })
          .catch(function () {
            if (fallbackCopy(value)) {
              showCopiedFeedback(btn, value);
            }
          });
      } else if (fallbackCopy(value)) {
        showCopiedFeedback(btn, value);
      }
    });
  }

  /**
   * Accessible mobile drawer toggle + scroll-aware header state.
   */
  function initHeaderAndNav() {
    var header = document.querySelector(".site-header");
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("primary-navigation");

    function updateHeaderScroll() {
      if (!header) return;
      if (window.scrollY > 24) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    }

    updateHeaderScroll();
    window.addEventListener("scroll", updateHeaderScroll, { passive: true });

    if (!toggle || !nav) return;

    function closeNav() {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      document.body.classList.remove("nav-open");
    }

    function openNav() {
      toggle.setAttribute("aria-expanded", "true");
      nav.classList.add("is-open");
      document.body.classList.add("nav-open");
    }

    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      if (expanded) {
        closeNav();
      } else {
        openNav();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        closeNav();
        toggle.focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (!nav.classList.contains("is-open")) return;
      if (!nav.contains(event.target) && !toggle.contains(event.target)) {
        closeNav();
      }
    });

    var navLinks = nav.querySelectorAll("a");
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener("click", closeNav);
    }

    window.addEventListener("resize", function () {
      if (window.innerWidth > 960 && nav.classList.contains("is-open")) {
        closeNav();
      }
    });
  }

  /**
   * Gentle IntersectionObserver reveal honoring prefers-reduced-motion.
   */
  function initScrollReveal() {
    var nodes = document.querySelectorAll("[data-reveal]");
    if (!nodes.length) return;

    var reducedMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      for (var i = 0; i < nodes.length; i++) {
        nodes[i].classList.add("is-visible");
      }
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            entries[i].target.classList.add("is-visible");
            observer.unobserve(entries[i].target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
    );

    for (var j = 0; j < nodes.length; j++) {
      observer.observe(nodes[j]);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    hydrateFromConfig();
    renderLeadershipDirectory();
    initCopyButtons();
    initHeaderAndNav();
    initScrollReveal();
  });
})();
