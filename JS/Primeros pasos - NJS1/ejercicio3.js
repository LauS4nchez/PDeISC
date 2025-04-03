var n1 = 4, n2 = 5;

console.log("La suma de 4 y 5 es: ",suma(n1, n2));

n1 = 3;
n2 = 6;

console.log("La resta de 3 y 6 es: ",resta(n1, n2));

n1 = 2;
n2 = 7;

console.log("La multiplicacion de 2 y 7 es: ",mult(n1, n2));

n1 = 20;
n2 = 4;

console.log("La division de 20 entre 4 es: ",divi(n1, n2));


function suma (n1, n2)
{
    return (n1+n2);
}

function resta (n1, n2)
{
    return (n1-n2);
}

function mult (n1, n2)
{
    return (n1*n2);
}

function divi (n1, n2)
{
    return (n1/n2);
}