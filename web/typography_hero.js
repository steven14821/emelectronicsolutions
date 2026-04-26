// Animación de palabras en H1 + mejoras tipográficas
const fs = require('fs');
const SITE = 'D:/em_prueba/site';

// ─────────────────────────────────────────────────────────
// 1. HTML: reemplazar H1 con estructura animada
// ─────────────────────────────────────────────────────────
let html = fs.readFileSync(SITE + '/index.html', 'utf8');

const OLD_H1 = '<h1>Tu hogar merece el mejor <span class="line-accent">servicio técnico</span></h1>';
const NEW_H1 = `<h1>
        <span class="h1-lead">Tu hogar merece el mejor</span>
        <span class="hero-word-rotator" id="heroWordRotator">
          <span class="hero-word active">servicio técnico</span>
          <span class="hero-word">soporte</span>
          <span class="hero-word">mantenimiento</span>
          <span class="hero-word">cuidado</span>
        </span>
      </h1>`;

if (!html.includes(OLD_H1)) {
  console.error('✗ H1 no encontrado. Buscando alternativa...');
  const h1idx = html.indexOf('<h1>');
  if (h1idx !== -1) console.log('H1 encontrado en:', JSON.stringify(html.slice(h1idx, h1idx+150)));
  process.exit(1);
}
html = html.replace(OLD_H1, NEW_H1);
console.log('✓ H1 animado insertado');

// ─────────────────────────────────────────────────────────
// 2. JS: añadir el rotador dentro del DOMContentLoaded
// ─────────────────────────────────────────────────────────
const ROTATOR_JS = `
  /* ── Hero word rotator ─────────────────── */
  var rotWords   = document.querySelectorAll('.hero-word');
  var rotCurrent = 0;
  if (rotWords.length > 1) {
    setInterval(function () {
      var prev = rotCurrent;
      rotCurrent = (rotCurrent + 1) % rotWords.length;
      rotWords[prev].classList.remove('active');
      rotWords[prev].classList.add('exiting');
      (function (el) { setTimeout(function () { el.classList.remove('exiting'); }, 560); })(rotWords[prev]);
      rotWords[rotCurrent].classList.add('active');
    }, 2500);
  }
`;

// Insertar ANTES del cierre del bloque DOMContentLoaded (antes de "});")
const DL_CLOSE = '\n});';
const insertAt  = html.lastIndexOf(DL_CLOSE);
if (insertAt === -1) { console.error('✗ No encontré el cierre DOMContentLoaded'); process.exit(1); }
html = html.slice(0, insertAt) + ROTATOR_JS + html.slice(insertAt);
console.log('✓ JS rotador añadido');

fs.writeFileSync(SITE + '/index.html', html, 'utf8');
console.log('✓ index.html guardado');

// ─────────────────────────────────────────────────────────
// 3. CSS: animación del rotador + mejoras tipográficas
// ─────────────────────────────────────────────────────────
let css = fs.readFileSync(SITE + '/em-landing.css', 'utf8');

// 3a. Cambiar font-weight del h1 a 400 (el peso alto vendrá del rotador)
css = css.replace(
  'font-weight:900; line-height:1.06; letter-spacing:-2px;',
  'font-weight:400; line-height:1.1;  letter-spacing:-1.5px;'
);
console.log('✓ hero h1 base weight → 400');

// 3b. hero-subtitle más legible
css = css.replace(
  'font-size:1.05rem; line-height:1.8; color:var(--ink-40);',
  'font-size:1.12rem; line-height:1.82; color:var(--ink-60); font-weight:400;'
);
console.log('✓ hero-subtitle mejorado');

// 3c. section-title más grande y con más peso visual
css = css.replace(
  "font-size:clamp(1.9rem,3.2vw,2.7rem);\n  font-weight:900; letter-spacing:-1.5px; line-height:1.1;",
  "font-size:clamp(2rem,3.5vw,3rem);\n  font-weight:900; letter-spacing:-2px; line-height:1.08;"
);
console.log('✓ section-title escalado');

// 3d. section-subtitle más legible
css = css.replace(
  'font-size:1rem; line-height:1.78; color:var(--ink-40);',
  'font-size:1.05rem; line-height:1.82; color:var(--ink-60);'
);
console.log('✓ section-subtitle mejorado');

// 3e. about-text más legible
css = css.replace(
  'font-size:1rem; line-height:1.82; color:var(--ink-40); margin-bottom:2rem;',
  'font-size:1.04rem; line-height:1.88; color:var(--ink-60); margin-bottom:2rem;'
);
console.log('✓ about-text mejorado');

// 3f. feature-item h4 más fuerte
css = css.replace(
  "font-family:'Outfit', sans-serif; font-weight:700;\n  font-size:.9rem; margin-bottom:2px;",
  "font-family:'Outfit', sans-serif; font-weight:800;\n  font-size:.96rem; margin-bottom:3px;"
);
console.log('✓ feature-item h4 más fuerte');

