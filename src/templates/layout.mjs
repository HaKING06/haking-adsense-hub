import { SITE } from '../data/site.mjs';

export function esc(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function renderLayout({
  title,
  description,
  canonicalPath = '',
  activeNav = '',
  ogImage = 'assets/images/brand/og-haking.png',
  ogType = 'website',
  schemas = [],
  breadcrumbs = [],
  showReadingBar = false,
  noindex = false,
  disableAds = false,
  mobileStickyBar = '',
  bodyHtml = '',
}) {
  const canonicalUrl = canonicalPath
    ? `${SITE.domain}/${canonicalPath.replace(/^\/+/, '')}`
    : `${SITE.domain}/`;
  const absOgImage = ogImage.startsWith('http') ? ogImage : `${SITE.domain}/${ogImage.replace(/^\/+/, '')}`;

  const baseSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE.domain}/#website`,
      name: SITE.name,
      alternateName: 'HaKING — Halit Güneş',
      url: `${SITE.domain}/`,
      inLanguage: 'tr-TR',
      description: SITE.tagline,
      publisher: { '@id': `${SITE.domain}/#person` },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE.domain}/haberler.html?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${SITE.domain}/#person`,
      name: SITE.author.name,
      alternateName: SITE.author.handle,
      url: `${SITE.domain}/hakkimda.html`,
      image: `${SITE.domain}/assets/images/brand/logo-512.png`,
      jobTitle: SITE.author.role,
      email: `mailto:${SITE.author.email}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'İstanbul',
        addressCountry: 'TR',
      },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'İstanbul Kültür Üniversitesi',
      },
      sameAs: SITE.sameAs,
    },
  ];

  if (breadcrumbs.length) {
    baseSchemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: b.name,
        item: b.href ? `${SITE.domain}/${b.href.replace(/^\/+/, '')}` : canonicalUrl,
      })),
    });
  }

  const allSchemas = [...baseSchemas, ...schemas];
  const schemaScripts = allSchemas
    .map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join('\n  ');

  const navHtml = SITE.nav
    .map((item) => {
      const cls = item.cta ? ' class="nav-cta"' : '';
      const cur = activeNav === item.id ? ' aria-current="page"' : '';
      return `<a href="${item.href}"${cls}${cur}>${esc(item.label)}</a>`;
    })
    .join('');

  const adsScript = disableAds
    ? ''
    : `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${SITE.adsenseClient}" crossorigin="anonymous"></script>`;

  return `<!doctype html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="author" content="${esc(SITE.author.name)}">
  <meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'}">
  <meta name="theme-color" content="#f6f3ec">
  <link rel="canonical" href="${esc(canonicalUrl)}">
  <link rel="alternate" hreflang="tr-TR" href="${esc(canonicalUrl)}">
  <link rel="alternate" hreflang="x-default" href="${esc(canonicalUrl)}">
  <link rel="alternate" type="application/rss+xml" title="HaKING — Haberler ve Mühendislik Yazıları" href="${SITE.domain}/rss.xml">
  <link rel="search" type="application/opensearchdescription+xml" title="HaKING Arama" href="${SITE.domain}/opensearch.xml">
  <link rel="manifest" href="manifest.webmanifest">
  <link rel="icon" href="favicon.ico" sizes="any">
  <link rel="icon" type="image/png" href="assets/images/brand/logo-64.png" sizes="64x64">
  <link rel="icon" type="image/png" href="assets/images/brand/logo-192.png" sizes="192x192">
  <link rel="apple-touch-icon" href="assets/images/brand/apple-touch-icon.png">
  <meta property="og:site_name" content="${esc(SITE.name)}">
  <meta property="og:locale" content="${SITE.locale}">
  <meta property="og:type" content="${esc(ogType)}">
  <meta property="og:url" content="${esc(canonicalUrl)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:image" content="${esc(absOgImage)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${esc(absOgImage)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500..700;1,9..144,500..600&family=JetBrains+Mono:wght@400;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap&subset=latin,latin-ext" rel="stylesheet">
  <script>(function(){try{var t=localStorage.getItem('haking_theme_v2');if(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)t='dark';if(t==='dark')document.documentElement.setAttribute('data-theme','dark');var fs=localStorage.getItem('haking_font_scale');if(fs)document.documentElement.style.setProperty('--prose-scale',fs);}catch(e){}})();</script>
  <link rel="stylesheet" href="assets/style.css?v=${SITE.assetVersion}">
  <script defer src="assets/site.js?v=${SITE.assetVersion}"></script>
  ${adsScript}
  ${schemaScripts}
</head>
<body>
  <a class="skip-link" href="#icerik">İçeriğe geç</a>
  ${showReadingBar ? '<div class="reading-progress" aria-hidden="true"></div>' : ''}
  <header class="site-header">
    <nav class="nav wrap" aria-label="Ana gezinme">
      <a class="brand" href="index.html" aria-label="HaKING ana sayfa">
        <img class="brand-mark" src="assets/images/brand/logo-64.png" alt="HaKING amblemi" width="38" height="38">
        <span class="brand-text">
          <span class="brand-name">HaKING</span>
          <span class="brand-sub">Yazılım Stüdyosu &amp; Yayın</span>
        </span>
      </a>
      <div class="nav-links" id="nav-links">
        ${navHtml}
      </div>
      <div class="nav-tools">
        <button type="button" class="icon-btn" data-open-search aria-label="Site içinde ara (Ctrl+K)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <span class="search-btn-label">Ara</span>
          <kbd>Ctrl K</kbd>
        </button>
        <button type="button" class="icon-btn" data-open-bookmarks aria-label="Okuma listem">
          <span aria-hidden="true">★</span>
          <span class="bookmark-count" data-bookmark-count hidden>0</span>
        </button>
        <button type="button" class="icon-btn" data-theme-toggle aria-label="Temayı değiştir" aria-pressed="false">
          <span data-theme-icon aria-hidden="true">☾</span>
        </button>
        <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="nav-links">Menü</button>
      </div>
    </nav>
  </header>

  <main id="icerik">
${bodyHtml}
  </main>

  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-grid">
        <div class="footer-brand">
          <a class="brand" href="index.html">
            <img class="brand-mark" src="assets/images/brand/logo-64.png" alt="HaKING amblemi" width="38" height="38" loading="lazy">
            <span class="brand-text">
              <span class="brand-name">HaKING</span>
              <span class="brand-sub">Halit Güneş · haking.tr</span>
            </span>
          </a>
          <p>Bağımsız yazılım stüdyosu ve Türkçe teknoloji yayını. 15 açık kaynak GitHub projesi, derin mühendislik analizleri ve güncel teknoloji rehberleri.</p>
          <div class="chips" style="margin-top:14px;">
            <a class="chip" href="${SITE.author.github}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a class="chip" href="${SITE.author.youtube}" target="_blank" rel="noopener noreferrer">YouTube ↗</a>
            <a class="chip" href="${SITE.author.steam}" target="_blank" rel="noopener noreferrer">Steam ↗</a>
            <a class="chip" href="${SITE.author.support}" target="_blank" rel="noopener noreferrer">Destek ↗</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Öne Çıkan Ürünler</h4>
          <ul>
            <li><a href="proje-haking-ai.html">HaKING AI (v1.19.2)</a></li>
            <li><a href="proje-spread.html">SPREAD V11.1</a></li>
            <li><a href="proje-cosmic.html">COSMIC Universe</a></li>
            <li><a href="proje-cs2studio.html">CS2 Studio</a></li>
            <li><a href="proje-haking-chat.html">Haking Chat</a></li>
            <li><a href="projects.html">Tüm 15 Proje →</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Haberler &amp; Rehberler</h4>
          <ul>
            <li><a href="haberler.html">Teknoloji Haberleri</a></li>
            <li><a href="blog.html">Mühendislik Yazıları</a></li>
            <li><a href="haking-ai-prompt-modu.html">HaKING Prompt Modu</a></li>
            <li><a href="haber-cs2-ekonomi-doppler-likidite-analizi.html">CS2 Valve Cent Aracı</a></li>
            <li><a href="rehber-not-hesaplama.html">Not Hesaplama Aracı</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Stüdyo</h4>
          <ul>
            <li><a href="hakkimda.html">Hakkımda (Ben Kimim?)</a></li>
            <li><a href="github.html">GitHub Sayfam</a></li>
            <li><a href="proje-yaptir.html">Proje Yaptır &amp; Teklif</a></li>
            <li><a href="iletisim.html">İletişim</a></li>
            <li><a href="yayin-ilkeleri.html">Yayın İlkeleri</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Güven &amp; İletişim</h4>
          <ul>
            <li><a href="gizlilik-politikasi.html">Gizlilik Politikası</a></li>
            <li><a href="cerez-politikasi.html">Çerez Politikası</a></li>
            <li><a href="terms.html">Kullanım Koşulları</a></li>
            <li><a href="site-haritasi.html">Site Haritası</a></li>
            <li><a href="mailto:${SITE.author.email}">${SITE.author.email}</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© <span data-year>2026</span> HaKING · ${esc(SITE.author.name)} · ${esc(SITE.author.city)}</span>
        <div class="footer-bottom-links">
          <a href="site-haritasi.html">Site Haritası</a>
          <a href="yayin-ilkeleri.html">Yayın İlkeleri</a>
          <button type="button" data-open-cookie-settings class="footer-link-btn">Çerez Tercihleri</button>
          <a href="#icerik">Yukarı Çık ↑</a>
        </div>
      </div>
    </div>
  </footer>

  ${mobileStickyBar}

  <button type="button" class="back-to-top" id="back-to-top" aria-label="Yukarı çık" hidden>↑</button>

  <!-- Global Search Command Modal -->
  <div class="modal-backdrop" id="search-modal" role="dialog" aria-modal="true" aria-labelledby="search-modal-title" hidden>
    <div class="modal-box">
      <div class="modal-search-bar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <label for="global-search-input" id="search-modal-title" class="sr-only">Site içinde ara</label>
        <input id="global-search-input" type="search" placeholder="Proje, haber veya rehber ara (ör. Prompt Modu, SPREAD, Haking Chat, OKLCH)..." autocomplete="off">
        <button type="button" class="btn btn-secondary btn-sm" data-close-search>Kapat</button>
      </div>
      <div class="modal-results" id="global-search-results"></div>
      <div class="modal-foot">
        <span id="global-search-count">Hazır</span>
        <span>↑↓ Gezin · Enter Aç · Esc Kapat</span>
      </div>
    </div>
  </div>

  <!-- Reading List / Bookmarks Modal -->
  <div class="modal-backdrop" id="bookmarks-modal" role="dialog" aria-modal="true" aria-labelledby="bookmarks-modal-title" hidden>
    <div class="modal-box">
      <div class="modal-search-bar">
        <strong id="bookmarks-modal-title" style="flex:1;">Okuma Listem (Yerel Kayıt)</strong>
        <button type="button" class="btn btn-secondary btn-sm" data-close-bookmarks>Kapat</button>
      </div>
      <div class="modal-results" id="bookmarks-list"></div>
      <div class="modal-foot">
        <span>Kayıtlar yalnızca bu tarayıcıda saklanır.</span>
      </div>
    </div>
  </div>

  <!-- Cookie & Storage Notice -->
  <aside class="cookie-bar" id="cookie-bar" aria-label="Çerez ve depolama bildirimi" hidden>
    <h4>Çerezler ve Yerel Depolama</h4>
    <p>haking.tr tema ve okuma listesi için yerel depolama kullanır. Google AdSense reklamları etkin olduğunda üçüncü taraf reklam çerezleri kullanılabilir. <a href="cerez-politikasi.html">Çerez Politikası</a> · <a href="gizlilik-politikasi.html">Gizlilik</a></p>
    <div class="cookie-actions">
      <button type="button" class="btn btn-sm" data-cookie-choice="accepted">Anladım</button>
      <button type="button" class="btn btn-secondary btn-sm" data-cookie-choice="essential">Yalnızca Temel</button>
      <a class="text-link" href="cerez-politikasi.html" style="font-size:0.82rem;margin-left:auto;">Ayrıntılar →</a>
    </div>
  </aside>
</body>
</html>
`;
}

