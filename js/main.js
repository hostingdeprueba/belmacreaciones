/* ==========================================================================
   BELMACREACIONES — Interacciones de la página
   --------------------------------------------------------------------------
   Contenido:
   01. Utilidades y aviso flotante
   02. Enlaces de contacto configurables
   03. Consultas por producto
   04. Menú móvil accesible
   05. Encabezado, botón de subida y año
   06. Enlace activo según la sección visible
   07. Animaciones de aparición
   08. Categorías y galería del catálogo
   09. Imágenes de respaldo
   ========================================================================== */

(function () {
  "use strict";

  const config = window.BELMA_CONFIG || {};
  const catalogo = Array.isArray(window.BELMA_CATALOGO)
    ? window.BELMA_CATALOGO
    : [];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const $ = (selector, contexto = document) => contexto.querySelector(selector);
  const $$ = (selector, contexto = document) =>
    Array.from(contexto.querySelectorAll(selector));


  /* ========================================================================
     01. UTILIDADES Y AVISO FLOTANTE
     ======================================================================== */

  const aviso = $("#aviso");
  let temporizadorAviso = null;

  function mostrarAviso(mensaje) {
    if (!aviso) return;

    aviso.textContent = mensaje;
    aviso.classList.add("aviso--visible");

    window.clearTimeout(temporizadorAviso);
    temporizadorAviso = window.setTimeout(function () {
      aviso.classList.remove("aviso--visible");
    }, 4200);
  }

  function limpiarTexto(valor) {
    return typeof valor === "string" ? valor.trim() : "";
  }

  function normalizarUrl(valor) {
    const url = limpiarTexto(valor);
    if (!url) return "";
    if (/^https?:\/\//i.test(url)) return url;
    return "https://" + url;
  }

  function construirUrlWhatsApp(numero, mensaje) {
    const digitos = limpiarTexto(numero).replace(/\D/g, "");
    if (!digitos) return "";
    return "https://wa.me/" + digitos + "?text=" + encodeURIComponent(mensaje);
  }

  function mensajeGeneral() {
    return (
      limpiarTexto(config.mensajeGeneral) ||
      "Hola BelmaCreaciones, quisiera hacer una consulta."
    );
  }

  function mensajePorProducto(producto) {
    const plantilla =
      limpiarTexto(config.mensajeProducto) ||
      "Hola BelmaCreaciones, quisiera consultar por: {producto}.";

    return plantilla.replace("{producto}", producto);
  }

  const destinos = {
    whatsapp: function () {
      return construirUrlWhatsApp(config.whatsapp, mensajeGeneral());
    },
    instagram: function () {
      return normalizarUrl(config.instagram);
    },
    facebook: function () {
      return normalizarUrl(config.facebook);
    }
  };


  /* ========================================================================
     02. ENLACES DE CONTACTO CONFIGURABLES
     ======================================================================== */

  function configurarEnlaces() {
    $$("[data-enlace]").forEach(function (enlace) {
      const tipo = enlace.dataset.enlace;
      const obtenerDestino = destinos[tipo];

      if (!obtenerDestino) return;

      const url = obtenerDestino();
      const estado = enlace.querySelector("[data-estado]");

      if (!url) {
        enlace.classList.add("es-provisional");
        enlace.setAttribute("aria-disabled", "true");
        if (estado) estado.hidden = false;

        enlace.addEventListener("click", function (evento) {
          evento.preventDefault();
          mostrarAviso("Este enlace estará disponible próximamente.");
        });
        return;
      }

      enlace.href = url;
      enlace.target = "_blank";
      enlace.rel = "noopener noreferrer";
      enlace.classList.remove("es-provisional");
      enlace.removeAttribute("aria-disabled");
      if (estado) estado.hidden = true;
    });
  }


  /* ========================================================================
     03. CONSULTAS POR PRODUCTO
     ======================================================================== */

  function configurarConsultas() {
    $$("[data-consulta]").forEach(function (boton) {
      boton.addEventListener("click", function () {
        const producto = boton.dataset.consulta || "un producto";
        const url = construirUrlWhatsApp(
          config.whatsapp,
          mensajePorProducto(producto)
        );

        if (!url) {
          mostrarAviso(
            "Las consultas por WhatsApp estarán disponibles próximamente."
          );
          return;
        }

        window.open(url, "_blank", "noopener,noreferrer");
      });
    });
  }


  /* ========================================================================
     04. MENÚ MÓVIL ACCESIBLE
     ======================================================================== */

  const menuToggle = $("#menu-toggle");
  const nav = $("#nav-principal");
  const velo = $("#velo");
  const cerrarMenuBoton = $("#cerrar-menu");
  let ultimoFoco = null;

  function menuEstaAbierto() {
    return Boolean(nav && nav.classList.contains("abierto"));
  }

  function abrirMenu() {
    if (!nav) return;

    ultimoFoco = document.activeElement;
    nav.classList.add("abierto");
    document.body.classList.add("menu-abierto");
    if (velo) velo.classList.add("visible");
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute("aria-label", "Cerrar menú");
    }

    window.setTimeout(function () {
      const primerElemento = nav.querySelector("a, button");
      if (primerElemento && menuEstaAbierto()) primerElemento.focus();
    }, 100);
  }

  function cerrarMenu() {
    if (!nav || !menuEstaAbierto()) return;

    nav.classList.remove("abierto");
    document.body.classList.remove("menu-abierto");
    if (velo) velo.classList.remove("visible");
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
    }

    if (
      ultimoFoco &&
      typeof ultimoFoco.focus === "function" &&
      ultimoFoco.offsetParent !== null
    ) {
      ultimoFoco.focus();
    }
    ultimoFoco = null;
  }

  function mantenerFocoEnMenu(evento) {
    if (evento.key !== "Tab" || !nav) return;

    const enfocables = $$("a[href], button:not([disabled])", nav).filter(
      function (elemento) {
        return elemento.offsetParent !== null;
      }
    );

    if (!enfocables.length) return;

    const primero = enfocables[0];
    const ultimo = enfocables[enfocables.length - 1];

    if (evento.shiftKey && document.activeElement === primero) {
      evento.preventDefault();
      ultimo.focus();
    } else if (!evento.shiftKey && document.activeElement === ultimo) {
      evento.preventDefault();
      primero.focus();
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      if (menuEstaAbierto()) {
        cerrarMenu();
      } else {
        abrirMenu();
      }
    });
  }

  if (cerrarMenuBoton) {
    cerrarMenuBoton.addEventListener("click", cerrarMenu);
  }

  if (velo) {
    velo.addEventListener("click", cerrarMenu);
  }

  $$(".nav__enlace").forEach(function (enlace) {
    enlace.addEventListener("click", cerrarMenu);
  });

  document.addEventListener("keydown", function (evento) {
    if (!menuEstaAbierto()) return;

    if (evento.key === "Escape") {
      cerrarMenu();
      return;
    }

    mantenerFocoEnMenu(evento);
  });

  const escritorio = window.matchMedia("(min-width: 900px)");
  if (typeof escritorio.addEventListener === "function") {
    escritorio.addEventListener("change", function (evento) {
      if (evento.matches) cerrarMenu();
    });
  }


  /* ========================================================================
     05. ENCABEZADO, BOTÓN DE SUBIDA Y AÑO
     ======================================================================== */

  const cabecera = $("#cabecera");
  const volverArriba = $("#volver-arriba");
  const anio = $("#anio");
  let actualizandoScroll = false;

  function revisarScroll() {
    if (actualizandoScroll) return;
    actualizandoScroll = true;

    window.requestAnimationFrame(function () {
      const posicion = window.scrollY;

      if (cabecera) {
        cabecera.classList.toggle("cabecera--compacta", posicion > 10);
      }

      if (volverArriba) {
        volverArriba.classList.toggle("visible", posicion > 600);
      }

      actualizandoScroll = false;
    });
  }

  window.addEventListener("scroll", revisarScroll, { passive: true });
  revisarScroll();

  if (anio) {
    anio.textContent = String(new Date().getFullYear());
  }


  /* ========================================================================
     06. ENLACE ACTIVO SEGÚN LA SECCIÓN VISIBLE
     ======================================================================== */

  function configurarNavegacionActiva() {
    if (!("IntersectionObserver" in window)) return;

    const ids = ["inicio", "sobre-nosotros", "catalogo", "contacto"];
    const secciones = ids
      .map(function (id) {
        return document.getElementById(id);
      })
      .filter(Boolean);

    const enlaces = $$(".nav__enlace");
    if (!secciones.length || !enlaces.length) return;

    const observador = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (!entrada.isIntersecting) return;

          const destino = "#" + entrada.target.id;

          enlaces.forEach(function (enlace) {
            const activo = enlace.getAttribute("href") === destino;
            enlace.classList.toggle("esta-activo", activo);

            if (activo) {
              enlace.setAttribute("aria-current", "location");
            } else {
              enlace.removeAttribute("aria-current");
            }
          });
        });
      },
      { rootMargin: "-42% 0px -52% 0px", threshold: 0 }
    );

    secciones.forEach(function (seccion) {
      observador.observe(seccion);
    });
  }


  /* ========================================================================
     07. ANIMACIONES DE APARICIÓN
     ======================================================================== */

  function configurarApariciones() {
    const elementos = $$(".revelar");
    if (!elementos.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      elementos.forEach(function (elemento) {
        elemento.classList.add("es-visible");
      });
      return;
    }

    const observador = new IntersectionObserver(
      function (entradas, obs) {
        entradas.forEach(function (entrada) {
          if (!entrada.isIntersecting) return;
          entrada.target.classList.add("es-visible");
          obs.unobserve(entrada.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    elementos.forEach(function (elemento) {
      observador.observe(elemento);
    });
  }


  /* ========================================================================
     08. CATEGORÍAS Y GALERÍA DEL CATÁLOGO
     ======================================================================== */

  const SVG_NS = "http://www.w3.org/2000/svg";
  const FALLBACK_IMG = "img/placeholder-producto.svg";

  const PLACEHOLDER_SVG =
    '<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">' +
    '<rect x="13" y="8" width="22" height="5" rx="2.5" fill="currentColor"/>' +
    '<rect x="13" y="35" width="22" height="5" rx="2.5" fill="currentColor"/>' +
    '<rect x="17" y="13" width="14" height="22" rx="3" stroke="currentColor" stroke-width="1.6"/>' +
    '<path d="M21 17v14M24 17v14M27 17v14" stroke="currentColor" stroke-width="1.2" opacity=".55"/>' +
    "</svg>";

  function crearIcono(d) {
    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("class", "icono");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");

    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", d);
    svg.appendChild(path);

    return svg;
  }

  function fotosDeCategoria(categoria) {
    const fotos = [];

    if (!categoria || !Array.isArray(categoria.productos)) return fotos;

    categoria.productos.forEach(function (producto) {
      if (!producto || !Array.isArray(producto.fotos)) return;

      producto.fotos.forEach(function (foto) {
        if (!foto || typeof foto.src !== "string" || !foto.src.trim()) return;

        fotos.push({
          src: foto.src.trim(),
          alt: limpiarTexto(foto.alt) || producto.nombre || "Fotografía de producto",
          producto: limpiarTexto(producto.nombre) || "Producto",
          descripcion: limpiarTexto(producto.descripcion)
        });
      });
    });

    return fotos;
  }

  function textoCantidadFotos(cantidad) {
    return cantidad === 1 ? "1 foto" : cantidad + " fotos";
  }

  function crearTarjetaCategoria(categoria) {
    const fotos = fotosDeCategoria(categoria);
    const vacia = fotos.length === 0;

    const articulo = document.createElement("article");
    articulo.className = "categoria" + (vacia ? " categoria--vacia" : "");

    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "categoria__boton";
    boton.dataset.categoria = categoria.id;
    boton.setAttribute("aria-haspopup", "dialog");
    boton.setAttribute(
      "aria-label",
      vacia
        ? categoria.nombre + " — Próximamente"
        : "Abrir la galería de " +
            categoria.nombre +
            ", " +
            textoCantidadFotos(fotos.length)
    );

    const media = document.createElement("span");
    media.className = "categoria__media";

    if (!vacia) {
      const imagen = document.createElement("img");
      imagen.src = fotos[0].src;
      imagen.alt = fotos[0].alt;
      imagen.loading = "lazy";
      imagen.decoding = "async";
      imagen.width = 800;
      imagen.height = 600;
      imagen.dataset.fallback = FALLBACK_IMG;
      media.appendChild(imagen);

      const insignia = document.createElement("span");
      insignia.className = "categoria__insignia";
      insignia.textContent = textoCantidadFotos(fotos.length);
      media.appendChild(insignia);
    } else {
      const placeholder = document.createElement("span");
      placeholder.className = "categoria__placeholder";
      placeholder.innerHTML = PLACEHOLDER_SVG + "<span>Próximamente</span>";
      media.appendChild(placeholder);
    }

    const cuerpo = document.createElement("span");
    cuerpo.className = "categoria__cuerpo";

    const nombre = document.createElement("span");
    nombre.className = "categoria__nombre";
    nombre.textContent = categoria.nombre || "Categoría";
    cuerpo.appendChild(nombre);

    if (limpiarTexto(categoria.descripcion)) {
      const descripcion = document.createElement("span");
      descripcion.className = "categoria__descripcion";
      descripcion.textContent = categoria.descripcion;
      cuerpo.appendChild(descripcion);
    }

    const accion = document.createElement("span");
    accion.className = "categoria__accion";

    const accionTexto = document.createElement("span");
    accionTexto.textContent = vacia ? "Próximamente" : "Ver galería";
    accion.appendChild(accionTexto);

    if (!vacia) {
      accion.appendChild(crearIcono("M4 12h15M13 6l6 6-6 6"));
    }

    cuerpo.appendChild(accion);
    boton.appendChild(media);
    boton.appendChild(cuerpo);
    articulo.appendChild(boton);

    return articulo;
  }

  function renderCategorias() {
    const contenedor = $("#grid-categorias");
    if (!contenedor || !catalogo.length) return;

    const fragmento = document.createDocumentFragment();

    catalogo.forEach(function (categoria) {
      if (!categoria || !categoria.id) return;
      fragmento.appendChild(crearTarjetaCategoria(categoria));
    });

    contenedor.innerHTML = "";
    contenedor.appendChild(fragmento);
  }


  /* --- Galería ------------------------------------------------------------ */

  const galeria = $("#galeria");

  function configurarGaleria() {
    if (!galeria) return;

    const cerrarBoton = $("#galeria-cerrar");
    const vistaGrilla = $('[data-vista="grilla"]', galeria);
    const vistaFoto = $('[data-vista="foto"]', galeria);
    const grilla = $("#galeria-grid");
    const vacio = $("#galeria-vacio");
    const vacioTexto = $("#galeria-vacio-texto");
    const volverBoton = $("#galeria-volver");
    const posicion = $("#galeria-posicion");
    const zoomBoton = $("#galeria-zoom");
    const zoomTexto = zoomBoton ? $("span", zoomBoton) : null;
    const escenario = $("#galeria-escenario");
    const anterior = $("#galeria-anterior");
    const siguiente = $("#galeria-siguiente");
    const imagen = $("#galeria-imagen");
    const productoNombre = $("#galeria-producto");
    const productoDesc = $("#galeria-producto-desc");
    const miniaturas = $("#galeria-miniaturas");
    const titulo = $("#galeria-titulo");
    const descripcion = $("#galeria-descripcion");
    const contador = $("#galeria-contador");

    let categoriaActual = null;
    let fotosActuales = [];
    let indiceActual = 0;
    let disparador = null;
    let toqueX = null;
    let toqueY = null;

    function vistaFotoVisible() {
      return Boolean(vistaFoto && !vistaFoto.hidden);
    }

    function mostrarVista(nombre) {
      if (vistaGrilla) vistaGrilla.hidden = nombre !== "grilla";
      if (vistaFoto) vistaFoto.hidden = nombre !== "foto";
      if (nombre === "grilla" && cerrarBoton) {
        cerrarBoton.focus({ preventScroll: true });
      }
    }

    function zoomActivo() {
      return Boolean(escenario && escenario.classList.contains("es-zoom"));
    }

    function resetZoom() {
      if (!escenario || !zoomBoton) return;

      escenario.classList.remove("es-zoom");
      zoomBoton.setAttribute("aria-pressed", "false");
      if (zoomTexto) zoomTexto.textContent = "Ampliar";
      escenario.scrollTop = 0;
      escenario.scrollLeft = 0;
    }

    function alternarZoom() {
      if (!escenario || !zoomBoton || !vistaFotoVisible()) return;

      const activo = escenario.classList.toggle("es-zoom");
      zoomBoton.setAttribute("aria-pressed", String(activo));
      if (zoomTexto) zoomTexto.textContent = activo ? "Reducir" : "Ampliar";

      if (activo) {
        window.requestAnimationFrame(function () {
          escenario.scrollLeft =
            (escenario.scrollWidth - escenario.clientWidth) / 2;
          escenario.scrollTop =
            (escenario.scrollHeight - escenario.clientHeight) / 2;
        });
      } else {
        escenario.scrollTop = 0;
        escenario.scrollLeft = 0;
      }
    }

    function marcarMiniaturaActiva() {
      if (!miniaturas) return;

      $$(".galeria__mini", miniaturas).forEach(function (mini) {
        const activa = Number(mini.dataset.indice) === indiceActual;
        mini.classList.toggle("esta-activo", activa);
        mini.setAttribute("aria-current", activa ? "true" : "false");
      });
    }

    function renderMiniaturas() {
      if (!miniaturas) return;

      miniaturas.innerHTML = "";

      if (fotosActuales.length < 2) {
        miniaturas.hidden = true;
        return;
      }

      miniaturas.hidden = false;

      fotosActuales.forEach(function (foto, indice) {
        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "galeria__mini";
        boton.dataset.indice = String(indice);
        boton.setAttribute(
          "aria-label",
          "Ver la fotografía " + (indice + 1) + " de " + fotosActuales.length
        );

        const miniImagen = document.createElement("img");
        miniImagen.src = foto.src;
        miniImagen.alt = "";
        miniImagen.loading = "lazy";
        miniImagen.dataset.fallback = FALLBACK_IMG;

        boton.appendChild(miniImagen);
        miniaturas.appendChild(boton);
      });
    }

    function mostrarFoto(indice) {
      if (!fotosActuales.length) return;

      const total = fotosActuales.length;
      indiceActual = ((indice % total) + total) % total;

      const foto = fotosActuales[indiceActual];

      if (imagen) {
        imagen.src = foto.src;
        imagen.alt = foto.alt;
        imagen.dataset.fallback = FALLBACK_IMG;
      }

      if (productoNombre) productoNombre.textContent = foto.producto;
      if (productoDesc) productoDesc.textContent = foto.descripcion;
      if (posicion) posicion.textContent = indiceActual + 1 + " / " + total;

      const hayVarias = total > 1;
      if (anterior) anterior.hidden = !hayVarias;
      if (siguiente) siguiente.hidden = !hayVarias;

      marcarMiniaturaActiva();
      resetZoom();
      mostrarVista("foto");

      if (escenario) {
        escenario.scrollTop = 0;
        escenario.scrollLeft = 0;
      }
    }

    function navegar(paso) {
      if (fotosActuales.length < 2) return;
      mostrarFoto(indiceActual + paso);
    }

    function renderGrilla() {
      if (!grilla) return;

      grilla.innerHTML = "";

      if (!fotosActuales.length) {
        grilla.hidden = true;
        if (vacio) vacio.hidden = false;
        if (vacioTexto) {
          vacioTexto.textContent =
            "Estamos preparando las fotografías de " +
            (categoriaActual ? categoriaActual.nombre : "esta categoría") +
            ". Próximamente habrá nuevos productos para descubrir.";
        }
        return;
      }

      grilla.hidden = false;
      if (vacio) vacio.hidden = true;

      const fragmento = document.createDocumentFragment();

      fotosActuales.forEach(function (foto, indice) {
        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "galeria__item";
        boton.dataset.indice = String(indice);
        boton.setAttribute(
          "aria-label",
          "Ampliar " + foto.producto + ": " + foto.alt
        );

        const imagenItem = document.createElement("img");
        imagenItem.src = foto.src;
        imagenItem.alt = foto.alt;
        imagenItem.loading = "lazy";
        imagenItem.decoding = "async";
        imagenItem.width = 800;
        imagenItem.height = 600;
        imagenItem.dataset.fallback = FALLBACK_IMG;

        const pie = document.createElement("span");
        pie.className = "galeria__item-pie";
        pie.textContent = foto.producto;

        boton.appendChild(imagenItem);
        boton.appendChild(pie);
        fragmento.appendChild(boton);
      });

      grilla.appendChild(fragmento);
    }

    function abrirCategoria(id, origen) {
      const categoria = catalogo.find(function (elemento) {
        return elemento && elemento.id === id;
      });

      if (!categoria) return;

      categoriaActual = categoria;
      fotosActuales = fotosDeCategoria(categoria);
      indiceActual = 0;
      disparador = origen || null;

      if (titulo) titulo.textContent = categoria.nombre || "Galería";
      if (descripcion) descripcion.textContent = limpiarTexto(categoria.descripcion);
      if (contador) {
        contador.textContent = fotosActuales.length
          ? textoCantidadFotos(fotosActuales.length) +
            " de " +
            (categoria.nombre || "la categoría")
          : "Próximamente";
      }

      renderGrilla();
      renderMiniaturas();
      resetZoom();
      mostrarVista("grilla");

      if (typeof galeria.showModal === "function" && !galeria.open) {
        galeria.showModal();
      } else {
        galeria.setAttribute("open", "");
      }

      document.body.classList.add("galeria-abierta");

      window.requestAnimationFrame(function () {
        if (cerrarBoton) cerrarBoton.focus({ preventScroll: true });
      });
    }

    function cerrarGaleria() {
      if (typeof galeria.close === "function" && galeria.open) {
        galeria.close();
      } else {
        galeria.removeAttribute("open");
        document.body.classList.remove("galeria-abierta");
      }
    }

    /* Eventos de la grilla de categorías y del botón de destacados */

    const gridCategorias = $("#grid-categorias");

    if (gridCategorias) {
      gridCategorias.addEventListener("click", function (evento) {
        const boton = evento.target.closest(".categoria__boton");
        if (!boton) return;
        abrirCategoria(boton.dataset.categoria, boton);
      });
    }

    $$("[data-galeria-destino]").forEach(function (boton) {
      boton.addEventListener("click", function () {
        abrirCategoria(boton.dataset.galeriaDestino, boton);
      });
    });

    /* Controles de la galería */

    if (cerrarBoton) cerrarBoton.addEventListener("click", cerrarGaleria);

    galeria.addEventListener("close", function () {
      document.body.classList.remove("galeria-abierta");
      resetZoom();
      mostrarVista("grilla");

      const origen = disparador;
      disparador = null;

      // Se restaura el foco en el siguiente ciclo para que no lo pise
      // la devolución automática de foco del diálogo nativo.
      window.setTimeout(function () {
        if (origen && document.contains(origen)) {
          origen.focus({ preventScroll: true });
        }
      }, 0);
    });

    galeria.addEventListener("cancel", function (evento) {
      // Escape: primero sale del zoom, luego vuelve a la grilla y por
      // último cierra el diálogo.
      if (zoomActivo()) {
        evento.preventDefault();
        resetZoom();
        return;
      }

      if (vistaFotoVisible()) {
        evento.preventDefault();
        mostrarVista("grilla");
      }
    });

    galeria.addEventListener("click", function (evento) {
      if (evento.target === galeria) cerrarGaleria();
    });

    if (grilla) {
      grilla.addEventListener("click", function (evento) {
        const boton = evento.target.closest(".galeria__item");
        if (!boton) return;
        mostrarFoto(Number(boton.dataset.indice) || 0);
      });
    }

    if (miniaturas) {
      miniaturas.addEventListener("click", function (evento) {
        const boton = evento.target.closest(".galeria__mini");
        if (!boton) return;
        mostrarFoto(Number(boton.dataset.indice) || 0);
      });
    }

    if (volverBoton) {
      volverBoton.addEventListener("click", function () {
        mostrarVista("grilla");

        const item = grilla
          ? $('.galeria__item[data-indice="' + indiceActual + '"]', grilla)
          : null;

        if (item) item.focus({ preventScroll: true });
      });
    }

    if (anterior) {
      anterior.addEventListener("click", function () {
        navegar(-1);
      });
    }

    if (siguiente) {
      siguiente.addEventListener("click", function () {
        navegar(1);
      });
    }

    if (zoomBoton) zoomBoton.addEventListener("click", alternarZoom);

    if (imagen) {
      imagen.addEventListener("dblclick", alternarZoom);
    }

    galeria.addEventListener("keydown", function (evento) {
      if (!vistaFotoVisible()) return;

      if (evento.key === "ArrowRight") {
        evento.preventDefault();
        navegar(1);
      } else if (evento.key === "ArrowLeft") {
        evento.preventDefault();
        navegar(-1);
      }
    });

    /* Gestos táctiles: deslizar para recorrer las fotos */

    if (escenario) {
      escenario.addEventListener(
        "touchstart",
        function (evento) {
          if (evento.touches.length !== 1 || zoomActivo()) {
            toqueX = null;
            return;
          }

          toqueX = evento.touches[0].clientX;
          toqueY = evento.touches[0].clientY;
        },
        { passive: true }
      );

      escenario.addEventListener(
        "touchend",
        function (evento) {
          if (toqueX === null) return;

          const toque = evento.changedTouches[0];
          const desplazoX = toque.clientX - toqueX;
          const desplazoY = toque.clientY - toqueY;

          toqueX = null;
          toqueY = null;

          if (
            Math.abs(desplazoX) > 48 &&
            Math.abs(desplazoX) > Math.abs(desplazoY) * 1.4
          ) {
            navegar(desplazoX < 0 ? 1 : -1);
          }
        },
        { passive: true }
      );
    }
  }


  /* ========================================================================
     09. IMÁGENES DE RESPALDO
     ======================================================================== */

  function configurarRespaldoDeImagenes() {
    document.addEventListener(
      "error",
      function (evento) {
        const imagen = evento.target;

        if (!(imagen instanceof HTMLImageElement)) return;
        if (imagen.dataset.fallbackAplicado === "true") return;

        imagen.dataset.fallbackAplicado = "true";
        const respaldo = imagen.dataset.fallback || FALLBACK_IMG;

        if (imagen.src.endsWith(respaldo)) return;
        imagen.src = respaldo;
      },
      true
    );
  }


  /* ========================================================================
     INICIO
     ======================================================================== */

  configurarEnlaces();
  configurarConsultas();
  configurarRespaldoDeImagenes();
  renderCategorias();
  configurarGaleria();
  configurarNavegacionActiva();
  configurarApariciones();
})();
