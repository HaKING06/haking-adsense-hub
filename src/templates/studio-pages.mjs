import { SITE } from '../data/site.mjs';
import { PROJECTS } from '../data/projects.mjs';
import { renderLayout, renderBreadcrumbs, esc } from './layout.mjs';

export function renderAboutPage() {
  const breadcrumbs = [
    { name: 'Ana Sayfa', href: 'index.html' },
    { name: 'Hakkımda (Ben Kimim?)' },
  ];

  const timeline = [
    { date: '2025 · Başlangıç', title: 'NotMatik ve temel web araçları', desc: 'Üniversite derslerindeki ağırlıklı ortalama ve hedef final ihtiyacından doğan ilk sürümler, sade JavaScript ve erişilebilir form tasarımının temelini attı.' },
    { date: '2026 İlkbahar – Yaz', title: 'Çoklu tarayıcı uzantıları ve 3D denemeler', desc: 'QR Scanner, ÇevirmenX ve ilk Three.js sahneleriyle Manifest V3 izin disiplini, çoklu tarayıcı derleme ve tarayıcı içi 3D performans üzerine yoğunlaştım.' },
    { date: '2026 Ekim – Kasım', title: 'CopyHex, CS2 Ekosistemi ve COSMIC', desc: 'OKLCH renk tokenları (CopyHex), 60 oyunlu COSMIC v12.0 portalı, Astro tabanlı CS2 Studio, CSELL, TradeCalc, CSNAME ve 20 dilli HaKING 3D Vault yayımlandı.' },
    { date: '2026 Kasım Sonu', title: 'HaKING AI Prompt Modu v1.19.2, SPREAD V11.1 ve Haking Chat', desc: 'Görev kartlı Prompt Modu, 500 senaryolu Monte Carlo CVaR hesaplayan SPREAD V11.1, Socket.IO sunucu doğrulamalı 3D masa oyunları (Haking Chat) ve yenilenen haking.tr editoryal yayını.' },
  ];

  const bodyHtml = `
    <header class="page-intro">
      <div class="wrap">
        ${renderBreadcrumbs(breadcrumbs)}
        <div class="eyebrow">BEN KİMİM? · YAZAR &amp; BAĞIMSIZ GELİŞTİRİCİ</div>
        <h1>Merhaba, ben Halit Güneş.</h1>
        <p class="lead">${esc(SITE.author.education)} öğrencisi, açık kaynak geliştirici ve <strong>haking.tr</strong> teknoloji yayınının kurucusu.</p>
        <div class="actions" style="margin-top:20px;">
          <a class="btn btn-accent" href="projects.html">15 Açık Kaynak Projem →</a>
          <a class="btn btn-secondary" href="github.html">GitHub Sayfam</a>
          <a class="btn btn-secondary" href="proje-yaptir.html">Proje Yaptır / İş Birliği</a>
        </div>
      </div>
    </header>

    <section class="section wrap">
      <div class="grid-2" style="align-items:start;">
        <div class="prose">
          <h2>Öğrenmeyi çalışan ürüne dönüştürmek</h2>
          <p>Ben <strong>Halit Güneş</strong> (GitHub ve topluluklarda <code>HaKING06</code>). İstanbul’da yaşıyorum ve İstanbul Kültür Üniversitesi Bilgisayar Programcılığı bölümünde eğitimime devam ediyorum. Yazılıma yalnızca ders projesi olarak değil, insanların günlük hayatında gerçekten açıp kullandığı, hızlı ve güvenilir araçlar üretme disiplini olarak yaklaşıyorum.</p>
          <p><strong>HaKING</strong> çatısı altında geliştirdiğim her projede üç temel ilkeye sadık kalıyorum: <strong>gereksiz karmaşıklıktan kaçınmak</strong>, <strong>kullanıcı verisini mümkün olduğunca cihazda tutmak</strong> ve <strong>bir ürünü nasıl tasarladığımı açık kaynak kod + teknik vaka analizleriyle belgelemek</strong>.</p>

          <h2>Neden bu kadar farklı alanda ürün geliştiriyorum?</h2>
          <p>Portfolyomda yapay zekâ asistanından (<a href="proje-haking-ai.html">HaKING AI</a>) nicel CS2 arbitraj terminaline (<a href="proje-spread.html">SPREAD</a>), 60 oyunlu arcade portalından (<a href="proje-cosmic.html">COSMIC</a>) OKLCH renk token stüdyosuna (<a href="proje-copyhex.html">CopyHex</a>) ve tarayıcı eklentilerine (<a href="proje-qr-scanner.html">QR Scanner</a>, <a href="proje-cevirmenx.html">ÇevirmenX</a>) kadar farklı alanlar var. Bunun nedeni tek bir kalıba sıkışmadan gerçek mühendislik katmanlarının tamamını — istemci performansı, servis güvenliği, veri yapıları, gerçek zamanlı soketler ve 3D grafikler — bizzat üretim ortamında deneyimlemek.</p>

          <h2>Yayın sorumluluğu ve şeffaflık</h2>
          <p><strong>haking.tr</strong> üzerindeki tüm proje incelemeleri, mimari notlar ve rehberler birinci el geliştirme deneyimine dayanır. Ölçülmemiş performans rakamları, abartılı vaatler veya doğrulanmamış iddialar kullanmamaya özen gösteririm. İçerik üretim ve düzeltme süreçlerimizi <a href="yayin-ilkeleri.html">Yayın İlkeleri</a> sayfasında okuyabilirsiniz.</p>
        </div>

        <div style="display:flex;flex-direction:column;gap:20px;">
          <div class="panel">
            <div class="eyebrow">KİMLİK KARTI</div>
            <div class="table-scroll" style="margin:0;">
              <table>
                <tbody>
                  <tr><th>Ad Soyad</th><td><strong>${esc(SITE.author.name)}</strong></td></tr>
                  <tr><th>Geliştirici Adı</th><td class="mono">${esc(SITE.author.handle)}</td></tr>
                  <tr><th>Eğitim</th><td>${esc(SITE.author.education)}</td></tr>
                  <tr><th>Konum</th><td>${esc(SITE.author.city)}</td></tr>
                  <tr><th>E-posta</th><td><a href="mailto:${SITE.author.email}">${SITE.author.email}</a></td></tr>
                  <tr><th>Açık Kaynak</th><td><a href="${SITE.author.github}" target="_blank" rel="noopener noreferrer">github.com/HaKING06 ↗</a></td></tr>
                  <tr><th>Canlı Ekosistem</th><td>14 aktif <code>*.haking.tr</code> web servisi</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="panel">
            <div class="eyebrow">RESMÎ KANALLAR</div>
            <div class="actions">
              <a class="btn btn-sm" href="${SITE.author.github}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              <a class="btn btn-secondary btn-sm" href="${SITE.author.youtube}" target="_blank" rel="noopener noreferrer">YouTube ↗</a>
              <a class="btn btn-secondary btn-sm" href="${SITE.author.steam}" target="_blank" rel="noopener noreferrer">Steam ↗</a>
              <a class="btn btn-secondary btn-sm" href="${SITE.author.discord}" target="_blank" rel="noopener noreferrer">Discord ↗</a>
              <a class="btn btn-secondary btn-sm" href="${SITE.author.support}" target="_blank" rel="noopener noreferrer">Buy Me a Coffee ↗</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-band">
      <div class="wrap">
        <div class="section-head">
          <div class="section-head-copy">
            <div class="eyebrow">TEKNİK YETKİNLİK HARİTASI</div>
            <h2>Kullandığım diller, araçlar ve mimari katmanlar</h2>
          </div>
        </div>
        <div class="grid-3">
          <div class="panel">
            <span class="tag tag-accent">FRONTEND &amp; UI</span>
            <h3 style="margin:10px 0 8px;">Arayüz &amp; Tasarım Sistemleri</h3>
            <p style="font-size:0.9rem;">Semantik HTML5, modern CSS (OKLCH, Grid, Custom Properties), sıfır bağımlılıklı JavaScript, Astro, React + Vite, PWA (Service Worker) ve Figma ile arayüz prototipleme.</p>
          </div>
          <div class="panel">
            <span class="tag tag-forest">BACKEND &amp; VERİ</span>
            <h3 style="margin:10px 0 8px;">Servis, API &amp; Veritabanı</h3>
            <p style="font-size:0.9rem;">Python (FastAPI, Uvicorn, BM25/TF-IDF), Node.js 22 (Express, Socket.IO), C#, SQL, Neon PostgreSQL, Server-Sent Events (SSE) ve çoklu LLM yönlendirme.</p>
          </div>
          <div class="panel">
            <span class="tag tag-ochre">DAĞITIM &amp; GRAFİK</span>
            <h3 style="margin:10px 0 8px;">3D WebGL, Eklenti &amp; Edge</h3>
            <p style="font-size:0.9rem;">Three.js, HTML5 Canvas, Manifest V3 (Chrome/Edge/Firefox uzantıları), Cloudflare Workers &amp; Pages, Vercel, GitHub Actions otomasyonları ve teknik SEO.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section wrap">
      <div class="section-head">
        <div class="section-head-copy">
          <div class="eyebrow">ÜRETİM KRONOLOJİSİ</div>
          <h2>2025 – 2026 kilometre taşları</h2>
        </div>
      </div>
      <div class="timeline">
        ${timeline
          .map(
            (t) => `<div class="timeline-item">
              <div class="timeline-date">${esc(t.date)}</div>
              <h3 style="margin:4px 0 6px;">${esc(t.title)}</h3>
              <p style="font-size:0.94rem;max-width:68ch;">${esc(t.desc)}</p>
            </div>`
          )
          .join('')}
      </div>
    </section>

    <section class="section-tight wrap">
      <div class="cta-band">
        <div>
          <div class="eyebrow">BİRLİKTE ÇALIŞALIM</div>
          <h2>Özel bir web aracı veya iş birliği mi planlıyorsun?</h2>
          <p>Proje fikrini, kapsamını veya içerik geri bildirimini doğrudan iletebilirsin.</p>
        </div>
        <div class="actions">
          <a class="btn" href="proje-yaptir.html">Proje Yaptır →</a>
          <a class="btn btn-secondary" href="iletisim.html">İletişim Sayfası</a>
        </div>
      </div>
    </section>
  `;

  return renderLayout({
    title: 'Hakkımda (Ben Kimim?) — Halit Güneş | HaKING',
    description:
      'Halit Güneş (HaKING06) kimdir? İstanbul Kültür Üniversitesi Bilgisayar Programcılığı öğrencisinin yazılım geliştirme yaklaşımı, teknik yetkinlikleri, üretim kronolojisi ve resmî kanalları.',
    canonicalPath: 'hakkimda.html',
    activeNav: 'about',
    breadcrumbs,
    bodyHtml,
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        name: 'Halit Güneş Hakkında',
        url: `${SITE.domain}/hakkimda.html`,
        inLanguage: 'tr-TR',
        mainEntity: { '@id': `${SITE.domain}/#person` },
      },
    ],
  });
}

