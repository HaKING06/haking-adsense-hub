export const PROJECT_CATEGORIES = [
  { id: 'all', label: 'Tümü (15)' },
  { id: 'Yapay Zekâ', label: 'Yapay Zekâ' },
  { id: 'CS2 Ekonomi & Oyun', label: 'CS2 & Oyun' },
  { id: 'Tasarım & Web', label: 'Tasarım & Web' },
  { id: 'Tarayıcı Eklentileri', label: 'Eklentiler' },
  { id: 'Eğitim & Topluluk', label: 'Eğitim & Topluluk' },
];

export const PROJECTS = [
  {
    slug: 'haking-ai',
    page: 'proje-haking-ai.html',
    name: 'HaKING AI',
    version: 'v1.19.2',
    updated: '2026-11-27',
    category: 'Yapay Zekâ',
    repoName: 'haking-asistan-frontend',
    repoUrl: 'https://github.com/HaKING06/haking-asistan-frontend',
    liveUrl: 'https://ai.haking.tr/',
    secondaryLiveUrl: 'https://ai.haking.tr/?mode=prompt',
    secondaryLiveLabel: 'Prompt Modunu Aç',
    image: 'assets/images/projects/haking-ai.webp',
    imageAlt: 'HaKING AI Türkçe yazılım asistanı ve Prompt Modu afişi',
    language: 'JavaScript / Python',
    license: 'MIT',
    stack: ['FastAPI', 'SSE Akışı', 'Cloudflare Workers', 'Neon PostgreSQL', 'Groq / Gemini', 'Prompt Modu'],
    tagline: 'SSE akışlı Türkçe yazılım asistanı, yapılandırılmış Prompt Modu ve Tavily araştırmalı Çılgın Mod.',
    summary:
      'HaKING AI; kod yazma, hata ayıklama, dosya inceleme ve yapay zekâ agentları için kusursuz prompt üretme süreçlerini tek çatı altında toplayan tam yığın (full-stack) Türkçe yazılım asistanıdır. Cloudflare Workers ön yüzü ile FastAPI backend arasındaki net servis sınırı, otomatik Groq/Gemini yönlendirmesi ve Neon PostgreSQL kredi muhasebesiyle çalışır.',
    relatedArticles: ['haking-ai-prompt-modu.html', 'makale-1.html', 'rehber-ai-gecikmesi.html', 'yazi-haking-ai-kesilen-yanit.html'],
    highlights: [
      'Yeni Prompt Modu (v1.19.2): Sohbet içinde görev kartı çıkarır, devredilen kararları ve alan adı kısıtlarını korur, bağımsız denetimden geçirerek kopyalanabilir agent promptu üretir.',
      'Çılgın Mod: Yeni proje taleplerinde Tavily üzerinden kısa web araştırması yapıp yapılandırılmış brief ile kapsamlı teslimat üretir.',
      'Ortak Kredi Sistemi: Her hesap her ay 100 ücretsiz HaKING kredisi alır; normal sohbet ve Prompt Modu keşif soruları ücretsizdir (nihai prompt 5, Çılgın Mod 10 kredi).',
      'Sağlayıcı Dayanıklılığı: Groq ve Google Gemini arasında otomatik model seçimi, SSE parça akışı, Google / Gmail giriş ve Cloudflare Turnstile koruması.',
    ],
    architecture: [
      {
        title: 'İstemci ve Servis Sınırı',
        body: 'Ön yüz saf HTML, CSS ve modüler tarayıcı JavaScript ile Cloudflare Workers üzerinden sunulur; hiçbir model API anahtarı istemciye taşınmaz. Tüm doğrulama, sistem talimatları, kredi düşümü ve akış yönetimi Python/FastAPI tabanlı backend üzerinde gerçekleşir.',
      },
      {
        title: 'Prompt Karar Belleği (prompt_state)',
        body: '1.19.2 sürümüyle birlikte uzun prompt atölyesi oturumlarında kullanıcının kesinleştirdiği kurallar, agente devrettiği kararlar ve açık sorular ayrı bir görev kartında taşınır. Böylece normal sohbet geçmişi yeni prompt görevine karışmaz ve model gereksinimleri unutmaz.',
      },
      {
        title: 'Şeffaf Kredi ve Hata İadesi',
        body: 'Kredi bakiyesi ve ek 30 günlük paket lotları Neon PostgreSQL veritabanında tutulur; hareket kaydı sohbet metni içermez. Sağlayıcı hatası nedeniyle yanıt hiç başlamazsa kullanılan kredi otomatik olarak iade edilir.',
      },
    ],
    limitations:
      'HaKING AI yalnızca 18 yaş ve üzeri kullanıcılar içindir. Üretilen kod ve teknik öneriler her ortamda doğrudan üretim kalitesinde olmayabilir; çalıştırmadan önce yerel testten geçirilmeli, şifre veya API anahtarı gibi hassas veriler paylaşılmamalıdır.',
    faqs: [
      {
        q: 'HaKING AI Prompt Modu ücretli mi?',
        a: 'Prompt Modundaki keşif sohbeti ve eksik gereksinimleri netleştiren sorular tamamen ücretsizdir. Araştırma ve denetim aşamasından geçen nihai promptun üretimi ortak aylık 100 ücretsiz kredi bakiyesinden 5 kredi kullanır.',
      },
      {
        q: 'Yüklediğim kod dosyaları sunucuda saklanıyor mu?',
        a: 'Dosyalar tarayıcıda metin olarak okunur, sunucuda çalıştırılmaz ve uygulama veritabanına kalıcı olarak kaydedilmez; yalnızca o anki yanıtı üretmek için seçilen yapay zekâ sağlayıcısına iletilir.',
      },
    ],
  },
  {
    slug: 'spread',
    page: 'proje-spread.html',
    name: 'SPREAD',
    version: 'V11.1',
    updated: '2026-11-26',
    category: 'CS2 Ekonomi & Oyun',
    repoName: 'SPREAD',
    repoUrl: 'https://github.com/HaKING06/SPREAD',
    liveUrl: 'https://spread.haking.tr/',
    image: 'assets/images/projects/spread.webp',
    imageAlt: 'SPREAD V11.1 CS2 Arbitraj Terminali ve Canlı Spread Tarayıcı afişi',
    language: 'JavaScript / Node.js',
    license: 'MIT',
    stack: ['Cloudflare Workers', 'Monte Carlo CVaR', 'Steam 7g/30g Veri', 'Valve Cent Matematiği', 'Doppler Fazları'],
    tagline: '6.000+ skin ve 354+ Doppler fazıyla sıfır kayıtlı, açık kaynak CS2 çift yönlü arbitraj ve risk terminali.',
    summary:
      'SPREAD V11.1; CSFloat, Youpin898 ve Steam Topluluk Pazarı arasındaki fiyat makasını yalnızca ilan fiyatına değil, gerçek Steam 7g/30g satış geçmişine ve Valve’ın kuruş bazlı komisyon matematiğine göre modelleyen açık kaynak nicel (quant) arbitraj terminalidir.',
    relatedArticles: ['makale-spread-arbitraj-mimarisi.html', 'yazi-csell-net-satis.html', 'yazi-tradecalc-senaryolar.html'],
    highlights: [
      '6.000+ gömülü CS2 skini (354+ Doppler ve Gamma Doppler fazı dahil) ve 20.000+ eşyada anlık global arama (Ctrl+K).',
      '500 senaryolu Monte Carlo risk motoru: Beklenen değer (EV), en kötü %5 düşüş eşiği (CVaR) ve Half-Kelly pozisyon boyutlandırması.',
      'SPREAD Agent V11 Meta-Hakem: Yüksek bütçelerde Tekli Mod (1→1) ile Çoklu Sepet Modunu hacim erime hızına göre kafa kafaya kıyaslar.',
      'Kuruş hassasiyetinde Valve komisyon laboratuvarı, 7 canlı kaynak durumu ve SHA-256 doğrulamalı yerel JSON yedekleme.',
    ],
    architecture: [
      {
        title: 'İki Adımlı Yönlü Likidite Modeli',
        body: 'İlk adımda dış pazardan (CSFloat/Youpin898) alınıp Steam’de satılan eşya için canlı Steam 7g/30g satış geçmişi ve anlık alım emri duvarı incelenir. İkinci adımda Steam bakiyesini nakde çevirirken yalnızca hedef nakit pazarın gerçek satış hızı baz alınır.',
      },
      {
        title: 'Manipülasyon ve İlan Tuzağı Koruması',
        body: 'Düşük hacimli veya son satışla en düşük ilan arasında yapay makas bulunan eşyalar otomatik işaretlenir. Böylece kâğıt üzerinde yüksek görünen ama gerçekte satılamayan “hayali kâr” tuzakları elenir.',
      },
      {
        title: 'Sıfır Hesap & Yerel Güvenlik',
        body: 'Steam girişi veya kullanıcı hesabı istemez. Tüm portföy, 14 günlük takas döngüsü takibi ve kur ayarları tarayıcıda tutulur; SHA-256 bütünlük doğrulamalı JSON dosyasıyla dışa aktarılabilir.',
      },
    ],
    limitations:
      'SPREAD bir yatırım tavsiyesi aracı değildir; piyasa fiyatları, kur oynaklığı ve Steam 7-8 günlük takas bekleme süreleri gerçekleşen kârı değiştirebilir. İşlem öncesi ilgili pazar yerindeki canlı emir defteri doğrulanmalıdır.',
    faqs: [
      {
        q: 'SPREAD kullanmak için Steam hesabıyla giriş yapmak gerekiyor mu?',
        a: 'Hayır. SPREAD tamamen sıfır kayıtlı (zero-login) çalışır; Steam şifresi, API anahtarı veya takas bağlantısı istemez.',
      },
      {
        q: 'Valve Cent komisyon modeli ile düz %15 hesabı arasındaki fark nedir?',
        a: 'Valve, Steam Topluluk Pazarında alıcı fiyatına göre en az 0,01 $ taban uygulanarak %5 Steam + %10 CS2 kesintisini cent bazında yuvarlar. Küçük ve orta fiyatlı skinlerde bu yuvarlama net kâr oranını belirgin biçimde etkiler.',
      },
    ],
  },
  {
    slug: 'cosmic',
    page: 'proje-cosmic.html',
    name: 'COSMIC Universe',
    version: 'v12.0',
    updated: '2026-11-14',
    category: 'CS2 Ekonomi & Oyun',
    repoName: 'COSMIC',
    repoUrl: 'https://github.com/HaKING06/COSMIC',
    liveUrl: 'https://cosmic.haking.tr/',
    image: 'assets/images/projects/cosmic.webp',
    imageAlt: 'COSMIC Universe v12.0 60 oynanabilir uzay tarayıcı oyunu portalı afişi',
    language: 'JavaScript / Canvas',
    license: 'MIT',
    stack: ['HTML5 Canvas', 'WebGL', 'Modüler Oyun Motoru', '60 Oyun', 'Çok Dilli Arayüz'],
    tagline: '60 oynanabilir uzay temalı tarayıcı oyunu ve 24 bölümlük Captain Nova Vex hikâye modunu sunan arcade portalı.',
    summary:
      'COSMIC Universe v12.0; kurulum veya eklenti gerektirmeden doğrudan tarayıcıda çalışan 60 farklı uzay oyununu, ortak ilerleme/cephanelik sistemini ve 24 bölümlük Sezon 1 hikâye modunu tek bir hafif statik portalda birleştiren çok motorlu oyun koleksiyonudur.',
    relatedArticles: ['makale-cosmic-tarayici-oyun-motoru.html', 'makale-2.html'],
    highlights: [
      'Arcade, roguelike, boss savaşı, mermi cehennemi, asteroit savunması ve metroidvania türlerinde 60 oynanabilir oyun.',
      'Captain Nova Vex 24 bölümlük Sezon 1 hikâye akışı, gemi yükseltme cephaneliği (Armory) ve başarım sistemi.',
      'Ortak oyun döngüsü, mobil dokunmatik + masaüstü klavye kontrolleri ve isteğe bağlı yerel skor kaydı.',
      'Tamamen statik mimari: her oyun modülü yalnızca açıldığında yüklenerek ilk sayfa hızını korur.',
    ],
    architecture: [
      {
        title: 'İsteğe Bağlı Modül Yükleme (Lazy Game Loading)',
        body: '60 farklı oyunun tüm kodunu tek bir dev pakette indirmek yerine portal kabuğu hafif tutulur; kullanıcı seçtiği oyunu başlattığında ilgili oyun modülü dinamik olarak yüklenir ve ortak Canvas/girdi katmanına bağlanır.',
      },
      {
        title: 'Çerçeve Hızı Bağımsız Fizik Döngüsü',
        body: '60 Hz ile 144 Hz ekranlar arasında oyun hızının sapmaması için delta-time (dt) tabanlı güncelleme ve sabit üst sınır (frame clamp) uygulanır.',
      },
    ],
    limitations:
      'İlerleme ve yüksek skorlar tarayıcının yerel depolamasında saklanır; farklı cihazlar arasında bulut senkronizasyonu bulunmaz. Çok eski mobil cihazlarda yoğun parçacık efektli bölümlerde kare hızı düşebilir.',
    faqs: [
      {
        q: 'COSMIC oyunları mobilde de oynanabilir mi?',
        a: 'Evet, portal duyarlı arayüze ve desteklenen oyunlarda ekran içi dokunmatik kontrollere sahiptir; ancak en hassas arcade deneyimi klavye ve fareyle elde edilir.',
      },
    ],
  },
  {
    slug: 'cs2studio',
    page: 'proje-cs2studio.html',
    name: 'CS2 Studio',
    version: 'v0.1.0',
    updated: '2026-11-14',
    category: 'CS2 Ekonomi & Oyun',
    repoName: 'CS2Studio',
    repoUrl: 'https://github.com/HaKING06/CS2Studio',
    liveUrl: 'https://cs2studio.haking.tr/',
    image: 'assets/images/projects/cs2studio.webp',
    imageAlt: 'CS2 Studio 3D Dust2 Spray Arenası ve Pro Crosshair Paketi afişi',
    language: 'Astro / JavaScript',
    license: 'MIT',
    stack: ['Astro', 'Three.js', '670+ Pro Crosshair', 'Autoexec Üretici', '%100 İstemci Tarafı'],
    tagline: '3D Dust2 Spray Arenası, 670+ pro e-spor crosshair veritabanı, canlı Viewmodel ve Autoexec yapılandırma paketi.',
    summary:
      'CS2 Studio; Counter-Strike 2 oyuncularının nişangâh (crosshair), silah görünümü (viewmodel), satın alma kısayolları (buy binds) ve sprey desenlerini oyun açmadan tarayıcıda test edip doğrudan geçerli bir autoexec.cfg dosyasına dönüştürmesini sağlayan Astro tabanlı istemci tarafı araç paketidir.',
    relatedArticles: ['rehber-cs2-autoexec-crosshair.html', 'makale-2.html'],
    highlights: [
      '2012–2026 döneminden 670+ profesyonel e-spor oyuncusunun aranabilir crosshair veritabanı ve anlık paylaşım kodu üretimi.',
      '1080p gerçek CS2 harita arka planlarında canlı nişangâh kontrast testi ve 3D Dust2 Spray Arenası.',
      'Canlı Viewmodel simülatörü, görsel mekanik klavye üzerinden Buy Bind atama ve tek tıkla autoexec.cfg indirme.',
      'Astro statik mimarisiyle hızlı yükleme ve %100 tarayıcı içi çalışma.',
    ],
    architecture: [
      {
        title: 'Astro Statik Kabuk + İstemci Simülatörleri',
        body: 'Sayfa iskeleti ve SEO katmanı Astro ile önceden derlenir; ağır etkileşimli araçlar (crosshair tuvali, 3D spray alanı, klavye bind üreticisi) yalnızca ilgili araç bileşeni içinde istemci tarafında çalışır.',
      },
      {
        title: 'Doğrulanmış CS2 Konsol Çıktısı',
        body: 'Tüm slider ve anahtar seçimleri resmi CS2 konsol komutlarına (cl_crosshair*, viewmodel_offset_*, bind) dönüştürülür ve oyun klasörüne doğrudan kopyalanabilecek temiz bir yapılandırma metni üretilir.',
      },
    ],
    limitations:
      'Valve’ın CS2 güncellemeleriyle bazı konsol komutlarının adları veya geçerli değer aralıkları değişebilir; oyun içi konsol çıktısını kontrol ederek kullanmanız önerilir.',
    faqs: [
      {
        q: 'Üretilen autoexec.cfg dosyası VAC riski taşır mı?',
        a: 'Hayır. CS2 Studio yalnızca oyunun kendi standart konsol yapılandırma komutlarını (crosshair, viewmodel, buy bind) metin dosyası olarak üretir; oyuna dışarıdan enjeksiyon veya bellek müdahalesi yapmaz.',
      },
    ],
  },
  {
    slug: 'haking-chat',
    page: 'proje-haking-chat.html',
    name: 'Haking Chat',
    version: 'v2.0.2',
    updated: '2026-11-24',
    category: 'Eğitim & Topluluk',
    repoName: 'chat',
    repoUrl: 'https://github.com/HaKING06/chat',
    liveUrl: 'https://chat.haking.tr/',
    image: 'assets/images/projects/haking-chat.webp',
    imageAlt: 'Haking Chat gerçek zamanlı topluluk sohbeti ve 3D masa oyunları afişi',
    language: 'JavaScript / Node.js',
    license: 'MIT',
    stack: ['Socket.IO', 'Three.js', 'WebRTC Ses', 'Node.js 22', 'Sunucu Doğrulamalı Oyunlar'],
    tagline: 'Gerçek zamanlı geliştirici sohbeti, sesli oda ve sunucu doğrulamalı 3D Okey, Tavla, Satranç & masa oyunları.',
    summary:
      'Haking Chat; Türkçe geliştirici ve oyun topluluğu için tasarlanmış, Socket.IO gerçek zamanlı iletişim katmanı üzerine kurulu sohbet ve çok oyunculu 3D masa oyunları platformudur. Okey 3D, 101 Okey 3D, Tavla 3D, Satranç 3D, Blöf ve turnuva modları sunucu taraflı kural doğrulamasıyla çalışır.',
    relatedArticles: ['makale-gercek-zamanli-oyun-sunucusu.html', 'makale-2.html'],
    highlights: [
      'Gerçek zamanlı sohbet odaları, anlık çevrimiçi listesi ve entegre sesli oda (voice) desteği.',
      'Three.js ile görselleştirilmiş Klasik Okey 3D, 101 Okey 3D (4 kişi, gizli el), Tavla 3D, Satranç 3D (izle modu & AI bot), Rulet/Slot 3D ve Blackjack.',
      'Sunucu doğrulamalı oyun durumu: Hamle geçerliliği, taş/kart dağıtımı ve sıra kontrolü istemcide değil Node.js sunucusunda doğrulanır.',
      'Otomatikleştirilmiş test paketi (chat.test.js) ve moderasyon araçları.',
    ],
    architecture: [
      {
        title: 'Yetkili Sunucu (Authoritative Server) Mimarisi',
        body: 'Çok oyunculu masa oyunlarında istemciye yalnızca kendi görebileceği taş veya kartlar gönderilir. Diğer oyuncuların gizli eli sunucu belleğinde tutulur; hamle istekleri sunucuda kural motorundan geçmeden masaya uygulanmaz.',
      },
      {
        title: 'Ayrık Ön Yüz ve Gerçek Zamanlı Backend',
        body: 'Statik istemci chat.haking.tr üzerinde sunulurken Socket.IO bağlantısı ayrı Node.js backend servisinde sonlanır; böylece ön yüz dağıtımları aktif oyun soketlerini kesintiye uğratmadan güncellenebilir.',
      },
    ],
    limitations:
      'Platformdaki tüm oyun puanları ve masa içi bakiyeler yalnızca eğlence amaçlı sanal değerlerdir; gerçek para veya nakde çevrilebilir ödül içermez.',
    faqs: [
      {
        q: 'Haking Chat içindeki oyunlarda hile nasıl önleniyor?',
        a: 'Gizli taşlar ve kart desteleri istemciye gönderilmez; her hamle Socket.IO üzerinden sunucuya iletilir ve Node.js tarafındaki kural motoru tarafından doğrulanır.',
      },
    ],
  },
  {
    slug: 'utrzone',
    page: 'proje-utrzone.html',
    name: 'UTRZONE (UnlockTR)',
    version: 'v0.11.5',
    updated: '2026-11-20',
    category: 'CS2 Ekonomi & Oyun',
    repoName: 'UnlockTR',
    repoUrl: 'https://github.com/HaKING06/UnlockTR',
    liveUrl: 'https://utrzone.haking.tr/',
    image: 'assets/images/projects/utrzone.webp',
    imageAlt: 'UTRZONE Türkçe oyun yamaları ve modları platformu afişi',
    language: 'TypeScript / React',
    license: 'MIT',
    stack: ['React', 'Vite', 'Express', 'Neon PostgreSQL', 'Resend E-posta'],
    tagline: 'Türkçe oyun yamaları, çeviri projeleri ve topluluk modları için modern React/Vite + Express/Neon platformu.',
    summary:
      'UTRZONE (GitHub deposu UnlockTR); oyuncuların Türkçe yama ve mod içeriklerini düzenli sürüm notları, güvenlik kontrolleri ve topluluk geri bildirimleriyle keşfedebilmesi için React/Vite ön yüz ve Express/Neon PostgreSQL backend mimarisiyle geliştirilmiş web platformudur.',
    relatedArticles: ['makale-1.html'],
    highlights: [
      'React ve Vite ile hızlı, bileşen tabanlı modern arayüz ve koyu/kırmızı UTR marka kimliği.',
      'Express API, Neon PostgreSQL veritabanı şema göçleri ve Resend entegrasyonlu kurumsal e-posta bildirim sistemi.',
      'Gelişmiş üyelik, topluluk akışları, moderasyon ve sürüm takip altyapısı.',
      'Ön yüz, arka uç ve medya varlıklarının temiz çoklu-depo mimarisiyle ayrıştırılması.',
    ],
    architecture: [
      {
        title: 'Ayrık SPA Ön Yüz ve REST Backend',
        body: 'React/Vite tabanlı istemci hızlı gezinme ve filtreleme sağlarken kimlik doğrulama, içerik kayıtları ve e-posta akışları Express + Neon PostgreSQL sunucusunda yönetilir.',
      },
      {
        title: 'Veritabanı Şema Yönetimi',
        body: 'Sürüm büyüdükçe veritabanı değişiklikleri numaralandırılmış SQL göç (migration) dosyalarıyla takip edilerek geriye dönük tutarlılık korunur.',
      },
    ],
    limitations:
      'Platformda listelenen üçüncü taraf oyun yamaları ve modları ilgili geliştiricilerin sorumluluğundadır; kurulum öncesi oyun sürümü uyumluluğu ve dosya yedeği kontrol edilmelidir.',
    faqs: [
      {
        q: 'UTRZONE hangi teknolojilerle geliştirildi?',
        a: 'Ön yüzde React ve Vite, sunucu tarafında Node.js/Express, veritabanında Neon PostgreSQL ve işlemsel e-postalarda Resend kullanılmaktadır.',
      },
    ],
  },
  {
    slug: 'haking-vault',
    page: 'proje-haking-vault.html',
    name: 'HaKING 3D Vault',
    version: 'v2.5.3',
    updated: '2026-11-15',
    category: 'CS2 Ekonomi & Oyun',
    repoName: 'HaKING',
    repoUrl: 'https://github.com/HaKING06/HaKING',
    liveUrl: 'https://steam.haking.tr/',
    image: 'assets/images/projects/haking-vault.webp',
    imageAlt: 'HaKING 3D Vault Steam kütüphane müzesi ve 3D donanım vitrini afişi',
    language: 'JavaScript / Three.js',
    license: 'MIT',
    stack: ['Three.js', 'WebGL 3D Müze', '20 Dil (RTL dahil)', 'GitHub Actions Steam Sync', 'GSAP'],
    tagline: 'Canlı Steam kütüphane telemetrisi, etkileşimli Three.js 3D HP Victus 16 modeli ve 20 dilli 3D Müze vitrini.',
    summary:
      'HaKING 3D Vault (steam.haking.tr); oyun kütüphanesi verilerini GitHub Actions ile otomatik senkronize eden, tarayıcıda gezilebilen Three.js 3D Müze galerisi, etkileşimli 3D HP Victus 16 donanım sahnesi ve Arapça RTL dahil 20 dil desteği sunan statik web platformudur.',
    relatedArticles: ['makale-2.html', 'yazi-plant-showroom-sahne.html'],
    highlights: [
      'GitHub Actions zamanlanmış iş akışıyla otomatik güncellenen Steam kütüphane ve oynama süresi telemetrisi (data/steam_stats.json).',
      'Three.js + GLTF dokularıyla tarayıcı içi 3D Müze galerisi ve etkileşimli HP Victus 16 dizüstü bilgisayar sahnesi.',
      'Türkçe, İngilizce, Arapça (RTL), Japonca ve Korece dahil 20 farklı dilde yerelleştirilmiş arayüz ve dil bazlı WebP afişler.',
      'Sunucu maliyeti sıfır: tüm veri güncellemesi otomatik commit akışıyla statik JSON dosyalarına yazılır.',
    ],
    architecture: [
      {
        title: 'Zamanlanmış Statik Veri Pipeline’ı',
        body: 'Tarayıcıdan doğrudan Steam API çağırmak yerine GitHub Actions düzenli aralıklarla veriyi çeker, doğrular ve data/steam_stats.json dosyasını günceller. Böylece API anahtarı gizli kalır ve ziyaretçiler anında önbellekli statik JSON okur.',
      },
      {
        title: 'Dengeli WebGL Sahne Yükü',
        body: '3D müze ve donanım sahnelerinde sıkıştırılmış dokular, aşamalı yükleme ve düşük güç tüketimli kamera kontrolü kullanılarak masaüstü ve mobilde akıcı deneyim hedeflenir.',
      },
    ],
    limitations:
      'Steam profil verileri GitHub Actions güncelleme periyoduna bağlı olarak belirli aralıklarla yenilenir; anlık saniye bazlı durum yerine son senkronizasyon anını gösterir.',
    faqs: [
      {
        q: '20 dil desteği nasıl yönetiliyor?',
        a: 'Dil metinleri merkezi çeviri sözlüğünde ve dil bazlı afiş üretim betiklerinde tutulur; Arapça için otomatik sağdan sola (dir="rtl") düzen uygulanır.',
      },
    ],
  },
  {
    slug: 'copyhex',
    page: 'proje-copyhex.html',
    name: 'CopyHex',
    version: 'v1.0.6',
    updated: '2026-11-08',
    category: 'Tasarım & Web',
    repoName: 'copyhex',
    repoUrl: 'https://github.com/HaKING06/copyhex',
    liveUrl: 'https://copyhex.haking.tr/',
    image: 'assets/images/projects/copyhex.webp',
    imageAlt: 'CopyHex OKLCH renk paleti ve anlamsal tema stüdyosu afişi',
    language: 'HTML / JavaScript',
    license: 'MIT',
    stack: ['OKLCH', 'WCAG Kontrast', 'DTCG & CSS Token', '12 Dil', 'PWA', 'Sıfır Bağımlılık'],
    tagline: '6.000+ HEX renk araması, OKLCH 50–950 tema üretici, WCAG kontrast denetimi ve DTCG/CSS token dışa aktarımı.',
    summary:
      'CopyHex; geliştiriciler ve arayüz tasarımcıları için renk seçimini doğrudan üretim koduna dönüştüren çalışma alanıdır. Tek bir tohum renkten algısal olarak dengeli OKLCH 50–950 skalaları, açık/koyu anlamsal tema rolleri, WCAG kontrast raporları ve doğrudan kopyalanabilir CSS/DTCG tokenları üretir.',
    relatedArticles: ['yazi-copyhex-tema-tokenlari.html'],
    highlights: [
      '6.000+ ayrıştırılmış HEX renginde renk ailesi, açıklık ve doygunluk filtreleriyle hızlı keşif.',
      'OKLCH renk uzayıyla tek renkten açık/koyu tema, 50–950 ton skalası ve dashboard/mağaza/mobil canlı önizleme.',
      'WCAG AA/AAA metin kontrast denetimi, renk görme eksikliği simülasyonları ve görselden yerel renk çıkarma.',
      'CSS custom properties, DTCG JSON token, SVG/PNG gradyan dışa aktarımı, 12 dil ve çevrimdışı PWA kurulumu.',
    ],
    architecture: [
      {
        title: 'Sıfır Çalışma Zamanı Bağımlılığı',
        body: 'CopyHex hiçbir ağır frontend çerçevesi kullanmadan saf tarayıcı JavaScript’i ve statik çok dilli sayfa üretimiyle çalışır. Bu sayede 12 dildeki tüm koleksiyon sayfaları arama motorlarınca anında indekslenir.',
      },
      {
        title: 'Cihaz İçi Görsel Örnekleme',
        body: 'Görselden palet çıkarma işlemi Canvas API üzerinden tamamen tarayıcıda yürütülür; yüklenen fotoğraflar hiçbir uzak sunucuya gönderilmez.',
      },
    ],
    limitations:
      'Üretilen tema tokenları ve kontrast puanları standart sRGB/WCAG 2.x formüllerine dayanır; gerçek ürün ekranlarında farklı monitör kalibrasyonları ve ortam ışığı ayrıca kontrol edilmelidir.',
    faqs: [
      {
        q: 'CopyHex neden HSL yerine OKLCH kullanıyor?',
        a: 'HSL uzayında aynı açıklık değerine sahip sarı ve mavi tonları insan gözüne çok farklı parlaklıkta görünür. OKLCH algısal olarak düzgün olduğu için 50–950 ton basamaklarında tutarlı kontrast üretir.',
      },
    ],
  },
  {
    slug: 'qr-scanner',
    page: 'proje-qr-scanner.html',
    name: 'QR Scanner',
    version: 'v1.1.4',
    updated: '2026-11-11',
    category: 'Tarayıcı Eklentileri',
    repoName: 'QR',
    repoUrl: 'https://github.com/HaKING06/QR',
    liveUrl: 'https://qr.haking.tr/',
    image: 'assets/images/projects/qr-scanner.webp',
    imageAlt: 'QR Scanner v1.1.4 yerel QR oluşturma ve tarama web uygulaması ile eklentisi afişi',
    language: 'JavaScript / Manifest V3',
    license: 'MIT',
    stack: ['Manifest V3', 'Chrome & Edge Mağaza', 'PNG / SVG 2048px', 'Cihaz İçi Tarama', '8 Dil'],
    tagline: '7 QR veri türü, 2048px PNG/SVG çıktısı ve cihaz içi kamera/görsel taraması sunan gizlilik odaklı web + eklenti paketi.',
    summary:
      'QR Scanner v1.1.4; hesap, filigran veya sunucu taraflı veri işleme olmadan çalışan yerel QR araç kutusudur. Web uygulaması ile Chrome/Edge Manifest V3 uzantısını ortak çekirdek üzerinde birleştirir; URL, metin, Wi-Fi, e-posta, telefon, SMS ve kişi kartı (vCard) üretimini destekler.',
    relatedArticles: ['rehber-qr-guvenligi.html', 'yazi-qr-paylasim-baski.html', 'makale-3.html'],
    highlights: [
      '7 farklı QR türü (URL, Metin, gizli ağ destekli Wi-Fi, E-posta, Telefon, SMS, vCard) ve UTF-8 Türkçe karakter desteği.',
      'Baskıya hazır 512 / 1024 / 2048 px PNG ve sonsuz ölçeklenebilir SVG vektör dışa aktarımı + seçilebilir hata düzeltme seviyesi (L/M/Q/H).',
      'Sürükle-bırak / pano yapıştırma ile görsel tarama (15 MB sınırı) ve kullanıcı kontrollü kamera taraması.',
      'Chrome Web Store ve Microsoft Edge Add-ons paketleri, minimum Manifest V3 izin kapsamı ve otomatik bağlantı önizlemesi.',
    ],
    architecture: [
      {
        title: 'Web ve Uzantı Arasında Paylaşılan Çekirdek',
        body: 'QR kodlama, doğrulama ve formatlama mantığı shared/ modülünde tek kaynak olarak tutulur; web sitesi ile Chrome/Edge uzantısı aynı doğrulanmış mantığı paylaşır.',
      },
      {
        title: 'Kullanıcı Kontrollü İzin Modeli',
        body: 'Kamera veya aktif sekme taraması yalnızca kullanıcının açık tıklamasıyla başlar, sonuç okunduğu anda kamera kapatılır ve taranan URL otomatik açılmadan önce kullanıcıya gösterilir.',
      },
    ],
    limitations:
      'Web sürümünde canlı kamera taraması HTTPS ve tarayıcı kamera izni gerektirir. Düşük kontrastlı veya aşırı bulanık fotoğraflarda yerel tarayıcı algılama başarısı düşebilir.',
    faqs: [
      {
        q: 'Oluşturduğum Wi-Fi şifresi veya QR görselleri sunucuya gidiyor mu?',
        a: 'Hayır. Tüm QR oluşturma ve görsel çözme işlemleri %100 cihaz içinde tarayıcı belleğinde gerçekleşir; sunucuya hiçbir veri gönderilmez ve QR geçmişi kaydedilmez.',
      },
    ],
  },
  {
    slug: 'cevirmenx',
    page: 'proje-cevirmenx.html',
    name: 'ÇevirmenX',
    version: 'v1.4.0',
    updated: '2026-11-10',
    category: 'Tarayıcı Eklentileri',
    repoName: 'CevirmenX',
    repoUrl: 'https://github.com/HaKING06/CevirmenX',
    liveUrl: 'https://cevir.haking.tr/',
    image: 'assets/images/projects/cevirmenx.webp',
    imageAlt: 'ÇevirmenX v1.4.0 tarayıcı içi çeviri eklentisi afişi',
    language: 'JavaScript / Manifest V3',
    license: 'MIT',
    stack: ['Manifest V3', 'Alt+T Kısayolu', 'Kişisel Sözlük', '18 Dil', 'Seslendirme', 'Chrome / Edge / Firefox'],
    tagline: 'API anahtarı gerektirmeyen, Alt+T ve sağ tıkla sayfa içi çeviri, çift yönlü kişisel sözlük ve seslendirme eklentisi.',
    summary:
      'ÇevirmenX 1.4.0; okuduğunuz web sayfasından ayrılmadan seçili metni anında çevirmenizi, yerinde değiştirmenizi, sesli dinlemenizi ve özel terminolojinizi çift yönlü kişisel sözlükte sabitlemenizi sağlayan ücretsiz ve çoklu tarayıcılı çeviri eklentisidir.',
    relatedArticles: ['rehber-cevirmenx.html', 'yazi-cevirmenx-sozluk.html', 'makale-3.html'],
    highlights: [
      'Seçili metinde Alt+T kısayolu, sağ tık bağlam menüsü veya açılır çalışma alanı üzerinden anlık çeviri.',
      'Çift yönlü kişisel sözlük: Yazılım veya oyun terimlerinin her seferinde tutarlı karşılıkla çevrilmesini sağlar.',
      '18 dilde hızlı filtreleme, aranabilir yerel çeviri geçmişi, favoriler ve hem panelde hem balonda seslendirme.',
      'Chrome, Microsoft Edge ve Firefox için ayrı mağaza derlemeleri + Midnight, Amethyst, Emerald, Amber temaları.',
    ],
    architecture: [
      {
        title: 'Çoklu Tarayıcı Paketleme Hattı',
        body: 'Tek bir kaynak tabanından build betiğiyle Chrome, Edge ve Firefox (.xpi) uyumlu Manifest paketleri üretilir; böylece tüm tarayıcılarda aynı sürüm davranışı korunur.',
      },
      {
        title: 'Sayfa Stillerinden İzole Çeviri Balonu',
        body: 'Her web sitesinin farklı CSS kuralları olduğu için çeviri balonu ana sayfa stilleriyle çakışmayacak biçimde izole kapsayıcı ve erişilebilir odak yönetimiyle yerleştirilir.',
      },
    ],
    limitations:
      'Otomatik makine çevirisi bağlama göre hata yapabilir; kod blokları, hukuki metinler ve kritik teknik dokümanlarda sonuçların gözden geçirilmesi gerekir.',
    faqs: [
      {
        q: 'ÇevirmenX kullanmak için ücretli API anahtarı gerekiyor mu?',
        a: 'Hayır. ÇevirmenX ücretsiz ve API anahtarı kurulumu gerektirmeden çalışacak biçimde tasarlanmıştır.',
      },
    ],
  },
  {
    slug: 'notmatik',
    page: 'proje-notmatik.html',
    name: 'NotMatik',
    version: 'v3.0',
    updated: '2026-11-22',
    category: 'Eğitim & Topluluk',
    repoName: 'Notmatik',
    repoUrl: 'https://github.com/HaKING06/Notmatik',
    liveUrl: 'https://notmatik.haking.tr/',
    image: 'assets/images/projects/notmatik.webp',
    imageAlt: 'NotMatik v3.0 üniversite vize final not hesaplama ve hedef defteri afişi',
    language: 'JavaScript / PWA',
    license: 'MIT',
    stack: ['JavaScript', 'PWA Çevrimdışı', 'Hedef Defterim', 'Tam Sayı Katkısı', 'Koyu/Açık Tema'],
    tagline: 'Üniversite öğrencileri için tam sayı katkılı vize-final-proje ortalama, gerekli final notu ve çevrimdışı hedef takip platformu.',
    summary:
      'NotMatik v3.0; üniversite derslerindeki vize, final, ödev, kısa sınav ve proje ağırlıklarını şeffaf biçimde hesaplayan, “finalden kaç almalıyım?” ve şartlı geçiş sorularını anında yanıtlayan, kayıtlı ders hedeflerini cihazda çevrimdışı saklayabilen PWA uygulamasıdır.',
    relatedArticles: ['rehber-not-hesaplama.html', 'yazi-notmatik-cok-bilesenli.html', 'makale-3.html'],
    highlights: [
      'Vize, final, proje ve çoklu ara bileşenler için anlık ağırlıklı ortalama ve tam sayı katkısı kırılımı.',
      'Hedef geçme notu ve şartlı geçiş (ör. DD/DC) eşiği için gereken minimum final puanının otomatik hesaplanması.',
      'Hedef Defterim (not-defteri.html): Ders notlarını ve hedefleri yerel depolamada saklama, arama ve yönetme.',
      'Service Worker ile çevrimdışı PWA kurulumu (PC & mobil) ve erişilebilir açık/koyu tema.',
    ],
    architecture: [
      {
        title: 'Savunmacı Form Doğrulama ve Sınır Durumları',
        body: 'Toplamı %100’ü aşan ağırlıklar, 0–100 dışı puanlar veya matematiksel olarak 100 üstü final gerektiren imkânsız hedefler sessizce yanlış sonuç göstermek yerine açık kullanıcı uyarılarıyla ele alınır.',
      },
      {
        title: 'Tamamen İstemci İçi & Çevrimdışı Hazır',
        body: 'Service Worker önbelleklemesi sayesinde sınav döneminde internet bağlantısı olmadan bile uygulama açılır ve kayıtlı ders hedefleri localStorage üzerinden erişilebilir kalır.',
      },
    ],
    limitations:
      'NotMatik resmi öğrenci bilgi sisteminin yerine geçmez. Çan eğrisi, final barajı, yuvarlama ve harf notu kuralları üniversiteden üniversiteye değişebileceği için kurum yönetmeliği esas alınmalıdır.',
    faqs: [
      {
        q: 'NotMatik kaydettiğim ders notlarını sunucuya gönderiyor mu?',
        a: 'Hayır. Hedef Defterim kayıtları tamamen kendi cihazınızın tarayıcı depolamasında saklanır; hesap açmanız gerekmez.',
      },
    ],
  },
  {
    slug: 'csell',
    page: 'proje-csell.html',
    name: 'CSELL',
    version: 'v1.0.1',
    updated: '2026-11-08',
    category: 'CS2 Ekonomi & Oyun',
    repoName: 'CSELL',
    repoUrl: 'https://github.com/HaKING06/CSELL',
    liveUrl: 'https://csell.haking.tr/',
    image: 'assets/images/projects/csell.webp',
    imageAlt: 'CSELL yerel öncelikli CS2 envanter ve komisyon işlem günlüğü kapağı',
    language: 'JavaScript / PWA',
    license: 'MIT',
    stack: ['Yerel Öncelikli', 'CS2 Katalog', 'Komisyon Analizi', 'Takas Koruması', 'CSV / JSON Yedek'],
    tagline: 'CS2 eşya alım-satım işlemlerini, pazar komisyonlarını, takas kilidi bitişini ve gerçek net kârı izleyen Türkçe günlük.',
    summary:
      'CSELL; CS2 skin, kasa, kapsül, ajan, çıkartma ve charm alım-satımlarını düzenli bir muhasebe günlüğü gibi takip etmenizi sağlayan yerel öncelikli web uygulamasıdır. Tahmini net gelir ile gerçekleşen satış sonucunu ayrı izleyerek gerçek portföy performansını netleştirir.',
    relatedArticles: ['yazi-csell-net-satis.html', 'yazi-tradecalc-senaryolar.html', 'makale-spread-arbitraj-mimarisi.html'],
    highlights: [
      'Skin aşınma dereceleri, kasalar, kapsüller, ajanlar, stickerlar, charmlar ve anahtarları kapsayan otomatik güncel CS2 kataloğu.',
      'Her işlemde yüzdelik + sabit pazar komisyonu kesintisi ve tahmini vs. gerçekleşmiş kâr karşılaştırması.',
      'Alım saatine göre 8 günlük (özelleştirilebilir) takas koruması açılış zamanı geri sayımı.',
      'Hesapsız yerel depolama + tek tıkla CSV raporlama ve cihazlar arası JSON yedekleme/geri yükleme.',
    ],
    architecture: [
      {
        title: 'Katalog Otomasyonu + Yerel İşlem Defteri',
        body: 'CS2 eşya kataloğu GitHub Actions üzerinden güncel tutulur; kullanıcıya ait tüm alım/satım kayıtları ise gizlilik ve hız için yalnızca kullanıcının tarayıcısında saklanır.',
      },
    ],
    limitations:
      'CSELL kullanıcının girdiği alım ve satış değerlerini hesaplar; otomatik canlı fiyat garantisi veya finansal getiri taahhüdü sunmaz.',
    faqs: [
      {
        q: 'CSELL ile TradeCalc arasındaki fark nedir?',
        a: 'TradeCalc bir takasa girmeden önce olası maliyet ve kâr senaryolarını planlamaya odaklanır; CSELL ise fiilen yaptığınız alım ve satışların gerçekleşmiş günlüğünü ve net kârını tutar.',
      },
    ],
  },
  {
    slug: 'tradecalc',
    page: 'proje-tradecalc.html',
    name: 'HaKING TradeCalc',
    version: 'v1.0',
    updated: '2026-10-29',
    category: 'CS2 Ekonomi & Oyun',
    repoName: 'TradeCalc',
    repoUrl: 'https://github.com/HaKING06/TradeCalc',
    liveUrl: 'https://trade.haking.tr/',
    image: 'assets/images/projects/tradecalc.webp',
    imageAlt: 'HaKING TradeCalc CS2 takas maliyet ve marj senaryo planlayıcısı kapağı',
    language: 'HTML / JavaScript',
    license: 'MIT',
    stack: ['JavaScript', 'Cloudflare Pages', 'CSP Güvenlik Başlıkları', 'JSON Yedek', 'Yerel Geçmiş'],
    tagline: 'CS2 takas öncesi yatırım maliyeti, kalan bakiye nakit eşdeğeri, komisyon ve net marj senaryo planlayıcısı.',
    summary:
      'HaKING TradeCalc; bir CS2 takasına girmeden önce yatırılan tutarı, hedef eşyanın piyasa değerini, satış komisyonunu, charm değerini ve platformda kalan bakiyenin gerçek nakit eşdeğerini tek ekranda hesaplayarak farklı senaryoları kıyaslamanızı sağlar.',
    relatedArticles: ['yazi-tradecalc-senaryolar.html', 'yazi-csell-net-satis.html'],
    highlights: [
      'Görselli CS2 kataloğunda skin, eldiven, sticker ve charm aramasıyla hızlı senaryo kurulumu.',
      'Platform bakiyesi ile kalan bakiyenin nakit eşdeğerinin brüt ve net kârdan ayrı raporlanması.',
      'Düzenlenebilir satış komisyonu, isteğe bağlı ilk yükleme bonusu ve charm değerinin ayrı hesaba katılması.',
      'Günlük grafik, kâr/marj sıralamalı yerel geçmiş ve JSON içe/dışa aktarma.',
    ],
    architecture: [
      {
        title: 'Sıkı CSP ve Yerel Veri İzolasyonu',
        body: 'Ön yüz statik dosyalarla sunulur, _headers üzerinden İçerik Güvenliği Politikası (CSP) uygulanır ve hesaplayıcı taslakları backend veritabanına taşınmadan localStorage içinde korunur.',
      },
    ],
    limitations:
      'Fiyat varsayımları kullanıcı tarafından girilir; TradeCalc otomatik canlı Steam fiyat çekimi veya işlem garantisi sunmaz.',
    faqs: [
      {
        q: 'Kalan platform bakiyesi neden kârdan ayrı hesaplanıyor?',
        a: 'Takas sitesinde kalan 10 $ bakiye, komisyon ve iskonto nedeniyle çoğu zaman doğrudan 10 $ nakit değere eşit değildir; ayrı gösterim yanıltıcı kâr algısını engeller.',
      },
    ],
  },
  {
    slug: 'csname',
    page: 'proje-csname.html',
    name: 'CSNAME',
    version: 'v1.0',
    updated: '2026-10-29',
    category: 'CS2 Ekonomi & Oyun',
    repoName: 'csname',
    repoUrl: 'https://github.com/HaKING06/csname',
    liveUrl: 'https://cs.haking.tr/',
    image: 'assets/images/projects/csname.webp',
    imageAlt: 'CSNAME Türkçe İngilizce CS2 eşya adlandırma çeviricisi kapağı',
    language: 'JavaScript / Workers',
    license: 'MIT',
    stack: ['Cloudflare Workers', 'TR ↔ EN Eşleştirme', 'Otomatik Katalog', 'Anlık Filtreleme'],
    tagline: 'Türkçe CS2 envanter ve skin adlarını CSFloat / Steam İngilizce pazar isimleriyle anında eşleştiren görselli sözlük.',
    summary:
      'CSNAME (cs.haking.tr); oyunu Türkçe arayüzle oynayan CS2 kullanıcılarının envanterlerindeki skin, sticker, charm, kasa, ajan ve müzik kiti adlarını global pazar yerlerinde arayabilecekleri kesin İngilizce karşılıklarıyla anında eşleştirmesini sağlayan statik arama aracıdır.',
    relatedArticles: ['makale-spread-arbitraj-mimarisi.html', 'yazi-csell-net-satis.html'],
    highlights: [
      'Türkçe eşya adını yazarak kesin İngilizce pazar adını ve tek tıkla kopyalanabilir tam metni bulma.',
      'Silah kategorisi, nadirlik derecesi, aşınma (Factory New → Battle-Scarred) ve eşya türü filtreleri.',
      'Görselli sonuç kartları ve düzenli olarak güncellenen statik CS2 eşya kataloğu.',
      'Cloudflare Workers üzerinde düşük gecikmeli, kurulum gerektirmeyen statik dağıtım.',
    ],
    architecture: [
      {
        title: 'İstemci İçi İndeksli Eşleştirme',
        body: 'Türkçe ve İngilizce katalog eşleştirmeleri hafif JSON veri setinde önceden hazırlanır; arama kutusundaki her karakter tarayıcıda anlık olarak Türkçe karakter duyarsız eşleştirmeyle süzülür.',
      },
    ],
    limitations:
      'Yeni eklenen CS2 koleksiyon ve kasaları, katalog güncelleme akışı çalıştırıldıktan sonra listeye yansır.',
    faqs: [
      {
        q: 'CSNAME hangi eşya türlerini kapsıyor?',
        a: 'Silah kaplamalarının yanı sıra çıkartmalar, charmlar, müzik kitleri, ajanlar, kasalar, hatıra paketleri ve kapsüllerin tamamını destekler.',
      },
    ],
  },
  {
    slug: 'ai-desktop',
    page: 'proje-ai-desktop.html',
    name: 'HaKING AI Desktop',
    version: 'v0.1.2',
    updated: '2026-11-09',
    category: 'Yapay Zekâ',
    repoName: 'haking-ai-desktop',
    repoUrl: 'https://github.com/HaKING06/haking-ai-desktop',
    liveUrl: '',
    downloadLabel: "GitHub'dan İndir",
    image: 'assets/images/projects/ai-desktop.webp',
    imageAlt: 'HaKING AI Desktop çevrimdışı BM25 ve TF-IDF ürün arama uygulaması afişi',
    language: 'Python',
    license: 'MIT',
    stack: ['Python', 'BM25', 'Karakter N-Gram TF-IDF', 'Hibrit Sıralama', 'Recall / MRR', 'Çevrimdışı'],
    tagline: 'Yazım hatalarına dayanıklı çevrimdışı hibrit ürün arama motoru (BM25 + TF-IDF) ve yazılım hata imzası sınıflandırıcısı.',
    summary:
      'HaKING AI Desktop; bulut API anahtarı veya internet bağlantısı gerektirmeden yerel bilgisayarda çalışan Python tabanlı masaüstü arama ve analiz uygulamasıdır. PriceRunner veri kümesi üzerinde yazım hatalı sorguları BM25, karakter n-gram TF-IDF ve hibrit skorlamayla karşılaştırmalı Recall/MRR raporlarıyla değerlendirir.',
    relatedArticles: ['yazi-ai-desktop-arama.html', 'makale-1.html'],
    highlights: [
      'Klasik tam eşleşme yerine BM25 + karakter n-gram TF-IDF hibrit sıralamasıyla yazım hatalı sorgularda yüksek geri çağırma.',
      'Tekrarlanabilir Recall@K ve MRR (Mean Reciprocal Rank) ölçüm raporları ve yöntem karşılaştırması.',
      'Çevrimdışı yazılım hata imzası sınıflandırması, dil tespiti, Python sözdizimi denetimi ve CSV toplu analizi.',
      'İlk kurulumdan sonra %100 çevrimdışı çalışma; web AI geçişinde veri yalnızca kullanıcı onayıyla panoya kopyalanır.',
    ],
    architecture: [
      {
        title: 'Kelime + Karakter Düzeyi Hibrit İndeks',
        body: 'BM25 tam ve yakın kelime eşleşmelerinde güçlüdür, ancak klavye kayması veya eksik harf içeren sorgularda zayıflar. Karakter 3-5 gram TF-IDF katmanı alt-dize benzerliğini yakalayarak hibrit skorda doğru ürünü üst sıraya taşır.',
      },
    ],
    limitations:
      'Masaüstü Python uygulaması olduğu için yerel kurulum (Python 3 ve requirements.txt) gerektirir; canlı web sürümü yerine GitHub deposundan çalıştırılır.',
    faqs: [
      {
        q: 'HaKING AI Desktop internet bağlantısı olmadan çalışır mı?',
        a: 'Evet. Gerekli Python paketleri kurulduktan ve yerel modeller hazırlandıktan sonra tüm arama ve hata imzası analizleri tamamen çevrimdışı yürütülür.',
      },
    ],
  },
];
