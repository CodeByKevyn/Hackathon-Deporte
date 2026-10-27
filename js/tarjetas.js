// Creamos las tarjetas de cada camiseta con los elementos
// necesarios para la vista y selección del usuario

// Formateo de precio es-CO
function formatearPrecio(valor) {
    return "$" + valor.toLocaleString("es-CO");
}

function crearTarjeta() {
    const catalogo = document.getElementById("catalogo");
    let html = "";

    for (const camiseta of CAMISETAS) {
        html += `
            <li class="camiseta">

                <!-- Carrusel -->

                <div id="carousel-${camiseta.id}" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <!-- Divs para imagenes de frutas -->
                        <div id="fotoAdelante" class="carousel-item active">
                            <img class="d-block w-75  mx-auto img-fluid"
                                src="${camiseta.imagenes[0]}" >
                        </div>
                        <div id="fotoAtras" class="carousel-item">
                            <img class="d-block w-75 mx-auto img-fluid"
                                src="${camiseta.imagenes[1]}" >
                        </div>
                        
                    </div>
                    <!-- Flecha anterior -->
                    <button class="carousel-control-prev" type="button" data-bs-target="#carousel-${camiseta.id}"
                        data-bs-slide="prev">
                        <span class="carousel-control-prev-icon"></span>
                    </button>
                    <!-- Flecha siguiente -->
                    <button class="carousel-control-next" type="button" data-bs-target="#carousel-${camiseta.id}"
                        data-bs-slide="next">
                        <span class="carousel-control-next-icon"></span>
                    </button>

                </div>
                
                <h3>${camiseta.nombre}</h3>
                <span class="precio">${formatearPrecio(camiseta.precio)}</span>
                <p>${camiseta.descripcion}</p>
                <button
                    class="btn btn-primary agregar-carrito"
                    data-id="${camiseta.id}">
                    Agregar al carrito
                </button>

            </li>`;
    }

    catalogo.innerHTML = html;
}

crearTarjeta();
