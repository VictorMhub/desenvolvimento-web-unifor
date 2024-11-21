require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./myapi/routes/taskRoutes');
const userRoutes = require('./myapi/routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para processar JSON
app.use(express.json());

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conectado ao MongoDB"))
    .catch((error) => console.error("Erro ao conectar ao MongoDB:", error));

// Rotas
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});