export function renderGitHubPage() {
  const breadcrumbs = [
    { name: 'Ana Sayfa', href: 'index.html' },
    { name: 'GitHub Sayfam (HaKING06)' },
  ];

  const langCounts = {};
  PROJECTS.forEach((p) => {
    const mainLang = p.language.split('/')[0].trim();
    langCounts[mainLang] = (langCounts[mainLang] || 0) + 1;
  });

  const bodyHtml = `
    <header class="page-intro">
      <div class="wrap">
        ${renderBreadcrumbs(breadcrumbs)}
        <div class="eyebrow"><span class="eyebrow-dot"></span> AÇIK KAYNAK EKOSİSTEMİ · GITHUB.COM/HAKING06</div>
        <h1>GitHub Sayfam ve Public Depo Vitrini.</h1>
        <p class="lead">HaKING projelerinin kaynak kodları <strong>github.com/HaKING06</strong> altında açık kaynak (çoğunlukla MIT lisansı) olarak yayımlanır. Aşağıda yalnızca öne çıkan <strong>15 büyük public ürün deposunu</strong>, teknolojilerini, son güncellemelerini ve canlı dağıtım adreslerini görebilirsiniz.</p>
        <div class="actions" style="margin-top:20px;">
          <a class="btn btn-accent" href="${SITE.author.github}" target="_blank" rel="noopener noreferrer">github.com/HaKING06 Profilini Aç ↗</a>
          <button type="button" class="btn btn-secondary" id="gh-live-refresh">GitHub API ile Canlı Doğrula</button>
          <a class="btn btn-secondary" href="projects.html">Görsel Proje Kataloğu →</a>
        </div>
        <p id="gh-live-status" class="mono" style="margin-top:12px;font-size:0.8rem;color:var(--forest);" role="status" aria-live="polite">Gömülü statik depo verileri gösteriliyor (27 Kasım 2026). İsterseniz üstteki düğmeyle canlı GitHub API verisini çekebilirsiniz.</p>
      </div>
    </header>

    <section class="section wrap">
      <div class="grid-4" style="margin-bottom:32px;">
        <div class="panel">
          <span class="tag tag-accent">PUBLIC ÜRÜN</span>
          <div class="metric-val" style="margin-top:8px;">15</div>
          <p style="font-size:0.84rem;margin:4px 0 0;">Büyük açık kaynak uygulama &amp; platform</p>
        </div>
        <div class="panel">
          <span class="tag tag-forest">CANLI SERVİS</span>
          <div class="metric-val" style="margin-top:8px;">14</div>
          <p style="font-size:0.84rem;margin:4px 0 0;">Aktif *.haking.tr yayın ortamı</p>
        </div>
        <div class="panel">
          <span class="tag tag-ochre">OTOMASYON</span>
          <div class="metric-val" style="margin-top:8px;">CI/CD</div>
          <p style="font-size:0.84rem;margin:4px 0 0;">GitHub Actions katalog, Steam ve test akışları</p>
        </div>
        <div class="panel">
          <span class="tag">LİSANS</span>
          <div class="metric-val" style="margin-top:8px;">MIT</div>
          <p style="font-size:0.84rem;margin:4px 0 0;">İncelenebilir, şeffaf ve topluluğa açık</p>
        </div>
      </div>

      <div class="section-head">
        <div class="section-head-copy">
          <div class="eyebrow">PUBLIC DEPO TABLOSU</div>
          <h2>15 Büyük Public GitHub Deposu</h2>
          <p>Küçük ders veya deneme depoları filtrelenmiş; yalnızca belgelenmiş, sürümlenmiş ve gerçek kullanım senaryosu sunan depolar listelenmiştir.</p>
        </div>
      </div>

      <div class="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Depo / Ürün</th>
              <th>Sürüm</th>
              <th>Dil / Teknoloji</th>
              <th>Son Güncelleme</th>
              <th>Yıldız</th>
              <th>Bağlantılar</th>
            </tr>
          </thead>
          <tbody>
            ${PROJECTS.map(
              (p) => `<tr data-gh-repo="${esc(p.repoName)}">
                <td>
                  <strong><a href="${p.page}">${esc(p.name)}</a></strong><br>
                  <small class="mono" style="color:var(--ink-muted);">HaKING06/${esc(p.repoName)}</small>
                </td>
                <td class="mono">${esc(p.version)}</td>
                <td>${esc(p.language)}</td>
                <td class="mono" data-gh-updated>${esc(p.updated)}</td>
                <td class="mono" data-gh-stars>${p.repoName === 'HaKING' ? '1' : '0'}</td>
                <td style="white-space:nowrap;">
                  <a class="text-link" href="${esc(p.repoUrl)}" target="_blank" rel="noopener noreferrer">Repo ↗</a>
                  ${p.liveUrl ? ` · <a class="text-link" href="${esc(p.liveUrl)}" target="_blank" rel="noopener noreferrer">Canlı ↗</a>` : ''}
                </td>
              </tr>`
            ).join('')}
          </tbody>
        </table>
      </div>
    </section>

    <section class="section section-band">
      <div class="wrap grid-2">
        <div class="panel">
          <div class="eyebrow">DİL VE TEKNOLOJİ DAĞILIMI</div>
          <h3>Öne çıkan teknolojiler</h3>
          <div class="chips" style="margin-top:12px;">
            ${Object.entries(langCounts)
              .map(([k, v]) => `<span class="tag">${esc(k)} (${v})</span>`)
              .join('')}
          </div>
          <p style="margin-top:14px;font-size:0.92rem;">Projelerin büyük bölümü ek çalışma zamanı yükü oluşturmayan saf JavaScript/HTML/CSS ve Cloudflare Workers kenar dağıtımı üzerine kuruludur; sunucu gerektiren projelerde Python FastAPI, Node.js 22 ve Neon PostgreSQL kullanılır.</p>
        </div>
        <div class="panel">
          <div class="eyebrow">KATKI &amp; GÜVENLİK BİLDİRİMİ</div>
          <h3>Hata bildirimi ve Pull Request ilkeleri</h3>
          <p style="font-size:0.92rem;">Her büyük depoda <code>README.md</code>, <code>CONTRIBUTING.md</code> ve <code>SECURITY.md</code> belgeleri bulunur. Bir hata bulduğunuzda ilgili depoda Issue açabilir, güvenlik zafiyeti tespit ettiğinizde ise herkese açık issue yerine doğrudan <a href="mailto:${SITE.author.email}">${SITE.author.email}</a> adresine bildirebilirsiniz.</p>
          <div class="actions" style="margin-top:14px;">
            <a class="btn btn-sm" href="${SITE.author.github}" target="_blank" rel="noopener noreferrer">GitHub'da Takip Et ↗</a>
            <a class="btn btn-secondary btn-sm" href="${SITE.author.support}" target="_blank" rel="noopener noreferrer">Açık Kaynağı Destekle ↗</a>
          </div>
        </div>
      </div>
    </section>
  `;

  return renderLayout({
    title: 'GitHub Sayfam (HaKING06) — 15 Public Açık Kaynak Proje | HaKING',
    description:
      'Halit Güneş (github.com/HaKING06) açık kaynak yazılım profili: 15 büyük public GitHub deposu, sürümleri, canlı haking.tr adresleri, teknoloji dağılımı ve katkı rehberi.',
    canonicalPath: 'github.html',
    activeNav: 'github',
    breadcrumbs,
    bodyHtml,
  });
}

