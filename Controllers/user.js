'use strict'

var fs =  require('fs');
var path = require('path');
var User = require('../models/user');
// Se carga modulo de bcrypt para guardar la contraseña desde ya incriptada
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');

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



//con esta funcion se comprueba si los datos que estan en la base de datos 
//coinciden
function loginUser(req, res)
{
    //los objetos que llegan siempre son tipo JSON gracias a la libreria BodyParse
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()}, (err, user) => {
            if(err)
            {
                res.status(500).send({message: 'Error en la peticion'});
            }else{
                if(!user)
                {
                    res.status(404).send({message: 'El usuario no existe'});
                }else{
                    //comprobar contraseña
                    bcrypt.compare(password, user.password, function(err, check){
                            if(check)
                            {
                                //devolver los datos del usuario logeado
                                if(params.gethash)
                                {
                                    //Devolver un token de jwt
                                    res.status(200).send({
                                        token: jwt.createToken(user)
                                    });
                                }
                                else
                                {
                                    res.status(200).send({user});
                                }
                            }else
                            {
                                res.status(404).send({message: 'El usuario no ha podido logearse'});
                            }
                    });
                }

            }
    });
}

function updateUser(req, res){
    var userId = req.params.id;
    var update = req.body;

    User.findByIdAndUpdate(userId, update,(err,userUpdated)=>{
        if(err){
            res.status(500).send({message: 'Error al actualizar el usuario'});
        }
        else
        {
            if(!userUpdated){
                res.status(404).send({message: 'El usuario no se a podido actualizar '});
            }
            else
            {
                res.status(200).send({user: userUpdated});
            }
        }
    });
}

function uploadImage(req, res){
    var userId = req.params.id;
    var file_name = 'no subido....';

    if(req.files)
    {
        var file_path = req.files.image.path;
        //con esta instruccion separamos por el / el directorio convertido en arreglo
        console.log(file_path);
        var file_split = file_path.split('/');
        var file_name = file_split[2];

        //sacar la extension de la img
        var ext_split = file_name.split('.');
        var file_ext = ext_split[1];
        console.log(file_path);
        console.log(ext_split[1]);

        if(file_ext == 'png' || file_ext ==  'jpeg' || file_ext == 'jpg' || file_ext == 'gif')
        {
            User.findByIdAndUpdate(userId, {image: file_name}, (err, userUpdated) => {
                    if(!userUpdated)
                {
                    res.status(404).send({message: 'El usuario no se a podido actualizar'});
                }else{
                    res.status(200).send({user: userUpdated});
                }
                });
        }else
        {
            res.status(200).send({message: 'Extension del archivo no valida '});
        }
    }else{
        res.status(200).send({message: 'No has subido ninguna imagen...'});
    }
}

function getImageFile(req, res)
{
    var imageFile = req.params.imageFile;
    var path_file = '../uploads/users'+imageFile;
    fs.exists(path_file, function(exists){
                if(exists)
                {
                    res.sendFile(path.resolve(path_file));
                }else
                {
                    res.status(200).send({message: 'LA IMAGEN NO EXISTE '});
                }
    });
}


module.exports = {
    pruebas,
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile

};