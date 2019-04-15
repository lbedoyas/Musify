'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Artist = require('../Models/artist');
var Album = require('../Models/album');
var Song = require('../Models/song');


function getSong(req, res){
    res.status(200).send({message: 'controlador cancion'});
}


function saveSong(req, res){
    var song = new Song();
    var params = req.body;
    song.number = params.number;
    song.name = params.name;
    song.duration = params.duration;
    song.file = null;
    song.album = params.album;

    song.save((err,songStored)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }
        else
        {
            if(!song){
                res.status(404).send({message: 'No se a guardado la cancion'});
            }else{
                res.status(200).send({song: songStored});
            }
        }
    });
}


module.exports = {
    getSong,
    saveSong
};