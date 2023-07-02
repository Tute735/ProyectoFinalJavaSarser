// Seleccionar elementos del DOM y del HTML
const modalCarrito = document.querySelector("#modalCarrito");
const abrirCarrito = document.querySelector("#abrirCarrito");
const cerrarCarrito = document.querySelector("#cerrarCarrito");
const cardsProductos = document.querySelector("#cardsProductos");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const finalizarCompra = document.querySelector(".Comprar");
const agregarCarritos = document.querySelectorAll(".agregarCarrito");

// Declarar variables para el carrito y el precio total
let carrito = [];
let precioTotal = 0;

// Cargar carrito desde el localStorage al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  verCarrito();
});

// Abrir el carrito al hacer clic en el botón correspondiente
abrirCarrito.addEventListener("click", () => {
  modalCarrito.showModal();
});

// Cerrar el carrito al hacer clic en el botón correspondiente
cerrarCarrito.addEventListener("click", () => {
  modalCarrito.close();
});

// Vaciar el carrito al hacer clic en el botón correspondiente
vaciarCarrito.addEventListener('click', () => {
  Toastify({
    classname: "alert",
    text: "Carrito Vaciado",
    duration: 1000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to left, ) class= alert",
    },
    onClick: function(){} // Callback after click
  }).showToast();

  carrito.length = 0;
  verCarrito();
});

// Función para obtener los datos del archivo JSON
const jsonFetch = async () => {
  const respuesta = await fetch("../data.json");
  const sneakers = await respuesta.json();
  return sneakers;
};

// Crear los productos en el DOM
const crearProductos = () => {
  cardsProductos.innerHTML = "";

  jsonFetch().then(sneakers => {
    sneakers.forEach(producto => {
      const card = document.createElement("div");
      card.innerHTML = `
        <div class="producto">
          <img src="${producto.imagen}" alt="imagen del producto" class="imgProducto">
          <div class="nombreProducto">${producto.nombre}</div>
          <div class="precioProducto">$${producto.precio}</div>
          <div class="botonProducto">
            <button id="${producto.id}" class="agregarCarrito">+</button>
          </div>
        </div>
      `;
      cardsProductos.appendChild(card);

      const btnAgregarCarrito = document.getElementById(`${producto.id}`);
      btnAgregarCarrito.addEventListener("click", (e) => agregarCarrito(e, sneakers));

      btnAgregarCarrito.addEventListener("click", () => {
        Toastify({
          classname: "alert",
          text: "Producto agregado",
          duration: 1000,
          newWindow: true,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to left, ) class= alert",
          },
          onClick: function(){} // Callback after click
        }).showToast();
      });
    });

    // Crear filtro de precios
    const filtroPrecios = document.createElement("div");
    filtroPrecios.innerHTML = `
      <div class="displayFiltros">
        <div>
          <label class="textPrecioMin" for="precioMin">Precio mínimo:</label>
          <input class="precioMin" type="number" id="precioMin" min="0" step="1">
        </div>
        <div>
          <label class="textPrecioMax" for="precioMax">Precio máximo:</label>
          <input class="precioMax" type="number" id="precioMax" min="0" step="1">
        </div>
        <div>
          <button class="Filter" id="btnFiltrar">Filtrar</button>
          <button class="LimpiarFilter" id="btnLimpiarFiltro">Limpiar filtro</button>
        </div>
      </div>
    `;
    cardsProductos.insertAdjacentElement("beforebegin", filtroPrecios);

    const btnFiltrar = document.getElementById("btnFiltrar");
    const btnLimpiarFiltro = document.getElementById("btnLimpiarFiltro");

    // Evento del botón "Filtrar"
    btnFiltrar.addEventListener("click", () => {
      const precioMin = parseFloat(document.getElementById("precioMin").value);
      const precioMax = parseFloat(document.getElementById("precioMax").value);

      const productosFiltrados = filtrarPorPrecio(sneakers, precioMin, precioMax);
      mostrarProductosFiltrados(productosFiltrados);
    });

    // Evento del botón "Limpiar filtro"
    btnLimpiarFiltro.addEventListener("click", () => {
      document.getElementById("precioMin").value = "";
      document.getElementById("precioMax").value = "";
      mostrarProductosFiltrados(sneakers);
    });
  });
};

// Función para filtrar productos por precio
function filtrarPorPrecio(productos, min, max) {
  return productos.filter(producto => producto.precio >= min && producto.precio <= max);
}

