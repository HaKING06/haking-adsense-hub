export const CORE_ARTICLES = [
  {
    slug: 'makale-1',
    file: 'makale-1.html',
    kind: 'Vaka Analizi',
    category: 'Yapay Zekâ',
    projectSlug: 'haking-ai',
    date: '2026-11-27',
    dateDisplay: '27 Kasım 2026',
    readTime: '11 dk okuma',
    featured: true,
    title: 'HaKING AI v1.19.2 Mimarisi: FastAPI, SSE Akışı, Prompt Karar Belleği ve Neon Kredi Katmanı',
    shortDesc:
      'Tarayıcı ön yüzü ile model sağlayıcıları arasında nasıl güvenli bir servis sınırı kurdum? SSE akış gecikmesi, Groq/Gemini yönlendirme, ortak kredi muhasebesi ve Prompt Modu mimarisi.',
    image: 'assets/images/projects/haking-ai.webp',
    tags: ['FastAPI', 'SSE', 'Cloudflare Workers', 'Neon PostgreSQL', 'Prompt Modu'],
    sections: [
      {
        id: 'problem',
        heading: 'Problemi doğru tarif etmek: boş bekleme yerine görünür ve güvenilir ilerleme',
        html: `
          <p>HaKING AI’ı geliştirmeye başladığımda amacım yalnızca bir metin kutusunu harici bir dil modeli API’sine bağlamak değildi. Kullanıcı karmaşık bir kod veya mimari soru gönderdiğinde arayüzün hangi aşamada olduğunu bilmesi, yanıtı tek seferde 20 saniye beklemek yerine parça parça görmesi ve bağlantı koptuğunda sessizce donmayan bir deneyim yaşaması gerekiyordu.</p>
          <p>Bu gereksinim beni sistemi üç net sorumluluk katmanına ayırmaya yöneltti: <strong>Cloudflare Workers</strong> üzerinde sunulan sıfır çerçeveli statik ön yüz (<code>ai.haking.tr</code>), istek doğrulama ve model iletişimini yöneten <strong>Python/FastAPI</strong> arka uç servisi ve kullanıcı hesapları ile aylık kredi bakiyelerini tutan <strong>Neon PostgreSQL</strong> katmanı. Ön yüz kodunun tarayıcıda herkesçe okunabilir olması nedeniyle hiçbir model anahtarı, sistem promptu veya kredi düşüm mantığı istemci tarafına bırakılmadı.</p>
          <div class="callout">
            <span class="callout-title">Mimari İlke</span>
            <p>İstemci yalnızca kullanıcı niyetini iletir ve sunucudan gelen olay akışını işler. Kimlik doğrulama, Cloudflare Turnstile kontrolü, yaş beyanı doğrulaması, kredi rezervasyonu ve sağlayıcı seçimi tamamen sunucu tarafında yürütülür.</p>
          </div>
        `,
      },
      {
        id: 'servis-siniri',
        heading: 'Cloudflare Workers ön yüzü ve FastAPI servis sınırı',
        html: `
          <p>Ön yüzün ek bir SPA çatısı (React/Next vb.) olmadan saf HTML, CSS ve modüler JavaScript ile yazılması bilinçli bir hız kararıydı. Statik varlıklar kenar (edge) düğümlerden milisaniyeler içinde iner; sohbet penceresi açılır açılmaz kullanıcı yazmaya hazırdır. API istekleri ise ayrı yayınlanan FastAPI servisine yönlendirilir.</p>
          <p>Farklı origin’ler arasında çalışan bu yapıda CORS politikası joker (<code>*</code>) ile gevşetilmek yerine yalnızca doğrulanmış <code>ai.haking.tr</code> dağıtım origin’ine ve gerekli HTTP yöntemlerine açılır. Ayrıca geliştirme ortamı ile üretim ortamı arasındaki API adresinin karışmaması için v1.15.0 sürümünde yayın ortamı bazlı API adresi denetimi eklendi.</p>
          <div class="code-block">
            <div class="code-head"><span>Mimari Veri Akışı</span><button type="button" class="copy-code-btn" data-copy-code>Kopyala</button></div>
            <pre><code>Tarayıcı (ai.haking.tr / Cloudflare Workers)
   │  POST /chat/stream  [JWT + Turnstile + prompt_state]
   ▼
FastAPI Backend (ASGI / Uvicorn)
   ├─► Neon PostgreSQL (kredi kontrolü &amp; atomik hareket kaydı)
   ├─► Sağlayıcı Yönlendirici (Groq ↔ Google Gemini sağlık sırası)
   └─► SSE Akışı (event: stage / token / prompt_state / done) ──► Tarayıcı</code></pre>
          </div>
        `,
      },
      {
        id: 'sse-akisi',
        heading: 'Server-Sent Events (SSE) ile algılanan gecikmeyi düşürmek',
        html: `
          <p>Dil modellerinde toplam yanıt süresi ile <strong>ilk görünür parça süresi (TTFT — Time To First Token)</strong> kullanıcı psikolojisinde tamamen farklı etki yaratır. Yanıtı arka uçta tamamlanana kadar biriktirip tek bir JSON gövdesiyle dönmek, kullanıcının 12–18 saniye boyunca dönen bir ikon izlemesine yol açar. SSE akışı ise HTTP yanıtını açık tutarak sağlayıcıdan gelen her metin parçasını anında tarayıcıya iletir.</p>
          <p>Bununla birlikte akış sırasında tarayıcı tarafında ayrı bir darboğaz ortaya çıkar: her gelen 2-3 karakterlik parçada bütün Markdown belgesini sıfırdan HTML’e çevirmek uzun kod yanıtlarında ana iş parçacığını (main thread) kilitler. HaKING AI istemcisi gelen parçaları kare yenileme döngüsüyle birleştirerek işler ve tamamlanmış kod bloklarını gereksiz yere yeniden derlemez.</p>
          <div class="code-block">
            <div class="code-head"><span>FastAPI SSE üretici örneği (stream.py)</span><button type="button" class="copy-code-btn" data-copy-code>Kopyala</button></div>
            <pre><code>async def stream_response(provider_stream, request):
    started = False
    async for chunk in provider_stream:
        if await request.is_disconnected():
            break
        if chunk.text:
            started = True
            yield f"event: token\\ndata: {json.dumps({'text': chunk.text}, ensure_ascii=False)}\\n\\n"
    if not started:
        yield 'event: error\\ndata: {"code":"EMPTY_STREAM","refunded":true}\\n\\n'
    else:
        yield 'event: done\\ndata: {}\\n\\n'</code></pre>
          </div>
          <p>Yukarıdaki <code>started</code> bayrağı kredi adaleti açısından kritiktir: sağlayıcı kota hatası veya ağ zaman aşımı nedeniyle kullanıcıya hiç metin akışı başlamamışsa, rezerve edilen kredi otomatik olarak hesaba geri yazılır. Akış başladıktan sonra ise sağlayıcı maliyeti oluştuğu için iade yapılmaz ve bu kural arayüzde şeffaf biçimde belirtilir.</p>
        `,
      },
      {
        id: 'saglayici-yonlendirme',
        heading: 'Groq ve Google Gemini arasında otomatik sağlayıcı yönlendirme',
        html: `
          <p>Ücretsiz ve düşük maliyetli model katmanlarıyla sürdürülebilir bir hizmet yürütürken tek bir sağlayıcıya bağımlı kalmak kesinti riskini artırır. Bir sağlayıcı geçici oran sınırına (rate limit) veya 5xx hatasına düştüğünde sistem, hata geçmişini kısa süreli sağlık puanına işleyerek bir sonraki istekte sağlıklı modeli öne alır.</p>
          <p>v1.16.0 ile birlikte bağlantı hatası ile üretim hatası birbirinden ayrıştırıldı. Özellikle Prompt Modunun iç görev analizinde ve denetim aşamasında yapılandırılmış JSON çıktısı zorunlu tutulduğundan, bir sağlayıcıdan yarıda kesilen JSON parçası başka bir sağlayıcının çıktısıyla asla birleştirilmez; istek temiz bir oturumla yeniden yürütülür.</p>
          <div class="table-scroll">
            <table>
              <thead>
                <tr><th>Mod</th><th>Amaç</th><th>Web Araştırması</th><th>Kredi Maliyeti</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>Normal Sohbet</strong></td><td>Kod yazma, açıklama, hata ayıklama, dosya inceleme</td><td>Yok</td><td>Ücretsiz (0 kredi)</td></tr>
                <tr><td><strong>Prompt Modu — Keşif</strong></td><td>Eksik gereksinim, hedef agent ve kısıtları netleştirme</td><td>Yalnızca gerektiğinde önbellekli kontrol</td><td>Ücretsiz (0 kredi)</td></tr>
                <tr><td><strong>Prompt Modu — Nihai Üretim</strong></td><td>Araştırma + bağımsız denetim + kopyalanabilir agent promptu</td><td>Gerektiğinde canlı web araştırması</td><td>5 HaKING kredisi</td></tr>
                <tr><td><strong>Çılgın Mod</strong></td><td>Önce proje brief’i hazırlama, ardından kapsamlı teslimat</td><td>Yeni proje taleplerinde Tavily</td><td>10 HaKING kredisi</td></tr>
              </tbody>
            </table>
          </div>
        `,
      },
      {
        id: 'prompt-bellegi',
        heading: 'v1.19.2 ile gelen Prompt Karar Belleği ve görev yalıtımı',
        html: `
          <p>Kullanıcılar sohbet içinde çok adımlı bir ürün tanımı yaparken en sık yaşanan sorun, üçüncü veya dördüncü mesajda ilk başta koydukları kuralların (“SQL ekleme”, “alan adı kökünü koru”, “ücretsiz altyapı kullan”) model tarafından unutulmasıdır. HaKING AI bunu <code>prompt_state</code> adı verilen yapılandırılmış bir görev kartıyla çözer.</p>
          <p>Görev kartı üç ayrı liste taşır: <strong>kesinleşen kullanıcı şartları</strong>, <strong>agente devredilen kararlar</strong> ve <strong>hâlâ açık olan kritik sorular</strong>. Kullanıcı “Yeni görev” düğmesine bastığında veya Prompt Moduna ilk kez geçtiğinde önceki normal sohbet mesajları yeni göreve otomatik şart olarak taşınmaz. Böylece farklı projelerin kuralları birbirine bulaşmaz. Prompt Modunun tam çalışma akışını ve gerçek sohbet değerlendirmelerini <a href="haking-ai-prompt-modu.html">HaKING AI Prompt Modu özel sayfasında</a> inceleyebilirsiniz.</p>
        `,
      },
      {
        id: 'sonuc',
        heading: 'Öğrenilen dersler ve kapsam şeffaflığı',
        html: `
          <p>HaKING AI’ın 1.0’dan 1.19.2’ye uzanan gelişiminde en önemli mimari ders, yapay zekâ uygulamalarında güvenilirliğin yalnızca kullanılan modelin büyüklüğünden değil, etrafındaki <strong>durum yönetimi, hata kurtarma ve kredi şeffaflığı</strong> katmanlarından geldiğidir. Akış kopması, JSON bozulması ve sağlayıcı kısıtları istisna değil, tasarımın doğal parçası olarak ele alındığında ürün kararlı hale gelir.</p>
          <p>Canlı sistemi <a href="https://ai.haking.tr/" target="_blank" rel="noopener noreferrer">ai.haking.tr</a> üzerinden test edebilir, kaynak kodu <a href="https://github.com/HaKING06/haking-asistan-frontend" target="_blank" rel="noopener noreferrer">GitHub deposunda</a> inceleyebilirsiniz. Bu yazıda yayımlanabilir bağımsız trafik veya milisaniye kıyaslama ölçümü bulunmayan alanlarda sayısal performans iddiası kullanılmamıştır.</p>
        `,
      },
    ],
    faqs: [
      {
        q: 'HaKING AI neden WebSocket yerine SSE kullanıyor?',
        a: 'Sohbet akışında sunucudan istemciye tek yönlü metin yayını yeterlidir; yeni kullanıcı mesajları standart HTTP POST ile gönderilir. SSE, standart HTTP/2 proxy ve sunucusuz (serverless) ortamlarda WebSocket’e göre daha düşük bakım maliyeti sunar.',
      },
      {
        q: 'Aylık 100 ücretsiz kredi sonraki aya devreder mi?',
        a: 'Hayır, aylık ücretsiz 100 kredi her takvim ayı başında 100’e yenilenir. Ancak ek paket olarak tanımlanan kredi lotları ayrı izlenir ve eklendiği tarihten itibaren 30 gün boyunca aylık yenilemede korunur.',
      },
    ],
  },

  {
    slug: 'makale-spread-arbitraj-mimarisi',
    file: 'makale-spread-arbitraj-mimarisi.html',
    kind: 'Vaka Analizi',
    category: 'CS2 Ekonomi & Oyun',
    projectSlug: 'spread',
    date: '2026-11-26',
    dateDisplay: '26 Kasım 2026',
    readTime: '10 dk okuma',
    featured: true,
    title: 'SPREAD V11.1 Mimarisi: Valve Cent Komisyonu, Gerçek Steam Hacmi ve 500 Senaryolu Monte Carlo CVaR',
    shortDesc:
      'CS2 arbitraj hesaplayıcıları neden sıkça hayali kâr gösterir? Valve’ın cent tabanlı kesinti formülü, 7g/30g satış geçmişi ve Tekli vs. Sepet Meta-Hakem algoritmasının arkasındaki matematik.',
    image: 'assets/images/projects/spread.webp',
    tags: ['SPREAD', 'CS2 Ekonomi', 'Monte Carlo CVaR', 'Valve Cent', 'Cloudflare Workers'],
    sections: [
      {
        id: 'hayali-kar-sorunu',
        heading: 'Klasik CS2 arbitraj tabloları neden yanıltıcı sonuç üretir?',
        html: `
          <p>Counter-Strike 2 pazar yerleri (CSFloat, Youpin898, Buff163, Skinport) ile Steam Topluluk Pazarı arasındaki fiyat farklarını tarayan pek çok basit hesaplayıcı tek bir kritik hata yapar: yalnızca <strong>en düşük ilan fiyatını (Lowest Ask)</strong> baz alıp sabit <code>÷ 1.15</code> formülü uygular. Oysa gerçek ticarette bu iki varsayım da ciddi sapmalara yol açar.</p>
          <p>İlk olarak, Steam’de 120 $’dan listelenen ancak son 30 günde hiç satılmamış veya son gerçek satışı 88 $ olmuş bir StatTrak™ kaplama, kâğıt üzerinde %35 kâr gösterirken pratikte haftalarca satılmadan sermayeyi kilitler. İkinci olarak, Valve’ın Steam Topluluk Pazarı komisyon sistemi düz %15 değildir; her iki alt kesinti (Steam %5 + CS2 %10) cent bazında aşağı yuvarlanır ve her biri en az 0,01 $ taban ücret alır.</p>
        `,
      },
      {
        id: 'valve-cent-matematigi',
        heading: 'Kuruş hassasiyetinde Valve Cent komisyon matematiği',
        html: `
          <p>Steam Topluluk Pazarında alıcının ödediği tutar ile satıcının cüzdanına geçen net tutar arasındaki ilişki tam sayı cent (<code>cents</code>) üzerinden hesaplanır. Satıcının almak istediği net tutar <code>R</code> cent ise:</p>
          <div class="code-block">
            <div class="code-head"><span>Valve Cent Komisyon Hesabı (math-engine.js)</span><button type="button" class="copy-code-btn" data-copy-code>Kopyala</button></div>
            <pre><code>function valveFeesFromNetCents(netCents) {
  const steamFee = Math.max(1, Math.floor(netCents * 0.05));
  const gameFee  = Math.max(1, Math.floor(netCents * 0.10));
  return {
    steamFee,
    gameFee,
    buyerPaysCents: netCents + steamFee + gameFee
  };
}</code></pre>
          </div>
          <p>Bu formül özellikle düşük ve orta fiyatlı skinlerde ve yüksek adetli sepetlerde belirgin fark yaratır. Örneğin 0,03 $’lık bir eşyada satıcı yalnızca 0,01 $ alır; etkin komisyon oranı %13,04 değil %66,67’ye çıkar. SPREAD V11.1 hem tam Valve Cent modelini hem de karşılaştırma amacıyla klasik <code>÷ 1.15</code> ve özel komisyon oranlarını destekler.</p>
        `,
      },
      {
        id: 'yonlu-likidite',
        heading: 'Yönlü likidite fiziği: 1. Adım Steam, 2. Adım Nakit Pazar',
        html: `
          <p>İki yönlü bir döngüde (Nakit Pazar → Steam Bakiye → Nakit Çıkış) iki adımın likidite dinamikleri birbirinden tamamen farklıdır:</p>
          <ul>
            <li><strong>1. Adım (Steam Bakiyesi Üretimi):</strong> Dış pazarda alınan skin Steam’de satılır. Burada önemli olan Steam’deki son 7 günlük ve 30 günlük gerçek satış geçmişi, aktif satış duvarı (sell wall) ve anlık alım emri (buy order) derinliğidir.</li>
            <li><strong>2. Adım (Nakit Çıkış):</strong> Steam bakiyesiyle alınan skin CSFloat veya Youpin898’de nakde çevrilir. Burada Steam hacmi değil, çıkış yapılan nakit pazarın kendi satış hızı, komisyonu (CSFloat %2 / Youpin %1) ve çekim maliyeti belirleyicidir.</li>
          </ul>
          <p>SPREAD V11.1, <strong>354+ Doppler ve Gamma Doppler fazını</strong> (Ruby, Sapphire, Emerald, Phase 1–4) ayrı <code>def_index + paint_index</code> eşleştirmesiyle izleyerek faz kaynaklı yanlış fiyat eşleşmelerini (gem overpay tuzaklarını) önler.</p>
        `,
      },
      {
        id: 'monte-carlo-sepet',
        heading: '500 senaryolu Monte Carlo CVaR ve Tekli vs. Sepet Meta-Hakemi',
        html: `
          <p>CS2 ekonomisinde 7-8 günlük takas koruma penceresi boyunca fiyatlar sabit kalmaz. SPREAD, yalnızca tek bir nokta tahmini vermek yerine her aday strateji için 500 senaryolu ağır kuyruklu (fat-tail) Monte Carlo simülasyonu çalıştırır. Çıktıda beklenen kâr (<strong>EV</strong>), en kötü %5 senaryodaki taban getiri (<strong>CVaR %5</strong>) ve sermaye güvenliği için <strong>Half-Kelly</strong> oranı gösterilir.</p>
          <p>Yüksek bütçeli işlemlerde tek bir skinden 30 adet almak emir defterini tıkar ve satış süresini haftalara yayar. <strong>SPREAD Agent V11 Meta-Hakem</strong> bu noktada Tekli Mod ile 2–3 paralel emir defterine bölünmüş Sepet Modunu kafa kafaya kıyaslar; kullanıcı masadan bir skini çıkardığında kalan Steam bakiyesini diğer skinlere otomatik yeniden dengeler.</p>
          <div class="table-scroll">
            <table>
              <thead>
                <tr><th>Özellik</th><th>Basit Hesaplayıcılar</th><th>SPREAD V11.1</th></tr>
              </thead>
              <tbody>
                <tr><td>Fiyat Bazı</td><td>Yalnızca en düşük ilan (Ask)</td><td>Gerçek Steam 7g/30g satış + Gerçekçi Satış / Anında Sat presetleri</td></tr>
                <tr><td>Komisyon</td><td>Yaklaşık %13–15</td><td>Kuruş hassasiyetli Valve Cent + CSFloat/Youpin çekim kesintisi</td></tr>
                <tr><td>Doppler Fazları</td><td>Çoğunlukla tek fiyat (yanıltıcı)</td><td>354+ ayrı faz ve gem koruma filtresi</td></tr>
                <tr><td>Risk Analizi</td><td>Yok</td><td>500 senaryolu Monte Carlo EV &amp; CVaR %5</td></tr>
                <tr><td>Veri Güvenliği</td><td>Sıklıkla Steam girişi ister</td><td>%100 sıfır kayıtlı, SHA-256 yerel JSON yedek</td></tr>
              </tbody>
            </table>
          </div>
        `,
      },
      {
        id: 'sinirlar',
        heading: 'Bilinen sınırlar ve sorumlu kullanım',
        html: `
          <p>Nicel bir terminal kârı garanti etmez; amacı <strong>riski görünür kılmak ve bariz likidite hatalarını işlem öncesinde elemektir</strong>. Canlı fiyat akışları üçüncü taraf pazar API’lerinin anlık durumuna bağlıdır ve Steam politika değişiklikleri takas sürelerini etkileyebilir. Canlı terminali <a href="https://spread.haking.tr/" target="_blank" rel="noopener noreferrer">spread.haking.tr</a> adresinde inceleyebilir, yerel işlem takibi için <a href="proje-csell.html">CSELL</a> ile birlikte kullanabilirsiniz.</p>
        `,
      },
    ],
    faqs: [
      {
        q: 'CVaR %5 metriği bir CS2 işlemi için ne ifade eder?',
        a: '500 olası fiyat hareketi senaryosu içinde en olumsuz %5’lik dilimin ortalama sonucunu gösterir. Yani “piyasa ters giderse ortalama ne kadar zarar ederim?” sorusuna somut bir alt sınır verir.',
      },
    ],
  },

  {
    slug: 'makale-2',
    file: 'makale-2.html',
    kind: 'Vaka Analizi',
    category: 'Tasarım & Web',
    projectSlug: 'haking-vault',
    date: '2026-11-20',
    dateDisplay: '20 Kasım 2026',
    readTime: '9 dk okuma',
    featured: false,
    title: 'Tarayıcıda Etkileşimli 3D Deneyimler: Three.js, WebGL Performansı ve DOM Uyumu',
    shortDesc:
      'HaKING 3D Vault, CS2 Studio Dust2 Spray Arenası ve Haking Chat 3D masa oyunlarını geliştirirken edindiğim WebGL render bütçesi, ışıklandırma ve mobil uyumluluk dersleri.',
    image: 'assets/images/projects/haking-vault.webp',
    tags: ['Three.js', 'WebGL', 'GLTF', 'Performans', 'Erişilebilirlik'],
    sections: [
      {
        id: 'neden-3d',
        heading: 'Tarayıcıda 3D ne zaman gerçek değer üretir?',
        html: `
          <p>WebGL ve Three.js etkileyici görseller üretmeyi kolaylaştırır; ancak sırf teknoloji gösterisi olsun diye eklenen 3D sahneler sayfa yükünü katlar, mobil cihazların pilini tüketir ve okuyucuyu asıl içerikten uzaklaştırır. HaKING ekosistemindeki üç farklı projede — <a href="proje-haking-vault.html">HaKING 3D Vault</a> (3D HP Victus 16 donanım modeli ve Steam Müzesi), <a href="proje-cs2studio.html">CS2 Studio</a> (3D Dust2 Spray Arenası) ve <a href="proje-haking-chat.html">Haking Chat</a> (3D Okey/Tavla/Satranç) — 3D katmanını yalnızca kullanıcıya iki boyutlu bir görselin veremediği mekânsal etkileşimi sağladığı yerlerde kullandım.</p>
          <p>Bu üç projeden çıkan ortak tasarım kuralı şudur: <strong>3D sahne sayfanın kendisi değil, HTML arayüzüyle konuşan kontrollü bir bileşendir.</strong> Başlıklar, ürün bilgileri, kontroller ve erişilebilir butonlar her zaman standart DOM elemanları olarak kalmalıdır.</p>
        `,
      },
      {
        id: 'doku-ve-yuk',
        heading: 'Model geometrisi, doku çözünürlüğü ve açılış bütçesi',
        html: `
          <p>Tarayıcıdaki 3D performans darboğazlarının büyük bölümü poligon sayısından önce <strong>sıkıştırılmamış 4K dokular</strong> ve kontrolsüz piksel yoğunluğu (<code>devicePixelRatio</code>) kaynaklıdır. Retina ekranlı bir telefonda <code>dpr = 3</code> ile tam ekran render almak, GPU’ya standart ekrana kıyasla 9 kat daha fazla piksel çizdirir.</p>
          <div class="code-block">
            <div class="code-head"><span>Kontrollü Three.js renderer yapılandırması</span><button type="button" class="copy-code-btn" data-copy-code>Kopyala</button></div>
            <pre><code>const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

// Sekme arka plandayken gereksiz GPU tüketimini durdur
document.addEventListener('visibilitychange', () => {
  isPaused = document.hidden;
});</code></pre>
          </div>
          <p>HaKING 3D Vault müzesinde mermer, ahşap ve alçı yüzeyler için 1K JPEG/WebP dokular (<code>diff</code>, <code>nor</code>, <code>rough</code>) tercih edilerek hem gerçekçi ışık kırılımı hem de makul toplam indirme boyutu dengelendi. GLTF/BIN modelleri ise sayfa ilk açıldığında ana metni bloklamadan arka planda yüklenir.</p>
        `,
      },
      {
        id: 'isik-kamera',
        heading: 'Işık dengesi, kamera sınırları ve kullanıcı yönlendirmesi',
        html: `
          <p>Kullanıcıya sınırsız bir serbest kamera vermek ilk bakışta özgürlük gibi görünür; fakat ziyaretçi bir kez modelin içine girdiğinde veya zeminin altına düştüğünde sahneden kopar. <code>OrbitControls</code> üzerinde minimum/maksimum yakınlaştırma mesafesi (<code>minDistance</code>, <code>maxDistance</code>) ve dikey kutup açısı (<code>maxPolarAngle</code>) mutlaka sahne ölçüsüne göre kilitlenmelidir.</p>
          <p>Aydınlatmada ise tek bir sert noktasal ışık yerine yumuşak çevresel yansıma (<code>RoomEnvironment</code> veya PMREM) ile yönlü bir ana ışık birleştirildiğinde metalik ve mat yüzeyler doğal biçimde ayrışır. Mobil kullanıcılar için tek parmakla sayfa kaydırma ile iki parmakla/sahne içi etkileşim arasındaki çakışmayı önlemek, kullanılabilirlik açısından hayati önem taşır.</p>
        `,
      },
      {
        id: 'fallback',
        heading: 'WebGL olmadığında ve arama motorları için erişilebilirlik',
        html: `
          <p>Arama motoru botları, ekran okuyucular ve eski GPU sürücüsüne sahip cihazlar <code>&lt;canvas&gt;</code> içindeki pikselleri okuyamaz. Bu yüzden her 3D sahnenin yanında statik bir poster görseli, açıklayıcı metinler ve HTML tabanlı gezinti kontrolleri yer almalıdır. HaKING 3D Vault’ta 20 dilin tamamı için üretilen statik WebP müze afişleri hem sosyal medya paylaşımlarını hem de düşük donanımlı cihaz deneyimini güvence altına alır.</p>
        `,
      },
    ],
    faqs: [
      {
        q: 'Three.js sahneleri SEO’yu olumsuz etkiler mi?',
        a: 'Sayfa metni yalnızca Canvas içinde çiziliyorsa veya 3D kütüphanesi ilk boyamayı (LCP) geciktiriyorsa evet. Metinler semantik HTML’de sunulur ve Three.js sahnesi ertelenmiş (lazy) yüklenirse SEO performansı korunur.',
      },
    ],
  },

  {
    slug: 'makale-3',
    file: 'makale-3.html',
    kind: 'Vaka Analizi',
    category: 'Tarayıcı Eklentileri',
    projectSlug: 'qr-scanner',
    date: '2026-11-22',
    dateDisplay: '22 Kasım 2026',
    readTime: '10 dk okuma',
    featured: false,
    title: 'Tarayıcı Eklentilerinde Güvenlik ve Yerel Hesaplama: QR Scanner, ÇevirmenX ve NotMatik İlkeleri',
    shortDesc:
      'Manifest V3 izin disiplini, çoklu tarayıcı derleme hattı ve çevrimdışı PWA hesaplama doğruluğu: üç farklı günlük aracın ortak mühendislik temelleri.',
    image: 'assets/images/projects/qr-scanner.webp',
    tags: ['Manifest V3', 'Chrome Extension', 'PWA', 'Gizlilik', 'JavaScript'],
    sections: [
      {
        id: 'ortak-sorun',
        heading: 'Üç farklı araç, tek bir ortak tasarım felsefesi',
        html: `
          <p>İlk bakışta <a href="proje-qr-scanner.html">QR Scanner (v1.1.4)</a>, <a href="proje-cevirmenx.html">ÇevirmenX (v1.4.0)</a> ve <a href="proje-notmatik.html">NotMatik (v3.0)</a> tamamen farklı kullanıcı problemlerini çözer: biri QR kod üretip tarar, biri sayfa içi metin çevirir, diğeri üniversite ders ortalaması hesaplar. Ancak geliştirme sürecinde bu üç ürünü birleştiren çok güçlü ortak mühendislik ilkeleri ortaya çıktı: <strong>minimum veri çıkışı, sıfır hesap zorunluluğu ve hatalı girdilere karşı savunmacı tasarım</strong>.</p>
        `,
      },
      {
        id: 'manifest-v3',
        heading: 'Manifest V3 izin disiplini ve mağaza inceleme süreci',
        html: `
          <p>Chrome Web Store ve Microsoft Edge Add-ons incelemelerinde en sık reddedilen uzantılar, “ileride lazım olur” düşüncesiyle geniş <code>&lt;all_urls&gt;</code> veya gereksiz <code>tabs</code> izni isteyenlerdir. QR Scanner’da aktif sekme taraması ve sayfa bağlantısından QR üretimi yalnızca kullanıcı uzantı simgesine tıkladığında (<code>activeTab</code>) devreye girer; arka planda gezinti geçmişi okunmaz.</p>
          <p>ÇevirmenX 1.4.0’da ise seçili metin üzerindeki çeviri balonu her sitenin kendi CSS kurallarıyla çakışmamalıdır. Bu nedenle izole stil sarmalayıcıları ve çakışmayan kısayol yönetimi (<code>Alt+T</code> + özelleştirilebilir kısayol) benimsendi; aynı kaynak koddan tek derleme betiğiyle Chrome, Edge ve Firefox (<code>.xpi</code>) paketleri üretildi.</p>
        `,
      },
      {
        id: 'hesaplama-dogrulugu',
        heading: 'NotMatik v3.0’da tam sayı katkısı ve imkânsız hedef kontrolleri',
        html: `
          <p>Basit görünen bir not hesaplama aracı, gerçek öğrenci senaryolarında şaşırtıcı sayıda uç durum barındırır: virgül ile nokta ayrımı (<code>67,5</code> vs <code>67.5</code>), ağırlık toplamının %100 etmemesi, bazı üniversitelerde her bileşenin tam sayı katkısıyla toplanması ve “finalden 112 alman gerekiyor” gibi pratikte olanaksız hedefler.</p>
          <p>NotMatik’te her girdi anlık doğrulanır, ağırlık toplamı görsel olarak izlenir ve 100’ü aşan hedef final sonuçları kullanıcıyı yanıltmayacak biçimde açık uyarıyla sunulur. Service Worker desteği sayesinde sınav haftasında internet bağlantısı kesilse dahi Hedef Defterim kayıtlarına çevrimdışı erişilebilir.</p>
        `,
      },
      {
        id: 'kontrol-tablosu',
        heading: 'Üç üründe veri akışı ve gizlilik karşılaştırması',
        html: `
          <div class="table-scroll">
            <table>
              <thead>
                <tr><th>Ürün</th><th>Hesap Gerekir mi?</th><th>Veri Nerede İşlenir?</th><th>Çevrimdışı Çalışma</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>QR Scanner v1.1.4</strong></td><td>Hayır</td><td>%100 cihaz içi (tarayıcı belleği)</td><td>Tam destek</td></tr>
                <tr><td><strong>NotMatik v3.0</strong></td><td>Hayır</td><td>%100 cihaz içi (localStorage + SW)</td><td>Tam PWA destek</td></tr>
                <tr><td><strong>ÇevirmenX v1.4.0</strong></td><td>Hayır</td><td>Seçili metin çeviri servisine gider; sözlük ve geçmiş yereldedir</td><td>Kişisel sözlük yerel</td></tr>
              </tbody>
            </table>
          </div>
          <p>Bir aracın veri akışını sade tutmak yalnızca gizliliği artırmaz; sunucu bakım yükünü, hata yüzeyini ve gecikmeyi de kökten azaltır.</p>
        `,
      },
    ],
    faqs: [
      {
        q: 'Chrome ve Edge için ayrı kod tabanı mı yazılıyor?',
        a: 'Hayır. QR Scanner ve ÇevirmenX ortak çekirdek kod tabanı kullanır; tarayıcıya özgü manifest alanları derleme aşamasında otomatik ayrıştırılır.',
      },
    ],
  },

  {
    slug: 'makale-cosmic-tarayici-oyun-motoru',
    file: 'makale-cosmic-tarayici-oyun-motoru.html',
    kind: 'Vaka Analizi',
    category: 'CS2 Ekonomi & Oyun',
    projectSlug: 'cosmic',
    date: '2026-11-15',
    dateDisplay: '15 Kasım 2026',
    readTime: '9 dk okuma',
    featured: false,
    title: '60 Tarayıcı Oyununu Tek Portalda Yönetmek: COSMIC v12.0 Modüler Motor ve Performans Mimarisi',
    shortDesc:
      'Tek bir statik web portalında 60 farklı uzay oyununu, 24 bölümlük hikâye modunu ve ortak cephaneliği sayfa hızını bozmadan nasıl bir araya getirdim?',
    image: 'assets/images/projects/cosmic.webp',
    tags: ['COSMIC', 'HTML5 Canvas', 'Oyun Mimarisi', 'Performans', 'JavaScript'],
    sections: [
      {
        id: 'olcek-problemi',
        heading: '1 oyundan 60 oyuna çıkarken kırılan varsayımlar',
        html: `
          <p>Tek bir HTML5 Canvas oyunu yazarken tüm çizim, ses, çarpışma ve skor mantığını tek dosyada tutmak sorun çıkarmaz. Ancak sayı 60 oyuna (arcade shooter, boss gauntlet, roguelike, metroidvania, vektör asteroit vb.) ve 24 bölümlük Captain Nova Vex hikâye moduna ulaştığında monolitik bir yapı hem bakım yapılamaz hale gelir hem de kullanıcıyı megabaytlarca gereksiz kod indirmeye zorlar.</p>
          <p><a href="proje-cosmic.html">COSMIC Universe v12.0</a> mimarisinde bu sorunu çözmek için <strong>portal kabuğu</strong> ile <strong>oyun kartuşları</strong> kesin biçimde ayrıldı. Her oyun bağımsız bir JS modülü olarak tanımlanır ve yalnızca oyuncu ilgili kartı açtığında yüklenir.</p>
        `,
      },
      {
        id: 'ortak-dongu',
        heading: 'Delta-time fizik döngüsü ve ortak girdi soyutlaması',
        html: `
          <p>Modern monitörler 60 Hz, 120 Hz, 144 Hz ve 240 Hz yenileme hızlarında çalışır. Kare başına sabit piksel ilerleten bir oyun, 144 Hz ekranda 2,4 kat daha hızlı akarak oynanamaz hale gelir. COSMIC içindeki ortak zamanlayıcı, iki kare arasındaki süreyi saniye cinsinden hesaplar ve sekme değişimindeki ani sıçramaları engellemek için üst sınır (<code>Math.min(dt, 0.05)</code>) uygular.</p>
          <div class="code-block">
            <div class="code-head"><span>Kare hızı bağımsız oyun döngüsü</span><button type="button" class="copy-code-btn" data-copy-code>Kopyala</button></div>
            <pre><code>let lastTime = performance.now();
function loop(now) {
  const dt = Math.min((now - lastTime) / 1000, 0.05);
  lastTime = now;
  activeGame.update(dt, inputState);
  activeGame.render(ctx, viewport);
  rafId = requestAnimationFrame(loop);
}</code></pre>
          </div>
          <p>Girdi katmanı (<code>inputState</code>) klavye, fare ve mobil dokunmatik kontrolleri tek bir standart eksen/eylem nesnesine çevirir. Böylece yeni bir oyun eklenirken dokunmatik kontrol kodu baştan yazılmaz.</p>
        `,
      },
      {
        id: 'hafiza-temizligi',
        heading: 'Oyunlar arası geçişte bellek sızıntısını önlemek',
        html: `
          <p>Çoklu oyun portallarında en sinsi performans hatası, önceki oyundan kalan <code>requestAnimationFrame</code> döngülerinin, klavye dinleyicilerinin veya Web Audio düğümlerinin yeni oyun açıldığında arka planda çalışmaya devam etmesidir. COSMIC’te her oyun yaşam döngüsü <code>mount()</code> ve <code>destroy()</code> sözleşmesine uymak zorundadır; yeni oyuna geçmeden önce bir önceki oyunun tüm zamanlayıcıları ve olay dinleyicileri sistematik olarak temizlenir.</p>
          <p>Canlı portalı <a href="https://cosmic.haking.tr/" target="_blank" rel="noopener noreferrer">cosmic.haking.tr</a> adresinde deneyimleyebilirsiniz.</p>
        `,
      },
    ],
    faqs: [
      {
        q: '60 oyun tek sayfada indirilince sayfa yavaşlamıyor mu?',
        a: 'Hayır; oyun modülleri yalnızca seçildiğinde dinamik olarak yüklenir ve görseller optimize boyutlarda sunulur.',
      },
    ],
  },

  {
    slug: 'makale-gercek-zamanli-oyun-sunucusu',
    file: 'makale-gercek-zamanli-oyun-sunucusu.html',
    kind: 'Vaka Analizi',
    category: 'Eğitim & Topluluk',
    projectSlug: 'haking-chat',
    date: '2026-11-24',
    dateDisplay: '24 Kasım 2026',
    readTime: '10 dk okuma',
    featured: false,
    title: 'Socket.IO ve Three.js ile Sunucu Doğrulamalı Çok Oyunculu Masa Oyunları: Haking Chat Mimarisi',
    shortDesc:
      'Klasik Okey 3D, 101 Okey 3D, Tavla, Satranç ve sesli oda özelliklerini barındıran Haking Chat’te gizli el güvenliği, sıra senkronizasyonu ve oda yaşam döngüsü nasıl tasarlandı?',
    image: 'assets/images/projects/haking-chat.webp',
    tags: ['Socket.IO', 'Node.js', 'Three.js', 'Multiplayer', 'Haking Chat'],
    sections: [
      {
        id: 'istemciye-guvenmeme',
        heading: 'Çok oyunculu oyunda altın kural: istemciye asla güvenme',
        html: `
          <p>Tarayıcı tabanlı bir Okey veya 101 Okey oyununda tüm oyuncuların taşlarını tek bir <code>roomState</code> nesnesiyle herkese yayınlayıp arayüzde “diğerlerini gizle” demek ciddi bir güvenlik açığıdır; tarayıcının Ağ (Network) sekmesini açan herkes rakiplerinin elini görebilir. <a href="proje-haking-chat.html">Haking Chat</a> arka ucunda (Node.js 22 + Socket.IO) her oyun odası sunucuda tam durumu tutar, ancak her oyuncuya yalnızca kendi görmeye yetkili olduğu <strong>filtrelenmiş anlık görüntü (per-player projection)</strong> gönderilir.</p>
        `,
      },
      {
        id: 'durum-makinesi',
        heading: 'Sunucu taraflı hamle doğrulama ve durum makinesi',
        html: `
          <p>Bir oyuncu taş çekmek, taş atmak veya el açmak istediğinde istemci yeni masa durumunu göndermez; yalnızca <strong>niyet olayını</strong> (<code>{ action: 'discard', tileId }</code>) iletir. Sunucu sıranın o oyuncuda olup olmadığını, taşın gerçekten o oyuncunun elinde bulunduğunu ve oyunun aktif fazda olduğunu kontrol ettikten sonra durumu günceller.</p>
          <div class="code-block">
            <div class="code-head"><span>Oyuncu bazlı durum projeksiyonu yaklaşımı</span><button type="button" class="copy-code-btn" data-copy-code>Kopyala</button></div>
            <pre><code>function buildClientSnapshot(room, viewerId) {
  return {
    phase: room.phase,
    turnPlayerId: room.turnPlayerId,
    discardTop: room.discardPile.at(-1) || null,
    myRack: room.players[viewerId]?.rack || [],
    opponents: room.order
      .filter((id) => id !== viewerId)
      .map((id) => ({ id, name: room.players[id].name, tileCount: room.players[id].rack.length }))
  };
}</code></pre>
          </div>
          <p>Bu tasarım sayesinde istemci tarafındaki Three.js 3D sahnesi yalnızca görselleştirme ve akıcı animasyon sorumluluğunu üstlenir; kural bütünlüğü ve otomasyon testleri (<code>test/chat.test.js</code>) tamamen Node.js sunucu modüllerinde doğrulanır.</p>
        `,
      },
      {
        id: 'kopma-ve-ses',
        heading: 'Bağlantı kopması, bot devralma ve sesli oda ayrımı',
        html: `
          <p>Gerçek zamanlı masa oyunlarında bir oyuncunun interneti 5 saniye koptuğunda tüm masanın kilitlenmesi en büyük kullanıcı kaybı nedenidir. Oda yöneticisi kopan oturumlar için kısa bir yeniden bağlanma penceresi tanır; süre dolduğunda masayı akıcı tutmak için bot veya temiz tur devri mekanizmaları devreye girer. Sesli iletişim (<code>lib/voice.js</code>) sinyalleşmesi ise oyun durum yayınlarından ayrı olay kanallarında taşınarak gecikme birikmesi önlenir.</p>
          <p>Canlı platformu <a href="https://chat.haking.tr/" target="_blank" rel="noopener noreferrer">chat.haking.tr</a> adresinde ziyaret edebilirsiniz.</p>
        `,
      },
    ],
    faqs: [
      {
        q: 'Haking Chat’te hangi 3D oyunlar var?',
        a: 'Klasik Okey 3D, 101 Okey 3D, Tavla 3D, Satranç 3D (izle modu ve bot destekli), Rulet 3D, Slot 3D, Blackjack, Zar Düellosu ve Blöf modları tamamen sanal eğlence puanlarıyla sunulmaktadır.',
      },
    ],
  },

  {
    slug: 'rehber-cs2-autoexec-crosshair',
    file: 'rehber-cs2-autoexec-crosshair.html',
    kind: 'Teknik Rehber',
    category: 'CS2 Ekonomi & Oyun',
    projectSlug: 'cs2studio',
    date: '2026-11-18',
    dateDisplay: '18 Kasım 2026',
    readTime: '9 dk okuma',
    featured: false,
    title: 'CS2 Autoexec, Viewmodel, Spray Kontrolü ve Pro Crosshair Yapılandırma Rehberi',
    shortDesc:
      'Counter-Strike 2’de kalıcı autoexec.cfg nasıl hazırlanır, nişangâh kontrastı harita ışığına göre nasıl seçilir ve CS2 Studio ile tüm ayarlar tek dosyada nasıl dışa aktarılır?',
    image: 'assets/images/projects/cs2studio.webp',
    tags: ['CS2', 'Autoexec', 'Crosshair', 'Viewmodel', 'CS2 Studio'],
    sections: [
      {
        id: 'autoexec-nedir',
        heading: 'Autoexec.cfg nedir ve neden manuel ayarlardan daha güvenilirdir?',
        html: `
          <p>Counter-Strike 2’de oyun içi menüden veya konsoldan yapılan ayarlar güncelleme sonrasında sıfırlanabilir ya da farklı bir bilgisayara geçildiğinde tek tek yeniden girilmek zorunda kalır. <code>autoexec.cfg</code>, oyun her açıldığında kişisel nişangâh, silah görünümü (viewmodel), radar ve satın alma kısayollarınızı (buy binds) otomatik uygulayan düz metin yapılandırma dosyasıdır.</p>
          <p>Dosyanın son satırına mutlaka <code>host_writeconfig</code> komutu eklenmelidir; aksi halde CS2 başlangıçta okuduğu bazı değişkenleri varsayılan bulut yapılandırmasıyla ezebilir.</p>
        `,
      },
      {
        id: 'crosshair-kontrast',
        heading: 'Harita ışığına göre okunaklı nişangâh (Crosshair) seçimi',
        html: `
          <p>Dust2 ve Mirage gibi parlak kum/gökyüzü tonlarının baskın olduğu haritalarda çok ince, dış çizgisiz açık sarı bir nişangâh kolayca kaybolur. Nişangâh seçerken yalnızca sevdiğiniz bir profesyonel oyuncunun kodunu kopyalamak yerine çözünürlüğünüzü (ör. 1280×960 4:3 stretched vs. 1920×1080 16:9) ve harita arka plan kontrastını birlikte test etmeniz gerekir.</p>
          <ul>
            <li><strong>Dış Çizgi (Outline):</strong> <code>cl_crosshair_drawoutline 1</code> açık zeminlerde nişangâhın görünürlüğünü belirgin biçimde artırır.</li>
            <li><strong>Kalınlık ve Boşluk:</strong> Yüksek çözünürlükte 0.5–1 kalınlık net görünürken, düşük 4:3 çözünürlükte tam piksel hizalaması için 1 değeri daha keskindir.</li>
            <li><strong>Renk Kontrastı:</strong> Parlak yeşil, camgöbeği (cyan) veya ince siyah çerçeveli beyaz, neredeyse tüm CS2 haritalarında yüksek ayırt edicilik sağlar.</li>
          </ul>
          <p><a href="proje-cs2studio.html">CS2 Studio</a> üzerindeki 1080p gerçek harita arka planlarıyla 670+ pro oyuncunun ayarını kendi gözünüze göre anında test edip özelleştirebilirsiniz.</p>
        `,
      },
      {
        id: 'kurulum-adimlari',
        heading: 'Autoexec.cfg kurulumu ve başlatma seçenekleri',
        html: `
          <ol>
            <li><a href="https://cs2studio.haking.tr/" target="_blank" rel="noopener noreferrer">cs2studio.haking.tr</a> üzerinden nişangâh, viewmodel ve buy bind ayarlarınızı seçip <code>autoexec.cfg</code> dosyasını indirin.</li>
            <li>Dosyayı <code>Steam\\steamapps\\common\\Counter-Strike Global Offensive\\game\\csgo\\cfg\\</code> klasörüne kopyalayın.</li>
            <li>Steam kütüphanesinde CS2 → Özellikler → Başlatma Seçenekleri alanına <code>+exec autoexec.cfg</code> ekleyin.</li>
            <li>Oyunu açtıktan sonra konsolda <code>exec autoexec</code> yazarak hata mesajı olmadığını doğrulayın.</li>
          </ol>
          <div class="code-block">
            <div class="code-head"><span>Temiz autoexec.cfg iskeleti</span><button type="button" class="copy-code-btn" data-copy-code>Kopyala</button></div>
            <pre><code>// Viewmodel
viewmodel_fov 68
viewmodel_offset_x 2.5
viewmodel_offset_y 0
viewmodel_offset_z -1.5

// Buy Bind Örneği
bind "kp_1" "buy ak47; buy m4a1_silencer;"
bind "kp_2" "buy vesthelm; buy defuser;"

host_writeconfig
echo "CS2 Studio autoexec yuklendi."</code></pre>
          </div>
        `,
      },
    ],
    faqs: [
      {
        q: 'Başlatma seçeneğine +exec autoexec.cfg yazmadan dosya çalışır mı?',
        a: 'Çoğu kurulumda CS2 bu dosyayı otomatik çalıştırmaz; Steam başlatma seçeneklerine +exec autoexec.cfg eklemek en güvenilir yöntemdir.',
      },
    ],
  },
];
