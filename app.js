'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var user_routes = require('./routes/user');
var artist_routes = require('./routes/artist');



//convertir a json las peticiones http
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurar Cabeceras http


//Rutas Base
app.use('/api', user_routes);
app.use('/api', artist_routes);



module.exports = app;