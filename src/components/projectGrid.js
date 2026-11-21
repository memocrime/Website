export function createGrid(field, projects, previewImg) {

  return [...projects].reverse().map((p) => {

    const a = document.createElement('a');
    a.className = 'project';
    a.href = '#project/' + p.slug;
    a.innerHTML = `<img src="${p.images[0]}" alt="${p.title}">`;

    a.addEventListener('mouseenter', () => {
      const r = a.getBoundingClientRect();
      previewImg.src = p.images[0];
      previewImg.style.setProperty('--r', r.width / r.height);
      document.body.classList.add('previewing');
    });

    a.addEventListener('mouseleave', () => document.body.classList.remove('previewing'));

    field.appendChild(a);
    return a;
    });
}

