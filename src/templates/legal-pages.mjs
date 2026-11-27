import { SITE } from '../data/site.mjs';
import { PROJECTS } from '../data/projects.mjs';
import { renderLayout, renderBreadcrumbs, esc } from './layout.mjs';

function legalShell({ title, description, canonicalPath, eyebrow, heading, lead, breadcrumbs, contentHtml, noindex = false, disableAds = false }) {
  const bodyHtml = `
    <header class="page-intro">
      <div class="wrap">
        ${renderBreadcrumbs(breadcrumbs)}
        <div class="eyebrow">${esc(eyebrow)}</div>
        <h1>${esc(heading)}</h1>
        <p class="lead">${esc(lead)}</p>
      </div>
    </header>
    <section class="section wrap">
      <article class="prose prose-wide">
        ${contentHtml}
      </article>
    </section>
  `;
  return renderLayout({
    title: `${title} | HaKING`,
    description,
    canonicalPath,
    breadcrumbs,
    noindex,
    disableAds,
    bodyHtml,
  });
}

export function renderEditorialPolicy() {
  return legalShell({
    title: 'Yayın ve Düzeltme İlkeleri',
    description: 'HaKING (haking.tr) teknik makale ve proje incelemelerinin yazarlık, kaynak doğrulama, düzeltme ve reklam bağımsızlığı standartları.',
    canonicalPath: 'yayin-ilkeleri.html',
    eyebrow: 'EDİTORYAL ŞEFFAFLIK · E-E-A-T',
    heading: 'Yayın ve Düzeltme İlkeleri',
    lead: 'haking.tr üzerinde bir makale veya proje analizinin nasıl hazırlandığını, teknik iddiaların nasıl doğrulandığını ve düzeltmelerin nasıl yönetildiğini şeffaf biçimde açıklıyoruz. Son güncelleme: 27 Kasım 2026.',
    breadcrumbs: [{ name: 'Ana Sayfa', href: 'index.html' }, { name: 'Yayın İlkeleri' }],
    contentHtml: `
      <h2>1. Yayın Sorumlusu ve Birinci El Deneyim</h2>
      <p><strong>haking.tr</strong> üzerindeki içeriklerin yayın sorumlusu ve ana yazarı <a href="hakkimda.html">Halit Güneş</a>’tir. Proje incelemeleri ve mühendislik vaka analizleri doğrudan geliştirilen ve GitHub üzerinde yayımlanan gerçek yazılımlara dayanır. Sitede yer alan her projenin canlı adresi, sürümü ve kaynak kodu bağlantısı yayın öncesinde kontrol edilir.</p>

      <h2>2. İçerik Türlerinin Açık Ayrımı</h2>
      <ul>
        <li><strong>Proje İncelemeleri (<code>proje-*.html</code>):</strong> Bir açık kaynak ürünün ne yaptığını, teknik mimarisini ve bilinen sınırlarını anlatır.</li>
        <li><strong>Vaka Analizleri (<code>makale-*.html</code>):</strong> Belirli bir mühendislik probleminin çözüm sürecini, veri akışını ve mimari takaslarını derinlemesine inceler.</li>
        <li><strong>Teknik Rehberler (<code>rehber-*.html</code>, <code>yazi-*.html</code>):</strong> Okuyucunun kendi projesinde veya günlük kullanımında uygulayabileceği somut adımlar, tablolar ve kod örnekleri sunar.</li>
      </ul>

      <h2>3. Doğrulama, Kaynaklandırma ve Ölçüm Dürüstlüğü</h2>
      <p>Tarayıcı API’leri, framework özellikleri ve üçüncü taraf servis politikaları zamanla değişebilir. Bu nedenle teknik açıklamalarda ilgili resmî dokümantasyon esas alınır. Gerçek bir ölçüm yapılmadan hayali hız artışı, kullanıcı sayısı veya finansal getiri vaadi sunulmaz. Örneğin CS2 ekonomi araçlarıyla (SPREAD, CSELL, TradeCalc) ilgili yazılar yalnızca matematiksel hesaplama mantığını açıklar; yatırım tavsiyesi değildir.</p>

      <h2>4. Yazım ve Geliştirme Yardımcıları</h2>
      <p>Üretim ve düzenleme sürecinde kodlama veya dil yardımcılarından faydalanılabilir; ancak hiçbir içerik insan denetimi, kaynak doğrulaması ve gerçek proje kodlarıyla karşılaştırma yapılmadan yayımlanmaz. Yayın sorumluluğu her zaman yazara aittir.</p>

      <h2>5. Düzeltme Politikası ve Güncelleme Tarihleri</h2>
      <p>Bir yazıda teknik hata, güncelliğini yitirmiş sürüm bilgisi veya kırık bağlantı fark ettiğinizde <a href="iletisim.html">iletişim sayfası</a> ya da <a href="mailto:${SITE.author.email}">${SITE.author.email}</a> üzerinden bildirebilirsiniz. Anlamı etkileyen düzeltmelerde güncelleme tarihi açıkça yenilenir; küçük yazım düzeltmeleri içeriği yeni haber gibi göstermek için kullanılmaz.</p>

      <h2>6. Reklam ve Editoryal Bağımsızlık</h2>
      <p>Google AdSense reklamları içerikten ve gezinme düğmelerinden açıkça ayrılır. Okuyuculardan reklamlara tıklaması istenmez, yanıltıcı “İndir” benzeri reklam yerleşimleri kullanılmaz. Sitede görünen üçüncü taraf reklamlar, ilgili ürün veya hizmetin HaKING tarafından editoryal olarak tavsiye edildiği anlamına gelmez.</p>
    `,
  });
}

