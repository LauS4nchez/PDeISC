// Módulos requeridos
var http = require('http');       // Módulo para crear el servidor HTTP
var fs = require('fs');          // Módulo para operaciones con archivos

// Módulos personalizados
const Bisiesto = require('../modulos/añoBisiesto.js');          // Verifica años bisiestos
const fechaProxima = require('../modulos/fechaFutura.js');      // Calcula fechas futuras
const mayoriaEdad = require('../modulos/mayorEdad.js');         // Verifica mayoría de edad

// Crear servidor HTTP
http.createServer(function (req, res) {
  // Generar contenido HTML dinámico
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mi Página</title>
    </head>
    <body>
        <h1>Hola!</h1>
        <!-- Secciones dinámicas -->
        <p>¿Este año es bisiesto? ${Bisiesto.añoBisiesto()} <br></p>
        <p>¿Cómo será la fecha un día, un mes y un año después? ${fechaProxima.fechaFutura()} <br></p>
        <p>¿Soy mayor de edad si nací en 2007? ${mayoriaEdad.mayorEdad(2007)} <br></p>
    </body>
    </html>
  `;
      
  // Guardar el HTML en archivo (sobrescribe si existe)
  fs.writeFile('mihtml.html', htmlContent, function (err) {
    if (err) throw err;
    console.log('Archivo HTML actualizado!');
  });
    
  // Leer y servir el archivo HTML generado
  fs.readFile('mihtml.html', function(err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error al cargar la página');
    }
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write(data);
    return res.end();
  });
}).listen(8080, function() {
  console.log('Servidor ejecutándose en http://localhost:8080/');
});