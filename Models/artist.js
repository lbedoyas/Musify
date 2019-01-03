'use strict'

//cargar modulo de mongosse
var mongoose = require('mongoose');
//esta variable es para definir un objeto para guardarlos concretamente en la bd
var Schema = mongoose.Schema;

var ArtistSchema = Schema({
    name: String,
    description: String,
    image: String
});

//User en la instruccion module.exports = mongoose.model('Artist', userSchema); permite el objeto 
//User que es el mismo nombre de la collecion que se tiene en la base de datos de mongodb
//se guarde como un objeto y se pueda utilizar en otro fichero para que se pueda instanciar
//de acuerdo a los esquemasdefinidos en la variable ArtistSchema 03/01/2019
module.exports = mongoose.model('Artist', ArtistSchema);