export function renderPrivacyPolicy() {
  return legalShell({
    title: 'Gizlilik Politikası',
    description: 'HaKING (haking.tr) gizlilik politikası: barındırma günlükleri, iletişim verileri, tarayıcı depolaması, KVKK bilgilendirmesi ve Google AdSense DoubleClick çerez açıklamaları.',
    canonicalPath: 'gizlilik-politikasi.html',
    eyebrow: 'YASAL BİLGİLENDİRME · KVKK & ADSENSE',
    heading: 'Gizlilik Politikası',
    lead: 'haking.tr alan adını ziyaret ettiğinizde hangi verilerin işlenebileceğini, yerel tarayıcı depolamasının kapsamını ve Google AdSense reklam teknolojilerini açıklar. Son güncelleme: 27 Kasım 2026.',
    breadcrumbs: [{ name: 'Ana Sayfa', href: 'index.html' }, { name: 'Gizlilik Politikası' }],
    contentHtml: `
      <h2>1. Veri Sorumlusu ve Kapsam</h2>
      <p><strong>HaKING</strong> (<code>https://haking.tr</code>), Halit Güneş tarafından yayımlanan bağımsız yazılım stüdyosu ve teknoloji yayınıdır. Bu gizlilik politikası yalnızca <code>haking.tr</code> kök alan adı altındaki sayfaları kapsar. Alt alan adlarında yayımlanan uygulamaların (ör. <code>ai.haking.tr</code>, <code>qr.haking.tr</code>, <code>chat.haking.tr</code>) kendi gizlilik açıklamaları ilgili uygulamanın içinde ayrıca yer alır.</p>

      <h2>2. Sunucu Günlükleri ve Altyapı Verileri</h2>
      <p>Web barındırma ve CDN altyapısı, sitenin güvenliğini sağlamak ve hizmet sürekliliğini korumak amacıyla IP adresi, istek zamanı, tarayıcı türü (User-Agent), yönlendiren URL ve HTTP durum kodu gibi standart erişim kayıtlarını geçici olarak işleyebilir. <code>haking.tr</code> üzerinde kullanıcı hesabı, üyelik veritabanı veya şifre toplama mekanizması bulunmaz.</p>

      <h2>3. İletişim ve Proje Brief Formları</h2>
      <p><a href="iletisim.html">İletişim</a> ve <a href="proje-yaptir.html">Proje Yaptır</a> sayfalarındaki formlar statik olarak çalışır; girdiğiniz bilgiler HaKING sunucusuna kaydedilmez, yalnızca kendi cihazınızdaki e-posta uygulamasında bir taslak oluşturur. E-postayı göndermeyi tercih ettiğinizde iletiniz, yalnızca talebinizi yanıtlamak amacıyla e-posta sağlayıcınız ve <code>merhaba@haking.tr</code> posta kutusu üzerinden işlenir.</p>

      <h2>4. Yerel Tarayıcı Depolaması (localStorage)</h2>
      <p>Site deneyimini iyileştirmek için tarayıcınızın yerel depolamasında yalnızca dört teknik tercih tutulur: tema seçimi (<code>haking_theme_v2</code>), okuma yazı boyutu tercihi (<code>haking_font_scale</code>), kaydettiğiniz okuma listesi (<code>haking_bookmarks_v2</code>) ve çerez bildirim seçiminiz (<code>haking_cookie_pref_v2</code>). Bu veriler sunucularımıza gönderilmez. Ayrıntılar için <a href="cerez-politikasi.html">Çerez Politikası</a> sayfasını okuyabilirsiniz.</p>

      <h2>5. Google AdSense, DoubleClick ve Üçüncü Taraf Reklamlar</h2>
      <p>Bu sitede Google AdSense reklamları (yayıncı kimliği: <code>pub-2827419116684137</code>) kullanılmaktadır. Google ve üçüncü taraf reklam satıcıları, ziyaretçilerin bu siteye veya internetteki diğer sitelere yaptığı önceki ziyaretlere dayanarak reklam sunmak için çerezlerden (DoubleClick DART çerezi dahil) ve benzeri tanımlayıcılardan yararlanabilir.</p>
      <ul>
        <li>Kişiselleştirilmiş reklam tercihlerinizi <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">Google Reklam Ayarları</a> üzerinden dilediğiniz zaman kapatabilir veya düzenleyebilirsiniz.</li>
        <li>Üçüncü taraf reklam çerezlerinden çıkış seçenekleri için <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">YourAdChoices</a> platformunu ziyaret edebilirsiniz.</li>
        <li>Google’ın iş ortağı sitelerindeki verileri nasıl kullandığı hakkında resmî bilgi için <a href="https://policies.google.com/technologies/partner-sites?hl=tr" target="_blank" rel="noopener noreferrer">Google İş Ortağı Siteleri Gizlilik Açıklaması</a> sayfasını inceleyebilirsiniz.</li>
      </ul>

      <h2>6. Harici Bağlantılar ve GitHub API</h2>
      <p>Sitemizde GitHub, YouTube, Steam, Google Fonts ve kendi alt alan adlarımızdaki uygulamalara bağlantılar yer alır. Ayrıca <a href="github.html">GitHub Sayfam</a> bölümünde yalnızca kullanıcı düğmeye bastığında tarayıcıdan <code>api.github.com</code> genel API’sine salt okunur istek yapılır. Harici sitelerin veri işleme uygulamaları ilgili sağlayıcıların kendi gizlilik politikalarına tabidir.</p>

      <h2>7. Haklarınız ve İletişim</h2>
      <p>6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve yürürlükteki diğer düzenlemeler kapsamındaki bilgi edinme, düzeltme veya silme talepleriniz için <a href="mailto:${SITE.author.email}">${SITE.author.email}</a> adresine yazabilirsiniz.</p>
    `,
  });
}

