/* ----------------------------------------------------------
   script.js  –  All-in-one utilities for Manahayu Holistic Farm
   ---------------------------------------------------------- */
(() => {
  /* ---------- 1. Helper shortcut ---------- */
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- 2. Filter Menu + Category badge ---------- */
  function filterMenu(category) {
    $$('[data-category]').forEach(item => {
      item.style.display =
        category === 'all' || item.dataset.category === category
          ? 'flex'
          : 'none';
    });
  }

  window.setActiveCategory = (button, category) => {
    $$('.category-btn').forEach(btn => {
      btn.classList.remove('bg-secondary', 'text-white', 'shadow');
      btn.classList.add('text-gray-500');
    });
    button.classList.add('bg-secondary', 'text-white', 'shadow');
    button.classList.remove('text-gray-500');

    filterMenu(category);
  };

  /* ---------- 3. Carousel ---------- */
  function initCarousels() {
    $$('.carouselImages').forEach((track, i) => {
      let current = 0;
      const slides      = [...track.children];
      const indicators  = $$('.carouselIndicators')[i]?.children ?? [];
      const prevButton  = $$('.prev-slide')[i];
      const nextButton  = $$('.next-slide')[i];

      const update = () => {
        track.style.transform = `translateX(${-current * 100}%)`;
        if (indicators.length) {
          [...indicators].forEach(el => {
            el.classList.remove('bg-green-600');
            el.classList.add   ('bg-gray-300');
          });
          indicators[current].classList.add('bg-green-600');
        }
      };

      const move = step => {
        current = (current + step + slides.length) % slides.length;
        update();
      };

      prevButton?.addEventListener('click', () => move(-1));
      nextButton?.addEventListener('click', () => move(1));
      setInterval(() => move(1), 3000);   
      update();                           
    });
  }

  /* ---------- 4. Header / Footer loader ---------- */
  async function loadComponent(containerId, file, afterLoad) {
    try {
      const res       = await fetch(file);
      const html      = await res.text();
      const container = document.getElementById(containerId);
      if (!container) return;
      container.innerHTML = html;
      afterLoad?.();                     
    } catch (err) {
      console.error(`Error loading ${file}`, err);
    }
  }

  /* ---------- 5. Hamburger menu ---------- */
  function setupMenu() {
    const btn  = $('#menu-btn');
    const menu = $('#nav-menu');
    btn?.addEventListener('click', () => menu?.classList.toggle('hidden'));
  }

  /* ---------- 6. FAQ accordion ---------- */
  function setupFAQ(root = document) {
    $$('.faq-toggle', root).forEach(btn => {
      btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        const icon    = btn.querySelector('span:last-child');
        if (!content) return;

        const willOpen = content.classList.contains('hidden');
        // tutup semua FAQ lain
        $$('.faq-toggle', root).forEach(other => {
          if (other === btn) return;
          other.nextElementSibling?.classList.add('hidden');
          (other.querySelector('span:last-child') ?? other).textContent = '+';
        });

        content.classList.toggle('hidden');
        icon.textContent = willOpen ? '−' : '+';
        if (willOpen) content.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  /* ---------- 7. DOM Ready ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header-container', './component/header.html', setupMenu);
    loadComponent('footer-container', './component/footer.html', () =>
      setupFAQ($('#footer-container'))
    );

    // Jika header inline, pastikan tetap pasang menu listener
    setupMenu();
    initCarousels();
  });
})();
