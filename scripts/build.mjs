import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE } from '../src/data/site.mjs';
import { PROJECTS } from '../src/data/projects.mjs';
import { CORE_ARTICLES } from '../src/data/articles-core.mjs';
import { NEWS_ARTICLES } from '../src/data/articles-news.mjs';
import { GUIDES_A } from '../src/data/articles-guides-a.mjs';
import { GUIDES_B } from '../src/data/articles-guides-b.mjs';
import { renderHomePage } from '../src/templates/home.mjs';
import { renderProjectsCatalog, renderProjectDetail } from '../src/templates/projects-page.mjs';
import { renderPromptModePage } from '../src/templates/prompt-mode-page.mjs';
import { renderBlogArchive, renderNewsHub, renderArticlePage } from '../src/templates/articles-pages.mjs';
import { renderAboutPage, renderGitHubPage, renderHirePage, renderContactPage } from '../src/templates/studio-pages.mjs';
import { renderToolsStudioPage } from '../src/templates/tools-studio-page.mjs';
import { renderStatusPage } from '../src/templates/status-page.mjs';
import {
  renderEditorialPolicy,
  renderPrivacyPolicy,
  renderCookiePolicy,
  renderTermsPage,
  renderHtmlSitemap,
  render404Page,
} from '../src/templates/legal-pages.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const ALL_ARTICLES = [...NEWS_ARTICLES, ...CORE_ARTICLES, ...GUIDES_A, ...GUIDES_B].sort((a, b) => b.date.localeCompare(a.date));

