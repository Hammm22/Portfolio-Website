// Run: node tests/lenis-lifecycle.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const source = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
const effect = source.match(/useEffect\(\(\) => \{([\s\S]*?)\n  \}, \[reducedMotion\]\);/)[1];
const callbacks = new Set();
let manualFrames = 0;
let frames = 0;
let destroyed = 0;
let lastTime;
const context = {
  reducedMotion: false,
  Lenis: class { on() {} raf(time) { frames++; lastTime = time; } destroy() { destroyed++; } },
  lenisRef: { current: null },
  requestAnimationFrame() { manualFrames++; },
  ScrollTrigger: { update() {} },
  gsap: { ticker: { add(fn) { callbacks.add(fn); }, remove(fn) { callbacks.delete(fn); }, lagSmoothing() {} } },
};
for (let mount = 0; mount < 2; mount++) {
  const cleanup = vm.runInNewContext(`(() => {${effect}})()`, context);
  assert.equal(manualFrames, 0, 'Lenis must use GSAP ticker only; no independent RAF loop');
  assert.equal(callbacks.size, 1);
  for (const tick of callbacks) tick(2);
  assert.equal(lastTime, 2000, 'Convert GSAP seconds to milliseconds');
  cleanup();
  assert.equal(callbacks.size, 0, 'Unmount must remove ticker callback');
}
assert.equal(frames, 2);
assert.equal(destroyed, 2);
context.reducedMotion = true;
assert.equal(vm.runInNewContext(`(() => {${effect}})()`, context), undefined);
assert.equal(callbacks.size, 0, 'Reduced motion must not register a Lenis ticker');
assert.equal(context.lenisRef.current, null, 'Cleanup must clear stale Lenis reference');
console.log('PASS: single Lenis ticker, time conversion, cleanup/remount and reduced-motion skip');
