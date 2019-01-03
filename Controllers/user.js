'use strict'

var User = require('../models/user');
// Se carga modulo de bcrypt para guardar la contraseña desde ya incriptada
var bcrypt = require('bcrypt-nodejs');

function pruebas(req, res){
    res.status(200).send({
        mensage: 'Probando una accion del controlador de usuarios'
    })
}

function saveUser(req, res)
{
    //se crea el objeto tomando como base el modelo
    var user = new User();
    //esta variable recoge todo los datos que lleguen por post
    var params = req.body;
    console.log(params);
    //
    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_ADMIN';
    user.image = 'null';

    if(params.password)
    {
        //Encriptar Contraseña 
        bcrypt.hash(params.password,null,null, function(err, hash){
            user.password = hash;
            //Aca comprobamos que los campos tengan informacion
            if(user.name != null && user.surname != null && user.email != null)
            {
                //Guarda el usuario
                //.save es un metodo de mongoose
                user.save((err, userStored) => {
                    if(err)
                    {
                        res.status(500).send({message: 'Error al guardar el usuario'});
                    }else
                    {
                            if(!userStored)
                            {
                                res.status(404).send({message: 'No se a registrado el usuario'});
                            }else{
                                //Si no hay errores entra aca
                                res.status(200).send({user: userStored});
                            }
                    }
                });
            }else{
                res.status(200).send({message: 'Introduce todos los campos'});
            }
        });
    }else
    {
        res.status(500).send({message: 'Introduce la contraseña'});
    }
}

module.exports = {
    pruebas,
    saveUser

};