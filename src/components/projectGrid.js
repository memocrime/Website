export function createGrid(field, projects, previewImg) {

  return projects.map((p) => {
    // Make a new <a> tag
    const a = document.createElement('a');

    // sets the a tag settings
    a.className = 'project';
    a.href = '#project/' + p.slug;
    a.innerHTML = `<img src="${p.image}" alt="${p.title}">`;

    a.addEventListener('mouseenter', () => {
      // Gets the bounds of the rectangle, sets the preview img, sets the width/height and sets the previewing state
      const r = a.getBoundingClientRect();
      previewImg.src = p.image;
      previewImg.style.setProperty('--r', r.width / r.height);
      document.body.classList.add('previewing');
    });
    // removes the previewing state on leave
    a.addEventListener('mouseleave', () => document.body.classList.remove('previewing'));
    
    // it adds on this a tag to the line of fields/projects
    field.appendChild(a);
    return a;
    });
}

