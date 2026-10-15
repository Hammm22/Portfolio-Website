// Run: node tests/glass-observer.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const source = readFileSync(new URL('../src/components/Glass.jsx', import.meta.url), 'utf8');
const effects = [...source.matchAll(/useEffect\(\(\) => \{([\s\S]*?)\n  \}, \[[\s\S]*?\]\);/g)]
  .map(match => match[1]).filter(body => body.includes('new ResizeObserver'));
let observed = 0;
let disconnected = 0;
const context = {
  containerRef: { current: {} },
  ResizeObserver: class { observe() { observed++; } disconnect() { disconnected++; } },
};
const cleanups = effects.map(body => vm.runInNewContext(`(() => {${body}})()`, context));
assert.equal(observed, 1, 'One Glass instance must observe its size exactly once');
cleanups.forEach(cleanup => cleanup());
assert.equal(disconnected, 1);
console.log('PASS: one Glass resize observer and cleanup');
