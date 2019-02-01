'use strict'

var express = require('express');
var AlbumController = require('../Controllers/album');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');


// Esta libreria permite trabajar con la subida de files 31/01/2019
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/album'});

api.get('/album', md_auth.ensureAuth, AlbumController.getAlbum);


module.exports = api;