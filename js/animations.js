/* ── INDOMIE NIGERIA — ADVANCED SCROLL ANIMATIONS ── */
/* Uses GSAP + ScrollTrigger                          */

(function () {
  'use strict';

  // Wait for GSAP to load
  function initAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      setTimeout(initAnimations, 100);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // ── 1. NAVBAR — shrink + shadow on scroll ──────────────────
    ScrollTrigger.create({
      start: 'top -60',
      onUpdate: function(self) {
        var nav = document.getElementById('navbar');
        if (!nav) return;
        if (self.direction === 1) {
          gsap.to(nav, { height: 56, duration: 0.3, ease: 'power2.out' });
        } else {
          gsap.to(nav, { height: 70, duration: 0.3, ease: 'power2.out' });
        }
      }
    });

    // ── 2. MARQUEE STRIP — parallax drift ─────────────────────
    var marquee = document.querySelector('.marquee-track');
    if (marquee) {
      gsap.to(marquee, {
        x: '-3%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.marquee-strip',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    }

    // ── 3. ABOUT SECTION ──────────────────────────────────────
    var aboutText = document.querySelector('.about-text');
    var aboutImg  = document.querySelector('.about-img');
    if (aboutText) {
      gsap.from(aboutText, {
        x: -80, opacity: 0, duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-inner',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }
    if (aboutImg) {
      gsap.from(aboutImg, {
        x: 80, opacity: 0, duration: 1, delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-inner',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }
    // Float image parallax
    var floatImg = document.querySelector('.about-float-img');
    if (floatImg) {
      gsap.to(floatImg, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-strip',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      });
    }

    // ── 4. ABOUT TITLE — character split reveal ───────────────
    var aboutTitle = document.querySelector('.about-title');
    if (aboutTitle) {
      var chars = aboutTitle.textContent.split('');
      aboutTitle.innerHTML = chars.map(function(ch) {
        return '<span class="char" style="display:inline-block">' + (ch === ' ' ? '&nbsp;' : ch) + '</span>';
      }).join('');
      gsap.from(aboutTitle.querySelectorAll('.char'), {
        y: 40, opacity: 0, rotateX: -90,
        duration: 0.6, stagger: 0.025,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: aboutTitle,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // ── 5. PRODUCTS SECTION — tabs slide in ───────────────────
    var prodTabs = document.querySelector('.products-tabs');
    if (prodTabs) {
      gsap.from(prodTabs, {
        y: 40, opacity: 0, duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: prodTabs,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // Product panel elements — stagger in
    function animateProductPanel(panel) {
      var packImg  = panel.querySelector('.product-pack-img');
      var infoBlk  = panel.querySelector('.product-info-block');
      var singlePk = panel.querySelector('.product-single-pack');
      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });
      if (packImg)  tl.from(packImg,  { scale: 0.8, opacity: 0, duration: 0.9, ease: 'back.out(1.4)' }, 0);
      if (infoBlk)  tl.from(infoBlk,  { x: 60, opacity: 0, duration: 0.8, ease: 'power3.out' }, 0.15);
      if (singlePk) tl.from(singlePk, { y: 40, opacity: 0, duration: 0.7, ease: 'power3.out' }, 0.3);
    }
    document.querySelectorAll('.product-panel').forEach(animateProductPanel);

    // ── 6. RECIPES SECTION ────────────────────────────────────
    var recipesTitle = document.querySelector('.recipes-title-block');
    var chefImg      = document.querySelector('.recipes-chef-img');
    if (recipesTitle) {
      gsap.from(recipesTitle, {
        x: -60, opacity: 0, duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.recipes-header',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }
    if (chefImg) {
      gsap.from(chefImg, {
        scale: 0.85, opacity: 0, y: 40, duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.recipes-header',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
      // Subtle float on scroll
      gsap.to(chefImg, {
        y: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: '.recipes-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2
        }
      });
    }

    // Recipe cards — stagger cascade
    var recipeCards = document.querySelectorAll('.recipe-card');
    if (recipeCards.length) {
      gsap.from(recipeCards, {
        y: 60, opacity: 0, scale: 0.92,
        duration: 0.7, stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.recipes-grid',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // ── 7. VIDEO SLIDER SECTION — slide in from bottom ────────
    var vsSection = document.querySelector('.vs-section');
    if (vsSection) {
      gsap.from('.vs-slide-content', {
        y: 50, opacity: 0, duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: vsSection,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // ── 8. CLUBS SECTION ──────────────────────────────────────
    var clubCards = document.querySelectorAll('.club-card');
    if (clubCards.length) {
      gsap.from(clubCards, {
        y: 80, opacity: 0, scale: 0.9,
        duration: 0.9, stagger: 0.2,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: '.clubs-inner',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }
    // Club mascot images — float up on scroll
    document.querySelectorAll('.club-mascot, .club-model').forEach(function(el) {
      gsap.to(el, {
        y: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: el.closest('.club-card'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2
        }
      });
    });

    // ── 9. AWARDS STRIP — horizontal scroll reveal ────────────
    var awardImgs = document.querySelectorAll('.award-img');
    if (awardImgs.length) {
      gsap.from(awardImgs, {
        x: 60, opacity: 0, scale: 0.9,
        duration: 0.7, stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.awards-strip',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    }
    var awardBadge = document.querySelector('.award-badge-wrap');
    if (awardBadge) {
      gsap.from(awardBadge, {
        scale: 0, rotation: -20, opacity: 0,
        duration: 0.8, ease: 'back.out(2)',
        scrollTrigger: {
          trigger: '.awards-strip',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // ── 10. FOOTER — stagger columns ──────────────────────────
    var footerCols = document.querySelectorAll('.footer-newsletter-col, .footer-contact-col, .footer-follow-col');
    if (footerCols.length) {
      gsap.from(footerCols, {
        y: 50, opacity: 0,
        duration: 0.8, stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.footer-top',
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // ── 11. SECTION LABELS — slide in from left ───────────────
    // (not used in current HTML but future-proof)

    // ── 12. HORIZONTAL PARALLAX on product pack images ────────
    document.querySelectorAll('.pack-main-img').forEach(function(img) {
      gsap.to(img, {
        y: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: img.closest('.product-panel'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2
        }
      });
    });

    // ── 13. ABOUT IMAGE — subtle scale on scroll ──────────────
    var aboutMainImg = document.querySelector('.about-img > img');
    if (aboutMainImg) {
      gsap.to(aboutMainImg, {
        scale: 1.06,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-strip',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2
        }
      });
    }

    // ── 14. COUNTER NUMBERS — count up on enter ───────────────
    // (no counters in current layout but hook is ready)

    // ── 15. SMOOTH SCROLL VELOCITY TILT on cards ──────────────
    var lastScrollY = window.scrollY;
    var tiltCards = document.querySelectorAll('.recipe-card, .club-card');
    window.addEventListener('scroll', function() {
      var delta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      var tilt = Math.max(-4, Math.min(4, delta * 0.08));
      tiltCards.forEach(function(card) {
        gsap.to(card, {
          rotateX: tilt,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });
    }, { passive: true });

    // ── 16. HERO HEADLINE — stagger word entrance ─────────────
    var heroWords = document.querySelectorAll('.show-word, .some-word, .love-word');
    if (heroWords.length) {
      gsap.from(heroWords, {
        y: 60, opacity: 0, skewY: 4,
        duration: 0.9, stagger: 0.15,
        ease: 'power4.out',
        delay: 0.3
      });
    }
    var heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) {
      gsap.from(heroBadge, {
        y: -20, opacity: 0, duration: 0.7,
        ease: 'power3.out', delay: 0.1
      });
    }
    var heroCtas = document.querySelector('.hero-ctas-row');
    if (heroCtas) {
      gsap.from(heroCtas, {
        y: 30, opacity: 0, duration: 0.8,
        ease: 'power3.out', delay: 0.9
      });
    }

    // ── 17. PRODUCTS SECTION BG — parallax color shift ────────
    ScrollTrigger.create({
      trigger: '.products-section',
      start: 'top 60%',
      end: 'bottom 40%',
      onEnter: function() {
        gsap.to('.products-section', { backgroundImage: 'linear-gradient(180deg,#FFD700 0%,#FFC200 100%)', duration: 0.6 });
      },
      onLeaveBack: function() {
        gsap.to('.products-section', { backgroundImage: 'none', duration: 0.4 });
      }
    });

    // ── 18. SCROLL PROGRESS INDICATOR ─────────────────────────
    var progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = 'position:fixed;top:0;left:0;height:3px;width:0%;background:var(--red);z-index:9999;transition:width 0.1s linear;pointer-events:none;';
    document.body.appendChild(progressBar);
    ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: function(self) {
        progressBar.style.width = (self.progress * 100) + '%';
      }
    });

    // ── 19. STAGGER REVEAL for top-bar links ──────────────────
    var topLinks = document.querySelectorAll('.top-bar-links a');
    if (topLinks.length) {
      gsap.from(topLinks, {
        y: -20, opacity: 0,
        duration: 0.5, stagger: 0.05,
        ease: 'power2.out', delay: 0.2
      });
    }

    // ── 20. LOGO entrance ─────────────────────────────────────
    var logo = document.querySelector('.nav-logo-img');
    if (logo) {
      gsap.from(logo, {
        scale: 0.7, opacity: 0, rotation: -5,
        duration: 0.8, ease: 'back.out(1.7)', delay: 0.1
      });
    }

    console.log('[Indomie] GSAP animations initialised');
  }

  // Kick off after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }

})();

    // ── CLUBS SECTION — new design ────────────────────────────
    var clubCards2 = document.querySelectorAll('.club-card');
    if (clubCards2.length) {
      clubCards2.forEach(function(card, i) {
        var tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 82%',
            toggleActions: 'play none none reverse'
          }
        });
        tl.from(card, {
          y: 80, opacity: 0, scale: 0.93,
          duration: 0.9, ease: 'power3.out',
          delay: i * 0.15
        });
        // Mascot/model slides up
        var img = card.querySelector('.club-mascot, .club-model');
        if (img) {
          tl.from(img, { y: 60, opacity: 0, duration: 0.8, ease: 'power3.out' }, 0.3);
        }
        // Stats count up
        card.querySelectorAll('.cs-num').forEach(function(el) {
          var txt = el.textContent;
          var num = parseInt(txt);
          if (!isNaN(num)) {
            tl.from({ v: 0 }, {
              v: num, duration: 1.2, ease: 'power2.out',
              onUpdate: function() { el.textContent = Math.round(this.targets()[0].v) + (txt.includes('+') ? '+' : ''); }
            }, 0.5);
          }
        });
      });
    }

    // ── AWARDS SECTION — new design ───────────────────────────
    var awardsLeft = document.querySelector('.awards-left');
    if (awardsLeft) {
      gsap.from(awardsLeft, {
        x: -80, opacity: 0, duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.awards-section',
          start: 'top 78%',
          toggleActions: 'play none none reverse'
        }
      });
    }
    // Trophy rings already animate via CSS; add entrance
    var trophyWrap = document.querySelector('.awards-trophy-wrap');
    if (trophyWrap) {
      gsap.from(trophyWrap, {
        scale: 0, rotation: -30, opacity: 0,
        duration: 0.9, ease: 'back.out(2)',
        scrollTrigger: {
          trigger: '.awards-section',
          start: 'top 78%',
          toggleActions: 'play none none reverse'
        }
      });
    }
    // Awards headline word by word
    var awardsHL = document.querySelector('.awards-headline');
    if (awardsHL) {
      gsap.from(awardsHL, {
        y: 40, opacity: 0, duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: awardsHL,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    }
    // Count-up numbers
    document.querySelectorAll('.ac-num').forEach(function(el) {
      var target = parseInt(el.dataset.count || el.textContent);
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: function() {
          gsap.from({ v: 0 }, {
            v: target, duration: 1.8, ease: 'power2.out',
            onUpdate: function() { el.textContent = Math.round(this.targets()[0].v); }
          });
        }
      });
    });
    // Gallery items stagger
    var agItems = document.querySelectorAll('.ag-item');
    if (agItems.length) {
      gsap.from(agItems, {
        scale: 0.88, opacity: 0,
        duration: 0.8, stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.awards-gallery',
          start: 'top 82%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // ── FOOTER — new design ────────────────────────────────────
    var footerCols2 = document.querySelectorAll('.footer-brand-col, .footer-links-col, .footer-contact-col-new, .footer-nl-col');
    if (footerCols2.length) {
      gsap.from(footerCols2, {
        y: 50, opacity: 0,
        duration: 0.8, stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.footer-body',
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      });
    }
    // Social links slide in
    var fsocLinks = document.querySelectorAll('.fsoc-new');
    if (fsocLinks.length) {
      gsap.from(fsocLinks, {
        x: -30, opacity: 0,
        duration: 0.5, stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.footer-brand-col',
          start: 'top 88%',
          toggleActions: 'play none none reverse'
        }
      });
    }
    // Footer links stagger
    var flLinks = document.querySelectorAll('.footer-link-list a');
    if (flLinks.length) {
      gsap.from(flLinks, {
        x: -20, opacity: 0,
        duration: 0.4, stagger: 0.07,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.footer-links-col',
          start: 'top 88%',
          toggleActions: 'play none none reverse'
        }
      });
    }
    // Contact list items
    var fcItems = document.querySelectorAll('.footer-contact-list li');
    if (fcItems.length) {
      gsap.from(fcItems, {
        y: 20, opacity: 0,
        duration: 0.5, stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.footer-contact-col-new',
          start: 'top 88%',
          toggleActions: 'play none none reverse'
        }
      });
    }
    // Newsletter input focus glow
    var nlInput = document.querySelector('.nl-input-new');
    if (nlInput) {
      nlInput.addEventListener('focus', function() {
        gsap.to(nlInput, { boxShadow: '0 0 0 3px rgba(204,0,0,0.25)', duration: 0.3 });
      });
      nlInput.addEventListener('blur', function() {
        gsap.to(nlInput, { boxShadow: 'none', duration: 0.3 });
      });
    }
