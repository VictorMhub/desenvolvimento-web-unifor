const API_URL = 'http://localhost:3000/api'; // Atualize conforme necessário
const token = localStorage.getItem('token');
console.log(token);

// Verifica se o usuário está autenticado
if (!token) {
    window.location.href = 'login.html';
}

// Configurações do Axios
axios.defaults.headers.common['Authorization'] = token;

// Carrega as tasks
const loadTasks = async () => {
    try {
        const response = await axios.get(`${API_URL}/tasks`);
        const tasks = response.data;
        console.log(tasks);
        
        const taskTable = document.getElementById('taskTable');
        taskTable.innerHTML = ''; // Limpa a tabela

        tasks.forEach((task, index) => {
            const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${task.title}</td>
                    <td>${task.description || '---'}</td>
                    <td>${task.completed ? 'Sim' : 'Não'}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editTask('${task._id}')">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteTask('${task._id}')">Excluir</button>
                    </td>
                </tr>
            `;
            taskTable.innerHTML += row;
        });
    } catch (error) {
        console.error(error);
        console.log(error);
        alert('Erro ao carregar tarefas.');
    }
};

document.getElementById("save-task-btn").addEventListener("click", () => {
    const title = document.getElementById("task-title").value.trim();
    const description = document.getElementById("task-description").value.trim();
    const completed = document.getElementById("task-completed").checked
    const taskId = document.getElementById('task-id').value
   
    if (!title) {
      alert("O título da tarefa não pode estar vazio!");
      return;
    }
  
    const token = localStorage.getItem("token");
    const taskData = { title, description, completed };
  
    if (taskId) {
        // Editar tarefa existente (PUT)
        axios
            .put(
                `${API_URL}/tasks/${taskId}`, // Usar o ID para atualização
                taskData,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            )
            .then((response) => {
                alert("Tarefa atualizada com sucesso!");
                document.getElementById("task-title").value = "";
                document.getElementById("task-description").value = "";
                document.getElementById("task-completed").checked = false;
                document.querySelector("#taskModal .btn-close").click(); // Fecha o modal
                loadTasks(); // Atualiza a lista de tarefas
            })
            .catch((error) => {
                console.error(error.response?.data?.message || "Erro ao atualizar tarefa");
                alert("Erro ao atualizar tarefa");
            });
    } else {
        // Criar nova tarefa (POST)
        axios
            .post(
                `${API_URL}/tasks`,
                taskData,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            )
            .then((response) => {
                alert("Tarefa adicionada com sucesso!");
                document.querySelector("#taskModal .btn-close").click();
                document.getElementById("task-title").value = ""; // Fecha o modal
                loadTasks(); // Atualiza a lista de tarefas
            })
            .catch((error) => {
                console.error(error.response?.data?.message || "Erro ao adicionar tarefa");
                alert("Erro ao adicionar tarefa");
            });
    }
  });

//Salva uma nova tarefa ou atualiza uma existente
// const saveTask = async () => {
//     const title = document.getElementById("task-title").value.trim();
//     const description = document.getElementById("task-description").value.trim();
//     const completed = document.getElementById('task-completed').value === 'true';
//     const taskId = document.getElementById('task-id')
//     console.log(title);
    

//     try {
//         if (taskId) {
//             await axios.put(`${API_URL}/tasks/${taskId}`, { title, description, completed });
//         } else {
//             await axios.post(`${API_URL}/tasks`, { title, description, completed });
//         }
//         document.getElementById('taskForm').reset();
//         document.getElementById('taskId').value = '';
//         bootstrap.Modal.getInstance(document.getElementById('taskModal')).hide();
//         loadTasks();
//     } catch (error) {
//         console.error(error);
//         alert('Erro ao salvar tarefa.');
//     }
// };

// Edita uma tarefa
const editTask = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/tasks/${id}`);
        const task = response.data;

        document.getElementById('task-title').value = task.title;
        document.getElementById('task-description').value = task.description || '';
        document.getElementById('task-completed').value = task.completed.toString();
        document.getElementById('task-id').value = task._id;

        const taskModal = new bootstrap.Modal(document.getElementById('taskModal'));
        taskModal.show();
    } catch (error) {
        console.error(error);
        alert('Erro ao carregar tarefa.');
    }
};

// Exclui uma tarefa
const deleteTask = async (id) => {
    try {
        await axios.delete(`${API_URL}/tasks/${id}`);
        loadTasks();
    } catch (error) {
        console.error(error);
        alert('Erro ao excluir tarefa.');
    }
};

// Logout
const logout = () => {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
};


// Carrega as tasks ao iniciar
loadTasks();
