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

function updateAlbum(req, res){
    var albumId = req.params.id;
    var update = req.body;

    Album.findByIdAndUpdate(albumId, update, (err, albumUpdated)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }
        else
        {
            if(!albumUpdated){
                res.status(404).send({message: 'No se a actualizado el album'});
            }else{
                res.status(200).send({album: albumUpdated});
            }
        }
    });
}


function deleteAlbum(req,res){
    var albumId = req.params.id;

    Album.find({artist: albumId}).remove((err, albumRemoved) => {
        if(err){
            res.status(500).send({message: 'Error al eliminar el artista'});
        }
        else
        {
            if(!albumRemoved)
            {
                res.status(404).send({message: 'El Album no a sido eliminado'});
            }
            else{


                    Song.find({album: albumRemoved._id}).remove((err, songRemoved) => {
                        if(err){
                            res.status(500).send({message: 'Error al eliminar la cancion'});
                        }
                        else
                        {
                            if(!songRemoved)
                            {
                                res.status(404).send({message: 'la cancion no a sido eliminada'});
                            }
                            else{
                            
                                res.status(200).send({album: albumRemoved});
                            }
                        }
                    });
            

            }
        }
    });
}


module.exports = {
    getAlbum,
    saveAlbum,
    getAlbums,
    updateAlbum,
    deleteAlbum
};