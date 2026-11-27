import { SITE } from '../data/site.mjs';
import { PROJECTS, PROJECT_CATEGORIES } from '../data/projects.mjs';
import { renderLayout, renderBreadcrumbs, renderAuthorBox, esc } from './layout.mjs';
import { renderProjectCard } from './home.mjs';

export function renderProjectsCatalog() {
  const breadcrumbs = [
    { name: 'Ana Sayfa', href: 'index.html' },
    { name: 'Açık Kaynak Projeler' },
  ];

  const bodyHtml = `
    <header class="page-intro">
      <div class="wrap">
        ${renderBreadcrumbs(breadcrumbs)}
        <div class="eyebrow">PUBLIC GITHUB PORTFOLYOSU · 15 ÜRÜN</div>
        <h1>Açık kaynak projeler ve canlı web servisleri.</h1>
        <p class="lead">Burada yalnızca <strong>github.com/HaKING06</strong> üzerinde herkese açık yayımlanan, gerçek bir kullanıcı akışını çözen ve aktif sürdürülen büyük projeler listelenir. Her karttan çalışan canlı siteye, kaynak koduna veya ayrıntılı teknik inceleme sayfasına doğrudan geçebilirsiniz.</p>
      </div>
    </header>

    <section class="section wrap">
      <div class="filter-bar">
        <div class="filter-pills" role="group" aria-label="Kategori filtresi">
          ${PROJECT_CATEGORIES.map((c, i) => `<button type="button" class="filter-pill${i === 0 ? ' is-active' : ''}" data-project-filter data-filter="${esc(c.id)}">${esc(c.label)}</button>`).join('')}
        </div>
        <div class="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <label for="project-search" class="sr-only">Projelerde ara</label>
          <input id="project-search" type="search" placeholder="Proje veya teknoloji ara (ör. Three.js, CS2, PWA)...">
        </div>
      </div>

      <p class="mono" id="project-count" style="font-size:0.82rem;color:var(--ink-muted);margin-bottom:18px;">${PROJECTS.length} proje</p>

      <div class="project-grid">
        ${PROJECTS.map(renderProjectCard).join('')}
      </div>
      <p id="project-empty" hidden style="text-align:center;padding:36px;color:var(--ink-muted);">Aramanızla eşleşen proje bulunamadı. Farklı bir anahtar kelime veya kategori deneyin.</p>
    </section>

    <section class="section section-band">
      <div class="wrap">
        <div class="section-head">
          <div class="section-head-copy">
            <div class="eyebrow">KARŞILAŞTIRMALI REHBER</div>
            <h2>Hangi HaKING aracı hangi problem için tasarlandı?</h2>
            <p>Doğru projeyi saniyeler içinde seçebilmeniz için tüm 15 açık kaynak ürünün odak alanı, veri saklama modeli ve canlı erişim tablosu.</p>
          </div>
          <a class="btn btn-secondary" href="github.html">GitHub Depo İstatistikleri →</a>
        </div>

        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Proje</th>
                <th>Sürüm</th>
                <th>Odak Alanı</th>
                <th>Veri &amp; Gizlilik Modeli</th>
                <th>Erişim</th>
              </tr>
            </thead>
            <tbody>
              ${PROJECTS.map(
                (p) => `<tr>
                  <td><strong><a href="${p.page}">${esc(p.name)}</a></strong></td>
                  <td class="mono">${esc(p.version)}</td>
                  <td>${esc(p.tagline)}</td>
                  <td>${p.slug === 'haking-ai' || p.slug === 'haking-chat' || p.slug === 'utrzone' ? 'Sunucu API + güvenli hesap/oturum' : 'Yerel öncelikli / sıfır hesap'}</td>
                  <td style="white-space:nowrap;">${
                    p.liveUrl
                      ? `<a class="text-link" href="${esc(p.liveUrl)}" target="_blank" rel="noopener noreferrer">Canlı ↗</a>`
                      : `<a class="text-link" href="${esc(p.repoUrl)}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>`
                  }</td>
                </tr>`
              ).join('')}
            </tbody>
          </table>
        </div>

        <div class="prose prose-wide" style="margin-top:34px;">
          <h2>Mühendislik ve şeffaflık standartlarımız</h2>
          <p>HaKING ekosistemindeki her ürün, yayınlanmadan önce üç temel sorudan geçer: <strong>Kullanıcıdan gereksiz veri isteniyor mu?</strong>, <strong>hata ve sınır durumları açıkça yönetiliyor mu?</strong> ve <strong>kaynak kodu şeffaf biçimde incelenebilir mi?</strong></p>
          <p>QR Scanner, CopyHex, NotMatik, CSELL, TradeCalc, CS2 Studio ve SPREAD gibi araçlar mümkün olan en yüksek oranda tarayıcı içinde (client-side / local-first) çalışır; bu sayede kullanıcılar hesap açmadan, beklemeden ve verilerini buluta yüklemeden sonuç alır. Sunucu gerektiren HaKING AI, Haking Chat ve UTRZONE projelerinde ise ön yüz ile API katmanı kesin biçimde ayrılır.</p>
        </div>
      </div>
    </section>
  `;

  return renderLayout({
    title: 'Açık Kaynak Projeler (15 Public Ürün) | HaKING — Halit Güneş',
    description:
      'Halit Güneş tarafından geliştirilen 15 public GitHub projesi: HaKING AI, SPREAD V11.1, COSMIC v12.0, CS2 Studio, Haking Chat, UTRZONE, CopyHex, QR Scanner, ÇevirmenX ve NotMatik.',
    canonicalPath: 'projects.html',
    activeNav: 'projects',
    breadcrumbs,
    bodyHtml,
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'HaKING Açık Kaynak Projeler Kataloğu',
        url: `${SITE.domain}/projects.html`,
        inLanguage: 'tr-TR',
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: PROJECTS.length,
          itemListElement: PROJECTS.map((p, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: p.name,
            url: `${SITE.domain}/${p.page}`,
          })),
        },
      },
    ],
  });
}

