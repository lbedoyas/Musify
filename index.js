'use strict'

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/musify', (err, res) => {
    if(err)
    {
        throw err; 
    }
    else
    {
        console.log("La conexion a la BD esta corriendo correctamente");
    }
});