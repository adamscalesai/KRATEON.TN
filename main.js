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

  /* ---- Count-up on case study stats ---- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var countEls = document.querySelectorAll(".stat__num[data-countup]");
  if (countEls.length) {
    var animateCount = function (el) {
      var target = parseInt(el.getAttribute("data-countup"), 10) || 0;
      var suffix = el.getAttribute("data-suffix") || "";
      if (reduceMotion) {
        el.textContent = target + suffix;
        return;
      }
      var duration = 900;
      var start = null;
      function step(ts) {
        if (start === null) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var value = Math.round(eased * target);
        el.textContent = value + suffix;
        if (progress < 1) window.requestAnimationFrame(step);
      }
      window.requestAnimationFrame(step);
    };
    if ("IntersectionObserver" in window) {
      var countIo = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              animateCount(e.target);
              countIo.unobserve(e.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      countEls.forEach(function (el) { countIo.observe(el); });
    } else {
      countEls.forEach(animateCount);
    }
  }

  /* ---- Nav dropdowns: click-toggle fallback for touch, closes on outside click ---- */
  var drops = document.querySelectorAll(".nav__drop");
  if (drops.length) {
    drops.forEach(function (drop) {
      var toggle = drop.querySelector(".nav__drop-toggle");
      if (!toggle) return;
      toggle.addEventListener("click", function (e) {
        e.preventDefault();
        var isOpen = drop.classList.contains("nav__drop--open");
        drops.forEach(function (d) {
          d.classList.remove("nav__drop--open");
          var t = d.querySelector(".nav__drop-toggle");
          if (t) t.setAttribute("aria-expanded", "false");
        });
        if (!isOpen) {
          drop.classList.add("nav__drop--open");
          toggle.setAttribute("aria-expanded", "true");
        }
      });
    });
    document.addEventListener("click", function (e) {
      drops.forEach(function (d) {
        if (!d.contains(e.target)) {
          d.classList.remove("nav__drop--open");
          var t = d.querySelector(".nav__drop-toggle");
          if (t) t.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  /* ---- Hero industry carousel: crossfade every 2.5s ---- */
  var carouselItems = document.querySelectorAll(".hero__carousel-item");
  if (carouselItems.length > 1) {
    var carIndex = 0;
    if (!reduceMotion) {
      window.setInterval(function () {
        carouselItems[carIndex].classList.remove("is-active");
        carIndex = (carIndex + 1) % carouselItems.length;
        carouselItems[carIndex].classList.add("is-active");
      }, 2500);
    } else {
      carouselItems.forEach(function (el, i) { el.classList.toggle("is-active", i === 0); });
    }
  }

  /* ---- Hero parallax (mouse-tracked) ---- */
  var parallax = document.querySelector(".hero__parallax");
  var heroCards = document.querySelector(".hero__cards");
  if ((parallax || heroCards) && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener(
      "mousemove",
      function (e) {
        var x = (e.clientX / window.innerWidth - 0.5) * 20;
        var y = (e.clientY / window.innerHeight - 0.5) * 12;
        if (parallax) parallax.style.transform = "translate(" + x + "px, " + y + "px)";
        if (heroCards) heroCards.style.transform = "translate(" + x * -0.6 + "px, " + y * -0.6 + "px)";
      },
      { passive: true }
    );
  }
})();