export function renderCookiePolicy() {
  return legalShell({
    title: 'Çerez ve Yerel Depolama Politikası',
    description: 'haking.tr üzerinde kullanılan tarayıcı depolama anahtarları, Google AdSense reklam çerezleri ve tarayıcı üzerinden çerez yönetimi rehberi.',
    canonicalPath: 'cerez-politikasi.html',
    eyebrow: 'YASAL BİLGİLENDİRME · ÇEREZLER',
    heading: 'Çerez ve Yerel Depolama Politikası',
    lead: 'haking.tr’nin doğrudan kullandığı yerel depolama anahtarları ile reklam sunumu sırasında etkinleşebilen üçüncü taraf çerezlerin tam dökümü. Son güncelleme: 27 Kasım 2026.',
    breadcrumbs: [{ name: 'Ana Sayfa', href: 'index.html' }, { name: 'Çerez Politikası' }],
    contentHtml: `
      <h2>1. Çerez ve Yerel Depolama Nedir?</h2>
      <p>Çerezler (cookies) ve <code>localStorage</code> kayıtları, bir web sitesini ziyaret ettiğinizde tercihlerinizi hatırlamak veya reklam/güvenlik işlevlerini yürütmek için tarayıcınızda tutulan küçük metin verileridir.</p>

      <h2>2. haking.tr Tarafından Kullanılan Yerel Depolama Anahtarları</h2>
      <div class="table-scroll">
        <table>
          <thead>
            <tr><th>Anahtar Adı</th><th>Tür</th><th>Amaç</th><th>Sunucuya Gönderilir mi?</th></tr>
          </thead>
          <tbody>
            <tr><td><code>haking_theme_v2</code></td><td>localStorage</td><td>Açık (Arşiv Kâğıdı) / Koyu (Grafit) tema seçiminizi hatırlar.</td><td>Hayır</td></tr>
            <tr><td><code>haking_font_scale</code></td><td>localStorage</td><td>Yazı ve proje sayfalarındaki A− / A+ okuma boyutu tercihinizi saklar.</td><td>Hayır</td></tr>
            <tr><td><code>haking_bookmarks_v2</code></td><td>localStorage</td><td>“Okuma listem” bölümüne eklediğiniz makale ve projeleri tutar.</td><td>Hayır</td></tr>
            <tr><td><code>haking_cookie_pref_v2</code></td><td>localStorage</td><td>Çerez bilgilendirme çubuğu onay tercihinizi saklar.</td><td>Hayır</td></tr>
          </tbody>
        </table>
      </div>

      <h2>3. Üçüncü Taraf Reklam Çerezleri (Google AdSense)</h2>
      <p>Sitemizde Google AdSense reklam kodu bulunduğundan, reklam gösterimi etkinleştirildiğinde Google ve yetkili reklam ortakları sıklık sınırlaması, sahtekârlık önleme, ölçümleme ve ilgi alanına dayalı reklam sunumu için üçüncü taraf çerezler (DoubleClick DART çerezi dahil) yerleştirebilir. Bu çerezler doğrudan <code>haking.tr</code> sunucuları tarafından okunmaz; ilgili reklam sağlayıcının gizlilik ilkelerine tabidir.</p>
      <ul>
        <li>Kişiselleştirilmiş reklamları kapatmak için <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">Google Reklam Ayarları</a> sayfasını kullanabilirsiniz.</li>
        <li>Üçüncü taraf reklam çerezleri hakkında kapsamlı seçenekler için <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">YourAdChoices</a> platformunu ziyaret edebilirsiniz.</li>
      </ul>

      <h2>4. Masaüstü Tarayıcılarda Çerezleri Yönetme ve Silme</h2>
      <p>Tarayıcınızın gizlilik ayarları üzerinden mevcut çerezleri silebilir, üçüncü taraf çerezlerini engelleyebilir veya yalnızca belirli siteler için depolama izni verebilirsiniz:</p>
      <ul>
        <li><strong>Google Chrome:</strong> Ayarlar → Gizlilik ve güvenlik → Üçüncü taraf çerezleri / Tarama verilerini temizle.</li>
        <li><strong>Microsoft Edge:</strong> Ayarlar → Çerezler ve site izinleri → Çerezleri ve site verilerini yönet ve sil.</li>
        <li><strong>Mozilla Firefox:</strong> Ayarlar → Gizlilik ve Güvenlik → Çerezler ve Site Verileri → Verileri Temizle.</li>
        <li><strong>Safari:</strong> Ayarlar → Gizlilik → Web Sitesi Verilerini Yönet.</li>
      </ul>

      <h2>5. Mobil Cihazlarda Reklam ve Depolama Tercihleri</h2>
      <p>Android cihazlarda <em>Ayarlar → Google → Reklamlar</em> menüsünden reklam kimliğini sıfırlayabilir veya silebilirsiniz. iOS/iPadOS cihazlarda ise <em>Ayarlar → Gizlilik ve Güvenlik → Takip</em> ve <em>Safari → Geçmişi ve Web Sitesi Verilerini Sil</em> seçenekleri üzerinden site verilerini yönetebilirsiniz. Yerel depolamayı temizlediğinizde açık/koyu tema seçiminiz, okuma boyutu ayarınız ve okuma listeniz varsayılan durumuna döner; site içeriğine erişiminiz hiçbir şekilde kısıtlanmaz.</p>
      <p>Sitemizdeki çerez bilgilendirme tercihini dilediğiniz zaman yeniden düzenlemek için aşağıdaki düğmeyi kullanabilirsiniz:</p>
      <p><button type="button" class="btn btn-secondary btn-sm" data-open-cookie-settings>Çerez Tercihi Çubuğunu Aç</button></p>
    `,
  });
}

