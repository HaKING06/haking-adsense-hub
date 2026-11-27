import { SITE } from '../data/site.mjs';
import { PROJECTS } from '../data/projects.mjs';
import { renderLayout, renderBreadcrumbs, renderAuthorBox, renderReadingControls, esc } from './layout.mjs';

const ARTICLE_CATS = ['Tümü', 'Yapay Zekâ', 'CS2 Ekonomi & Oyun', 'Tasarım & Web', 'Tarayıcı Eklentileri', 'Eğitim & Topluluk'];

export function renderBlogArchive(allArticles) {
  const breadcrumbs = [
    { name: 'Ana Sayfa', href: 'index.html' },
    { name: 'Mühendislik Yazıları' },
  ];

  const bodyHtml = `
    <header class="page-intro">
      <div class="wrap">
        ${renderBreadcrumbs(breadcrumbs)}
        <div class="eyebrow">MÜHENDİSLİK YAYINI · ${allArticles.length + 1} ÖZGÜN İÇERİK</div>
        <h1>Mühendislik yazıları, vaka analizleri ve teknik rehberler.</h1>
        <p class="lead">Gerçek yazılım projelerini geliştirirken karşılaştığım mimari kararlar, performans ölçümleri, güvenlik sınırları ve uygulanabilir Türkçe teknik kılavuzlar. Konuya göre süzün veya arayın.</p>
      </div>
    </header>

    <section class="section wrap">
      <div class="filter-bar">
        <div class="filter-pills" role="group" aria-label="Yazı kategorisi">
          ${ARTICLE_CATS.map((c, i) => `<button type="button" class="filter-pill${i === 0 ? ' is-active' : ''}" data-reading-filter data-filter="${i === 0 ? 'all' : esc(c)}">${esc(c)}</button>`).join('')}
        </div>
        <div class="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <label for="reading-search" class="sr-only">Yazılarda ara</label>
          <input id="reading-search" type="search" placeholder="Konu veya kavram ara (ör. SSE, CVaR, OKLCH, QR)...">
        </div>
      </div>

      <p class="mono" id="reading-count" style="font-size:0.82rem;color:var(--ink-muted);margin-bottom:18px;">${allArticles.length + 1} yazı</p>

      <div class="article-grid">
        <article class="article-card article-card-featured" data-reading-card data-category="Yapay Zekâ">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
            <span class="tag tag-accent">ÖZEL DOSYA · YAPAY ZEKÂ</span>
            <span class="mono" style="font-size:0.75rem;color:var(--ink-muted);">11 dk okuma</span>
          </div>
          <h3><a href="haking-ai-prompt-modu.html">HaKING AI Prompt Modu (v1.19.2): Fikrinden Denetlenmiş AI Agent Promptuna</a></h3>
          <p>Görev kartı (prompt_state), ücretsiz keşif soruları, 7 farklı görev türüne özel teslimat ve canlı öncesi/sonrası prompt karşılaştırıcısı.</p>
          <div class="article-card-foot">
            <span>${esc(SITE.author.name)} · 27 Kasım 2026</span>
            <a class="text-link" href="haking-ai-prompt-modu.html">Özel dosyayı aç →</a>
          </div>
        </article>
        ${allArticles
          .map(
            (a) => `<article class="article-card" data-reading-card data-category="${esc(a.category)}">
              <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
                <span class="tag">${esc(a.category)} · ${esc(a.kind)}</span>
                <span class="mono" style="font-size:0.74rem;color:var(--ink-muted);">${esc(a.readTime)}</span>
              </div>
              <h3><a href="${a.file}">${esc(a.title)}</a></h3>
              <p>${esc(a.shortDesc)}</p>
              <div class="chips">${a.tags.slice(0, 3).map((t) => `<span class="chip">${esc(t)}</span>`).join('')}</div>
              <div class="article-card-foot">
                <span>${esc(a.dateDisplay)}</span>
                <a class="text-link" href="${a.file}">Oku →</a>
              </div>
            </article>`
          )
          .join('')}
      </div>
      <p id="reading-empty" hidden style="text-align:center;padding:36px;color:var(--ink-muted);">Aramanızla eşleşen yazı bulunamadı.</p>
    </section>

    <section class="section-tight wrap">
      <div class="panel">
        <h2>Editoryal Kalite ve Şeffaflık Yaklaşımımız</h2>
        <p>Bu arşivdeki tüm yazılar gerçek proje deneyimine dayanır. Ölçüm verisi olmayan konularda kesin performans rakamları uydurulmaz; sürümle değişebilen platform davranışları için resmî belgelere atıf yapılır. Yayın ve düzeltme süreçlerimizi <a href="yayin-ilkeleri.html">Yayın İlkeleri</a> sayfasında okuyabilirsiniz.</p>
      </div>
    </section>
  `;

  return renderLayout({
    title: 'Mühendislik Yazıları ve Teknik Rehberler | HaKING — Halit Güneş',
    description:
      'Yapay zekâ, FastAPI SSE akışı, SPREAD Monte Carlo CVaR, Three.js 3D WebGL, Manifest V3 eklentiler, OKLCH tasarım sistemleri ve eğitim araçları üzerine 32+ özgün Türkçe mühendislik yazısı.',
    canonicalPath: 'blog.html',
    activeNav: 'blog',
    breadcrumbs,
    bodyHtml,
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'HaKING Mühendislik Yazıları',
        url: `${SITE.domain}/blog.html`,
        inLanguage: 'tr-TR',
        author: { '@id': `${SITE.domain}/#person` },
      },
    ],
  });
}

