(() => {
  const SITE = window.SITE || {};
  const PROJECTS = window.PROJECTS || [];
  const page = document.body.dataset.page;

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  /* ---------- video + stills helpers ---------- */

  function stillsFor(p) {
    if (p.stills && p.stills.length) return p.stills;
    if (p.video && p.video.platform === "youtube") {
      const id = encodeURIComponent(p.video.id);
      return [
        `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
        `https://i.ytimg.com/vi/${id}/hq1.jpg`,
        `https://i.ytimg.com/vi/${id}/hq2.jpg`,
      ];
    }
    return [];
  }

  // YouTube returns a 120px grey image (not an error) when maxres doesn't exist — fall back to hq.
  function img(src, alt = "") {
    const el = new Image();
    el.alt = alt;
    el.decoding = "async";
    el.src = src;
    el.addEventListener("load", () => {
      if (el.naturalWidth <= 120 && src.includes("maxresdefault")) el.src = src.replace("maxresdefault", "hqdefault");
    });
    return el;
  }

  function embedUrl(v) {
    if (!v) return "";
    if (v.platform === "youtube") {
      return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(v.id)}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
    }
    if (v.platform === "vimeo") {
      const q = new URLSearchParams({ autoplay: 1, dnt: 1, title: 0, byline: 0, portrait: 0 });
      if (v.hash) q.set("h", v.hash);
      return `https://player.vimeo.com/video/${encodeURIComponent(v.id)}?${q}`;
    }
    return "";
  }

  /* ---------- lightbox player (shared by every page) ---------- */

  const player = (() => {
    const el = document.createElement("div");
    el.className = "player";
    el.hidden = true;
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.innerHTML = `
      <button class="player__close" type="button">Close</button>
      <div class="player__inner">
        <div class="player__frame"></div>
        <div class="player__meta">
          <div><span class="player__title"></span> <span class="player__client"></span></div>
          <div class="player__credits"></div>
          <div class="player__nav">
            <button type="button" data-step="-1">Prev</button>
            <button type="button" data-step="1">Next</button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(el);

    const frame = el.querySelector(".player__frame");
    let list = [];
    let index = -1;
    let lastFocus = null;

    function show(i) {
      index = (i + list.length) % list.length;
      const p = list[index];
      frame.innerHTML = `<iframe src="${esc(embedUrl(p.video))}" title="${esc(p.title)}"
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen></iframe>`;
      el.querySelector(".player__title").textContent = p.title;
      el.querySelector(".player__client").textContent = [p.client, p.year].filter(Boolean).join(", ");
      el.querySelector(".player__credits").textContent = p.credits || "";
      el.querySelector(".player__nav").hidden = list.length < 2;
      el.setAttribute("aria-label", p.title);
      history.replaceState(null, "", "#" + p.slug);
    }

    function open(p, l) {
      list = l && l.length ? l : [p];
      lastFocus = document.activeElement;
      el.hidden = false;
      document.documentElement.classList.add("no-scroll");
      show(list.indexOf(p));
      el.querySelector(".player__close").focus();
    }

    function close() {
      el.hidden = true;
      frame.innerHTML = "";
      document.documentElement.classList.remove("no-scroll");
      history.replaceState(null, "", location.pathname + location.search);
      if (lastFocus) lastFocus.focus();
    }

    el.querySelector(".player__close").addEventListener("click", close);
    el.addEventListener("click", (e) => {
      if (e.target === el) close();
      const step = e.target.closest("[data-step]");
      if (step) show(index + Number(step.dataset.step));
    });
    document.addEventListener("keydown", (e) => {
      if (el.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") show(index + 1);
      if (e.key === "ArrowLeft") show(index - 1);
    });

    return { open, isOpen: () => !el.hidden };
  })();

  function openFromHash(list) {
    const slug = decodeURIComponent(location.hash.slice(1));
    const p = slug && list.find((x) => x.slug === slug);
    if (p) player.open(p, list);
  }

  /* ---------- homepage ---------- */

  function initHome() {
    // Director first: featured directing work leads the slideshow; order is otherwise as listed.
    const isDirecting = (p) => (p.roles || []).includes("directing");
    const featured = PROJECTS.filter((p) => p.featured).sort((a, b) => isDirecting(b) - isDirecting(a));
    const slidesEl = document.querySelector(".hero__slides");
    const labelEl = document.querySelector(".hero__label");
    const countEl = document.querySelector(".hero__count");
    const wordmarkEl = document.querySelector(".wordmark");

    if (SITE.wordmark) {
      wordmarkEl.innerHTML = "";
      wordmarkEl.appendChild(img(SITE.wordmark, SITE.name || ""));
      wordmarkEl.classList.add("wordmark--image");
    }

    if (!featured.length) return;

    const slides = featured.map((p) => {
      const s = document.createElement("div");
      s.className = "slide";
      if (p.loop) {
        const v = document.createElement("video");
        v.src = p.loop;
        v.muted = true;
        v.loop = true;
        v.playsInline = true;
        v.preload = "none";
        const poster = stillsFor(p)[0];
        if (poster) v.poster = poster;
        s.appendChild(v);
      } else {
        const src = stillsFor(p)[0];
        if (src) s.appendChild(img(src, ""));
      }
      slidesEl.appendChild(s);
      return s;
    });

    let current = -1;
    let timer;
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

    function go(i) {
      const next = (i + slides.length) % slides.length;
      if (current >= 0) {
        slides[current].classList.remove("is-active");
        const v = slides[current].querySelector("video");
        if (v) v.pause();
      }
      current = next;
      const s = slides[current];
      s.classList.add("is-active");
      const v = s.querySelector("video");
      if (v) {
        v.preload = "auto";
        v.play().catch(() => {});
      }
      const p = featured[current];
      labelEl.innerHTML = `<button type="button" class="hero__watch">
          <span>${esc(p.title)}</span><span>${esc(p.client || "")}</span><span class="hero__play">Play film</span>
        </button>`;
      countEl.textContent = `${current + 1}/${slides.length}`;
      clearInterval(timer);
      if (!reduceMotion && slides.length > 1) timer = setInterval(() => go(current + 1), (SITE.slideSeconds || 7) * 1000);
    }

    labelEl.addEventListener("click", (e) => {
      if (e.target.closest(".hero__watch")) player.open(featured[current], featured);
    });
    document.querySelector(".hero__next").addEventListener("click", () => go(current + 1));
    document.querySelector(".hero__prev").addEventListener("click", () => go(current - 1));
    document.addEventListener("keydown", (e) => {
      if (player.isOpen()) return;
      if (e.key === "ArrowRight") go(current + 1);
      if (e.key === "ArrowLeft") go(current - 1);
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) clearInterval(timer);
      else go(current);
    });

    go(0);
    openFromHash(featured);
  }

  /* ---------- directing / editing list pages ---------- */

  function initList(role) {
    const list = PROJECTS.filter((p) => (p.roles || []).includes(role));
    const ul = document.querySelector(".projects");
    const stillsEl = document.querySelector(".stills");

    if (!list.length) {
      ul.innerHTML = `<li class="projects__empty">Coming soon.</li>`;
      return;
    }

    ul.innerHTML = list
      .map(
        (p, i) => `<li>
          <button type="button" class="project" data-i="${i}">
            <span class="project__title">${esc(p.title)}</span>
            <span class="project__meta">${esc(p.location || "")}<br>${esc(p.year || "")}</span>
          </button>
        </li>`
      )
      .join("");

    const cache = new Map();
    function stillsNode(p) {
      if (!cache.has(p.slug)) {
        const wrap = document.createElement("div");
        wrap.className = "stills__set";
        stillsFor(p).slice(0, 3).forEach((src) => wrap.appendChild(img(src, "")));
        cache.set(p.slug, wrap);
      }
      return cache.get(p.slug);
    }

    let active = null;
    function activate(btn) {
      if (active === btn) return;
      if (active) active.classList.remove("is-active");
      active = btn;
      ul.classList.toggle("is-hovering", !!btn);
      stillsEl.querySelectorAll(".stills__set").forEach((n) => n.classList.remove("is-visible"));
      if (!btn) return;
      btn.classList.add("is-active");
      const node = stillsNode(list[btn.dataset.i]);
      if (!node.isConnected) stillsEl.appendChild(node);
      requestAnimationFrame(() => node.classList.add("is-visible"));
    }

    ul.addEventListener("pointerover", (e) => {
      if (e.pointerType === "mouse") activate(e.target.closest(".project"));
    });
    ul.addEventListener("pointerleave", () => activate(null));
    ul.addEventListener("focusin", (e) => activate(e.target.closest(".project")));
    ul.addEventListener("focusout", (e) => {
      if (!ul.contains(e.relatedTarget)) activate(null);
    });
    ul.addEventListener("click", (e) => {
      const btn = e.target.closest(".project");
      if (btn) player.open(list[btn.dataset.i], list);
    });

    openFromHash(list);
  }

  if (page === "home") initHome();
  if (page === "directing" || page === "editing") initList(page);
})();
