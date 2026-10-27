// Creamos las tarjetas de cada camiseta con los elementos
// necesarios para la vista y selección del usuario

// Formateo de precio es-CO
function formatearPrecio(valor) {
    return "$" + valor.toLocaleString("es-CO");
}

function crearTarjeta() {
    const catalogo = document.getElementById("catalogo");
    if (!catalogo) {
        console.error('No se encontró el contenedor del catálogo (#catalogo).');
        return;
    }

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
        const columna = document.createElement('li');
        columna.className = 'col';

        const tarjeta = document.createElement('article');
        tarjeta.className = 'card h-100';

        const imagen = camiseta.imagenes.find(ruta => ruta && ruta !== 'imagen');
        if (imagen) {
            const foto = document.createElement('img');
            foto.className = 'card-img-top';
            foto.src = imagen;
            foto.alt = camiseta.nombre;
            tarjeta.appendChild(foto);
        } else {
            const marcadorImagen = document.createElement('div');
            marcadorImagen.className = 'card-img-top d-flex align-items-center justify-content-center bg-light text-muted';
            marcadorImagen.style.height = '220px';
            marcadorImagen.textContent = 'Imagen no disponible';
            tarjeta.appendChild(marcadorImagen);
        }

        const contenido = document.createElement('div');
        contenido.className = 'card-body d-flex flex-column';

        const nombre = document.createElement('h3');
        nombre.className = 'card-title fs-5';
        nombre.textContent = camiseta.nombre;

        const precio = document.createElement('p');
        precio.className = 'precio fw-bold';
        precio.textContent = formatearPrecio(camiseta.precio);

        const descripcion = document.createElement('p');
        descripcion.className = 'card-text';
        descripcion.textContent = camiseta.descripción;

        const boton = document.createElement('button');
        boton.type = 'button';
        boton.className = 'btn btn-primary agregar-carrito mt-auto';
        boton.dataset.id = camiseta.id;
        boton.textContent = 'Agregar al carrito';

        contenido.append(nombre, precio, descripcion, boton);
        tarjeta.appendChild(contenido);
        columna.appendChild(tarjeta);
        catalogo.appendChild(columna);
    }
}

crearTarjeta();

document.getElementById('catalogo')?.addEventListener('click', event => {
    const boton = event.target.closest('.agregar-carrito');
    if (boton) {
        agregarProducto(Number(boton.dataset.id));
    }
});
