import { SITE } from '../data/site.mjs';
import { PROJECTS, PROJECT_CATEGORIES } from '../data/projects.mjs';
import { renderLayout, esc } from './layout.mjs';

export function renderProjectCard(p) {
  const liveBtn = p.liveUrl
    ? `<a class="btn btn-sm" href="${esc(p.liveUrl)}" target="_blank" rel="noopener noreferrer">Canlı Siteye Git ↗</a>`
    : `<a class="btn btn-sm" href="${esc(p.repoUrl)}" target="_blank" rel="noopener noreferrer">${esc(p.downloadLabel || "GitHub'da İncele")} ↗</a>`;

  return `<article class="project-card" data-project-card data-category="${esc(p.category)}">
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

export function renderHomePage(allArticles) {
  const featuredProjects = PROJECTS.slice(0, 9);
  const featuredArticles = allArticles.slice(0, 5);
  const recentGuides = allArticles.slice(5, 11);

  const bodyHtml = `
    <!-- Editorial Hero -->
    <section class="hero wrap">
      <div class="hero-grid">
        <div class="hero-copy">
          <div class="eyebrow"><span class="eyebrow-dot"></span> ${esc(SITE.author.name)} · BAĞIMSIZ YAZILIM STÜDYOSU</div>
          <h1>Gerçek problemler için<br><span class="hero-title-accent">ölçülebilir</span> web ürünleri<br>ve mühendislik notları.</h1>
          <p class="lead">HaKING; yapay zekâ asistanlarından CS2 nicel arbitraj terminallerine, tarayıcı eklentilerinden WebGL 3D deneyimlere kadar <strong>15 açık kaynak GitHub projesini</strong>, çalışan canlı servislerini ve arkasındaki mimari kararları bir araya getiren bağımsız teknoloji yayınıdır.</p>
          <div class="actions">
            <a class="btn btn-accent" href="projects.html">15 Açık Kaynak Projeyi Keşfet →</a>
            <a class="btn btn-secondary" href="haking-ai-prompt-modu.html">Yeni: HaKING Prompt Modu</a>
            <a class="text-link" href="proje-yaptir.html" style="padding-left:6px;">Proje yaptırmak istiyorum ↗</a>
          </div>
          <div class="hero-meta-strip" aria-label="Stüdyo özeti">
            <div class="metric-box"><span class="metric-val">15</span><span class="metric-lbl">Public GitHub ürünü</span></div>
            <div class="metric-box"><span class="metric-val">14</span><span class="metric-lbl">Aktif *.haking.tr servisi</span></div>
            <div class="metric-box"><span class="metric-val">${allArticles.length + 1}</span><span class="metric-lbl">Derin teknik rehber &amp; analiz</span></div>
            <div class="metric-box"><span class="metric-val">MIT</span><span class="metric-lbl">Açık kaynak &amp; şeffaf mimari</span></div>
          </div>
        </div>
        <figure class="hero-frame" style="margin:0;">
          <img src="assets/images/brand/hero-studio.webp" alt="HaKING bağımsız yazılım stüdyosu ve editoryal mimari çalışma masası" width="1280" height="800" fetchpriority="high">
          <figcaption class="hero-frame-caption">
            <span class="live-pill">haking.tr · 2026 Editoryal Sürüm</span>
            <span>İstanbul · Halit Güneş</span>
          </figcaption>
        </figure>
      </div>
    </section>

    <!-- New Flagship Feature Spotlight: HaKING AI Prompt Modu -->
    <section class="section-tight wrap" aria-label="Öne çıkan yeni özellik">
      <div class="spotlight-card">
        <div>
          <div class="eyebrow"><span class="tag tag-accent">YENİ ÖZELLİK · v1.19.2</span> HAKING AI PROMPT MODU</div>
          <h2>Dağınık bir fikri denetlenmiş AI agent promptuna dönüştür.</h2>
          <p style="margin-top:12px;">HaKING AI artık yalnızca sohbet etmiyor: <strong>Prompt Modu</strong> ile Codex ve diğer AI agentları için görev kartı çıkarıyor, eksik kısıtları ücretsiz keşif sorularıyla netleştiriyor, alan adı ve altyapı çelişkilerini bağımsız denetimden geçirip kopyalanabilir teknik prompt üretiyor.</p>
          <ul class="spotlight-points">
            <li>Kod, sunum, video, görsel, yazı ve veri görevlerine özel teslimat</li>
            <li>Prompt karar belleği (<code>prompt_state</code>) ile sıfır kural kaybı</li>
            <li>Keşif soruları tamamen ücretsiz; nihai üretim ortak bakiyeden 5 kredi</li>
            <li>Gerçek sohbet üzerinde ChatGPT (4/5) ve Gemini (9,7/10) vaka değerlendirmesi</li>
          </ul>
          <div class="actions">
            <a class="btn btn-accent" href="haking-ai-prompt-modu.html">Prompt Modunu İncele &amp; Örnekleri Gör →</a>
            <a class="btn btn-secondary" href="https://ai.haking.tr/?mode=prompt" target="_blank" rel="noopener noreferrer">ai.haking.tr'de Canlı Dene ↗</a>
          </div>
        </div>
        <div class="spotlight-media">
          <img src="assets/images/projects/prompt-mode.webp" alt="HaKING AI Prompt Modu yapılandırılmış görev kartı ve denetim akışı diyagramı" width="1200" height="675" loading="lazy">
        </div>
      </div>
    </section>

    <!-- Selected Public GitHub Projects -->
    <section class="section section-band" id="projeler">
      <div class="wrap">
        <div class="section-head">
          <div class="section-head-copy">
            <div class="eyebrow">01 / PUBLIC GITHUB EKOSİSTEMİ</div>
            <h2>Yalnızca çalışan, açık kaynak ve canlı ürünler.</h2>
            <p>Küçük denemeler değil; canlı alt alan adlarıyla yayında olan, belgelenmiş ve aktif geliştirilen büyük public GitHub projelerim.</p>
          </div>
          <a class="btn btn-secondary" href="projects.html">Tüm 15 Projeyi Gör →</a>
        </div>

        <div class="filter-bar">
          <div class="filter-pills" role="group" aria-label="Proje kategorisi">
            ${PROJECT_CATEGORIES.map((c, i) => `<button type="button" class="filter-pill${i === 0 ? ' is-active' : ''}" data-project-filter data-filter="${esc(c.id)}">${esc(c.label.replace(' (15)', ''))}</button>`).join('')}
          </div>
          <span class="mono" id="project-count" style="font-size:0.82rem;color:var(--ink-muted);">${featuredProjects.length} proje</span>
        </div>

        <div class="project-grid">
          ${featuredProjects.map(renderProjectCard).join('')}
        </div>
        <p id="project-empty" hidden style="text-align:center;padding:28px;color:var(--ink-muted);">Bu kategoride öne çıkan proje bulunamadı; tüm 15 proje için <a href="projects.html">Proje Kataloğu</a> sayfasına geçebilirsiniz.</p>

        <div style="margin-top:28px;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px;padding:18px 22px;background:var(--bg);border:1px solid var(--border);border-radius:var(--radius-md);">
          <span><strong>Diğer 6 public proje:</strong> ÇevirmenX 1.4.0, NotMatik 3.0, CSELL, TradeCalc, CSNAME ve HaKING AI Desktop da dahil tüm ekosistemi tek katalogda inceleyin.</span>
          <a class="btn btn-sm" href="projects.html">Tam Katalog (15 Proje) →</a>
        </div>
      </div>
    </section>

    <!-- Pillar Engineering Case Studies -->
    <section class="section wrap" id="makaleler">
      <div class="section-head">
        <div class="section-head-copy">
          <div class="eyebrow">02 / MÜHENDİSLİK VAKA ANALİZLERİ</div>
          <h2>Sadece ekran görüntüsü değil, arkasındaki mimari kararlar.</h2>
          <p>Her vaka analizi gerçek bir üretim probleminden başlar; kod sınırlarını, veri akışını, performans darboğazlarını ve bilinen kısıtları şeffaf biçimde belgeler.</p>
        </div>
        <a class="btn btn-secondary" href="blog.html">Tüm Yazılar (${allArticles.length}) →</a>
      </div>

      <div class="article-grid">
        ${featuredArticles
          .map(
            (a, idx) => `<article class="article-card${idx === 0 ? ' article-card-featured' : ''}">
              <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
                <span class="tag ${idx === 0 ? 'tag-accent' : ''}">${esc(a.category)} · ${esc(a.kind)}</span>
                <span class="mono" style="font-size:0.75rem;color:var(--ink-muted);">${esc(a.readTime)}</span>
              </div>
              <h3><a href="${a.file}">${esc(a.title)}</a></h3>
              <p>${esc(a.shortDesc)}</p>
              <div class="article-card-foot">
                <span>${esc(SITE.author.name)} · ${esc(a.dateDisplay)}</span>
                <a class="text-link" href="${a.file}">Oku →</a>
              </div>
            </article>`
          )
          .join('')}
      </div>
    </section>

    <!-- Practical Technical Guides Band -->
    <section class="section section-band-stone">
      <div class="wrap">
        <div class="section-head">
          <div class="section-head-copy">
            <div class="eyebrow">03 / PRATİK TEKNİK REHBERLER</div>
            <h2>Uygulanabilir kılavuzlar ve karşılaştırmalı notlar.</h2>
            <p>AI akış gecikmesi, ağırlıklı not hesaplama, OKLCH tasarım tokenları, QR baskı kalitesi, BM25 hibrit arama ve CS2 komisyon matematiği üzerine rehberler.</p>
          </div>
          <a class="btn btn-secondary" href="haberler.html">Okuma Merkezini Aç →</a>
        </div>
        <div class="article-grid">
          ${recentGuides
            .map(
              (a) => `<article class="article-card">
                <span class="tag">${esc(a.category)}</span>
                <h3><a href="${a.file}">${esc(a.title)}</a></h3>
                <p>${esc(a.shortDesc)}</p>
                <div class="article-card-foot">
                  <span>${esc(a.readTime)}</span>
                  <a class="text-link" href="${a.file}">Rehberi oku →</a>
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
          <p>Bir projeyi yayına almak benim için işin yalnızca yarısı: o ürünü kurarken hangi mimari takası yaptığımı, hangi performans sınırına çarptığımı ve kullanıcıların aynı problemleri nasıl çözebileceğini <strong>haking.tr</strong> üzerinde derin mühendislik yazılarıyla paylaşıyorum.</p>
          <div class="actions" style="margin-top:22px;">
            <a class="btn" href="hakkimda.html">Hakkımda &amp; Hikâyem →</a>
            <a class="btn btn-secondary" href="github.html">GitHub Profil Sayfam →</a>
          </div>
        </div>
        <div class="grid-2">
          <div class="panel">
            <span class="tag tag-accent">01 · ARAYÜZ</span>
            <h3 style="margin:10px 0 6px;">Web &amp; Tasarım Sistemleri</h3>
            <p style="font-size:0.9rem;">Modern HTML5, anlamsal CSS tokenları, sıfır bağımlılıklı JavaScript, Astro, React/Vite ve erişilebilir PWA uygulamaları.</p>
          </div>
          <div class="panel">
            <span class="tag tag-forest">02 · SERVİS</span>
            <h3 style="margin:10px 0 6px;">API, AI &amp; Gerçek Zamanlı</h3>
            <p style="font-size:0.9rem;">Python/FastAPI, SSE akışı, Node.js + Socket.IO, Cloudflare Workers, Neon PostgreSQL ve çoklu LLM yönlendirme.</p>
          </div>
          <div class="panel">
            <span class="tag tag-ochre">03 · GRAFİK</span>
            <h3 style="margin:10px 0 6px;">3D WebGL &amp; Etkileşim</h3>
            <p style="font-size:0.9rem;">Three.js donanım ve müze sahneleri, HTML5 Canvas oyun motorları ve 60+ FPS duyarlı etkileşim katmanları.</p>
          </div>
          <div class="panel">
            <span class="tag">04 · EKLENTİ</span>
            <h3 style="margin:10px 0 6px;">Tarayıcı Uzantıları</h3>
            <p style="font-size:0.9rem;">Chrome, Edge ve Firefox için minimum izinli, cihaz içi çalışan Manifest V3 eklentileri ve mağaza dağıtımı.</p>
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
      "Halit Güneş'in bağımsız yazılım stüdyosu ve teknoloji yayını: HaKING AI Prompt Modu, SPREAD V11.1, COSMIC v12.0, CS2 Studio, CopyHex, QR Scanner, ÇevirmenX ve 20+ derin mühendislik rehberi.",
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
