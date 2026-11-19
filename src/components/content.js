export const TERMINAL_LINES = [
	'> start portfolio v0.1.0',
	'> loading projects ...',
	'> drafting about ...',
	'> mounting gallery ...', 
	'> welcome to my obsession.',
];

// COME BACK TO THIS ONE
export const ph = (n) => 'data:image/svg+xml,' + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080"><rect width="1920" height="1080" fill="#111"/>` +
  `<text x="960" y="540" fill="#666" font-family="monospace" font-size="100" text-anchor="middle" dominant-baseline="middle">project_${String(n).padStart(2, '0')}</text></svg>`);


const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

const TEXT1 = 'This is the really long random template text that will be going specifically inside of project 8 because it is my favorite number haha';
export const PROJECTS = [
  { slug: 'project-one',   title: 'Project One',   year: '2026', tags: ['Web', 'Design'],  image: ph(1), text: LOREM },
  { slug: 'project-two',   title: 'Project Two',   year: '2025', tags: ['App'],            image: ph(2), text: LOREM },
  { slug: 'project-three', title: 'Project Three', year: '2025', tags: ['Branding'],       image: ph(3), text: LOREM },
  { slug: 'project-four',  title: 'Project Four',  year: '2024', tags: ['Web'],            image: ph(4), text: LOREM },
  { slug: 'project-five',  title: 'Project Five',  year: '2024', tags: ['Print', 'Motion'], image: ph(5), text: LOREM },
  { slug: 'project-six',   title: 'Project Six',   year: '2024', tags: ['Web'],    image: ph(6), text: LOREM },
  { slug: 'project-seven', title: 'Project Seven', year: '2023', tags: ['App'],    image: ph(7), text: LOREM },
  { slug: 'project-eight', title: 'Project Eight', year: '2023', tags: ['Print'],  image: ph(8), text: TEXT1 },
  { slug: 'project-nine',  title: 'Project Nine',  year: '2022', tags: ['Motion'], image: ph(9), text: LOREM },
  { slug: 'project-ten', title: 'Project Ten', year: '2023', tags: ['App'],    image: ph(10), text: LOREM },
  { slug: 'project-eleven', title: 'Project Eleven', year: '2023', tags: ['Print'],  image: ph(11), text: LOREM },
  { slug: 'project-twelve',  title: 'Project Twelve',  year: '2022', tags: ['Motion'], image: ph(12), text: LOREM },
];

// Aspect Ratio for Cards
// idk know if this does anything export const CARD_RATIO = 16 / 9; 
