let bolsa;
try {
  const carritoGuardado = JSON.parse(localStorage.getItem('bolsaCarrito') || '[]');
  bolsa = Array.isArray(carritoGuardado) ? carritoGuardado : [];
} catch (error) {
  console.error('No se pudo cargar el carrito guardado.', error);
  bolsa = [];
}

function agregarProducto(id) {
  const productoEncontrado = CAMISETAS.find(item => item.id === id);
  if (!productoEncontrado) {
    console.error(`No se encontró el producto con id ${id}.`);
    return;
  }

  const productoExistente = bolsa.find(item => item.id === id);
  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    bolsa.push({ ...productoEncontrado, cantidad: 1 });
  }

  renderizarCarrito();
}

function renderizarCarrito() {
   localStorage.setItem('bolsaCarrito', JSON.stringify(bolsa));
  // capturamos las referencias de los elementos en el HTML
  const contenedorCarrito = document.getElementById('lista-carrito');
  const totalCarrito = document.getElementById('total-carrito');
  const contadorCarrito = document.getElementById('contador-carrito');

  // 2 Limpiar el contenido previo del contenedor para no duplicar elementos
  contenedorCarrito.innerHTML = '';

  // Si la bolsa está vacía
  if (bolsa.length === 0) {
    contenedorCarrito.innerHTML = `
      <div class="text-center my-5">
        <p class="fs-5 text-muted">El carrito está vacío 🛒</p>
      </div>
    `;
    totalCarrito.textContent = '$0 COP';
    contadorCarrito.textContent = '0';
    return; // Interrumpe la ejecución para no recorrer el arreglo
  }

  //  Variables acumuladoras para los precios y cantidades
  let totalPrecio = 0;
  let totalProductos = 0;

  //  Si hay productos en la bolsa, recorrer el arreglo
  bolsa.forEach(item => {
    // Acumular dinero y cantidad total de ítems
    totalPrecio += item.precio * item.cantidad;
    totalProductos += item.cantidad;

    // Insertar cada tarjeta de producto dentro del contenedor del HTML
    contenedorCarrito.innerHTML += `
      <div class="d-flex justify-content-between align-items-center mb-3 p-2 border-bottom">
        <div>
          <h6 class="mb-1 fw-bold fs-6">${item.nombre}</h6>
          <small class="text-muted">
            $${item.precio.toLocaleString('es-CO')} x ${item.cantidad} = 
            <span class="fw-bold text-dark">$${(item.precio * item.cantidad).toLocaleString('es-CO')}</span>
          </small>
        </div>
        
        <div class="d-flex align-items-center gap-2">
          <!-- Disminuir cantidad -->
          <button onclick="restarCantidad(${item.id})" class="btn btn-sm btn-outline-secondary">-</button>
          
          <!-- Cantidad actual -->
          <span class="fw-bold px-1">${item.cantidad}</span>
          
          <!-- Aumentar cantidad -->
          <button onclick="sumarCantidad(${item.id})" class="btn btn-sm btn-outline-secondary">+</button>
          
          <!-- Eliminar el ítem completo -->
          <button onclick="eliminarProducto(${item.id})" class="btn btn-sm btn-outline-danger ms-2">🗑️</button>
        </div>
      </div>
    `;
  });

  // Actualizar las etiquetas de texto del total y la bolsa en el html
  totalCarrito.textContent = `$${totalPrecio.toLocaleString('es-CO')} COP`;
  contadorCarrito.textContent = totalProductos;
}

function sumarCantidad(id) {
  // Buscamos el producto en la bolsa
  const producto = bolsa.find(item => item.id === id);
  //Si existe, le sumamos 1 a su cantidad
  if (producto) {
    producto.cantidad++;
  }
  //Volvemos a pintar el carrito actualizado
  renderizarCarrito();
}

function restarCantidad(id) {
  const producto = bolsa.find(item => item.id === id);

  if (producto) {
    producto.cantidad--;
    // Si la cantidad llega a 0, la quitamos de la bolsa
    if (producto.cantidad === 0) {
      eliminarProducto(id);
      return; // Salimos para evitar llamar dos veces a renderizarCarrito
    }
  }

  renderizarCarrito();
}

function eliminarProducto(id) {
  // Guardamos en la bolsa solo los productos cuyo id sea diferente al que queremos borrar
  bolsa = bolsa.filter(item => item.id !== id);
  // Volvemos a pintar el carrito
  renderizarCarrito();
}

// Renderizamos el carrito guardado automáticamente al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  renderizarCarrito();
});