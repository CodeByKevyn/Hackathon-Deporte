// Flechas del carrusel de escudos (.carrusel)
// Mueve la pista de a casi un "pantallazo" y desactiva la flecha al llegar al inicio o al final.
const carrusel = document.querySelector('.carrusel');

if (carrusel) {
  const pista = carrusel.querySelector('.carrusel-pista');
  const btnPrev = carrusel.querySelector('.carrusel-flecha-prev');
  const btnNext = carrusel.querySelector('.carrusel-flecha-next');

  function actualizarFlechas() {
    const maxScroll = pista.scrollWidth - pista.clientWidth;
    btnPrev.disabled = pista.scrollLeft <= 1;
    btnNext.disabled = pista.scrollLeft >= maxScroll - 1;
  }

  function mover(direccion) {
    pista.scrollBy({ left: direccion * pista.clientWidth * 0.8 });
  }

  btnPrev.addEventListener('click', () => mover(-1));
  btnNext.addEventListener('click', () => mover(1));
  pista.addEventListener('scroll', actualizarFlechas);
  window.addEventListener('resize', actualizarFlechas);
  actualizarFlechas();
}
