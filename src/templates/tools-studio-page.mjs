import { SITE } from '../data/site.mjs';
import { renderLayout, renderBreadcrumbs, esc } from './layout.mjs';

export function renderToolsStudioPage() {
  const breadcrumbs = [
    { name: 'Ana Sayfa', href: 'index.html' },
    { name: 'Online Araçlar Stüdyosu' },
  ];

  const faqs = [
    {
      q: 'Bu sayfadaki araçlar verilerimi herhangi bir sunucuya gönderiyor mu?',
      a: 'Hayır. Prompt kurucu, CS2 Valve cent hesaplayıcı, WCAG renk kontrast stüdyosu, not hesaplayıcı ve Google SERP önizleyici tamamen kendi tarayıcınızda (client-side JavaScript) çalışır; girdiğiniz hiçbir değer sunucularımıza gönderilmez.',
    },
    {
      q: 'CS2 Valve komisyon hesabı neden düz %15 almaktan farklı sonuç verir?',
      a: 'Valve, Steam Topluluk Pazarında %5 Steam işlem ücreti ile %10 CS2 oyun ücretini ayrı ayrı hesaplar ve her iki kesintiyi tam cent (floor, minimum $0.01) kurallarıyla yuvarlar. Bu yüzden alıcı fiyatından satıcı cüzdanına geçen net tutar özellikle düşük fiyatlı öğelerde düz %15 formülünden sapar.',
    },
    {
      q: 'WCAG AA ve AAA kontrast oranları ne anlama gelir?',
      a: 'WCAG 2.1 erişilebilirlik standardına göre normal gövde metni için en az 4.5:1 kontrast oranı (AA), gelişmiş okunabilirlik için 7.0:1 (AAA) önerilir. Büyük başlıklar (18pt veya kalın 14pt ve üzeri) için AA eşiği 3.0:1 olarak kabul edilir.',
    },
    {
      q: 'Daha gelişmiş sürümler için hangi HaKING projelerini açabilirim?',
      a: 'Çok turlu görev kartlı prompt üretimi için ai.haking.tr/?mode=prompt, 6.000+ skinlik gerçek zamanlı arbitraj için spread.haking.tr, çoklu renk paleti ve CSS/Tailwind dışa aktarımı için copyhex.haking.tr ve dönemlik ders takibi için notmatik.haking.tr servislerini ücretsiz kullanabilirsiniz.',
    },
  ];

  const bodyHtml = `
    <header class="page-intro">
      <div class="wrap">
        ${renderBreadcrumbs(breadcrumbs)}
        <div class="eyebrow"><span class="eyebrow-dot"></span> TARAYICI İÇİ 5 ÜCRETSİZ ARAÇ · SIFIR KAYIT · ANLIK SONUÇ</div>
        <h1>HaKING Online Mühendislik ve Hesaplama Stüdyosu.</h1>
        <p class="lead">Geliştiriciler, tasarımcılar, öğrenciler ve CS2 pazar takipçileri için hesap açmadan doğrudan bu sayfada çalışan <strong>5 yerel öncelikli araç</strong>. Tüm hesaplamalar cihazınızda anında yapılır.</p>
        <div class="actions" style="margin-top:20px;">
          <a class="btn btn-accent btn-sm" href="#arac-prompt">1. AI Prompt Kurucu</a>
          <a class="btn btn-secondary btn-sm" href="#arac-valve">2. CS2 Valve Cent</a>
          <a class="btn btn-secondary btn-sm" href="#arac-renk">3. Renk &amp; WCAG Kontrast</a>
          <a class="btn btn-secondary btn-sm" href="#arac-not">4. Ağırlıklı Not</a>
          <a class="btn btn-secondary btn-sm" href="#arac-serp">5. Google SERP &amp; SEO</a>
        </div>
      </div>
    </header>

    <section class="section wrap" style="display:flex;flex-direction:column;gap:36px;">

      <!-- TOOL 1: AI AGENT PROMPT BUILDER -->
      <article class="panel tool-studio-card" id="arac-prompt">
        <div class="tool-studio-head">
          <div>
            <span class="tag tag-accent">ARAÇ 01 · YAPAY ZEKÂ</span>
            <h2 style="margin-top:8px;">AI Agent Prompt Kurucu (Prompt Modu Mini)</h2>
            <p style="font-size:0.93rem;margin:6px 0 0;">Dağınık bir isteği Codex, Claude Code, Cursor veya Antigravity gibi agentların ilk seferde hatasız uygulayabileceği yapılandırılmış Türkçe teknik prompta dönüştürün.</p>
          </div>
          <a class="btn btn-secondary btn-sm" href="https://ai.haking.tr/?mode=prompt" target="_blank" rel="noopener noreferrer">Tam Prompt Modu ↗</a>
        </div>

        <div class="grid-2" style="margin-top:20px;align-items:start;" data-prompt-builder>
          <div class="form-grid">
            <div class="grid-2">
              <div class="form-row">
                <label for="pb-agent">Hedef AI Agent</label>
                <select id="pb-agent">
                  <option>Codex / Antigravity / Claude Code</option>
                  <option>Cursor / Windsurf IDE Agent</option>
                  <option>Genel Sohbet Modeli (Gemini / ChatGPT)</option>
                  <option>Görsel / Tasarım Üretim Modeli</option>
                </select>
              </div>
              <div class="form-row">
                <label for="pb-type">Görev Türü</label>
                <select id="pb-type">
                  <option>Mevcut Projeye Özellik Ekleme</option>
                  <option>Sıfırdan Web Uygulaması / Araç</option>
                  <option>Hata Ayıklama ve Performans İyileştirme</option>
                  <option>Teknik Makale / Sunum Taslağı</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <label for="pb-goal">Kısa Görev Tanımı</label>
              <textarea id="pb-goal" style="min-height:92px;" placeholder="Örn. Mevcut statik siteme koyu/açık tema uyumlu, kırık linkleri kontrol eden bir sayfa ekle...">Mevcut statik web projeme mobil uyumlu, hızlı açılan ve SEO meta verileri tam yeni bir araç sayfası ekle.</textarea>
            </div>

            <div class="form-row">
              <label>Zorunlu Koruma Kuralları</label>
              <div class="checkbox-grid">
                <label class="check-card"><input type="checkbox" name="pb-rule" value="Önce mevcut dosya yapısını ve tasarım sistemini oku; çalışan özellikleri bozma." checked><span>Mevcut kodu koru</span></label>
                <label class="check-card"><input type="checkbox" name="pb-rule" value="Ek ücretli servis, gereksiz veritabanı veya ağır framework ekleme." checked><span>Gereksiz bağımlılık ekleme</span></label>
                <label class="check-card"><input type="checkbox" name="pb-rule" value="Mobil (390px) ve masaüstü görünümlerde taşma ile erişilebilirlik kontrolü yap." checked><span>Mobil &amp; UI testi yap</span></label>
                <label class="check-card"><input type="checkbox" name="pb-rule" value="Teslim özetinde değişen dosyaları, çalıştırılan doğrulamaları ve varsa açık riskleri listele." checked><span>Doğrulama raporu ver</span></label>
              </div>
            </div>
          </div>

          <div>
            <div class="code-block" style="margin:0;">
              <div class="code-head">
                <span>denetlenmis-agent-promptu.md</span>
                <button type="button" class="copy-code-btn" id="pb-copy-btn" data-copy-text="">Promptu Kopyala</button>
              </div>
              <pre id="pb-output" style="white-space:pre-wrap;min-height:245px;"></pre>
            </div>
            <p style="font-size:0.82rem;color:var(--ink-muted);margin:10px 0 0;">Çok turlu karar belleği, web araştırması ve çelişki denetimi için <a href="haking-ai-prompt-modu.html">HaKING AI Prompt Modu v1.19.2 rehberini</a> inceleyin.</p>
          </div>
        </div>
      </article>

      <!-- TOOL 2: CS2 VALVE CENT COMMISSION & BREAK-EVEN -->
      <article class="panel tool-studio-card" id="arac-valve">
        <div class="tool-studio-head">
          <div>
            <span class="tag tag-forest">ARAÇ 02 · CS2 EKONOMİ</span>
            <h2 style="margin-top:8px;">CS2 Valve Cent Komisyon, Net Kâr &amp; Başa Baş Hesaplayıcı</h2>
            <p style="font-size:0.93rem;margin:6px 0 0;">Steam Topluluk Pazarının gerçek <code>floor</code> tam-cent kesinti tablosuyla (%5 Steam + %10 CS2, min $0.01) net cüzdan gelirini, ROI oranını ve zarar etmemek için gereken <strong>minimum satış fiyatını</strong> hesaplar.</p>
          </div>
          <div class="actions">
            <a class="btn btn-secondary btn-sm" href="https://spread.haking.tr/" target="_blank" rel="noopener noreferrer">SPREAD V11.1 ↗</a>
            <a class="btn btn-secondary btn-sm" href="https://csell.haking.tr/" target="_blank" rel="noopener noreferrer">CSELL ↗</a>
          </div>
        </div>

        <div class="tool-panel" style="margin:18px 0 0;" data-valve-sim>
          <div class="grid-3">
            <div class="form-row"><label for="vc-buy">Alış Maliyeti ($ USD)</label><input id="vc-buy" type="number" min="0.01" max="50000" step="0.01" value="68.50"></div>
            <div class="form-row"><label for="vc-sell">Steam Alıcı Satış Fiyatı ($ USD)</label><input id="vc-sell" type="number" min="0.03" max="50000" step="0.01" value="94.90"></div>
            <div class="form-row"><label for="vc-qty">Adet</label><input id="vc-qty" type="number" min="1" max="500" step="1" value="1"></div>
          </div>
          <div id="vc-result" class="callout callout-forest" style="margin:16px 0 0;" aria-live="polite"></div>
          <p id="vc-breakeven" class="mono" style="margin:10px 0 0;font-size:0.83rem;color:var(--ink-2);" aria-live="polite"></p>
        </div>
      </article>

      <!-- TOOL 3: OKLCH / HEX / WCAG CONTRAST STUDIO -->
      <article class="panel tool-studio-card" id="arac-renk">
        <div class="tool-studio-head">
          <div>
            <span class="tag tag-ochre">ARAÇ 03 · TASARIM &amp; ERİŞİLEBİLİRLİK</span>
            <h2 style="margin-top:8px;">Renk Dönüştürücü (HEX · RGB · HSL · OKLCH) &amp; WCAG Kontrast Stüdyosu</h2>
            <p style="font-size:0.93rem;margin:6px 0 0;">Açık ve koyu arayüzler için metin/zemin kontrast oranını WCAG 2.1 AA/AAA standartlarına göre ölçün, algısal <strong>OKLCH</strong> karşılığını alın ve CSS token olarak kopyalayın.</p>
          </div>
          <a class="btn btn-secondary btn-sm" href="https://copyhex.haking.tr/" target="_blank" rel="noopener noreferrer">CopyHex Stüdyosu ↗</a>
        </div>

        <div class="grid-2" style="margin-top:20px;align-items:start;" data-color-studio>
          <div class="form-grid">
            <div class="grid-2">
              <div class="form-row">
                <label for="cs-fg-hex">Metin / Ön Plan Rengi</label>
                <div class="color-input-row">
                  <input id="cs-fg-pick" type="color" value="#EEEAE1" aria-label="Ön plan renk seçici">
                  <input id="cs-fg-hex" type="text" value="#EEEAE1" maxlength="7" class="mono">
                </div>
              </div>
              <div class="form-row">
                <label for="cs-bg-hex">Arka Plan Rengi</label>
                <div class="color-input-row">
                  <input id="cs-bg-pick" type="color" value="#121415" aria-label="Arka plan renk seçici">
                  <input id="cs-bg-hex" type="text" value="#121415" maxlength="7" class="mono">
                </div>
              </div>
            </div>

            <div class="actions">
              <button type="button" class="btn btn-secondary btn-sm" data-cs-preset="#EEEAE1|#121415">HaKING Koyu</button>
              <button type="button" class="btn btn-secondary btn-sm" data-cs-preset="#161819|#F6F3EC">HaKING Açık</button>
              <button type="button" class="btn btn-secondary btn-sm" data-cs-preset="#FFFFFF|#B83B1A">Terakota CTA</button>
              <button type="button" class="btn btn-secondary btn-sm" data-cs-preset="#FFFFFF|#165C45">Çam Yeşili</button>
              <button type="button" class="btn btn-secondary btn-sm" id="cs-swap">⇄ Değiştir</button>
            </div>

            <div class="table-scroll" style="margin:0;">
              <table>
                <thead><tr><th>Format</th><th>Ön Plan</th><th>Arka Plan</th></tr></thead>
                <tbody>
                  <tr><th>RGB</th><td class="mono" id="cs-fg-rgb"></td><td class="mono" id="cs-bg-rgb"></td></tr>
                  <tr><th>HSL</th><td class="mono" id="cs-fg-hsl"></td><td class="mono" id="cs-bg-hsl"></td></tr>
                  <tr><th>OKLCH</th><td class="mono" id="cs-fg-oklch"></td><td class="mono" id="cs-bg-oklch"></td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div style="display:flex;flex-direction:column;gap:14px;">
            <div id="cs-preview" class="color-preview-box">
              <span class="mono" style="font-size:0.74rem;letter-spacing:0.08em;text-transform:uppercase;opacity:0.8;">CANLI TİPOGRAFİ ÖNİZLEMESİ</span>
              <h3 style="margin:6px 0;font-size:1.45rem;color:inherit;">Gerçek okunabilirlik kontrastla başlar.</h3>
              <p style="margin:0;font-size:0.94rem;color:inherit;opacity:0.92;">Bu metin seçtiğiniz ön plan ve arka plan renklerinin gerçek ekran okunabilirliğini WCAG 2.1 standartlarına göre anlık olarak gösterir.</p>
            </div>

            <div class="wcag-score-bar">
              <div>
                <span class="mono" style="font-size:0.74rem;color:var(--ink-muted);">WCAG 2.1 KONTRAST ORANI</span>
                <div id="cs-ratio" style="font-family:var(--font-display);font-size:1.9rem;font-weight:700;line-height:1.1;">-- : 1</div>
              </div>
              <div class="wcag-badges" id="cs-badges"></div>
            </div>

            <button type="button" class="btn btn-accent btn-sm" id="cs-copy-css" data-copy-text="">CSS Değişkenlerini Kopyala</button>
          </div>
        </div>
      </article>

      <!-- TOOL 4: WEIGHTED GRADE SIMULATOR -->
      <article class="panel tool-studio-card" id="arac-not">
        <div class="tool-studio-head">
          <div>
            <span class="tag tag-accent">ARAÇ 04 · EĞİTİM &amp; ÖĞRENCİ</span>
            <h2 style="margin-top:8px;">Üniversite Ağırlıklı Not &amp; Hedef Final Hesaplayıcı (NotMatik Mini)</h2>
            <p style="font-size:0.93rem;margin:6px 0 0;">Vize ve ödev/lab ağırlıklarını girerek hedeflediğiniz dönem ortalamasına ulaşmak için final sınavından almanız gereken minimum puanı anında hesaplayın.</p>
          </div>
          <a class="btn btn-secondary btn-sm" href="https://notmatik.haking.tr/" target="_blank" rel="noopener noreferrer">NotMatik v3.0 ↗</a>
        </div>

        <div class="tool-panel" style="margin:18px 0 0;" data-grade-sim>
          <div class="grid-3">
            <div class="form-row"><label for="sim-vize">Vize Notu (0–100)</label><input id="sim-vize" type="number" min="0" max="100" value="64"></div>
            <div class="form-row"><label for="sim-vize-w">Vize Ağırlığı (%)</label><input id="sim-vize-w" type="number" min="0" max="90" value="30"></div>
            <div class="form-row"><label for="sim-odev">Ödev / Lab Notu (0–100)</label><input id="sim-odev" type="number" min="0" max="100" value="82"></div>
            <div class="form-row"><label for="sim-odev-w">Ödev Ağırlığı (%)</label><input id="sim-odev-w" type="number" min="0" max="80" value="15"></div>
            <div class="form-row"><label for="sim-hedef">Hedef Ortalama</label><input id="sim-hedef" type="number" min="1" max="100" value="70"></div>
          </div>
          <div id="sim-result" class="callout callout-forest" style="margin:16px 0 0;" aria-live="polite"></div>
        </div>
      </article>

      <!-- TOOL 5: GOOGLE SERP & TECHNICAL SEO PREVIEWER -->
      <article class="panel tool-studio-card" id="arac-serp">
        <div class="tool-studio-head">
          <div>
            <span class="tag tag-forest">ARAÇ 05 · TEKNİK SEO &amp; YAYINCILIK</span>
            <h2 style="margin-top:8px;">Google SERP, Meta Uzunluk &amp; Okuma Süresi Önizleyici</h2>
            <p style="font-size:0.93rem;margin:6px 0 0;">Sayfa başlığınızın ve meta açıklamanızın Google arama sonuçlarında kesilmeden nasıl görüneceğini canlı test edin; taslak metninizin tahmini okuma süresini ölçün.</p>
          </div>
          <a class="btn btn-secondary btn-sm" href="haber-statik-site-uretimi-ve-teknik-seo.html">Teknik SEO Rehberi →</a>
        </div>

        <div class="grid-2" style="margin-top:20px;align-items:start;" data-serp-tool>
          <div class="form-grid">
            <div class="form-row">
              <label for="serp-title">Sayfa Başlığı (<code>&lt;title&gt;</code>) · <span class="mono" id="serp-title-stat">0 / 60</span></label>
              <input id="serp-title" type="text" maxlength="120" value="HaKING — Açık Kaynak Yazılım Stüdyosu & Teknoloji Yayını">
            </div>
            <div class="form-row">
              <label for="serp-url">Görünen URL Yolu</label>
              <input id="serp-url" type="text" maxlength="120" value="https://haking.tr/araclar.html" class="mono">
            </div>
            <div class="form-row">
              <label for="serp-desc">Meta Açıklama (<code>description</code>) · <span class="mono" id="serp-desc-stat">0 / 155</span></label>
              <textarea id="serp-desc" style="min-height:84px;" maxlength="320">Yapay zekâ prompt kurucu, CS2 Valve cent hesaplayıcı, OKLCH & WCAG kontrast stüdyosu, not hesaplayıcı ve Google SERP önizleyici tek sayfada ücretsiz.</textarea>
            </div>
            <div class="form-row">
              <label for="serp-body">İçerik Metni (Kelime &amp; Okuma Süresi Ölçümü)</label>
              <textarea id="serp-body" style="min-height:84px;" placeholder="Makale veya sayfa metninizi buraya yapıştırarak kelime sayısını ve tahmini okuma süresini ölçün...">Statik HTML sayfaları kenar önbellekten milisaniyeler içinde servis edilir. Doğru yapılandırılmış başlık, kanonik URL ve JSON-LD şemaları Google, Bing ve yapay zekâ arama motorlarında görünürlüğü güçlendirir.</textarea>
            </div>
          </div>

          <div style="display:flex;flex-direction:column;gap:14px;">
            <div class="serp-preview-card">
              <div class="serp-preview-crumb">
                <img src="assets/images/brand/logo-64.png" alt="" width="20" height="20" style="border-radius:4px;">
                <div>
                  <strong style="font-size:0.84rem;display:block;line-height:1.1;">haking.tr</strong>
                  <span class="mono" id="serp-out-url" style="font-size:0.74rem;color:var(--ink-muted);">https://haking.tr/araclar.html</span>
                </div>
              </div>
              <div id="serp-out-title" class="serp-preview-title"></div>
              <p id="serp-out-desc" class="serp-preview-desc"></p>
            </div>

            <div class="callout" id="serp-metrics" style="margin:0;" aria-live="polite"></div>
          </div>
        </div>
      </article>

    </section>

    <section class="section section-band">
      <div class="wrap prose prose-wide">
        <h2>Neden yerel öncelikli (client-side) ücretsiz araçlar geliştiriyoruz?</h2>
        <p>Birçok çevrimiçi hesaplayıcı ve yardımcı araç, basit bir matematiksel işlem için bile kullanıcıyı üyelik duvarlarına, yavaş sunucu gidiş-gelişlerine veya aşırı izleyici betiklerine maruz bırakır. <strong>HaKING Online Araçlar Stüdyosu</strong> ise tam tersi bir mühendislik ilkesiyle çalışır: tüm hesaplama mantığı tarayıcınızda milisaniyeler içinde yürütülür, internet bağlantısı dalgalansa dahi formunuz sıfırlanmaz ve girdiğiniz veriler cihazınızdan dışarı çıkmaz.</p>
        <p>Buradaki araçların her biri doğrudan <a href="projects.html">15 açık kaynak GitHub projemizden</a> birinin çekirdek algoritmasını taşır: Prompt Kurucu <a href="haking-ai-prompt-modu.html">HaKING AI Prompt Modu</a>’nun görev kartı disiplininden, Valve Cent hesaplayıcısı <a href="proje-spread.html">SPREAD V11.1</a> ve <a href="proje-csell.html">CSELL</a> motorundan, WCAG/OKLCH stüdyosu <a href="proje-copyhex.html">CopyHex</a>’ten ve ağırlıklı ortalama hesaplayıcısı <a href="proje-notmatik.html">NotMatik v3.0</a>’dan beslenir.</p>

        <h2>Sıkça Sorulan Sorular</h2>
        <div class="faq-list">
          ${faqs.map((f) => `<details class="faq-item"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}
        </div>
      </div>
    </section>
  `;

  return renderLayout({
    title: 'Ücretsiz Online Mühendislik Araçları (5 Araç) | HaKING',
    description:
      'AI Agent Prompt Kurucu, CS2 Valve Cent komisyon ve başa baş hesaplayıcı, OKLCH & WCAG kontrast stüdyosu, üniversite not hesaplayıcı ve Google SERP önizleyici — sıfır kayıtla tarayıcıda ücretsiz çalışır.',
    canonicalPath: 'araclar.html',
    activeNav: 'tools',
    breadcrumbs,
    bodyHtml,
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'HaKING Online Mühendislik ve Hesaplama Stüdyosu',
        url: `${SITE.domain}/araclar.html`,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web',
        inLanguage: 'tr-TR',
        author: { '@id': `${SITE.domain}/#person` },
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
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
