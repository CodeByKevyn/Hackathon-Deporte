// Carrusel de escudos (.carrusel) - infinito
// Las flechas siempre funcionan, sin importar el ancho de la pantalla: el JS repite los escudos
// varias veces y, cuando la fila se acerca a un borde, la "teletransporta" a una copia identica
// (el usuario no nota el salto).
const carrusel = document.querySelector('.carrusel');

if (carrusel) {
  const pista = carrusel.querySelector('.carrusel-pista');
  const btnPrev = carrusel.querySelector('.carrusel-flecha-prev');
  const btnNext = carrusel.querySelector('.carrusel-flecha-next');

  // Escudos originales (los del HTML), guardados antes de clonar
  const originales = Array.from(pista.children);
  let anchoSet = 0;      // ancho de UNA vuelta completa de escudos
  let temporizador;

  // Deja la pista con N copias de los escudos: las necesarias para llenar la pantalla + 2
  function construir() {
    pista.querySelectorAll('[data-clon]').forEach(el => el.remove());

    // Mide una vuelta: distancia entre el primer escudo y el primero de la siguiente copia
    const primero = originales[0];
    const copia = primero.cloneNode(true);
    copia.dataset.clon = 'true';
    pista.appendChild(copia);
    anchoSet = copia.offsetLeft - primero.offsetLeft;
    copia.remove();

    // copias necesarias para que un clic (0.8 de pantalla) nunca llegue al final de la fila
    const copias = Math.ceil((1.8 * pista.clientWidth) / anchoSet) + 2;
    for (let i = 1; i < copias; i++) {
      originales.forEach(el => {
        const clon = el.cloneNode(true);
        clon.dataset.clon = 'true';
        clon.setAttribute('aria-hidden', 'true');   // los lectores de pantalla ignoran las copias
        pista.appendChild(clon);
      });
    }
    pista.scrollTo({ left: anchoSet, behavior: 'auto' });   // empieza en la segunda copia
  }

  // Si la fila se salio de la "copia central", la regresa a ella sin que se note
  function normalizar() {
    let x = pista.scrollLeft;
    while (x >= 2 * anchoSet) x -= anchoSet;
    while (x < anchoSet) x += anchoSet;
    if (x !== pista.scrollLeft) pista.scrollTo({ left: x, behavior: 'auto' });
  }

  function mover(direccion) {
    pista.scrollBy({ left: direccion * pista.clientWidth * 0.8, behavior: 'smooth' });
  }

  btnPrev.addEventListener('click', () => mover(-1));
  btnNext.addEventListener('click', () => mover(1));

  // Cuando el movimiento se detiene (flechas o dedo), se normaliza la posicion
  pista.addEventListener('scroll', () => {
    clearTimeout(temporizador);
    temporizador = setTimeout(normalizar, 120);
  });

  window.addEventListener('resize', construir);
  construir();
}
