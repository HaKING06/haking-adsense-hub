export const GUIDES_A = [
  {
    slug: 'rehber-ai-gecikmesi',
    file: 'rehber-ai-gecikmesi.html',
    kind: 'Teknik Rehber',
    category: 'Yapay Zekâ',
    projectSlug: 'haking-ai',
    date: '2026-11-21',
    dateDisplay: '21 Kasım 2026',
    readTime: '8 dk okuma',
    title: 'Yapay Zekâ Sohbetinde İlk Yanıt (TTFT) Neden Gecikir? Darboğaz Ölçme ve İyileştirme Rehberi',
    shortDesc:
      'Sunucusuz soğuk başlangıç, TLS el sıkışması, model kuyruğu ve akış tamponlaması arasındaki farkları ayırarak sohbet uygulamalarında ilk kelime süresini iyileştirme rehberi.',
    image: 'assets/images/projects/haking-ai.webp',
    tags: ['TTFT', 'SSE', 'FastAPI', 'Gecikme Analizi', 'Yapay Zekâ'],
    sections: [
      {
        id: 'ttft-nedir',
        heading: 'Toplam süre ile İlk Token Süresi (TTFT) neden ayrı ölçülmelidir?',
        html: `
          <p>Bir yapay zekâ sohbet uygulamasında kullanıcı “sistem yavaş” dediğinde sorun her zaman modelin saniyede ürettiği kelime sayısı (throughput) değildir. Çoğu vakada kullanıcıyı yoran şey, Gönder tuşuna bastıktan sonra ekranda ilk anlamlı kelimenin belirmesine kadar geçen <strong>Time To First Token (TTFT)</strong> süresidir. Toplam 14 saniye süren bir yanıt ilk 0,9 saniyede akmaya başlarsa akıcı hissedilir; oysa toplam 8 saniye sürüp ilk 7 saniye boş ekran gösteren bir sistem bozuk algısı yaratır.</p>
        `,
      },
      {
        id: 'dort-katman',
        heading: 'Gecikmenin saklandığı 4 ayrı katman',
        html: `
          <div class="table-scroll">
            <table>
              <thead>
                <tr><th>Katman</th><th>Tipik Belirti</th><th>Doğrulama Yöntemi</th><th>Çözüm Yaklaşımı</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>1. Sunucusuz Soğuk Başlangıç</strong></td><td>Günün ilk isteği 3–8 sn sürer, ikinci istek hızlıdır</td><td>Sunucu başlama zamanı ve TTFB farkı</td><td>Hafif bağımlılıklar, ayrı sağlık uç noktası, sıcak tutma politikası</td></tr>
                <tr><td><strong>2. Ağ &amp; Proxy Tamponlama</strong></td><td>Backend parça üretir ama tarayıcı hepsini sonda alır</td><td>DevTools EventStream zaman damgaları</td><td><code>Cache-Control: no-cache</code> ve <code>X-Accel-Buffering: no</code> başlıkları</td></tr>
                <tr><td><strong>3. Model Prefill &amp; Kuyruk</strong></td><td>Çok uzun sohbet geçmişinde bekleme katlanır</td><td>Sağlayıcı yanıt başlıkları ve token sayısı</td><td>Gereksiz eski mesajları budama, özetlenmiş görev kartı (<code>prompt_state</code>)</td></tr>
                <tr><td><strong>4. İstemci DOM Çizimi</strong></td><td>Metin gelir ama tarayıcı takılarak kayar</td><td>Chrome Performance flamegraph</td><td><code>requestAnimationFrame</code> toplu güncelleme, kod bloklarını tekrar derlememe</td></tr>
              </tbody>
            </table>
          </div>
          <p><a href="proje-haking-ai.html">HaKING AI</a> üzerinde Prompt Modu geliştirilirken yaşanan en büyük kazanımlardan biri, tüm eski sohbet metnini tekrar tekrar modele göndermek yerine yalnızca güncel görev kartını taşımak oldu. Bu hem girdi token yükünü hem de prefill bekleme süresini kontrol altında tutar.</p>
        `,
      },
      {
        id: 'olcum-disiplini',
        heading: 'Kendi uygulamanızda gecikmeyi nasıl ölçersiniz?',
        html: `
          <p>Tahmine dayalı optimizasyon çoğu zaman yanlış katmana zaman harcatır. İstemci tarafında üç basit zaman damgası kaydetmek darboğazı dakikalar içinde görünür kılar:</p>
          <div class="code-block">
            <div class="code-head"><span>İstemci TTFT ve toplam akış ölçümü</span><button type="button" class="copy-code-btn" data-copy-code>Kopyala</button></div>
            <pre><code>const t0 = performance.now();
let tFirstToken = null;
const res = await fetch('/api/chat/stream', { method: 'POST', body });
const tHeaders = performance.now() - t0; // Sunucu uyanma + doğrulama
// İlk token olayında:
if (tFirstToken === null) tFirstToken = performance.now() - t0;</code></pre>
          </div>
          <p>Eğer <code>tHeaders</code> yüksekse odaklanmanız gereken yer soğuk başlangıç, veritabanı bağlantısı veya Turnstile doğrulamasıdır. <code>tHeaders</code> düşük ama <code>tFirstToken</code> yüksekse gecikme model sağlayıcısının prefill veya kuyruk aşamasındadır.</p>
        `,
      },
    ],
    faqs: [
      {
        q: 'SSE başlıklarında tamponlama nasıl engellenir?',
        a: 'Sunucu yanıtında Content-Type: text/event-stream, Cache-Control: no-cache, no-transform ve ters proxy arkasındaysanız X-Accel-Buffering: no başlıklarını göndermelisiniz.',
      },
    ],
  },

  {
    slug: 'rehber-not-hesaplama',
    file: 'rehber-not-hesaplama.html',
    kind: 'Teknik Rehber',
    category: 'Eğitim & Topluluk',
    projectSlug: 'notmatik',
    date: '2026-11-22',
    dateDisplay: '22 Kasım 2026',
    readTime: '9 dk okuma',
    hasGradeSim: true,
    title: 'Üniversite Ağırlıklı Not Hesaplama: Doğru Formül, Tam Sayı Katkısı ve Hedef Final Stratejisi',
    shortDesc:
      'Vize, ödev, proje ve final ağırlıklarıyla gerçek dönem sonu ortalaması nasıl hesaplanır? Sık yapılan 5 hesaplama hatası ve canlı hedef final simülatörü.',
    image: 'assets/images/projects/notmatik.webp',
    tags: ['NotMatik', 'Ağırlıklı Ortalama', 'Hedef Final', 'Eğitim'],
    sections: [
      {
        id: 'temel-formul',
        heading: 'Ağırlıklı ortalama formülü ve hedef final hesabı',
        html: `
          <p>Üniversite derslerinin büyük çoğunluğunda başarı puanı basit aritmetik ortalamayla değil, ders izlencesinde (syllabus) açıklanan yüzde ağırlıklarıyla hesaplanır. Her bileşenin puanı kendi ağırlığıyla çarpılıp toplanır:</p>
          <div class="code-block">
            <div class="code-head"><span>Ağırlıklı ortalama ve gereken final formülü</span><button type="button" class="copy-code-btn" data-copy-code>Kopyala</button></div>
            <pre><code>Ortalama = (Vize × w_vize) + (Ödev × w_ödev) + (Final × w_final)
Gereken Final = (Hedef Ortalama − Mevcut Katkı) / w_final</code></pre>
          </div>
          <p>Örneğin vizenin %30, ödevin %10, finalin %60 ağırlığa sahip olduğu bir derste vizeden 55, ödevden 80 alan bir öğrencinin final öncesi mevcut katkısı <code>(55 × 0.30) + (80 × 0.10) = 16.5 + 8.0 = 24.5</code> puandır. 60 ortalama hedefine ulaşmak için gereken final notu <code>(60 − 24.5) / 0.60 = 59.17</code> → yani en az <strong>60</strong> olur.</p>
        `,
      },
      {
        id: 'canli-simulator',
        heading: 'Canlı Hedef Final Mini Hesaplayıcısı',
        html: `
          <p>Aşağıdaki tarayıcı içi simülatörle kendi vize ve ödev ağırlıklarınızı girerek hedef ortalamanız için gereken minimum final puanını anında görebilir, daha kapsamlı ders kaydı ve şartlı geçiş hesapları için <a href="https://notmatik.haking.tr/" target="_blank" rel="noopener noreferrer">NotMatik v3.0</a> uygulamasına geçebilirsiniz.</p>
          <div class="tool-panel" data-grade-sim>
            <div class="eyebrow">ETKİLEŞİMLİ ARAÇ · YEREL HESAPLAMA</div>
            <div class="grid-3" style="margin-bottom:14px;">
              <div class="form-row"><label for="sim-vize">Vize Notu (0-100)</label><input id="sim-vize" type="number" min="0" max="100" value="55"></div>
              <div class="form-row"><label for="sim-vize-w">Vize Ağırlığı (%)</label><input id="sim-vize-w" type="number" min="0" max="90" value="30"></div>
              <div class="form-row"><label for="sim-hedef">Hedef Ortalama</label><input id="sim-hedef" type="number" min="1" max="100" value="60"></div>
            </div>
            <div class="grid-2" style="margin-bottom:16px;">
              <div class="form-row"><label for="sim-odev">Ödev / Proje Notu (0-100)</label><input id="sim-odev" type="number" min="0" max="100" value="80"></div>
              <div class="form-row"><label for="sim-odev-w">Ödev / Proje Ağırlığı (%)</label><input id="sim-odev-w" type="number" min="0" max="80" value="10"></div>
            </div>
            <div id="sim-result" class="callout callout-forest" style="margin:0;" role="status" aria-live="polite"></div>
          </div>
        `,
      },
      {
        id: 'sik-hatalar',
        heading: 'Öğrencilerin en sık yaptığı 4 hesaplama hatası',
        html: `
          <ol>
            <li><strong>Final barajını göz ardı etmek:</strong> Pek çok üniversitede genel ortalamanız 60’ı geçse bile final sınavından belirli bir taban puan (ör. 45 veya 50) alma şartı bulunur.</li>
            <li><strong>Tam sayı yuvarlama farkı:</strong> Bazı OBS sistemleri ara katkıları iki ondalıkla toplar, bazıları ise her bileşeni veya yalnızca son toplamı en yakın tam sayıya yuvarlar.</li>
            <li><strong>Ağırlık toplamını kontrol etmemek:</strong> Yıl içi %40 içinde iki quiz ve bir vize varsa her birinin genel nota katkısı ayrıdır (%40’ın %25’i genel notun %10’una eşittir).</li>
            <li><strong>Çan eğrisi (bağıl değerlendirme) ile mutlak sistemi karıştırmak:</strong> Bağıl sistemde harf notu sınıf ortalaması ve standart sapmaya göre belirlenir; mutlak hedef hesabı yalnızca taban kontrolü sağlar.</li>
          </ol>
        `,
      },
    ],
    faqs: [
      {
        q: 'Gereken final puanı 100’den büyük çıkarsa ne anlama gelir?',
        a: 'Mevcut ağırlıklar ve önceki puanlarla hedeflenen ortalamaya ulaşmanın matematiksel olarak mümkün olmadığını gösterir; bu durumda şartlı geçiş (DC/DD) veya bütünleme senaryosu değerlendirilmelidir.',
      },
    ],
  },

  {
    slug: 'rehber-qr-guvenligi',
    file: 'rehber-qr-guvenligi.html',
    kind: 'Teknik Rehber',
    category: 'Tarayıcı Eklentileri',
    projectSlug: 'qr-scanner',
    date: '2026-11-12',
    dateDisplay: '12 Kasım 2026',
    readTime: '8 dk okuma',
    title: 'QR Kod Güvenliği, Tarayıcı İzinleri ve Cihaz İçi İşleme Rehberi',
    shortDesc:
      'Quishing (QR oltalama) saldırılarından nasıl korunursunuz? Kamera izni, URL önizleme, kısaltılmış bağlantılar ve cihaz içi QR taramanın önemi.',
    image: 'assets/images/projects/qr-scanner.webp',
    tags: ['QR Güvenliği', 'Quishing', 'Gizlilik', 'QR Scanner'],
    sections: [
      {
        id: 'quishing-nedir',
        heading: 'QR kodlar neden özel güvenlik dikkati gerektirir?',
        html: `
          <p>Klasik bir web bağlantısına tıklamadan önce alan adını gözünüzle görebilirsiniz. Oysa bir QR kodun arkasında hangi adresin, hangi Wi-Fi yapılandırmasının veya hangi SMS/ödeme komutunun gizlendiği çıplak gözle anlaşılamaz. Son yıllarda kamusal alanlardaki afişlerin, otopark tabelalarının veya restoran menülerinin üzerine sahte etiket yapıştırılarak yürütülen <strong>Quishing (QR Phishing)</strong> saldırıları bu nedenle hızla artmıştır.</p>
        `,
      },
      {
        id: 'guvenli-tarama',
        heading: 'Güvenli bir QR tarayıcıda bulunması gereken 5 özellik',
        html: `
          <ul>
            <li><strong>Otomatik Yönlendirme Yapmama:</strong> Kod okunduğu anda tarayıcıyı doğrudan siteye fırlatmak yerine önce ham metni veya tam URL’yi ekranda göstermelidir.</li>
            <li><strong>Cihaz İçi Çözümleme:</strong> Taradığınız belge, kimlik kartı veya özel Wi-Fi QR’ları uzak bir sunucuya yüklenmeden doğrudan cihaz belleğinde okunmalıdır.</li>
            <li><strong>İsteğe Bağlı Kamera İzni:</strong> Kamera yalnızca tarama başlatıldığında açılmalı ve kod okunur okunmaz hemen serbest bırakılmalıdır.</li>
            <li><strong>Alan Adı ve Protokol Kontrolü:</strong> <code>javascript:</code> veya şüpheli kısaltılmış yönlendirmeler kullanıcıya ham içerik olarak görünür kalmalıdır.</li>
            <li><strong>Minimum Eklenti İzni:</strong> Tarayıcı uzantısı tüm sekmelerinizi sürekli dinlemek yerine yalnızca tıkladığınız aktif sekmede çalışmalıdır.</li>
          </ul>
          <p><a href="proje-qr-scanner.html">QR Scanner v1.1.4</a> tüm bu ilkeleri varsayılan davranış olarak uygular: hiçbir görsel veya metin sunucuya gönderilmez, kamera sonuç bulunduğu anda durdurulur ve açılış kontrolü tamamen kullanıcıda kalır.</p>
        `,
      },
      {
        id: 'wifi-vcard-kontrol',
        heading: 'Wi-Fi ve vCard QR kodlarında nelere bakılmalı?',
        html: `
          <p><code>WIFI:T:WPA;S:AgAdi;P:Sifre;;</code> biçimindeki kodlar cihazı tek dokunuşla bir kablosuz ağa bağlayabilir. Tanımadığınız bir afişteki Wi-Fi QR koduna bağlanmadan önce ağ adını (<code>S:</code>) fiziksel işletmenin adı ile karşılaştırın. Benzer şekilde vCard (kişi kartı) kodlarında eklenen web sitesi veya e-posta alanlarının gerçekten ilgili kuruma ait olduğunu doğrulayın.</p>
        `,
      },
    ],
    faqs: [
      {
        q: 'Çevrimiçi QR oluşturucular Wi-Fi şifremi görebilir mi?',
        a: 'Eğer araç QR görselini sunucuda üretiyorsa (örneğin bir API isteğiyle PNG döndürüyorsa) girdiğiniz şifre sunucu günlüklerine düşebilir. QR Scanner gibi %100 istemci tarafında çalışan araçlarda veri tarayıcıdan dışarı çıkmaz.',
      },
    ],
  },

  {
    slug: 'rehber-cevirmenx',
    file: 'rehber-cevirmenx.html',
    kind: 'Teknik Rehber',
    category: 'Tarayıcı Eklentileri',
    projectSlug: 'cevirmenx',
    date: '2026-11-11',
    dateDisplay: '11 Kasım 2026',
    readTime: '8 dk okuma',
    title: 'ÇevirmenX 1.4.0 Kurulum ve Verimli Sayfa İçi Çeviri Rehberi',
    shortDesc:
      'Sekme değiştirmeden Alt+T kısayoluyla teknik doküman okuma, çift yönlü kişisel sözlük kurma, seslendirme ve Chrome/Edge/Firefox kurulum adımları.',
    image: 'assets/images/projects/cevirmenx.webp',
    tags: ['ÇevirmenX', 'Tarayıcı Eklentisi', 'Çeviri', 'Verimlilik'],
    sections: [
      {
        id: 'neden-sayfa-ici',
        heading: 'Sekme değiştirmek okuma odağını neden bozar?',
        html: `
          <p>İngilizce teknik doküman, GitHub issue tartışması veya akademik makale okurken her bilinmeyen paragrafı kopyalayıp başka bir çeviri sekmesine yapıştırmak dikkat akışını dakikada birkaç kez keser. <a href="proje-cevirmenx.html">ÇevirmenX 1.4.0</a> tam olarak bu bağlam kopmasını ortadan kaldırmak için metni seçtiğiniz yerde küçük ve erişilebilir bir çeviri balonu açar.</p>
        `,
      },
      {
        id: 'uc-akis',
        heading: 'Günlük kullanımda 3 hızlı çeviri akışı',
        html: `
          <ol>
            <li><strong>Klavye Akışı (<code>Alt+T</code>):</strong> Fareyle bir cümle veya terimi seçip <code>Alt+T</code> tuşlarına basın. Çeviri balonu anında seçimin yanında açılır; tek tıkla kopyalayabilir veya sesli dinleyebilirsiniz.</li>
            <li><strong>Yerinde Değiştirme:</strong> Form kutusu veya düzenlenebilir metin alanında yazdığınız Türkçe cümleyi hedef dile çevirip doğrudan mevcut metnin yerine yerleştirebilirsiniz.</li>
            <li><strong>Panel &amp; Geçmiş:</strong> Uzun paragraflar veya karşılaştırmalı okumalar için eklenti açılır çalışma alanını açıp aranabilir yerel geçmişinizden ve favorilerinizden yararlanabilirsiniz.</li>
          </ol>
        `,
      },
      {
        id: 'tarayici-kurulum',
        heading: 'Chrome, Microsoft Edge ve Firefox kurulumu',
        html: `
          <p>ÇevirmenX 1.4.0 çoklu tarayıcı desteğine sahiptir. Güncel mağaza bağlantıları ve paket kurulum kılavuzu <a href="https://cevir.haking.tr/" target="_blank" rel="noopener noreferrer">cevir.haking.tr</a> adresinde tarayıcınıza uygun biçimde sunulur. Kurulumdan sonra kısayolu kendi alışkanlığınıza göre eklenti ayarlarından veya tarayıcı kısayol yöneticisinden (<code>chrome://extensions/shortcuts</code>) özelleştirebilirsiniz.</p>
          <p>Teknik dokümanlarda belirli kavramların her seferinde aynı terimle çevrilmesi için <a href="yazi-cevirmenx-sozluk.html">ÇevirmenX kişisel sözlük rehberine</a> göz atabilirsiniz.</p>
        `,
      },
    ],
    faqs: [
      {
        q: 'Alt+T kısayolu başka bir site kısayoluyla çakışırsa ne yapabilirim?',
        a: 'ÇevirmenX ayarlar panelinden veya tarayıcınızın eklenti kısayolları sayfasından dilediğiniz başka bir tuş kombinasyonunu atayabilirsiniz.',
      },
    ],
  },

  {
    slug: 'yazi-haking-ai-kesilen-yanit',
    file: 'yazi-haking-ai-kesilen-yanit.html',
    kind: 'Mühendislik Notu',
    category: 'Yapay Zekâ',
    projectSlug: 'haking-ai',
    date: '2026-11-23',
    dateDisplay: '23 Kasım 2026',
    readTime: '8 dk okuma',
    title: 'Uzun AI Kod Yanıtları Kesildiğinde Güvenli Devam ve Parça Birleştirme Rehberi',
    shortDesc:
      'Dil modellerinin maksimum çıkış token sınırına veya ağ kesintisine takılan kod yanıtlarını bozmadan, tekrar üretmeden ve sözdizimi hatası doğurmadan nasıl tamamlarsınız?',
    image: 'assets/images/projects/haking-ai.webp',
    tags: ['HaKING AI', 'Kod Üretimi', 'SSE', 'Hata Ayıklama'],
    sections: [
      {
        id: 'neden-kesilir',
        heading: 'Uzun kod yanıtları neden tam bir fonksiyonun ortasında durur?',
        html: `
          <p>Yapay zekâ asistanlarından tek bir istekte 5 farklı dosya veya 600 satırlık eksiksiz bir uygulama istendiğinde yanıtın beklenmedik bir satırda kesilmesinin iki temel nedeni vardır: modelin tek yanıtta üretebileceği <strong>maksimum çıkış token sınırı (max_tokens)</strong> dolmuştur ya da uzun süren SSE bağlantısı ağ/proxy zaman aşımına uğramıştır.</p>
          <p>Buradaki asıl tuzak şudur: kullanıcı yalnızca “devam et” yazdığında model çoğu zaman nereden kaldığını şaşırır, aynı fonksiyonun başını tekrar yazar ya da önceki dosyaları yeniden üretmeye başlayarak hem kredi hem zaman kaybettirir.</p>
        `,
      },
      {
        id: 'kesin-devam-sablonu',
        heading: '“Devam et” yerine bağlam sabitleyen devam isteği yazmak',
        html: `
          <p>Yarım kalan bir kod parçasını temiz biçimde sürdürmenin en güvenilir yolu, modele <strong>son sağlam satırı</strong> ve <strong>tekrar edilmemesi gereken dosyaları</strong> açıkça vermektir:</p>
          <div class="code-block">
            <div class="code-head"><span>Sağlam devam isteği şablonu</span><button type="button" class="copy-code-btn" data-copy-code>Kopyala</button></div>
            <pre><code>Önceki yanıt şu satırda kesildi:
  "async function handleCheckout(cart) {"

- Tamamlanan index.html ve style.css dosyalarını tekrar yazma.
- Sadece app.js dosyasını tam olarak yukarıdaki satırdan itibaren devam ettir.
- Fonksiyonun kapanışından sonra eksik kalan export bloğunu ekle.</code></pre>
          </div>
          <p>Bu üç satırlık çerçeve, modelin hem hangi dosyada olduğunu hem de tam olarak hangi bloktan devam edeceğini sabitleyerek çift kapanış parantezi veya yinelenen fonksiyon başlığı hatalarını önler.</p>
        `,
      },
      {
        id: 'birlestirme-denetimi',
        heading: 'Parçaları birleştirdikten sonra yapılması gereken 3 hızlı kontrol',
        html: `
          <ol>
            <li><strong>Sınır satırı eşleşmesi:</strong> İki parçanın birleştiği satırda açılış süslü parantezi (<code>{</code>) veya HTML etiketinin iki kez yazılmadığını kontrol edin.</li>
            <li><strong>Sözdizimi taraması:</strong> JavaScript için <code>node --check dosya.js</code>, Python için <code>python -m py_compile dosya.py</code> çalıştırarak birleştirme hatasını anında yakalayın.</li>
            <li><strong>Baştan küçük parçalar istemek:</strong> Yeni bir göreve başlarken tek seferde tüm projeyi istemek yerine <a href="haking-ai-prompt-modu.html">HaKING AI Prompt Modu</a> ile dosya bazlı teslimat planı çıkarmak kesinti riskini en baştan azaltır.</li>
          </ol>
        `,
      },
    ],
    faqs: [
      {
        q: 'HaKING AI’da akış ortasında bağlantı koparsa kredim ne olur?',
        a: 'Hiç metin akışı başlamadan sağlayıcı hatası oluşursa kullanılan kredi otomatik iade edilir; akış başladıktan sonraki kesintilerde ise model sağlayıcı maliyeti oluştuğu için yeni istek dosya bazlı daraltılarak sürdürülmelidir.',
      },
    ],
  },

  {
    slug: 'yazi-copyhex-tema-tokenlari',
    file: 'yazi-copyhex-tema-tokenlari.html',
    kind: 'Teknik Rehber',
    category: 'Tasarım & Web',
    projectSlug: 'copyhex',
    date: '2026-11-16',
    dateDisplay: '16 Kasım 2026',
    readTime: '9 dk okuma',
    title: 'OKLCH Renk Uzayı ile Tasarım Sistemleri: Paletten Anlamsal CSS Tokenlarına',
    shortDesc:
      'Neden sabit HEX kodları büyüyen arayüzlerde bakım kâbusuna dönüşür? CopyHex ile OKLCH 50–950 skalaları, anlamsal roller ve WCAG kontrast güvencesi kurma rehberi.',
    image: 'assets/images/projects/copyhex.webp',
    tags: ['OKLCH', 'CSS Değişkenleri', 'Design Tokens', 'WCAG', 'CopyHex'],
    sections: [
      {
        id: 'palet-vs-token',
        heading: 'Güzel bir renk paleti neden tek başına tasarım sistemi değildir?',
        html: `
          <p>Bir projeye başlarken 5 güzel HEX kodu seçmek kolaydır; zor olan bu renkleri 30 farklı bileşene, açık/koyu temaya, odak (focus) halkasına, hata uyarılarına ve erişilebilir metin kontrastına tutarlı biçimde dağıtmaktır. Kod tabanına doğrudan <code>#B83B1A</code> yazıldığında koyu temaya geçmek veya marka vurgusunu güncellemek onlarca dosyada arama-değiştirme gerektirir.</p>
          <p>Çözüm, renkleri iki katmana ayırmaktır: <strong>İlkel skala (50–950 tonları)</strong> ve <strong>Anlamsal roller (<code>--bg</code>, <code>--surface</code>, <code>--ink</code>, <code>--accent</code>)</strong>.</p>
        `,
      },
      {
        id: 'oklch-farki',
        heading: 'HSL yerine neden OKLCH?',
        html: `
          <p>Klasik HSL uzayında <code>hsl(60, 90%, 50%)</code> (sarı) ile <code>hsl(240, 90%, 50%)</code> (mavi) matematiksel olarak aynı %50 açıklık değerine sahiptir; ancak insan gözü sarıyı çok parlak, maviyi ise koyu algılar. <strong>OKLCH</strong> (Lightness, Chroma, Hue) insan görsel algısına göre kalibre edildiği için aynı <code>L</code> değerindeki farklı tonlar birbirine çok yakın okunabilirlik ve kontrast sunar.</p>
          <div class="code-block">
            <div class="code-head"><span>CopyHex çıktısı anlamsal CSS token katmanı</span><button type="button" class="copy-code-btn" data-copy-code>Kopyala</button></div>
            <pre><code>:root {
  --surface-canvas: #f6f3ec;
  --surface-card:   #fdfbf7;
  --ink-primary:    #161819; /* 15.2:1 AAA kontrast */
  --ink-secondary:  #3d4247; /*  9.1:1 AAA kontrast */
  --accent-primary: #b83b1a; /*  5.6:1 AA+ büyük &amp; normal metin */
  --status-ok:      #165c45; /*  7.4:1 AAA kontrast */
}</code></pre>
          </div>
        `,
      },
      {
        id: 'wcag-ve-dtcg',
        heading: 'WCAG kontrast eşikleri ve DTCG dışa aktarımı',
        html: `
          <p>Erişilebilir bir yayın sitesinde gövde metni için en az <strong>4.5:1 (WCAG AA)</strong>, uzun okuma sayfalarında ideal olarak <strong>7:1+ (WCAG AAA)</strong> kontrast hedeflenmelidir. <a href="proje-copyhex.html">CopyHex v1.0.6</a> seçtiğiniz tohum renkten açık ve koyu tema rollerini üretirken her metin/zemin çiftini WCAG formülüyle denetler, ayrıca renk görme eksikliği simülasyonlarıyla yalnızca renge dayalı hata sinyallerini önceden fark etmenizi sağlar.</p>
          <p>Üretilen sistem ister doğrudan CSS değişkenleri ister Figma ve tasarım araçlarıyla uyumlu <strong>DTCG JSON</strong> token formatında dışa aktarılabilir. Canlı stüdyoyu <a href="https://copyhex.haking.tr/" target="_blank" rel="noopener noreferrer">copyhex.haking.tr</a> adresinde deneyebilirsiniz.</p>
        `,
      },
    ],
    faqs: [
      {
        q: 'Eski tarayıcılar OKLCH değişkenlerini desteklemezse ne olur?',
        a: 'CopyHex, OKLCH uzayında algısal olarak hesapladığı renkleri standart sRGB HEX karşılıklarıyla dışa aktarabilir; böylece tüm tarayıcılarda %100 uyumlu çalışır.',
      },
    ],
  },

  {
    slug: 'yazi-csell-net-satis',
    file: 'yazi-csell-net-satis.html',
    kind: 'Teknik Rehber',
    category: 'CS2 Ekonomi & Oyun',
    projectSlug: 'csell',
    date: '2026-11-17',
    dateDisplay: '17 Kasım 2026',
    readTime: '8 dk okuma',
    title: 'CS2 Pazar Yeri Komisyonları ve Net Kâr Takibi: Brüt Satış ile Gerçekleşen Gelir Farkı',
    shortDesc:
      'CS2 alım-satım işlemlerinde yüzdelik ve sabit komisyonlar, takas koruma kilidi ve gerçekleşmiş vs. tahmini kâr takibi neden ayrı kayıt altına alınmalıdır?',
    image: 'assets/images/projects/csell.webp',
    tags: ['CSELL', 'CS2 Komisyon', 'İşlem Günlüğü', 'Net Kâr'],
    sections: [
      {
        id: 'brut-yanilgisi',
        heading: 'Brüt satış fiyatına bakmak portföy hesabını nasıl bozar?',
        html: `
          <p>CS2 envanterinde 42 $’a alınan bir eşyayı 47 $’a satmak ilk bakışta +5 $ kâr gibi görünür. Ancak satış yapılan pazar yerinde %13,04 Steam kesintisi (veya dış pazarda %2 satış + %2 çekim komisyonu + sabit işlem ücreti) düştüğünde elinize geçen gerçek net tutar, alış maliyetinizin altında kalabilir. Düzensiz notlarla veya yalnızca akıldan yapılan takipte bu küçük kayıplar haftalar içinde birikerek toplam kârı eritir.</p>
        `,
      },
      {
        id: 'ornek-tablo',
        heading: 'Aynı eşyanın farklı pazarlardaki net sonuç karşılaştırması',
        html: `
          <div class="table-scroll">
            <table>
              <thead>
                <tr><th>Senaryo</th><th>Alış</th><th>Brüt Satış</th><th>Komisyon</th><th>Elde Kalan Net</th><th>Gerçek Kâr</th></tr>
              </thead>
              <tbody>
                <tr><td>Steam Topluluk Pazarı</td><td>42,00 $</td><td>47,00 $</td><td>~%13,04 (6,13 $)</td><td>40,87 $</td><td style="color:var(--accent);"><strong>−1,13 $ (Zarar)</strong></td></tr>
                <tr><td>Dış Pazar (%2 satış)</td><td>42,00 $</td><td>45,50 $</td><td>%2 (0,91 $)</td><td>44,59 $</td><td style="color:var(--forest);"><strong>+2,59 $ (+%6,2)</strong></td></tr>
                <tr><td>Dış Pazar (%2 + %2 çekim)</td><td>42,00 $</td><td>45,50 $</td><td>~%3,96 (1,80 $)</td><td>43,70 $</td><td style="color:var(--forest);"><strong>+1,70 $ (+%4,0)</strong></td></tr>
              </tbody>
            </table>
          </div>
          <p>Tablodan açıkça görüldüğü üzere daha düşük brüt satış fiyatı (45,50 $), düşük komisyon sayesinde daha yüksek brüt fiyattan (47,00 $) çok daha kârlı olabilir.</p>
        `,
      },
      {
        id: 'takas-kilidi-yedek',
        heading: '8 günlük takas koruma takibi ve JSON/CSV yedekleme disiplini',
        html: `
          <p><a href="proje-csell.html">CSELL</a> her alımda saat bazında takas kilidinin açılacağı tam anı hesaplayarak hangi eşyaların ne zaman likit hale geleceğini tek ekranda gösterir. Beklenen satış fiyatı ile sonradan gerçekleşen gerçek satış fiyatı ayrı sütunlarda tutulduğu için kendi tahmin isabet oranınızı da ölçebilirsiniz.</p>
          <p>Veriler gizlilik için yalnızca tarayıcınızda saklandığından, ayda bir kez JSON yedeğini dışa aktarmak veya muhasebe için CSV çıktısı almak cihaz değişiminde veri kaybını tamamen önler. Canlı uygulamayı <a href="https://csell.haking.tr/" target="_blank" rel="noopener noreferrer">csell.haking.tr</a> üzerinden kullanabilirsiniz.</p>
        `,
      },
    ],
    faqs: [
      {
        q: 'CSELL geçmişimi yeni bilgisayara nasıl taşırım?',
        a: 'CSELL içindeki JSON Dışa Aktar düğmesiyle tüm kayıtlarınızı tek dosyaya indirip yeni cihazda JSON İçe Aktar seçeneğiyle saniyeler içinde geri yükleyebilirsiniz.',
      },
    ],
  },
];
