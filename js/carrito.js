// Carga la bolsa desde localStorage o inicia como arreglo vacío []
let bolsa = JSON.parse(localStorage.getItem('bolsaCarrito')) || [];

// Agregar un producto a la bolsa
function agregarProducto(id) {
  const productoExistente = bolsa.find(camiseta => camiseta.id === id);
  
  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    // Busca en la variable CAMISETAS definida en productos.js
    const productoEncontrado = CAMISETAS.find(item => item.id === id);
    if (productoEncontrado) {
      bolsa.push({ ...productoEncontrado, cantidad: 1 });
    }
  }

  // Refresca la vista y el contador en pantalla
  renderizarCarrito();
}

// Renderizar el contenido del carrito en el HTML
function renderizarCarrito() {
  // Guardar en el almacenamiento del navegador
  localStorage.setItem('bolsaCarrito', JSON.stringify(bolsa));

  // Capturamos referencias del HTML (con soporte para ambos nombres de ID)
  const contenedorCarrito = document.getElementById('contenedor-carrito') || document.getElementById('cartItemsContainer');
  const totalCarrito = document.getElementById('total-carrito') || document.getElementById('cartTotal');
  const contadorCarrito = document.getElementById('contador-carrito') || document.getElementById('cartCount');

  // Si no existen los elementos en el HTML aún, detenemos la ejecución de renderizado
  if (!contenedorCarrito) return;

  // Limpiar el contenido previo
  contenedorCarrito.innerHTML = '';

  // Si la bolsa está vacía
  if (bolsa.length === 0) {
    contenedorCarrito.innerHTML = `
      <div class="text-center my-4">
        <p class="fs-6 text-muted mb-0">El carrito está vacío 🛒</p>
      </div>
    `;
    if (totalCarrito) totalCarrito.textContent = '$0 COP';
    if (contadorCarrito) contadorCarrito.textContent = '0';
    return;
  }

  // Variables acumuladoras
  let totalPrecio = 0;
  let totalProductos = 0;

  // Recorrer los productos de la bolsa
  bolsa.forEach(item => {
    totalPrecio += item.precio * item.cantidad;
    totalProductos += item.cantidad;

    // Obtener la imagen correcta
    const foto = (item.imagenes && item.imagenes[0] && item.imagenes[0] !== "imagen") 
      ? item.imagenes[0] 
      : 'https://via.placeholder.com/80?text=Camiseta';

    // Insertar elemento en el HTML
    contenedorCarrito.innerHTML += `
      <div class="d-flex justify-content-between align-items-center mb-3 p-2 border-bottom">
        <div class="d-flex align-items-center gap-2">
          <img src="${foto}" alt="${item.nombre}" style="width: 45px; height: 45px; object-fit: contain;">
          <div>
            <h6 class="mb-0 fw-bold fs-6">${item.nombre}</h6>
            <small class="text-muted">
              $${item.precio.toLocaleString('es-CO')} x ${item.cantidad} = 
              <span class="fw-bold text-dark">$${(item.precio * item.cantidad).toLocaleString('es-CO')}</span>
            </small>
          </div>
        </div>
        
        <div class="d-flex align-items-center gap-1">
          <!-- Disminuir cantidad -->
          <button onclick="restarCantidad(${item.id})" class="btn btn-sm btn-outline-secondary px-2">-</button>
          
          <!-- Cantidad actual -->
          <span class="fw-bold px-2">${item.cantidad}</span>
          
          <!-- Aumentar cantidad -->
          <button onclick="sumarCantidad(${item.id})" class="btn btn-sm btn-outline-secondary px-2">+</button>
          
          <!-- Eliminar ítem -->
          <button onclick="eliminarProducto(${item.id})" class="btn btn-sm btn-outline-danger ms-2">🗑️</button>
        </div>
      </div>
    `;
  });

  // Actualizar totales en el HTML
  if (totalCarrito) totalCarrito.textContent = `$${totalPrecio.toLocaleString('es-CO')} COP`;
  if (contadorCarrito) contadorCarrito.textContent = totalProductos;
}

// Aumentar cantidad en 1
function sumarCantidad(id) {
  const producto = bolsa.find(item => item.id === id);
  if (producto) {
    producto.cantidad++;
  }
  renderizarCarrito();
}

// Disminuir cantidad en 1
function restarCantidad(id) {
  const producto = bolsa.find(item => item.id === id);

  if (producto) {
    producto.cantidad--;
    if (producto.cantidad === 0) {
      eliminarProducto(id);
      return;
    }
  }
  renderizarCarrito();
}

// Eliminar un producto completo
function eliminarProducto(id) {
  bolsa = bolsa.filter(item => item.id !== id);
  renderizarCarrito();
}

// Renderizar automáticamente al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  renderizarCarrito();
});