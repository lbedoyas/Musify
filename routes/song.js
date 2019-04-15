'use strict'

var express = require('express');
var SongControllerController = require('../Controllers/song');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');


// Esta libreria permite trabajar con la subida de files 31/01/2019
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/songs'});

api.get('/song:id', md_auth.ensureAuth, SongController.getSong);
api.post('/song', md_auth.ensureAuth, SongControllerController.saveSong);
api.get('/songs/:album', md_auth.ensureAuth, SongController.getSongs);
api.put('/song:id', md_auth.ensureAuth, SongControllerController.updateSong);
api.delete('/song/:id', md_auth.ensureAuth,SongControllerController.deleteSong);
api.post('/upload-file-song/:id', [md_auth.ensureAuth, md_upload], SongControllerController.uploadFile);
api.get('/get-song-file/:songFile', SongControllerController.getSongFile);



module.exports = api;