import { SITE } from '../data/site.mjs';
import { PROJECTS, PROJECT_CATEGORIES } from '../data/projects.mjs';
import { renderLayout, esc } from './layout.mjs';

export function renderProjectCard(p) {
  const liveBtn = p.liveUrl
    ? `<a class="btn btn-sm" href="${esc(p.liveUrl)}" target="_blank" rel="noopener noreferrer">Canlı Siteye Git ↗</a>`
    : `<a class="btn btn-sm" href="${esc(p.repoUrl)}" target="_blank" rel="noopener noreferrer">${esc(p.downloadLabel || "GitHub'da İncele")} ↗</a>`;

  return `<article class="project-card" data-project-card data-category="${esc(p.category)}" data-reveal>
    <a class="project-thumb" href="${p.page}" aria-label="${esc(p.name)} detaylı inceleme">
      <img src="${p.image}" alt="${esc(p.imageAlt)}" width="1200" height="675" loading="lazy">
      <span class="project-version">${esc(p.version)}</span>
    </a>
    <div class="project-body">
      <div class="project-top-meta">
        <span class="tag">${esc(p.category)}</span>
        <span class="mono" style="font-size:0.74rem;color:var(--ink-muted);">${esc(p.language)}</span>
      </div>
      <h3><a href="${p.page}">${esc(p.name)}</a></h3>
      <p>${esc(p.tagline)}</p>
      <div class="chips">${p.stack.slice(0, 3).map((s) => `<span class="chip">${esc(s)}</span>`).join('')}</div>
      <div class="project-card-actions">
        ${liveBtn}
        <a class="btn btn-secondary btn-sm" href="${p.page}">İncele</a>
        <a class="text-link" href="${esc(p.repoUrl)}" target="_blank" rel="noopener noreferrer" style="margin-left:auto;font-size:0.83rem;">GitHub</a>
      </div>
    </div>
  </article>`;
}

