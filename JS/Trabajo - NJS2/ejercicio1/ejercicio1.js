// Se importan las funciones como objetos (No confundir con las funciones dentro de estos objetos)
const Bisiesto = require ('../modulos/añoBisiesto.js');
const fechaProxima = require ('../modulos/fechaFutura.js');
const mayoriaEdad = require ('../modulos/mayorEdad.js');

// Se ejecutan las funciones y se guardan los resultados en estas variables
var fechaDespues = fechaProxima.fechaFutura ();
var esBisiesto = Bisiesto.añoBisiesto ();
var soyMayor = mayoriaEdad.mayorEdad(2007);

//Se imprimen los resultados por consola
console.log (fechaDespues);
console.log (esBisiesto);
console.log (soyMayor);
