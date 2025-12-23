// index.js

// 1. IMPORTACIONES
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Cargar variables de entorno

// 2. CONFIGURACIÓN INICIAL
const app = express();
const PORT = process.env.PORT || 3000;

// 3. MIDDLEWARES (Funciones que se ejecutan antes de llegar a las rutas)
app.use(cors()); // Permite peticiones desde otros dominios (ej. Angular)
app.use(express.json()); // Permite que el servidor entienda JSON en el cuerpo de las peticiones

// 4. RUTA DE PRUEBA
// Esto es para saber si el servidor responde
app.get('/', (req, res) => {
    res.send('Hola! El servidor de FixIt está funcionando 🛠️');
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/users', require('./routes/users'));

// 5. CONEXIÓN A MONGODB
// Nota: process.env.MONGO_URI lo definiremos en el siguiente paso
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Conectado exitosamente a MongoDB'))
    .catch((error) => console.error('❌ Error al conectar a MongoDB:', error));

// 6. INICIAR SERVIDOR
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});