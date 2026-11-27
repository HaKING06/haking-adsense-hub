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
      btn.setAttribute('aria-pressed', String(saved));
      btn.textContent = saved ? '★ Okuma listesinde' : '☆ Okuma listesine ekle';
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

  /* Boot */
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNav();
    initSearchModal();
    initBookmarks();
    initReadingUX();
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
