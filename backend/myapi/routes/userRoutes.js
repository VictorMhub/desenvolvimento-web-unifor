const jwt = require('jsonwebtoken');
const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Login de usuário
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Gere o token JWT usando o segredo do .env
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET, // Certifique-se de que essa linha está pegando o segredo corretamente
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
