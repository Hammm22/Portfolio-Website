// Run after npm run build: node tests/bundle-budget.mjs
import assert from 'node:assert/strict';
import { readdirSync, statSync } from 'node:fs';
const assets = new URL('../dist/assets/', import.meta.url);
const entry = readdirSync(assets).find(name => /^index-.*\.js$/.test(name));
assert.ok(entry, 'Missing production entry bundle');
const bytes = statSync(new URL(entry, assets)).size;
assert.ok(bytes < 500_000, `Entry bundle exceeds 500 kB: ${bytes} bytes`);
console.log(`PASS: entry bundle ${bytes} bytes (<500000)`);
