// backend/routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth'); // Importamos al portero

// RUTA 1: OBTENER TAREAS (GET /api/tasks)
// Acceso: Usuarios (ven las suyas) y Admins (ven todas)
router.get('/', auth, async (req, res) => {
    try {
        let tasks;
        // Si es ADMIN, busca todo. Si es USER, solo busca las que coincidan con su ID via 'creado_por'
        if (req.user.rol === 'ADMIN') {
            tasks = await Task.find().sort({ fecha_creacion: -1 }).populate('creado_por', 'nombre email'); 
            // .populate sirve para traer el nombre del usuario en vez de solo el ID
        } else {
            tasks = await Task.find({ creado_por: req.user.id }).sort({ fecha_creacion: -1 });
        }
        res.json(tasks);
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
});

// RUTA 2: CREAR TAREA (POST /api/tasks)
// Acceso: Cualquiera autenticado
router.post('/', auth, async (req, res) => {
    const { titulo, descripcion, prioridad, lugar } = req.body;

    try {
        const newTask = new Task({
            titulo,
            descripcion,
            prioridad,
            lugar,
            creado_por: req.user.id // Sacamos el ID del token (gracias al middleware)
        });

        const task = await newTask.save();
        res.json(task);
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
});

// RUTA 3: EDITAR TAREA (PUT /api/tasks/:id)
// Acceso: SOLO ADMIN
router.put('/:id', auth, async (req, res) => {
    // 1. Verificación de seguridad estricta
    if (req.user.rol !== 'ADMIN') {
        return res.status(403).json({ msg: 'Acceso denegado: No eres Administrador' });
    }

    const { titulo, descripcion, prioridad, lugar, completada, resolucion } = req.body;
    
    // Construir objeto con los cambios
    const taskFields = {};
    if (titulo) taskFields.titulo = titulo;
    if (descripcion) taskFields.descripcion = descripcion;
    if (prioridad) taskFields.prioridad = prioridad;
    if (lugar) taskFields.lugar = lugar;
    if (typeof completada === 'boolean') taskFields.completada = completada;
    if (resolucion) taskFields.resolucion = resolucion;

    try {
        // Buscar y actualizar
        let task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ msg: 'Tarea no encontrada' });

        task = await Task.findByIdAndUpdate(req.params.id, { $set: taskFields }, { new: true });
        res.json(task);
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ msg: 'Tarea no encontrada' });
        }

        // Seguridad: Verificar si el usuario es dueño de la tarea o es Admin
        if (req.user.rol !== 'ADMIN' && task.creado_por.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado para ver esta tarea' });
        }

        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
});


// RUTA 4: BORRAR TAREA (DELETE /api/tasks/:id)
// Acceso: SOLO ADMIN
router.delete('/:id', auth, async (req, res) => {
    // 1. Verificación de seguridad estricta
    if (req.user.rol !== 'ADMIN') {
        return res.status(403).json({ msg: 'Acceso denegado: No eres Administrador' });
    }

    try {
        let task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ msg: 'Tarea no encontrada' });

        await Task.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Tarea eliminada correctamente' });
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
});

module.exports = router;