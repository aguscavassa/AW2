export async function init() {
    const itemsCarrito = JSON.parse(localStorage.getItem('productoAComprar')) || [];
    let carritoContainer = document.getElementById('carrito-container');
    if (itemsCarrito.length === 0) {
        carritoContainer.innerHTML = '<p>El carrito está vacío.</p>';
        return;
    }
    itemsCarrito.forEach(async (itemId) => {
        await fetch(`/api/productos/${itemId}`).then(response => response.json()).then(producto => {
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
                        </div>
                    </div>
                </div>
            `;
            carritoContainer.appendChild(productoCard);
        });
    });
    carritoContainer.insertAdjacentHTML('afterend', `<div class="form-check mx-auto col-1 mb-3">
            <input type="checkbox" id="efectivo-checkbox" class="form-check-input"><label for="efectivo-checkbox" class="form-check-label">Pagar en efectivo</label>
        </div>

        <button id="finalizar-compra-btn" class="btn btn-success">Generar Orden de Compra</button>`);
    document.getElementById('finalizar-compra-btn').addEventListener('click', async () => {
        await fetch(`/api/ventas/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${sessionStorage.getItem('jwt')}`
            },
            body: JSON.stringify({ productos: itemsCarrito, efectivo: document.getElementById('efectivo-checkbox').checked })
        });
        alert('Compra realizada con éxito');
        localStorage.removeItem('productoAComprar');
        window.location.href = '/';
    });
}

