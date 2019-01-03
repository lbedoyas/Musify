'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas




//convertir a json las peticiones http
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurar Cabeceras http


//Rutas Base

module.exports = app;