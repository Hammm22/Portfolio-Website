// Run on the Vite page in DevTools:
// await (await import('/tests/portfolio.browser.js')).checkPortfolio()
export async function checkPortfolio() {
  const assert = (condition, message) => {
    if (!condition) throw new Error(message);
  };
  const waitFor = async (check, message) => {
    for (let i = 0; i < 100; i++) {
      if (check()) return;
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    throw new Error(message);
  };
  const visible = id => {
    const el = document.getElementById(id);
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    if (rect.bottom <= 0 || rect.top >= innerHeight) return false;
    for (let node = el; node; node = node.parentElement) {
      const style = getComputedStyle(node);
      if (style.visibility === 'hidden' || Number(style.opacity) < 0.95) return false;
    }
    return true;
  };
  for (const id of ['projects', 'contact']) {
    const home = document.querySelector('nav a[href="#home"]') || document.querySelector('nav button');
    home.click();
    await waitFor(() => visible('home'), 'Home navigation failed');
    document.querySelector(`#home a[href="#${id}"]`).click();
    await waitFor(() => visible(id), `Hero link did not reveal ${id}`);
    assert(location.hash === `#${id}`, 'Navigation must update URL hash');
  }
  const natural = matchMedia('(max-width: 1023px), (max-height: 699px), (prefers-reduced-motion: reduce)').matches;
  if (natural) {
    assert(!document.querySelector('.pin-spacer'), 'Natural layout must not pin sections');
    const sections = ['home', 'about', 'achievements', 'projects', 'contact'].map(id => document.getElementById(id));
    for (let i = 1; i < sections.length; i++) {
      assert(sections[i].getBoundingClientRect().top >= sections[i - 1].getBoundingClientRect().bottom - 1, 'Sections must flow vertically');
    }
    for (const card of document.querySelectorAll('#about .grid > div')) {
      assert(card.scrollHeight <= card.clientHeight + 1, 'About card clips content');
    }
    assert(document.documentElement.scrollWidth <= innerWidth, 'Page overflows horizontally');
  }
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    assert(!document.querySelector('canvas'), 'Reduced motion must not run animated background');
    assert(!document.querySelector('.lenis'), 'Reduced motion must not use smooth scrolling');
    assert(document.querySelector('h1').textContent.includes('Ilham Dwi Arsandy.'), 'Name must remain readable');
  }
  return 'PASS: navigation, hash, responsive layout, and motion preference';
}
