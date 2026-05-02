/* ── INDOMIE NIGERIA — MAIN JS ── */
(function () {
  'use strict';

  // ══════════════════════════════════════════════
  // CUSTOM CURSOR — Indomie Logo (desktop only)
  // ══════════════════════════════════════════════

  // Only run on devices that have a real pointer (not touch)
  var hasPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
                   && window.innerWidth > 1024;

  var cursorEl  = document.getElementById('indomie-cursor');
  var cursorDot = document.getElementById('cursor-dot');

  if (!hasPointer) {
    // Hide elements and restore default cursor on touch/mobile
    if (cursorEl)  cursorEl.style.display  = 'none';
    if (cursorDot) cursorDot.style.display = 'none';
    document.documentElement.style.setProperty('cursor', 'auto', 'important');
  } else {
    var curX = window.innerWidth / 2;
    var curY = window.innerHeight / 2;
    var dotX = curX, dotY = curY;

    // Move cursor instantly to mouse position
    document.addEventListener('mousemove', function(e) {
      curX = e.clientX; curY = e.clientY;
      if (cursorEl) {
        cursorEl.style.left = curX + 'px';
        cursorEl.style.top  = curY + 'px';
      }
    });

    // Dot follows with slight lag via rAF
    function animateDot() {
      dotX += (curX - dotX) * 0.18;
      dotY += (curY - dotY) * 0.18;
      if (cursorDot) {
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top  = dotY + 'px';
      }
      requestAnimationFrame(animateDot);
    }
    animateDot();

    // Hover state — logo lifts
    document.querySelectorAll('a, button, [role="button"], .recipe-card, .club-card, .ag-item, .vs-thumb, .ptab').forEach(function(el) {
      el.addEventListener('mouseenter', function() { document.body.classList.add('cursor-hover'); });
      el.addEventListener('mouseleave', function() { document.body.classList.remove('cursor-hover'); });
    });

    // Click state — logo squishes
    document.addEventListener('mousedown', function() { document.body.classList.add('cursor-click'); });
    document.addEventListener('mouseup',   function() { document.body.classList.remove('cursor-click'); });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', function() { if (cursorEl) cursorEl.style.opacity = '0'; });
    document.addEventListener('mouseenter', function() { if (cursorEl) cursorEl.style.opacity = '1'; });
  }

  // ══════════════════════════════════════════════
  // DARK MODE
  // ══════════════════════════════════════════════
  var html      = document.documentElement;
  var saved     = localStorage.getItem('indomie-theme') || 'light';
  var themeBtn  = document.getElementById('theme-toggle');
  var themeIcon = document.getElementById('theme-icon');

  html.setAttribute('data-theme', saved);
  updateThemeIcon(saved);

  if (themeBtn) {
    themeBtn.addEventListener('click', function() {
      var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('indomie-theme', next);
      updateThemeIcon(next);
    });
  }
  function updateThemeIcon(t) {
    if (!themeIcon) return;
    themeIcon.className = t === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }

  // ══════════════════════════════════════════════
  // NAVBAR — scroll state + active link tracking
  // ══════════════════════════════════════════════
  var navbar   = document.getElementById('navbar');
  var navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', function() {
    if (!navbar) return;
    navbar.classList.toggle('nav-scrolled', window.scrollY > 40);
    updateActiveLink();
  }, { passive: true });

  // Highlight nav link for visible section
  function updateActiveLink() {
    var sections = ['about','products','recipes','videos','funclub','footer'];
    var current  = '';
    sections.forEach(function(id) {
      var el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 120) current = id;
    });
    navLinks.forEach(function(link) {
      var href = link.getAttribute('href').replace('#','');
      link.classList.toggle('active', href === current);
    });
  }

  // ══════════════════════════════════════════════
  // HAMBURGER + MOBILE MENU
  // ══════════════════════════════════════════════
  var hamburger  = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      var isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      mobileMenu.setAttribute('aria-hidden', !isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  // ══════════════════════════════════════════════
  // SEARCH BAR
  // ══════════════════════════════════════════════
  var searchBtn   = document.getElementById('nav-search-btn');
  var searchBar   = document.getElementById('nav-search-bar');
  var searchInput = document.getElementById('nav-search-input');
  var searchClose = document.getElementById('nav-search-close');

  if (searchBtn && searchBar) {
    searchBtn.addEventListener('click', function() {
      searchBar.classList.add('open');
      setTimeout(function() { if (searchInput) searchInput.focus(); }, 300);
    });
    searchClose.addEventListener('click', function() {
      searchBar.classList.remove('open');
      if (searchInput) searchInput.value = '';
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        searchBar.classList.remove('open');
        if (searchInput) searchInput.value = '';
      }
    });
  }

  // ── Hero slideshow ─────────────────────────────────────────────
  const hslides = document.querySelectorAll('.hero-slide');
  const hdots   = document.querySelectorAll('.hdot');
  let hcur = 0, htimer;

  // Get video elements
  const vid1 = document.getElementById('hero-vid-1');
  const vid2 = document.getElementById('hero-vid-2');
  const vids  = [vid1, vid2];

  // Play the active slide's video, pause others
  function syncVideos(idx) {
    vids.forEach(function(v, i) {
      if (!v) return;
      if (i === idx) {
        v.play().catch(function(){});
      } else {
        v.pause();
      }
    });
  }

  function goHero(n) {
    hslides[hcur].classList.remove('active');
    hdots[hcur].classList.remove('active');
    hcur = (n + hslides.length) % hslides.length;
    hslides[hcur].classList.add('active');
    hdots[hcur].classList.add('active');
    syncVideos(hcur);
  }
  function startHero() { htimer = setInterval(function(){ goHero(hcur + 1); }, 12000); }

  // Start first video immediately
  if (vid1) vid1.play().catch(function(){});
  startHero();

  hdots.forEach(function(d) {
    d.addEventListener('click', function() {
      clearInterval(htimer);
      goHero(parseInt(d.dataset.s));
      startHero();
    });
  });

  // ── Mute toggle (hero) ────────────────────────────────────────
  var muteBtn  = document.getElementById('hero-mute-btn');
  var muteIcon = document.getElementById('mute-icon');
  var heroMuted = true;
  if (muteBtn) {
    muteBtn.addEventListener('click', function() {
      heroMuted = !heroMuted;
      vids.forEach(function(v) { if (v) v.muted = heroMuted; });
      muteIcon.textContent = heroMuted ? '\uD83D\uDD07' : '\uD83D\uDD0A';
    });
  }

  // ── VIDEO SLIDER (videos section) ─────────────────────────────
  var vsSlides   = document.querySelectorAll('.vs-slide');
  var vsDots     = document.querySelectorAll('.vs-dot');
  var vsPrev     = document.getElementById('vs-prev');
  var vsNext     = document.getElementById('vs-next');
  var vsMuteBtn  = document.getElementById('vs-mute-btn');
  var vsMuteIcon = document.getElementById('vs-mute-icon');
  var vsCur      = document.getElementById('vs-cur');
  var vsFill     = document.getElementById('vs-progress-fill');
  var vsLightbox = document.getElementById('vs-lightbox');
  var vsLbVideo  = document.getElementById('vs-lb-video');
  var vsLbSrc    = document.getElementById('vs-lb-src');
  var vsLbClose  = document.getElementById('vs-lb-close');
  var vsLbBg     = document.getElementById('vs-lb-backdrop');

  var vsCurrent  = 0;
  var vsTotal    = vsSlides.length;
  var vsTimer    = null;
  var vsInterval = 12000; // 12s per slide
  var vsSliderMuted = true;
  var vsProgress = 0;
  var vsProgTimer = null;

  // Get all background videos in the slider
  var vsBgVids = [];
  vsSlides.forEach(function(slide) {
    vsBgVids.push(slide.querySelector('.vs-bg-vid'));
  });

  function vsGoTo(n) {
    // Pause current bg video
    if (vsBgVids[vsCurrent]) vsBgVids[vsCurrent].pause();

    // Remove active
    vsSlides[vsCurrent].classList.remove('active');
    vsDots[vsCurrent].classList.remove('active');

    // Update index
    vsCurrent = (n + vsTotal) % vsTotal;

    // Activate new slide
    vsSlides[vsCurrent].classList.add('active');
    vsDots[vsCurrent].classList.add('active');

    // Update counter
    if (vsCur) vsCur.textContent = (vsCurrent + 1).toString().padStart(2, '0');

    // Play new bg video
    var bgv = vsBgVids[vsCurrent];
    if (bgv) {
      bgv.muted = vsSliderMuted;
      bgv.currentTime = 0;
      bgv.play().catch(function(){});
    }

    // Reset progress bar
    vsProgress = 0;
    if (vsFill) vsFill.style.width = '0%';
  }

  function vsStartTimer() {
    clearInterval(vsTimer);
    clearInterval(vsProgTimer);
    vsProgress = 0;
    if (vsFill) vsFill.style.width = '0%';

    // Progress bar ticks every 100ms
    vsProgTimer = setInterval(function() {
      vsProgress += (100 / (vsInterval / 100));
      if (vsFill) vsFill.style.width = Math.min(vsProgress, 100) + '%';
    }, 100);

    vsTimer = setInterval(function() {
      vsGoTo(vsCurrent + 1);
      vsStartTimer();
    }, vsInterval);
  }

  // Init: play first slide video
  if (vsBgVids[0]) {
    vsBgVids[0].muted = true;
    vsBgVids[0].play().catch(function(){});
  }
  vsStartTimer();

  // Arrow buttons
  if (vsPrev) {
    vsPrev.addEventListener('click', function() {
      vsGoTo(vsCurrent - 1);
      vsStartTimer();
    });
  }
  if (vsNext) {
    vsNext.addEventListener('click', function() {
      vsGoTo(vsCurrent + 1);
      vsStartTimer();
    });
  }

  // Dot buttons
  vsDots.forEach(function(dot) {
    dot.addEventListener('click', function() {
      vsGoTo(parseInt(dot.dataset.index));
      vsStartTimer();
    });
  });

  // Mute toggle for slider
  if (vsMuteBtn) {
    vsMuteBtn.addEventListener('click', function() {
      vsSliderMuted = !vsSliderMuted;
      vsBgVids.forEach(function(v) { if (v) v.muted = vsSliderMuted; });
      vsMuteIcon.textContent = vsSliderMuted ? '\uD83D\uDD07' : '\uD83D\uDD0A';
    });
  }

  // Watch Now buttons — open lightbox with sound
  document.querySelectorAll('.vs-watch-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var idx = parseInt(btn.dataset.index);
      var bgv = vsBgVids[idx];
      if (!bgv) return;
      // Get the source
      var src = bgv.querySelector('source').getAttribute('src').replace('#t=0','');
      vsLbSrc.setAttribute('src', src);
      vsLbVideo.load();
      vsLbVideo.play().catch(function(){});
      vsLightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
      // Pause slider bg video while lightbox is open
      vsBgVids.forEach(function(v) { if (v) v.pause(); });
      clearInterval(vsTimer);
      clearInterval(vsProgTimer);
    });
  });

  function vsCloseLightbox() {
    vsLightbox.classList.remove('open');
    vsLbVideo.pause();
    vsLbVideo.src = '';
    document.body.style.overflow = '';
    // Resume slider
    if (vsBgVids[vsCurrent]) vsBgVids[vsCurrent].play().catch(function(){});
    vsStartTimer();
  }
  if (vsLbClose) vsLbClose.addEventListener('click', vsCloseLightbox);
  if (vsLbBg)    vsLbBg.addEventListener('click', vsCloseLightbox);
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      vsCloseLightbox();
      closeModal();
    }
  });

  // ── Fun Club video switcher ────────────────────────────────────
  var fcVids    = document.querySelectorAll('.fc-vid');
  var fcVdots   = document.querySelectorAll('.fc-vdot');
  var fcCurrent = 0;

  function fcGoTo(n) {
    fcVids[fcCurrent].classList.remove('fc-vid-active');
    fcVdots[fcCurrent].classList.remove('active');
    if (fcVids[fcCurrent].id !== 'fc-vid-0') fcVids[fcCurrent].pause();
    fcCurrent = (n + fcVids.length) % fcVids.length;
    fcVids[fcCurrent].classList.add('fc-vid-active');
    fcVdots[fcCurrent].classList.add('active');
    fcVids[fcCurrent].play().catch(function(){});
  }

  fcVdots.forEach(function(dot) {
    dot.addEventListener('click', function() {
      fcGoTo(parseInt(dot.dataset.fv));
    });
  });

  // Auto-rotate every 8s
  setInterval(function() { fcGoTo(fcCurrent + 1); }, 8000);

  // ── Product tabs ───────────────────────────────────────────────
  const ptabs   = document.querySelectorAll('.ptab');
  const ppanels = document.querySelectorAll('.product-panel');
  ptabs.forEach(tab => {
    tab.addEventListener('click', () => {
      ptabs.forEach(t => t.classList.remove('active'));
      ppanels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.querySelector('.product-panel[data-flavor="' + tab.dataset.flavor + '"]');
      if (panel) panel.classList.add('active');
    });
  });

  // ── Recipe modal ───────────────────────────────────────────────
  const recipes = [
    {
      title: 'Spicy Egg Indomie',
      desc: 'The classic Nigerian breakfast — elevated with heat and freshness.',
      time: '10 min', serves: '1',
      ingredients: ['1 pack Indomie Chicken Flavour','2 eggs','1 scotch bonnet pepper, sliced','2 spring onions, chopped','1 tbsp vegetable oil','Salt to taste'],
      steps: ['Boil noodles for 3 minutes until tender. Drain and set aside.','Heat oil in a pan over medium-high heat.','Fry eggs to your preference — sunny side up or scrambled.','Add scotch bonnet and spring onions to the pan, stir for 30 seconds.','Add noodles and seasoning sachets. Toss everything together for 1 minute.','Plate up, top with the egg, and serve immediately.']
    },
    {
      title: 'Indomie Stir-Fry',
      desc: 'A smoky, vegetable-packed family meal that comes together in 20 minutes.',
      time: '20 min', serves: '2-3',
      ingredients: ['2 packs Indomie Jollof Flavour','200g chicken breast, sliced','1 bell pepper, julienned','1 carrot, julienned','2 cloves garlic, minced','2 tbsp soy sauce','1 tbsp tomato paste','Vegetable oil'],
      steps: ['Cook noodles for 2 minutes, drain and toss with a little oil.','Season chicken with salt and pepper. Stir-fry in hot oil until golden.','Add garlic, cook 30 seconds. Add vegetables, stir-fry 2 minutes.','Add tomato paste and soy sauce, stir to combine.','Add noodles and seasoning sachets. Toss on high heat for 2 minutes.','Serve hot, garnished with spring onions.']
    },
    {
      title: 'Indomie Frittata',
      desc: 'Baked noodle frittata — a creative brunch showstopper.',
      time: '15 min', serves: '2',
      ingredients: ['1 pack Indomie Onion Chicken','4 eggs','1/2 red bell pepper, diced','1/4 onion, diced','2 tbsp milk','Salt, pepper, butter'],
      steps: ['Preheat oven to 180C. Cook noodles, drain well.','Whisk eggs with milk, salt, and pepper.','Saute onion and pepper in an oven-safe pan with butter.','Add noodles and seasoning. Pour egg mixture over everything.','Cook on stovetop 2 minutes until edges set, then bake 8 minutes.','Slice like a pizza and serve warm.']
    },
    {
      title: 'Pepper Soup Noodles',
      desc: 'Full Nigerian pepper soup with Indomie — bold, warming, and deeply satisfying.',
      time: '25 min', serves: '2',
      ingredients: ['2 packs Indomie Pepper Soup Flavour','300g goat meat or chicken','Pepper soup spice mix','Uziza leaves','1 scotch bonnet','Salt, seasoning cube','600ml water'],
      steps: ['Season and boil meat with pepper soup spices until tender, about 15 minutes.','Add scotch bonnet and adjust seasoning to taste.','Add noodles directly to the broth. Cook 3 minutes.','Add seasoning sachets from the packs.','Tear in uziza leaves, stir and cook 1 more minute.','Serve in deep bowls — this is a soup, not a dry dish.']
    }
  ];

  const modal       = document.getElementById('recipe-modal');
  const modalBody   = document.getElementById('modal-body');
  const modalClose  = document.getElementById('modal-close');
  const modalBg     = document.getElementById('modal-backdrop');

  document.querySelectorAll('.recipe-card').forEach(card => {
    card.addEventListener('click', () => {
      const r = recipes[parseInt(card.dataset.recipe)];
      modalBody.innerHTML =
        '<div class="modal-recipe-header">' +
          '<h2>' + r.title + '</h2>' +
          '<p>' + r.desc + '</p>' +
          '<div style="display:flex;gap:16px;margin-top:10px">' +
            '<span style="font-size:12px;color:var(--text-2)">&#9201; ' + r.time + '</span>' +
            '<span style="font-size:12px;color:var(--text-2)">&#128101; Serves ' + r.serves + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="modal-section"><h4>Ingredients</h4><ul>' +
          r.ingredients.map(function(i){ return '<li>' + i + '</li>'; }).join('') +
        '</ul></div>' +
        '<div class="modal-section"><h4>Method</h4><div class="modal-steps">' +
          r.steps.map(function(s,i){ return '<div class="modal-step"><div class="step-num">' + (i+1) + '</div><div class="step-text">' + s + '</div></div>'; }).join('') +
        '</div></div>';
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() { modal.classList.remove('open'); document.body.style.overflow = ''; }
  modalClose.addEventListener('click', closeModal);
  modalBg.addEventListener('click', closeModal);

  // ── Scroll reveal ──────────────────────────────────────────────
  const revealEls = document.querySelectorAll(
    '.about-inner, .product-panel-inner, .recipes-header, .recipes-grid, .clubs-inner, .awards-inner, .footer-top'
  );
  revealEls.forEach(el => el.classList.add('reveal'));
  const ro = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function(){ entry.target.classList.add('visible'); }, i * 100);
        ro.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  revealEls.forEach(el => ro.observe(el));

  // ── Newsletter ─────────────────────────────────────────────────
  var nlFormNew = document.getElementById('nl-form-new');
  var nlSuccess = document.getElementById('nl-success');
  if (nlFormNew) {
    nlFormNew.addEventListener('submit', function(e) {
      e.preventDefault();
      var inp = this.querySelector('.nl-input-new');
      var btn = this.querySelector('.nl-btn-new');
      if (!inp || !inp.value) return;
      btn.style.background = '#27AE60';
      inp.value = '';
      if (nlSuccess) nlSuccess.classList.add('show');
      setTimeout(function() {
        btn.style.background = '';
        if (nlSuccess) nlSuccess.classList.remove('show');
      }, 4000);
    });
  }
  // Keep old nl-form working too if present
  var nlFormOld = document.querySelector('.nl-form');
  if (nlFormOld) {
    nlFormOld.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = this.querySelector('.nl-btn');
      var inp = this.querySelector('.nl-input');
      if (!inp || !inp.value) return;
      btn.textContent = 'Done!';
      btn.style.background = '#27AE60';
      inp.value = '';
      setTimeout(function(){ btn.textContent = 'SIGN UP'; btn.style.background = ''; }, 3000);
    });
  }

  // ── Smooth scroll ──────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

})();
