function mayorEdad (añoNacimiento)
{
    const fechaActual = new Date();
    var edad, mayor18 = "Usted no tiene aún 18 años";


    // Revisa el año actual y calcula la edad del usuario
    var añoActual = parseInt(fechaActual.getFullYear());
    edad = añoActual - añoNacimiento;


    // Revisa si tiene mas de 18 años
    if (edad >= 18)
    {
        mayor18 = "Usted ya tiene 18 años o los cumplirá en este año";
    }

    return mayor18;
}

module.exports = {mayorEdad};