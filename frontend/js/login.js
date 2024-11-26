const API_URL = 'http://localhost:3000/api';

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await axios.post(`${API_URL}/users/login`, { email, password });
        localStorage.setItem('token', response.data.token);
        window.location.href = 'index.html';
    } catch (error) {
        console.error(error);
        alert('Erro ao fazer login. Verifique suas credenciais.');
    }
});
