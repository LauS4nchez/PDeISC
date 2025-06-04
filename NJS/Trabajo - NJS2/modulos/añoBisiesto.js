function añoBisiesto ()
{
    const fechaActual = new Date();

    // Revisa el año actual
    añoActual = fechaActual.getFullYear;
    esBisiesto = "El anio actual no es bisiesto";


    // Revisa si al dividir el año actual entre 4, la division da como resto 0 (Si es divisible por 4)
    if (añoActual % 4 == 0)
    {
        esBisiesto = "El año actual es bisiesto";
    }

    return esBisiesto;
}

module.exports = {añoBisiesto};