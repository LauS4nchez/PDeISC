document.addEventListener('DOMContentLoaded', () => {
    const addH1Button = document.getElementById('addH1');
    const changeH1Button = document.getElementById('changeH1');
    const colorH1Button = document.getElementById('colorH1');
    const addImageButton = document.getElementById('addImage');
    const changeImageButton = document.getElementById('changeImg');
    const sizeImageButton = document.getElementById('sizeImg');

    const contentDiv = document.getElementById('content');
    const contentImg = document.getElementById('img-content');

    let imgElement = null;
    let h1Element = null;
    
    let h1Created = false;
    let h1Changed = false;
    let h1ColorChanged = false;
    let imgCreated = false;
    let imgChanged = false;
    let imgSizeChanged = false;
    
    const images = {
        original: '../img/G_Force1.png',
        alternativa: '../img/G_Force2.png'
    };
    

    // Función para agregar un H1
    addH1Button.addEventListener('click', () => {
        // Verificar si ya existe un H1
        if (h1Created) {
            alert('Ya has creado el H1 "Hola DOM". Solo se permite uno.');
            return;
        }
        
        // Crear el H1 si no existe
        h1Element = document.createElement('h1');
        h1Element.textContent = 'Hola DOM';
        contentDiv.appendChild(h1Element);
        
        h1Created = true; // Marcar que ya se creó el H1
    });

    // Función para cambiar el texto del H1
    changeH1Button.addEventListener('click', () => {
        // Verifica que ya este creado el H1 y que no se haya cambiado ya
        if (h1Created && !h1Changed) {
            h1Element.textContent = 'Chau DOM';
            h1Changed = true;
            return;
        }

        // Si ya lo creo pero ya lo cambió, revierte el cambio poniendo Hola DOM
        else if (h1Created && h1Changed){
            h1Element.textContent = 'Hola DOM';
            h1Changed = false;
            return;
        }

        else {
            alert('Se necesita crear primero el h1 antes de poder cambiarlo, creelo tocando el boton');
        }
    });

    //Función para cambiar el color
    colorH1Button.addEventListener('click', () => {
        // Verifica que ya este creado el H1 y que no se haya cambiado y luego cambia el color
        if (h1Created && !h1ColorChanged) {
            h1Element.style.color = 'blue';
            h1ColorChanged = true;
            return;
        }

        // Si ya lo creo pero ya lo cambió, revierte el cambio
        else if (h1Created && h1ColorChanged){
            h1Element.style.color = 'black';
            h1ColorChanged = false;
            return;
        }

        else {
            alert('Se necesita crear primero el h1 antes de poder cambiarlo, creelo tocando el boton');
        }
    });

    // Función para agregar una imagen
    addImageButton.addEventListener('click', () => {
        // Verificar si ya existe una imagen
        if (imgCreated) {
            alert('Ya has creado la imagen. Solo se permite una.');
            return;
        }
        
        // Crear la imagen si no existe
        imgElement = document.createElement('img');
        imgElement.src = images.original;
        contentImg.appendChild(imgElement);
        
        imgCreated = true; // Marcar que ya se creó la imagen
    });

    // Función para cambiar la imagen
    changeImageButton.addEventListener('click', () => {
        // Verifica que ya este creado la imagen y que no se haya cambiado ya
        if (imgCreated && !imgChanged) {
            imgElement.src = images.alternativa;
            imgChanged = true;
            return;
        }

        // Si ya lo creo pero ya lo cambió, revierte el cambio
        else if (imgCreated && imgChanged){
            imgElement.src = images.original
            imgChanged = false;
            return;
        }

        else {
            alert('Se necesita crear primero la imagen antes de poder cambiarla, creela tocando el boton');
        }
    });

    // Función para cambiar el tamaño
    sizeImageButton.addEventListener('click', () => {
        // Verifica que ya este creada la imagen y que no se haya cambiado
        if (imgCreated && !imgSizeChanged) {
            imgElement.style.width = '300px';
            imgElement.style.heigth = '225px';
            imgSizeChanged = true;
            return;
        }

        // Si ya lo creo pero ya lo cambió, revierte el cambio
        else if (imgCreated && imgSizeChanged){
            imgElement.style.width = '600px';
            imgElement.style.width = '450px';
            imgSizeChanged = false;
            return;
        }

        else {
            alert('Se necesita crear primero la imagen antes de poder cambiarla, creela tocando el boton');
        }
    });
});