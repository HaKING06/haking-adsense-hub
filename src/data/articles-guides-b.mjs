export const GUIDES_B = [
  {
    slug: 'yazi-tradecalc-senaryolar',
    file: 'yazi-tradecalc-senaryolar.html',
    kind: 'Teknik Rehber',
    category: 'CS2 Ekonomi & Oyun',
    projectSlug: 'tradecalc',
    date: '2026-11-16',
    dateDisplay: '16 Kasım 2026',
    readTime: '8 dk okuma',
    title: 'CS2 Takas Planlamada Maliyet, Bakiye İskontosu ve Marj Senaryoları',
    shortDesc:
      'Bir takas sitesine yatırılan nakit, hedef eşyanın piyasa değeri ve sitede kalan bakiyenin gerçek nakit karşılığı arasındaki farkı TradeCalc ile doğru modellemek.',
    image: 'assets/images/projects/tradecalc.webp',
    tags: ['TradeCalc', 'Takas Planlama', 'Marj Analizi', 'CS2'],
    sections: [
      {
        id: 'uc-farkli-sayi',
        heading: 'Takas planlamada birbirine karıştırılan 3 temel büyüklük',
        html: `
          <p>CS2 takas sitelerinde işlem yaparken yapılan en yaygın hata, platform içindeki “site bakiyesi” ile gerçek “nakit değeri” birebir eşit saymaktır. Oysa takas öncesinde üç ayrı rakamın net biçimde ayrıştırılması gerekir: <strong>cebinizden çıkan gerçek maliyet</strong>, <strong>hedef eşyanın komisyon sonrası nakit satış değeri</strong> ve <strong>takas sonrası platformda kalan artık bakiyenin nakit eşdeğeri</strong>.</p>
          <p>Örneğin siteye 100 $ yatırıp %35 yükleme bonusuyla 135 $ site bakiyesi elde ettiğinizde, site içindeki eşya fiyatları da genellikle nakit piyasaya göre %25–35 daha yüksek listelenir. Dolayısıyla bonusun gerçek katkısı yalnızca hedef eşyanın dış nakit pazarındaki gerçekleşebilir satış fiyatıyla kıyaslandığında ortaya çıkar.</p>
        `,
      },
      {
        id: 'charm-ve-kalan-bakiye',
        heading: 'Charm/Sticker ek değeri ve kalan bakiye iskontosu',
        html: `
          <p><a href="proje-tradecalc.html">HaKING TradeCalc</a> senaryo planlamasında iki ince ayrıntıyı ayrıca modeller: birincisi hedef silaha takılı charm değerinin taban skin fiyatından ayrı girilebilmesi; ikincisi ise takas sonunda sitede kalan örneğin 12 $’lık bakiyenin nakde dönerken uğrayacağı iskontonun brüt ve net kârdan ayrı gösterilmesidir.</p>
          <ul>
            <li><strong>İyimser senaryo:</strong> Hedef eşya güncel en düşük ilan fiyatına yakın satılır, kalan bakiye sonraki takasta değerlendirilir.</li>
            <li><strong>Muhafazakâr senaryo:</strong> Hedef eşya anlık alım emri (buy order) seviyesinden satılır, satış komisyonu ve kalan bakiye iskontosu tam uygulanır.</li>
          </ul>
          <p>Her iki senaryoyu yan yana kaydetmek, yalnızca en iyi ihtimale güvenerek sermaye bağlamanın önüne geçer. Aracı <a href="https://trade.haking.tr/" target="_blank" rel="noopener noreferrer">trade.haking.tr</a> üzerinden ücretsiz kullanabilirsiniz.</p>
        `,
      },
    ],
    faqs: [
      {
        q: 'TradeCalc ile SPREAD’i ne zaman ayrı ayrı kullanmalıyım?',
        a: 'SPREAD canlı 7 kaynaklı piyasa taraması ve Monte Carlo risk hesabı için tasarlanmıştır; TradeCalc ise kendi özel takas sitesi bonusunuzu, charm değerinizi ve kalan site bakiyenizi manuel varsayımlarla hızlıca simüle etmek için idealdir.',
      },
    ],
  },

  {
    slug: 'yazi-ai-desktop-arama',
    file: 'yazi-ai-desktop-arama.html',
    kind: 'Teknik Rehber',
    category: 'Yapay Zekâ',
    projectSlug: 'ai-desktop',
    date: '2026-11-15',
    dateDisplay: '15 Kasım 2026',
    readTime: '9 dk okuma',
    title: 'Yazım Hatalarına Dayanıklı Arama Motoru Tasarımı: BM25, Karakter N-Gram TF-IDF ve Hibrit Sıralama',
    shortDesc:
      'Kullanıcı "samsng galxy" yazdığında klasik kelime araması neden sıfır sonuç döndürür? HaKING AI Desktop’taki hibrit skorlama, Recall@K ve MRR değerlendirme yaklaşımı.',
    image: 'assets/images/projects/ai-desktop.webp',
    tags: ['BM25', 'TF-IDF', 'Bilgi Erişimi', 'Python', 'HaKING AI Desktop'],
    sections: [
      {
        id: 'tam-eslesme-sorunu',
        heading: 'Klasik kelime tabanlı arama yazım hatalarında neden çöker?',
        html: `
          <p>E-ticaret kataloglarında veya büyük ürün listelerinde kullanıcılar model kodlarını nadiren hatasız yazar. <code>"samsng galxy s24"</code> veya <code>"iphne 15 pro"</code> gibi bir sorgu, yalnızca tam kelime eşleşmesi (<code>LIKE</code> veya standart ters indeks) yapan bir sistemde ilgili ürünü tamamen ıskalar. BM25 algoritması belge uzunluğu ve terim sıklığı konusunda son derece başarılıdır; ancak sorgudaki kelime katalogdaki token ile birebir uyuşmadığında BM25 skoru sıfıra düşer.</p>
        `,
      },
      {
        id: 'karakter-ngram',
        heading: 'Karakter N-Gram TF-IDF nasıl kurtarıcı olur?',
        html: `
          <p>Kelimeleri bütün olarak indekslemek yerine 3 ila 5 karakterlik örtüşen parçalara (ör. <code>sam</code>, <code>ams</code>, <code>msu</code>, <code>sun</code>, <code>ung</code>) böldüğünüzde, ortadan bir harf eksilse bile ortak alt-dizelerin büyük bölümü hâlâ eşleşir. Bu sayede <code>"samsng"</code> ile <code>"samsung"</code> yüksek kosinüs benzerliği üretir.</p>
          <div class="code-block">
            <div class="code-head"><span>Hibrit skor birleştirme yaklaşımı (Python)</span><button type="button" class="copy-code-btn" data-copy-code>Kopyala</button></div>
            <pre><code># Normalleştirilmiş BM25 (kelime kesinliği) + Char N-Gram TF-IDF (yazım toleransı)
hybrid_score = alpha * norm_bm25 + (1.0 - alpha) * norm_char_tfidf</code></pre>
          </div>
          <p><a href="proje-ai-desktop.html">HaKING AI Desktop (v0.1.2)</a>, PriceRunner ürün veri kümesi üzerinde saf BM25, saf karakter n-gram TF-IDF ve hibrit yöntemi aynı sorgu setinde karşılaştırarak hangi yaklaşımın hem temiz hem de yazım hatalı sorgularda daha dengeli sonuç verdiğini ölçülebilir kılar.</p>
        `,
      },
      {
        id: 'recall-mrr',
        heading: 'Arama kalitesini hisle değil Recall@K ve MRR ile ölçmek',
        html: `
          <ul>
            <li><strong>Recall@K:</strong> Doğru ürünün ilk <code>K</code> sonuç (ör. ilk 5 veya ilk 10) içine girme oranı. Kullanıcıya aradığını buldurabilme kapasitesini ölçer.</li>
            <li><strong>MRR (Mean Reciprocal Rank):</strong> Doğru sonucun kaçıncı sırada geldiğini ödüllendirir (1. sıradaysa 1.0, 2. sıradaysa 0.5, 5. sıradaysa 0.2).</li>
          </ul>
          <p>İki metriği birlikte raporlamak, ilk 10’a giren ama sürekli 9. sırada kalan zayıf bir sıralayıcıyı erken aşamada fark etmenizi sağlar. Proje tamamen çevrimdışı çalışır ve kaynak kodu <a href="https://github.com/HaKING06/haking-ai-desktop" target="_blank" rel="noopener noreferrer">GitHub’da</a> açıktır.</p>
        `,
      },
    ],
    faqs: [
      {
        q: 'Yazım toleransı için neden ağır bir sinir ağı yerine karakter n-gram TF-IDF seçildi?',
        a: 'Karakter n-gram TF-IDF GPU gerektirmez, standart bir dizüstü bilgisayarda milisaniyeler içinde çevrimdışı çalışır ve marka/model kodlarındaki (ör. RTX 4060 vs RTX 4070) küçük farkları anlamsal gömme modellerine kıyasla daha keskin ayırt eder.',
      },
    ],
  },

  {
    slug: 'yazi-notmatik-cok-bilesenli',
    file: 'yazi-notmatik-cok-bilesenli.html',
    kind: 'Teknik Rehber',
    category: 'Eğitim & Topluluk',
    projectSlug: 'notmatik',
    date: '2026-11-19',
    dateDisplay: '19 Kasım 2026',
    readTime: '7 dk okuma',
    title: 'Çok Bileşenli Derslerde Vize, Ödev, Lab ve Proje Ağırlıklarını Hatasız Hesaplama',
    shortDesc:
      'Yıl içi %40 içinde birden fazla ödev, kısa sınav ve proje bulunan üniversite derslerinde efektif ağırlık dönüşümü ve dönem boyu takip stratejisi.',
    image: 'assets/images/projects/notmatik.webp',
    tags: ['NotMatik', 'Proje Ağırlığı', 'Üniversite', 'Planlama'],
    sections: [
      {
        id: 'ic-ice-agirliklar',
        heading: '“Yıl içi %40, bunun %25’i proje” ifadesi nasıl çevrilir?',
        html: `
          <p>Pek çok ders izlencesinde puan dağılımı iki kademeli yazılır: örneğin dönem içi %40, final %60; ardından dönem içinin kendi içinde %60 vize, %25 proje, %15 kısa sınav olduğu belirtilir. Öğrenciler bu rakamları doğrudan %60 + %25 + %15 diye topladığında final payı kaybolur. Doğru yöntem, alt ağırlıkları üst oranla çarparak <strong>genel nota efektif katkı yüzdesini</strong> bulmaktır:</p>
          <div class="table-scroll">
            <table>
              <thead>
                <tr><th>Bileşen</th><th>Dönem İçi Payı</th><th>Efektif Genel Ağırlık</th><th>Örnek Puan (80 / 90 / 70)</th><th>Genel Nota Katkı</th></tr>
              </thead>
              <tbody>
                <tr><td>Ara Sınav (Vize)</td><td>%60 (× 0.40)</td><td><strong>%24</strong></td><td>75</td><td>18,00</td></tr>
                <tr><td>Dönem Projesi</td><td>%25 (× 0.40)</td><td><strong>%10</strong></td><td>90</td><td>9,00</td></tr>
                <tr><td>Kısa Sınavlar (Quiz)</td><td>%15 (× 0.40)</td><td><strong>%6</strong></td><td>70</td><td>4,20</td></tr>
                <tr><td>Final Sınavı</td><td>Doğrudan</td><td><strong>%60</strong></td><td>Hedef</td><td>60 − 31,20 = 28,80 (Final: 48)</td></tr>
              </tbody>
            </table>
          </div>
        `,
      },
      {
        id: 'planlama',
        heading: 'Dönem ortasında ödev ve projelerin stratejik değeri',
        html: `
          <p>Tablodaki örnekte yalnızca %10 ağırlığa sahip bir projeden 90 almak final yükünü 15 puanlık bir vize farkına denk ölçüde hafifletir. <a href="proje-notmatik.html">NotMatik v3.0</a> içindeki proje/ek bileşen modu ve <strong>Hedef Defterim</strong> sayfası, her dersin güncel efektif ağırlıklarını dönem başında bir kez girip dönem sonuna kadar tek tıkla güncellemenizi sağlar. Temel formül ve canlı simülatör için <a href="rehber-not-hesaplama.html">ağırlıklı not hesaplama rehberine</a> de bakabilirsiniz.</p>
        `,
      },
    ],
    faqs: [
      {
        q: 'Birden fazla ödev varsa ortalamalarını önce ayrı mı almalıyım?',
        a: 'Tüm ödevlerin ağırlığı eşitse (ör. 3 ödev toplam %15 ise her biri %5), üçünün aritmetik ortalamasını alıp tek %15 kalem olarak girmek matematiksel olarak birebir aynı sonucu verir.',
      },
    ],
  },

  {
    slug: 'yazi-qr-paylasim-baski',
    file: 'yazi-qr-paylasim-baski.html',
    kind: 'Teknik Rehber',
    category: 'Tarayıcı Eklentileri',
    projectSlug: 'qr-scanner',
    date: '2026-11-14',
    dateDisplay: '14 Kasım 2026',
    readTime: '8 dk okuma',
    title: 'Baskı ve Dijital Ortam İçin Yüksek Çözünürlüklü QR Kod Hazırlama: SVG, Hata Düzeltme ve Sessiz Bölge',
    shortDesc:
      'Kartvizit, afiş ve ürün ambalajına basılan QR kodlar neden bazen telefon kamerasıyla okunmaz? SVG vektör çıktısı, ECC seviyesi (L/M/Q/H) ve kontrast kuralları.',
    image: 'assets/images/projects/qr-scanner.webp',
    tags: ['QR Baskı', 'SVG', 'Hata Düzeltme', 'QR Scanner'],
    sections: [
      {
        id: 'baski-hatalari',
        heading: 'Basılı bir QR kodun okunmamasının 4 ana sebebi',
        html: `
          <p>Bilgisayar ekranında kusursuz taranan bir QR kod, matbaadan çıktıktan sonra telefon kamerasında dakikalarca odaklanamayabilir. Bunun en yaygın nedenleri: düşük çözünürlüklü ekran görüntüsü kullanmak, kodun çevresindeki beyaz çerçeveyi (<strong>quiet zone / sessiz bölge</strong>) kesmek, koyu zemin üzerine açık renkli (ters çevrilmiş) QR basmak ve gereksiz derecede uzun URL’ler yüzünden modül karelerini mikroskobik boyuta sıkıştırmaktır.</p>
        `,
      },
      {
        id: 'ecc-ve-boyut',
        heading: 'Hata düzeltme seviyesi (ECC) ve doğru format seçimi',
        html: `
          <div class="table-scroll">
            <table>
              <thead>
                <tr><th>Seviye</th><th>Hasar Toleransı</th><th>İdeal Kullanım</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>L (Düşük)</strong></td><td>~%7</td><td>Temiz dijital ekranlar, çok uzun metinler (en seyrek ızgara)</td></tr>
                <tr><td><strong>M (Orta)</strong></td><td>~%15</td><td>Genel amaçlı kartvizit, broşür ve web paylaşımı (varsayılan öneri)</td></tr>
                <tr><td><strong>Q (Çeyrek)</strong></td><td>~%25</td><td>Kafe menüleri, ürün etiketleri, katlanabilir baskılar</td></tr>
                <tr><td><strong>H (Yüksek)</strong></td><td>~%30</td><td>Dış mekân afişleri, aşınmaya açık yüzeyler</td></tr>
              </tbody>
            </table>
          </div>
          <p>Matbaa ve grafik tasarım yazılımları (Illustrator, Figma, CorelDRAW) için her zaman sonsuz ölçeklenebilir <strong>SVG</strong> çıktısı tercih edilmelidir. Sunum veya sosyal medya için raster görsel gerekiyorsa <a href="proje-qr-scanner.html">QR Scanner v1.1.4</a> üzerinden 1024 px veya 2048 px PNG indirilebilir.</p>
          <p>Pratik mesafe kuralı: Okuma mesafesinin yaklaşık onda biri kadar fiziksel kenar uzunluğu bırakın (örneğin 30 cm’den okunacak kartvizitte en az 2,5–3 cm, 2 metreden okunacak vitrin afişinde en az 20 cm).</p>
        `,
      },
    ],
    faqs: [
      {
        q: 'Kartvizitte minimum kaç santimetre QR kod kullanmalıyım?',
        a: 'Kısa bir URL (ör. https://haking.tr) için en az 2 cm × 2 cm, çevresinde en az 4 modül genişliğinde temiz sessiz bölge (boşluk) bırakarak basmanız önerilir.',
      },
    ],
  },

  {
    slug: 'yazi-cevirmenx-sozluk',
    file: 'yazi-cevirmenx-sozluk.html',
    kind: 'Teknik Rehber',
    category: 'Tarayıcı Eklentileri',
    projectSlug: 'cevirmenx',
    date: '2026-11-13',
    dateDisplay: '13 Kasım 2026',
    readTime: '7 dk okuma',
    title: 'Teknik Dokümanlarda ve Oyun Terimlerinde Kişisel Sözlükle Çeviri Tutarlılığı',
    shortDesc:
      'Otomatik çeviri araçlarının "branch", "commit", "shader" veya "crosshair" gibi terimleri her paragrafta farklı çevirmesini ÇevirmenX çift yönlü kişisel sözlükle önlemek.',
    image: 'assets/images/projects/cevirmenx.webp',
    tags: ['ÇevirmenX', 'Kişisel Sözlük', 'Teknik Çeviri', 'Terminoloji'],
    sections: [
      {
        id: 'terminoloji-kaymasi',
        heading: 'Makine çevirisi teknik metinlerde neden tutarsızlaşır?',
        html: `
          <p>Genel amaçlı makine çevirisi aynı sözcüğü cümle bağlamına göre farklı karşılıklarla üretebilir: yazılım dokümanındaki <code>branch</code> bir paragrafta “dal”, sonraki paragrafta “şube” olur; <code>middleware</code> bazen “ara katman”, bazen “orta yazılım” diye çevrilir; oyun rehberindeki <code>trade lock</code> veya <code>float value</code> anlamsız düz çevirilere dönüşebilir.</p>
          <p>Bu tutarsızlık yalnızca okuma hızını düşürmez, özellikle yeni öğrenilen bir konuda kavram karmaşası yaratır.</p>
        `,
      },
      {
        id: 'sozluk-kurulumu',
        heading: 'ÇevirmenX 1.4.0’da çift yönlü kişisel sözlük stratejisi',
        html: `
          <p><a href="proje-cevirmenx.html">ÇevirmenX 1.4.0</a> içindeki çift yönlü kişisel sözlük, belirli kaynak → hedef dil eşleşmelerini kendi tercih ettiğiniz terimle sabitlemenize olanak tanır. Etkili bir sözlük kurarken tüm kelimeleri değil, yalnızca yanlış çevrildiğinde anlamı bozan yüksek frekanslı terimleri eklemek en temiz sonucu verir:</p>
          <ul>
            <li><strong>Yazılım geliştirme örneği:</strong> <code>staging</code> → <code>ön yayın ortamı</code>, <code>hydration</code> → <code>istemci etkinleştirme (hydration)</code>, <code>rate limit</code> → <code>oran sınırı</code>.</li>
            <li><strong>Oyun &amp; CS2 örneği:</strong> <code>buy order</code> → <code>alım emri</code>, <code>factory new</code> → <code>Fabrikadan Yeni Çıkmış (FN)</code>, <code>crosshair</code> → <code>nişangâh</code>.</li>
          </ul>
          <p>Kurulum ve <code>Alt+T</code> kısayolu ayrıntıları için <a href="rehber-cevirmenx.html">ÇevirmenX kullanım rehberine</a> geçebilirsiniz.</p>
        `,
      },
    ],
    faqs: [
      {
        q: 'Kişisel sözlük kayıtları nereye kaydedilir?',
        a: 'Kişisel sözlük ve geçmiş kayıtları tarayıcınızın yerel eklenti depolamasında tutulur; tarayıcınızın uzantı senkronizasyonu açıksa ayarlarınız buna uygun davranır.',
      },
    ],
  },

  {
    slug: 'yazi-plant-showroom-sahne',
    file: 'yazi-plant-showroom-sahne.html',
    kind: 'Mühendislik Notu',
    category: 'Tasarım & Web',
    projectSlug: 'haking-vault',
    date: '2026-11-10',
    dateDisplay: '10 Kasım 2026',
    readTime: '7 dk okuma',
    title: 'WebGL Ürün Sahnelerinde Işık, Kamera ve Mobil Okunabilirlik Dengesi',
    shortDesc:
      'Tarayıcı içinde 3D bir nesne sergilerken sahnenin ziyaretçiyi yormaması, ürün formunun net okunması ve sayfa kaydırmasıyla çakışmaması için pratik mühendislik kuralları.',
    image: 'assets/images/projects/haking-vault.webp',
    tags: ['WebGL', 'Three.js', '3D UX', 'Mobil Performans'],
    sections: [
      {
        id: 'form-okunabilirligi',
        heading: '3D bir sahne yalnızca döndürülebildiği için kullanışlı sayılmaz',
        html: `
          <p>Tarayıcı içi 3D vitrinlerde (ister bir ürün modeli ister <a href="proje-haking-vault.html">HaKING 3D Vault</a>’taki HP Victus 16 donanım modeli olsun) temel amaç nesneyi süslemek değil, <strong>formunu, ölçeğini ve detaylarını anlaşılır kılmaktır</strong>. Aşırı karanlık sinematik gölgeler veya çok parlak yansımalar ürünün yüzey dokusunu gizler.</p>
          <p>Üç noktalı dengeli ışık (yumuşak ana ışık + karşıt dolgu + arka kenar ayrımı) ve nötr zemin rengi, nesnenin siluetini hem açık hem koyu ortamlarda net biçimde öne çıkarır.</p>
        `,
      },
      {
        id: 'mobil-kaydirma',
        heading: 'Mobil cihazlarda dokunma çakışmasını çözmek',
        html: `
          <p>Mobilde tam genişlikte bir 3D tuvalin en sık yarattığı sorun “kaydırma tuzağıdır” (scroll trap): kullanıcı sayfayı aşağı indirmek isterken parmağı tuvale denk gelir ve sayfa yerine model döner. Bunu önlemek için:</p>
          <ul>
            <li>3D tuvali sayfanın tamamına yaymak yerine kontrollü bir çerçeve (ör. <code>max-height: 62vh</code>) içinde tutun.</li>
            <li>Varsayılan durumda “3D İncelemeyi Başlat” kilidi veya iki parmak / kenar boşluğu bırakma yaklaşımı uygulayın.</li>
            <li>Kamera açısı değişimini DOM üzerindeki hazır görünüm düğmeleriyle (“Ön”, “Yan”, “Detay”, “Sıfırla”) destekleyerek tek dokunuşla erişilebilir kılın.</li>
          </ul>
          <p>Daha kapsamlı Three.js performans kararları için <a href="makale-2.html">WebGL ve Three.js vaka analizine</a> göz atabilirsiniz.</p>
        `,
      },
    ],
    faqs: [
      {
        q: 'Mobil cihazlarda 3D sahnenin pil tüketimini nasıl azaltabilirim?',
        a: 'Kullanıcı kamerayı hareket ettirmediğinde ve animasyon gerekmediğinde sürekli 60 FPS döngüsü çalıştırmak yerine yalnızca değişiklik olduğunda (render-on-demand) çizim yapmak GPU kullanımını dramatik biçimde düşürür.',
      },
    ],
  },
];
