const API_URL = 'http://localhost:3000/api';
const token = localStorage.getItem('token');

// Verifica se o usuário está autenticado
if (!token) {
    window.location.href = 'login.html';
}

// Configurações do Axios
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// Carrega os usuários
const loadUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        const users = response.data;

        const userTable = document.getElementById('userTable');
        userTable.innerHTML = '';

        users.forEach((user, index) => {
            const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="deleteUser('${user._id}')">Excluir</button>
                    </td>
                </tr>
            `;
            userTable.innerHTML += row;
        });
    } catch (error) {
        console.error(error);
        alert('Erro ao carregar usuários.');
    }
};

// Exclui um usuário
const deleteUser = async (id) => {
    try {
        await axios.delete(`${API_URL}/users/${id}`);
        loadUsers();
    } catch (error) {
        console.error(error);
        alert('Erro ao excluir usuário.');
    }
};

// Logout
const logout = () => {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
};

// Carrega os usuários ao iniciar
loadUsers();
