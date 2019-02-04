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


function getAlbums(req, res){
    var artistId = req.params.artist;

    if(!artistId){
        // sacar todos los albums de la base de datos
        var find = Album.find({}).sort('title');
    }else
    {
        //sacar los albums de un artista concreto de BD
        var find = Album.find({artist: artistId}).sort('year');
    }

    find.populate({path: 'artist'}).exec((err, albums)=>
    {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else
        {
            if(!albums){
                res.status(404).send({message: 'No hay albums'});
            }
            else
            {
                res.status(200).send({albums});
            }
        }
    });
}


module.exports = {
    getAlbum,
    saveAlbum,
    getAlbums
};