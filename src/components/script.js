import {startTerminal} from './terminal.js';
import {TERMINAL_LINES } from './content.js';

// Helper function that takes in the CSS Selector as the parameter s and then calls this method that matches the CSS selector, if none are found null is returned
const $ = (s) => document.querySelector(s);

// COME BACK TO THIS ONE
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

const RATIOS = [2.1, 1.85, 2.2, 1.65, 2.05];   // width / height per rectangle (matches the mockup)

// importing the terminal function
startTerminal($('#term-text'), TERMINAL_LINES);


// Projects build and hover section

// Variables pointing to different parts of the website (i still wonder how these are going to be used)
const section = $('#projects');
const preview = $('#preview');

// Grabs the element img inside of the preview which is why there is the preview.
const previewImg = preview.querySelector('img'); 

// Runs a function on every project in const PROJECTS  and collects what each returns into a new array, so in this case else is the list of the five link elements
const els = PROJECTS.map((p) => {
  // Make a new <a> tag
  const a = document.createElement('a');
  // Points the a tag to #project but why are we doing a.className = 'project'; is this so that this a tag inherits the css set up for the project classname?
  a.className = 'project';

  // We set up an href for the in page click navigation so this is all within the main page (title, sidebar etc)
  a.href = '#project/' + p.slug;

  // Set up the HTML content (instead of the inline arguments) and puts the image inside of it
  a.innerHTML = `<img src = "${p.image}" alt="${p.title}">`;

  a.addEventListener('mouseenter', () => {
    // When the mouse enters this a rectangle run this function

    // This returns the elements size and pos on screen
    const r = a.getBoundingClientRect();

    // This sets the preview image to the current iteration of p's image 
    // It then set the CSS variable --r (width to height ratio) so that the enlarged copy keeps shape
    previewImg.src = p.image;
    previewImg.style.setProperty('--r', r.width / r.height);

    // It then adds the class previewing to <body> which makes the CSS show the veil and preview
    // This is also altered later on in the code
    document.body.classList.add('previewing');
  });

  // on mouse remove remove the class previewing
  a.addEventListener('mouseleave', () => document.body.classList.remove('previewing'));

  // puts the new element inside the project secion and hands it back to .map
  section.appendChild(a);
  return a;
});

// Scatter function to ignore for now
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


// calls the map function and turns each project in to an <img> string 
// it then glues them together with .join and puts the result inside the gallery div
$('#gallery-grid').innerHTML = PROJECTS.map((p) => `<img src="${p.image}" alt="${p.title}">`).join('');

// in page project view
const view = $('#project-view');

// this function decides what to show based on the URL
function route(){
    // clears the hover preview so it doesnt linger after clicking
    document.body.classList.remove('previewing');

    // location.hash is the part of the URL after #
    // this pattern basically means start with #project/ and capture everything after it
    // .match reuturns a null if it doensnt fit or a list whose second item m[1] is the captured slug
    const m = location.hash.match(/^#project\/(.+)$/);

    // a bit complicated but first thing is if m is null && stops it somehow and p is null
    // otherwise .find will find the project with the .slug that matches the url and store it in p
    const p = m && PROJECTS.find((x) => x.slug === m[1]);
    
    // if p is null and there is no matching project it hides the project view and stops the function
    if (!p) { view.hidden = true; return; }

    // Fills the view with that projects details (multi line template literal) 
    // It then unhides it and scrolls it back to the top of the site
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

// need to ask ai about this one 
// i think it just runs route whenever the hash part of the url changes
addEventListener('hashchange', route);
route();