export function renderTermsPage() {
  return legalShell({
    title: 'Kullanım Koşulları',
    description: 'HaKING (haking.tr) web sitesi kullanım koşulları, açık kaynak lisansları, bilgilendirme niteliği ve sorumluluk sınırları.',
    canonicalPath: 'terms.html',
    eyebrow: 'YASAL BİLGİLENDİRME',
    heading: 'Kullanım Koşulları',
    lead: 'haking.tr web sitesini ziyaret etmeniz ve içeriklerinden yararlanmanız aşağıdaki koşullara tabidir. Son güncelleme: 27 Kasım 2026.',
    breadcrumbs: [{ name: 'Ana Sayfa', href: 'index.html' }, { name: 'Kullanım Koşulları' }],
    contentHtml: `
      <h2>1. Kapsam ve Kabul</h2>
      <p><code>https://haking.tr</code> adresini ziyaret ederek bu kullanım koşullarını kabul etmiş sayılırsınız. Site, Halit Güneş tarafından yürütülen kişisel yazılım stüdyosu ve teknoloji yayınıdır; site içeriği, proje sürümleri ve bağlantıları önceden bildirim yapılmaksızın güncellenebilir veya arşivlenebilir.</p>

      <h2>2. Fikri Mülkiyet, Alıntı ve Açık Kaynak Lisansları</h2>
      <p>Sitedeki özgün makaleler, rehberler, görseller ve tasarım varlıkları aksi belirtilmedikçe Halit Güneş’e aittir. Kaynak ve aktif bağlantı (<code>https://haking.tr</code>) göstermek şartıyla kısa alıntılar yapılabilir; yazıların tamamının izinsiz kopyalanarak başka sitelerde, otomatik içerik havuzlarında veya ticari paketlerde yeniden yayımlanması yasaktır. GitHub üzerinde paylaşılan proje kaynak kodları ise ilgili depodaki kendi açık kaynak lisansına (genellikle MIT Lisansı) tabidir.</p>

      <h2>3. Üçüncü Taraf Marka ve Ürün Atıfları</h2>
      <p>Proje incelemeleri ve teknik rehberlerde adı geçen Steam, Counter-Strike 2, Valve, CSFloat, Youpin898, Google, Cloudflare, GitHub, FastAPI ve benzeri markalar ilgili hak sahiplerine aittir. HaKING bu kurumlarla resmî ortaklık veya temsilcilik ilişkisi içinde değildir; atıflar yalnızca teknik bağlam ve uyumluluk açıklaması amacıyla yapılır.</p>

      <h2>4. Bilgilendirme Niteliği ve Sorumluluk Sınırı</h2>
      <p>Sitedeki tüm rehberler, kod örnekleri, ağırlıklı not hesaplama simülatörü ve CS2 ekonomi analizleri yalnızca genel bilgilendirme ve eğitim amaçlıdır; hukuki, mali, yatırım veya resmî akademik danışmanlık niteliği taşımaz. Kod örneklerini üretim sistemlerinde kullanmadan önce kendi ortamınızda test etmeniz ve verilerinizin yedeğini almanız gerekir. Yürürlükteki hukukta izin verilen ölçüde, site içeriğinin veya araçların kullanımından doğan dolaylı zararlardan sorumluluk kabul edilmez.</p>

      <h2>5. Kullanıcı Davranışı, Harici Bağlantılar ve Reklamlar</h2>
      <p>Siteyi hukuka aykırı amaçlarla kullanmamalı, otomatik aşırı yük oluşturarak erişilebilirliği bozmaya çalışmamalısınız. Site üzerinden yönlendirilen üçüncü taraf sitelerin erişilebilirliği, güvenliği ve gizlilik politikaları HaKING’in kontrolünde değildir. Reklam uygulamaları hakkında ayrıntılar <a href="gizlilik-politikasi.html">Gizlilik Politikası</a> ve <a href="cerez-politikasi.html">Çerez Politikası</a> sayfalarında açıklanır.</p>

      <h2>6. Uygulanacak Hukuk ve İletişim</h2>
      <p>Bu koşullara Türkiye Cumhuriyeti hukuku uygulanır. Koşullardaki esaslı güncellemeler bu sayfada güncelleme tarihiyle yayımlanır. Fikri mülkiyet veya kullanım koşullarına ilişkin bildirimler için <a href="mailto:${SITE.author.email}">${SITE.author.email}</a> adresinden veya <a href="iletisim.html">iletişim sayfasından</a> ulaşabilirsiniz.</p>
    `,
  });
}