// Función para mostrar los productos filtrados
function mostrarProductosFiltrados(productos) {
  cardsProductos.innerHTML = "";
  productos.forEach(producto => {
    const card = document.createElement("div");
    card.innerHTML = `
      <div class="producto">
        <img src="${producto.imagen}" alt="imagen del producto" class="imgProducto">
        <div class="nombreProducto">${producto.nombre}</div>
        <div class="precioProducto">$${producto.precio}</div>
        <div class="botonProducto">
          <button id="${producto.id}" class="agregarCarrito">+</button>
        </div>
      </div>
    `;
    cardsProductos.appendChild(card);
  });
  const agregarCarrito = document.querySelectorAll(".agregarCarrito");
  agregarCarrito.forEach((boton) => {
    boton.addEventListener("click", (e) => agregarFiltro(e, productos)); // Llamar a la función agregarFiltro
    boton.addEventListener("click", () => {
      Toastify({
        classname: "alert",
        text: "Producto agregado",
        duration: 1000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to left, ) class= alert",
        },
        onClick: function(){} // Callback after click
      }).showToast();
    });
  });
}

function agregarFiltro(e, productos) {
  const id = e.target.id;
  const productoEncontrado = productos.find(producto => producto.id === id);
  const sumarProd = carrito.find(prod => prod.id === id);

  if (sumarProd) {
    sumarProd.cantidad++;
  } else {
    carrito.push({ ...productoEncontrado, cantidad: 1 });
  }

  verCarrito();
}


// Función para agregar un producto al carrito
function agregarCarrito(e, productos) {
  const id = e.target.id;
  const productoEncontrado = productos.find(producto => producto.id === id);
  const sumarProd = carrito.find(prod => prod.id === id);

  if (sumarProd) {
    sumarProd.cantidad++;
  } else {
    carrito.push({ ...productoEncontrado, cantidad: 1 });
  }

  verCarrito();
}

// Crear productos al cargar la página
crearProductos();

// Función para ver los productos dentro del carrito
const verCarrito = () => {
  const carritoContainer = document.querySelector("#modalContainer");
  carritoContainer.innerHTML = "";

  let carritoHTML = "";

  carrito.forEach(prod => {
    carritoHTML += `
      <div class="articulo" prodId="${prod.id}">
        <img class="carritoImg" src="${prod.imagen}">
        <p class="nombreCarrito">${prod.nombre}</p>
        <p class="precioCarrito">$${prod.precio}</p>
        <p class="cantCarrito">${prod.cantidad}</p>
        <div>
          <button class="agregarUd">+</button>
        </div>
        <div>
          <button class="eliminarUd">-</button>
        </div>
        <div>
          <button class="eliminarProd">Eliminar</button>
        </div>
      </div>
    `;
  });

  const cantidades = carrito.reduce((a, b) => a + b.cantidad, 0);
  precioTotal = carrito.reduce((a, b) => a + b.precio * b.cantidad, 0);
  guardarStorage();

  carritoHTML += `
    <div class="precioCant">
      <div class="cantidadTot">
        <p class="canTCarrito">Cantidad Total:</p>
        <p class="canTCarrito">${cantidades}</p>
      </div>  
      <div class="PrecioTot">
        <p class="preciototal">Precio Total: $</p>
        <p class="preciototal">${precioTotal}</p>
      </div>
    </div>
  `;

  carritoContainer.innerHTML = carritoHTML;

  const eliminarProd = document.querySelectorAll(".eliminarProd");

  eliminarProd.forEach(botones => {
    botones.addEventListener("click", () => {
      const prodId = botones.parentNode.parentNode.attributes.prodId.value;
      const prodIndex = carrito.findIndex(prod => prod.id === prodId);

      carrito.splice(prodIndex, 1);
      verCarrito();
    });
  });

  const agregarUd = document.querySelectorAll(".agregarUd");

  agregarUd.forEach(botones => {
    botones.addEventListener("click", () => {
      const prodId = botones.parentNode.parentNode.attributes.prodId.value;
      const prod = carrito.find(prod => prod.id === prodId);
      prod.cantidad++;

      verCarrito();
    });
  });

  const eliminarUd = document.querySelectorAll(".eliminarUd");

  eliminarUd.forEach(botones => {
    botones.addEventListener("click", () => {
      const prodId = botones.parentNode.parentNode.attributes.prodId.value;
      const prod = carrito.find(prod => prod.id === prodId);
      const prodIndex = carrito.findIndex(prod => prod.id === prodId);

      prod.cantidad--;

      if (prod.cantidad < 1) {
        carrito.splice(prodIndex, 1);
      }

      verCarrito();
    });
  });
};

// Botón para finalizar la compra
finalizarCompra.addEventListener("click", () => {
  const userInfo = localStorage.getItem("userInfo");
  const compraId = IdUnico();

  if (userInfo === null) {
    window.open("./register.html", "_self");
  } else {
    Toastify({
      classname: "alert",
      text: "Compra Realizada",
      duration: 1000,
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to left, ) class= alert",
      },
      onClick: function() {} // Callback after click
    }).showToast();
    const compra = { articulos: [...carrito], total: precioTotal };

    localStorage.setItem(`Compra-${compraId}`, JSON.stringify(compra));
    carrito = [];
    verCarrito();
  }
});

// Generar un ID único para cada compra
function IdUnico() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Guardar el carrito en el localStorage
function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}
