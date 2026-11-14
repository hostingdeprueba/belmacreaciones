# BelmaCreaciones — Resumen técnico y traspaso del proyecto

**Última actualización:** 13 de noviembre de 2026
**Estado:** sitio completo y funcional; el catálogo se organiza en 9 categorías y
las fotografías se incorporan progresivamente.
**Tipo:** sitio web estático (sin frameworks, sin compilación, sin dependencias).
**Idioma del contenido:** español (Argentina).

Este documento resume cómo está construido el sitio y qué pasos seguir para
mantenerlo sin reconstruir lo que ya funciona.

---

## 1. Objetivo y características

Presentar **BelmaCreaciones**, un emprendimiento familiar de confección artesanal
de productos textiles, con una página elegante, cálida y adaptable a todo
dispositivo.

### Características principales
- Sitio de una sola página con navegación por anclas.
- Estética minimalista y artesanal: rosa pastel, rosa empolvado, crema y beige.
- Tipografía editorial (serif para títulos, sans geométrica para texto).
- Detalles de costura dibujados en SVG.
- Catálogo de **9 categorías** con una tarjeta representativa por categoría.
- Galería interactiva por categoría con **todas** las fotografías disponibles.
- Visor de foto ampliada con zoom, miniaturas, flechas, teclado y gestos táctiles.
- Categorías sin fotos visibles con estado **"Próximamente"**.
- Sección de destacados de bebés con fotografías reales.
- Contacto por WhatsApp, Instagram y Facebook, con enlaces **vacíos a propósito**
  en `js/config.js` hasta que el dueño los proporcione.
- Sin precios, direcciones, teléfonos ni redes inventadas.

### Restricciones de contenido
- **No** agregar datos comerciales sin que el dueño los aporte.
- **No** inventar imágenes ni productos.
- Mantener el tono cálido, sobrio y artesanal; evitar una estética infantil.

---

## 2. Estructura de carpetas y archivos

```text
Quad core/
├── index.html                  Página completa (582 líneas)
├── RESUMEN-TECNICO.md          Este documento
├── README.md                   Guía de uso para el dueño
├── robots.txt                  Permite indexación
├── css/
│   └── estilos.css             Sistema visual, catálogo y galería (2716 líneas)
├── js/
│   ├── config.js               WhatsApp / Instagram / Facebook (29 líneas)
│   ├── catalogo.js             Datos del catálogo (340 líneas)
│   └── main.js                 Interacciones y galería (991 líneas)
└── img/
    ├── favicon.svg
    ├── placeholder-producto.svg
    ├── placeholder-portada.svg
    ├── placeholder-taller.svg
    ├── LEEME.txt
    ├── accesorios/             6 fotos
    ├── indumentaria/           3 fotos
    ├── disfraces/              1 foto
    ├── kits/                   2 fotos
    ├── munecos/                5 fotos
    ├── polleras/               2 fotos
    ├── vestidos/               2 fotos
    ├── bebes/                  3 fotos
    └── hogar/                  sin fotos todavía
```

### Responsabilidad de cada archivo

| Archivo | Responsabilidad |
|---|---|
| `index.html` | Marcado del encabezado, portada, valores, sobre nosotros, catálogo, galería, destacados, contacto, pie y avisos. |
| `css/estilos.css` | Variables en `:root`, componentes, categorías, galería, animaciones, responsive y accesibilidad de movimiento. |
| `js/config.js` | Activa los enlaces de contacto y personaliza los mensajes de WhatsApp. |
| `js/catalogo.js` | **Único lugar donde se edita el catálogo**: categorías, productos y fotos. |
| `js/main.js` | Menú móvil, render de categorías, galería, enlace activo, animaciones, respaldo de imágenes, año y botón de subida. |
| `img/<categoría>/` | Fotografías reales, organizadas por categoría. |

### Orden de carga de scripts

```html
<script src="js/config.js" defer></script>
<script src="js/catalogo.js" defer></script>
<script src="js/main.js" defer></script>
```

El orden importa: `main.js` lee `window.BELMA_CONFIG` y `window.BELMA_CATALOGO`.
Los tres usan `defer` y se ejecutan en orden después de parsear el HTML.

---

## 3. Tecnologías

| Tecnología | Uso |
|---|---|
| **HTML5 semántico** | `header`, `nav`, `main`, `section`, `article`, `footer`; ARIA; Open Graph. |
| **CSS3** | Variables, Grid, Flexbox, `clamp()`, `aspect-ratio`, `object-fit`, gradientes, animaciones y media queries. |
| **JavaScript vanilla** | IIFE con `"use strict"`, `IntersectionObserver`, `matchMedia`, `dataset`, `<dialog>`, `requestAnimationFrame`. |
| **SVG inline y en archivos** | Íconos, placeholders e ícono de pestaña. |
| **Google Fonts** | Cormorant Garamond (títulos) y Jost (texto), con `preconnect`. |

