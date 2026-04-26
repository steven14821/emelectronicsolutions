# E&M Electronic Solutions SAS — Identity & Project Context

> Documento de referencia para cualquier IA que trabaje en este proyecto.  
> Lee esto antes de tocar cualquier archivo.

---

## 1. ¿Qué es este proyecto?

Sitio web de **landing page** para **E&M Electronic Solutions S.A.S**, empresa colombiana de servicio técnico autorizado Samsung con sedes en **Cúcuta** y **Bucaramanga**.

El sitio es **100% estático** — HTML + CSS + JS vanilla. Sin frameworks, sin build process, sin Node.js. Se puede abrir directo en el navegador o subir a cualquier hosting estático.

---

## 2. Estructura de archivos

```
site/
├── index.html       ← Toda la página (637 líneas)
├── em-landing.css   ← Todos los estilos (1544 líneas)
├── logo.png         ← Logo oficial E&M (5.3 KB)
└── mascota.png      ← Mascota oficial E&M (265 KB)
```

**No hay carpeta `assets/`, no hay `src/`, no hay `package.json`.** Todo vive en esos 4 archivos.

---

## 3. Identidad de marca

| Token | Valor | Uso |
|-------|-------|-----|
| `--brand` | `#0057B8` | Azul primario (botones, acentos, bordes activos) |
| `--brand-deep` | `#0D2B7E` | Azul navy (fondos oscuros, gradientes) |
| `--brand-light` | `#38ACEC` | Azul claro (iconos sobre fondo oscuro) |
| `--accent` | `#F5C400` | Amarillo del `&` del logo (stars, eyebrows, highlights) |
| `--ink` | `#0A1628` | Color de texto principal (casi negro azulado) |
| `--surface-warm` | `#F5F9FF` | Fondo de secciones alternadas (FAQ, etc.) |
| `--whatsapp` | `#25D366` | Verde WhatsApp (botones CTA de WhatsApp) |

### Tipografía
- **Outfit** (pesos 300–900) → títulos, headings, nav, logos, badges  
- **Plus Jakarta Sans** (pesos 400–800) → cuerpo, párrafos, descripciones

### Imágenes de marca
- `logo.png` — Logo rectangular E&M Electronic Solutions. En fondos oscuros se aplica `filter: brightness(0) invert(1)` para verlo blanco.
- `mascota.png` — Mascota corporativa. Se muestra en la sección "Sobre Nosotros" con wrapper de fondo azul translúcido + `drop-shadow`.

---

## 4. Arquitectura del HTML (`index.html`)

### `<head>`
```html
<!-- CDNs cargados en orden: -->
1. Google Fonts — Outfit + Plus Jakarta Sans
2. Remix Icons 4.6.0 — iconos (clases ri-*)
3. Leaflet 1.9.4 CSS — mapas interactivos
4. em-landing.css — todos los estilos del sitio
```

### `<body class="em-site">` — secciones en orden

| `id` | Sección | Descripción |
|------|---------|-------------|
| `#inicio` | Hero | Slideshow de 4 slides con CTA, trust badges |
| *(stats bar)* | Stats | Contadores animados: 10k+ clientes, 30k+ reparaciones, 11k+ instalaciones |
| `#testimonios` | Testimonios | Marquee infinito con 6 tarjetas de clientes |
| `#servicios` | Servicios | 4 cards: Instalación, Soporte Técnico, Mantenimiento, Repuestos |
| `#nosotros` | Sobre Nosotros | Mosaico visual + texto + mascota corporativa |
| `#galeria` | Galería | Grid Bento de 6 celdas (imágenes placeholder) |
| `#resultados` | Antes/Después | Slider comparativo drag & drop |
| `#productos` | Productos | Tabs con 4 categorías: Controles, Lavadoras, Filtros, Repuestos |
| `#sedes` | Sedes | 2 tarjetas con mapas Leaflet embebidos |
| `#contacto` | CTA Final | Botones WhatsApp + Teléfono |
| *(footer)* | Footer | 4 columnas: Logo/Redes, Nav, Sede Cúcuta, Sede Bucaramanga |
| *(float)* | WhatsApp Float | Botón flotante fijo en esquina inferior derecha |

