export async function init() {
    filtrarProductos();
}

async function filtrarProductos(categoria = null) {
    let productosContainer = document.getElementById('productos-container');
    if (!categoria) {
        await fetch('/api/productos/all').then(response => response.json()).then(productos => {
            productosContainer.innerHTML = '';
            productos.forEach(producto => {
                const productoCard = document.createElement('div');
                productoCard.className = 'card mb-3';
                productoCard.innerHTML = `
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="./imgs/${producto.imagen}" class="img-fluid rounded-start w-50" alt="${producto.nombre}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${producto.nombre}</h5>
                                <p class="card-text">${producto.desc}</p>
                                <p class="card-text"><strong>Precio:</strong> $${producto.precio}</p>
                                <button type="button" data-id="${producto._id}" class="btn btn-primary">Agregar al carrito</button>
                            </div>
                        </div>
                    </div>
                `;
                productosContainer.appendChild(productoCard);
            });
        });
        document.querySelectorAll('button[data-id]').forEach(button => {
        button.addEventListener('click', async (event) => {
            event.preventDefault();
            const productoId = button.getAttribute('data-id');
            if (localStorage.getItem('productoAComprar') && JSON.parse(localStorage.getItem('productoAComprar')).includes(productoId)) {
                console.log(localStorage.getItem('productoAComprar'));
                return;
            }
            localStorage.setItem('productoAComprar', localStorage.getItem('productoAComprar') ? JSON.stringify([...JSON.parse(localStorage.getItem('productoAComprar')), productoId]) : JSON.stringify([productoId]));
            console.log(localStorage.getItem('productoAComprar'));
        });
    });
        return;
    }
    await fetch('/api/productos/all').then(response => response.json()).then(productos => {
        productosContainer.innerHTML = '';
        productos.forEach(producto => {
            if (producto.categoria.toLowerCase() === categoria.toLowerCase()) {
                const productoCard = document.createElement('div');
                productoCard.className = 'card mb-3';
                productoCard.innerHTML = `
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="./imgs/${producto.imagen}" class="img-fluid rounded-start w-50" alt="${producto.nombre}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${producto.nombre}</h5>
                                <p class="card-text">${producto.desc}</p>
                                <p class="card-text"><strong>Precio:</strong> $${producto.precio}</p>
                                <button type="button" data-id="${producto._id}" class="btn btn-primary">Agregar al carrito</button>
                            </div>
                        </div>
                    </div>
                `;
                productosContainer.appendChild(productoCard);
            }
        });
        document.querySelectorAll('button[data-id]').forEach(button => {
            button.addEventListener('click', async (event) => {
                event.preventDefault();
                const productoId = button.getAttribute('data-id');
                if (localStorage.getItem('productoAComprar') && JSON.parse(localStorage.getItem('productoAComprar')).includes(productoId)) {
                    console.log(localStorage.getItem('productoAComprar'));
                    return;
                }
                localStorage.setItem('productoAComprar', localStorage.getItem('productoAComprar') ? JSON.stringify([...JSON.parse(localStorage.getItem('productoAComprar')), productoId]) : JSON.stringify([productoId]));
                console.log(localStorage.getItem('productoAComprar'));
            });
        });
    });
}

const filtrarBtn = document.getElementById('filtrar-btn');
filtrarBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    let productosContainer = document.getElementById('productos-container');
    productosContainer.innerHTML = '';
    const categoriaSelect = document.querySelector('select[aria-label="Filter"]');
    const categoria = categoriaSelect.value;
    await filtrarProductos(categoria);
});