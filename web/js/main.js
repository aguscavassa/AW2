export async function cargarModulo(nombre, addToHistory = true) {
    const res = await fetch(`/html/${nombre}.html`);
    const html = await res.text();
    document.getElementById('contents').innerHTML = html;

    const module = await import(`/js/${nombre}.js`);
    module.init();

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

checkearCarga();