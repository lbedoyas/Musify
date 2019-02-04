'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Artist = require('../Models/artist');
var Album = require('../Models/album');
var Song = require('../Models/song');

function getAlbum(req, res){
    var albumId = req.params.id;

    Album.findById(albumId).populate({path: 'artist'}).exec((err, album)=> {
        if(err)
        {
            res.status(500).send({message: 'Error en la peticion'});
        }else
        {
            if(!album){
                res.status(404).send({message: 'El album no existe'});
            }else
            {
                res.status(200).send({album});
            }
        }
    });

}

function saveAlbum(req, res){
    var album = new Album();

    var params = req.body;
    album.title = params.title;
    album.description = params.description;
    album.year = params.year;
    album.image = 'null';
    album.artist = params.artist;



    album.save((err, albumStored) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }
        else
        {
            if(!albumStored)
            {
                res.status(404).send({message: 'Nose a guardado'});
            }else
            {
                res.status(200).send({album: albumStored});
            }
        }
    });
}



module.exports = {
    getAlbum,
    saveAlbum
};