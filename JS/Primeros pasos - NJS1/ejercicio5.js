document.addEventListener('DOMContentLoaded', function() {
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
    
    var r1 = document.getElementById("suma");
    var r2 = document.getElementById("resta");
    var r3 = document.getElementById("mult");
    var r4 = document.getElementById("divi");


    r1.innerText = suma (5, 3);
    r2.innerText = resta (8, 6);
    r3.innerText = mult (3, 11);
    r4.innerText = divi (30, 5);
});