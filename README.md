# BelmaCreaciones — Sitio web

Sitio estático desarrollado con **HTML5, CSS3 y JavaScript**, sin frameworks ni
procesos de compilación. Está preparado para funcionar en cualquier hosting común
(Netlify, Vercel, GitHub Pages o un servidor propio).

> Las fotografías, los precios y los datos de contacto **no están inventados**.
> Las fotografías disponibles son las aportadas por el emprendimiento, se
> incorporan progresivamente y los enlaces de contacto están vacíos a propósito
> en `js/config.js`.

---

## 1. Cómo ver el sitio

### Opción rápida
Abrir `index.html` con doble clic. Funciona directamente en el navegador.

### Opción recomendada (servidor local)
Permite probar rutas y comportamiento de servidor real. Con Visual Studio Code:

1. Instalar la extensión **Live Server**.
2. Abrir la carpeta del proyecto.
3. Hacer clic derecho sobre `index.html` → **Open with Live Server**.

También se puede usar Python si está instalado:

```bash
python -m http.server 8000
```

Luego abrir `http://localhost:8000` en el navegador.

---

## 2. Estructura de archivos

```text
Quad core/
├── index.html                     Página completa (contenido y estructura)
├── robots.txt                     Instrucciones para buscadores
├── README.md                      Esta guía
├── RESUMEN-TECNICO.md             Resumen técnico del proyecto
├── css/
│   └── estilos.css                Estilos, animaciones, galería y responsive
├── js/
│   ├── config.js                  Enlaces de contacto y mensajes de WhatsApp
│   ├── catalogo.js                Categorías, productos y fotografías
│   └── main.js                    Menú, categorías, galería y animaciones
└── img/
    ├── favicon.svg                Ícono de la pestaña
    ├── placeholder-producto.svg   Respaldo temporal de las fotografías
    ├── placeholder-portada.svg    Respaldo temporal de la portada
    ├── placeholder-taller.svg     Respaldo temporal de "Sobre nosotros"
    ├── accesorios/                Organizadores, cartucheras, neceser, etc.
    ├── indumentaria/              Camisas y remeras de trabajo
    ├── disfraces/                 Disfraces personalizados
    ├── kits/                      Kit de picnic y kit de toallitas
    ├── munecos/                   Muñecas, muñecos, peluches y teatrino
    ├── polleras/                  Polleras tradicionales
    ├── vestidos/                  Vestidos personalizados
    ├── bebes/                     Nidos, salidas de baño y toallitas
    └── hogar/                     Sábanas, almohadones e individuales
```

### Qué hace cada archivo

- **`index.html`**: contiene el encabezado, la portada, las secciones, el espacio
  donde se dibujan las categorías, la galería, los destacados, el pie y los
  enlaces a los archivos de estilo y scripts.
- **`css/estilos.css`**: define la identidad visual (colores, tipografías,
  espaciados), las tarjetas, los botones, la galería y las adaptaciones para
  celular y tablet. Arriba de todo hay un índice con las secciones del archivo.
- **`js/config.js`**: único lugar para cargar el número de WhatsApp y los perfiles
  sociales. Mientras estén vacíos, la página muestra un aviso al hacer clic.
- **`js/catalogo.js`**: **único lugar donde se edita el catálogo**. Guarda las
  categorías, los productos y las fotografías de cada producto.
- **`js/main.js`**: controla el menú móvil, el dibujado de las categorías, la
  galería con zoom, el enlace activo, las animaciones suaves y el respaldo de
  imágenes.
- **`img/`**: carpeta principal de fotografías, organizada por categoría.

---

## 3. Cómo agregar nuevas fotografías

Las fotografías se guardan dentro de `img/`, en la subcarpeta de su categoría.
Después se declaran en `js/catalogo.js` para que la galería las encuentre.

1. Copiar la foto a la carpeta correspondiente. Por ejemplo:

```text
img/accesorios/cartuchera-flores.jpeg
img/bebes/nido-rosa.jpeg
img/hogar/almohadon-lino.jpeg
```

2. Abrir `js/catalogo.js` y buscar el producto. Agregar un objeto dentro de su
   array `fotos`:

```js
{
  nombre: "Cartucheras",
  descripcion: "Cartucheras de tela confeccionadas a mano.",
  fotos: [
    {
      src: "img/accesorios/cartuchera.jpeg",
      alt: "Cartuchera de tela confeccionada a mano"
    },
    {
      src: "img/accesorios/cartuchera-flores.jpeg",
      alt: "Cartuchera de tela con estampado floral"
    }
  ]
}
```

3. El **`alt`** debe describir lo que se ve en la foto, no repetir el nombre del
   producto sin más. Es importante para accesibilidad y para buscadores.

La primera fotografía del primer producto con imágenes se usa como portada de la
tarjeta de categoría. La galería muestra **todas** las fotos de **todos** los
productos de esa categoría.

### Recomendaciones para las fotos
- Formato `.webp`, `.jpg` o `.jpeg`.
- Ancho aproximado de 1200 px para las imágenes de producto.
- Peso menor a 300 KB por imagen para que la página cargue rápido.
- Luz natural, fondo limpio y una misma estética para todo el catálogo.
- Evitar fotos con el producto muy pequeño o con mucho espacio vacío.
- Se pueden conservar los nombres actuales; no hace falta renombrarlos.

Si una ruta de imagen es incorrecta, `main.js` muestra automáticamente el
placeholder `img/placeholder-producto.svg` como respaldo.

---

