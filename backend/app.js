require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./myapi/routes/taskRoutes');
const userRoutes = require('./myapi/routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');


app.use(cors());



app.use(express.json());


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conectado ao MongoDB"))
    .catch((error) => console.error("Erro ao conectar ao MongoDB:", error));


app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});