export function renderHtmlSitemap(allArticles) {
  const breadcrumbs = [{ name: 'Ana Sayfa', href: 'index.html' }, { name: 'HTML Site Haritası' }];
  return legalShell({
    title: 'HTML Site Haritası',
    description: 'haking.tr üzerindeki tüm sayfaların, 15 açık kaynak projenin ve 33 teknoloji haberi ile mühendislik yazısının kategorize edilmiş tam listesi.',
    canonicalPath: 'site-haritasi.html',
    eyebrow: 'GEZİNME DİZİNİ',
    heading: 'HTML Site Haritası',
    lead: 'haking.tr üzerindeki tüm çekirdek sayfalar, 15 açık kaynak proje incelemesi, teknoloji haberleri, teknik makaleler ve yasal belgeler.',
    breadcrumbs,
    contentHtml: `
      <h2>Ana ve Stüdyo Sayfaları</h2>
      <ul>
        <li><a href="index.html">Ana Sayfa — HaKING Yazılım Stüdyosu &amp; Teknoloji Yayını</a></li>
        <li><a href="projects.html">Açık Kaynak Projeler Kataloğu (15 Public Ürün)</a></li>
        <li><a href="araclar.html">Ücretsiz Online Mühendislik Araçları Stüdyosu (5 Araç)</a></li>
        <li><a href="durum.html">Canlı Ekosistem Durumu &amp; Mimari Harita (15 Servis)</a></li>
        <li><a href="haking-ai-prompt-modu.html">HaKING AI Prompt Modu (v1.19.2) Özel Tanıtım &amp; Karşılaştırıcı</a></li>
        <li><a href="blog.html">Mühendislik Yazıları ve Teknik Rehberler</a></li>
        <li><a href="haberler.html">Okuma Merkezi &amp; Sürüm Günlüğü</a></li>
        <li><a href="hakkimda.html">Hakkımda (Ben Kimim? — Halit Güneş)</a></li>
        <li><a href="github.html">GitHub Sayfam (github.com/HaKING06)</a></li>
        <li><a href="proje-yaptir.html">Proje Yaptır &amp; İnteraktif Brief Oluşturucu</a></li>
        <li><a href="iletisim.html">İletişim</a></li>
      </ul>

      <h2>15 Açık Kaynak Proje İncelemesi</h2>
      <ul>
        ${PROJECTS.map((p) => `<li><a href="${p.page}">${esc(p.name)} (${esc(p.version)})</a> — ${esc(p.tagline)}</li>`).join('')}
      </ul>

      <h2>Mühendislik Vaka Analizleri ve Teknik Rehberler (${allArticles.length})</h2>
      <ul>
        ${allArticles.map((a) => `<li><a href="${a.file}">${esc(a.title)}</a> <span class="mono" style="font-size:0.8em;color:var(--ink-muted);">(${esc(a.dateDisplay)})</span></li>`).join('')}
      </ul>

      <h2>Güven ve Yasal Belgeler</h2>
      <ul>
        <li><a href="yayin-ilkeleri.html">Yayın ve Düzeltme İlkeleri</a></li>
        <li><a href="gizlilik-politikasi.html">Gizlilik Politikası</a></li>
        <li><a href="cerez-politikasi.html">Çerez ve Yerel Depolama Politikası</a></li>
        <li><a href="terms.html">Kullanım Koşulları</a></li>
      </ul>
    `,
  });
}