## 4. Cómo configurar WhatsApp y redes sociales

Abrir `js/config.js` y completar los valores:

```js
window.BELMA_CONFIG = {
  whatsapp: "549XXXXXXXXXX", // solo números, con código de país
  instagram: "https://www.instagram.com/...",
  facebook: "https://www.facebook.com/...",
  mensajeGeneral: "Hola BelmaCreaciones, quisiera hacer una consulta.",
  mensajeProducto: "Hola BelmaCreaciones, quisiera consultar por: {producto}."
};
```

- En `whatsapp` **no** se deben incluir `+`, espacios ni guiones.
- Al completar un enlace, los botones dejan de mostrar "Enlace provisional"
  y abren el destino en una pestaña nueva.
- Los botones "Consultar" de cada tarjeta arman automáticamente un mensaje con
  el nombre del producto.

---

## 5. Cómo agregar o editar productos y categorías

Todo el catálogo se edita en **`js/catalogo.js`**. No hace falta tocar el HTML.

### Agregar un producto a una categoría existente

1. Abrir `js/catalogo.js`.
2. Buscar la categoría y copiar un producto completo dentro de su array
   `productos`.
3. Cambiar `nombre`, `descripcion` y `fotos`:

```js
{
  nombre: "Nombre del producto",
  descripcion: "Breve descripción artesanal del producto.",
  fotos: [
    {
      src: "img/accesorios/nombre-del-archivo.jpeg",
      alt: "Descripción real de la fotografía"
    }
  ]
}
```

4. Guardar. La tarjeta y la galería se actualizan solas al recargar la página.

### Crear una categoría nueva

1. Crear su carpeta dentro de `img/`, por ejemplo `img/nueva-categoria/`.
2. Copiar un bloque completo de categoría en `js/catalogo.js` y cambiar:
   - `id`: debe coincidir con el nombre de la carpeta, en minúsculas y sin
     espacios (ejemplo: `"nueva-categoria"`).
   - `nombre`: el título visible.
   - `descripcion`: una frase breve.
   - `productos`: los productos de esa categoría.
3. Si todavía no hay fotografías, dejar los arrays `fotos` vacíos (`[]`). La
   tarjeta mostrará "Próximamente" y la galería un aviso, sin ocultar la
   categoría.

> Los `id` actuales son: `accesorios`, `indumentaria`, `disfraces`, `kits`,
> `munecos`, `polleras`, `vestidos`, `bebes` y `hogar`.

---

## 6. Qué revisar para entender el código

### En `index.html`
- La estructura semántica: `header`, `main`, `section`, `article`, `footer`.
- Los `id` de las secciones (`inicio`, `sobre-nosotros`, `catalogo`,
  `destacados`, `contacto`) y cómo coinciden con los enlaces del menú.
- El contenedor `#grid-categorias`, donde JavaScript dibuja las tarjetas.
- El diálogo `#galeria`, con la vista de grilla y la vista de foto ampliada.
- Los atributos `data-*`: conectan el HTML con el JavaScript.

### En `css/estilos.css`
- El bloque `:root` contiene la paleta y las tipografías. Cambiar una variable
  actualiza todo el sitio.
- Las clases con `__` son partes de un mismo componente (por ejemplo,
  `categoria__media`, `galeria__visor-cabecera`).
- El bloque **09** contiene las categorías, las tarjetas y la galería.
- Las media queries del final adaptan el diseño a tablets y celulares.
- `prefers-reduced-motion` desactiva las animaciones para quien lo necesita.

### En `js/main.js`
- `renderCategorias()` dibuja las tarjetas a partir de `js/catalogo.js`.
- `configurarGaleria()` controla la apertura, la grilla, el visor, el zoom,
  las miniaturas, el teclado y los gestos táctiles.
- `configurarEnlaces()` decide si un enlace está listo o sigue provisional.
- `abrirMenu()` y `cerrarMenu()` controlan el panel móvil.
- `configurarApariciones()` usa `IntersectionObserver` para animar al hacer scroll.

---

## 7. Lista de verificación antes de publicar

- [ ] Incorporar las fotografías que falten en `img/<categoría>/`.
- [ ] Declarar cada foto nueva en `js/catalogo.js` con un `alt` real.
- [ ] Completar WhatsApp, Instagram y Facebook en `js/config.js`.
- [ ] Revisar que los enlaces abran los perfiles correctos.
- [ ] Confirmar que no queden textos de ejemplo o notas de desarrollo.
- [ ] Probar la navegación en celular, tablet y escritorio.
- [ ] Verificar que el menú móvil abra y cierre correctamente.
- [ ] Probar las galerías: abrir, recorrer, ampliar y cerrar.
- [ ] Comprimir las imágenes antes de subirlas al hosting.
- [ ] Actualizar el título y la descripción del `<head>` si cambia la propuesta.

---

## 8. Notas de diseño

- **Rosa pastel** `#F8E7E5` para fondos y detalles.
- **Rosa empolvado** `#9E6266` para botones y acentos.
- **Blanco crema** `#FDFAF6` y **beige** `#F2E8DD` como base.
- Tipografía **Cormorant Garamond** para títulos y **Jost** para textos.
- Detalles de costura: líneas punteadas, carretes, botones y agujas dibujados
  como íconos SVG.
- Las categorías sin fotos conservan su lugar con un estado "Próximamente",
  sin romper la grilla ni la estética.

Los colores y las tipografías se pueden cambiar desde `:root` en
`css/estilos.css`.
