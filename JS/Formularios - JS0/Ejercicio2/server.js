const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Base de datos temporal
const personas = [];

// Rutas
app.get('/', (req, res) => {
  res.render('index', { 
    success: req.query.success === 'true',
    email: req.query.email || null
  });
});

app.post('/enviar', (req, res) => {
  const { email, pass, hobbie, genre, school, nationality } = req.body;
  const nuevaPersona = { email, pass, hobbie, genre, school, nationality };
  personas.push(nuevaPersona);
  console.log('Nuevo registro:', nuevaPersona);
  
  // Renderiza la misma vista con los datos
  res.render('index', { 
    success: true,
    email: email,
    personas: personas // Pasamos todas las personas registradas
  });
});

app.get('/', (req, res) => {
  res.render('index', { 
    success: req.query.success === 'true',
    email: req.query.email || null,
    personas: personas
  });
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});