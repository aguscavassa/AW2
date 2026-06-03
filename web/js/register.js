export async function init() {
    const registerForm = document.getElementById('register-form');
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const user = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const response = await fetch('/api/usuarios/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user, password })
        });
        if (response.status === 201) {
            alert('Usuario registrado exitosamente');
            window.location.href = '/';
        } else {
            alert('Error al registrar el usuario: ' + (await response.json()).error);
        }
    });
}