/* HaKING (haking.tr) — Progressive Editorial Interaction Suite (Zero external runtime deps) */
(() => {
  'use strict';

  const STORAGE_THEME = 'haking_theme_v2';
  const STORAGE_BOOKMARKS = 'haking_bookmarks_v2';
  const STORAGE_COOKIE = 'haking_cookie_pref_v2';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const trLower = (s) => String(s || '').toLocaleLowerCase('tr-TR').trim();

  /* -----------------------------------------------------------------------
     1. Theme Switcher (Warm Archival Daylight <-> Warm Obsidian Graphite)
     ----------------------------------------------------------------------- */
  function applyTheme(theme) {
    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
    const metaTheme = $('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute('content', theme === 'dark' ? '#121415' : '#f6f3ec');
    $$('[data-theme-toggle]').forEach((btn) => {
      const isDark = theme === 'dark';
      btn.setAttribute('aria-pressed', String(isDark));
      btn.setAttribute('aria-label', isDark ? 'Açık kağıt temasına geç' : 'Koyu grafit temasına geç');
      const lbl = $('[data-theme-icon]', btn);
      if (lbl) lbl.textContent = isDark ? '☀' : '☾';
    });
  }

  function initTheme() {
    const saved = localStorage.getItem(STORAGE_THEME);
    const initial = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(initial);
    $$('[data-theme-toggle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        localStorage.setItem(STORAGE_THEME, next);
        applyTheme(next);
      });
    });
  }

  /* -----------------------------------------------------------------------
     2. Mobile Navigation Drawer
     ----------------------------------------------------------------------- */
  function initNav() {
    const toggle = $('.nav-toggle');
    const menu = $('#nav-links');
    if (!toggle || !menu) return;
    const setOpen = (open) => {
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };
    toggle.addEventListener('click', () => setOpen(!menu.classList.contains('is-open')));
    $$('a', menu).forEach((a) => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) setOpen(false);
    });
  }

  /* -----------------------------------------------------------------------
     3. Global Command Search Palette (Ctrl+K / / / Search Button)
     ----------------------------------------------------------------------- */
  let searchData = null;
  async function loadSearchIndex() {
    if (searchData) return searchData;
    try {
      const res = await fetch('search-index.json', { cache: 'default' });
      if (!res.ok) throw new Error('index');
      searchData = await res.json();
    } catch {
      searchData = [];
    }
    return searchData;
  }

  function initSearchModal() {
    const modal = $('#search-modal');
    if (!modal) return;
    const input = $('#global-search-input', modal);
    const list = $('#global-search-results', modal);
    const countEl = $('#global-search-count', modal);
    let activeIdx = 0;

    const renderResults = (items) => {
      list.innerHTML = '';
      activeIdx = 0;
      if (countEl) countEl.textContent = `${items.length} sonuç`;
      if (!items.length) {
        list.innerHTML = '<div style="padding:20px;text-align:center;color:var(--ink-muted);font-size:0.9rem;">Eşleşen sayfa, proje veya rehber bulunamadı.</div>';
        return;
      }
      items.slice(0, 14).forEach((it, idx) => {
        const a = document.createElement('a');
        a.href = it.url;
        a.className = 'search-result-item' + (idx === 0 ? ' is-selected' : '');
        a.innerHTML = `<span><strong>${it.title}</strong><small>${it.desc}</small></span><span class="tag">${it.type}</span>`;
        list.appendChild(a);
      });
    };

    const runQuery = async () => {
      const data = await loadSearchIndex();
      const q = trLower(input.value);
      if (!q) {
        renderResults(data.slice(0, 10));
        return;
      }
      const tokens = q.split(/\s+/).filter(Boolean);
      const scored = data
        .map((item) => {
          const hay = trLower(`${item.title} ${item.desc} ${(item.tags || []).join(' ')} ${item.type}`);
          let score = 0;
          for (const t of tokens) {
            if (!hay.includes(t)) return null;
            if (trLower(item.title).includes(t)) score += 3;
            else score += 1;
          }
          return { item, score };
        })
        .filter(Boolean)
        .sort((a, b) => b.score - a.score)
        .map((x) => x.item);
      renderResults(scored);
    };

    const open = () => {
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
      runQuery();
      setTimeout(() => input.focus(), 20);
    };
    const close = () => {
      modal.hidden = true;
      document.body.style.overflow = '';
    };

    $$('[data-open-search]').forEach((b) => b.addEventListener('click', open));
    $$('[data-close-search]', modal).forEach((b) => b.addEventListener('click', close));
    modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
    input.addEventListener('input', runQuery);

    input.addEventListener('keydown', (e) => {
      const items = $$('.search-result-item', list);
      if (!items.length) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIdx = (activeIdx + 1) % items.length;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIdx = (activeIdx - 1 + items.length) % items.length;
      } else if (e.key === 'Enter') {
        e.preventDefault();
        items[activeIdx]?.click();
        return;
      } else return;
      items.forEach((el, i) => el.classList.toggle('is-selected', i === activeIdx));
      items[activeIdx]?.scrollIntoView({ block: 'nearest' });
    });

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        modal.hidden ? open() : close();
      } else if (e.key === 'Escape' && !modal.hidden) {
        close();
      }
    });
  }

  /* -----------------------------------------------------------------------
     4. Local Reading List / Bookmarks Drawer
     ----------------------------------------------------------------------- */
  function getBookmarks() {
    try { return JSON.parse(localStorage.getItem(STORAGE_BOOKMARKS) || '[]'); }
    catch { return []; }
  }
  function saveBookmarks(items) {
    localStorage.setItem(STORAGE_BOOKMARKS, JSON.stringify(items));
    updateBookmarkUI();
  }
  function updateBookmarkUI() {
    const list = getBookmarks();
    $$('[data-bookmark-count]').forEach((el) => {
      el.textContent = String(list.length);
      el.hidden = list.length === 0;
    });
    $$('[data-bookmark-toggle]').forEach((btn) => {
      const url = btn.dataset.url;
      const saved = list.some((x) => x.url === url);
      const compact = btn.classList.contains('mini-util-btn');
      btn.setAttribute('aria-pressed', String(saved));
      btn.textContent = compact
        ? (saved ? '★ Kayıtlı' : '☆ Kaydet')
        : (saved ? '★ Okuma listesinde' : '☆ Okuma listesine ekle');
    });
    const drawerList = $('#bookmarks-list');
    if (drawerList) {
      if (!list.length) {
        drawerList.innerHTML = '<div style="padding:20px;text-align:center;color:var(--ink-muted);font-size:0.9rem;">Henüz kaydettiğiniz yazı veya proje yok. Makale ve proje sayfalarındaki “Okuma listesine ekle” düğmesini kullanabilirsiniz.</div>';
      } else {
        drawerList.innerHTML = list.map((it) => `
          <div class="search-result-item" style="cursor:default;">
            <a href="${it.url}" style="flex:1;text-decoration:none;">
              <strong>${it.title}</strong>
              <small>${it.type || 'İçerik'}</small>
            </a>
            <button type="button" class="btn btn-secondary btn-sm" data-remove-bookmark="${it.url}">Kaldır</button>
          </div>
        `).join('');
        $$('[data-remove-bookmark]', drawerList).forEach((b) => {
          b.addEventListener('click', () => {
            saveBookmarks(getBookmarks().filter((x) => x.url !== b.dataset.removeBookmark));
          });
        });
      }
    }
  }
  function initBookmarks() {
    updateBookmarkUI();
    $$('[data-bookmark-toggle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const url = btn.dataset.url;
        const title = btn.dataset.title || document.title;
        const type = btn.dataset.type || 'Makale';
        const list = getBookmarks();
        const exists = list.some((x) => x.url === url);
        saveBookmarks(exists ? list.filter((x) => x.url !== url) : [{ url, title, type }, ...list]);
      });
    });
    const modal = $('#bookmarks-modal');
    if (!modal) return;
    $$('[data-open-bookmarks]').forEach((b) => b.addEventListener('click', () => {
      updateBookmarkUI();
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
    }));
    $$('[data-close-bookmarks]', modal).forEach((b) => b.addEventListener('click', () => {
      modal.hidden = true;
      document.body.style.overflow = '';
    }));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) { modal.hidden = true; document.body.style.overflow = ''; }
    });
  }

  /* -----------------------------------------------------------------------
     5. Article Reading Progress, Active TOC & Copy Code Buttons
     ----------------------------------------------------------------------- */
  function initReadingUX() {
    const bar = $('.reading-progress');
    const article = $('.prose');
    if (bar && article) {
      const updateBar = () => {
        const rect = article.getBoundingClientRect();
        const total = Math.max(1, article.offsetHeight - window.innerHeight * 0.6);
        const passed = Math.min(total, Math.max(0, -rect.top + 80));
        bar.style.width = `${(passed / total) * 100}%`;
      };
      window.addEventListener('scroll', updateBar, { passive: true });
      updateBar();
    }

    const tocLinks = $$('.toc-list a[href^="#"]');
    if (tocLinks.length && 'IntersectionObserver' in window) {
      const targets = tocLinks.map((a) => $(a.getAttribute('href'))).filter(Boolean);
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            tocLinks.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === '#' + en.target.id));
          }
        });
      }, { rootMargin: '-18% 0px -68% 0px' });
      targets.forEach((t) => obs.observe(t));
    }

    $$('[data-copy-code]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const pre = btn.closest('.code-block')?.querySelector('pre');
        if (!pre) return;
        try {
          await navigator.clipboard.writeText(pre.innerText);
          const orig = btn.textContent;
          btn.textContent = 'Kopyalandı ✓';
          setTimeout(() => { btn.textContent = orig; }, 1600);
        } catch {}
      });
    });

    $$('[data-copy-text]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(btn.dataset.copyText);
          const orig = btn.textContent;
          btn.textContent = 'Kopyalandı ✓';
          setTimeout(() => { btn.textContent = orig; }, 1600);
        } catch {}
      });
    });
  }

  /* -----------------------------------------------------------------------
     6. Filterable Project & Article Grids
     ----------------------------------------------------------------------- */
  function initFilterableGrid(config) {
    const cards = $$(config.cardSelector);
    if (!cards.length) return;
    const pills = $$(config.pillSelector);
    const searchInput = $(config.searchSelector);
    const countEl = $(config.countSelector);
    const emptyEl = $(config.emptySelector);
    let activeCat = 'all';

    const update = () => {
      const q = trLower(searchInput?.value || '');
      let shown = 0;
      cards.forEach((card) => {
        const cat = card.dataset.category || '';
        const matchCat = activeCat === 'all' || cat === activeCat;
        const matchQ = !q || trLower(card.textContent).includes(q);
        const ok = matchCat && matchQ;
        card.hidden = !ok;
        if (ok) shown += 1;
      });
      if (countEl) countEl.textContent = `${shown} ${config.unit}`;
      if (emptyEl) emptyEl.hidden = shown > 0;
    };

    pills.forEach((p) => {
      p.addEventListener('click', () => {
        activeCat = p.dataset.filter || 'all';
        pills.forEach((x) => x.classList.toggle('is-active', x === p));
        update();
      });
    });
    if (searchInput) searchInput.addEventListener('input', update);
    update();
  }

  /* -----------------------------------------------------------------------
     7. HaKING AI Prompt Modu — Interactive Before / After Comparator
     ----------------------------------------------------------------------- */
  function initPromptComparator() {
    const root = $('[data-prompt-comparator]');
    if (!root) return;
    const tabs = $$('[data-pm-tab]', root);
    const rawEl = $('[data-pm-raw]', root);
    const outEl = $('[data-pm-out]', root);
    const copyBtn = $('[data-pm-copy]', root);

    const CASES = {
      kod: {
        raw: 'Mevcut web oyunuma bir sonuç ekranı ekle.',
        out: `AMAÇ: Mevcut tarayıcı oyununa tur sonu sonuç ekranı ekle.\n\n1. ÖN İNCELEME\n- Önce mevcut tur bitiş akışını ve skor state yönetimini incele.\n\n2. ZORUNLU GEREKSİNİMLER\n- Tur sonunda toplam skor, geçen süre ve "Yeniden Başlat" düğmesini göster.\n- Mevcut klavye/fare oyun kontrollerini ve skor kurallarını koru.\n- Yeni SQL veritabanı veya harici sunucu servisi ekleme.\n\n3. KABUL VE TEST ÖLÇÜTLERİ\n- Kazanma, kaybetme ve yeniden başlatma akışlarını uçtan uca test et.\n- Teslim özetinde değişen dosyaları ve çalıştırılan kontrolleri listele.`
      },
      oyun: {
        raw: 'Codex için 3D çok oyunculu tarayıcı oyunu yaptırmak istiyorum, ücretsiz yayınlansın.',
        out: `AMAÇ: İki istemcinin aynı maçta oynayıp yeniden başlatabildiği 3D tarayıcı oyunu.\n\n1. ARAŞTIRMA SIRASI\n- Konsept ve oyun adı kesinleşmeden önce Steam benzer tür mekaniklerini incele.\n\n2. ALTYAPI VE DEVREDİLEN KARARLAR\n- Ön yüz: statik dağıtım (Cloudflare Pages / Workers).\n- Gerçek zamanlı oda katmanı: ücretsiz katmanlı pilot doğrulaması yap, SQL ekleme.\n\n3. KABUL TESTİ\n- İki ayrı tarayıcı oturumu aynı odaya katılsın, maçı tamamlasın ve temiz biçimde rövanş başlatsın.`
      },
      sunum: {
        raw: 'Yatırımcılar için ürünümüzü anlatan kısa bir sunum hazırla.',
        out: `AMAÇ: 8 slaytlık, düzenlenebilir yatırımcı sunumu taslağı.\n\nSLAYT YAPISI\n1. Tek cümlelik değer önerisi ve hedef pazar\n2. Problem (ölçülebilir kullanıcı sürtünmesi)\n3. Çalışan ürün akışı ve ekran kurgusu\n4. Teknik mimari ve ölçeklenme avantajı\n5. Gelir / dağıtım modeli\n6. Yol haritası (90 günlük teslimatlar)\n\nKISITLAR: Doğrulanmamış pazar payı veya hayali kullanıcı rakamı uydurma; yer tutucu gereken alanları açıkça [VERİ GEREKİR] olarak işaretle.`
      },
      gorsel: {
        raw: 'Sitem için güzel bir teknoloji afişi çiz.',
        out: `AMAÇ: 16:9 yatay editoryal kapak görseli (sıfır metin, sıfır mor neon).\n\nRENK PALETİ\n- Zemin: Sıcak arşiv kâğıdı (#F6F3EC)\n- Ana yapı: Mimari kömür (#161819)\n- Vurgu: Kiremit (#B83B1A) ve çam yeşili (#165C45)\n\nKOMPOZİSYON VE KISITLAR\n- İsviçre editoryal baskı estetiği, ince teknik ızgara ve geometrik modüller.\n- Görsel içinde hiçbir harf, sayı, logo veya bulanık neon ışık kullanma.`
      }
    };

    const show = (key) => {
      const c = CASES[key] || CASES.kod;
      tabs.forEach((t) => t.classList.toggle('is-active', t.dataset.pmTab === key));
      rawEl.textContent = c.raw;
      outEl.textContent = c.out;
      if (copyBtn) copyBtn.dataset.copyText = c.out;
    };
    tabs.forEach((t) => t.addEventListener('click', () => show(t.dataset.pmTab)));
    show('kod');
  }

  /* -----------------------------------------------------------------------
     8. Project Scope & Brief Builder (proje-yaptir.html) & Contact Form
     ----------------------------------------------------------------------- */
  function initProjectBriefBuilder() {
    const form = $('#brief-builder-form');
    if (!form) return;
    const preview = $('#brief-preview');
    const mailBtn = $('#brief-mailto');
    const copyBtn = $('#brief-copy');
    const status = $('#brief-status');

    const buildBrief = () => {
      const type = $('#brief-type')?.value || 'Web Uygulaması';
      const timeline = $('#brief-timeline')?.value || 'Esnek';
      const name = $('#brief-name')?.value.trim() || '[Adınız]';
      const email = $('#brief-email')?.value.trim() || '[E-posta]';
      const notes = $('#brief-notes')?.value.trim() || 'Ayrıntıları görüşmede netleştirebiliriz.';
      const features = $$('input[name="feature"]:checked', form).map((c) => `- ${c.value}`);

      const text = [
        `PROJE TALEBİ — haking.tr`,
        `────────────────────────`,
        `Gönderen: ${name} (${email})`,
        `Proje Türü: ${type}`,
        `Hedef Zaman Çizelgesi: ${timeline}`,
        `Öncelikli Kapsam:`,
        features.length ? features.join('\n') : '- Keşif görüşmesinde belirlenecek',
        ``,
        `Proje Özeti & Hedefler:`,
        notes
      ].join('\n');

      if (preview) preview.textContent = text;
      if (copyBtn) copyBtn.dataset.copyText = text;
      if (mailBtn) {
        const subj = encodeURIComponent(`Proje Talebi: ${type} — ${name}`);
        const body = encodeURIComponent(text);
        mailBtn.href = `mailto:merhaba@haking.tr?subject=${subj}&body=${body}`;
      }
      return text;
    };

    form.addEventListener('input', buildBrief);
    form.addEventListener('change', buildBrief);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      buildBrief();
      if (status) status.textContent = 'Proje özeti hazırlandı. E-posta uygulamanızla gönderebilir veya metni kopyalayabilirsiniz.';
      if (mailBtn) window.location.href = mailBtn.href;
    });
    buildBrief();
  }

  function initContactForm() {
    const form = $('#contact-form');
    if (!form) return;
    const status = $('#form-status');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const fd = new FormData(form);
      const topic = fd.get('topic') || 'Genel';
      const subject = encodeURIComponent(`[HaKING · ${topic}] ${fd.get('subject')}`);
      const body = encodeURIComponent(
        `Ad Soyad: ${fd.get('name')}\nE-posta: ${fd.get('email')}\nKategori: ${topic}\n\n${fd.get('message')}`
      );
      if (status) status.textContent = 'E-posta taslağı hazırlanıyor. Gönderimi kendi e-posta uygulamanızda onaylayın.';
      window.location.href = `mailto:merhaba@haking.tr?subject=${subject}&body=${body}`;
    });
  }

  /* -----------------------------------------------------------------------
     9. Interactive Weighted Grade Mini-Simulator (rehber-not-hesaplama.html)
     ----------------------------------------------------------------------- */
  function initGradeSimulator() {
    const box = $('[data-grade-sim]');
    if (!box) return;
    const vizeEl = $('#sim-vize', box);
    const vizeWEl = $('#sim-vize-w', box);
    const odevEl = $('#sim-odev', box);
    const odevWEl = $('#sim-odev-w', box);
    const hedefEl = $('#sim-hedef', box);
    const outEl = $('#sim-result', box);

    const calc = () => {
      const v = Math.min(100, Math.max(0, Number(vizeEl.value) || 0));
      const vw = Math.min(100, Math.max(0, Number(vizeWEl.value) || 0));
      const o = Math.min(100, Math.max(0, Number(odevEl.value) || 0));
      const ow = Math.min(100, Math.max(0, Number(odevWEl.value) || 0));
      const target = Math.min(100, Math.max(0, Number(hedefEl.value) || 60));
      const finalW = 100 - vw - ow;

      if (finalW <= 0) {
        outEl.innerHTML = '<strong style="color:var(--accent);">Hata:</strong> Vize ve ödev ağırlıkları toplamı 100\'den küçük olmalıdır (final ağırlığı pozitif kalmalı).';
        return;
      }
      const current = (v * vw + o * ow) / 100;
      const needed = (target - current) / (finalW / 100);
      if (needed <= 0) {
        outEl.innerHTML = `Mevcut katkı: <strong>${current.toFixed(1)}</strong> puan. Final ağırlığı <strong>%${finalW}</strong>; hedef (${target}) puanı şimdiden karşılandı (final barajı varsa kurum şartını kontrol edin).`;
      } else if (needed > 100) {
        outEl.innerHTML = `Mevcut katkı: <strong>${current.toFixed(1)}</strong> puan. Final ağırlığı <strong>%${finalW}</strong> iken <strong>${target}</strong> ortalamasına ulaşmak için gereken final notu <strong>${needed.toFixed(1)}</strong> (100 üstü — bu ağırlıklarla matematiksel olarak mümkün değil).`;
      } else {
        outEl.innerHTML = `Mevcut katkı: <strong>${current.toFixed(1)}</strong> puan · Final ağırlığı: <strong>%${finalW}</strong> · <strong>${target}</strong> ortalama için gereken minimum final notu: <strong style="color:var(--forest);font-size:1.15em;">${Math.ceil(needed)}</strong> (kesin değer: ${needed.toFixed(2)}).`;
      }
    };

    [vizeEl, vizeWEl, odevEl, odevWEl, hedefEl].forEach((el) => el?.addEventListener('input', calc));
    calc();
  }

  /* -----------------------------------------------------------------------
     10. Optional Live GitHub Refresh (github.html)
     ----------------------------------------------------------------------- */
  function initGitHubRefresh() {
    const btn = $('#gh-live-refresh');
    if (!btn) return;
    const status = $('#gh-live-status');
    btn.addEventListener('click', async () => {
      btn.disabled = true;
      if (status) status.textContent = 'GitHub API üzerinden güncel depo verileri çekiliyor…';
      try {
        const res = await fetch('https://api.github.com/users/HaKING06/repos?per_page=100&sort=updated');
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const repos = await res.json();
        const byName = new Map(repos.map((r) => [r.name.toLowerCase(), r]));
        let updatedCount = 0;
        $$('[data-gh-repo]').forEach((row) => {
          const r = byName.get(row.dataset.ghRepo.toLowerCase());
          if (!r) return;
          updatedCount += 1;
          const upd = $('[data-gh-updated]', row);
          const stars = $('[data-gh-stars]', row);
          if (upd) upd.textContent = r.updated_at.slice(0, 10);
          if (stars) stars.textContent = String(r.stargazers_count);
        });
        if (status) status.textContent = `${updatedCount} açık kaynak depo GitHub API ile canlı doğrulandı.`;
      } catch {
        if (status) status.textContent = 'GitHub API oran sınırına ulaşıldı; sayfadaki gömülü güncel veriler gösterilmeye devam ediyor.';
      } finally {
        btn.disabled = false;
      }
    });
  }

  /* -----------------------------------------------------------------------
     11. Non-Intrusive Cookie / Storage Notice
     ----------------------------------------------------------------------- */
  function initCookieBanner() {
    const bar = $('#cookie-bar');
    if (!bar) return;
    if (!localStorage.getItem(STORAGE_COOKIE)) {
      bar.hidden = false;
    }
    $$('[data-cookie-choice]', bar).forEach((btn) => {
      btn.addEventListener('click', () => {
        localStorage.setItem(STORAGE_COOKIE, btn.dataset.cookieChoice);
        bar.hidden = true;
      });
    });
    $$('[data-open-cookie-settings]').forEach((btn) => {
      btn.addEventListener('click', () => { bar.hidden = false; });
    });
  }

  /* -----------------------------------------------------------------------
     12. Hero Interactive Live Ecosystem Showcase Stage
     ----------------------------------------------------------------------- */
  function initHeroStage() {
    const stage = $('[data-hero-stage]');
    if (!stage) return;
    const tabs = $$('[data-stage-tab]', stage);
    const imgEl = $('[data-stage-img]', stage);
    const urlEl = $('[data-stage-url]', stage);
    const statusEl = $('[data-stage-status]', stage);
    const catEl = $('[data-stage-cat]', stage);
    const verEl = $('[data-stage-ver]', stage);
    const titleEl = $('[data-stage-title]', stage);
    const descEl = $('[data-stage-desc]', stage);
    const liveBtn = $('[data-stage-live]', stage);
    const detailBtn = $('[data-stage-detail]', stage);

    const selectTab = (btn) => {
      tabs.forEach((t) => t.classList.toggle('is-active', t === btn));
      if (imgEl && btn.dataset.img) {
        imgEl.classList.add('is-swapping');
        setTimeout(() => {
          imgEl.src = btn.dataset.img;
          imgEl.alt = btn.dataset.title || 'HaKING proje önizlemesi';
          imgEl.classList.remove('is-swapping');
        }, 90);
      }
      if (urlEl) urlEl.textContent = btn.dataset.url || '';
      if (statusEl) statusEl.textContent = btn.dataset.status || '';
      if (catEl) catEl.textContent = btn.dataset.cat || '';
      if (verEl) verEl.textContent = btn.dataset.ver || '';
      if (titleEl) titleEl.textContent = btn.dataset.title || '';
      if (descEl) descEl.textContent = btn.dataset.desc || '';
      if (liveBtn) {
        liveBtn.href = btn.dataset.live || 'projects.html';
        liveBtn.textContent = btn.dataset.liveLabel || 'Canlı Siteye Git ↗';
        if (btn.dataset.ext === 'true') {
          liveBtn.target = '_blank';
          liveBtn.rel = 'noopener noreferrer';
        } else {
          liveBtn.removeAttribute('target');
          liveBtn.removeAttribute('rel');
        }
      }
      if (detailBtn) {
        detailBtn.href = btn.dataset.detail || 'projects.html';
        detailBtn.textContent = btn.dataset.detailLabel || 'İncele';
      }
    };

    tabs.forEach((btn) => btn.addEventListener('click', () => selectTab(btn)));
  }

  /* -----------------------------------------------------------------------
     13. Live Valve Cent Steam Commission & Net Profit Calculator
     ----------------------------------------------------------------------- */
  function initValveCalc() {
    const box = $('[data-valve-sim]');
    if (!box) return;
    const buyEl = $('#vc-buy', box);
    const sellEl = $('#vc-sell', box);
    const qtyEl = $('#vc-qty', box);
    const outEl = $('#vc-result', box);

    // Exact inverse of Valve's integer-cent fee schedule (5% Steam + 10% CS2, min $0.01 each)
    const netFromBuyerCents = (buyerCents) => {
      let lo = 1;
      let hi = Math.max(1, buyerCents - 2);
      let best = 1;
      while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        const sf = Math.max(1, Math.floor(mid * 0.05));
        const gf = Math.max(1, Math.floor(mid * 0.10));
        const total = mid + sf + gf;
        if (total <= buyerCents) {
          best = mid;
          lo = mid + 1;
        } else {
          hi = mid - 1;
        }
      }
      const steamFee = Math.max(1, Math.floor(best * 0.05));
      const gameFee = Math.max(1, Math.floor(best * 0.10));
      return { net: best, steamFee, gameFee, feeTotal: buyerCents - best };
    };

    const calc = () => {
      const buy = Math.max(0.01, Number(buyEl.value) || 0);
      const sell = Math.max(0.03, Number(sellEl.value) || 0);
      const qty = Math.max(1, Math.min(500, Math.round(Number(qtyEl.value) || 1)));
      const buyerCents = Math.round(sell * 100);
      const res = netFromBuyerCents(buyerCents);
      const netPerUnit = res.net / 100;
      const feePerUnit = res.feeTotal / 100;
      const effFeePct = (feePerUnit / sell) * 100;
      const totalCost = buy * qty;
      const totalNet = netPerUnit * qty;
      const profit = totalNet - totalCost;
      const roi = totalCost > 0 ? (profit / totalCost) * 100 : 0;
      const color = profit >= 0 ? 'var(--forest)' : 'var(--accent)';

      outEl.innerHTML = `Adet başı Valve kesintisi: <strong>$${feePerUnit.toFixed(2)}</strong> (%${effFeePct.toFixed(2)}) · Steam cüzdanına geçen net: <strong>$${netPerUnit.toFixed(2)}</strong> (${qty} adet toplam <strong>$${totalNet.toFixed(2)}</strong>)<br>Net sonuç: <strong style="color:${color};font-size:1.12em;">${profit >= 0 ? '+' : ''}$${profit.toFixed(2)} (${roi >= 0 ? '+' : ''}%${roi.toFixed(2)})</strong> · Çarpan: <strong>${(totalNet / totalCost).toFixed(4)}x</strong>`;

      const beEl = $('#vc-breakeven', box);
      if (beEl) {
        const targetNetCents = Math.round(buy * 100);
        const sf = Math.max(1, Math.floor(targetNetCents * 0.05));
        const gf = Math.max(1, Math.floor(targetNetCents * 0.10));
        const breakEvenBuyer = (targetNetCents + sf + gf) / 100;
        beEl.innerHTML = `Başa baş (0% zarar) minimum Steam alıcı satış fiyatı: <strong>$${breakEvenBuyer.toFixed(2)}</strong> (bu fiyatın üstü net kâra geçer).`;
      }
    };

    [buyEl, sellEl, qtyEl].forEach((el) => el?.addEventListener('input', calc));
    calc();
  }

  /* -----------------------------------------------------------------------
     14. Reading Comfort Font Scale (A- / 100% / A+), Back-to-Top & Mobile Sticky Bar
     ----------------------------------------------------------------------- */
  function initReadingScaleAndScrollUI() {
    const KEY = 'haking_font_scale';
    const setScale = (val) => {
      const clamped = Math.min(1.24, Math.max(0.88, Math.round(val * 100) / 100));
      document.documentElement.style.setProperty('--prose-scale', String(clamped));
      localStorage.setItem(KEY, String(clamped));
    };
    const getScale = () => Number(localStorage.getItem(KEY)) || 1;
    $$('[data-font-inc]').forEach((b) => b.addEventListener('click', () => setScale(getScale() + 0.08)));
    $$('[data-font-dec]').forEach((b) => b.addEventListener('click', () => setScale(getScale() - 0.08)));
    $$('[data-font-reset]').forEach((b) => b.addEventListener('click', () => setScale(1)));

    const btt = $('#back-to-top');
    const mobileBar = $('#mobile-sticky-bar');
    if (btt) {
      btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
    const onScroll = () => {
      const y = window.scrollY;
      const showMobileBar = Boolean(mobileBar) && y >= 340;
      if (mobileBar) mobileBar.hidden = !showMobileBar;
      const hideBttForMobileBar = showMobileBar && window.innerWidth <= 880;
      if (btt) btt.hidden = y < 520 || hideBttForMobileBar;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

    // Subtle scroll reveal
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const els = $$('[data-reveal]');
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add('is-revealed');
              en.target.classList.remove('will-reveal');
              obs.unobserve(en.target);
            }
          });
        },
        { rootMargin: '0px 0px -40px 0px', threshold: 0.05 }
      );
      els.forEach((el) => {
        if (el.getBoundingClientRect().top > window.innerHeight * 0.95) {
          el.classList.add('will-reveal');
          obs.observe(el);
        }
      });
    }
  }

  /* -----------------------------------------------------------------------
     15. Online Tools Studio Engines (araclar.html) + Status Ping (durum.html) + Project Finder
     ----------------------------------------------------------------------- */
  function initPromptBuilder() {
    const root = $('[data-prompt-builder]');
    if (!root) return;
    const agentEl = $('#pb-agent', root);
    const typeEl = $('#pb-type', root);
    const goalEl = $('#pb-goal', root);
    const outEl = $('#pb-output', root);
    const copyBtn = $('#pb-copy-btn', root);

    const build = () => {
      const agent = agentEl?.value || 'AI Agent';
      const type = typeEl?.value || 'Özellik';
      const goal = (goalEl?.value || '').trim() || 'Görev tanımı girilmedi.';
      const rules = $$('input[name="pb-rule"]:checked', root).map((c) => `- ${c.value}`);
      const text = [
        `HEDEF AGENT: ${agent}`,
        `GÖREV TÜRÜ: ${type}`,
        ``,
        `1. AMAÇ`,
        goal,
        ``,
        `2. ZORUNLU KORUMA VE SINIRLAR`,
        ...(rules.length ? rules : ['- Mevcut çalışan kodu bozmadan ilerle.']),
        ``,
        `3. ÇIKTI VE KABUL ÖLÇÜTÜ`,
        `- Çözümü parça parça değil, uçtan uca doğrulanmış biçimde tamamla.`,
        `- Bilinmeyen veya doğrulanmamış varsayımları uydurma; net belirt.`
      ].join('\n');
      if (outEl) outEl.textContent = text;
      if (copyBtn) copyBtn.dataset.copyText = text;
    };

    root.addEventListener('input', build);
    root.addEventListener('change', build);
    build();
  }

  function initColorStudio() {
    const root = $('[data-color-studio]');
    if (!root) return;
    const fgPick = $('#cs-fg-pick', root);
    const fgHex = $('#cs-fg-hex', root);
    const bgPick = $('#cs-bg-pick', root);
    const bgHex = $('#cs-bg-hex', root);
    const preview = $('#cs-preview', root);
    const ratioEl = $('#cs-ratio', root);
    const badgesEl = $('#cs-badges', root);
    const copyBtn = $('#cs-copy-css', root);

    const normalizeHex = (v) => {
      const m = String(v || '').trim().match(/^#?([0-9a-f]{6})$/i);
      return m ? `#${m[1].toUpperCase()}` : null;
    };
    const hexToRgb = (hex) => [
      parseInt(hex.slice(1, 3), 16),
      parseInt(hex.slice(3, 5), 16),
      parseInt(hex.slice(5, 7), 16)
    ];
    const srgbToLin = (c) => {
      const v = c / 255;
      return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    const relLum = ([r, g, b]) => 0.2126 * srgbToLin(r) + 0.7152 * srgbToLin(g) + 0.0722 * srgbToLin(b);
    const rgbToHsl = ([r, g, b]) => {
      const rn = r / 255, gn = g / 255, bn = b / 255;
      const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
      const l = (max + min) / 2;
      let h = 0, s = 0;
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) * 60;
        else if (max === gn) h = ((bn - rn) / d + 2) * 60;
        else h = ((rn - gn) / d + 4) * 60;
      }
      return `hsl(${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%)`;
    };
    // Exact Björn Ottosson sRGB -> OKLab -> OKLCH conversion
    const rgbToOklch = ([r, g, b]) => {
      const lr = srgbToLin(r), lg = srgbToLin(g), lb = srgbToLin(b);
      const l_ = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
      const m_ = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
      const s_ = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
      const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
      const A = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
      const B = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;
      const C = Math.hypot(A, B);
      let H = (Math.atan2(B, A) * 180) / Math.PI;
      if (H < 0) H += 360;
      return `oklch(${(L * 100).toFixed(1)}% ${C.toFixed(3)} ${C < 0.002 ? 0 : Math.round(H)})`;
    };

    const render = (fg, bg) => {
      const fRgb = hexToRgb(fg), bRgb = hexToRgb(bg);
      const l1 = relLum(fRgb), l2 = relLum(bRgb);
      const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

      if (preview) {
        preview.style.color = fg;
        preview.style.backgroundColor = bg;
      }
      if (ratioEl) ratioEl.textContent = `${ratio.toFixed(2)} : 1`;
      if (badgesEl) {
        const badge = (lbl, ok) => `<span class="tag ${ok ? 'tag-forest' : 'tag-accent'}">${lbl}: ${ok ? 'GEÇTİ ✓' : 'KALDI ✕'}</span>`;
        badgesEl.innerHTML = badge('AA Normal (4.5)', ratio >= 4.5) + badge('AAA (7.0)', ratio >= 7) + badge('AA Büyük (3.0)', ratio >= 3);
      }
      const fOklch = rgbToOklch(fRgb), bOklch = rgbToOklch(bRgb);
      const set = (id, v) => { const el = $(id, root); if (el) el.textContent = v; };
      set('#cs-fg-rgb', `rgb(${fRgb.join(', ')})`);
      set('#cs-bg-rgb', `rgb(${bRgb.join(', ')})`);
      set('#cs-fg-hsl', rgbToHsl(fRgb));
      set('#cs-bg-hsl', rgbToHsl(bRgb));
      set('#cs-fg-oklch', fOklch);
      set('#cs-bg-oklch', bOklch);
      if (copyBtn) {
        copyBtn.dataset.copyText = `:root {\n  --ink: ${fg}; /* ${fOklch} */\n  --surface: ${bg}; /* ${bOklch} */\n  /* WCAG 2.1 Contrast: ${ratio.toFixed(2)}:1 */\n}`;
      }
    };

    const syncFromPickers = () => {
      const fg = fgPick.value.toUpperCase();
      const bg = bgPick.value.toUpperCase();
      fgHex.value = fg;
      bgHex.value = bg;
      render(fg, bg);
    };
    const syncFromHex = () => {
      const fg = normalizeHex(fgHex.value);
      const bg = normalizeHex(bgHex.value);
      if (fg) fgPick.value = fg;
      if (bg) bgPick.value = bg;
      if (fg && bg) render(fg, bg);
    };

    fgPick?.addEventListener('input', syncFromPickers);
    bgPick?.addEventListener('input', syncFromPickers);
    fgHex?.addEventListener('input', syncFromHex);
    bgHex?.addEventListener('input', syncFromHex);
    $$('[data-cs-preset]', root).forEach((b) => {
      b.addEventListener('click', () => {
        const [fg, bg] = b.dataset.csPreset.split('|');
        fgPick.value = fg; bgPick.value = bg;
        syncFromPickers();
      });
    });
    $('#cs-swap', root)?.addEventListener('click', () => {
      const tmp = fgPick.value;
      fgPick.value = bgPick.value;
      bgPick.value = tmp;
      syncFromPickers();
    });
    syncFromPickers();
  }

  function initSerpTool() {
    const root = $('[data-serp-tool]');
    if (!root) return;
    const tIn = $('#serp-title', root);
    const uIn = $('#serp-url', root);
    const dIn = $('#serp-desc', root);
    const bIn = $('#serp-body', root);
    const tStat = $('#serp-title-stat', root);
    const dStat = $('#serp-desc-stat', root);
    const tOut = $('#serp-out-title', root);
    const uOut = $('#serp-out-url', root);
    const dOut = $('#serp-out-desc', root);
    const metOut = $('#serp-metrics', root);

    const update = () => {
      const title = tIn.value.trim();
      const desc = dIn.value.trim();
      const url = uIn.value.trim() || 'https://haking.tr/';
      const words = (bIn.value.trim().match(/\S+/g) || []).length;
      const readMin = Math.max(1, Math.ceil(words / 210));
      const tOk = title.length >= 30 && title.length <= 60;
      const dOk = desc.length >= 110 && desc.length <= 160;

      if (tStat) {
        tStat.textContent = `${title.length} / 60 ${tOk ? '✓' : title.length > 60 ? '(kesilebilir)' : '(kısa)'}`;
        tStat.style.color = tOk ? 'var(--forest)' : 'var(--accent)';
      }
      if (dStat) {
        dStat.textContent = `${desc.length} / 155 ${dOk ? '✓' : desc.length > 160 ? '(kesilebilir)' : '(kısa)'}`;
        dStat.style.color = dOk ? 'var(--forest)' : 'var(--accent)';
      }
      if (tOut) tOut.textContent = title.length > 62 ? `${title.slice(0, 60)}…` : title || 'Sayfa Başlığı';
      if (uOut) uOut.textContent = url;
      if (dOut) dOut.textContent = desc.length > 160 ? `${desc.slice(0, 158)}…` : desc || 'Meta açıklama önizlemesi...';
      if (metOut) {
        metOut.innerHTML = `<span class="callout-title">İçerik &amp; SEO Özeti</span><p style="margin:0;font-size:0.9rem;">Kelime sayısı: <strong>${words}</strong> · Karakter: <strong>${bIn.value.length}</strong> · Tahmini okuma süresi: <strong>${readMin} dk</strong> · Başlık durumu: <strong>${tOk ? 'İdeal' : 'İyileştirilebilir'}</strong> · Meta açıklama: <strong>${dOk ? 'İdeal' : 'İyileştirilebilir'}</strong>.</p>`;
      }
    };
    [tIn, uIn, dIn, bIn].forEach((el) => el?.addEventListener('input', update));
    update();
  }

  function initStatusPing() {
    const btn = $('#status-ping-all');
    if (!btn) return;
    const summary = $('#status-ping-summary');
    const rows = $$('[data-ping-row]');

    btn.addEventListener('click', async () => {
      btn.disabled = true;
      let okCount = 0;
      if (summary) summary.textContent = `${rows.length} servis tarayıcınızdan paralel olarak test ediliyor…`;

      await Promise.all(
        rows.map(async (row) => {
          const url = row.dataset.pingUrl;
          const cell = $('[data-ping-cell]', row);
          if (cell) {
            cell.textContent = 'Ölçülüyor…';
            cell.style.color = 'var(--ochre)';
          }
          const t0 = performance.now();
          const ctrl = new AbortController();
          const timer = setTimeout(() => ctrl.abort(), 7000);
          try {
            await fetch(url, { mode: 'no-cors', cache: 'no-store', signal: ctrl.signal });
            const ms = Math.max(1, Math.round(performance.now() - t0));
            okCount += 1;
            if (cell) {
              cell.textContent = `● Erişilebilir · ${ms} ms`;
              cell.style.color = 'var(--forest)';
            }
          } catch {
            if (cell) {
              cell.textContent = '✕ Zaman aşımı / Engel';
              cell.style.color = 'var(--accent)';
            }
          } finally {
            clearTimeout(timer);
          }
        })
      );

      if (summary) {
        summary.textContent = `Test tamamlandı: ${okCount}/${rows.length} servis tarayıcınızdan erişilebilir yanıt verdi.`;
      }
      btn.disabled = false;
    });
  }

  function initProjectFinder() {
    const root = $('[data-project-finder]');
    if (!root) return;
    const pills = $$('[data-finder]', root);
    const out = $('[data-finder-out]', root);

    const RECS = {
      ai: [
        { name: 'HaKING AI (v1.19.2)', desc: 'Türkçe çoklu model AI asistanı, SSE akışı ve 7 görev türlü yeni Prompt Modu.', live: 'https://ai.haking.tr/', page: 'proje-haking-ai.html' },
        { name: 'HaKING AI Prompt Modu', desc: 'Ham fikri görev kartı ve bağımsız çelişki denetimiyle agent promptuna çevirir.', live: 'https://ai.haking.tr/?mode=prompt', page: 'haking-ai-prompt-modu.html' },
        { name: 'HaKING AI Desktop', desc: 'Python/FastAPI tabanlı yerelde çalışan BM25 + TF-IDF hibrit akıllı arama uygulaması.', live: 'https://github.com/HaKING06/haking-ai-desktop', page: 'proje-ai-desktop.html', liveLabel: 'GitHub ↗' }
      ],
      cs2: [
        { name: 'SPREAD V11.1', desc: '6.000+ skin, 354+ Doppler fazı ve Monte Carlo CVaR ile çift yönlü CS2 arbitraj terminali.', live: 'https://spread.haking.tr/', page: 'proje-spread.html' },
        { name: 'CS2 Studio', desc: '670+ pro crosshair önizleyici, 3D sticker simülatörü ve bind/config stüdyosu.', live: 'https://cs2studio.haking.tr/', page: 'proje-cs2studio.html' },
        { name: 'CSELL & TradeCalc', desc: 'Steam kuruş hassasiyetli net satış geliri ve çoklu eşya takas karşılaştırma araçları.', live: 'https://csell.haking.tr/', page: 'proje-csell.html' }
      ],
      oyun: [
        { name: 'COSMIC v12.0', desc: 'Sıfır kurulumla tarayıcıda anında oynanan 60 özgün uzay temalı arcade oyun portalı.', live: 'https://cosmic.haking.tr/', page: 'proje-cosmic.html' },
        { name: 'Haking Chat v2.0.2', desc: 'Socket.IO gerçek zamanlı sohbet, sesli oda ve sunucu doğrulamalı 3D Okey/Tavla/Satranç.', live: 'https://chat.haking.tr/', page: 'proje-haking-chat.html' },
        { name: 'UTRZONE & 3D Vault', desc: 'Türkçe oyun yamaları topluluk platformu ve 20 dilli 3D Steam Müzesi + HP Victus 16 sahnesi.', live: 'https://utrzone.haking.tr/', page: 'proje-utrzone.html' }
      ],
      arac: [
        { name: 'CopyHex v2.0', desc: 'OKLCH renk tokenları, 60+ hazır palet, kontrast denetimi ve Tailwind/CSS dışa aktarımı.', live: 'https://copyhex.haking.tr/', page: 'proje-copyhex.html' },
        { name: 'NotMatik v3.0', desc: 'Üniversite öğrencileri için çevrimdışı PWA ağırlıklı ortalama ve hedef final hesaplayıcı.', live: 'https://notmatik.haking.tr/', page: 'proje-notmatik.html' },
        { name: 'QR Scanner & ÇevirmenX', desc: 'Chrome, Edge ve Firefox için minimum izinli cihaz içi QR okuyucu ve çeviri eklentileri.', live: 'https://qr.haking.tr/', page: 'proje-qr-scanner.html' }
      ]
    };

    const show = (key) => {
      pills.forEach((p) => p.classList.toggle('is-active', p.dataset.finder === key));
      const items = RECS[key] || RECS.ai;
      out.innerHTML = items.map((it) => `
        <div class="finder-card">
          <strong>${it.name}</strong>
          <p>${it.desc}</p>
          <div class="finder-card-foot">
            <a class="btn btn-accent btn-sm" href="${it.live}" target="_blank" rel="noopener noreferrer">${it.liveLabel || 'Canlı Siteye Git ↗'}</a>
            <a class="text-link" href="${it.page}" style="font-size:0.82rem;">İncele →</a>
          </div>
        </div>
      `).join('');
    };

    pills.forEach((p) => p.addEventListener('click', () => show(p.dataset.finder)));
    show('ai');
  }

  /* Boot */
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNav();
    initSearchModal();
    initBookmarks();
    initReadingUX();
    initHeroStage();
    initValveCalc();
    initPromptBuilder();
    initColorStudio();
    initSerpTool();
    initStatusPing();
    initProjectFinder();
    initReadingScaleAndScrollUI();
    initFilterableGrid({
      cardSelector: '[data-project-card]',
      pillSelector: '[data-project-filter]',
      searchSelector: '#project-search',
      countSelector: '#project-count',
      emptySelector: '#project-empty',
      unit: 'proje'
    });
    initFilterableGrid({
      cardSelector: '[data-reading-card]',
      pillSelector: '[data-reading-filter]',
      searchSelector: '#reading-search',
      countSelector: '#reading-count',
      emptySelector: '#reading-empty',
      unit: 'yazı'
    });
    initPromptComparator();
    initProjectBriefBuilder();
    initContactForm();
    initGradeSimulator();
    initGitHubRefresh();
    initCookieBanner();
    $$('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });
  });
})();