function writeOut(relPath, content) {
  const full = path.join(ROOT, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
}

function xmlEsc(s = '') {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// 1. Render all HTML pages
const pages = [
  { file: 'index.html', urlPath: '', html: renderHomePage(ALL_ARTICLES, NEWS_ARTICLES), lastmod: SITE.buildDate, priority: '1.0', changefreq: 'weekly', image: 'assets/images/brand/og-haking.png' },
  { file: 'projects.html', urlPath: 'projects.html', html: renderProjectsCatalog(), lastmod: SITE.buildDate, priority: '0.95', changefreq: 'weekly', image: 'assets/images/brand/og-haking.png' },
  { file: 'araclar.html', urlPath: 'araclar.html', html: renderToolsStudioPage(), lastmod: SITE.buildDate, priority: '0.95', changefreq: 'weekly', image: 'assets/images/brand/og-haking.png' },
  { file: 'durum.html', urlPath: 'durum.html', html: renderStatusPage(), lastmod: SITE.buildDate, priority: '0.85', changefreq: 'weekly', image: 'assets/images/brand/og-haking.png' },
  { file: 'haking-ai-prompt-modu.html', urlPath: 'haking-ai-prompt-modu.html', html: renderPromptModePage(), lastmod: SITE.buildDate, priority: '0.95', changefreq: 'weekly', image: 'assets/images/projects/prompt-mode.webp' },
  { file: 'blog.html', urlPath: 'blog.html', html: renderBlogArchive(ALL_ARTICLES), lastmod: SITE.buildDate, priority: '0.90', changefreq: 'weekly', image: 'assets/images/brand/og-haking.png' },
  { file: 'haberler.html', urlPath: 'haberler.html', html: renderNewsHub(ALL_ARTICLES, NEWS_ARTICLES), lastmod: SITE.buildDate, priority: '0.90', changefreq: 'weekly', image: 'assets/images/brand/og-haking.png' },
  { file: 'hakkimda.html', urlPath: 'hakkimda.html', html: renderAboutPage(), lastmod: SITE.buildDate, priority: '0.85', changefreq: 'monthly', image: 'assets/images/brand/og-haking.png' },
  { file: 'github.html', urlPath: 'github.html', html: renderGitHubPage(), lastmod: SITE.buildDate, priority: '0.85', changefreq: 'weekly', image: 'assets/images/brand/og-haking.png' },
  { file: 'proje-yaptir.html', urlPath: 'proje-yaptir.html', html: renderHirePage(), lastmod: SITE.buildDate, priority: '0.85', changefreq: 'monthly', image: 'assets/images/brand/og-haking.png' },
  { file: 'iletisim.html', urlPath: 'iletisim.html', html: renderContactPage(), lastmod: SITE.buildDate, priority: '0.75', changefreq: 'monthly', image: 'assets/images/brand/og-haking.png' },
  { file: 'yayin-ilkeleri.html', urlPath: 'yayin-ilkeleri.html', html: renderEditorialPolicy(), lastmod: SITE.buildDate, priority: '0.65', changefreq: 'yearly', image: null },
  { file: 'gizlilik-politikasi.html', urlPath: 'gizlilik-politikasi.html', html: renderPrivacyPolicy(), lastmod: SITE.buildDate, priority: '0.60', changefreq: 'yearly', image: null },
  { file: 'cerez-politikasi.html', urlPath: 'cerez-politikasi.html', html: renderCookiePolicy(), lastmod: SITE.buildDate, priority: '0.60', changefreq: 'yearly', image: null },
  { file: 'terms.html', urlPath: 'terms.html', html: renderTermsPage(), lastmod: SITE.buildDate, priority: '0.60', changefreq: 'yearly', image: null },
  { file: 'site-haritasi.html', urlPath: 'site-haritasi.html', html: renderHtmlSitemap(ALL_ARTICLES), lastmod: SITE.buildDate, priority: '0.65', changefreq: 'weekly', image: null },
  { file: '404.html', urlPath: '404.html', html: render404Page(), lastmod: SITE.buildDate, priority: null, changefreq: null, image: null, excludeSitemap: true },
];

for (const p of PROJECTS) {
  pages.push({
    file: p.page,
    urlPath: p.page,
    html: renderProjectDetail(p, ALL_ARTICLES),
    lastmod: p.updated,
    priority: '0.85',
    changefreq: 'monthly',
    image: p.image,
  });
}

for (const a of ALL_ARTICLES) {
  pages.push({
    file: a.file,
    urlPath: a.file,
    html: renderArticlePage(a, ALL_ARTICLES),
    lastmod: a.date,
    priority: a.featured ? '0.90' : '0.80',
    changefreq: 'monthly',
    image: a.image,
  });
}

for (const pg of pages) {
  writeOut(pg.file, pg.html);
}

// 2. Generate sitemap.xml (with image tags for Google, Bing, Yandex image indexing)
const sitemapEntries = pages
  .filter((p) => !p.excludeSitemap)
  .map((p) => {
    const loc = p.urlPath ? `${SITE.domain}/${p.urlPath}` : `${SITE.domain}/`;
    const imgBlock = p.image
      ? `\n    <image:image><image:loc>${xmlEsc(`${SITE.domain}/${p.image}`)}</image:loc></image:image>`
      : '';
    return `  <url>
    <loc>${xmlEsc(loc)}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>${imgBlock}
  </url>`;
  })
  .join('\n');

writeOut(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${sitemapEntries}
</urlset>
`
);

// 3. Generate rss.xml (RSS 2.0 + Atom self link)
const rssItems = [
  {
    title: 'HaKING AI Prompt Modu (v1.19.2): Fikrinden Denetlenmiş AI Agent Promptuna',
    link: `${SITE.domain}/haking-ai-prompt-modu.html`,
    desc: 'Görev kartı (prompt_state), ücretsiz keşif soruları, 7 görev türü ve canlı öncesi/sonrası prompt karşılaştırıcısı.',
    date: 'Fri, 27 Nov 2026 10:00:00 +0300',
    category: 'Yapay Zekâ',
  },
  ...ALL_ARTICLES.map((a) => ({
    title: a.title,
    link: `${SITE.domain}/${a.file}`,
    desc: a.shortDesc,
    date: new Date(`${a.date}T12:00:00+03:00`).toUTCString(),
    category: a.category,
  })),
];

writeOut(
  'rss.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEsc(SITE.fullTitle)}</title>
    <link>${SITE.domain}/</link>
    <description>${xmlEsc(SITE.tagline)}</description>
    <language>tr-tr</language>
    <lastBuildDate>${new Date(`${SITE.buildDate}T14:00:00+03:00`).toUTCString()}</lastBuildDate>
    <atom:link href="${SITE.domain}/rss.xml" rel="self" type="application/rss+xml"/>
${rssItems
  .map(
    (it) => `    <item>
      <title>${xmlEsc(it.title)}</title>
      <link>${xmlEsc(it.link)}</link>
      <guid isPermaLink="true">${xmlEsc(it.link)}</guid>
      <pubDate>${it.date}</pubDate>
      <category>${xmlEsc(it.category)}</category>
      <description>${xmlEsc(it.desc)}</description>
    </item>`
  )
  .join('\n')}
  </channel>
</rss>
`
);

// 4. Generate search-index.json (powers instant Ctrl+K command palette)
const searchIndex = [
  { title: 'Online Mühendislik Araçları Stüdyosu (5 Araç)', desc: 'AI Prompt Kurucu, CS2 Valve Cent & Başa Baş, OKLCH/WCAG Kontrast, Not Hesaplayıcı ve Google SERP Testi.', url: 'araclar.html', type: 'Online Araç', tags: ['araçlar', 'wcag', 'oklch', 'valve cent', 'serp', 'prompt kurucu', 'not hesaplama'] },
  { title: 'Canlı Ekosistem Durumu & Mimari Harita (15 Servis)', desc: 'Tüm aktif *.haking.tr web servislerinin sürüm, altyapı ve tarayıcı içi canlı erişim (RTT) panosu.', url: 'durum.html', type: 'Durum', tags: ['durum', 'status', 'canlı servis', 'ping', 'cloudflare'] },
  { title: 'HaKING AI Prompt Modu (v1.19.2)', desc: 'AI agentları için görev kartlı Türkçe prompt atölyesi, 7 görev türü ve canlı karşılaştırıcı.', url: 'haking-ai-prompt-modu.html', type: 'Yeni Özellik', tags: ['prompt modu', 'codex', 'agent', 'haking ai'] },
  { title: 'Proje Yaptır & Brief Oluşturucu', desc: 'Web uygulaması, AI arayüzü, tarayıcı eklentisi ve teknik SEO için interaktif teklif hazırlayıcı.', url: 'proje-yaptir.html', type: 'Stüdyo', tags: ['proje yaptır', 'teklif', 'iş birliği', 'freelance'] },
  { title: 'Hakkımda — Halit Güneş (Ben Kimim?)', desc: 'İstanbul Kültür Üniversitesi Bilgisayar Programcılığı, yetkinlik haritası ve üretim kronolojisi.', url: 'hakkimda.html', type: 'Profil', tags: ['halit güneş', 'hakkımda', 'yazar', 'kimim'] },
  { title: 'GitHub Sayfam (github.com/HaKING06)', desc: '15 büyük public açık kaynak GitHub deposu, sürümleri ve canlı doğrulama.', url: 'github.html', type: 'Açık Kaynak', tags: ['github', 'açık kaynak', 'mit', 'repolar'] },
  { title: 'İletişim — merhaba@haking.tr', desc: 'Doğrudan e-posta, sosyal bağlantılar ve hızlı mesaj taslağı hazırlayıcı.', url: 'iletisim.html', type: 'İletişim', tags: ['iletişim', 'eposta', 'destek'] },
  ...PROJECTS.map((p) => ({
    title: `${p.name} (${p.version})`,
    desc: p.tagline,
    url: p.page,
    type: 'Proje',
    tags: [p.category, p.language, ...p.stack],
  })),
  ...ALL_ARTICLES.map((a) => ({
    title: a.title,
    desc: a.shortDesc,
    url: a.file,
    type: a.kind,
    tags: [a.category, ...a.tags],
  })),
];
writeOut('search-index.json', JSON.stringify(searchIndex, null, 2));

// 5. Generate robots.txt (Multi-Engine + AI Search friendly)
writeOut(
  'robots.txt',
  `# HaKING (haking.tr) — Multi-Search Engine & AI Crawler Policy
User-agent: *
Allow: /
Disallow: /src/
Disallow: /scripts/

User-agent: Mediapartners-Google
Allow: /

User-agent: AdsBot-Google
Allow: /

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: ${SITE.domain}/sitemap.xml
`
);

// 6. Generate llms.txt & llms-full.txt (GEO / AI Search discoverability)
const llmsTxt = `# HaKING (haking.tr)

> Halit Güneş (HaKING06) tarafından yürütülen bağımsız Türkçe yazılım stüdyosu, açık kaynak ürün ekosistemi ve mühendislik yayını.

- Yazar: ${SITE.author.name} (${SITE.author.handle})
- Konum: ${SITE.author.city}
- Eğitim: ${SITE.author.education}
- İletişim: ${SITE.author.email}
- GitHub: ${SITE.author.github}

## Öne Çıkan Sayfalar
- [Ana Sayfa](${SITE.domain}/): Stüdyo özeti, seçili ürünler ve mühendislik yazıları.
- [Online Mühendislik Araçları (5 Araç)](${SITE.domain}/araclar.html): Prompt Kurucu, CS2 Valve Cent & Başa Baş, OKLCH/WCAG Kontrast, Not Hesaplayıcı ve Google SERP Önizleyici.
- [Canlı Ekosistem Durumu](${SITE.domain}/durum.html): Tüm aktif *.haking.tr servislerinin mimari haritası ve tarayıcı erişim testi.
- [HaKING AI Prompt Modu (v1.19.2)](${SITE.domain}/haking-ai-prompt-modu.html): Codex ve AI agentları için görev kartlı Türkçe prompt atölyesi.
- [Açık Kaynak Projeler (15 Ürün)](${SITE.domain}/projects.html): Tüm büyük public GitHub projeleri ve canlı adresleri.
- [Mühendislik Yazıları](${SITE.domain}/blog.html): Vaka analizleri ve teknik rehberler.
- [Hakkımda — Halit Güneş](${SITE.domain}/hakkimda.html): Yazar biyografisi, yetkinlik haritası ve kronoloji.
- [GitHub Sayfam](${SITE.domain}/github.html): 15 public deponun özet tablosu ve katkı ilkeleri.
- [Proje Yaptır](${SITE.domain}/proje-yaptir.html): Özel yazılım, AI ve tarayıcı eklentisi geliştirme brief aracı.

## 15 Büyük Public GitHub Projesi
${PROJECTS.map((p) => `- [${p.name} (${p.version})](${SITE.domain}/${p.page}): ${p.tagline}${p.liveUrl ? ` | Canlı: ${p.liveUrl}` : ''} | Repo: ${p.repoUrl}`).join('\n')}

## Mühendislik Yazıları ve Teknik Rehberler
${ALL_ARTICLES.map((a) => `- [${a.title}](${SITE.domain}/${a.file}): ${a.shortDesc}`).join('\n')}
`;
writeOut('llms.txt', llmsTxt);

const llmsFull = `${llmsTxt}\n\n---\n## Ayrıntılı Proje Teknik Özetleri\n\n${PROJECTS.map(
  (p) => `### ${p.name} (${p.version})
- Kategori: ${p.category} | Dil: ${p.language} | Lisans: ${p.license}
- Canlı URL: ${p.liveUrl || 'Masaüstü uygulama (GitHub)'}
- GitHub: ${p.repoUrl}
- Özet: ${p.summary}
- Öne Çıkanlar:
${p.highlights.map((h) => `  - ${h}`).join('\n')}
- Bilinen Sınırlar: ${p.limitations}
`
).join('\n')}`;
writeOut('llms-full.txt', llmsFull);

// 7. Generate manifest.webmanifest, opensearch.xml, _headers, and verify ads.txt
writeOut(
  'manifest.webmanifest',
  JSON.stringify(
    {
      name: 'HaKING — Halit Güneş | Yazılım Stüdyosu & Yayın',
      short_name: 'HaKING',
      description: SITE.tagline,
      lang: 'tr-TR',
      start_url: '/',
      display: 'standalone',
      background_color: '#f6f3ec',
      theme_color: '#b83b1a',
      icons: [
        { src: 'assets/images/brand/logo-192.png', sizes: '192x192', type: 'image/png' },
        { src: 'assets/images/brand/logo-512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    null,
    2
  )
);

writeOut(
  'opensearch.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
  <ShortName>HaKING</ShortName>
  <Description>haking.tr açık kaynak projeler ve mühendislik yazıları araması</Description>
  <InputEncoding>UTF-8</InputEncoding>
  <Image width="64" height="64" type="image/png">${SITE.domain}/assets/images/brand/logo-64.png</Image>
  <Url type="text/html" method="get" template="${SITE.domain}/haberler.html?q={searchTerms}"/>
</OpenSearchDescription>
`
);

writeOut(
  '_headers',
  `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

/assets/images/*
  Cache-Control: public, max-age=31536000, immutable

/assets/*
  Cache-Control: public, max-age=604800
`
);

writeOut('ads.txt', `${SITE.adsTxtLine}\n`);

console.log(`BUILD COMPLETE: ${pages.length} HTML pages + sitemap.xml + rss.xml + llms.txt + llms-full.txt + search-index.json + robots.txt + manifest + opensearch + _headers + ads.txt`);