### Lo que no se usa
- Sin React, Vue, Angular, Bootstrap ni Tailwind.
- Sin Sass/Less/PostCSS.
- Sin npm, bundler ni proceso de build.
- Sin backend ni base de datos.
- Sin servicio de formularios: el contacto es por enlaces externos.

---

## 4. Diseño y estilos

### 4.1 Paleta principal (`:root`)

| Variable | Hex | Uso |
|---|---|---|
| `--crema` | `#FDFAF6` | Fondo base |
| `--crema-oscura` | `#F9F2EA` | Gradientes de sección |
| `--beige` | `#F2E8DD` | Fondos alternos y marcos |
| `--rosa-pastel` | `#F8E7E5` | Detalles y estados hover |
| `--rosa` | `#E7C3C1` | Bordes y acentos suaves |
| `--rosa-empolvado` | `#9E6266` | Botones y acentos |
| `--tinta` | `#3A3132` | Texto principal |
| `--tinta-suave` | `#6E6263` | Texto secundario |

### 4.2 Componentes del catálogo

- **`.categorias`**: grilla de 3 columnas en escritorio, 2 en tablet y 1 en celular.
- **`.categoria__boton`**: tarjeta clickeable con foto representativa, nombre,
  descripción y llamada "Ver galería". Hover con elevación suave y zoom de imagen.
- **`.categoria--vacia`**: variante para categorías sin fotos, con placeholder y
  leyenda "Próximamente".
- **`.galeria`**: `<dialog>` nativo con dos vistas:
  - **Grilla**: todas las fotos de la categoría.
  - **Foto ampliada**: visor con imagen, producto, miniaturas y navegación.

### 4.3 Responsive
- **Escritorio:** 3 columnas de categorías; galería de hasta 1120 px.
- **Tablet (≤1023 px):** 2 columnas.
- **Celular (≤767 px):** galería en 2 columnas y flechas sobre la imagen.
- **Celular chico (≤559 px):** 1 columna; galería a pantalla completa.
- **≤379 px:** grilla de fotos en 1 columna.

### 4.4 Accesibilidad
- Botones reales para categorías y fotos, con `aria-label` descriptivo.
- `<dialog>` nativo: foco atrapado y cierre con Escape.
- Escape primero reduce el zoom, luego vuelve a la grilla y por último cierra.
- Navegación con flechas izquierda/derecha en la vista de foto.
- `aria-live` en el contador de posición.
- Miniaturas con `aria-current`.
- `prefers-reduced-motion` desactiva animaciones.
- Foco devuelto al elemento que abrió la galería al cerrar.

---

## 5. Modelo de datos del catálogo

`js/catalogo.js` define `window.BELMA_CATALOGO`, un array de categorías:

```js
{
  id: "accesorios",              // coincide con img/accesorios/
  nombre: "Accesorios",
  descripcion: "Piezas textiles para organizar, guardar y llevar lo esencial.",
  productos: [
    {
      nombre: "Organizador de tela",
      descripcion: "Organizador textil para mantener todo en orden.",
      fotos: [
        {
          src: "img/accesorios/accesorio.jpeg",
          alt: "Organizador de tela confeccionado a mano"
        }
      ]
    }
  ]
}
```

### Reglas
- `id` debe coincidir con la carpeta de `img/`, en minúsculas y sin espacios.
- `fotos` puede tener cero, una o varias imágenes.
- La primera foto del primer producto con imágenes se usa como portada de la
  tarjeta de categoría.
- La galería aplana todas las fotos de todos los productos de la categoría.
- Un producto sin fotos sigue existiendo, pero no aporta imágenes a la galería.
- Una categoría con todos los productos sin fotos se muestra como "Próximamente".

---

## 6. Organización actual del catálogo

| # | Categoría | `id` | Productos | Fotos |
|---|---|---|---|---|
| 1 | Accesorios | `accesorios` | 6 | 6 |
| 2 | Indumentaria | `indumentaria` | 2 | 3 |
| 3 | Disfraces | `disfraces` | 1 | 1 |
| 4 | Kits | `kits` | 2 | 2 |
| 5 | Muñecos y juguetes | `munecos` | 4 | 5 |
| 6 | Polleras tradicionales | `polleras` | 1 | 2 |
| 7 | Vestidos | `vestidos` | 1 | 2 |
| 8 | Artículos para bebé | `bebes` | 3 | 3 |
| 9 | Hogar | `hogar` | 4 | 0 |

**Totales:** 24 productos y 24 fotografías.

### Inventario de fotografías