export function renderNewsHub(allArticles, newsArticles) {
  const breadcrumbs = [
    { name: 'Ana Sayfa', href: 'index.html' },
    { name: 'Teknoloji Haberleri & Sürümler' },
  ];

  const releases = [
    { date: '27 Kasım 2026', product: 'HaKING AI v1.19.2', note: 'Prompt Modu karar belleği, 7 görev türü uyarlaması ve tek sohbet vaka değerlendirmesi yayımlandı.', href: 'haking-ai-prompt-modu.html' },
    { date: '26 Kasım 2026', product: 'SPREAD V11.1', note: 'Gerçek Steam 7g/30g satış geçmişi, 354+ Doppler fazı ve SPREAD Agent V11 Meta-Hakem eklendi.', href: 'proje-spread.html' },
    { date: '24 Kasım 2026', product: 'Haking Chat v2.0.2', note: 'Sesli oda desteği, 101 Okey 3D ve sunucu doğrulamalı turnuva/blöf modları güncellendi.', href: 'proje-haking-chat.html' },
    { date: '22 Kasım 2026', product: 'NotMatik v3.0', note: 'Çevrimdışı PWA kurulumu, Hedef Defterim ve tam sayı katkısı kırılımı yenilendi.', href: 'proje-notmatik.html' },
    { date: '20 Kasım 2026', product: 'UTRZONE v0.11.5', note: 'React/Vite ön yüz ve Express/Neon backend üzerinde kurumsal e-posta ve topluluk akışı iyileştirildi.', href: 'proje-utrzone.html' },
    { date: '15 Kasım 2026', product: 'HaKING 3D Vault v2.5.3', note: '20 dilli 3D Steam Müzesi ve etkileşimli HP Victus 16 sahnesi için WebP afiş otomasyonu eklendi.', href: 'proje-haking-vault.html' },
    { date: '14 Kasım 2026', product: 'COSMIC v12.0 & CS2 Studio v0.1.0', note: '60 uzay oyunu portalı v12.0 ve 670+ pro crosshair destekli CS2 Studio beta yayımlandı.', href: 'proje-cosmic.html' },
    { date: '11 Kasım 2026', product: 'QR Scanner v1.1.4 & ÇevirmenX v1.4.0', note: 'Chrome/Edge/Firefox uzantı mağaza paketleri ve kişisel sözlük iyileştirmeleri tamamlandı.', href: 'proje-qr-scanner.html' },
  ];

  const bodyHtml = `
    <header class="page-intro">
      <div class="wrap">
        ${renderBreadcrumbs(breadcrumbs)}
        <div class="eyebrow">TEKNOLOJİ HABERLERİ, ANALİZLER &amp; SÜRÜM GÜNLÜĞÜ</div>
        <h1>Teknoloji gündemi, derin analizler ve ürün güncellemeleri.</h1>
        <p class="lead">Yapay zekâ agentları, web performansı, bulut/kenar dağıtımı, CS2 pazar ekonomisi ve HaKING ekosistemindeki tüm yeni sürümler üzerine özgün Türkçe teknoloji haberleri.</p>
      </div>
    </header>

    <section class="section wrap">
      <div class="filter-bar">
        <div class="filter-pills" role="group" aria-label="Haber kategorisi">
          ${ARTICLE_CATS.map((c, i) => `<button type="button" class="filter-pill${i === 0 ? ' is-active' : ''}" data-reading-filter data-filter="${i === 0 ? 'all' : esc(c)}">${esc(c)}</button>`).join('')}
        </div>
        <div class="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <label for="reading-search" class="sr-only">Haberlerde ara</label>
          <input id="reading-search" type="search" placeholder="Haber veya konu ara (ör. Prompt, Workers, CS2, Neon)...">
        </div>
      </div>

      <p class="mono" id="reading-count" style="font-size:0.82rem;color:var(--ink-muted);margin-bottom:18px;">${newsArticles.length + 1} haber</p>

      <div class="article-grid">
        <article class="article-card article-card-featured" data-reading-card data-category="Yapay Zekâ">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
            <span class="tag tag-accent">ÖNE ÇIKAN DOSYA · YENİ ÖZELLİK</span>
            <span class="mono" style="font-size:0.74rem;color:var(--ink-muted);">27 Kasım 2026 · 11 dk</span>
          </div>
          <h3><a href="haking-ai-prompt-modu.html">HaKING AI Prompt Modu (v1.19.2): Fikrinden Denetlenmiş AI Agent Promptuna</a></h3>
          <p>Kod, sunum, video, görsel ve araştırma işleri için görev kartlı Türkçe prompt atölyesi, bağımsız çelişki denetimi ve etkileşimli öncesi/sonrası karşılaştırıcı.</p>
          <div class="article-card-foot">
            <span>${esc(SITE.author.name)}</span>
            <a class="text-link" href="haking-ai-prompt-modu.html">Dosyayı incele →</a>
          </div>
        </article>

        ${newsArticles
          .map(
            (n) => `<article class="article-card" data-reading-card data-category="${esc(n.category)}">
              <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
                <span class="tag">${esc(n.category)} · ${esc(n.kind)}</span>
                <span class="mono" style="font-size:0.74rem;color:var(--ink-muted);">${esc(n.readTime)}</span>
              </div>
              <h3><a href="${n.file}">${esc(n.title)}</a></h3>
              <p>${esc(n.shortDesc)}</p>
              <div class="chips">${n.tags.slice(0, 3).map((t) => `<span class="chip">${esc(t)}</span>`).join('')}</div>
              <div class="article-card-foot">
                <span>${esc(n.dateDisplay)}</span>
                <a class="text-link" href="${n.file}">Oku →</a>
              </div>
            </article>`
          )
          .join('')}
      </div>
      <p id="reading-empty" hidden style="text-align:center;padding:36px;color:var(--ink-muted);">Aramanızla eşleşen haber bulunamadı.</p>
    </section>

    <section class="section section-band">
      <div class="wrap">
        <div class="section-head">
          <div class="section-head-copy">
            <div class="eyebrow">ÜRÜN SÜRÜM GÜNLÜĞÜ</div>
            <h2>Kasım 2026 canlı sürüm notları</h2>
          </div>
          <a class="btn btn-secondary btn-sm" href="blog.html">Tüm ${allArticles.length} Yazıya Geç →</a>
        </div>
        <div class="timeline">
          ${releases
            .map(
              (r) => `<div class="timeline-item">
                <div class="timeline-date">${esc(r.date)}</div>
                <h3 style="margin:4px 0 6px;"><a href="${r.href}" style="text-decoration:none;">${esc(r.product)}</a></h3>
                <p style="font-size:0.94rem;">${esc(r.note)} <a class="text-link" href="${r.href}">İncele →</a></p>
              </div>`
            )
            .join('')}
        </div>
      </div>
    </section>
  `;

  return renderLayout({
    title: 'Teknoloji Haberleri, Analizler ve Sürüm Günlüğü | HaKING',
    description: 'Yapay zekâ agentları, Cloudflare Workers, CS2 ekonomisi, Core Web Vitals, Neon PostgreSQL, Manifest V3 ve HaKING ekosistemindeki güncel sürüm haberleri.',
    canonicalPath: 'haberler.html',
    activeNav: 'news',
    breadcrumbs,
    bodyHtml,
  });
}

