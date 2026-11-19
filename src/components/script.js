import { startTerminal } from './terminal.js';
import { createGrid } from './projectGrid.js';

import { TERMINAL_LINES, PROJECTS } from './content.js';
// Helper function that takes in the CSS Selector as the parameter s and then calls this method that matches the CSS selector, if none are found null is returned

const $ = (s) => document.querySelector(s);

// Variables pointing to different parts of the website (i still wonder how these are going to be used)
const field = $('#project-field')
const preview = $('#preview');

// Grabs the element img inside of the preview which is why there is the preview.
const previewImg = preview.querySelector('img'); 

// importing the terminal function
startTerminal($('#term-text'), TERMINAL_LINES);

// importing the project grid functio
createGrid(field, PROJECTS, previewImg);

// calls the map function and turns each project in to an <img> string 
// it then glues them together with .join and puts the result inside the gallery div

// $('#gallery-grid').innerHTML = PROJECTS.map((p) => `<img src="${p.image}" alt="${p.title}">`).join('');

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