export function renderHirePage() {
  const breadcrumbs = [
    { name: 'Ana Sayfa', href: 'index.html' },
    { name: 'Proje Yaptır & Teknik İş Birliği' },
  ];

  const services = [
    { tag: 'WEB UYGULAMALARI', title: 'Özel Web Araçları, Dashboard & Hesaplayıcılar', desc: 'Hızlı açılan, sıfır gereksiz şişkinlikli, mobil öncelikli kurumsal siteler, veri araçları, PWA uygulamaları ve etkileşimli hesaplayıcılar.' },
    { tag: 'YAPAY ZEKÂ', title: 'AI Sohbet Arayüzleri & API Entegrasyonu', desc: 'FastAPI/Node.js backend, SSE akışlı yanıt, prompt mühendisliği, kredi/kota yönetimi ve güvenli model sağlayıcı entegrasyonu.' },
    { tag: 'TARAYICI UZANTILARI', title: 'Chrome, Edge & Firefox Eklentileri (Manifest V3)', desc: 'Minimum izinli, mağaza kurallarına uyumlu, cihaz içi çalışan verimlilik, çeviri veya otomasyon tarayıcı uzantıları.' },
    { tag: '3D & ETKİLEŞİM', title: 'Three.js 3D Ürün Vitrini & WebGL Sahneleri', desc: 'Ürün veya marka hikâyesini tarayıcıda akıcı biçimde sunan, mobil uyumlu ve SEO destekli 3D etkileşimli deneyimler.' },
    { tag: 'SEO & PERFORMANS', title: 'Teknik SEO, Core Web Vitals & AdSense Uyumluluğu', desc: 'Statik HTML hız optimizasyonu, JSON-LD yapılandırılmış veri, WebP görsel hattı, çoklu arama motoru (Google/Bing/Yandex) ve GEO (llms.txt) kurulumu.' },
    { tag: 'AÇIK KAYNAK & DANIŞMANLIK', title: 'Kod İnceleme, Refactoring & Dağıtım', desc: 'Mevcut projenin Cloudflare Pages/Workers, Vercel veya Neon PostgreSQL üzerine temiz taşınması ve CI/CD otomasyonu.' },
  ];

  const faqs = [
    {
      q: 'Proje talebi gönderdikten sonra süreç nasıl işler?',
      a: 'Önce paylaştığınız brief üzerinden hedefleri, teknik kısıtları ve teslim kapsamını netleştiririz. Kapsam kesinleştikten sonra aşamalı teslimat planı ve zaman tahmini paylaşılır; her adım çalışan önizleme bağlantısıyla doğrulanır.',
    },
    {
      q: 'Mevcut bir web sitesinin tasarımını yenileme veya hızlandırma yapıyor musunuz?',
      a: 'Evet. Mevcut sitenizin tasarım sistemini yenileme, mobil uyumluluk düzeltmeleri, Core Web Vitals / görsel optimizasyonu ve teknik SEO + yapılandırılmış veri kurulumu yapılabilir.',
    },
    {
      q: 'Teslim edilen projenin kaynak kodları ve alan adı bana mı ait olur?',
      a: 'Evet. Anlaşma kapsamında üretilen tüm kaynak kodlar, dağıtım yapılandırmaları ve dokümantasyon temiz bir Git deposu olarak tarafınıza teslim edilir.',
    },
  ];

  const bodyHtml = `
    <header class="page-intro">
      <div class="wrap">
        ${renderBreadcrumbs(breadcrumbs)}
        <div class="eyebrow"><span class="eyebrow-dot"></span> ÖZEL YAZILIM &amp; TEKNİK İŞ BİRLİĞİ</div>
        <h1>Fikrini temiz kodlu, hızlı ve yayına hazır bir ürüne dönüştürelim.</h1>
        <p class="lead">Web uygulamaları, yapay zekâ arayüzleri, tarayıcı eklentileri, 3D ürün vitrinleri ve teknik SEO / performans dönüşümleri için uçtan uca geliştirme ve iş birliği.</p>
      </div>
    </header>

    <section class="section wrap">
      <div class="section-head">
        <div class="section-head-copy">
          <div class="eyebrow">01 / ÇALIŞMA ALANLARI</div>
          <h2>Hangi tür projeleri geliştiriyorum?</h2>
          <p>Portfolyomdaki 15 canlı açık kaynak üründe kanıtlanmış mimari deneyimle odaklandığım 6 temel alan.</p>
        </div>
        <a class="btn btn-secondary btn-sm" href="projects.html">Canlı Referansları Gör →</a>
      </div>
      <div class="grid-3">
        ${services
          .map(
            (s) => `<div class="panel">
              <span class="tag">${esc(s.tag)}</span>
              <h3 style="margin:12px 0 8px;">${esc(s.title)}</h3>
              <p style="font-size:0.91rem;">${esc(s.desc)}</p>
            </div>`
          )
          .join('')}
      </div>
    </section>

    <section class="section section-band">
      <div class="wrap">
        <div class="section-head">
          <div class="section-head-copy">
            <div class="eyebrow">02 / ÇALIŞMA SÜRECİ</div>
            <h2>Sürprizsiz, 5 adımlı mühendislik akışı</h2>
          </div>
        </div>
        <div class="grid-4" style="grid-template-columns:repeat(auto-fit,minmax(200px,1fr));">
          <div class="panel"><span class="tag tag-accent">ADIM 01</span><h3 style="margin:10px 0 6px;">Keşif &amp; Brief</h3><p style="font-size:0.88rem;">Problem, hedef kullanıcı, teknik sınırlar ve teslim kriterleri netleştirilir.</p></div>
          <div class="panel"><span class="tag">ADIM 02</span><h3 style="margin:10px 0 6px;">Mimari &amp; Tasarım</h3><p style="font-size:0.88rem;">Renk sistemi, sayfa akışı, veri modeli ve barındırma mimarisi belirlenir.</p></div>
          <div class="panel"><span class="tag">ADIM 03</span><h3 style="margin:10px 0 6px;">Geliştirme</h3><p style="font-size:0.88rem;">Modüler, temiz ve mobil öncelikli kodlama; ara önizlemelerle şeffaf ilerleme.</p></div>
          <div class="panel"><span class="tag">ADIM 04</span><h3 style="margin:10px 0 6px;">Test &amp; SEO</h3><p style="font-size:0.88rem;">Mobil uyumluluk, hız, kırık link, erişilebilirlik ve arama motoru kontrolleri.</p></div>
          <div class="panel"><span class="tag tag-forest">ADIM 05</span><h3 style="margin:10px 0 6px;">Yayın &amp; Teslim</h3><p style="font-size:0.88rem;">Alan adı bağlantısı, canlı doğrulama, kaynak kodu ve dokümantasyon teslimi.</p></div>
        </div>
      </div>
    </section>

    <section class="section wrap" id="brief-olustur">
      <div class="section-head">
        <div class="section-head-copy">
          <div class="eyebrow">03 / ETKİLEŞİMLİ PROJE KAPSAM OLUŞTURUCU</div>
          <h2>2 dakikada yapılandırılmış proje brief’i hazırla</h2>
          <p>Seçimlerinize göre sağdaki teknik özet anlık güncellenir. Hazırlanan brief’i tek tıkla kopyalayabilir veya doğrudan <strong>${SITE.author.email}</strong> adresine e-posta taslağı olarak açabilirsiniz.</p>
        </div>
      </div>

      <div class="grid-2" style="align-items:start;">
        <form class="panel form-grid" id="brief-builder-form">
          <div class="grid-2">
            <div class="form-row">
              <label for="brief-name">Adınız / Kurum</label>
              <input id="brief-name" type="text" placeholder="Örn. Ahmet Yılmaz" maxlength="100">
            </div>
            <div class="form-row">
              <label for="brief-email">E-posta Adresiniz</label>
              <input id="brief-email" type="email" placeholder="ornek@alanadi.com" maxlength="150">
            </div>
          </div>

          <div class="grid-2">
            <div class="form-row">
              <label for="brief-type">Proje Türü</label>
              <select id="brief-type">
                <option>Özel Web Uygulaması / SaaS Aracı</option>
                <option>Kurumsal / Editoryal Web Sitesi &amp; SEO</option>
                <option>Yapay Zekâ Sohbet / API Entegrasyonu</option>
                <option>Tarayıcı Eklentisi (Chrome / Edge / Firefox)</option>
                <option>3D WebGL / Three.js Ürün Vitrini</option>
                <option>Mevcut Site Yenileme &amp; Hız Optimizasyonu</option>
              </select>
            </div>
            <div class="form-row">
              <label for="brief-timeline">Hedef Zaman Çizelgesi</label>
              <select id="brief-timeline">
                <option>1 – 2 Hafta (Hızlı MVP / Araç)</option>
                <option selected>2 – 4 Hafta (Standart Web Ürünü)</option>
                <option>1 – 2 Ay (Kapsamlı Platform)</option>
                <option>Esnek / Görüşmede Netleşecek</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <label>İhtiyaç Duyulan Özellikler</label>
            <div class="checkbox-grid">
              <label class="check-card"><input type="checkbox" name="feature" value="Özgün UI/UX tasarım &amp; koyu/açık tema" checked><span>Özgün tasarım &amp; tema</span></label>
              <label class="check-card"><input type="checkbox" name="feature" value="Tam mobil uyumluluk (Responsive / PWA)" checked><span>Mobil &amp; PWA uyumu</span></label>
              <label class="check-card"><input type="checkbox" name="feature" value="Teknik SEO, JSON-LD, sitemap &amp; hız optimizasyonu" checked><span>Teknik SEO &amp; Hız</span></label>
              <label class="check-card"><input type="checkbox" name="feature" value="Backend API &amp; Veritabanı (FastAPI / Node / PostgreSQL)"><span>Backend API &amp; DB</span></label>
              <label class="check-card"><input type="checkbox" name="feature" value="Yapay Zekâ / LLM akışlı entegrasyon"><span>AI / LLM Entegrasyonu</span></label>
              <label class="check-card"><input type="checkbox" name="feature" value="Çok dilli arayüz (TR/EN+)"><span>Çok Dilli Destek</span></label>
            </div>
          </div>

          <div class="form-row">
            <label for="brief-notes">Proje Özeti &amp; Hedefler</label>
            <textarea id="brief-notes" placeholder="Projenin neyi çözmesini istiyorsunuz? Varsa örnek site veya mevcut alan adı bilgisini ekleyin..."></textarea>
          </div>

          <div class="actions">
            <button type="submit" class="btn btn-accent">E-posta ile Gönder ↗</button>
            <button type="button" class="btn btn-secondary" id="brief-copy" data-copy-text="">Özeti Kopyala</button>
          </div>
          <p id="brief-status" class="form-status" role="status" aria-live="polite"></p>
        </form>

        <div class="panel" style="position:sticky;top:calc(var(--header-h) + 24px);">
          <div class="eyebrow">CANLI BRIEF ÖNİZLEMESİ</div>
          <p style="font-size:0.88rem;margin-bottom:14px;">Bu statik sitede form bilgileri hiçbir üçüncü taraf sunucuya kaydedilmez; doğrudan sizin e-posta taslağınıza aktarılır.</p>
          <div class="code-block" style="margin:0 0 16px;">
            <div class="code-head"><span>proje-brief.txt</span><span>Otomatik Güncellenir</span></div>
            <pre id="brief-preview" style="white-space:pre-wrap;"></pre>
          </div>
          <a id="brief-mailto" class="btn btn-forest" style="width:100%;" href="mailto:${SITE.author.email}">E-posta Uygulamasında Aç ↗</a>
        </div>
      </div>
    </section>

    <section class="section section-band">
      <div class="wrap prose prose-wide">
        <h2>Sıkça Sorulan Sorular</h2>
        <div class="faq-list">
          ${faqs.map((f) => `<details class="faq-item"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}
        </div>
      </div>
    </section>
  `;

  return renderLayout({
    title: 'Proje Yaptır & Teknik İş Birliği — Web, AI ve Eklenti Geliştirme | HaKING',
    description:
      'Halit Güneş ile özel web uygulaması, yapay zekâ arayüzü, tarayıcı eklentisi, Three.js 3D vitrin veya teknik SEO projesi geliştirin. İnteraktif brief oluşturucu ile hemen teklif hazırlayın.',
    canonicalPath: 'proje-yaptir.html',
    activeNav: 'hire',
    breadcrumbs,
    bodyHtml,
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'HaKING Özel Yazılım ve Web Geliştirme Hizmetleri',
        provider: { '@id': `${SITE.domain}/#person` },
        areaServed: 'TR',
        url: `${SITE.domain}/proje-yaptir.html`,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  });
}

