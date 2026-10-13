// Paste into browser console, then call checkNavbar() at 320, 375, 768, 1024 and 1440px.
globalThis.checkNavbar = () => {
  const buttons = [...document.querySelectorAll('nav button')];
  if (buttons.length !== 5) throw new Error('Expected five navigation buttons');
  let right = 0;
  for (const button of buttons) {
    const r = button.getBoundingClientRect();
    const text = document.createRange();
    text.selectNodeContents(button);
    const lines = [...text.getClientRects()].filter(rect => rect.width && rect.height);
    if (r.width < 44 || r.height < 44 || r.left < right || r.right > document.documentElement.clientWidth)
      throw new Error(`Small, overlapping or clipped navigation target: ${button.textContent.trim()}`);
    if (new Set(lines.map(rect => Math.round(rect.top))).size !== 1)
      throw new Error(`Wrapped navigation label: ${button.textContent.trim()}`);
    right = r.right;
  }
  return 'PASS: navbar geometry';
};
