// backend/models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    prioridad: {
        type: String,
        enum: ['BAJA', 'MEDIA', 'ALTA'],
        default: 'BAJA'
    },
    lugar: {
        type: String, // Ej: "Baño Piso 2", "Recepción"
        required: true
    },
    completada: {
        type: Boolean,
        default: false // Las tareas nacen pendientes
    },

    resolucion: {
        type: String, // El comentario del admin al cerrar la tarea
        default: ''
    },
    
    // RELACIÓN: Aquí conectamos la tarea con el usuario
    creado_por: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Nombre exacto del modelo que exportamos en User.js
        required: true
    },
    fecha_creacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Task', TaskSchema);