// Run in browser console on the local preview: await checkPortfolioNavigation().
globalThis.checkPortfolioNavigation = async (scope = 'all') => {
  const assert = (ok, message) => { if (!ok) throw new Error(message); };
  if (scope === 'all' || scope === 'links') {
    const links = [...document.querySelectorAll('.z-contact a')].map(a => a.href);
    const expected = [
      'mailto:ilhamdwiarsandy61@gmail.com',
      'https://github.com/Hammm22',
      'https://instagram.com/Ilham22008',
      'https://linkedin.com/in/ilham-dwi-arsandy',
    ];
    assert(JSON.stringify(links) === JSON.stringify(expected), `Wrong contact links: ${links}`);
  }
  if (scope === 'all' || scope === 'id') {
    assert(document.querySelectorAll('section#contact').length === 1, 'Missing unique contact section ID');
  }
  if (scope === 'all' || scope === 'hero') {
    const wait = () => new Promise(resolve => setTimeout(resolve, 4000));
    for (const [label, id] of [['My Projects', 'projects'], ['Contact Me', 'contact']]) {
      [...document.querySelectorAll('nav button')].find(b => b.getAttribute('aria-label') === 'Home' || b.textContent === 'Home').click();
      await wait();
      [...document.querySelectorAll('#home a, #home button')].find(b => b.textContent.trim() === label).click();
      await wait();
      const style = getComputedStyle(document.querySelector(`.z-${id}`));
      assert(style.visibility === 'visible' && Number(style.opacity) > 0.99, `${label} did not reveal ${id}`);
      assert(getComputedStyle(document.querySelector('.z-hero')).visibility === 'hidden', `${label} left Hero visible`);
    }
  }
  return `PASS: ${scope}`;
};
