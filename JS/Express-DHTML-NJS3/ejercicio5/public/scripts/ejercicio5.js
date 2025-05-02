document.addEventListener('DOMContentLoaded', () => {
    const argFlag = document.getElementById('arg-flag');
    const uruFlag = document.getElementById('uru-flag');
    const flagDisplay = document.getElementById('flags-display');
    
    divArgFlag = '<img src="/img/arg.png">';
    divUruFlag = '<img src="/img/uru.png">';

    argFlag.addEventListener('click', () => {
        flagDisplay.innerHTML = divArgFlag
    });

    uruFlag.addEventListener('click', () => {
        flagDisplay.innerHTML = divUruFlag
    });
});