require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
// Middleware para processar o JSON
app.use(express.json());

//Conexção com o MongoDB
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopolgy:true})
.then(() => console.log("Conectado ao MongoDB"))
.catch((error) => console.error("Erro ao conectar ao MongoDB"), error);

//Rotas
app.use('/api/task', taskRoutes);
app.use('/api/users', userRoutes);

//Inicializando o Servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})