document.addEventListener('DOMContentLoaded', () => {
  // 1. Dibuja las tarjetas en pantalla
  renderizarProductos();

  // 2. Carga los datos guardados del carrito
  guardarYActualizarCarrito();
});