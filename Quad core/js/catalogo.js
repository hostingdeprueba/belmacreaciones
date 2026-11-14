/* ==========================================================================
   CATÁLOGO DE BELMACREACIONES
   --------------------------------------------------------------------------
   Este archivo guarda TODA la información del catálogo. La página lo lee y
   arma automáticamente las tarjetas de categorías y las galerías.

   CÓMO AGREGAR UNA FOTOGRAFÍA
   1. Guardar la imagen en la subcarpeta de su categoría dentro de img/.
      Ejemplo: img/accesorios/mi-foto.jpeg
   2. Buscar el producto y agregar un objeto dentro de su array "fotos":
      { src: "img/accesorios/mi-foto.jpeg", alt: "Descripción de la foto" }
   3. El "alt" debe describir lo que se ve, por ejemplo:
      "Cartuchera de tela con cierre, confeccionada a mano".

   CÓMO AGREGAR UN PRODUCTO
   Copiar un producto completo y cambiar "nombre", "descripcion" y "fotos".
   Puede tener una o varias fotos dentro del array.

   CÓMO AGREGAR UNA CATEGORÍA
   1. Crear su carpeta dentro de img/ (por ejemplo, img/nueva-categoria/).
   2. Copiar un bloque de categoría completo y cambiar:
      - "id": debe coincidir con el nombre de la carpeta, sin mayúsculas
        ni espacios (ejemplo: "nueva-categoria").
      - "nombre", "descripcion" y "productos".
   3. Si todavía no hay fotos, dejar los arrays "fotos" vacíos ([]).
      La página mostrará automáticamente el espacio de "Próximamente".

   NOTA: no se inventan fotos ni datos. Las categorías sin imágenes se
   mantienen visibles con un aviso de próximos productos.
   ========================================================================== */

