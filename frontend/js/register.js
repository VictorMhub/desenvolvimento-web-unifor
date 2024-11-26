const API_URL = 'http://localhost:3000/api';

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await axios.post(`${API_URL}/users/register`, { name, email, password });
        alert('Cadastro realizado com sucesso!');
        window.location.href = 'login.html';
    } catch (error) {
        console.error(error);
        console.log(error);
        alert('Erro ao realizar cadastro. Tente novamente.');
    }
});
