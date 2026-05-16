export async function cargarModulo(nombre, addToHistory = true) {
    const res = await fetch(`/html/${nombre}.html`);
    const html = await res.text();
    document.getElementById('contents').innerHTML = html;

    const module = await import(`/js/${nombre}.js`);
    module.init();

    if (addToHistory) {
        history.pushState({name}, "", `/${name}`);
    }
}

window.onpopstate = function (e) {
    if (e.state && e.state.name) {
        cargarModulo(e.state.name, null, false);
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