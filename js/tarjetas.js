// Creamos las tarjetas de cada camiseta con los elementos
// necesarios para la vista y selección del usuario

// Formateo de precio es-CO
function formatearPrecio(valor) {
    return "$" + valor.toLocaleString("es-CO");
}

function crearTarjeta() {
    const catalogo = document.getElementById("#catalogo");
    let html = "";

    for (const camiseta of CAMISETAS) {
        html += `
            <li class="camiseta">
                <h3>${camiseta.nombre}</h3>
                <p>${camiseta.descripcion}</p>
                <span class="precio">${formatearPrecio(camiseta.precio)}</span>
            </li>`;
    }

    catalogo.innerHTML = html;
}