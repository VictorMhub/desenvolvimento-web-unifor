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
    try {
        const task = new Task({ ...req.body, userId: req.user.id });
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
        const task = await Task.findById(req.params.id);
        if (!task || task.userId.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Tarefa não encontrada ou acesso negado.' });
        }

        await task.remove();
        res.json({ message: 'Tarefa removida.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