export function renderProjectDetail(project, allArticles) {
  const breadcrumbs = [
    { name: 'Ana Sayfa', href: 'index.html' },
    { name: 'Projeler', href: 'projects.html' },
    { name: project.name },
  ];

  const related = (project.relatedArticles || [])
    .map((f) => {
      if (f === 'haking-ai-prompt-modu.html') {
        return {
          file: 'haking-ai-prompt-modu.html',
          title: 'HaKING AI Prompt Modu (v1.19.2) — Kapsamlı Tanıtım ve Canlı Örnekler',
          shortDesc: 'Sohbetten yapılandırılmış görev kartı ve denetlenmiş AI agent promptu üretme rehberi.',
          kind: 'Özel Vitrin',
        };
      }
      return allArticles.find((a) => a.file === f);
    })
    .filter(Boolean);

  const tocItems = [
    { id: 'genel-bakis', label: 'Genel Bakış' },
    { id: 'ozellikler', label: 'Öne Çıkan Yetenekler' },
    { id: 'mimari', label: 'Mimari & Teknik Kararlar' },
    { id: 'sinirlar', label: 'Bilinen Sınırlar & Şeffaflık' },
    ...(project.faqs?.length ? [{ id: 'sss', label: 'Sıkça Sorulan Sorular' }] : []),
    ...(related.length ? [{ id: 'ilgili-yazilar', label: 'İlgili Teknik Yazılar' }] : []),
  ];

  const bodyHtml = `
    <header class="page-intro">
      <div class="wrap">
        ${renderBreadcrumbs(breadcrumbs)}
        <div class="eyebrow"><span class="tag tag-accent">${esc(project.category)}</span> <span class="tag tag-forest">${esc(project.version)}</span> <span>${esc(project.license)} LİSANSLI AÇIK KAYNAK</span></div>
        <h1>${esc(project.name)}</h1>
        <p class="lead">${esc(project.tagline)}</p>
        <div class="actions" style="margin-top:22px;">
          ${project.liveUrl ? `<a class="btn btn-accent" href="${esc(project.liveUrl)}" target="_blank" rel="noopener noreferrer">Canlı Siteyi Aç ↗</a>` : ''}
          ${project.secondaryLiveUrl ? `<a class="btn btn-forest" href="${esc(project.secondaryLiveUrl)}" target="_blank" rel="noopener noreferrer">${esc(project.secondaryLiveLabel)} ↗</a>` : ''}
          <a class="btn btn-secondary" href="${esc(project.repoUrl)}" target="_blank" rel="noopener noreferrer">GitHub Kaynak Kodu ↗</a>
          <button type="button" class="btn btn-secondary btn-sm" data-bookmark-toggle data-url="${project.page}" data-title="${esc(project.name)}" data-type="Proje">☆ Okuma listesine ekle</button>
        </div>
        <div class="article-meta-bar">
          <a class="author-inline" href="hakkimda.html"><img class="author-avatar-sm" src="assets/images/brand/logo-64.png" alt="" width="28" height="28">${esc(SITE.author.name)}</a>
          <span>Son güncelleme: <time datetime="${project.updated}">${esc(project.updated)}</time></span>
          <span>Dil: <strong>${esc(project.language)}</strong></span>
          <span>Depo: <code>HaKING06/${esc(project.repoName)}</code></span>
        </div>
      </div>
    </header>

    <div class="wrap article-shell">
      <aside class="article-aside">
        <nav class="toc-card" aria-label="Sayfa içi gezinti">
          <div class="toc-title">Bu Proje Sayfasında</div>
          <ul class="toc-list">
            ${tocItems.map((t) => `<li><a href="#${t.id}">${esc(t.label)}</a></li>`).join('')}
          </ul>
        </nav>
        <div class="toc-card">
          <div class="toc-title">Teknoloji Yığını</div>
          <div class="chips">${project.stack.map((s) => `<span class="chip">${esc(s)}</span>`).join('')}</div>
        </div>
      </aside>

      <article class="prose prose-wide">
        <details class="mobile-toc">
          <summary>İçindekiler</summary>
          <ul class="toc-list">${tocItems.map((t) => `<li><a href="#${t.id}">${esc(t.label)}</a></li>`).join('')}</ul>
        </details>

        <figure style="margin:0 0 28px;">
          <img src="${project.image}" alt="${esc(project.imageAlt)}" width="1200" height="675" style="border-radius:var(--radius-md);border:1px solid var(--border);box-shadow:var(--shadow-sm);">
          <figcaption style="margin-top:8px;font-size:0.84rem;color:var(--ink-muted);">${esc(project.name)} (${esc(project.version)}) — resmi proje tanıtım görseli.</figcaption>
        </figure>

        <h2 id="genel-bakis">Genel Bakış</h2>
        <p>${esc(project.summary)}</p>
        ${
          project.slug === 'haking-ai'
            ? `<div class="callout callout-forest"><span class="callout-title">Yeni v1.19.2 Güncellemesi — Prompt Modu</span><p>HaKING AI artık kod, sunum, görsel, video ve araştırma işleri için sohbet içinde görev kartı çıkaran ve bağımsız denetimle agent promptu üreten <strong>Prompt Modu</strong> özelliğine sahip. <a class="text-link" href="haking-ai-prompt-modu.html">Prompt Modu özel tanıtım sayfasını incele →</a></p></div>`
            : ''
        }

        <h2 id="ozellikler">Öne Çıkan Yetenekler</h2>
        <ul>
          ${project.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}
        </ul>

        <h2 id="mimari">Mimari &amp; Teknik Kararlar</h2>
        ${project.architecture
          .map(
            (sec) => `<h3>${esc(sec.title)}</h3>
          <p>${esc(sec.body)}</p>`
          )
          .join('')}

        <div class="table-scroll">
          <table>
            <thead>
              <tr><th>Teknik Özellik</th><th>Değer</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Güncel Sürüm</strong></td><td class="mono">${esc(project.version)}</td></tr>
              <tr><td><strong>Birincil Teknoloji</strong></td><td>${esc(project.language)}</td></tr>
              <tr><td><strong>Kullanılan Bileşenler</strong></td><td>${esc(project.stack.join(' · '))}</td></tr>
              <tr><td><strong>Açık Kaynak Lisansı</strong></td><td>${esc(project.license)}</td></tr>
              <tr><td><strong>GitHub Deposu</strong></td><td><a href="${esc(project.repoUrl)}" target="_blank" rel="noopener noreferrer">${esc(project.repoUrl)}</a></td></tr>
              ${project.liveUrl ? `<tr><td><strong>Canlı Yayın Adresi</strong></td><td><a href="${esc(project.liveUrl)}" target="_blank" rel="noopener noreferrer">${esc(project.liveUrl)}</a></td></tr>` : ''}
            </tbody>
          </table>
        </div>

        <h2 id="sinirlar">Bilinen Sınırlar &amp; Şeffaflık Notu</h2>
        <div class="callout callout-ochre">
          <span class="callout-title">Kapsam ve Kullanım Sınırları</span>
          <p>${esc(project.limitations)}</p>
        </div>

        ${
          project.faqs?.length
            ? `<h2 id="sss">Sıkça Sorulan Sorular</h2>
          <div class="faq-list">
            ${project.faqs
              .map(
                (f) => `<details class="faq-item"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`
              )
              .join('')}
          </div>`
            : ''
        }

        ${
          related.length
            ? `<h2 id="ilgili-yazilar">İlgili Teknik Yazılar ve Rehberler</h2>
          <div class="grid-2">
            ${related
              .map(
                (r) => `<article class="article-card" style="padding:18px;">
                  <span class="tag">${esc(r.kind || 'Rehber')}</span>
                  <h3 style="font-size:1.05rem;"><a href="${r.file}">${esc(r.title)}</a></h3>
                  <p style="font-size:0.86rem;">${esc(r.shortDesc)}</p>
                  <a class="text-link" href="${r.file}">İncele →</a>
                </article>`
              )
              .join('')}
          </div>`
            : ''
        }

        ${renderAuthorBox()}
      </article>
    </div>
  `;

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: project.name,
      softwareVersion: project.version,
      applicationCategory: project.category,
      operatingSystem: project.liveUrl ? 'Web' : 'Windows, macOS, Linux',
      url: project.liveUrl || `${SITE.domain}/${project.page}`,
      codeRepository: project.repoUrl,
      image: `${SITE.domain}/${project.image}`,
      description: project.summary,
      author: { '@id': `${SITE.domain}/#person` },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
    },
  ];
  if (project.faqs?.length) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: project.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  return renderLayout({
    title: `${project.name} (${project.version}) — Teknik İnceleme & Canlı Erişim | HaKING`,
    description: `${project.name}: ${project.tagline} Mimari kararlar, teknoloji yığını, bilinen sınırlar ve GitHub kaynak bağlantısı.`,
    canonicalPath: project.page,
    activeNav: 'projects',
    ogImage: project.image,
    breadcrumbs,
    showReadingBar: true,
    bodyHtml,
    schemas,
  });
}
