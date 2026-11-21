// Text Elements

export const TERMINAL_LINES = [
	'> start portfolio v0.1.0',
	'> loading projects ...',
	'> drafting about ...',
	'> mounting gallery ...', 
	'> welcome to my obsession.',
];

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

// Creating Per Project Image Imports

const images = (slug, count) =>
    Array.from({ length: count }, (_, i) => `/assets/images/${slug}/${i + 1}.webp`);

export const PROJECTS = [
    // Older Projects Projects
    {slug: 'project-1', title: "MediaPipe Projects", year: '2025', tags: ['TouchDesigner', 'Older Projects'], images: images('project-1', 3), text: LOREM },
    {slug: 'project-2', title: "Kinect Projects", year: '2025', tags: ['TouchDesigner', 'Older Projects'], images: images('project-2', 3), text: LOREM },
    {slug: 'project-3', title: "Nexus Based Particles", year: '2025', tags: ['TouchDesigner', 'Older Projects'], images: images('project-3', 4), text: LOREM },
    {slug: 'project-4', title: "TouchDesigner Summer Event", year: '2025', tags: ['TouchDesigner', 'Older Projects'], images: images('project-4', 1), text: LOREM },
    {slug: 'project-5', title: "Snowdrop Event", year: '2025', tags: ['TouchDesigner', 'Older Projects'], images: images('project-5', 1), text: LOREM },
    {slug: 'project-6', title: "Landsdown Arms Takeover", year: '2025', tags: ['TouchDesigner', 'Older Projects'], images: images('project-6', 2), text: LOREM },
    {slug: 'project-7', title: "The Lodge", year: '2025', tags: ['TouchDesigner', 'Older Projects'], images: images('project-7', 1), text: LOREM },
    {slug: 'project-8', title: "Beacon 2025", year: '2025', tags: ['TouchDesigner', 'Older Projects'], images: images('project-8', 3), text: LOREM },

    // Newer Projects
    {slug: 'project-9', title: "AV Jam", year: '2026', tags: ['TouchDesigner', 'Gallery'], images: images('project-9', 3), text: LOREM },
    {slug: 'project-10', title: "Dereal Studio Meetup", year: '2026', tags: ['TouchDesigner'], images: images('project-10', 3), text: LOREM },
    {slug: 'project-11', title: "Mammoth Installation", year: '2026', tags: ['TouchDesigner'], images: images('project-11', 3), text: LOREM },
    {slug: 'project-12', title: "Illuseum: Living Systems", year: '2026', tags: ['TouchDesigner'], images: images('project-12', 3), text: LOREM },
    {slug: 'project-13', title: "Tokio Station Event", year: '2026', tags: ['TouchDesigner'], images: images('project-13', 3), text: LOREM },
    {slug: 'project-14', title: "New Media London Founding/Events", year: '2026', tags: ['TouchDesigner'], images: images('project-14', 3), text: LOREM },
    {slug: 'project-15', title: "Reflected Radio", year: '2026', tags: ['TouchDesigner'], images: images('project-15', 3), text: LOREM },
    {slug: 'project-16', title: "Indigaura Installation", year: '2026', tags: ['TouchDesigner'], images: images('project-16', 3), text: LOREM },
    {slug: 'project-17', title: "KLSR & SakrMusic Installation", year: '2026', tags: ['TouchDesigner'], images: images('project-17', 3), text: LOREM },
];

