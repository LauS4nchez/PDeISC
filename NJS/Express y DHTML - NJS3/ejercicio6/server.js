const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Configuración
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/register', (req, res) => {
    // Procesar los datos del formulario
    const formData = req.body;
    
    // Aquí normalmente guardarías en una base de datos
    
    // Redirigir con un parámetro para simular el envío exitoso
    res.redirect('/?submitted=true');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});