// Vite page console: await import('/tests/carousel.browser.js'); await checkCarousel('labels').
globalThis.checkCarousel = async (check = 'labels') => {
  const { default: React } = await import('/node_modules/.vite/deps/react.js');
  const { createElement: h } = React;
  const { default: ReactDOM } = await import('/node_modules/.vite/deps/react-dom_client.js');
  const { createRoot } = ReactDOM;
  const { default: Carousel } = await import('/src/components/PhotoCarousel.jsx');
  const { default: certificates } = await import('/src/data/Certificates.js');
  const host = document.createElement('div');
  host.style.cssText = 'position:fixed;inset:0 auto auto 0;width:320px;height:560px;z-index:99999;background:black';
  document.body.append(host);
  const root = createRoot(host);
  const wait = (ms = 60) => new Promise(resolve => setTimeout(resolve, ms));
  const assert = (ok, message) => { if (!ok) throw new Error(message); };
  const matchMedia = window.matchMedia;
  const motion = new EventTarget();
  motion.matches = true;
  if (check === 'motion') window.matchMedia = query => query === '(prefers-reduced-motion: reduce)' ? motion : matchMedia.call(window, query);
  try {
    root.render(h(Carousel, { autoplay: ['pause', 'motion'].includes(check), autoplayDelay: 600 }));
    await wait();
    if (check === 'labels') {
      assert(certificates.every(item => item.name && item.year), 'Certificates need verified names and years');
      const slides = [...host.querySelectorAll('[aria-roledescription="slide"]')];
      slides.forEach((slide, i) => {
        assert(slide.getAttribute('aria-label').includes(certificates[i].name), 'Slide label includes certificate name');
        assert(slide.querySelector('img').alt.includes(String(certificates[i].year)), 'Image alt includes certificate year');
      });
      const label = host.querySelector('[role="status"]');
      assert(label?.textContent.includes(certificates[0].name), 'Visible active label includes certificate name');
      host.querySelector('[aria-label="Next slide"]').click();
      await wait();
      assert(label.textContent.includes(certificates[1].name), 'Active label follows navigation');
    }
    if (check === 'pause') {
      const carousel = host.querySelector('[aria-roledescription="carousel"]');
      const active = () => host.querySelector('[aria-roledescription="slide"][aria-hidden="false"]').getAttribute('aria-label');
      const pause = host.querySelector('button[aria-label="Pause autoplay"]');
      assert(pause, 'Autoplay needs explicit pause control');
      pause.click(); await wait();
      const stopped = active();
      carousel.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
      carousel.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
      carousel.focus(); carousel.blur();
      await wait(750);
      assert(active() === stopped, 'Hover/focus exit must not undo explicit pause');
      assert(host.querySelector('[role="status"]').getAttribute('aria-live') === 'polite', 'Paused active label announces manual navigation');
      host.querySelector('button[aria-label="Resume autoplay"]').click(); await wait(750);
      assert(active() !== stopped, 'Explicit resume restarts autoplay');
    }
    if (check === 'controls') {
      [...host.querySelectorAll('button')].forEach(button => {
        const box = button.getBoundingClientRect();
        assert(box.width >= 44 && box.height >= 44, 'Every control needs 44px hit area');
      });
      assert(host.querySelector('[aria-current="true"]'), 'Current indicator exposed');
      assert(!host.querySelector('[role="tablist"]'), 'Indicators use native buttons, not incomplete tabs');
      root.render(h(Carousel, { items: Array.from({ length: 20 }, (_, i) => ({ ...certificates[i % 3], name: `Test ${i}` })) }));
      await wait();
      const indicators = host.querySelector('[aria-label="Slides"]');
      assert(indicators.scrollWidth <= indicators.clientWidth, 'Large indicator set must wrap without overflow');
      assert(new Set([...indicators.children].map(button => button.getBoundingClientRect().top)).size > 1, 'Large indicator set wraps');
    }
    if (check === 'motion') {
      const carousel = host.querySelector('[aria-roledescription="carousel"]');
      const slides = [...host.querySelectorAll('[aria-roledescription="slide"]')];
      const active = () => slides.find(slide => slide.getAttribute('aria-hidden') === 'false');
      const flat = () => {
        assert(getComputedStyle(carousel).perspective === 'none', 'Reduced motion removes perspective');
        slides.forEach(slide => {
          assert(!/matrix3d/.test(getComputedStyle(slide).transform), 'Reduced motion removes 3D transforms');
          assert(slide.style.opacity === (slide === active() ? '1' : '0'), 'Only active flat slide visible');
        });
      };
      flat();
      const first = active(); await wait(750);
      assert(active() === first, 'Initial reduced motion blocks autoplay');
      host.querySelector('[aria-label="Next slide"]').click(); await wait(20);
      assert(active() !== first, 'Reduced motion manual navigation works');
      flat();
      motion.matches = false; motion.dispatchEvent(new Event('change')); await wait(750);
      assert(getComputedStyle(carousel).perspective !== 'none', 'Live no-preference restores depth');
      const afterResume = active(); await wait(650);
      assert(active() !== afterResume, 'Live no-preference restores autoplay');
      motion.matches = true; motion.dispatchEvent(new Event('change')); await wait();
      flat();
      const stopped = active(); await wait(750);
      assert(active() === stopped, 'Live reduced motion stops autoplay');
      assert(host.querySelector('[role="status"]').getAttribute('aria-live') === 'polite', 'Reduced motion active label announces changes');
    }
    return `PASS: carousel ${check}`;
  } finally {
    root.unmount(); host.remove();
    window.matchMedia = matchMedia;
  }
};
