# Estructura de la Web — MonkieStudio

**URL local:** `index.html`
**Stack:** HTML5 + Tailwind CSS (CDN) + CSS vanilla + JavaScript vanilla
**Paleta:** Black `#000000` · Coral `#f95c4b` · Stone `#e4ded2` · White `#ffffff`

---

## 1. HEAD

| Elemento | Detalle |
|---|---|
| Título | MonkieStudio — Agencia de Marketing Digital |
| Meta description | Agencia de marketing digital especializada en branding, desarrollo web, social media, Google Ads y más. Transformamos tu marca. |
| Fuentes | Inter (Google Fonts) |
| Iconos | Bootstrap Icons v1.11.3 |
| CSS Framework | Tailwind CSS vía CDN con config personalizada |
| CSS propio | `css/landing.css` |

---

## 2. BODY

### 2.1 Skip Link
- Texto: "Ir al contenido principal" · Enlace: `#main`

### 2.2 Header
- Logo `images/logo.svg` · Nav: Inicio · Servicios · Método · Clientes · Testimonios
- CTA "Contacto" → `#agenda` · Hamburguer button (mobile)

### 2.3 Mobile Nav Overlay
- Fullscreen con 5 enlaces, cierra al hacer clic o toggle hamburger

### 2.4 Hero Slider (`#inicio`)
- 3 slides (autoplay 6s, dots, flechas, teclado, pausa hover/focus)
  - **Slide 1**: Diseño y desarrollo web
  - **Slide 2**: Branding estratégico
  - **Slide 3**: Marketing digital
- Gradiente: `from-black/80 via-black/60 to-black/40`

### 2.5 Servicios (`#servicios`)
- Grid 3-col con 6 cards:
  1. Diseño y programación web (UX/UI)
  2. e-Commerce
  3. Social Media
  4. Branding
  5. Programación de apps
  6. Plan de Marketing Digital

### 2.6 Método (`#metodo`)
- 2 tarjetas bg-black: "¡Más clientes!" · "¡Más valor!"

### 2.7 Metodología en 3 pasos
- Timeline: Planifica → Que te encuentren → Que te busquen

### 2.8 Clientes (`#clientes`)
- 6 proyectos (grid) + marquee infinito de 8 marcas

### 2.9 Testimonios (`#testimonios`)
- 3 cards: Eric Jethmal · Salim Vera (Libido) · Carlos Anavitarte

### 2.10 Contadores
- 4 indicadores: 3,000+ · 10+ · 500+ · ∞

### 2.11 Booking (`#agenda`)
- **Form 1**: Consultoría gratuita (20 min) — nombre, email, privacidad
- **Form 2**: Cotización — nombre, email, servicio, privacidad

### 2.12 Footer
- 4 cols: Logo + descripción · Legales (5 links) · Contacto · Redes Sociales

### 2.13 Toast
- Confirmación "✓ Gracias. Te contactaremos pronto." (3s)

### 2.14 Cookies Banner
- Aviso + botón "Aceptar" (guarda en localStorage)

---

## 3. JavaScript (`js/landing.js`)

| Módulo | Descripción |
|---|---|
| Hero Slider | Autoplay, dots, flechas, teclado, pausa hover/focus |
| Header Scroll | Sombra al scrollear > 50px |
| Hamburger | Overlay mobile + bloqueo scroll |
| Fade-up | IntersectionObserver |
| Form Validation | Campos requeridos + email con feedback visual |
| Smooth Scroll | Anchors internos |
| Cookies Banner | localStorage |

---

## 4. Archivos

```
monki/
├── index.html
├── css/landing.css
├── js/landing.js
├── images/ (logo.svg, logo_blanco.png, logo_negro.png, logon.png)
└── documents/estructura.md
```
