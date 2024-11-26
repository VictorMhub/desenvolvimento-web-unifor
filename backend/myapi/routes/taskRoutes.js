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

router.get('/:id', authenticate, async (req, res) => {
    try {
      const taskId = req.params.id;
      const userId = req.user.id;
  
      // Encontrar a tarefa e garantir que pertence ao usuário autenticado
      const task = await Task.findOne({ _id: taskId, userId: userId });
  
      if (!task) {
        return res.status(404).json({ message: 'Tarefa não encontrada ou acesso negado.' });
      }
  
      res.status(200).json(task);
    } catch (error) {
      console.error('Erro ao buscar tarefa:', error);
      res.status(500).json({ message: 'Erro ao buscar tarefa.', error: error.message });
    }
  });

// Criar nova tarefa
router.post('/', authenticate, async (req, res) => {
    console.log('Corpo da requisição:', req.body);

    try {
        const { title, description, completed } = req.body;
        console.log('Título recebido:', title);
        console.log('descrição recebida:', description);
        

        if (!title) {
            return res.status(400).json({ message: 'O campo "title" é obrigatório.' });
        }

        const task = new Task({
            title,
            description,
            completed,
            userId: req.user.id,
        });

        await task.save();
        res.status(201).json(task);
    } catch (error) {
        console.error('Erro ao salvar tarefa:', error);
        res.status(400).json({ message: error.message });
    }
});


// Atualizar tarefa
router.put('/:id', authenticate, async (req, res) => {
    try {
        const taskId = req.params.id; // ID da tarefa
        const userId = req.user.id;  // ID do usuário autenticado
        console.log(req.body);
        
        // Encontrar tarefa pertencente ao usuário
        const task = await Task.findOne({ _id: taskId, userId: userId });

        if (!task) {
            return res.status(404).json({ message: 'Tarefa não encontrada ou acesso negado.' });
        }

        // Atualizar campos manualmente
        if (req.body.title !== undefined) task.title = req.body.title;
        if (req.body.description !== undefined) task.description = req.body.description;
        if (req.body.completed !== undefined) task.completed = req.body.completed;

        // Salvar alterações
        const updatedTask = await task.save();

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar a tarefa.', error: error.message });
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
