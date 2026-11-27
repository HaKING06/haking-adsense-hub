# HaKING (`haking.tr`) — Bağımsız Yazılım Stüdyosu & Teknoloji Yayını

**Halit Güneş (`HaKING06`)** tarafından geliştirilen 15 büyük public GitHub projesini, canlı `*.haking.tr` servislerini ve özgün Türkçe mühendislik yazılarını tek çatı altında toplayan statik editoryal web sitesi.

## Mimari & Özellikler
- **Sıfır çalışma zamanı bağımlılığı:** Modüler Node.js statik site üreticisi (`scripts/build.mjs`) kök dizine 50 adet saf, SEO-hazır HTML sayfası üretir.
- **Editoryal Tasarım Sistemi:** Sıcak arşiv kâğıdı (`#F6F3EC`), mimari kömür (`#161819`), kiremit (`#B83B1A`) ve çam yeşili (`#165C45`) + Obsidyen Grafit koyu tema; `Fraunces` + `Plus Jakarta Sans` + `JetBrains Mono` Türkçe tam karakter destekli tipografi.
- **Çoklu Arama Motoru & AI Arama (GEO):** JSON-LD (`WebSite`, `Person`, `SoftwareApplication`, `TechArticle`, `FAQPage`, `BreadcrumbList`), görsel destekli `sitemap.xml`, `rss.xml`, `llms.txt`, `llms-full.txt`, `opensearch.xml`, `manifest.webmanifest` ve `robots.txt`.
- **Etkileşimli Araçlar:** Global `Ctrl+K` arama paleti (`search-index.json`), yerel okuma listesi, HaKING AI Prompt Modu öncesi/sonrası karşılaştırıcısı, Proje Yaptır brief oluşturucu, ağırlıklı not hesaplama simülatörü ve isteğe bağlı canlı GitHub API yenilemesi.

## Komutlar

```bash
node scripts/build.mjs    # Tüm 50 HTML sayfası + sitemap/RSS/llms/search-index derler
node scripts/verify.mjs   # Kırık link, eksik görsel, JSON-LD, canonical, AdSense ve kelime denetimi yapar
```
