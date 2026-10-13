// Vite console: await import('/tests/accessibility.browser.js'); await checkAccessibility('headings');
// For motion, enable prefers-reduced-motion in browser before checkAccessibility('motion').
globalThis.checkAccessibility = async (scope = 'headings') => {
  const assert = (ok, label) => { if (!ok) throw new Error(label); };
  if (scope === 'headings') {
    assert(document.querySelectorAll('#about h2').length === 1, 'About must have only one section h2');
    assert(document.querySelectorAll('#about h3').length === 5, 'About card titles must use h3, including GitHub');
  }
  if (scope === 'motion') {
    assert(matchMedia('(prefers-reduced-motion: reduce)').matches, 'Enable reduced motion first');
    assert(!document.querySelector('.pin-spacer'), 'Reduced motion must disable pinned 3D timeline');
    assert(!document.documentElement.classList.contains('lenis'), 'Reduced motion must disable Lenis');
    assert(getComputedStyle(document.documentElement).scrollBehavior === 'auto', 'Native scroll must be instant');
    const panels = [...document.querySelector('.z-container').children];
    let bottom = 0;
    for (const panel of panels) {
      const style = getComputedStyle(panel);
      const rect = panel.getBoundingClientRect();
      assert(style.position === 'relative' && style.visibility === 'visible' && style.transform === 'none', `${panel.className}: panel must be in visible 2D flow`);
      assert(rect.top + window.scrollY >= bottom - 1, 'Panels must not overlap');
      bottom = rect.bottom + window.scrollY;
    }
    for (const el of document.querySelectorAll('.hero-anim, .github-anim, nav')) {
      const style = getComputedStyle(el);
      assert(Number(style.opacity) === 1 && style.transform === 'none', 'Reveals must leave content visible without transforms');
    }
    assert(!document.querySelector('canvas'), 'Decorative canvas animation must be disabled');
    const { default: gsap } = await import('/node_modules/.vite/deps/gsap.js');
    assert(!gsap.globalTimeline.getChildren().some(t => t.scrollTrigger), 'No scroll animation should survive reduced motion');
    for (const id of ['about', 'achievements', 'projects', 'contact', 'home']) {
      const button = document.querySelector(`nav button[aria-label="${{about:'About Me',achievements:'Achievements',projects:'Projects',contact:'Contact',home:'Home'}[id]}"]`);
      button.click();
      await new Promise(resolve => setTimeout(resolve, 100));
      const rect = document.getElementById(id).getBoundingClientRect();
      assert(rect.top >= 0 && rect.top < innerHeight, `Navigation must reach ${id} with reduced motion`);
      assert(button.getAttribute('aria-current') === 'location', `Navigation must mark ${id} current`);
    }
  }
  return `PASS: accessibility ${scope}`;
};
