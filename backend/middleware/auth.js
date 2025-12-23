// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // 1. Leer el token del header (la cabecera de la petición)
    // Cuando enviemos datos desde Angular, enviaremos un header llamado 'x-auth-token'
    const token = req.header('x-auth-token');

    // 2. Revisar si no hay token
    if (!token) {
        return res.status(401).json({ msg: 'No hay token, permiso denegado' });
    }

    // 3. Validar el token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Si el token es válido, guardamos los datos del usuario en la petición (req)
        // Así, en las siguientes rutas podremos usar req.user.id o req.user.rol
        req.user = decoded.user;
        
        next(); // ¡Pase usted! Continúa a la siguiente función
    } catch (err) {
        res.status(401).json({ msg: 'Token no válido' });
    }
};