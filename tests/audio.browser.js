// Vite page console: eval(await (await fetch('/tests/audio.browser.js')).text()); await checkAudio();
// Media APIs mocked to cover autoplay policy and device errors deterministically.
globalThis.checkAudio = async () => {
  const { default: React } = await import('/node_modules/.vite/deps/react.js');
  const { default: ReactDOM } = await import('/node_modules/.vite/deps/react-dom_client.js');
  const { default: BackgroundAudio } = await import('/src/components/BackgroundAudio.jsx');
  const key = 'background-audio-enabled';
  const saved = localStorage.getItem(key);
  const original = { play: HTMLMediaElement.prototype.play, pause: HTMLMediaElement.prototype.pause, matchMedia: window.matchMedia };
  const query = new EventTarget();
  query.matches = false;
  query.media = '(prefers-reduced-motion: reduce)';
  window.matchMedia = q => q === query.media ? query : original.matchMedia.call(window, q);
  let calls = 0;
  HTMLMediaElement.prototype.play = function () {
    calls++;
    this.dispatchEvent(new Event('play'));
    return Promise.resolve();
  };
  HTMLMediaElement.prototype.pause = function () { this.dispatchEvent(new Event('pause')); };
  const host = document.createElement('div');
  document.body.append(host);
  let root;
  const wait = () => new Promise(resolve => setTimeout(resolve, 60));
  const assert = (ok, label) => { if (!ok) throw new Error(label); };
  const button = () => host.querySelector('button');
  const audio = () => host.querySelector('audio');
  const mount = async (preference = null, reduced = false) => {
    root?.unmount();
    preference === null ? localStorage.removeItem(key) : localStorage.setItem(key, preference);
    query.matches = reduced;
    calls = 0;
    root = ReactDOM.createRoot(host);
    root.render(React.createElement(BackgroundAudio));
    await wait();
  };
  try {
    await mount();
    assert(calls === 0, 'Default stays silent');
    assert(button().getAttribute('aria-pressed') === 'false', 'Toggle exposes inactive state');
    assert(audio().preload === 'none', 'Default does not preload audio');
    button().click(); await wait();
    assert(localStorage.getItem(key) === 'true', 'Manual enable saved');
    assert(button().getAttribute('aria-pressed') === 'true', 'Playing state exposed');
    button().click(); await wait();
    assert(localStorage.getItem(key) === 'false', 'Manual disable saved');
    await mount('false');
    assert(calls === 0, 'Saved disable never auto plays');
    await mount('true');
    assert(calls === 1, 'Saved enable resumes once');
    assert(button().getAttribute('aria-pressed') === 'true', 'Resume reflects playback');
    audio().dispatchEvent(new Event('pause')); await wait();
    assert(button().getAttribute('aria-pressed') === 'false', 'External pause reflected');
    audio().dispatchEvent(new Event('play')); await wait();
    assert(button().getAttribute('aria-pressed') === 'true', 'External play reflected');
    audio().dispatchEvent(new Event('error')); await wait();
    assert(button().getAttribute('aria-pressed') === 'false', 'Media error reflected');
    HTMLMediaElement.prototype.play = function () { calls++; return Promise.reject(new Error('NotAllowedError')); };
    await mount('true');
    assert(button().getAttribute('aria-pressed') === 'false', 'Rejected resume stays off');
    button().click(); await wait();
    assert(button().getAttribute('aria-pressed') === 'false', 'Rejected manual play stays off');
    HTMLMediaElement.prototype.play = function () { calls++; throw new Error('NotSupportedError'); };
    button().click(); await wait();
    assert(button().getAttribute('aria-pressed') === 'false', 'Synchronous media failure stays off');
    HTMLMediaElement.prototype.play = function () {
      calls++; this.dispatchEvent(new Event('play')); return Promise.resolve();
    };
    await mount('true', true);
    assert(calls === 0, 'Reduced motion blocks saved auto play');
    button().click(); await wait();
    assert(button().getAttribute('aria-pressed') === 'true', 'Manual opt-in allowed with reduced motion');
    assert(!host.querySelector('[class*="animate-"]'), 'Reduced motion disables audio decorations');
    await mount('true');
    query.matches = true; query.dispatchEvent(new Event('change')); await wait();
    assert(button().getAttribute('aria-pressed') === 'false', 'Live reduced motion stops automatic playback');
    assert(localStorage.getItem(key) === 'true', 'System preference does not erase user choice');
    const before = calls;
    query.matches = false; query.dispatchEvent(new Event('change')); await wait();
    assert(calls === before, 'System preference change does not restart audio');
    button().click(); await wait();
    assert(button().getAttribute('aria-pressed') === 'true', 'Manual restart works after live stop');
    const originalGet = Storage.prototype.getItem;
    const originalSet = Storage.prototype.setItem;
    try {
      root.unmount(); root = null;
      Storage.prototype.getItem = () => { throw new Error('SecurityError'); };
      Storage.prototype.setItem = () => { throw new Error('QuotaExceededError'); };
      query.matches = false; calls = 0;
      root = ReactDOM.createRoot(host);
      root.render(React.createElement(BackgroundAudio)); await wait();
      assert(calls === 0, 'Blocked storage defaults silent');
      button().click(); await wait();
      assert(button().getAttribute('aria-pressed') === 'true', 'Blocked storage still permits manual play');
      button().click(); await wait();
      assert(button().getAttribute('aria-pressed') === 'false', 'Blocked storage still permits manual pause');
    } finally {
      Storage.prototype.getItem = originalGet;
      Storage.prototype.setItem = originalSet;
    }
    await mount('garbage');
    assert(calls === 0, 'Invalid preference defaults silent');
    let rejectOld;
    HTMLMediaElement.prototype.play = function () {
      calls++; this.dispatchEvent(new Event('play'));
      return new Promise((resolve, reject) => { rejectOld = reject; });
    };
    button().click(); await wait();
    const oldRejection = rejectOld;
    button().click(); await wait();
    HTMLMediaElement.prototype.play = function () {
      calls++; this.dispatchEvent(new Event('play')); return Promise.resolve();
    };
    button().click(); await wait();
    oldRejection(new Error('Late AbortError')); await wait();
    assert(button().getAttribute('aria-pressed') === 'true', 'Stale rejection cannot override newer playback');
    audio().dispatchEvent(new Event('ended')); await wait();
    assert(button().getAttribute('aria-pressed') === 'false', 'Ended playback reflected');
    return 'PASS: audio default, persistence, media events/errors, reduced motion, blocked storage, stale promise';
  } finally {
    root?.unmount(); host.remove();
    Object.assign(HTMLMediaElement.prototype, { play: original.play, pause: original.pause });
    window.matchMedia = original.matchMedia;
    saved === null ? localStorage.removeItem(key) : localStorage.setItem(key, saved);
  }
};
