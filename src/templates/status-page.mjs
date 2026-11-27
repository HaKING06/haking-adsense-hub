import { SITE } from '../data/site.mjs';
import { PROJECTS } from '../data/projects.mjs';
import { renderLayout, renderBreadcrumbs, esc } from './layout.mjs';

export function renderStatusPage() {
  const breadcrumbs = [
    { name: 'Ana Sayfa', href: 'index.html' },
    { name: 'Canlı Ekosistem Durumu' },
  ];

  const liveServices = [
    {
      name: 'haking.tr (Ana Stüdyo & Yayın)',
      url: 'https://haking.tr/',
      version: 'v4.0',
      category: 'Ana Merkez',
      infra: 'Statik HTML · Cloudflare Edge',
      detail: 'index.html',
    },
    ...PROJECTS.filter((p) => Boolean(p.liveUrl)).map((p) => ({
      name: p.name,
      url: p.liveUrl,
      version: p.version,
      category: p.category,
      infra: p.stack.slice(0, 2).join(' · '),
      detail: p.page,
    })),
  ];

  const bodyHtml = `
    <header class="page-intro">
      <div class="wrap">
        ${renderBreadcrumbs(breadcrumbs)}
        <div class="eyebrow"><span class="eyebrow-dot"></span> GERÇEK ZAMANLI ERİŞİLEBİLİRLİK &amp; MİMARİ HARİTA</div>
        <h1>HaKING Canlı Ekosistem Durumu (${liveServices.length} Servis).</h1>
        <p class="lead"><strong>haking.tr</strong> ve tüm aktif alt alan adı servislerinin barındırma mimarisi, güncel sürümleri ve tarayıcınızdan anlık erişilebilirlik / tepki süresi (RTT) doğrulama panosu.</p>
        <div class="actions" style="margin-top:20px;">
          <button type="button" class="btn btn-accent" id="status-ping-all">Tüm ${liveServices.length} Servisi Tarayıcımdan Test Et</button>
          <a class="btn btn-secondary" href="projects.html">15 Proje Kataloğu →</a>
          <a class="btn btn-secondary" href="araclar.html">5 Online Araç →</a>
        </div>
        <p id="status-ping-summary" class="mono" style="margin-top:12px;font-size:0.82rem;color:var(--forest);" role="status" aria-live="polite">Test yalnızca siz düğmeye bastığınızda kendi tarayıcınızdan çalıştırılır (sunucuya kayıt gönderilmez).</p>
      </div>
    </header>

    <section class="section wrap">
      <div class="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Servis</th>
              <th>Alan Adı</th>
              <th>Sürüm</th>
              <th>Altyapı / Katman</th>
              <th>Tarayıcı Erişim Testi</th>
              <th>Erişim</th>
            </tr>
          </thead>
          <tbody>
            ${liveServices
              .map(
                (s) => `<tr data-ping-row data-ping-url="${esc(s.url)}">
                  <td><strong><a href="${s.detail}">${esc(s.name)}</a></strong><br><small style="color:var(--ink-muted);">${esc(s.category)}</small></td>
                  <td class="mono" style="font-size:0.82rem;">${esc(s.url.replace(/^https?:\/\//, '').replace(/\/$/, ''))}</td>
                  <td class="mono">${esc(s.version)}</td>
                  <td style="font-size:0.85rem;">${esc(s.infra)}</td>
                  <td class="mono" data-ping-cell style="font-size:0.8rem;color:var(--ink-muted);">Test bekleniyor</td>
                  <td style="white-space:nowrap;">
                    <a class="text-link" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">Canlı ↗</a>
                  </td>
                </tr>`
              )
              .join('')}
          </tbody>
        </table>
      </div>
    </section>

    <section class="section section-band">
      <div class="wrap prose prose-wide">
        <h2>Çoklu Alt Alan Adı Mimarisi Nasıl Tasarlandı?</h2>
        <p>HaKING ekosistemindeki her ürün, tek bir monolitik sunucuya bağımlı kalmamak için sorumluluk alanına göre ayrılmış alt alan adları (<code>*.haking.tr</code>) üzerinde yayınlanır. Bu ayrım üç önemli mühendislik avantajı sağlar:</p>
        <ul>
          <li><strong>Hata İzolasyonu (Blast Radius):</strong> Örneğin gerçek zamanlı Socket.IO sunucusundaki bir yeniden başlatma (<code>chat.haking.tr</code>) veya yapay zekâ API güncellemesi (<code>ai.haking.tr</code>), statik kenar önbellekten sunulan <code>haking.tr</code>, <code>notmatik.haking.tr</code> veya <code>copyhex.haking.tr</code> servislerini hiçbir şekilde etkilemez.</li>
          <li><strong>Kenar (Edge) Hızı ve Düşük Gecikme:</strong> Sunucu oturumu gerektirmeyen tüm projeler statik paket veya Cloudflare Pages/Workers üzerinden yayınlanır; bu sayede ilk bayt süresi (TTFB) düşük kalır ve tarayıcı içi hesaplamalar çevrimdışına yakın hızda tepki verir.</li>
          <li><strong>Şeffaf Durum ve Açık Kaynak İzlenebilirlik:</strong> Her servisin sürüm numarası, bilinen teknik sınırları ve kaynak kodu doğrudan ilgili <code>proje-*.html</code> dosyasında ve <a href="github.html">GitHub Sayfam</a> tablosunda belgelenir.</li>
        </ul>

        <h2>Tarayıcı Erişim Testi Nasıl Çalışır?</h2>
        <p>Üstteki <strong>“Test Et”</strong> düğmesine bastığınızda tarayıcınız, her servis adresine hafif bir <code>fetch(..., { mode: 'no-cors', cache: 'no-store' })</code> isteği gönderir ve <code>performance.now()</code> ile kendi ağınızdan ilgili uç noktaya gidiş-dönüş süresini (ms) ölçer. Ölçülen gecikme değeri bulunduğunuz şehre, internet servis sağlayıcınıza ve DNS önbelleğinize göre farklılık gösterebilir.</p>
      </div>
    </section>
  `;

  return renderLayout({
    title: 'Canlı Ekosistem Durumu & Mimari Harita (15 Servis) | HaKING',
    description:
      'haking.tr ve tüm aktif *.haking.tr açık kaynak web servislerinin güncel sürüm, altyapı mimarisi ve tarayıcı içi canlı erişilebilirlik (RTT) test panosu.',
    canonicalPath: 'durum.html',
    activeNav: 'status',
    breadcrumbs,
    bodyHtml,
  });
}
