const inputNombre = document.querySelector("#nombreProducto");

const inputPrecio = document.querySelector("#precioProducto");

const botonAgregar = document.querySelector("#btnAgregar");

const botonVaciar = document.querySelector("#btnVaciar");

const inputBusqueda = document.querySelector("#busquedaProducto");

const mensaje = document.querySelector("#mensaje");

const avisoBeneficio = document.querySelector("#avisoBeneficio");
setTimeout(() => {
    avisoBeneficio.style.display = "block";
}, 3000);

const cerrarAviso = document.querySelector("#cerrarAviso");
cerrarAviso.addEventListener("click", () => {
    avisoBeneficio.style.display = "none";

});

const productosGuardados = localStorage.getItem("productos");
const productos = productosGuardados ? JSON.parse(productosGuardados) 
: [
    { id: 1, nombre: "Remera", precio: 20000 },
    { id: 2, nombre: "Calza", precio: 40000 },
    { id: 3, nombre: "Campera", precio: 60000 }
];

function guardarProductos() {
    localStorage.setItem("productos", JSON.stringify(productos))
}

const contenedorProductos = document.querySelector("#contenedorProductos");


function renderizarProductos() {
    contenedorProductos.innerHTML = "";
    const busqueda = inputBusqueda.value.toLowerCase();


    for (const producto of productos) {
        const {nombre, precio} = producto;
        if (nombre.toLowerCase().includes(busqueda)) {
            contenedorProductos.innerHTML += `
            <div>
                <h3>${nombre}</h3>
                <p>$${precio}</p>
                <button data-id="${producto.id}">Eliminar</button>
            </div>
        `;

        }

    }
}
renderizarProductos()

inputBusqueda.addEventListener("keyup", () => {
    renderizarProductos();
});

contenedorProductos.addEventListener("click", (evento) => {
    if (!evento.target.matches("button")) return;

    const idProducto = Number(evento.target.dataset.id);

    const productoEncontrado = productos.findIndex(
        producto => producto.id === idProducto
    );

    if (productoEncontrado !== -1) {
        productos.splice(productoEncontrado, 1)
        guardarProductos();
        mensaje.textContent = "Producto eliminado";
        renderizarProductos();
    }

});

let siguienteId = productos.length > 0
? Math.max(...productos.map(producto => producto.id)) + 1
: 1;

botonAgregar.addEventListener("click", () => {
    try{ 
    const nombre = inputNombre.value.trim();
    const precio = Number(inputPrecio.value);
    if (nombre === "" || isNaN(precio) || precio <= 0) {
        throw new Error("Datos inválidos");
    }
    const nuevoProducto = {
        id: siguienteId,
        nombre: nombre,
        precio: precio
    };
    siguienteId++;
    productos.push(nuevoProducto);
    guardarProductos();
    mensaje.textContent = "Producto agregado";

    inputNombre.value = "";
    inputPrecio.value = "";

    renderizarProductos()
    } catch (error) {
        mensaje.textContent = "No se pudo agregar el producto.";
        console.error(error);
    } finally {
        console.log("Proceso de agregar producto finalizado.");
    }
});

botonVaciar.addEventListener("click", () => {
    productos.length = 0;
    guardarProductos();
    renderizarProductos();
    mensaje.textContent = "Productos eliminados";
});
