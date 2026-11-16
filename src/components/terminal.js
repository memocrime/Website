export function startTerminal(out, lines) {

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
  out.textContent = lines.join('\n'); 
  return;
  }

  const shown = [];
  let line = 0, ch = 0;

  function tick() {
    if (line >= lines.length) return;
    shown[line] = lines[line].slice(0, ++ch);
    out.textContent = shown.slice(-4).join('\n');   // box holds 4 lines
    if (ch === lines[line].length) { line++; ch = 0; setTimeout(tick, 500); }
    else setTimeout(tick, 35 + Math.random() * 50);
  }
  tick();
}
