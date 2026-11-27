export const NEWS_ARTICLES = [
  {
    slug: 'haber-yapay-zeka-agent-kodlama-2026',
    file: 'haber-yapay-zeka-agent-kodlama-2026.html',
    kind: 'Teknoloji Analizi',
    category: 'Yapay Zekâ',
    projectSlug: 'haking-ai',
    date: '2026-11-27',
    dateDisplay: '27 Kasım 2026',
    readTime: '9 dk okuma',
    featured: true,
    title: 'Yapay Zekâ Agentlarıyla Kodlama 2026: Neden İyi Görev Şartnamesi ve Kabul Testi Model Seçiminden Daha Önemlidir?',
    shortDesc:
      'Otonom kodlama agentları yaygınlaşırken ekiplerin en büyük darboğazı artık kod üretme hızı değil; belirsiz gereksinimler, unutulan kısıtlar ve doğrulanmamış teslimatlar.',
    image: 'assets/images/projects/prompt-mode.webp',
    tags: ['AI Agent', 'Prompt Mühendisliği', 'Kabul Testi', 'HaKING AI'],
    sections: [
      {
        id: 'model-yarisi-vs-baglam',
        heading: 'Daha büyük model tek başına neden daha doğru yazılım üretmez?',
        html: `
          <p>2026 itibarıyla yazılım geliştirme dünyasında tartışma “hangi model daha hızlı kod yazar?” sorusundan “hangi iş akışı ilk seferde doğru, bozulmamış ve test edilmiş teslimat üretir?” sorusuna kaydı. En güçlü kodlama agentlarına bile tek cümlelik belirsiz bir komut verildiğinde aynı üç arıza tekrarlanır: mevcut çalışan yapının gereksiz yere bozulması, istenmeyen harici bağımlılık/veritabanı eklenmesi ve test edilmeden “hazır” bildirimi yapılması.</p>
          <p>Bu davranışın temel sebebi modelin yetersizliği değil, <strong>eksik bırakılan karar alanlarının model tarafından varsayımla doldurulmasıdır</strong>. Bir geliştirici zihninde “statik kalsın, SQL eklenmesin, alan adı kökü bozulmasın” diye düşünür ama bunu komuta yazmazsa agent kendi istatistiksel ortalamasına göre ağır bir mimari kurabilir.</p>
        `,
      },
      {
        id: 'uc-sutun',
        heading: 'Üretim kalitesinde agent görevlendirmenin 3 temel sütunu',
        html: `
          <div class="table-scroll">
            <table>
              <thead>
                <tr><th>Sütun</th><th>Eksik Olduğunda Ne Olur?</th><th>Doğru Uygulama</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>1. Değişmez Kısıtlar</strong></td><td>Mevcut tasarım, alan adı veya ücretsiz altyapı sınırı sessizce bozulur.</td><td>“Mevcut kontrolleri koru, yeni SQL servisi ekleme” gibi açık yasak listesi.</td></tr>
                <tr><td><strong>2. Devredilen Kararlar</strong></td><td>Agent ya gereksiz soru sorarak tıkanır ya da yanlış konuda inisiyatif alır.</td><td>Hangi kararın kesin, hangisinin agente bırakıldığını açıkça ayırmak.</td></tr>
                <tr><td><strong>3. Ölçülebilir Kabul Testi</strong></td><td>Kod derlenir ama gerçek kullanıcı akışında çalışmaz.</td><td>“İki tarayıcı oturumu aynı odaya katılıp maçı bitirsin ve rövanş açsın.”</td></tr>
              </tbody>
            </table>
          </div>
          <p><a href="haking-ai-prompt-modu.html">HaKING AI Prompt Modu (v1.19.2)</a> tam olarak bu üç sütunu sohbet içinde otomatikleştirmek için tasarlandı: önce eksik kısıtları ücretsiz sorularla netleştiriyor, kararları ayrı bir görev kartında (<code>prompt_state</code>) koruyor ve teslimden önce çelişki denetimi çalıştırıyor.</p>
        `,
      },
      {
        id: 'insan-denetimi',
        heading: 'Geliştiricinin yeni rolü: satır yazmaktan sistem doğrulamaya',
        html: `
          <p>Kod üretiminin hızlanması yazılım mühendisliği disiplinini azaltmaz; aksine <strong>mimari sınır çizme, güvenlik incelemesi ve uçtan uca doğrulama</strong> becerilerini her zamankinden değerli kılar. Agent çıktısını körü körüne birleştirmek yerine otomatik doğrulama betikleri (<code>verify.mjs</code>, tip denetimi, kırık link ve mobil görünüm testleri) kurmak, hız kazanımını gerçek kaliteye dönüştüren tek sürdürülebilir yoldur.</p>
        `,
      },
    ],
    faqs: [
      {
        q: 'Kısa bir düzeltme için bile uzun prompt yazmak gerekir mi?',
        a: 'Küçük, tek dosyalık bir hata düzeltmesinde kısa ve hedefli bir açıklama yeterlidir. Yapılandırılmış görev kartı özellikle yeni modül, çok dosyalı yeniden tasarım veya yayın ortamı içeren işlerde büyük hata payını ortadan kaldırır.',
      },
    ],
  },

  {
    slug: 'haber-cloudflare-workers-edge-mimarisi',
    file: 'haber-cloudflare-workers-edge-mimarisi.html',
    kind: 'Altyapı Analizi',
    category: 'Tasarım & Web',
    projectSlug: 'spread',
    date: '2026-11-26',
    dateDisplay: '26 Kasım 2026',
    readTime: '9 dk okuma',
    featured: true,
    title: 'Sunucusuz Kenar (Edge) Dağıtımı: Cloudflare Workers ve Statik Varlıklarla Sıfır Maliyetli Yüksek Hız',
    shortDesc:
      'HaKING AI, SPREAD, ÇevirmenX ve CSNAME gibi canlı servisleri neden Cloudflare Workers + Static Assets mimarisiyle yayınlıyorum? Avantajlar, limitler ve güvenlik başlıkları.',
    image: 'assets/images/projects/spread.webp',
    tags: ['Cloudflare Workers', 'Edge Computing', 'Wrangler', 'Performans'],
    sections: [
      {
        id: 'neden-edge',
        heading: 'Geleneksel tek sunucu yerine kenar (edge) ağı neden fark yaratır?',
        html: `
          <p>Tek bir veri merkezinde (örneğin yalnızca ABD Doğu kıyısında) çalışan klasik bir VPS’e Türkiye’den veya Avrupa’dan bağlanan bir kullanıcı, ilk baytı (TTFB) almadan önce yalnızca fiziksel ışık hızı ve TLS el sıkışması nedeniyle 180–280 ms kaybeder. <strong>Cloudflare Workers + Static Assets</strong> mimarisinde HTML, CSS, JavaScript ve WebP görseller kullanıcıya coğrafi olarak en yakın kenar düğümden sunulur; API proxy veya hafif dinamik mantık gerektiğinde aynı dağıtım içinde çalışan Worker devreye girer.</p>
        `,
      },
      {
        id: 'statik-ve-worker',
        heading: '<code>assets</code> bağlamasıyla hibrit statik + dinamik tasarım',
        html: `
          <p><a href="proje-spread.html">SPREAD V11.1</a> ve <a href="proje-csname.html">CSNAME</a> projelerinde statik arayüz dosyaları doğrudan kenar önbelleğinden servis edilirken, harici piyasa verisi veya CORS aşımı gereken uç noktalar aynı <code>wrangler.toml</code> içindeki hafif Worker kodundan yürütülür:</p>
          <div class="code-block">
            <div class="code-head"><span>wrangler.jsonc minimal statik + worker kurulumu</span><button type="button" class="copy-code-btn" data-copy-code>Kopyala</button></div>
            <pre><code>{
  "name": "ornek-servis",
  "main": "src/worker.js",
  "compatibility_date": "2026-11-01",
  "assets": {
    "directory": "./public",
    "binding": "ASSETS"
  }
}</code></pre>
          </div>
          <p>Bu yapı, yüksek trafik dalgalanmalarında sunucu çökmesi riskini ortadan kaldırır ve sabit aylık VPS faturası olmadan birden fazla canlı alt alan adını (<code>*.haking.tr</code>) sürdürmeyi mümkün kılar.</p>
        `,
      },
      {
        id: 'guvenlik-basliklari',
        heading: '<code>_headers</code> ile tarayıcı güvenliği ve önbellek disiplini',
        html: `
          <p>Her statik dağıtımda <code>X-Content-Type-Options: nosniff</code>, <code>Referrer-Policy: strict-origin-when-cross-origin</code> ve görseller için uzun süreli <code>Cache-Control: public, max-age=31536000, immutable</code> başlıklarını tanımlamak hem güvenlik skorunu hem tekrar ziyaret hızını belirgin biçimde yükseltir. Ancak HTML belgelerinde agresif uzun önbellek kullanılmamalı; aksi halde yeni sürüm yayınlandığında kullanıcılar saatlerce eski sayfayı görebilir.</p>
        `,
      },
    ],
    faqs: [
      {
        q: 'Cloudflare Workers üzerinde ağır Node.js kütüphaneleri çalışır mı?',
        a: 'Workers V8 izolatları üzerinde çalışır; dosya sistemi erişimi veya yerel C++ eklentisi gerektiren ağır işlemler için ayrı bir Node.js/Python sunucusu (ör. Haking Chat’teki Socket.IO sunucusu veya HaKING AI’daki FastAPI) kullanmak daha doğrudur.',
      },
    ],
  },

  {
    slug: 'haber-cs2-ekonomi-doppler-likidite-analizi',
    file: 'haber-cs2-ekonomi-doppler-likidite-analizi.html',
    kind: 'Veri Analizi',
    category: 'CS2 Ekonomi & Oyun',
    projectSlug: 'spread',
    date: '2026-11-26',
    dateDisplay: '26 Kasım 2026',
    readTime: '10 dk okuma',
    featured: true,
    title: 'CS2 Pazar Ekonomisi 2026: Doppler Fazları, Emir Defteri Derinliği ve Canlı Valve Cent Hesaplayıcı',
    shortDesc:
      'CS2 eşya ticaretinde yüzeysel indirim oranları neden yanıltır? 354+ Doppler fazının fiyat ayrışması, 7-8 günlük takas kilidi riski ve sayfa içi canlı Valve Cent komisyon hesaplayıcısı.',
    image: 'assets/images/projects/spread.webp',
    tags: ['CS2 Ekonomi', 'Valve Cent', 'Doppler', 'Likidite', 'SPREAD'],
    sections: [
      {
        id: 'likidite-ve-fazlar',
        heading: 'Aynı skin adında 10 kat fiyat farkı: Doppler fazı gerçeği',
        html: `
          <p>Counter-Strike 2 pazarında yeni başlayan kullanıcıların en pahalı hatası, Doppler veya Gamma Doppler bıçaklarını tek bir taban piyasa fiyatıyla değerlendirmektir. Aynı isim altındaki bir Phase 3 ile Sapphire, Ruby veya Emerald fazı arasında birkaç katlık değer farkı bulunur. Otomatik fiyat tarayıcıları <code>paint_index</code> ayrımını yapmadığında, yüksek değerli bir fazı düşük taban fiyatla eşleştirip yanıltıcı kâr alarmı üretebilir.</p>
          <p>Aynı durum <strong>emir defteri derinliği</strong> için de geçerlidir: günde 120 adet satılan likit bir AK-47 skiniyle haftada 1 kez satılan nadir bir StatTrak™ koleksiyon eşyası aynı kâr yüzdesine sahip olsa bile sermaye devir hızı açısından tamamen farklı risk profilindedir.</p>
        `,
      },
      {
        id: 'canli-valve-calc',
        heading: 'Canlı Valve Cent Komisyon ve Net Bakiye Hesaplayıcı',
        html: `
          <p>Steam Topluluk Pazarında alıcı fiyatından cüzdanınıza geçecek kesin net tutarı ve harici alış maliyetinize göre gerçek kâr/zarar oranınızı aşağıdaki tarayıcı içi araçla anında hesaplayabilirsiniz. Daha derin 7 kaynaklı tarama ve Monte Carlo CVaR için <a href="https://spread.haking.tr/" target="_blank" rel="noopener noreferrer">SPREAD V11.1</a> terminaline geçebilirsiniz.</p>
          <div class="tool-panel" data-valve-sim>
            <div class="eyebrow">ETKİLEŞİMLİ ARAÇ · KURUŞ HASSASİYETLİ VALVE CENT MODELİ</div>
            <div class="grid-3" style="margin-bottom:14px;">
              <div class="form-row"><label for="vc-buy">Harici Alış Maliyeti ($)</label><input id="vc-buy" type="number" step="0.01" min="0.01" value="18.50"></div>
              <div class="form-row"><label for="vc-sell">Steam Satış Fiyatı ($)</label><input id="vc-sell" type="number" step="0.01" min="0.03" value="24.90"></div>
              <div class="form-row"><label for="vc-qty">Adet</label><input id="vc-qty" type="number" min="1" max="500" value="1"></div>
            </div>
            <div id="vc-result" class="callout callout-forest" style="margin:0;" role="status" aria-live="polite"></div>
          </div>
        `,
      },
      {
        id: 'takas-kilidi-riski',
        heading: '7–8 günlük takas koruma penceresinde sermaye yönetimi',
        html: `
          <p>CS2 ekosisteminde bir eşyayı aldığınız an ile yeniden takas edebileceğiniz an arasındaki 7–8 günlük bekleme süresi boyunca yeni operasyon, kasa veya major turnuva duyurusu piyasayı %10–15 oynatabilir. Bu nedenle yüksek bütçeyi tek bir düşük hacimli eşyaya bağlamak yerine <a href="proje-spread.html">SPREAD</a>’in Sepet Modunda olduğu gibi farklı likit eşyalara bölmek ve gerçekleşen tüm işlemleri <a href="proje-csell.html">CSELL</a> günlüğünde izlemek riski kontrol altında tutar.</p>
        `,
      },
    ],
    faqs: [
      {
        q: 'Steam’de 100 $’lık bir eşya satıldığında cüzdana tam olarak ne kadar geçer?',
        a: 'Valve Cent formülüne göre 100,00 $ alıcı fiyatından 4,34 $ Steam (%5) ve 8,69 $ CS2 (%10) kesintisi düşülür; satıcının cüzdanına tam olarak 86,97 $ net bakiye geçer.',
      },
    ],
  },

  {
    slug: 'haber-core-web-vitals-inp-lcp-rehberi',
    file: 'haber-core-web-vitals-inp-lcp-rehberi.html',
    kind: 'Performans Rehberi',
    category: 'Tasarım & Web',
    projectSlug: 'copyhex',
    date: '2026-11-25',
    dateDisplay: '25 Kasım 2026',
    readTime: '9 dk okuma',
    title: 'Core Web Vitals 2026 (LCP, INP, CLS): Modern Web Sitelerinde Gerçek Hız Optimizasyonu',
    shortDesc:
      'Google sıralamalarını ve kullanıcı kalış süresini doğrudan etkileyen LCP, INP ve CLS metrikleri nasıl ölçülür? Görsel WebP sıkıştırması, font yükleme ve sıfır kayma teknikleri.',
    image: 'assets/images/projects/copyhex.webp',
    tags: ['Core Web Vitals', 'LCP', 'INP', 'CLS', 'Performans'],
    sections: [
      {
        id: 'uc-metrik',
        heading: 'Üç temel metrik neyi ölçer ve eşik değerleri nelerdir?',
        html: `
          <div class="table-scroll">
            <table>
              <thead>
                <tr><th>Metrik</th><th>Anlamı</th><th>İyi Eşik</th><th>En Yaygın İhlal Nedeni</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>LCP</strong> (Largest Contentful Paint)</td><td>Ekrandaki en büyük görsel/başlığın çizilme süresi</td><td>≤ 2,5 sn</td><td>Sıkıştırılmamış 2 MB PNG kapak görselleri, <code>fetchpriority="high"</code> eksikliği</td></tr>
                <tr><td><strong>INP</strong> (Interaction to Next Paint)</td><td>Tıklama/yazma sonrası arayüzün tepki süresi</td><td>≤ 200 ms</td><td>Ana iş parçacığını kilitleyen ağır JS paketleri ve gereksiz DOM yeniden çizimi</td></tr>
                <tr><td><strong>CLS</strong> (Cumulative Layout Shift)</td><td>Sayfa yüklenirken elemanların zıplaması</td><td>≤ 0,10</td><td><code>width</code>/<code>height</code> belirtilmemiş görseller ve geç yüklenen reklam/font kutuları</td></tr>
              </tbody>
            </table>
          </div>
        `,
      },
      {
        id: 'pratik-adimlar',
        heading: 'haking.tr’nin kendisinde uyguladığımız 5 gerçek hız adımı',
        html: `
          <ol>
            <li><strong>PNG → WebP dönüşümü:</strong> 2,35 MB boyutundaki CopyHex afişi 1200×675 WebP olarak yeniden kodlandığında 51 KB’ye düştü (%97,8 tasarruf).</li>
            <li><strong>Hero görseline <code>fetchpriority="high"</code>:</strong> İlk ekrandaki ana görsele lazy-loading uygulanmaz; alt satırdaki kart görsellerinde ise <code>loading="lazy"</code> kullanılır.</li>
            <li><strong>Her <code>&lt;img&gt;</code> etiketinde sabit en-boy oranı:</strong> <code>width</code>, <code>height</code> ve CSS <code>aspect-ratio</code> birlikte verilerek CLS değeri sıfıra yaklaştırılır.</li>
            <li><strong>Sıfır gereksiz JS çerçevesi:</strong> Editoryal sayfalarda 300 KB’lik SPA paketi yerine ~12 KB saf etkileşim betiği kullanmak INP değerini 20 ms’nin altında tutar.</li>
            <li><strong>FOUC’suz tema başlatma:</strong> Koyu/açık tema tercihi <code>&lt;head&gt;</code> içindeki 200 baytlık satır içi betikle ilk boyamadan önce uygulanır.</li>
          </ol>
        `,
      },
    ],
    faqs: [
      {
        q: 'Google AdSense kodu CLS’yi bozar mı?',
        a: 'İçerik akışında sabit en-boy oranlı görseller kullanıp üst gezinme çubuğunu koruduğunuzda ve Google’ın kendi uyumlu reklam yerleşimlerine yer açtığınızda sayfa kayması en aza iner.',
      },
    ],
  },

  {
    slug: 'haber-neon-postgresql-serverless-mimari',
    file: 'haber-neon-postgresql-serverless-mimari.html',
    kind: 'Backend Analizi',
    category: 'Yapay Zekâ',
    projectSlug: 'haking-ai',
    date: '2026-11-25',
    dateDisplay: '25 Kasım 2026',
    readTime: '8 dk okuma',
    title: 'Neon PostgreSQL ve Havuzlu Bağlantılar: Sunucusuz Backend’lerde Veritabanı Kilitlenmesini Önleme',
    shortDesc:
      'FastAPI ve Express tabanlı sunucusuz servislerde DATABASE_URL (pooled) ile DATABASE_URL_UNPOOLED ayrımı, SQL göçleri ve atomik kredi muhasebesi nasıl kurulur?',
    image: 'assets/images/projects/haking-ai.webp',
    tags: ['Neon PostgreSQL', 'Backend', 'SQL', 'FastAPI', 'UTRZONE'],
    sections: [
      {
        id: 'pooled-vs-direct',
        heading: 'Sunucusuz API’lerde neden doğrudan PostgreSQL bağlantısı yetmez?',
        html: `
          <p>Vercel veya benzeri sunucusuz platformlarda eşzamanlı 40 istek geldiğinde her fonksiyon örneği veritabanına ayrı TCP/SSL bağlantısı açmaya çalışır. Standart PostgreSQL sunucusunun eşzamanlı bağlantı limiti hızla dolduğunda yeni kullanıcılar <code>too many connections</code> hatası alır. <strong>Neon</strong> mimarisinde web istekleri için <strong>havuzlu (pooled / PgBouncer) <code>DATABASE_URL</code></strong>, şema göçleri (<code>migrations/*.sql</code>) ve uzun bakım işlemleri için ise <strong>doğrudan <code>DATABASE_URL_UNPOOLED</code></strong> adresi ayrı tutulur.</p>
        `,
      },
      {
        id: 'atomik-kredi',
        heading: 'Çift harcamayı (race condition) önleyen atomik kredi düşümü',
        html: `
          <p><a href="proje-haking-ai.html">HaKING AI</a> kredi sisteminde kullanıcı aynı anda iki sekmeden Prompt Modu veya Çılgın Mod isteği gönderdiğinde bakiyenin eksiye düşmemesi için “önce bakiyeyi oku, sonra Python’da çıkar, sonra güncelle” yaklaşımı yerine tek bir atomik SQL işlemi kullanılır:</p>
          <div class="code-block">
            <div class="code-head"><span>Atomik bakiye rezervasyonu (SQL)</span><button type="button" class="copy-code-btn" data-copy-code>Kopyala</button></div>
            <pre><code>UPDATE user_credits
SET balance = balance - $1, updated_at = NOW()
WHERE user_id = $2 AND balance &gt;= $1
RETURNING balance;</code></pre>
          </div>
          <p>Eğer <code>RETURNING</code> boş dönerse yetersiz bakiye kesin olarak anlaşılır; eşzamanlı ikinci istek asla bakiyeyi eksiye indiremez. Hem HaKING AI hem de <a href="proje-utrzone.html">UTRZONE</a> şemalarında numaralandırılmış göç dosyalarıyla (<code>0001_auth.sql</code> … <code>0005_google_auth.sql</code>) geriye dönük şema tutarlılığı korunur.</p>
        `,
      },
    ],
    faqs: [
      {
        q: 'Neon’da scale-to-zero soğuk başlangıcı kullanıcıyı etkiler mi?',
        a: 'Uzun süre hiç istek gelmediğinde ilk sorgu ~300–600 ms ek uyanma süresi alabilir; sağlık kontrolleri ve istemcide görünür durum bildirimiyle bu gecikme kullanıcıya şeffaf biçimde yansıtılır.',
      },
    ],
  },

  {
    slug: 'haber-manifest-v3-tarayici-eklentisi-rehberi',
    file: 'haber-manifest-v3-tarayici-eklentisi-rehberi.html',
    kind: 'Geliştirici Rehberi',
    category: 'Tarayıcı Eklentileri',
    projectSlug: 'cevirmenx',
    date: '2026-11-24',
    dateDisplay: '24 Kasım 2026',
    readTime: '9 dk okuma',
    title: 'Chrome, Edge ve Firefox İçin Tek Kod Tabanından Manifest V3 Eklentisi Geliştirme ve Mağaza Yayını',
    shortDesc:
      'QR Scanner v1.1.4 ve ÇevirmenX v1.4.0 geliştirme sürecinden süzülen Manifest V3 service worker kısıtları, mağaza inceleme kuralları ve çoklu tarayıcı paketleme rehberi.',
    image: 'assets/images/projects/cevirmenx.webp',
    tags: ['Manifest V3', 'Chrome Web Store', 'Edge Add-ons', 'Firefox XPI'],
    sections: [
      {
        id: 'mv2-to-mv3',
        heading: 'Manifest V3 ile değişen 3 temel mimari kural',
        html: `
          <ul>
            <li><strong>Kalıcı arka plan sayfası yok:</strong> Arka plan betiği artık boşta kaldığında uyuyan bir <em>Service Worker</em> olarak çalışır; bu nedenle uygulama durumunu RAM’deki global değişkenlerde değil <code>chrome.storage.local</code> veya <code>chrome.storage.session</code> içinde tutmalısınız.</li>
            <li><strong>Uzak kod yürütme yasağı:</strong> CDN üzerinden harici JS dosyası çekilemez; tüm yardımcı kütüphaneler (ör. QR kod üretici/okuyucu) uzantı paketinin içine (<code>vendor/</code>) derlenerek eklenmelidir.</li>
            <li><strong>En az yetki prensibi:</strong> Mağaza incelemecileri istenen her iznin (<code>activeTab</code>, <code>contextMenus</code>, <code>storage</code>) kullanıcıya doğrudan hangi özellik için gerektiğini açıkça belgelemenizi bekler.</li>
          </ul>
        `,
      },
      {
        id: 'tek-kaynak-paketleme',
        heading: 'Chrome, Edge ve Firefox için tek kaynaktan derleme',
        html: `
          <p><a href="proje-cevirmenx.html">ÇevirmenX 1.4.0</a> ve <a href="proje-qr-scanner.html">QR Scanner 1.1.4</a> projelerinde üç ayrı klasörde aynı kodu elle kopyalamak yerine ortak kaynak koddan otomatik derleme betiğiyle tarayıcı bazlı ZIP ve XPI paketleri üretilir. Firefox tarafında <code>browser_specific_settings.gecko</code> kimliği eklenirken Chromium paketlerinde bu alan temizlenerek mağaza doğrulama uyarıları sıfırlanır.</p>
        `,
      },
    ],
    faqs: [
      {
        q: 'Chrome için yazdığım Manifest V3 eklentisi Microsoft Edge’de çalışır mı?',
        a: 'Evet, Edge Chromium tabanlı olduğundan neredeyse birebir aynı paketi kabul eder; mağaza görselleri ve açıklama metinlerini Edge Partner Center ölçülerine göre hazırlamak yeterlidir.',
      },
    ],
  },

  {
    slug: 'haber-yerel-oncelikli-web-uygulamalari-pwa',
    file: 'haber-yerel-oncelikli-web-uygulamalari-pwa.html',
    kind: 'Mimari Rehber',
    category: 'Eğitim & Topluluk',
    projectSlug: 'notmatik',
    date: '2026-11-23',
    dateDisplay: '23 Kasım 2026',
    readTime: '8 dk okuma',
    title: 'Local-First Web Uygulamaları ve PWA: Hesapsız, Çevrimdışı ve Hızlı Ürün Tasarlama İlkeleri',
    shortDesc:
      'Her web aracı için üyelik duvarı ve bulut veritabanı şart mı? NotMatik, CopyHex, CSELL ve QR Scanner’da yerel öncelikli (local-first) mimarinin sağladığı hız ve gizlilik avantajları.',
    image: 'assets/images/projects/notmatik.webp',
    tags: ['Local-First', 'PWA', 'Service Worker', 'Gizlilik', 'NotMatik'],
    sections: [
      {
        id: 'uyelik-yorgunlugu',
        heading: 'Kullanıcılar neden küçük bir araç için kayıt olmak istemiyor?',
        html: `
          <p>Bir öğrenci yalnızca vize-final ortalamasını hesaplamak ya da bir tasarımcı iki rengin kontrastını ölçmek istediğinde karşısına çıkan “E-posta ile kayıt ol” ekranı ziyaretçilerin büyük bölümünü ilk 5 saniyede kaybettirir. <strong>Local-First (yerel öncelikli)</strong> yaklaşım verinin birincil sahibinin kullanıcının kendi cihazı olduğunu kabul eder: uygulama anında açılır, veriler <code>localStorage</code> veya <code>IndexedDB</code> üzerinde saklanır ve internet kesilse bile çalışmaya devam eder.</p>
        `,
      },
      {
        id: 'yedek-ve-pwa',
        heading: 'Yerel verinin tek zayıf noktasını kapatmak: JSON/CSV taşınabilirlik',
        html: `
          <p>Tarayıcı önbelleği temizlendiğinde veya telefon değiştirildiğinde yerel kayıtların kaybolmaması için her local-first üründe tek tıkla <strong>JSON yedekleme / geri yükleme</strong> bulunmalıdır. <a href="proje-notmatik.html">NotMatik v3.0</a>, <a href="proje-csell.html">CSELL</a>, <a href="proje-tradecalc.html">TradeCalc</a> ve <a href="proje-spread.html">SPREAD</a> (SHA-256 doğrulamalı kasa) bu sayede bulut sunucusuna bağımlı olmadan cihazlar arası güvenli geçiş sunar.</p>
        `,
      },
    ],
    faqs: [
      {
        q: 'PWA kurulumu kullanıcıya ne kazandırır?',
        a: 'Manifest ve Service Worker ile site telefonun ana ekranına veya bilgisayarın masaüstüne uygulama gibi sabitlenir; adres çubuğu olmadan tam ekran ve çevrimdışı açılır.',
      },
    ],
  },

  {
    slug: 'haber-turkce-oyun-yerellestirme-ve-utrzone',
    file: 'haber-turkce-oyun-yerellestirme-ve-utrzone.html',
    kind: 'Platform Analizi',
    category: 'CS2 Ekonomi & Oyun',
    projectSlug: 'utrzone',
    date: '2026-11-21',
    dateDisplay: '21 Kasım 2026',
    readTime: '8 dk okuma',
    title: 'Türkçe Oyun Yerelleştirme Ekosistemi ve UTRZONE Mimarisi: Sürüm Takibi, Güvenlik ve Topluluk',
    shortDesc:
      'Türkçe oyun yamaları ararken kırık link ve güvensiz arşiv karmaşasını çözmek için React/Vite + Express/Neon altyapısıyla kurulan UTRZONE platformunun tasarım kararları.',
    image: 'assets/images/projects/utrzone.webp',
    tags: ['UTRZONE', 'React', 'Vite', 'Express', 'Oyun Yerelleştirme'],
    sections: [
      {
        id: 'yamalarda-guven-sorunu',
        heading: 'Oyun yaması ve mod keşfinde neden düzenli bir platforma ihtiyaç var?',
        html: `
          <p>Türkçe dil desteği bulunmayan pek çok büyük yapımda oyuncular topluluk çevirilerine ve modlara yöneliyor. Ancak dağınık forum mesajları, eski oyun sürümleriyle uyumsuz arşivler, belirsiz kurulum adımları ve bozuk yönlendirme bağlantıları kullanıcı deneyimini zorlaştırıyor. <a href="proje-utrzone.html">UTRZONE (utrzone.haking.tr)</a>, yama ve mod içeriklerini düzenli sürüm notları, kurulum kılavuzları ve topluluk geri bildirimleriyle tek bir modern arayüzde toplamak için geliştirildi.</p>
        `,
      },
      {
        id: 'utrzone-teknik',
        heading: 'React/Vite ön yüz ve Express/Neon arka uç ayrımı',
        html: `
          <p>UTRZONE iki ayrı katmanda yönetilir: hızlı arama, kategori filtreleme ve akıcı kart arayüzü sağlayan <strong>React + Vite</strong> ön yüzü ile üyelik, topluluk akışları, Resend tabanlı işlemsel e-postalar ve SQL şema göçlerini yürüten <strong>Express + Neon PostgreSQL</strong> arka ucu. Medya varlıklarının optimize WebP formatında ayrı tutulması sayfa açılış süresini korur.</p>
        `,
      },
    ],
    faqs: [
      {
        q: 'Bir oyun yaması kurmadan önce nelere dikkat edilmelidir?',
        a: 'Yamanın oyunun güncel sürümüyle (Steam/Epic sürüm numarası) uyumlu olduğunu doğrulamak ve değiştirilecek oyun dosyalarının yedeğini almak olası çakışmaları önler.',
      },
    ],
  },

  {
    slug: 'haber-oklch-ve-koyu-tema-tasarimi',
    file: 'haber-oklch-ve-koyu-tema-tasarimi.html',
    kind: 'Tasarım Rehberi',
    category: 'Tasarım & Web',
    projectSlug: 'copyhex',
    date: '2026-11-20',
    dateDisplay: '20 Kasım 2026',
    readTime: '8 dk okuma',
    title: 'Koyu Tema Neden Sadece Renkleri Tersine Çevirmek Değildir? Kontrast, Yüzey Katmanları ve Göz Konforu',
    shortDesc:
      'Saf siyah (#000) üzerine saf beyaz (#FFF) neden gözü yorar? Editoryal açık/koyu tema çifti kurarken yüzey derinliği, doygunluk azaltma ve WCAG okunabilirlik ilkeleri.',
    image: 'assets/images/projects/copyhex.webp',
    tags: ['Koyu Tema', 'UI Tasarım', 'WCAG', 'CopyHex', 'Renk Teorisi'],
    sections: [
      {
        id: 'saf-siyah-tuzagi',
        heading: 'Saf siyah + saf beyaz ve mor neon klişelerinden kaçınmak',
        html: `
          <p>İyi bir koyu tema oluşturmak için beyazı siyaha, siyahı beyaza çevirmek yeterli değildir. <code>#000000</code> üzerine <code>#FFFFFF</code> metin, özellikle astigmatizması olan okuyucularda harflerin etrafında hale (halation) etkisi yaratarak uzun okumayı zorlaştırır. Benzer şekilde koyu zemin üzerinde aşırı doygun mor veya neon gradyanlar kullanmak siteyi özgün bir yayın yerine birbirinin kopyası şablonlara benzetir.</p>
        `,
      },
      {
        id: 'yuzey-hiyerarsisi',
        heading: 'Yüzey derinliği ve kontrollü vurgu rengi',
        html: `
          <p><strong>haking.tr</strong>’nin kendi yeni koyu temasında kullandığımız gibi, derin sıcak obsidyen (<code>#111315</code>), yükseltilmiş grafit kart yüzeyi (<code>#191C1F</code>), ince üst kenar parıltısı ve yumuşatılmış krem mürekkep (<code>#EFECE4</code>) göz yorgunluğunu azaltırken yüksek kontrastı korur. Vurgu renklerinde (kiremit/bakır ve çam/yeşim) açık temadaki tonun açıklığı koyu temada OKLCH ekseninde dengeli biçimde yukarı çekilerek okunabilirlik korunur.</p>
          <p>Kendi projenizde açık ve koyu anlamsal çiftleri test etmek için <a href="https://copyhex.haking.tr/" target="_blank" rel="noopener noreferrer">CopyHex</a> stüdyosundan yararlanabilirsiniz.</p>
        `,
      },
    ],
    faqs: [
      {
        q: 'Açık tema mı yoksa koyu tema mı varsayılan olmalıdır?',
        a: 'En iyi yaklaşım, kullanıcının işletim sistemi tercihini (prefers-color-scheme) ilk ziyarette saygıyla algılamak ve tek tıkla değiştirilebilen kalıcı bir tema anahtarı sunmaktır.',
      },
    ],
  },

  {
    slug: 'haber-gercek-zamanli-web-websocket-sse',
    file: 'haber-gercek-zamanli-web-websocket-sse.html',
    kind: 'Mimari Karşılaştırma',
    category: 'Eğitim & Topluluk',
    projectSlug: 'haking-chat',
    date: '2026-11-19',
    dateDisplay: '19 Kasım 2026',
    readTime: '8 dk okuma',
    title: 'SSE, WebSocket ve Uzun Yoklama: Web Projeniz İçin Doğru Gerçek Zamanlı Protokolü Seçme',
    shortDesc:
      'HaKING AI’da neden Server-Sent Events (SSE), Haking Chat’te ise neden Socket.IO (WebSocket) tercih ettim? İki gerçek proje üzerinden teknik karşılaştırma.',
    image: 'assets/images/projects/haking-chat.webp',
    tags: ['WebSocket', 'SSE', 'Socket.IO', 'Mimari', 'Haking Chat'],
    sections: [
      {
        id: 'protokol-tablosu',
        heading: 'Her gerçek zamanlı özellik WebSocket gerektirmez',
        html: `
          <div class="table-scroll">
            <table>
              <thead>
                <tr><th>Ölçüt</th><th>SSE (Server-Sent Events)</th><th>WebSocket / Socket.IO</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>İletişim Yönü</strong></td><td>Sunucudan istemciye tek yönlü akış</td><td>Çift yönlü tam eşzamanlı (full-duplex)</td></tr>
                <tr><td><strong>Protokol</strong></td><td>Standart HTTP/1.1 &amp; HTTP/2</td><td>HTTP Upgrade → kalıcı WS soketi</td></tr>
                <tr><td><strong>İdeal Senaryo</strong></td><td>AI metin akışı, canlı bildirim, borsa/fiyat yayını</td><td>Çok oyunculu oyunlar, anlık sohbet odası, ortak çizim</td></tr>
                <tr><td><strong>HaKING Örneği</strong></td><td><a href="proje-haking-ai.html">HaKING AI</a> (FastAPI akışlı sohbet)</td><td><a href="proje-haking-chat.html">Haking Chat</a> (Okey/Tavla 3D + Sesli Oda)</td></tr>
              </tbody>
            </table>
          </div>
          <p>Doğru protokol seçimi sunucu maliyetini ve hata ayıklama karmaşıklığını yarı yarıya azaltır. Sadece sunucudan metin akıtacağınız bir AI arayüzüne tam çift yönlü soket kurmak gereksiz durum yükü getirir; öte yandan 4 kişilik 101 Okey masasında her oyuncunun saniyelik hamlelerini senkronize etmek için WebSocket/Socket.IO vazgeçilmezdir.</p>
        `,
      },
    ],
    faqs: [
      {
        q: 'Mobil ağ değişiminde (Wi-Fi → 4G) hangisi daha kolay toparlanır?',
        a: 'SSE tarayıcının yerleşik EventSource mekanizmasıyla otomatik yeniden bağlanır; Socket.IO ise yerleşik heartbeat, üstel geri çekilme (exponential backoff) ve oda yeniden katılım kancaları sunar.',
      },
    ],
  },

  {
    slug: 'haber-statik-site-uretimi-ve-teknik-seo',
    file: 'haber-statik-site-uretimi-ve-teknik-seo.html',
    kind: 'SEO & GEO Rehberi',
    category: 'Tasarım & Web',
    projectSlug: 'copyhex',
    date: '2026-11-27',
    dateDisplay: '27 Kasım 2026',
    readTime: '9 dk okuma',
    title: 'Çoklu Arama Motoru ve AI Arama (GEO) İçin Teknik SEO: JSON-LD, Sitemap, RSS ve llms.txt Rehberi',
    shortDesc:
      'Yalnızca Google’da değil Bing, DuckDuckGo, Yandex ve ChatGPT/Perplexity/Gemini gibi yapay zekâ aramalarında da görünür olmak için modern statik sitelerde uygulanması gereken eksiksiz kontrol listesi.',
    image: 'assets/images/brand/hero-studio.webp',
    tags: ['Teknik SEO', 'GEO', 'JSON-LD', 'llms.txt', 'Sitemap'],
    sections: [
      {
        id: 'coklu-motor',
        heading: 'Google dışında Bing, DuckDuckGo, Yandex ve AI arama motorları nasıl çalışır?',
        html: `
          <p>Birçok geliştirici yalnızca Google Search Console’a odaklanır; oysa <strong>Bing Webmaster Tools</strong> hem Bing’i hem de <strong>DuckDuckGo</strong> ve Yahoo organik sonuçlarını besler. <strong>Yandex Webmaster</strong> ise Türkiye ve Avrasya bölgesinde belirgin trafik payına sahiptir. Buna ek olarak 2026’da kullanıcıların ciddi bir kısmı sorularını doğrudan ChatGPT, Perplexity, Claude ve Gemini üzerinden aramaktadır.</p>
          <ul>
            <li><strong>Ön Derlenmiş Statik HTML (SSG):</strong> İkincil arama botları ve AI tarayıcıları ağır istemci JavaScript’ini her zaman yürütmez. Ana metnin doğrudan HTML içinde sunulması tüm platformlarda tam indekslenme garantisi verir.</li>
            <li><strong>Zengin JSON-LD Şemaları:</strong> <code>WebSite</code>, <code>Person</code> (<code>sameAs</code> sosyal kimlik bağlantılarıyla), <code>SoftwareApplication</code>, <code>TechArticle</code>, <code>FAQPage</code> ve <code>BreadcrumbList</code> tüm motorların ortak dilidir.</li>
            <li><strong><code>llms.txt</code> ve <code>llms-full.txt</code>:</strong> Kök dizine yerleştirilen sade Markdown dizinleri, yapay zekâ arama ajanlarının sitenizdeki en yetkin sayfaları ve teknik özetleri tek istekte doğru alıntılamasını sağlar.</li>
            <li><strong>RSS 2.0 (<code>rss.xml</code>) ve Görsel Sitemap:</strong> İçerik toplayıcıları, haber okuyucular ve arama motorları yeni yazıları gecikmeden yakalar.</li>
          </ul>
        `,
      },
      {
        id: 'adsense-ve-icerik',
        heading: 'AdSense ve arama kalitesinde ortak belirleyici: ince içerikten kaçınmak',
        html: `
          <p>Hem arama motorları hem Google AdSense inceleme sistemleri, yalnızca dış link kartlarından oluşan “köprü sayfaları” düşük değerli içerik olarak işaretler. Her proje sayfasının gerçek mimari açıklama, kullanım sınırları, SSS ve ilgili derin rehberlerle desteklenmesi; ayrıca gizlilik, çerez, kullanım koşulları, yazar biyografisi ve yayın ilkelerinin şeffaf biçimde sunulması uzun vadeli güvenilirliğin temelidir.</p>
        `,
      },
    ],
    faqs: [
      {
        q: 'robots.txt dosyasında AI botlarını engellemek doğru mu?',
        a: 'Açık bilgi ve yazılım yayını yapan bir portfolyo/blog için AI arama botlarını (OAI-SearchBot, PerplexityBot, ClaudeBot vb.) engellemek, yapay zekâ yanıtlarında kaynak gösterilme ve marka bilinirliği fırsatını azaltır.',
      },
    ],
  },

  {
    slug: 'haber-github-actions-otomasyon-rehberi',
    file: 'haber-github-actions-otomasyon-rehberi.html',
    kind: 'Otomasyon Rehberi',
    category: 'CS2 Ekonomi & Oyun',
    projectSlug: 'haking-vault',
    date: '2026-11-18',
    dateDisplay: '18 Kasım 2026',
    readTime: '8 dk okuma',
    title: 'GitHub Actions ile Sıfır Sunuculu Veri Otomasyonu: Katalog Güncelleme, Steam Senkronizasyonu ve CI Güvenliği',
    shortDesc:
      'HaKING 3D Vault, CSELL, CSNAME ve Haking Chat depolarında zamanlanmış JSON güncelleme akışları nasıl çalışır? Zaman aşımı (timeout) ve eşzamanlılık (concurrency) korumaları.',
    image: 'assets/images/projects/haking-vault.webp',
    tags: ['GitHub Actions', 'CI/CD', 'Otomasyon', 'Steam API', 'Güvenlik'],
    sections: [
      {
        id: 'statik-veri-senkronu',
        heading: 'API anahtarını gizleyip veriyi statik JSON olarak yayınlamak',
        html: `
          <p>Bir web sitesinde güncel Steam kütüphane istatistiklerini (<a href="proje-haking-vault.html">HaKING 3D Vault</a>) veya güncel CS2 eşya kataloglarını (<a href="proje-csell.html">CSELL</a>, <a href="proje-csname.html">CSNAME</a>) göstermek için 7/24 çalışan ücretli bir backend kurmak şart değildir. GitHub Actions üzerinde zamanlanmış (<code>cron</code>) bir iş akışı veriyi çeker, doğrulama şemasından geçirir ve yalnızca gerçek değişiklik varsa depodaki JSON dosyasını günceller.</p>
        `,
      },
      {
        id: 'ci-kota-korumasi',
        heading: 'CI dakikasını boşa harcamayan 3 kritik iş akışı kuralı',
        html: `
          <p>Haking Chat arka ucu v2.2.1 güncellemesinde de uyguladığımız gibi her CI dosyasında şu üç koruma mutlaka bulunmalıdır:</p>
          <div class="code-block">
            <div class="code-head"><span>Güvenli GitHub Actions iş akışı korumaları (.github/workflows/ci.yml)</span><button type="button" class="copy-code-btn" data-copy-code>Kopyala</button></div>
            <pre><code>on:
  push:
    branches: [main]
    paths-ignore: ['**/*.md', 'LICENSE']
concurrency:
  group: \${{ github.workflow }}-\${{ github.ref }}
  cancel-in-progress: true
jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 5</code></pre>
          </div>
          <p><code>timeout-minutes: 5</code> takılı kalan bir testin 6 saat boyunca dakika yakmasını engeller; <code>cancel-in-progress</code> aynı dala arka arkaya push yapıldığında eski çalıştırmayı anında iptal eder; <code>paths-ignore</code> ise yalnızca dokümantasyon değiştiğinde gereksiz test çalıştırılmasını önler.</p>
        `,
      },
    ],
    faqs: [
      {
        q: 'Zamanlanmış GitHub Actions iş akışı değişiklik yoksa boş commit atar mı?',
        a: 'Hayır; commit adımından önce git diff --quiet kontrolü yapılarak yalnızca veri gerçekten değiştiğinde yeni commit oluşturulur.',
      },
    ],
  },
];
