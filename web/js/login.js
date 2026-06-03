export async function init() {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const user = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        await fetch(`/api/usuarios/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user, password })
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    sessionStorage.setItem('jwt', data);
                    alert('Inicio de sesión exitoso');
                    window.location.href = '/';
                });
            } else {
                alert('Credenciales incorrectas');
            }
        });
    });
}