export function render404Page() {
  return legalShell({
    title: 'Sayfa Bulunamadı (404)',
    description: 'Aradığınız sayfa taşınmış veya kaldırılmış olabilir. HaKING ana sayfasına, proje kataloğuna veya site içi aramaya dönebilirsiniz.',
    canonicalPath: '404.html',
    eyebrow: 'HTTP 404 · SAYFA BULUNAMADI',
    heading: 'Aradığınız sayfa burada değil.',
    lead: 'Bağlantı güncellenmiş veya adreste küçük bir yazım hatası olabilir. Aşağıdaki hızlı bağlantılarla ya da üstteki Ctrl+K aramasıyla aradığınız içeriğe hemen ulaşabilirsiniz.',
    breadcrumbs: [{ name: 'Ana Sayfa', href: 'index.html' }, { name: '404' }],
    noindex: true,
    disableAds: true,
    contentHtml: `
      <div class="actions" style="margin-bottom:28px;">
        <a class="btn btn-accent" href="index.html">Ana Sayfaya Dön →</a>
        <a class="btn btn-secondary" href="projects.html">15 Projeyi Gör</a>
        <a class="btn btn-secondary" href="blog.html">Mühendislik Yazıları</a>
        <button type="button" class="btn btn-secondary" data-open-search>Site İçinde Ara (Ctrl+K)</button>
      </div>
      <h2>En Çok Ziyaret Edilen Sayfalar</h2>
      <ul>
        <li><a href="haking-ai-prompt-modu.html">HaKING AI Prompt Modu (v1.19.2)</a></li>
        <li><a href="proje-spread.html">SPREAD V11.1 — CS2 Arbitraj Terminali</a></li>
        <li><a href="proje-cosmic.html">COSMIC v12.0 — 60 Uzay Oyunu Portalı</a></li>
        <li><a href="proje-notmatik.html">NotMatik v3.0 — Üniversite Not Hesaplama</a></li>
        <li><a href="site-haritasi.html">Tam HTML Site Haritası</a></li>
      </ul>
    `,
  });
}
