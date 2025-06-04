const express = require('express');
const app = express();
const path = require('path');

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.get('/', (req, res) => res.render('index'));
app.get('/componentes/:nombre', (req, res) => {
    res.render(`componentes/${req.params.nombre}`);
});

app.listen(3000, () => console.log('http://localhost:3000/'));