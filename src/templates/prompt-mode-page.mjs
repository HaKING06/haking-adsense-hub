import { SITE } from '../data/site.mjs';
import { renderLayout, renderBreadcrumbs, renderAuthorBox, esc } from './layout.mjs';

export function renderPromptModePage() {
  const breadcrumbs = [
    { name: 'Ana Sayfa', href: 'index.html' },
    { name: 'HaKING AI', href: 'proje-haking-ai.html' },
    { name: 'Prompt Modu (v1.19.2)' },
  ];

  const faqs = [
    {
      q: 'HaKING AI Prompt Modu normal sohbetten ne açıdan farklıdır?',
      a: 'Normal sohbet doğrudan tek seferlik yanıt üretir. Prompt Modu ise hedef yapay zekâ agentı (Codex, Claude, Cursor, Gemini vb.) için önce eksik gereksinimleri ücretsiz sorularla netleştirir, kararlarınızı ayrı bir görev kartında (prompt_state) saklar ve nihai üretimde çelişkileri denetleyerek doğrudan kopyalanabilir bir görev promptu üretir.',
    },
    {
      q: 'Prompt Modunu kullanmak kaç kredi harcar?',
      a: 'Prompt Modundaki keşif sohbeti ve eksik bilgileri tamamlayan sorular tamamen ücretsizdir (0 kredi). Araştırma ve denetim aşamasından geçen nihai promptun üretilmesi ise her ay yenilenen 100 ücretsiz HaKING kredisinden yalnızca 5 kredi kullanır.',
    },
    {
      q: 'Sadece yazılım/kodlama işleri için mi çalışıyor?',
      a: 'Hayır. v1.19.0 güncellemesiyle Prompt Modu; kodlama görevlerinin yanında sunum hazırlama, video kurgulama, görsel üretim, yazı/içerik, araştırma ve veri analizi görevlerine göre teslimat biçimini ve kabul ölçütlerini otomatik uyarlar.',
    },
    {
      q: 'Mevcut bir promptumu iyileştirmek için kullanabilir miyim?',
      a: 'Evet. "Şu metni promptlaştır" veya "Mevcut promptumu geliştir" diyerek elinizdeki taslağı yapıştırabilirsiniz; sistem yer tutucuları, çelişkili alan adı/dağıtım hedeflerini ve eksik test ölçütlerini yakalayıp güçlendirir.',
    },
    {
      q: 'Sağlayıcı hatası olursa harcanan 5 kredi iade edilir mi?',
      a: 'Evet. Sağlayıcı hatası veya doğrulama akışı başarısızlığı nedeniyle nihai prompt üretimi gerçekleşmezse kullanılan 5 kredi Neon veritabanı üzerinden hesabınıza geri iade edilir.',
    },
  ];

  const toc = [
    { id: 'neden-prompt-modu', label: 'Neden Prompt Modu?' },
    { id: 'nasil-calisir', label: '4 Adımda Çalışma Akışı' },
    { id: 'canli-karsilastirici', label: 'Önce / Sonra Karşılaştırıcı' },
    { id: 'gorev-turleri', label: 'Desteklenen 7 Görev Türü' },
    { id: 'karar-bellegi', label: 'Prompt Karar Belleği (v1.19.2)' },
    { id: 'vaka-degerlendirme', label: 'Gerçek Sohbet Değerlendirmesi' },
    { id: 'kredi-ve-sinirlar', label: 'Kredi Modeli ve Sınırlar' },
    { id: 'sss', label: 'Sıkça Sorulan Sorular' },
  ];

  const bodyHtml = `
    <header class="page-intro">
      <div class="wrap">
        ${renderBreadcrumbs(breadcrumbs)}
        <div class="eyebrow"><span class="tag tag-accent">YENİ ÖZELLİK · v1.19.2</span> <span class="tag tag-forest">KEŞİF ÜCRETSİZ · NİHAİ ÜRETİM 5 KREDİ</span></div>
        <h1>HaKING AI Prompt Modu:<br>Fikrinden denetlenmiş agent promptuna.</h1>
        <p class="lead">Kısa bir fikri veya dağınık bir taslağı Codex ve diğer yapay zekâ agentlarının ilk seferde doğru uygulayabileceği, kısıtları korunan ve kabul testleriyle güçlendirilmiş Türkçe teknik prompta dönüştüren yeni çalışma atölyesi.</p>
        <div class="actions" style="margin-top:22px;">
          <a class="btn btn-accent" href="https://ai.haking.tr/?mode=prompt" target="_blank" rel="noopener noreferrer">Prompt Modunu Canlı Aç ↗</a>
          <a class="btn btn-secondary" href="https://ai.haking.tr/prompt-yaz" target="_blank" rel="noopener noreferrer">Resmî Prompt Yaz Sayfası ↗</a>
          <a class="btn btn-secondary" href="proje-haking-ai.html">HaKING AI Proje İncelemesi</a>
          <button type="button" class="btn btn-secondary btn-sm" data-bookmark-toggle data-url="haking-ai-prompt-modu.html" data-title="HaKING AI Prompt Modu Rehberi" data-type="Özellik Vitrini">☆ Okuma listesine ekle</button>
        </div>
        <div class="article-meta-bar">
          <a class="author-inline" href="hakkimda.html"><img class="author-avatar-sm" src="assets/images/brand/logo-64.png" alt="" width="28" height="28">${esc(SITE.author.name)}</a>
          <span>Güncelleme: <time datetime="2026-11-27">27 Kasım 2026</time></span>
          <span>Sürüm: <strong>HaKING AI v1.19.2</strong></span>
          <span>11 dk okuma</span>
        </div>
      </div>
    </header>

    <div class="wrap article-shell">
      <aside class="article-aside">
        <nav class="toc-card" aria-label="İçindekiler">
          <div class="toc-title">İçindekiler</div>
          <ul class="toc-list">${toc.map((t) => `<li><a href="#${t.id}">${esc(t.label)}</a></li>`).join('')}</ul>
        </nav>
        <div class="toc-card">
          <div class="toc-title">Hızlı Erişim</div>
          <div style="display:flex;flex-direction:column;gap:8px;">
            <a class="btn btn-accent btn-sm" href="https://ai.haking.tr/?mode=prompt" target="_blank" rel="noopener noreferrer">Canlı Başlat ↗</a>
            <a class="btn btn-secondary btn-sm" href="makale-1.html">HaKING AI Mimarisi</a>
          </div>
        </div>
      </aside>

      <article class="prose prose-wide">
        <details class="mobile-toc">
          <summary>İçindekiler</summary>
          <ul class="toc-list">${toc.map((t) => `<li><a href="#${t.id}">${esc(t.label)}</a></li>`).join('')}</ul>
        </details>

        <figure style="margin:0 0 28px;">
          <img src="assets/images/projects/prompt-mode.webp" alt="HaKING AI Prompt Modu: ham fikirden görev kartına ve denetlenmiş prompta giden süreç" width="1200" height="675" style="border-radius:var(--radius-md);border:1px solid var(--border);box-shadow:var(--shadow-sm);">
          <figcaption style="margin-top:8px;font-size:0.84rem;color:var(--ink-muted);">Prompt Modu mimarisi: dağınık kullanıcı girdileri sohbet keşfiyle yapılandırılmış görev kartına ve doğrulanmış çıktıya dönüşür.</figcaption>
        </figure>

        <h2 id="neden-prompt-modu">Neden ayrı bir Prompt Modu geliştirdim?</h2>
        <p>Kodlama agentlarıyla (Codex, Antigravity, Cursor, Claude Code vb.) çalışan geliştiricilerin büyük çoğunluğu aynı hayal kırıklığını yaşar: kafasında net bir fikir vardır ama tek cümlelik bir komut verdiğinde agent istemediği bir veritabanı kurar, mevcut çalışan arayüzü bozar, alan adı kökünü değiştirir ya da işi test etmeden “tamamlandı” diyerek teslim eder.</p>
        <p>Sorun çoğu zaman modelin zekâsında değil, <strong>eksik tanımlanmış gereksinimlerde ve belirsiz kabul ölçütlerindedir</strong>. Ancak her görevden önce sıfırdan 40 satırlık kusursuz teknik şartname yazmak da ciddi zaman alır. <strong>HaKING AI Prompt Modu</strong> tam bu boşluğu doldurur: fikir aşamasında sizinle sohbet ederek kritik belirsizlikleri açığa çıkarır, neyi kesinleştirdiğinizi ve neyi agente devrettiğinizi ayırır, ardından tüm kurallarınızı koruyan denetlenmiş bir görev promptu üretir.</p>

        <h2 id="nasil-calisir">4 Adımda Prompt Modu Çalışma Akışı</h2>
        <ol>
          <li><strong>Ham Fikri veya Mevcut Taslağı Yaz:</strong> Yeni bir görev tarif edebilir ya da <em>“Şu metni promptlaştır”</em> diyerek mevcut taslağını yapıştırabilirsin. İstersen <em>“basit anlat”</em> veya <em>“teknik anlat”</em> şeklinde anlatım derinliğini belirleyebilirsin.</li>
          <li><strong>Ücretsiz Keşif ve Netleştirme Soruları:</strong> Gerekli hedef, hedef agent, değiştirilmemesi gereken kurallar veya yayın ortamı eksikse HaKING kredi kesmeden yalnızca kritik soruları sorar. Model veya araç seçimini asistana bırakmak ilerlemeyi engellemez.</li>
          <li><strong>Görev Kartı Onayı (Üretim Öncesi Özet):</strong> Nihai prompt yazılmadan önce kesinleşen kullanıcı şartları, agente devredilen seçimler ve hâlâ açık olan sorular şeffaf bir görev kartında gösterilir.</li>
          <li><strong>Araştırma, Bağımsız Denetim ve Kopyalama:</strong> Onay verdiğinde sistem gerektiğinde web araştırması yapar, kalan yer tutucuları, alan adı veya dağıtım çelişkilerini bağımsız denetim katmanından geçirir ve doğrudan agentına yapıştırabileceğin nihai promptu teslim eder.</li>
        </ol>

        <h2 id="canli-karsilastirici">Önce / Sonra Etkileşimli Prompt Karşılaştırıcısı</h2>
        <p>Aşağıdaki sekmelerden bir görev türü seçerek sıradan bir kullanıcı isteğinin HaKING AI Prompt Modu ilkeleriyle nasıl uygulanabilir, sınırları net ve test edilebilir bir agent talimatına dönüştüğünü canlı olarak karşılaştırabilirsiniz:</p>

        <div class="tool-panel" data-prompt-comparator>
          <div class="tool-tabs" role="tablist" aria-label="Prompt örneği seçimi">
            <button type="button" class="tool-tab is-active" data-pm-tab="kod">Kodlama / Mevcut Proje</button>
            <button type="button" class="tool-tab" data-pm-tab="oyun">3D Çok Oyunculu Oyun</button>
            <button type="button" class="tool-tab" data-pm-tab="sunum">Yatırımcı Sunumu</button>
            <button type="button" class="tool-tab" data-pm-tab="gorsel">Editoryal Görsel</button>
          </div>
          <div class="compare-grid">
            <div class="compare-box">
              <span class="compare-label" style="color:var(--accent);">HAM İSTEK (BELİRSİZ)</span>
              <pre data-pm-raw></pre>
            </div>
            <div class="compare-box compare-box-good">
              <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px;">
                <span class="compare-label" style="color:var(--forest);margin:0;">PROMPT MODU ÇIKTISI (DENETLENMİŞ)</span>
                <button type="button" class="btn btn-secondary btn-sm" data-pm-copy data-copy-text="">Kopyala</button>
              </div>
              <pre data-pm-out></pre>
            </div>
          </div>
        </div>

        <h2 id="gorev-turleri">v1.19.0 ile Desteklenen 7 Görev Türü</h2>
        <p>İlk sürümlerde yalnızca yazılım ve kodlama agentlarına odaklanan Prompt Modu, <strong>v1.19.0</strong> sürümüyle birlikte çok disiplinli teslimat uyarlaması kazandı:</p>
        <div class="table-scroll">
          <table>
            <thead>
              <tr><th>Görev Türü</th><th>Otomatik Eklenen Kritik Kontroller</th><th>Örnek Kullanım</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Kodlama &amp; Agent</strong></td><td>Mevcut kod incelemesi, korunacak kurallar, dağıtım/alan adı uyumu, kabul testi</td><td>Mevcut web uygulamasına yeni modül veya API ekleme</td></tr>
              <tr><td><strong>Sunum</strong></td><td>Slayt sayısı, hedef kitle, düzenlenebilir format ve uydurma veri yasağı</td><td>Yatırımcılar için 8 slaytlık ürün sunumu</td></tr>
              <tr><td><strong>Video</strong></td><td>Klip kaynakları, dikey/yatay oran, tempo, altyazı ve sahne geçişleri</td><td>Kısa dikey tanıtım videosu kurgu planı</td></tr>
              <tr><td><strong>Görsel</strong></td><td>Renk paleti sınırları, kompozisyon, oran ve istenmeyen öğe kısıtları</td><td>Marka renklerine sadık ürün kapak görseli</td></tr>
              <tr><td><strong>Yazı &amp; Editoryal</strong></td><td>Ton, kaynak doğrulaması, yapısal başlıklar ve şeffaflık kuralları</td><td>Teknik blog yazısı veya sürüm bülteni</td></tr>
              <tr><td><strong>Araştırma</strong></td><td>Kaynak sırası (ör. konsept öncesi piyasa taraması) ve doğrulanabilirlik</td><td>Oyun konsepti öncesi Steam pazar incelemesi</td></tr>
              <tr><td><strong>Veri Analizi</strong></td><td>Girdi şeması, hesaplama yöntemi, kenar durumlar ve çıktı tablosu</td><td>CSV satış kayıtlarından kâr/marj analizi</td></tr>
            </tbody>
          </table>
        </div>

        <h2 id="karar-bellegi">Prompt Karar Belleği (<code>prompt_state</code>) ve Bağlam Yalıtımı</h2>
        <p>v1.10.0’dan v1.19.2’ye kadar yapılan en kritik mühendislik iyileştirmeleri, uzun sohbetlerde bilgi kaybını ve görevlerin birbirine karışmasını önlemek üzerine kuruldu:</p>
        <ul>
          <li><strong>Oturum Yalıtımı:</strong> Normal sohbet veya Çılgın Mod geçmişi, Prompt Moduna ilk girişte otomatik gereksinim olarak alınmaz. “Yeni görev” düğmesi eski konuşmaları silmeden temiz bir görev bağlamı başlatır.</li>
          <li><strong>Devredilen Seçimlerin Korunması (v1.19.1):</strong> Kullanıcı “altyapıyı sen seç” veya “hazır varlık kullanabilirsin” dediğinde bu izin uzun görevlerde kaybolmaz, görev kartında açıkça taşınır.</li>
          <li><strong>Bağımsız Çelişki Denetimi (v1.12.0–v1.17.0):</strong> Alan adı kökünün değişmesi, kalan şablon yer tutucuları, ayrı frontend/backend dağıtım hedefleri ve güncel Wrangler komutları nihai üretimde ayrı bir denetim katmanından geçirilir.</li>
          <li><strong>Tekrarlı Hatalarda Güvenli Yedek (v1.17.2):</strong> Sağlayıcı tarafında teknik taslak hatası tekrarlanırsa sistem çökmez; doğrulanmış görev kartından temiz, kopyalanabilir yedek prompt hazırlar.</li>
        </ul>

        <h2 id="vaka-degerlendirme">Gerçek Bir Sohbette Prompt Modu Nasıl Çalıştı?</h2>
        <p>Şeffaflık ilkemiz gereği yalnızca güçlü yanları değil, bağımsız değerlendirmelerde tespit edilen gelişim alanlarını da açıkça paylaşıyoruz. v1.19.2 sürümü kapsamında bir kullanıcının Codex için 3D çok oyunculu tarayıcı oyunu talep ettiği gerçek bir sohbet iki ayrı büyük dil modeline değerlendirtildi:</p>
        <div class="grid-2" style="margin:18px 0;">
          <div class="panel">
            <span class="tag tag-forest">CHATGPT DEĞERLENDİRMESİ · 4 / 5 ÖLÇÜT</span>
            <h3 style="margin:10px 0 8px;">Güçlü yönler ve tespit</h3>
            <p style="font-size:0.9rem;">Eşzamanlı oyun şartı, ücretsiz altyapı ve SQL yasağı, yayın hedefleri ile konsept öncesi Steam araştırma sırası eksiksiz korundu. <strong>Gelişim alanı:</strong> Metin sadeliği ölçütü — bazı kuralların birden fazla bölümde tekrarlandığı not edildi.</p>
          </div>
          <div class="panel">
            <span class="tag tag-accent">GEMİNİ DEĞERLENDİRMESİ · 9,7 / 10</span>
            <h3 style="margin:10px 0 8px;">Güçlü yönler ve tespit</h3>
            <p style="font-size:0.9rem;">Araştırma adımının konsept seçiminden önceye alınması, iki istemcili somut kabul testi ve devredilen kararların korunması olumlu değerlendirildi. <strong>Gelişim alanı:</strong> Ham ve düzenlenmiş şartların gereksiz tekrarı (v1.19.1’de yedek kart tekrarları azaltıldı).</p>
          </div>
        </div>
        <div class="callout">
          <span class="callout-title">Ölçüm Şeffaflığı</span>
          <p>Bu değerlendirmeler tek bir sohbet örneği üzerinde alınan nitel geri bildirimlerdir; farklı yöntemlere dayanır ve oyunun fiilen üretilip yayına alınma başarısını tek başına ölçmez.</p>
        </div>

        <h2 id="kredi-ve-sinirlar">Ortak Kredi Modeli ve Bilinen Sınırlar</h2>
        <p>HaKING AI hesabındaki her kullanıcı her takvim ayında <strong>100 ücretsiz HaKING kredisi</strong> alır. Prompt Modunda keşif soruları ücretsizdir; nihai denetlenmiş prompt üretimi <strong>5 kredi</strong> (Çılgın Mod ise 10 kredi) kullanır. İki mod aynı bakiyeyi paylaşır. Codex model önerileri resmî model sayfasından günlük önbellekle kontrol edilir; canlı kaynağa ulaşılamadığında doğrulama tarihi açıkça bildirilir ve hesapta bulunmayan kota veya model vaat edilmez.</p>

        <h2 id="sss">Sıkça Sorulan Sorular</h2>
        <div class="faq-list">
          ${faqs.map((f) => `<details class="faq-item"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}
        </div>

        <div class="cta-band" style="margin-top:34px;">
          <div>
            <div class="eyebrow">HEMEN DENE</div>
            <h2>Kendi fikrini şimdi Prompt Modunda test et.</h2>
            <p>Keşif aşaması ücretsizdir; görev kartını onaylamadan kredi harcanmaz.</p>
          </div>
          <div class="actions">
            <a class="btn" href="https://ai.haking.tr/?mode=prompt" target="_blank" rel="noopener noreferrer">Prompt Modunu Aç ↗</a>
            <a class="btn btn-secondary" href="proje-haking-ai.html">HaKING AI Detayları</a>
          </div>
        </div>

        ${renderAuthorBox()}
      </article>
    </div>
  `;

  return renderLayout({
    title: 'HaKING AI Prompt Modu (v1.19.2) — AI Agentlar İçin Türkçe Prompt Atölyesi | HaKING',
    description:
      'HaKING AI Prompt Modu nasıl çalışır? Görev kartı (prompt_state), ücretsiz keşif soruları, 7 görev türü, gerçek sohbet değerlendirmesi ve canlı öncesi/sonrası prompt karşılaştırıcısı.',
    canonicalPath: 'haking-ai-prompt-modu.html',
    activeNav: 'prompt-mode',
    ogImage: 'assets/images/projects/prompt-mode.webp',
    ogType: 'article',
    breadcrumbs,
    showReadingBar: true,
    bodyHtml,
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: 'HaKING AI Prompt Modu (v1.19.2): Fikrinden Denetlenmiş AI Agent Promptuna',
        description: 'Codex ve diğer AI agentları için Türkçe görev kartı, bağımsız çelişki denetimi ve yapılandırılmış prompt üretimi rehberi.',
        image: `${SITE.domain}/assets/images/projects/prompt-mode.webp`,
        datePublished: '2026-11-27',
        dateModified: '2026-11-27',
        inLanguage: 'tr-TR',
        author: { '@id': `${SITE.domain}/#person` },
        publisher: { '@id': `${SITE.domain}/#person` },
        mainEntityOfPage: `${SITE.domain}/haking-ai-prompt-modu.html`,
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