window.BELMA_CATALOGO = [
  {
    id: "accesorios",
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
      },
      {
        nombre: "Canasta de tela decorativa",
        descripcion: "Canasta de tela para sumar un detalle cálido al hogar.",
        fotos: [
          {
            src: "img/accesorios/accesorio1.jpeg",
            alt: "Canasta de tela decorativa confeccionada a mano"
          }
        ]
      },
      {
        nombre: "Cartucheras",
        descripcion: "Cartucheras de tela confeccionadas a mano.",
        fotos: [
          {
            src: "img/accesorios/cartuchera.jpeg",
            alt: "Cartuchera de tela confeccionada a mano"
          }
        ]
      },
      {
        nombre: "Porta pelotas",
        descripcion: "Porta pelotas de tela para guardar y trasladar.",
        fotos: [
          {
            src: "img/accesorios/portapelota.jpeg",
            alt: "Porta pelotas de tela confeccionado a mano"
          }
        ]
      },
      {
        nombre: "Porta tazas",
        descripcion: "Porta tazas textil para llevar la bebida favorita.",
        fotos: [
          {
            src: "img/accesorios/portatasa.jpeg",
            alt: "Porta tazas textil confeccionado a mano"
          }
        ]
      },
      {
        nombre: "Neceser para bebé",
        descripcion: "Neceser para organizar los artículos del bebé.",
        fotos: [
          {
            src: "img/accesorios/nesecerparabb.jpeg",
            alt: "Neceser para bebé confeccionado a mano"
          }
        ]
      }
    ]
  },

  {
    id: "indumentaria",
    nombre: "Indumentaria",
    descripcion: "Prendas confeccionadas a mano, con atención en cada terminación.",
    productos: [
      {
        nombre: "Camisas",
        descripcion: "Camisas confeccionadas a mano, con detalles a elección.",
        fotos: [
          {
            src: "img/indumentaria/camisa.jpeg",
            alt: "Camisa confeccionada a mano"
          }
        ]
      },
      {
        nombre: "Remeras de trabajo",
        descripcion: "Remeras de trabajo con terminaciones cuidadas.",
        fotos: [
          {
            src: "img/indumentaria/remeratrabajo.jpeg",
            alt: "Remera de trabajo confeccionada a mano — vista 1"
          },
          {
            src: "img/indumentaria/remeratrabajo1.jpeg",
            alt: "Remera de trabajo confeccionada a mano — vista 2"
          }
        ]
      }
    ]
  },

  {
    id: "disfraces",
    nombre: "Disfraces",
    descripcion: "Creaciones a pedido para ocasiones especiales.",
    productos: [
      {
        nombre: "Disfraces personalizados",
        descripcion: "Disfraces realizados a pedido, pensados para cada ocasión.",
        fotos: [
          {
            src: "img/disfraces/disfras.jpeg",
            alt: "Disfraz personalizado confeccionado a mano"
          }
        ]
      }
    ]
  },

  {
    id: "kits",
    nombre: "Kits",
    descripcion: "Conjuntos coordinados para regalar o disfrutar.",
    productos: [
      {
        nombre: "Kit de picnic",
        descripcion: "Kit textil para disfrutar de un picnic.",
        fotos: [
          {
            src: "img/kits/kitdepicnic.jpeg",
            alt: "Kit de picnic textil confeccionado a mano"
          }
        ]
      },
      {
        nombre: "Kit de toallitas",
        descripcion: "Conjunto de toallitas coordinadas.",
        fotos: [
          {
            src: "img/kits/kitdetoallitas.jpeg",
            alt: "Kit de toallitas confeccionado a mano"
          }
        ]
      }
    ]
  },

  {
    id: "munecos",
    nombre: "Muñecos y juguetes",
    descripcion: "Juguetes de tela y piezas pensadas para jugar y aprender.",
    productos: [
      {
        nombre: "Muñecas",
        descripcion: "Muñecas de tela con detalles cosidos y una identidad propia.",
        fotos: [
          {
            src: "img/munecos/muñeca.jpeg",
            alt: "Muñeca artesanal de tela — vista 1"
          },
          {
            src: "img/munecos/muñeca1.jpeg",
            alt: "Muñeca artesanal de tela — vista 2"
          }
        ]
      },
      {
        nombre: "Muñecos",
        descripcion: "Muñecos artesanales confeccionados a mano.",
        fotos: [
          {
            src: "img/munecos/muñeco.jpeg",
            alt: "Muñeco artesanal de tela confeccionado a mano"
          }
        ]
      },
      {
        nombre: "Peluches pedagógicos",
        descripcion: "Peluches pensados para acompañar el juego y el aprendizaje.",
        fotos: [
          {
            src: "img/munecos/peluchepedagogico.jpeg",
            alt: "Peluche pedagógico de tela confeccionado a mano"
          }
        ]
      },
      {
        nombre: "Teatrino de títeres",
        descripcion: "Teatrino textil para jugar y contar historias.",
        fotos: [
          {
            src: "img/munecos/titiritero.jpeg",
            alt: "Teatrino de títeres de tela confeccionado a mano"
          }
        ]
      }
    ]
  },

  {
    id: "polleras",
    nombre: "Polleras tradicionales",
    descripcion: "Confección artesanal que rescata detalles tradicionales.",
    productos: [
      {
        nombre: "Polleras tradicionales",
        descripcion: "Piezas de confección artesanal que rescatan detalles tradicionales.",
        fotos: [
          {
            src: "img/polleras/polleratradicional.jpeg",
            alt: "Pollera tradicional confeccionada a mano — vista 1"
          },
          {
            src: "img/polleras/polleratradicional1.jpeg",
            alt: "Pollera tradicional confeccionada a mano — vista 2"
          }
        ]
      }
    ]
  },

  {
    id: "vestidos",
    nombre: "Vestidos",
    descripcion: "Diseños personalizados para cada ocasión.",
    productos: [
      {
        nombre: "Vestidos personalizados",
        descripcion: "Diseños confeccionados a medida, con detalles elegidos para cada ocasión.",
        fotos: [
          {
            src: "img/vestidos/vestido.jpeg",
            alt: "Vestido personalizado confeccionado a mano — vista 1"
          },
          {
            src: "img/vestidos/vestido1.jpeg",
            alt: "Vestido personalizado confeccionado a mano — vista 2"
          }
        ]
      }
    ]
  },

  {
    id: "bebes",
    nombre: "Artículos para bebé",
    descripcion: "Piezas cálidas y suaves para acompañar al bebé.",
    productos: [
      {
        nombre: "Nidos para bebé",
        descripcion: "Piezas acolchadas y cálidas para acompañar el descanso del bebé.",
        fotos: [
          {
            src: "img/bebes/nidoparabb.jpeg",
            alt: "Nido para bebé confeccionado a mano"
          }
        ]
      },
      {
        nombre: "Salidas de baño para bebé",
        descripcion: "Batas artesanales pensadas para envolver al bebé después del baño.",
        fotos: [
          {
            src: "img/bebes/salidadebañobb.jpeg",
            alt: "Salida de baño para bebé confeccionada a mano"
          }
        ]
      },
      {
        nombre: "Toallitas para bebé",
        descripcion: "Toallitas suaves confeccionadas a mano.",
        fotos: [
          {
            src: "img/bebes/tollitaparabb.jpeg",
            alt: "Toallita para bebé confeccionada a mano"
          }
        ]
      }
    ]
  },

  {
    id: "hogar",
    nombre: "Hogar",
    descripcion: "Textiles para vestir los espacios con calidez.",
    productos: [
      {
        nombre: "Juegos de sábanas y fundas",
        descripcion: "Conjuntos textiles confeccionados para el descanso diario.",
        fotos: []
      },
      {
        nombre: "Almohadones",
        descripcion: "Almohadones artesanales para sumar calidez a los ambientes.",
        fotos: []
      },
      {
        nombre: "Individuales de mesa",
        descripcion: "Individuales textiles para vestir la mesa con un detalle artesanal.",
        fotos: []
      },
      {
        nombre: "Otros artículos textiles para el hogar",
        descripcion: "Piezas textiles a pedido para cada espacio.",
        fotos: []
      }
    ]
  }
];
