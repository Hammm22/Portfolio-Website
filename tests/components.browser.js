// Paste into the Vite dev-page console, then await checkComponents().
globalThis.checkComponents = async () => {
  const { default: React } = await import('/node_modules/.vite/deps/react.js');
  const { createElement: h } = React;
  const { default: ReactDOM } = await import('/node_modules/.vite/deps/react-dom_client.js');
  const { createRoot } = ReactDOM;
  const { default: Decrypt } = await import('/src/components/Decrypt.jsx');
  const host = document.createElement('div');
  host.style.cssText = 'position:fixed;top:100px;left:10px;z-index:9999';
  document.body.append(host);
  const root = createRoot(host);
  const wait = () => new Promise(resolve => setTimeout(resolve, 800));
  const text = () => host.querySelector('[aria-hidden="true"]').textContent;
  const assert = (ok, label) => { if (!ok) throw new Error(label); };
  const render = async props => {
    root.render(h(Decrypt, { text: 'ABC', characters: 'X', speed: 10, maxIterations: 2, ...props }));
    await wait();
  };
  try {
    await render({ animateOn: 'click', clickMode: 'toggle' });
    assert(text() === 'XXX', 'Click mode starts encrypted');
    host.firstElementChild.click(); await wait();
    assert(text() === 'ABC', 'Click decrypts');
    host.firstElementChild.click(); await wait();
    assert(text() === 'XXX', 'Toggle encrypts');
    await render({ text: 'DEF', animateOn: 'click' });
    host.firstElementChild.click(); await wait();
    assert(text() === 'DEF', 'Changed text decrypts correctly');
    await render({ animateOn: 'hover' });
    assert(text() === 'ABC', 'Hover mode starts plain');
    host.firstElementChild.dispatchEvent(new MouseEvent('mouseover', { bubbles: true })); await wait();
    assert(text() === 'ABC', 'Hover animation completes');
    await render({ text: 'VIEW', animateOn: 'view', sequential: true });
    assert(text() === 'VIEW', 'View animation completes');
    return 'PASS: Decrypt click, toggle, prop reset, hover and view';
  } finally {
    root.unmount(); host.remove();
  }
};
