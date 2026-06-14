export async function cargarModulo(nombre, addToHistory = true) {
    document.getElementById('contents').innerHTML = '';
    const res = await fetch(`/html/${nombre}.html`);

    const html = await res.text();
    document.getElementById('contents').innerHTML = html;

    if (nombre != 'home') {
        const module = await import(`/js/${nombre}.js`);
        module.init();
    }
    if (sessionStorage.getItem('jwt')) {
        document.getElementById('login-btn').classList.add('d-none');
        document.getElementById('login-btn').classList.remove('d-block');
        document.getElementById('register-btn').classList.add('d-none');
        document.getElementById('register-btn').classList.remove('d-block');
        document.getElementById('logout-btn').classList.add('d-block');
        document.getElementById('logout-btn').classList.remove('d-none');
    } else {
        document.getElementById('login-btn').classList.add('d-block');
        document.getElementById('login-btn').classList.remove('d-none');
        document.getElementById('register-btn').classList.add('d-block');
        document.getElementById('register-btn').classList.remove('d-none');
        document.getElementById('logout-btn').classList.add('d-none');
        document.getElementById('logout-btn').classList.remove('d-block');
    }

    if (addToHistory) {
        history.pushState({nombre}, "");
    }
}

window.onpopstate = function (e) {
    if (e.state && e.state.nombre) {
        cargarModulo(e.state.nombre, null, false);
    } else {
        cargarModulo('home', null, false);
    }
}

function checkearCarga() {
    let url = window.location.pathname;
    let initial = location.hash.replace('#', "") || "home";
    if (url != "" && url != "/") {
        initial = url;
    }

    cargarModulo(initial, null, false);
}

async function init() {
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

checkearCarga();
init();