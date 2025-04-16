function fechaFutura ()
{
    const fechaActual = new Date();

    // Obtener el año, mes y día actual
    const añoActual = fechaActual.getFullYear();
    const mesActual = fechaActual.getMonth() + 1; // El mes es indexado desde 0 (0 = enero)
    const diaActual = fechaActual.getDate();

    // Calcular una fecha futura
    const fechaDespues = new Date(añoActual + 1, mesActual, diaActual + 1);

    return fechaDespues
}

module.exports = {fechaFutura};