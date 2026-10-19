const $ = (s) => document.querySelector(s);

/* ---------- Content: edit/replace this ---------- */
// Placeholder thumbnails (inline SVG). Replace `image` with a real path like 'img/one.jpg'.
const ph = (n) => 'data:image/svg+xml,' + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700"><rect width="1200" height="700" fill="#111"/>` +
  `<text x="600" y="350" fill="#666" font-family="monospace" font-size="44" text-anchor="middle">project_0${n}</text></svg>`);

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

const PROJECTS = [
  { slug: 'project-one',   title: 'Project One',   year: '2026', tags: ['Web', 'Design'],  image: ph(1), text: LOREM },
  { slug: 'project-two',   title: 'Project Two',   year: '2025', tags: ['App'],            image: ph(2), text: LOREM },
  { slug: 'project-three', title: 'Project Three', year: '2025', tags: ['Branding'],       image: ph(3), text: LOREM },
  { slug: 'project-four',  title: 'Project Four',  year: '2024', tags: ['Web'],            image: ph(4), text: LOREM },
  { slug: 'project-five',  title: 'Project Five',  year: '2024', tags: ['Print', 'Motion'], image: ph(5), text: LOREM },
];

const TERMINAL_LINES = ['> boot portfolio v0.1', '> loading projects ... ok', '> mounting gallery ... ok', '> welcome.'];
const RATIOS = [2.1, 1.85, 2.2, 1.65, 2.05];   // width / height per rectangle (matches the mockup)

/* ---------- Terminal typing ---------- */
(function terminal() {
  const out = $('#term-text');
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { out.textContent = TERMINAL_LINES.join('\n'); return; }
  const shown = [];
  let line = 0, ch = 0;
  (function tick() {
    if (line >= TERMINAL_LINES.length) return;
    shown[line] = TERMINAL_LINES[line].slice(0, ++ch);
    out.textContent = shown.slice(-4).join('\n');   // box holds 4 lines
    if (ch === TERMINAL_LINES[line].length) { line++; ch = 0; setTimeout(tick, 500); }
    else setTimeout(tick, 35 + Math.random() * 50);
  })();
})();

/* ---------- Projects: build, hover preview ---------- */
const section = $('#projects');
const preview = $('#preview');
const previewImg = preview.querySelector('img');

const els = PROJECTS.map((p) => {
  const a = document.createElement('a');
  a.className = 'project';
  a.href = '#project/' + p.slug;   // click = in-page navigation (see router below)
  a.innerHTML = `<img src="${p.image}" alt="${p.title}">`;
  a.addEventListener('mouseenter', () => {
    const r = a.getBoundingClientRect();
    previewImg.src = p.image;
    preview.style.setProperty('--r', r.width / r.height);
    document.body.classList.add('previewing');
  });
  a.addEventListener('mouseleave', () => document.body.classList.remove('previewing'));
  section.appendChild(a);
  return a;
});

/* ---------- Random scatter that avoids [data-avoid] text and other rectangles ---------- */
function scatter() {
  const W = section.clientWidth, H = section.clientHeight, gap = 24;
  const avoid = [...document.querySelectorAll('[data-avoid]')].map((e) => e.getBoundingClientRect());
  const hit = (a, b) => a.left < b.right + gap && a.right + gap > b.left && a.top < b.bottom + gap && a.bottom + gap > b.top;

  for (let scale = 1; scale > 0.35; scale *= 0.9) {          // shrink until everything fits
    const placed = [];
    const ok = els.every((el, i) => {
      const w = Math.min(460, W * 0.24) * scale * (0.9 + Math.random() * 0.2);
      const h = w / RATIOS[i % RATIOS.length];
      for (let n = 0; n < 400; n++) {
        const x = gap + Math.random() * (W - w - 2 * gap);
        const y = gap + Math.random() * (H - h - 2 * gap);
        const r = { left: x, top: y, right: x + w, bottom: y + h, el };
        if (![...avoid, ...placed].some((o) => hit(r, o))) { placed.push(r); return true; }
      }
      return false;
    });
    if (ok) {
      section.classList.remove('stack');
      placed.forEach((r) => Object.assign(r.el.style, {
        left: r.left + 'px', top: r.top + 'px', width: r.right - r.left + 'px', height: r.bottom - r.top + 'px',
      }));
      return;
    }
  }
  section.classList.add('stack');                             // couldn't fit: fall back to a stacked list
  els.forEach((el) => el.removeAttribute('style'));
}
scatter();
let lastW = innerWidth, t;
addEventListener('resize', () => {                           // width only, so mobile URL-bar resizes don't reshuffle
  clearTimeout(t);
  t = setTimeout(() => { if (innerWidth !== lastW) { lastW = innerWidth; scatter(); } }, 150);
});

/* ---------- Gallery (boilerplate: reuses project images) ---------- */
$('#gallery-grid').innerHTML = PROJECTS.map((p) => `<img src="${p.image}" alt="${p.title}">`).join('');

/* ---------- In-page project view: #project/<slug> ---------- */
const view = $('#project-view');
function route() {
  document.body.classList.remove('previewing');
  const m = location.hash.match(/^#project\/(.+)$/);
  const p = m && PROJECTS.find((x) => x.slug === m[1]);
  if (!p) { view.hidden = true; return; }
  view.innerHTML = `
    <a class="back" href="#projects">&larr; back</a>
    <h1>${p.title}</h1>
    <p class="meta">${p.year} / ${p.tags.join(', ')}</p>
    <img src="${p.image}" alt="${p.title}">
    <p>${p.text}</p>
    <pre><code>// boilerplate project code
const project = { name: '${p.title}', year: ${p.year} };
console.log(project);</code></pre>`;
  view.hidden = false;
  view.scrollTop = 0;
}
addEventListener('hashchange', route);
route();