### Navbar (`#mainNav`)
- **Fijo** en `position: fixed; top: 0; z-index: 999`
- Clase `.scrolled` se añade via JS cuando `scrollY > 60` → fondo blanco con blur
- **Nav Pill** (desktop): `#navPillContainer` con clase `.is-pill` cuando scrollea abajo >150px → menú colapsa a un círculo. Se expande al subir 80px o al hacer clic en `#navPillToggle`
- **Mobile**: botón `#navToggle` abre `#navDrawer` (panel lateral)

---

## 5. JavaScript (al final del `<body>`)

Todo el JS es **vanilla ES5+**, envuelto en `DOMContentLoaded`. No hay dependencias externas salvo Leaflet (CDN).

### Funcionalidades JS

```
1. Navbar scroll     → añade/quita clase .scrolled en #mainNav
2. Mobile drawer     → abre/cierra #navDrawer con toggle #navToggle
3. Hero Carousel     → translateX en #heroSlides, dots .cdot, swipe touch
4. Counters          → IntersectionObserver anima .stat-num con data-target
5. Before/After      → slider drag/touch en #baSlider
6. Product tabs      → .prod-tab activa .prod-panel correspondiente
7. Leaflet Maps      → 2 mapas en #map-cucuta y #map-bga (OpenStreetMap)
8. Reveal scroll     → IntersectionObserver añade .vis a elementos .reveal
9. Emails anti-spam  → #email-cucuta y #email-bga se construyen via JS
10. FAQ Accordion    → .em-faq-item toggle clase .open (uno a la vez)
11. Nav Pill         → scroll listener para colapsar/expandir nav desktop
```

### IDs importantes (no renombrar)
```
#mainNav, #navToggle, #navDrawer, #navPillContainer, #navPillToggle,
#navPillMenu, #heroSlides, #carouselDots (.cdot), #baSlider, #baBefore,
#baKnob, #baDivider, #faqList (.em-faq-item), #map-cucuta, #map-bga,
#email-cucuta, #email-bga
```

---

## 6. CSS — convención de clases

| Prefijo | Ámbito |
|---------|--------|
| `.em-t-*` | Testimonials (`.em-t-card`, `.em-t-track`, `.em-t-avatar`…) |
| `.em-faq-*` | FAQ accordion (`.em-faq-item`, `.em-faq-q`, `.em-faq-a`…) |
| `.em-footer-*` | Footer (`.em-footer-cols`, `.em-footer-nav`…) |
| `.em-mascota-*` | Wrapper de la mascota en About |
| `.nav-pill-*` | Nav pill collapse desktop |
| `.em-fsoc` | Social icons del footer |
| `.wa-float` | Botón flotante de WhatsApp |
| `.reveal` | Elementos animados al hacer scroll (se añade `.vis`) |
| `.hero-*` | Sección hero y carousel |
| `.stat-*` | Stats bar y contadores |
| `.service-*` | Cards de servicios |
| `.bento-*` | Grid galería bento |
| `.ba-*` | Before/After slider |
| `.prod-*` | Tabs y panels de productos |
| `.loc-*` | Sección sedes / mapas |

### Variables CSS clave
```css
--ink, --ink-80/60/40/20/10/05   /* escala de grises azulados */
--brand, --brand-deep, --brand-light
--accent, --accent-hover
--surface, --surface-warm, --surface-cool
--radius, --radius-lg, --radius-xl
--shadow-sm/md/lg/xl
```

### Estados JS en CSS
```css
.nav.scrolled           → navbar con fondo blanco
.nav-pill-container.is-pill → nav colapsado en círculo
.em-faq-item.open       → ítem FAQ expandido
.reveal.vis             → elemento visible (animación completada)
.prod-tab.active        → tab activo
.prod-panel.active      → panel visible
.nav-mobile-toggle.open → hamburgesa animada a X
.nav-drawer.open        → drawer móvil visible
```

---

## 7. Datos de negocio

### Empresa
- **Razón social**: E&M Electronic Solutions S.A.S
- **Especialidad**: Centro de servicio técnico autorizado Samsung
- **Años**: +10 años de trayectoria
- **Regiones**: Norte de Santander + Santander (Colombia)