```text
img/accesorios/      accesorio.jpeg, accesorio1.jpeg, cartuchera.jpeg,
                     portapelota.jpeg, portatasa.jpeg, nesecerparabb.jpeg
img/indumentaria/    camisa.jpeg, remeratrabajo.jpeg, remeratrabajo1.jpeg
img/disfraces/       disfras.jpeg
img/kits/            kitdepicnic.jpeg, kitdetoallitas.jpeg
img/munecos/         muñeca.jpeg, muñeca1.jpeg, muñeco.jpeg,
                     peluchepedagogico.jpeg, titiritero.jpeg
img/polleras/        polleratradicional.jpeg, polleratradicional1.jpeg
img/vestidos/        vestido.jpeg, vestido1.jpeg
img/bebes/           nidoparabb.jpeg, salidadebañobb.jpeg, tollitaparabb.jpeg
img/hogar/           (sin fotografías por ahora)
```

Los nombres originales se conservaron, incluidos los que llevan acentos o `ñ`.
No es necesario renombrarlos.

---

## 7. Comportamiento de la galería

### Apertura
1. Se hace clic en una tarjeta de categoría o en el botón de destacados.
2. `abrirCategoria()` busca la categoría en `window.BELMA_CATALOGO`.
3. Se juntan todas las fotos de sus productos.
4. Se dibuja la grilla y se abre el `<dialog>` con `showModal()`.
5. El foco pasa al botón de cerrar y se bloquea el scroll del cuerpo.

### Grilla
- Cada foto es un botón con imagen y nombre del producto.
- Al hacer clic se abre la vista ampliada en esa foto.
- Si la categoría no tiene fotos, se oculta la grilla y se muestra el bloque
  "Próximamente" con un texto específico de la categoría.

### Vista ampliada
- Imagen protagonista, nombre y descripción del producto.
- Contador "n / total" con `aria-live`.
- Flechas anterior/siguiente (con vuelta circular).
- Miniaturas para saltar a otra foto.
- Botón **Ampliar / Reducir** y doble clic sobre la imagen.
- En zoom, la imagen se agranda al 200 % y el escenario permite desplazarse.
- Deslizar el dedo hacia los costados cambia de foto en celular.
- Escape reduce el zoom, luego vuelve a la grilla y finalmente cierra.
- "Volver" regresa a la grilla y devuelve el foco a la foto de origen.

### Cierre
- Botón de cerrar, clic en el fondo o Escape (cuando corresponde).
- Se restaura el scroll y el foco vuelve al disparador.

---

## 8. Mantenimiento

### Agregar una fotografía
1. Guardarla en `img/<categoría>/`.
2. Agregar un objeto `{ src, alt }` dentro de `fotos` del producto en
   `js/catalogo.js`.
3. Usar un `alt` que describa la imagen.

### Agregar un producto
1. Copiar un bloque de producto dentro de la categoría elegida.
2. Cambiar `nombre`, `descripcion` y `fotos`.
3. Guardar y recargar.

### Crear una categoría
1. Crear `img/<nueva-categoria>/`.
2. Copiar un bloque de categoría en `js/catalogo.js`.
3. Cambiar `id`, `nombre`, `descripcion` y `productos`.
4. Si no hay fotos, dejar `fotos: []` para mostrar "Próximamente".

### Cambiar datos de contacto
Editar `js/config.js`. Mientras los valores estén vacíos, los enlaces muestran
un aviso y no abren destinos inventados.

### Reemplazar portada o foto del taller
Cambiar el `src` y el `alt` en `index.html`:
- `img/placeholder-portada.svg` → foto principal.
- `img/placeholder-taller.svg` → foto del taller o del proceso.

---

## 9. Verificaciones recomendadas

- [ ] La página abre sin errores en la consola.
- [ ] Se ven las 9 tarjetas de categoría.
- [ ] Cada tarjeta con fotos abre su galería y muestra todas las imágenes.
- [ ] Hogar abre la galería con el estado "Próximamente".
- [ ] El botón de destacados abre la galería de bebés.
- [ ] Las flechas, miniaturas, teclado y swipe funcionan.
- [ ] El zoom amplía y reduce; el desplazamiento funciona.
- [ ] Escape y el botón de cerrar cierran correctamente.
- [ ] El foco vuelve al elemento de origen.
- [ ] Se ve bien a 375 px, 800 px y 1180 px de ancho.
- [ ] Las imágenes faltantes muestran el placeholder de respaldo.
- [ ] El menú móvil sigue funcionando.

---

## 10. Notas y próximos pasos

- Incorporar las fotografías de **Hogar** cuando estén disponibles.
- Completar los enlaces de contacto en `js/config.js`.
- Reemplazar los placeholders de portada y "Sobre nosotros" por fotos reales.
- Comprimir las imágenes antes de publicar.
- No hace falta tocar `index.html` para agregar productos o fotos: todo se
  gestiona desde `js/catalogo.js`.