// 3g. service-card h3 ligeramente mayor
css = css.replace(
  "font-family:'Outfit', sans-serif; font-size:1.18rem;\n  font-weight:800; margin-bottom:.65rem; letter-spacing:-.3px;",
  "font-family:'Outfit', sans-serif; font-size:1.24rem;\n  font-weight:800; margin-bottom:.7rem;  letter-spacing:-.5px;"
);
console.log('✓ service-card h3 ajustado');

// 3h. stat-desc más peso
css = css.replace(
  "font-size:.78rem; font-weight:600;\n  color:rgba(255,255,255,.4);\n  text-transform:uppercase; letter-spacing:2px;",
  "font-size:.78rem; font-weight:700;\n  color:rgba(255,255,255,.55);\n  text-transform:uppercase; letter-spacing:2.5px;"
);
console.log('✓ stat-desc más contraste');

// 3i. Añadir CSS del rotador + fix .h1-lead al final del archivo
const ROTATOR_CSS = `
/* ═══════════════════════════════════════
   HERO WORD ROTATOR
   ═══════════════════════════════════════ */

/* Lead phrase: ligero, soporte visual */
.h1-lead {
  display: block;
  font-weight: 300;
  color: var(--ink-60);
  letter-spacing: -1px;
  line-height: 1.15;
}

/* Contenedor de altura fija — el layout no salta */
.hero-word-rotator {
  display: block;
  position: relative;
  overflow: hidden;
  height: 1.18em;            /* 1 línea a cualquier tamaño */
  color: var(--brand);
  font-weight: 900;
  letter-spacing: -2.5px;
  margin-top: .05em;
}
/* En móvil "servicio técnico" puede partir en 2 líneas */
@media (max-width: 520px) {
  .hero-word-rotator { height: 2.4em; }
}

/* Cada palabra: empieza abajo, invisible */
.hero-word {
  position: absolute;
  top: 0; left: 0; width: 100%;
  line-height: 1.1;
  opacity: 0;
  transform: translateY(110%);
  transition:
    transform 0.58s cubic-bezier(0.16, 1, 0.3, 1),
    opacity   0.42s ease;
}
/* Palabra activa: centrada, visible */
.hero-word.active {
  opacity: 1;
  transform: translateY(0);
}
/* Salida: sube y desaparece */
.hero-word.exiting {
  opacity: 0;
  transform: translateY(-110%);
  transition:
    transform 0.46s cubic-bezier(0.55, 0, 0.45, 1),
    opacity   0.32s ease;
}

/* ── Mejoras adicionales de jerarquía tipográfica ── */

/* CTA section title */
.cta-final h2 {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  font-weight: 900;
  letter-spacing: -1.5px;
  line-height: 1.12;
}
.cta-final p {
  font-size: 1.08rem;
  color: rgba(255,255,255,.65);
  line-height: 1.8;
}

/* Section-eyebrow un poco más fino para respirar */
.section-eyebrow {
  letter-spacing: 4px;
}

/* Mosaic cards: h4 más definido */
.mosaic-card h4 {
  font-weight: 800;
  font-size: .97rem;
}

/* Location city name: más impacto */
.loc-city {
  font-family: 'Outfit', sans-serif;
  font-size: 1.35rem;
  font-weight: 900;
  letter-spacing: -.5px;
}

/* FAQ pregunta: un pelito más */
.em-faq-q {
  font-size: 1.02rem;
}

/* Testimonial name destacado */
.em-t-name {
  font-size: .92rem;
  font-weight: 800;
}
`;

css += ROTATOR_CSS;
console.log('✓ CSS rotador y ajustes tipográficos añadidos');

fs.writeFileSync(SITE + '/em-landing.css', css, 'utf8');

// Verificación final
const html2 = fs.readFileSync(SITE + '/index.html','utf8');
const css2  = fs.readFileSync(SITE + '/em-landing.css','utf8');
console.log('\n✨ Listo!');
console.log('  index.html  →', (fs.statSync(SITE+'/index.html').size/1024).toFixed(1), 'KB');
console.log('  em-landing.css →', (fs.statSync(SITE+'/em-landing.css').size/1024).toFixed(1), 'KB');
console.log('\nVerificaciones:');
console.log(html2.includes('hero-word-rotator') ? '  ✓ rotador en HTML' : '  ✗ rotador NO encontrado');
console.log(html2.includes('rotWords') ? '  ✓ JS rotador en HTML' : '  ✗ JS NO encontrado');
console.log(css2.includes('.hero-word.active') ? '  ✓ CSS .hero-word.active' : '  ✗ CSS NO encontrado');
console.log(css2.includes('.h1-lead') ? '  ✓ CSS .h1-lead' : '  ✗ .h1-lead NO encontrado');
