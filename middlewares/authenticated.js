'use strict'

var jwt = require('jwt-simple');

//sirve para crear un token de comprobacion de creacion y expedicion de contraseña
var moment = require('moment');

var secret = 'clave_secreta_curso';

//Nos permite comprobar si los datos son correcto del token generado
exports.ensureAuth = function(req,res,next){
    if(!req.headers.authorization)
    {   
        return res.status(403).send({
            message: 'la peticion no tiene la cabecera de identificacion'
        });
    }

    //Existen situaciones en las que vengan en el token comillas simples y dobles 
    //para prevee eso se debe reemplazar
    var token = req.headers.authorization.replace(/['"]+/g, '');
    try {
        var payload = jwt.decode(token, secret);
        if(payload.exp<= moment().unix())
        {
            return res.status(401).send({
                message: 'Token a expirado'
            }); 
        }
    } catch (ex) {
        console.log(ex);
        return res.status(404).send({
            message: 'Token no valido'
        });
    }

    req.user = payload;
    next();
};