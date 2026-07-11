(function () {
  "use strict";

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector(".nav__mobile-toggle");
  var links = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("nav__links--open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "✕" : "≡";
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("nav__links--open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "≡";
      });
    });
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll(".faq__item").forEach(function (item) {
    var btn = item.querySelector(".faq__q");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var isOpen = item.classList.contains("faq__item--open");
      item.classList.toggle("faq__item--open", !isOpen);
      btn.setAttribute("aria-expanded", isOpen ? "false" : "true");
    });
  });

  /* ---- Reveal on scroll ---- */
  if ("IntersectionObserver" in window) {
    var els = document.querySelectorAll(".reveal");
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  /* ---- Hero parallax (mouse-tracked) ---- */
  var parallax = document.querySelector(".hero__parallax");
  if (parallax && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener(
      "mousemove",
      function (e) {
        var x = (e.clientX / window.innerWidth - 0.5) * 20;
        var y = (e.clientY / window.innerHeight - 0.5) * 12;
        parallax.style.transform = "translate(" + x + "px, " + y + "px)";
      },
      { passive: true }
    );
  }
})();
