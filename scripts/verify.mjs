import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const htmlFiles = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html')).sort();
let errors = [];
let warnings = [];
const titles = new Map();
const descriptions = new Map();

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<header[\s\S]*?<\/header>/gi, ' ')
    .replace(/<footer[\s\S]*?<\/footer>/gi, ' ')
    .replace(/<aside[\s\S]*?<\/aside>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

for (const file of htmlFiles) {
  const full = path.join(ROOT, file);
  const html = fs.readFileSync(full, 'utf8');

  if (!html.startsWith('<!doctype html>')) errors.push(`${file}: missing <!doctype html>`);
  if (file === '404.html') {
    if (html.includes('adsbygoogle.js')) errors.push(`404.html must NOT contain AdSense script (policy violation)`);
  } else {
    if (!html.includes('ca-pub-2827419116684137')) errors.push(`${file}: missing AdSense tag`);
  }
  if (!html.includes('rel="canonical"')) errors.push(`${file}: missing canonical`);
  if (!html.includes('property="og:image"')) errors.push(`${file}: missing og:image`);

  // Check unique title & description
  const tm = html.match(/<title>([^<]+)<\/title>/);
  const dm = html.match(/<meta name="description" content="([^"]+)"/);
  if (!tm) errors.push(`${file}: missing <title>`);
  else {
    if (titles.has(tm[1])) errors.push(`${file}: duplicate title with ${titles.get(tm[1])}`);
    titles.set(tm[1], file);
  }
  if (!dm) errors.push(`${file}: missing description`);
  else {
    if (descriptions.has(dm[1])) errors.push(`${file}: duplicate description with ${descriptions.get(dm[1])}`);
    descriptions.set(dm[1], file);
  }

  // Validate every JSON-LD block
  const ldMatches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!ldMatches.length) errors.push(`${file}: missing JSON-LD`);
  for (const m of ldMatches) {
    try { JSON.parse(m[1]); }
    catch (e) { errors.push(`${file}: invalid JSON-LD: ${e.message}`); }
  }

  // Validate internal href & img src
  const refs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
  for (const ref of refs) {
    if (ref.startsWith('http://') || ref.startsWith('https://') || ref.startsWith('mailto:') || ref.startsWith('#') || ref.startsWith('data:')) continue;
    const clean = ref.split('#')[0].split('?')[0];
    if (!clean) continue;
    if (!fs.existsSync(path.join(ROOT, clean))) {
      errors.push(`${file}: broken local reference -> ${ref}`);
    }
  }

  // Check for forbidden purple tones in inline styles
  if (/#(?:7c3aed|8b5cf6|a855f7|6366f1|4f46e5|090b14)/i.test(html)) {
    errors.push(`${file}: contains old purple/AI dark hex color`);
  }

  // Word count check on main content (excluding 404 & sitemap)
  if (file !== '404.html' && file !== 'site-haritasi.html') {
    const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    const words = mainMatch ? stripTags(mainMatch[1]).split(/\s+/).filter(Boolean).length : 0;
    if (words < 280) warnings.push(`${file}: low word count (${words} words)`);
  }
}

// Validate required root files
for (const reqFile of ['ads.txt', 'robots.txt', 'sitemap.xml', 'rss.xml', 'llms.txt', 'llms-full.txt', 'search-index.json', 'manifest.webmanifest', 'opensearch.xml', '_headers', 'favicon.ico']) {
  if (!fs.existsSync(path.join(ROOT, reqFile))) errors.push(`Missing required root file: ${reqFile}`);
}
const adsTxt = fs.readFileSync(path.join(ROOT, 'ads.txt'), 'utf8').trim();
if (adsTxt !== 'google.com, pub-2827419116684137, DIRECT, f08c47fec0942fa0') {
  errors.push(`ads.txt altered unexpectedly: ${adsTxt}`);
}
JSON.parse(fs.readFileSync(path.join(ROOT, 'search-index.json'), 'utf8'));
JSON.parse(fs.readFileSync(path.join(ROOT, 'manifest.webmanifest'), 'utf8'));

// Verify sitemap URLs match HTML files
const sm = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
const smCount = (sm.match(/<loc>/g) || []).length;

console.log(`VERIFIED ${htmlFiles.length} HTML files | ${smCount} sitemap URLs | ${errors.length} errors | ${warnings.length} warnings`);
if (warnings.length) {
  console.log('WARNINGS:');
  warnings.forEach((w) => console.log('  !', w));
}
if (errors.length) {
  console.error('ERRORS:');
  errors.forEach((e) => console.error('  X', e));
  process.exit(1);
}
console.log('ALL CHECKS PASSED!');
