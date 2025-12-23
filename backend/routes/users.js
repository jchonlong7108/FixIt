const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');

// Middleware para verificar si es ADMIN antes de cualquier acción aquí
const verifyAdmin = (req, res, next) => {
    if (req.user.rol !== 'ADMIN') {
        return res.status(403).json({ msg: 'Acceso denegado.' });
    }
    next();
};

// 1. OBTENER TODOS LOS USUARIOS
router.get('/', [auth, verifyAdmin], async (req, res) => {
    try {
        const users = await User.find().select('-password'); // No enviamos la contraseña
        res.json(users);
    } catch (err) {
        res.status(500).send('Error del servidor');
    }
});

// 2. BORRAR USUARIO
router.delete('/:id', [auth, verifyAdmin], async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Usuario eliminado' });
    } catch (err) {
        res.status(500).send('Error del servidor');
    }
});

// 3. EDITAR USUARIO (Solo Rol y Nombre por simplicidad)
router.put('/:id', [auth, verifyAdmin], async (req, res) => {
    const { nombre, rol } = req.body;
    try {
        await User.findByIdAndUpdate(req.params.id, { nombre, rol });
        res.json({ msg: 'Usuario actualizado' });
    } catch (err) {
        res.status(500).send('Error del servidor');
    }
});

// backend/routes/users.js

// OBTENER UN USUARIO POR ID
router.get('/:id', [auth, verifyAdmin], async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });
        res.json(user);
    } catch (err) {
        res.status(500).send('Error servidor');
    }
});

module.exports = router;