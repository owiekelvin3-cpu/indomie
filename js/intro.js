/* ═══════════════════════════════════════════════════════
   INDOMIE NIGERIA — ENTRANCE & OUTRO ANIMATIONS
   Entrance : cinematic red curtain split + logo reveal
   Outro    : red panels close + logo flash on nav away
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── helpers ─────────────────────────────────────────── */
  var intro      = document.getElementById('page-intro');
  var introBar   = document.getElementById('intro-bar');
  var introPct   = document.getElementById('intro-pct');
  var introLogo  = document.getElementById('intro-logo');
  var introWords = document.querySelectorAll('.it-word');
  var panelL     = document.querySelector('.intro-panel-left');
  var panelR     = document.querySelector('.intro-panel-right');
  var particles  = document.querySelectorAll('.ip');

  var outro      = document.getElementById('page-outro');
  var outroTop   = document.querySelector('.outro-top');
  var outroBot   = document.querySelector('.outro-bottom');
  var outroLogo  = document.querySelector('.outro-logo');

  var body       = document.body;

  /* ── HARD FALLBACK — show page even if GSAP never loads ── */
  function showPageNow() {
    if (intro)  { intro.style.display = 'none'; }
    body.classList.remove('is-loading');
    document.querySelectorAll('body > *:not(#page-intro):not(#page-outro)').forEach(function(el) {
      el.style.visibility = 'visible';
    });
  }

  // If page not shown within 4s, force-show it
  var hardTimeout = setTimeout(showPageNow, 4000);

  /* ── ENTRANCE SEQUENCE ───────────────────────────────── */
  var gsapRetries = 0;
  function runEntrance() {
    // Make sure GSAP is ready — max 40 retries (2s)
    if (typeof gsap === 'undefined') {
      gsapRetries++;
      if (gsapRetries > 40) {
        // GSAP failed to load — show page immediately
        clearTimeout(hardTimeout);
        showPageNow();
        return;
      }
      setTimeout(runEntrance, 50);
      return;
    }
    clearTimeout(hardTimeout); // GSAP loaded — cancel hard timeout

    var tl = gsap.timeline({
      onComplete: function () {
        if (intro) {
          intro.style.display = 'none';
          intro.setAttribute('aria-hidden', 'true');
        }
        showPageNow();
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.refresh();
        }
      }
    });

    /* 1. Fake loading counter 0 → 100% over 1.4s */
    tl.to({ val: 0 }, {
      val: 100,
      duration: 1.4,
      ease: 'power1.inOut',
      onUpdate: function () {
        var v = Math.round(this.targets()[0].val);
        if (introBar)  introBar.style.width = v + '%';
        if (introPct)  introPct.textContent  = v + '%';
      }
    }, 0);

    /* 2. Logo slides up from clip */
    tl.to(introLogo, {
      translateY: '0%',
      opacity: 1,
      duration: 0.7,
      ease: 'power3.out'
    }, 0.2);

    /* 3. Tagline words stagger up */
    tl.to(introWords, {
      translateY: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.12,
      ease: 'back.out(1.5)'
    }, 0.55);

    /* 4. Particles fade in */
    tl.to(particles, {
      opacity: 0.35,
      duration: 0.5,
      stagger: 0.08
    }, 0.6);

    /* 5. Hold for a beat */
    tl.to({}, { duration: 0.5 }, 1.6);

    /* 6. Particles fade out */
    tl.to(particles, {
      opacity: 0,
      y: -30,
      duration: 0.4,
      stagger: 0.05
    }, 2.1);

    /* 7. Logo + tagline fade out */
    tl.to([introLogo, introWords], {
      opacity: 0,
      y: -20,
      duration: 0.4,
      stagger: 0.04
    }, 2.2);

    /* 8. Loading bar fades */
    tl.to([introBar.parentElement, introPct], {
      opacity: 0,
      duration: 0.3
    }, 2.2);

    /* 9. RED CURTAINS SPLIT OPEN — the hero moment */
    tl.to(panelL, {
      xPercent: -100,
      duration: 0.9,
      ease: 'power4.inOut'
    }, 2.5);
    tl.to(panelR, {
      xPercent: 100,
      duration: 0.9,
      ease: 'power4.inOut'
    }, 2.5);

    /* 10. Content fades in as curtains open */
    tl.to(body, {
      duration: 0.01,
      onStart: function () {
        body.classList.remove('is-loading');
        document.querySelectorAll('body > *:not(#page-intro):not(#page-outro)').forEach(function (el) {
          el.style.visibility = 'visible';
        });
      }
    }, 2.6);
  }

  /* ── OUTRO SEQUENCE ──────────────────────────────────── */
  function runOutro(callback) {
    if (typeof gsap === 'undefined') {
      if (callback) callback();
      return;
    }

    var tl = gsap.timeline({
      onComplete: function () {
        if (callback) callback();
      }
    });

    /* Panels slam in from top and bottom */
    tl.to(outroTop, {
      scaleY: 1,
      duration: 0.45,
      ease: 'power4.in'
    }, 0);
    tl.to(outroBot, {
      scaleY: 1,
      duration: 0.45,
      ease: 'power4.in'
    }, 0);

    /* Logo pops in at centre */
    tl.to(outroLogo, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: 'back.out(2)'
    }, 0.3);

    /* Hold */
    tl.to({}, { duration: 0.25 }, 0.6);
  }

  function resetOutro() {
    if (typeof gsap === 'undefined') return;
    gsap.set([outroTop, outroBot], { scaleY: 0 });
    gsap.set(outroLogo, { opacity: 0, scale: 0.8 });
  }

  /* ── INTERCEPT INTERNAL LINK CLICKS ─────────────────── */
  function isInternalLink(href) {
    if (!href) return false;
    // Skip anchor-only links (#section) — those scroll, not navigate
    if (href.startsWith('#')) return false;
    // Skip external links
    try {
      var url = new URL(href, window.location.href);
      return url.hostname === window.location.hostname;
    } catch (e) {
      return false;
    }
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href');
    if (!isInternalLink(href)) return;

    e.preventDefault();
    runOutro(function () {
      window.location.href = href;
    });
  });

  /* ── HANDLE BACK/FORWARD (bfcache) ──────────────────── */
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      // Page restored from bfcache — reset outro and show content
      resetOutro();
      body.classList.remove('is-loading');
    }
  });

  /* ── INIT ────────────────────────────────────────────── */
  // Set initial outro state
  resetOutro();

  // Run entrance when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runEntrance);
  } else {
    runEntrance();
  }

})();
