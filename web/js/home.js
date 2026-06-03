export async function init() {
    const i = await import(`/js/main.js`);
    document.getElementById('register-btn').addEventListener('click', () => {
        i.cargarModulo('register');
    });
    document.getElementById('home-btn').addEventListener('click', () => {
        i.cargarModulo('home');
    });
    document.getElementById('productos-btn').addEventListener('click', () => {
        i.cargarModulo('productos');
    });
    document.getElementById('login-btn').addEventListener('click', () => {
        i.cargarModulo('login');
    });
    document.getElementById('carrito-btn').addEventListener('click', () => {
        i.cargarModulo('carrito');
    });
    document.getElementById('logout-btn').addEventListener('click', () => {
        sessionStorage.removeItem('jwt');
        alert('Sesión cerrada exitosamente');
        i.cargarModulo('home');
    });
}