export function renderHomePage(allArticles, newsArticles) {
  const showcaseProjects = ['haking-ai', 'spread', 'cosmic', 'cs2studio', 'haking-chat', 'copyhex']
    .map((slug) => PROJECTS.find((p) => p.slug === slug))
    .filter(Boolean);

  const bentoTop = PROJECTS.slice(0, 2); // HaKING AI + SPREAD as large flagship Bento cards
  const gridProjects = PROJECTS.slice(2, 11); // Next 9 projects in clean 3x3 grid
  const leadNews = newsArticles[0];
  const sideNews = newsArticles.slice(1, 5);
  const moreArticles = allArticles.filter((a) => !newsArticles.slice(0, 5).some((n) => n.slug === a.slug)).slice(0, 6);

  const bodyHtml = `
    <!-- Architectural Editorial Hero with Interactive Live Product Showcase -->
    <section class="hero hero-arch">
      <div class="wrap hero-grid">
        <div class="hero-copy">
          <div class="eyebrow"><span class="eyebrow-dot"></span> ${esc(SITE.author.name)} · BAĞIMSIZ YAZILIM STÜDYOSU</div>
          <h1>Gerçek problemler için<br><span class="hero-title-accent">ölçülebilir</span> web ürünleri<br>ve teknik yayın.</h1>
          <p class="lead">Yapay zekâ asistanları, CS2 nicel arbitraj terminalleri, 3D WebGL deneyimleri ve çoklu tarayıcı eklentileri. <strong>15 açık kaynak GitHub projesini</strong>, aktif <code>*.haking.tr</code> servislerini ve derin mühendislik haberlerini tek çatı altında keşfedin.</p>
          <div class="actions">
            <a class="btn btn-accent" href="projects.html">15 Açık Kaynak Projeyi Keşfet →</a>
            <a class="btn btn-secondary" href="araclar.html">5 Ücretsiz Online Araç</a>
            <a class="text-link" href="durum.html" style="padding-left:6px;">Canlı Durum ↗</a>
          </div>
          <div class="hero-meta-strip" aria-label="Stüdyo özeti">
            <div class="metric-box"><span class="metric-val">15</span><span class="metric-lbl">Public GitHub ürünü</span></div>
            <div class="metric-box"><span class="metric-val">14</span><span class="metric-lbl">Canlı *.haking.tr servisi</span></div>
            <div class="metric-box"><span class="metric-val">${allArticles.length + 1}</span><span class="metric-lbl">Özgün haber &amp; rehber</span></div>
            <div class="metric-box"><span class="metric-val">5</span><span class="metric-lbl">Ücretsiz online araç</span></div>
          </div>
        </div>

        <!-- Interactive Live Ecosystem Showcase Stage -->
        <div class="hero-stage" data-hero-stage>
          <div class="stage-chrome">
            <div class="stage-dots" aria-hidden="true"><i></i><i></i><i></i></div>
            <span class="stage-url mono" data-stage-url>haking.tr · HP Victus 16 stüdyo masası</span>
            <a class="live-pill" href="durum.html" style="font-size:0.72rem;text-decoration:none;" data-stage-status>14 Servis Aktif</a>
          </div>
          <div class="stage-viewport">
            <img src="assets/images/brand/hero-studio.webp?v=${SITE.assetVersion}" alt="Halit Güneş'in HP Victus 16 dizüstü bilgisayarı ekranında açık olan haking.tr yazılım stüdyosu ve canlı projeleri" width="1280" height="720" fetchpriority="high" data-stage-img>
            <div class="stage-overlay-card">
              <div>
                <div class="stage-badge-row">
                  <span class="tag tag-accent" data-stage-cat>HP VICTUS 16 · STÜDYO</span>
                  <span class="mono" style="font-size:0.74rem;color:var(--ink-muted);" data-stage-ver>v4.0</span>
                </div>
                <strong class="stage-title" data-stage-title>HaKING Açık Kaynak Ekosistemi</strong>
                <p class="stage-desc" data-stage-desc>Sekmelerden bir ürün seçerek canlı servisi önizleyin veya tek tıkla yeni sekmede açın.</p>
              </div>
              <div class="stage-actions">
                <a class="btn btn-accent btn-sm" href="projects.html" data-stage-live>Tüm Ürünler →</a>
                <a class="btn btn-secondary btn-sm" href="durum.html" data-stage-detail>Canlı Durum</a>
              </div>
            </div>
          </div>
          <div class="stage-switcher" role="tablist" aria-label="Canlı proje önizleme sekmeleri">
            <button type="button" class="stage-tab is-active" data-stage-tab="studio"
              data-img="assets/images/brand/hero-studio.webp?v=${SITE.assetVersion}"
              data-url="haking.tr · HP Victus 16 stüdyo masası"
              data-status="14 Servis Aktif"
              data-cat="HP VICTUS 16 · STÜDYO"
              data-ver="v4.0"
              data-title="HaKING Açık Kaynak Ekosistemi"
              data-desc="Sekmelerden bir ürün seçerek canlı servisi önizleyin veya tek tıkla yeni sekmede açın."
              data-live="projects.html"
              data-live-label="Tüm Ürünler →"
              data-detail="durum.html"
              data-detail-label="Canlı Durum"
              data-ext="false">Stüdyo</button>
            ${showcaseProjects
              .map(
                (p) => `<button type="button" class="stage-tab" data-stage-tab="${p.slug}"
                  data-img="${p.image}"
                  data-url="${esc(p.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, ''))}"
                  data-status="Canlı · 200 OK"
                  data-cat="${esc(p.category)}"
                  data-ver="${esc(p.version)}"
                  data-title="${esc(p.name)}"
                  data-desc="${esc(p.tagline)}"
                  data-live="${esc(p.liveUrl)}"
                  data-live-label="Canlı Siteye Git ↗"
                  data-detail="${p.page}"
                  data-detail-label="İncele →"
                  data-ext="true">${esc(p.name.replace(' Universe', ''))}</button>`
              )
              .join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- Flagship Bento Showcase (Top 2 Signature Products) -->
    <section class="section-tight wrap" aria-label="Öne çıkan amiral gemisi ürünler">
      <div class="bento-flagship-grid">
        ${bentoTop
          .map(
            (p, idx) => `<article class="bento-card${idx === 0 ? ' bento-accent' : ' bento-forest'}" data-reveal>
              <a class="bento-media" href="${p.page}" aria-label="${esc(p.name)} inceleme">
                <img src="${p.image}" alt="${esc(p.imageAlt)}" width="1200" height="675" loading="lazy">
                <span class="project-version">${esc(p.version)}</span>
              </a>
              <div class="bento-body">
                <div class="project-top-meta">
                  <span class="tag ${idx === 0 ? 'tag-accent' : 'tag-forest'}">${idx === 0 ? 'AMİRAL GEMİSİ · YAPAY ZEKÂ' : 'AMİRAL GEMİSİ · CS2 QUANT'}</span>
                  <span class="live-pill" style="font-size:0.74rem;">Yayında</span>
                </div>
                <h2><a href="${p.page}" style="text-decoration:none;">${esc(p.name)}</a></h2>
                <p>${esc(p.tagline)}</p>
                <div class="chips">${p.stack.slice(0, 4).map((s) => `<span class="chip">${esc(s)}</span>`).join('')}</div>
                <div class="actions" style="margin-top:auto;padding-top:10px;">
                  <a class="btn btn-accent btn-sm" href="${esc(p.liveUrl)}" target="_blank" rel="noopener noreferrer">Canlı Siteye Git ↗</a>
                  <a class="btn btn-secondary btn-sm" href="${p.page}">Teknik İnceleme</a>
                  ${idx === 0 ? '<a class="text-link" href="haking-ai-prompt-modu.html" style="font-size:0.84rem;">Prompt Modu →</a>' : ''}
                </div>
              </div>
            </article>`
          )
          .join('')}
      </div>
    </section>

    <!-- Built-In Interactive Engineering Tools Strip -->
    <section class="section-tight wrap" aria-label="Yerleşik etkileşimli araçlar">
      <div class="tools-strip">
        <div class="tools-strip-head">
          <div>
            <div class="eyebrow" style="margin-bottom:4px;">TARAYICI İÇİ 5 ÜCRETSİZ ARAÇ STÜDYOSU</div>
            <h2 style="font-size:1.45rem;">Sadece okumayın — doğrudan tarayıcıda hesaplayın ve test edin.</h2>
          </div>
          <div class="actions">
            <a class="btn btn-accent btn-sm" href="araclar.html">Tüm 5 Aracı Aç →</a>
            <a class="btn btn-secondary btn-sm" href="durum.html">Canlı Servis Durumu</a>
          </div>
        </div>
        <div class="grid-5-tools" style="margin-top:18px;">
          <a class="mini-tool-card" href="araclar.html#arac-prompt">
            <span class="tag tag-accent">AI · PROMPT</span>
            <strong>Prompt Kurucu</strong>
            <small>Codex ve AI agentları için denetlenmiş Türkçe görev promptu oluştur</small>
          </a>
          <a class="mini-tool-card" href="araclar.html#arac-valve">
            <span class="tag tag-forest">CS2 · QUANT</span>
            <strong>Valve Cent &amp; Başa Baş</strong>
            <small>Kuruş hassasiyetli Steam kesintisi, net kâr ve başa baş satış fiyatı</small>
          </a>
          <a class="mini-tool-card" href="araclar.html#arac-renk">
            <span class="tag tag-ochre">UI · WCAG</span>
            <strong>OKLCH &amp; Kontrast</strong>
            <small>HEX/RGB/HSL/OKLCH dönüşümü ve anlık WCAG 2.1 AA/AAA testi</small>
          </a>
          <a class="mini-tool-card" href="araclar.html#arac-not">
            <span class="tag">EĞİTİM</span>
            <strong>Hedef Final Aracı</strong>
            <small>Vize ve ödev ağırlıklarıyla gereken minimum final notunu hesapla</small>
          </a>
          <a class="mini-tool-card" href="araclar.html#arac-serp">
            <span class="tag tag-forest">SEO · SERP</span>
            <strong>Google SERP Testi</strong>
            <small>Başlık/meta uzunluk sayacı, arama sonucu önizleme ve okuma süresi</small>
          </a>
        </div>
      </div>
    </section>

    <!-- Magazine-Style Technology News & Deep Analyses -->
    <section class="section section-band" id="haberler">
      <div class="wrap">
        <div class="section-head">
          <div class="section-head-copy">
            <div class="eyebrow">01 / TEKNOLOJİ HABERLERİ &amp; DERİN ANALİZLER</div>
            <h2>Güncel yazılım mimarisi, yapay zekâ ve ekosistem dosyaları.</h2>
            <p>AI kodlama agentları, Cloudflare Edge dağıtımı, CS2 pazar likiditesi, Core Web Vitals, Neon PostgreSQL ve Prompt Modu üzerine özgün dosya haberler.</p>
          </div>
          <a class="btn btn-secondary" href="haberler.html">Tüm Haberler &amp; Sürümler →</a>
        </div>

        <div class="news-magazine-grid">
          <article class="news-lead-card" data-reveal>
            <a class="news-lead-media" href="${leadNews.file}">
              <img src="${leadNews.image}" alt="${esc(leadNews.title)}" width="1200" height="675" loading="lazy">
            </a>
            <div class="news-lead-body">
              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                <span class="tag tag-accent">${esc(leadNews.category)} · ${esc(leadNews.kind)}</span>
                <span class="mono" style="font-size:0.75rem;color:var(--ink-muted);">${esc(leadNews.dateDisplay)} · ${esc(leadNews.readTime)}</span>
              </div>
              <h3><a href="${leadNews.file}">${esc(leadNews.title)}</a></h3>
              <p>${esc(leadNews.shortDesc)}</p>
              <div class="actions" style="margin-top:auto;">
                <a class="btn btn-sm" href="${leadNews.file}">Dosyayı Oku →</a>
                <a class="text-link" href="haking-ai-prompt-modu.html">Prompt Modu Özel Dosyası ↗</a>
              </div>
            </div>
          </article>

          <div class="news-stack">
            <article class="news-row-card news-row-highlight" data-reveal>
              <div class="news-row-meta"><span class="tag tag-accent">YENİ SÜRÜM · v1.19.2</span><span class="mono">27 Kasım 2026</span></div>
              <h3><a href="haking-ai-prompt-modu.html">HaKING AI Prompt Modu Yayında: 7 Görev Türü, Görev Kartı Belleği ve Bağımsız Denetim</a></h3>
              <p>Codex ve AI agentları için ücretsiz keşif soruları ve 5 kredilik denetlenmiş prompt üretimi.</p>
            </article>
            ${sideNews
              .map(
                (n) => `<article class="news-row-card" data-reveal>
                  <div class="news-row-meta"><span class="tag">${esc(n.category)}</span><span class="mono">${esc(n.dateDisplay)} · ${esc(n.readTime)}</span></div>
                  <h3><a href="${n.file}">${esc(n.title)}</a></h3>
                  <p>${esc(n.shortDesc)}</p>
                </article>`
              )
              .join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- Public GitHub Projects Ecosystem -->
    <section class="section wrap" id="projeler">
      <div class="section-head">
        <div class="section-head-copy">
          <div class="eyebrow">02 / PUBLIC GITHUB EKOSİSTEMİ</div>
          <h2>Çalışan, açık kaynak ve canlı web ürünleri.</h2>
          <p>Küçük denemeler değil; canlı alt alan adlarıyla yayında olan, belgelenmiş ve aktif geliştirilen büyük public GitHub projelerim.</p>
        </div>
        <a class="btn btn-secondary" href="projects.html">Tüm 15 Projeyi Gör →</a>
      </div>

      <!-- Interactive 1-Click Project Finder -->
      <div class="finder-strip" data-project-finder>
        <div class="finder-head">
          <span class="eyebrow" style="margin:0;">HIZLI ÖNERİCİ · İHTİYACINA GÖRE BUL</span>
          <div class="finder-pills" role="group" aria-label="Kullanım amacına göre proje önerisi">
            <button type="button" class="finder-pill is-active" data-finder="ai">Yapay Zekâ &amp; Prompt</button>
            <button type="button" class="finder-pill" data-finder="cs2">CS2 Skin &amp; Ekonomi</button>
            <button type="button" class="finder-pill" data-finder="oyun">3D Oyun &amp; Topluluk</button>
            <button type="button" class="finder-pill" data-finder="arac">Tasarım, Ders &amp; Eklenti</button>
          </div>
        </div>
        <div class="finder-results" data-finder-out></div>
      </div>

      <div class="filter-bar">
        <div class="filter-pills" role="group" aria-label="Proje kategorisi">
          ${PROJECT_CATEGORIES.map((c, i) => `<button type="button" class="filter-pill${i === 0 ? ' is-active' : ''}" data-project-filter data-filter="${esc(c.id)}">${esc(c.label.replace(' (15)', ''))}</button>`).join('')}
        </div>
        <span class="mono" id="project-count" style="font-size:0.82rem;color:var(--ink-muted);">${gridProjects.length} proje</span>
      </div>

      <div class="project-grid">
        ${gridProjects.map(renderProjectCard).join('')}
      </div>
      <p id="project-empty" hidden style="text-align:center;padding:28px;color:var(--ink-muted);">Bu kategorideki tüm ürünler için <a href="projects.html">15 Projelik Tam Katalog</a> sayfasını inceleyebilirsiniz.</p>
    </section>

    <!-- Engineering Case Studies & Practical Guides -->
    <section class="section section-band-stone" id="makaleler">
      <div class="wrap">
        <div class="section-head">
          <div class="section-head-copy">
            <div class="eyebrow">03 / MÜHENDİSLİK VAKA ANALİZLERİ &amp; REHBERLER</div>
            <h2>Kod sınırları, mimari kararlar ve uygulamalı kılavuzlar.</h2>
            <p>SSE akış gecikmesi, Three.js WebGL performansı, Manifest V3 güvenliği, OKLCH tasarım tokenları ve hibrit arama algoritmaları üzerine derin yazılar.</p>
          </div>
          <a class="btn btn-secondary" href="blog.html">Tüm Yazılar (${allArticles.length}) →</a>
        </div>
        <div class="article-grid">
          ${moreArticles
            .map(
              (a) => `<article class="article-card" data-reveal>
                <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
                  <span class="tag">${esc(a.category)} · ${esc(a.kind)}</span>
                  <span class="mono" style="font-size:0.74rem;color:var(--ink-muted);">${esc(a.readTime)}</span>
                </div>
                <h3><a href="${a.file}">${esc(a.title)}</a></h3>
                <p>${esc(a.shortDesc)}</p>
                <div class="article-card-foot">
                  <span>${esc(a.dateDisplay)}</span>
                  <a class="text-link" href="${a.file}">Oku →</a>
                </div>
              </article>`
            )
            .join('')}
        </div>
      </div>
    </section>

    <!-- About / Ben Kimim Preview -->
    <section class="section wrap">
      <div class="grid-2" style="align-items:start;">
        <div>
          <div class="eyebrow">04 / BEN KİMİM?</div>
          <h2>Merhaba, ben Halit Güneş.<br>Merakla tasarlar, ölçerek yazarım.</h2>
          <p style="margin-top:16px;">İstanbul Kültür Üniversitesi Bilgisayar Programcılığı öğrencisi ve bağımsız yazılım geliştiriciyim. <strong>HaKING</strong> çatısı altında günlük problemleri çözen, hızlı açılan, veri gizliliğine saygılı ve açık kaynaklı web ürünleri geliştiriyorum.</p>
          <p>Bir projeyi yayına almak benim için işin yalnızca yarısı: o ürünü kurarken hangi mimari takası yaptığımı, hangi performans sınırına çarptığımı ve kullanıcıların aynı problemleri nasıl çözebileceğini <strong>haking.tr</strong> üzerinde şeffaf teknik yazılarla paylaşıyorum.</p>
          <div class="actions" style="margin-top:22px;">
            <a class="btn" href="hakkimda.html">Hakkımda &amp; Hikâyem →</a>
            <a class="btn btn-secondary" href="github.html">GitHub Profil Sayfam →</a>
          </div>
        </div>
        <div class="grid-2">
          <div class="panel">
            <span class="tag tag-accent">01 · ARAYÜZ</span>
            <h3 style="margin:10px 0 6px;">Web &amp; Tasarım Sistemleri</h3>
            <p style="font-size:0.9rem;">Semantik HTML5, OKLCH renk tokenları, sıfır bağımlılıklı JavaScript, Astro, React/Vite ve çevrimdışı PWA.</p>
          </div>
          <div class="panel">
            <span class="tag tag-forest">02 · SERVİS</span>
            <h3 style="margin:10px 0 6px;">API, AI &amp; Gerçek Zamanlı</h3>
            <p style="font-size:0.9rem;">Python/FastAPI, SSE akışı, Node.js + Socket.IO, Cloudflare Workers, Neon PostgreSQL ve LLM yönlendirme.</p>
          </div>
          <div class="panel">
            <span class="tag tag-ochre">03 · GRAFİK</span>
            <h3 style="margin:10px 0 6px;">3D WebGL &amp; Etkileşim</h3>
            <p style="font-size:0.9rem;">Three.js donanım ve müze sahneleri, HTML5 Canvas oyun motorları ve akıcı etkileşim katmanları.</p>
          </div>
          <div class="panel">
            <span class="tag">04 · EKLENTİ</span>
            <h3 style="margin:10px 0 6px;">Tarayıcı Uzantıları</h3>
            <p style="font-size:0.9rem;">Chrome, Edge ve Firefox için minimum izinli, cihaz içi çalışan Manifest V3 eklentileri.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Commission / Hire CTA Band -->
    <section class="section-tight wrap">
      <div class="cta-band">
        <div>
          <div class="eyebrow">05 / PROJE YAPTIR &amp; İŞ BİRLİĞİ</div>
          <h2>Aklında bir web ürünü, AI aracı veya tarayıcı eklentisi mi var?</h2>
          <p>İnteraktif proje kapsam oluşturucuyla ihtiyacını 2 dakikada netleştir; teknik mimari, zaman planı ve teslimat adımlarını birlikte değerlendirelim.</p>
        </div>
        <div class="actions">
          <a class="btn" href="proje-yaptir.html">Proje Brief'i Oluştur →</a>
          <a class="btn btn-secondary" href="iletisim.html">Doğrudan İletişime Geç</a>
        </div>
      </div>
    </section>
  `;

  return renderLayout({
    title: SITE.fullTitle,
    description:
      "Halit Güneş'in bağımsız yazılım stüdyosu ve teknoloji yayını: 15 açık kaynak GitHub projesi, HaKING AI, SPREAD V11.1, COSMIC v12.0, CS2 Studio, Haking Chat, UTRZONE ve 32+ derin teknoloji haberi & rehberi.",
    canonicalPath: '',
    activeNav: 'home',
    bodyHtml,
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: SITE.fullTitle,
        url: `${SITE.domain}/`,
        inLanguage: 'tr-TR',
        description: SITE.tagline,
      },
    ],
  });
}
