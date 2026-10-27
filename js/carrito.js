//se crea un array vacio que va a funcionar con lo que el cliente va a ir añadiendo al carrito de compras y va eliminando segun quiera
let bolsa = []

function agregarProducto(id){
    const productoExistente = bolsa.find(camiseta => camiseta.id === id)
    if(productoExistente){
        productoExistente.cantidad = productoExistente.cantidad + 1;
    }else{
        const productoEncontrado = productos.find(item => item.id === id)
        productoEncontrado.cantidad = 1;
        bolsa.push(productoEncontrado)
    }

}

function renderizarCarrito(){
    contenedorCarrito = document.getElementById('IDdelhtml')
    totalCarrito = document.getElementById('iddelhtml')
    contadorCarrito = document.getElementById('iddelhtml')
    contenedor.innerHTML = ''

    if(bolsa.length === 0){
        mensaje = '<p>El carrito esta vacio</p>'
        totalCarrito = 0;
        contadorCarrito = 0;
        return
    }else{
        bolsa.forEach(item => {
            
    });
    }
    
}