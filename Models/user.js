'use strict'

//cargar modulo de mongosse
var mongoose = require('mongoose');
//esta variable es para definir un objeto para guardarlos concretamente en la bd
var Schema = mongoose.Schema;

var userSchema = Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    role: String,
    image: String
});

//User en la instruccion module.exports = mongoose.model('User', userSchema); permite el objeto 
//User que es el mismo nombre de la collecion que se tiene en la base de datos de mongodb
//se guarde como un objeto y se pueda utilizar en otro fichero para que se pueda instanciar
//de acuerdo a los esquemasdefinidos en la variable userShema 03/01/2018
module.exports = mongoose.model('User', userSchema);