### Sede Cúcuta
- **Dirección**: Calle 3 # 2E-64, La Ceiba, Cúcuta
- **Teléfonos**: 314 287 3886 — 315 296 3886
- **Email**: emelectronicsolutions@gmail.com
- **Mapa**: https://maps.app.goo.gl/xhR8iWv9KPayTdfC8
- **Coords**: lat 7.9003, lng -72.5078

### Sede Bucaramanga
- **Dirección**: Calle 105 # 22-146, Provenza, Bucaramanga
- **Teléfonos**: 316 051 7180 — 316 051 7187
- **Email**: emelectronicsolutionsbga@gmail.com
- **Mapa**: https://maps.app.goo.gl/juoGY4gmNRM1dJ9v5
- **Coords**: lat 7.1197, lng -73.1167

### WhatsApp principal
```
https://api.whatsapp.com/send?phone=573142873886
```

### Horarios
- Lunes–Viernes: 8:00 a.m. – 6:00 p.m.
- Sábados: 9:00 a.m. – 2:00 p.m.

### Servicios ofrecidos
1. Instalación inicial (gratuita para Samsung nuevos con factura)
2. Soporte técnico y reparación (garantía 90 días mano de obra)
3. Mantenimiento preventivo (A/C, nevecón, lavadora, secadora)
4. Venta de repuestos originales Samsung

### Productos en venta
- Forros control remoto (silicona básica, luminoso, premium)
- Forros lavadora (estándar, con panel digital)
- Filtros de agua y aire Samsung
- Repuestos técnicos (refrigeración, lavadoras, A/C, TV)

---

## 8. Imágenes pendientes (placeholders)

Estas secciones tienen divs placeholder esperando fotos reales:

```
Hero slides (4 imágenes):
  assets/slides/instalacion.jpg
  assets/slides/reparacion.jpg
  assets/slides/mantenimiento.jpg
  assets/slides/repuestos.jpg

Galería bento (6 imágenes):
  .bb-1 → Instalación Nevecon
  .bb-2 → Reparación a Domicilio
  .bb-3 → Equipo Técnico
  .bb-4 → Mantenimiento Completo
  .bb-5 → Herramientas Profesionales
  .bb-6 → Repuestos Originales

Before/After:
  .ba-layer-before → Foto ANTES
  .ba-layer-after  → Foto DESPUÉS

Productos (thumbnails de productos):
  .pci-1 a .pci-4 → imágenes de cada producto
```

Para reemplazar un placeholder, sustituye el `<div class="bento-bg bb-X">` por:
```html
<img src="ruta/imagen.jpg" alt="descripción" style="width:100%;height:100%;object-fit:cover">
```

---

## 9. Cómo desplegar

| Plataforma | Instrucción |
|-----------|-------------|
| **Local** | Doble clic en `index.html` |
| **Netlify Drop** | Arrastra la carpeta `site/` a [app.netlify.com/drop](https://app.netlify.com/drop) |
| **GitHub Pages** | Sube `site/` como rama `gh-pages`, activa Pages en Settings |
| **Cloudflare Pages** | Conecta repo, directorio raíz = `site/`, sin build command |

> ⚠️ Los mapas Leaflet requieren conexión a internet (OpenStreetMap CDN).  
> Las fuentes y Remix Icons también se cargan desde CDN.

---

## 10. Reglas para modificar el sitio

1. **Editar solo `index.html` y `em-landing.css`** — son los únicos archivos de código.
2. **No cambiar los IDs** listados en §5 — el JS depende de ellos.
3. **Usar las variables CSS** (`var(--brand)`, etc.) en vez de hardcodear colores.
4. **Nuevas secciones**: sigue el patrón `<section class="section" id="nombre">` con `.section-head` + `.section-eyebrow` + `.section-title`.
5. **Nuevas animaciones de entrada**: añade clase `reveal` al elemento — el JS lo anima automáticamente con IntersectionObserver.
6. **Iconos**: usa clases de Remix Icons (`ri-*`). Catálogo: https://remixicon.com
7. **El `<script>` está al final del `<body>`**, antes del `</body>`. Todo nuevo JS va dentro del bloque `DOMContentLoaded`.
8. **No usar `document.write` ni jQuery** — vanilla JS solamente.