export function renderContactPage() {
  const breadcrumbs = [
    { name: 'Ana Sayfa', href: 'index.html' },
    { name: 'İletişim' },
  ];

  const bodyHtml = `
    <header class="page-intro">
      <div class="wrap">
        ${renderBreadcrumbs(breadcrumbs)}
        <div class="eyebrow">İLETİŞİM · ${esc(SITE.author.name)}</div>
        <h1>Doğrudan ulaşın, geri bildirim veya proje fikri paylaşın.</h1>
        <p class="lead">Açık kaynak projelerim, teknik yazılardaki düzeltme önerileri, basın/sponsorluk soruları veya özel yazılım iş birlikleri için aşağıdaki kanalları kullanabilirsiniz.</p>
      </div>
    </header>

    <section class="section wrap">
      <div class="grid-2" style="align-items:start;">
        <div style="display:flex;flex-direction:column;gap:20px;">
          <div class="panel">
            <div class="eyebrow">DOĞRUDAN E-POSTA</div>
            <h2 style="margin-bottom:10px;">${SITE.author.email}</h2>
            <p>İçerik düzeltmelerinde ilgili sayfanın adresini, proje hata bildirimlerinde kullandığınız tarayıcı ve adımları paylaşmanız çözüm sürecini hızlandırır.</p>
            <div class="actions" style="margin-top:16px;">
              <a class="btn btn-accent" href="mailto:${SITE.author.email}">E-posta Gönder ↗</a>
              <button type="button" class="btn btn-secondary" data-copy-text="${SITE.author.email}">Adresi Kopyala</button>
            </div>
          </div>

          <div class="panel">
            <div class="eyebrow">GELİŞTİRİCİ &amp; SOSYAL KANALLAR</div>
            <div class="table-scroll" style="margin:0;">
              <table>
                <tbody>
                  <tr><th>GitHub</th><td><a href="${SITE.author.github}" target="_blank" rel="noopener noreferrer">github.com/HaKING06 ↗</a></td></tr>
                  <tr><th>YouTube</th><td><a href="${SITE.author.youtube}" target="_blank" rel="noopener noreferrer">youtube.com/@gunshalit ↗</a></td></tr>
                  <tr><th>Discord</th><td><a href="${SITE.author.discord}" target="_blank" rel="noopener noreferrer">Discord Profili ↗</a></td></tr>
                  <tr><th>Steam</th><td><a href="${SITE.author.steam}" target="_blank" rel="noopener noreferrer">Steam Topluluk Profili ↗</a></td></tr>
                  <tr><th>Destek</th><td><a href="${SITE.author.support}" target="_blank" rel="noopener noreferrer">buymeacoffee.com/haking ↗</a></td></tr>
                  <tr><th>Konum</th><td>${esc(SITE.author.city)}</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="callout">
            <span class="callout-title">Proje Yaptırmak İstiyorsanız</span>
            <p>Özel yazılım veya web sitesi talebiniz için kapsamı adım adım hazırlayan <a href="proje-yaptir.html#brief-olustur">Proje Yaptır &amp; Brief Oluşturucu</a> sayfasını kullanabilirsiniz.</p>
          </div>
        </div>

        <form class="panel form-grid" id="contact-form">
          <div class="eyebrow">MESAJ TASLAĞI HAZIRLAYICI</div>
          <h2>Hızlı Mesaj Oluştur</h2>
          <p style="font-size:0.88rem;">Bu statik form sunucuya veri kaydetmez; gönder dediğinizde cihazınızdaki e-posta uygulamasında hazır taslak açılır.</p>
          <div class="form-row">
            <label for="c-name">Ad Soyad</label>
            <input id="c-name" name="name" type="text" autocomplete="name" required maxlength="100">
          </div>
          <div class="form-row">
            <label for="c-email">E-posta Adresi</label>
            <input id="c-email" name="email" type="email" autocomplete="email" required maxlength="180">
          </div>
          <div class="form-row">
            <label for="c-topic">Konu Kategorisi</label>
            <select id="c-topic" name="topic">
              <option>Proje Yaptırma / İş Birliği</option>
              <option>Açık Kaynak Proje Geri Bildirimi</option>
              <option>Makale / İçerik Düzeltmesi</option>
              <option>Güvenlik Bildirimi</option>
              <option>Genel Soru</option>
            </select>
          </div>
          <div class="form-row">
            <label for="c-subject">Konu Başlığı</label>
            <input id="c-subject" name="subject" type="text" required maxlength="140">
          </div>
          <div class="form-row">
            <label for="c-message">Mesajınız</label>
            <textarea id="c-message" name="message" required minlength="10" maxlength="4000"></textarea>
          </div>
          <button type="submit" class="btn btn-accent">E-posta Taslağını Aç ↗</button>
          <p id="form-status" class="form-status" role="status" aria-live="polite"></p>
          <p style="font-size:0.81rem;color:var(--ink-muted);">Güvenliğiniz için parola, API anahtarı veya ödeme bilgilerini forma yazmayın. Ayrıntılar için <a href="gizlilik-politikasi.html">Gizlilik Politikası</a> sayfasını inceleyin.</p>
        </form>
      </div>
    </section>

    <section class="section section-band">
      <div class="wrap grid-3">
        <div class="panel">
          <span class="tag tag-accent">HATA &amp; DÜZELTME</span>
          <h3 style="margin:10px 0 8px;">Teknik Hata Bildirimi</h3>
          <p style="font-size:0.9rem;">Bir açık kaynak projede beklenmedik bir davranışla karşılaşırsanız ilgili <a href="github.html">GitHub deposunda</a> yeni bir Issue açmanız en hızlı yoldur. Kullandığınız tarayıcıyı, işletim sistemini ve hatayı tekrarlayan kısa adımları eklemeniz çözümü kolaylaştırır.</p>
        </div>
        <div class="panel">
          <span class="tag tag-forest">GÜVENLİK</span>
          <h3 style="margin:10px 0 8px;">Sorumlu Güvenlik Bildirimi</h3>
          <p style="font-size:0.9rem;">Herhangi bir <code>*.haking.tr</code> servisinde veya açık kaynak depoda güvenlik zafiyeti tespit ederseniz lütfen herkese açık mecralar yerine doğrudan <strong>${SITE.author.email}</strong> adresine “Güvenlik Bildirimi” konusuyla yazın.</p>
        </div>
        <div class="panel">
          <span class="tag tag-ochre">YANIT &amp; GİZLİLİK</span>
          <h3 style="margin:10px 0 8px;">Dönüş Süresi ve Veri Akışı</h3>
          <p style="font-size:0.9rem;">HaKING bireysel olarak sürdürülen bağımsız bir yayın ve stüdyodur. Mesajlara yoğunluğa bağlı olarak en kısa sürede yanıt verilir; iletişim içerikleri yalnızca ilgili talebi yanıtlamak amacıyla e-posta ortamında işlenir ve üçüncü taraflarla paylaşılmaz.</p>
        </div>
      </div>
    </section>
  `;

  return renderLayout({
    title: 'İletişim | HaKING — Halit Güneş',
    description: 'Halit Güneş (merhaba@haking.tr) ile proje iş birliği, açık kaynak geri bildirimi ve teknik yayın düzeltmeleri hakkında iletişime geçin.',
    canonicalPath: 'iletisim.html',
    activeNav: 'contact',
    breadcrumbs,
    bodyHtml,
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'HaKING İletişim',
        url: `${SITE.domain}/iletisim.html`,
        inLanguage: 'tr-TR',
      },
    ],
  });
}
