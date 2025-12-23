// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Importamos el modelo
const bcrypt = require('bcryptjs'); // Para encriptar
const jwt = require('jsonwebtoken'); // Para generar el token

// RUTA 1: REGISTRO (POST /api/auth/register)
router.post('/register', async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // 1. Verificar si el usuario ya existe
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'El usuario ya existe con ese email' });
        }

        // 2. Crear el nuevo usuario (todavía no lo guardamos)
        user = new User({
            nombre,
            email,
            password
            // El rol por defecto será 'USER' según el modelo
        });

        // 3. Encriptar la contraseña
        const salt = await bcrypt.genSalt(10); // Generamos un "ruido" aleatorio
        user.password = await bcrypt.hash(password, salt); // Mezclamos pass + ruido

        // 4. Guardar en Base de Datos
        await user.save();

        res.status(201).json({ msg: 'Usuario registrado exitosamente' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
});

// RUTA 2: LOGIN (POST /api/auth/login)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Verificar si el usuario existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        // 2. Comparar contraseña (la que viene vs la encriptada en DB)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        // 3. Crear el Token (El carnet digital)
        // Guardamos en el token el ID y el ROL del usuario
        const payload = {
            user: {
                id: user.id,
                rol: user.rol 
            }
        };

        // Firmamos el token
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }, // El token dura 1 hora
            (err, token) => {
                if (err) throw err;
                // Devolvemos el token y los datos del usuario al frontend
                res.json({ token, user: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol } });
            }
        );

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
});

module.exports = router;