export function renderBreadcrumbs(items) {
  return `<nav class="breadcrumbs" aria-label="Sayfa yolu">
    ${items
      .map((it, idx) => {
        const isLast = idx === items.length - 1;
        if (isLast) return `<span aria-current="page">${esc(it.name)}</span>`;
        return `<a href="${it.href}">${esc(it.name)}</a><span aria-hidden="true">/</span>`;
      })
      .join('')}
  </nav>`;
}

export function renderAuthorBox() {
  return `<section class="author-card" aria-label="Yazar hakkında">
    <img src="assets/images/brand/logo-192.png" alt="Halit Güneş — HaKING" width="72" height="72" loading="lazy">
    <div>
      <div class="eyebrow" style="margin-bottom:4px;">YAZAR &amp; GELİŞTİRİCİ</div>
      <h3>${esc(SITE.author.name)} (${esc(SITE.author.handle)})</h3>
      <p>${esc(SITE.author.bioShort)}</p>
      <div class="actions" style="gap:14px;">
        <a class="text-link" href="hakkimda.html">Hakkımda →</a>
        <a class="text-link" href="github.html">GitHub Projeleri →</a>
        <a class="text-link" href="proje-yaptir.html">Proje Yaptır →</a>
      </div>
    </div>
  </section>`;
}

export function renderReadingControls() {
  return `<div class="toc-card reading-controls-card">
    <div class="toc-title">Okuma Konforu</div>
    <div style="display:flex;align-items:center;gap:6px;">
      <button type="button" class="btn btn-secondary btn-sm" data-font-dec aria-label="Yazı boyutunu küçült" style="flex:1;">A−</button>
      <button type="button" class="btn btn-secondary btn-sm" data-font-reset aria-label="Varsayılan yazı boyutu">100%</button>
      <button type="button" class="btn btn-secondary btn-sm" data-font-inc aria-label="Yazı boyutunu büyüt" style="flex:1;">A+</button>
    </div>
  </div>`;
}
