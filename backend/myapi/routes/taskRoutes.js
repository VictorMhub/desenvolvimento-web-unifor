const express = require('express');
const Task = require('../models/Task');
const authenticate = require('../middleware/auth');

const router = express.Router();

// Listar tarefas do usuário
router.get('/', authenticate, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Criar nova tarefa
router.post('/', authenticate, async (req, res) => {
    console.log('Corpo da requisição:', req.body);

    try {
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).json({ message: 'O campo "title" é obrigatório.' });
        }

        const task = new Task({
            title,
            description,
            userId: req.user.id,
        });

        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



// Atualizar tarefa
router.put('/:id', authenticate, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task || task.userId.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Tarefa não encontrada ou acesso negado.' });
        }

        Object.assign(task, req.body);
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Excluir tarefa
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const taskId = req.params.id;

        // Verifica se a tarefa existe e pertence ao usuário autenticado
        const task = await Task.findOne({ _id: taskId, userId: req.user.id });
        if (!task) {
            return res.status(404).json({ message: 'Tarefa não encontrada ou não pertence ao usuário.' });
        }

        // Remove a tarefa usando o método correto
        await Task.deleteOne({ _id: taskId });

        res.json({ message: 'Tarefa removida com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
