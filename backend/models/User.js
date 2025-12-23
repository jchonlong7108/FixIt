// backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true // Es obligatorio
    },
    email: {
        type: String,
        required: true,
        unique: true // No pueden haber dos usuarios con el mismo correo
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        enum: ['USER', 'ADMIN'], // Solo permitimos estos dos valores exactos
        default: 'USER' // Si no especificamos, será un usuario normal
    },
    fecha_registro: {
        type: Date,
        default: Date.now // Se pone la fecha actual automáticamente
    }
});

module.exports = mongoose.model('User', UserSchema);