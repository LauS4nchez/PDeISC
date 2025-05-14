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
    success: req.query.success,
    error: req.query.error,
    personas: personas
  });
});

app.post('/guardar', (req, res) => {
  try {
    // Validación adicional del servidor
    if (!req.body.nombre || !req.body.apellido || !req.body.email) {
      throw new Error('Faltan campos obligatorios');
    }

    const nuevaPersona = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      edad: parseInt(req.body.edad),
      fechaNacimiento: req.body.fechaNacimiento,
      sexo: req.body.sexo,
      documento: req.body.documento,
      estadoCivil: req.body.estadoCivil,
      nacionalidad: req.body.nacionalidad,
      telefono: req.body.telefono,
      email: req.body.email,
      hijos: req.body.hijos ? parseInt(req.body.hijos) : 0
    };

    personas.push(nuevaPersona);
    res.redirect('/?success=Datos guardados correctamente');
  } catch (error) {
    res.redirect(`/?error=${encodeURIComponent(error.message)}`);
  }
});

app.get('/listado', (req, res) => {
  res.render('listado', { personas: personas });
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});