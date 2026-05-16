export async function init() {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const user = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        await fetch(`/api/usuarios/${user}`).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    sessionStorage.setItem('usuarioLogeado', data.id);
                    window.location.href = '/';
                });
            }
        });
    });
}