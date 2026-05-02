/* ── INDOMIE NIGERIA — ADVANCED SCROLL ANIMATIONS ── */
(function () {
  'use strict';

  function initAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      setTimeout(initAnimations, 100);
      return;
    }
    gsap.registerPlugin(ScrollTrigger);

    // ── 1. SCROLL PROGRESS BAR ────────────────────────────────
    var progressBar = document.getElementById('scroll-progress');
    if (!progressBar) {
      progressBar = document.createElement('div');
      progressBar.id = 'scroll-progress';
      progressBar.style.cssText = 'position:fixed;top:0;left:0;height:3px;width:0%;background:var(--red);z-index:9999;pointer-events:none;box-shadow:0 0 8px rgba(204,0,0,0.6);';
      document.body.appendChild(progressBar);
    }
    ScrollTrigger.create({
      start: 'top top', end: 'bottom bottom',
      onUpdate: function(self) {
        progressBar.style.width = (self.progress * 100) + '%';
      }
    });

    // ── 2. LOGO ENTRANCE ──────────────────────────────────────
    var logo = document.querySelector('.nav-logo-img');
    if (logo) {
      gsap.from(logo, { scale: 0.7, opacity: 0, rotation: -5, duration: 0.8, ease: 'back.out(1.7)', delay: 0.1 });
    }

    // ── 3. HERO HEADLINE ──────────────────────────────────────
    var heroWords = document.querySelectorAll('.show-word, .some-word, .love-word');
    if (heroWords.length) {
      gsap.from(heroWords, { y: 60, opacity: 0, skewY: 4, duration: 0.9, stagger: 0.15, ease: 'power4.out', delay: 0.3 });
    }
    var heroCtas = document.querySelector('.hero-ctas-row');
    if (heroCtas) {
      gsap.from(heroCtas, { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.9 });
    }

    // ── 4. MARQUEE PARALLAX ───────────────────────────────────
    var marquee = document.querySelector('.marquee-track');
    if (marquee) {
      gsap.to(marquee, { x: '-3%', ease: 'none',
        scrollTrigger: { trigger: '.marquee-strip', start: 'top bottom', end: 'bottom top', scrub: 1 }
      });
    }

    // ── 5. ABOUT SECTION ──────────────────────────────────────
    var aboutText = document.querySelector('.about-text');
    var aboutImg  = document.querySelector('.about-img');
    if (aboutText) {
      gsap.from(aboutText, { x: -80, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-inner', start: 'top 80%', toggleActions: 'play none none reverse' }
      });
    }
    if (aboutImg) {
      gsap.from(aboutImg, { x: 80, opacity: 0, duration: 1, delay: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-inner', start: 'top 80%', toggleActions: 'play none none reverse' }
      });
      // Subtle scale parallax
      var aboutMainImg = aboutImg.querySelector('img');
      if (aboutMainImg) {
        gsap.to(aboutMainImg, { scale: 1.06, ease: 'none',
          scrollTrigger: { trigger: '.about-strip', start: 'top bottom', end: 'bottom top', scrub: 2 }
        });
      }
    }

    // About title char split
    var aboutTitle = document.querySelector('.about-title');
    if (aboutTitle) {
      var chars = aboutTitle.textContent.split('');
      aboutTitle.innerHTML = chars.map(function(ch) {
        return '<span class="char" style="display:inline-block">' + (ch === ' ' ? '&nbsp;' : ch) + '</span>';
      }).join('');
      gsap.from(aboutTitle.querySelectorAll('.char'), {
        y: 40, opacity: 0, rotateX: -90, duration: 0.6, stagger: 0.025, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: aboutTitle, start: 'top 85%', toggleActions: 'play none none reverse' }
      });
    }

    // ── 6. PRODUCTS ───────────────────────────────────────────
    var prodTabs = document.querySelector('.products-tabs');
    if (prodTabs) {
      gsap.from(prodTabs, { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: prodTabs, start: 'top 90%', toggleActions: 'play none none reverse' }
      });
    }
    document.querySelectorAll('.product-panel').forEach(function(panel) {
      var packImg = panel.querySelector('.product-pack-img');
      var infoBlk = panel.querySelector('.product-info-block');
      var tl = gsap.timeline({ scrollTrigger: { trigger: panel, start: 'top 75%', toggleActions: 'play none none reverse' } });
      if (packImg) tl.from(packImg, { scale: 0.8, opacity: 0, duration: 0.9, ease: 'back.out(1.4)' }, 0);
      if (infoBlk) tl.from(infoBlk, { x: 60, opacity: 0, duration: 0.8, ease: 'power3.out' }, 0.15);
      // Pack image parallax
      if (packImg) {
        gsap.to(packImg, { y: -20, ease: 'none',
          scrollTrigger: { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: 2 }
        });
      }
    });

    // ── 7. RECIPES ────────────────────────────────────────────
    var recipesTitle = document.querySelector('.recipes-title-block');
    var chefImg = document.querySelector('.recipes-chef-img');
    if (recipesTitle) {
      gsap.from(recipesTitle, { x: -60, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.recipes-header', start: 'top 80%', toggleActions: 'play none none reverse' }
      });
    }
    if (chefImg) {
      gsap.from(chefImg, { scale: 0.85, opacity: 0, y: 40, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.recipes-header', start: 'top 80%', toggleActions: 'play none none reverse' }
      });
    }
    var recipeCards = document.querySelectorAll('.recipe-card');
    if (recipeCards.length) {
      gsap.from(recipeCards, { y: 60, opacity: 0, scale: 0.92, duration: 0.7, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.recipes-grid', start: 'top 85%', toggleActions: 'play none none reverse' }
      });
    }

    // ── 8. VIDEO SLIDER ───────────────────────────────────────
    var vsSection = document.querySelector('.vs-section');
    if (vsSection) {
      gsap.from('.vs-slide-content', { y: 50, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: vsSection, start: 'top 80%', toggleActions: 'play none none reverse' }
      });
    }

    // ── 9. CLUBS — lightweight, no scrub parallax ─────────────
    var clubCards = document.querySelectorAll('.club-card');
    if (clubCards.length) {
      // Simple fade-up — no heavy scrub
      gsap.from(clubCards, {
        y: 60, opacity: 0, duration: 0.8, stagger: 0.18, ease: 'power3.out',
        scrollTrigger: { trigger: '.clubs-inner', start: 'top 82%', toggleActions: 'play none none none' }
      });
    }
    // Mascot/model circles — simple entrance only, no scrub
    document.querySelectorAll('.mascot-circle, .model-circle').forEach(function(el, i) {
      gsap.from(el, { scale: 0, opacity: 0, duration: 0.7, delay: 0.3 + i * 0.15, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: el.closest('.club-card'), start: 'top 80%', toggleActions: 'play none none none' }
      });
    });

    // ── 10. AWARDS — lightweight ──────────────────────────────
    var awardsLeft = document.querySelector('.awards-left');
    if (awardsLeft) {
      gsap.from(awardsLeft, { x: -80, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.awards-section', start: 'top 78%', toggleActions: 'play none none none' }
      });
    }
    // Trophy rings — trigger CSS one-shot animation via class
    var trophyRings = document.querySelectorAll('.awards-trophy-ring');
    if (trophyRings.length) {
      ScrollTrigger.create({
        trigger: '.awards-trophy-wrap',
        start: 'top 85%',
        once: true,
        onEnter: function() {
          trophyRings.forEach(function(r) { r.classList.add('animate'); });
        }
      });
    }
    // Awards headline
    var awardsHL = document.querySelector('.awards-headline');
    if (awardsHL) {
      gsap.from(awardsHL, { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: awardsHL, start: 'top 85%', toggleActions: 'play none none none' }
      });
    }
    // Count-up numbers
    document.querySelectorAll('.ac-num').forEach(function(el) {
      var target = parseInt(el.dataset.count || el.textContent);
      ScrollTrigger.create({
        trigger: el, start: 'top 85%', once: true,
        onEnter: function() {
          var obj = { v: 0 };
          gsap.to(obj, { v: target, duration: 1.8, ease: 'power2.out',
            onUpdate: function() { el.textContent = Math.round(obj.v); }
          });
        }
      });
    });
    // Gallery items — simple stagger, no scrub
    var agItems = document.querySelectorAll('.ag-item');
    if (agItems.length) {
      gsap.from(agItems, { scale: 0.88, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.awards-gallery', start: 'top 82%', toggleActions: 'play none none none' }
      });
    }

    // ── 11. FOOTER ────────────────────────────────────────────
    var footerCols = document.querySelectorAll('.footer-brand-col, .footer-links-col, .footer-contact-col-new, .footer-nl-col');
    if (footerCols.length) {
      gsap.from(footerCols, { y: 50, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.footer-body', start: 'top 90%', toggleActions: 'play none none none' }
      });
    }
    var fsocLinks = document.querySelectorAll('.fsoc-new');
    if (fsocLinks.length) {
      gsap.from(fsocLinks, { x: -30, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: '.footer-brand-col', start: 'top 88%', toggleActions: 'play none none none' }
      });
    }
    // Newsletter input glow
    var nlInput = document.querySelector('.nl-input-new');
    if (nlInput) {
      nlInput.addEventListener('focus', function() {
        gsap.to(nlInput, { boxShadow: '0 0 0 3px rgba(204,0,0,0.25)', duration: 0.3 });
      });
      nlInput.addEventListener('blur', function() {
        gsap.to(nlInput, { boxShadow: 'none', duration: 0.3 });
      });
    }

    // ── 12. SCROLL VELOCITY TILT — recipe cards only ──────────
    // (removed club cards — they use content-visibility)
    var lastScrollY = window.scrollY;
    var tiltCards = document.querySelectorAll('.recipe-card');
    window.addEventListener('scroll', function() {
      var delta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      var tilt = Math.max(-3, Math.min(3, delta * 0.06));
      tiltCards.forEach(function(card) {
        gsap.to(card, { rotateX: tilt, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
      });
    }, { passive: true });

    console.log('[Indomie] Animations ready');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }
})();
 