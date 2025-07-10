export class CZooAnimal{
    constructor(idAnimal, nombre, jaulaNumero, idTypeAnimal, peso) {
        this._idAnimal = idAnimal;
        this._nombre = nombre;
        this._jaulaNumero = jaulaNumero;
        this._idTypeAnimal = idTypeAnimal;
        this._peso = peso;
    }

    //Getters
    get idAnimal() {
        return this._idAnimal;
    }

    get nombre() {
        return this._nombre;
    }

    get jaulaNumero() {
        return this._jaulaNumero;
    }

    get idTypeAnimal() {
        return this._idTypeAnimal;
    }

    get peso() {
        return this._peso;
    }

    // Setters
    set idAnimal(nuevoId) {
        this._idAnimal = nuevoId;
    }

    set nombre(nuevoNombre) {
        this._nombre = nuevoNombre;
    }

    set jaulaNumero(nuevaJaula) {
        this._jaulaNumero = nuevaJaula;
    }

    set idTypeAnimal(nuevoTipo) {
        this._idTypeAnimal = nuevoTipo;
    }

    set peso(nuevoPeso) {
        this._peso = nuevoPeso;
    }
};