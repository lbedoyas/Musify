'use strict'
var jwt = require('jwt-simple');

//sirve para crear un token de comprobacion de creacion y expedicion de contraseña
var moment = require('moment');


var secret = 'clave_secreta_curso';

//Este metodo permite el ingreso del usuario que se va guardar dentro de un token 
//tambien se puede comprobar si un usuario esta logeado o no
exports.createToken = function(user){
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        imagen: user.image,
        //saca la fecha en Unix
        iat: moment().unix(),
        //la contraseña expira en 30 dias 
        exp: moment().add(30, 'Days').unix
    };

    return jwt.encode(payload, secret );
};