export function renderArticlePage(article, allArticles) {
  const project = PROJECTS.find((p) => p.slug === article.projectSlug);
  const isNews = article.file.startsWith('haber-');
  const breadcrumbs = [
    { name: 'Ana Sayfa', href: 'index.html' },
    { name: isNews ? 'Teknoloji Haberleri' : 'Mühendislik Yazıları', href: isNews ? 'haberler.html' : 'blog.html' },
    { name: article.title },
  ];

  const toc = [
    ...article.sections.map((s) => ({ id: s.id, label: s.heading })),
    ...(article.faqs?.length ? [{ id: 'sss', label: 'Sıkça Sorulan Sorular' }] : []),
  ];

  const related = allArticles
    .filter((a) => a.slug !== article.slug && (a.category === article.category || a.projectSlug === article.projectSlug))
    .slice(0, 3);

  const mobileStickyBar = project?.liveUrl
    ? `<div class="mobile-sticky-bar" id="mobile-sticky-bar" aria-label="İlgili canlı proje" hidden>
        <div class="mobile-sticky-info">
          <strong>${esc(project.name)}</strong>
          <span class="mono">${esc(project.version)} · Canlı Servis</span>
        </div>
        <div class="mobile-sticky-actions">
          <a class="btn btn-accent btn-sm" href="${esc(project.liveUrl)}" target="_blank" rel="noopener noreferrer">Canlı Siteye Git ↗</a>
          <a class="btn btn-secondary btn-sm" href="#icerik" aria-label="Yukarı çık">↑</a>
        </div>
      </div>`
    : '';

  const bodyHtml = `
    <header class="page-intro">
      <div class="wrap">
        ${renderBreadcrumbs(breadcrumbs)}
        <div class="eyebrow"><span class="tag tag-accent">${esc(article.category)}</span> <span class="tag">${esc(article.kind)}</span></div>
        <h1>${esc(article.title)}</h1>
        <p class="lead">${esc(article.shortDesc)}</p>
        <div class="article-meta-bar">
          <a class="author-inline" href="hakkimda.html"><img class="author-avatar-sm" src="assets/images/brand/logo-64.png" alt="" width="28" height="28">${esc(SITE.author.name)}</a>
          <span>Yayın / Güncelleme: <time datetime="${article.date}">${esc(article.dateDisplay)}</time></span>
          <span>${esc(article.readTime)}</span>
          <button type="button" class="btn btn-secondary btn-sm" style="margin-left:auto;" data-bookmark-toggle data-url="${article.file}" data-title="${esc(article.title)}" data-type="${esc(article.kind)}">☆ Okuma listesine ekle</button>
        </div>
      </div>
    </header>

    <div class="wrap article-shell">
      <aside class="article-aside">
        ${
          project
            ? `<div class="toc-card sticky-launch-card">
                <div class="sticky-launch-head">
                  <div>
                    <span class="live-pill" style="font-size:0.7rem;">İlgili Açık Kaynak Ürün</span>
                    <strong class="sticky-launch-title">${esc(project.name)} <span class="mono" style="font-size:0.74rem;color:var(--ink-muted);">${esc(project.version)}</span></strong>
                  </div>
                </div>
                <div class="sticky-launch-btns">
                  ${project.liveUrl ? `<a class="btn btn-accent btn-sm" style="width:100%;" href="${esc(project.liveUrl)}" target="_blank" rel="noopener noreferrer">Canlı Siteye Git ↗</a>` : ''}
                  <a class="btn btn-secondary btn-sm" style="width:100%;" href="${project.page}">Proje Sayfası →</a>
                </div>
                <div class="sticky-launch-mini">
                  <button type="button" class="mini-util-btn" data-bookmark-toggle data-url="${article.file}" data-title="${esc(article.title)}" data-type="${esc(article.kind)}">☆ Kaydet</button>
                  <button type="button" class="mini-util-btn" data-copy-text="${SITE.domain}/${article.file}">Linki Kopyala</button>
                </div>
              </div>`
            : ''
        }

        <nav class="toc-card" aria-label="Makale içindekiler">
          <div class="toc-title">Bu Yazıda</div>
          <ul class="toc-list">
            ${toc.map((t) => `<li><a href="#${t.id}">${esc(t.label)}</a></li>`).join('')}
          </ul>
        </nav>

        ${renderReadingControls()}
      </aside>

      <article class="prose">
        <details class="mobile-toc">
          <summary>İçindekiler</summary>
          <ul class="toc-list">${toc.map((t) => `<li><a href="#${t.id}">${esc(t.label)}</a></li>`).join('')}</ul>
        </details>

        ${article.sections
          .map(
            (s) => `<section aria-labelledby="${s.id}">
              <h2 id="${s.id}">${esc(s.heading)}</h2>
              ${s.html}
            </section>`
          )
          .join('')}

        ${
          article.faqs?.length
            ? `<section aria-labelledby="sss">
                <h2 id="sss">Sıkça Sorulan Sorular</h2>
                <div class="faq-list">
                  ${article.faqs.map((f) => `<details class="faq-item"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}
                </div>
              </section>`
            : ''
        }

        <div class="chips" style="margin-top:26px;">
          ${article.tags.map((t) => `<span class="chip">#${esc(t)}</span>`).join('')}
        </div>

        ${
          project
            ? `<div class="panel" style="margin-top:28px;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px;">
                <div>
                  <div class="eyebrow" style="margin-bottom:4px;">UYGULAMALI PROJE BAĞLAMI</div>
                  <h3 style="margin-bottom:4px;">${esc(project.name)} (${esc(project.version)})</h3>
                  <p style="font-size:0.9rem;margin:0;max-width:48ch;">Bu yazıdaki mühendislik yaklaşımını çalışan üründe ve açık kaynak kodunda inceleyin.</p>
                </div>
                <div class="actions">
                  ${project.liveUrl ? `<a class="btn btn-accent btn-sm" href="${esc(project.liveUrl)}" target="_blank" rel="noopener noreferrer">Canlı Siteye Git ↗</a>` : ''}
                  <a class="btn btn-secondary btn-sm" href="${project.page}">Proje İncelemesi →</a>
                </div>
              </div>`
            : ''
        }

        ${renderAuthorBox()}

        ${
          related.length
            ? `<section style="margin-top:38px;">
                <h2 style="margin-top:0;">Okumaya Devam Et</h2>
                <div class="grid-3" style="margin-top:16px;">
                  ${related
                    .map(
                      (r) => `<article class="article-card" style="padding:18px;">
                        <span class="tag">${esc(r.kind)}</span>
                        <h3 style="font-size:1.02rem;"><a href="${r.file}">${esc(r.title)}</a></h3>
                        <a class="text-link" href="${r.file}" style="margin-top:auto;">Yazıyı oku →</a>
                      </article>`
                    )
                    .join('')}
                </div>
              </section>`
            : ''
        }
      </article>
    </div>
  `;

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: article.title,
      description: article.shortDesc,
      image: `${SITE.domain}/${article.image}`,
      datePublished: article.date,
      dateModified: article.date,
      inLanguage: 'tr-TR',
      keywords: article.tags.join(', '),
      author: { '@id': `${SITE.domain}/#person` },
      publisher: { '@id': `${SITE.domain}/#person` },
      mainEntityOfPage: `${SITE.domain}/${article.file}`,
    },
  ];
  if (article.faqs?.length) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: article.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  return renderLayout({
    title: `${article.title} | HaKING`,
    description: article.shortDesc,
    canonicalPath: article.file,
    activeNav: isNews ? 'news' : 'blog',
    ogImage: article.image,
    ogType: 'article',
    breadcrumbs,
    showReadingBar: true,
    mobileStickyBar,
    bodyHtml,
    schemas,
  });
}
