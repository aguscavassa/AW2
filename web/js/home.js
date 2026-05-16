export async function init() {
    const i = await import(`/js/main.js`);
    document.getElementById('productos-btn').addEventListener('click', () => {
        i.cargarModulo('productos');
    });
    document.getElementById('login-btn').addEventListener('click', () => {
        i.cargarModulo('login');
    });
    document.getElementById('carrito-btn').addEventListener('click', () => {
        i.cargarModulo('carrito');
    });
}