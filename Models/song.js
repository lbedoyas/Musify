'use strict'

//cargar modulo de mongosse
var mongoose = require('mongoose');
//esta variable es para definir un objeto para guardarlos concretamente en la bd
var Schema = mongoose.Schema;

var SongSchema = Schema({
    number: String,
    name: String,
    duration: String,
    file: String,
    album: { type: Schema.ObjectId, ref: 'Album'}
});

//User en la instruccion module.exports = mongoose.model('Song', SongSchema); permite el objeto 
//User que es el mismo nombre de la collecion que se tiene en la base de datos de mongodb
//se guarde como un objeto y se pueda utilizar en otro fichero para que se pueda instanciar
//de acuerdo a los esquemasdefinidos en la variable SongSchema 03/01/2019
module.exports = mongoose.model('Song', SongSchema);
