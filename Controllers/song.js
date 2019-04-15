'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Artist = require('../Models/artist');
var Album = require('../Models/album');
var Song = require('../Models/song');


function getSong(req, res){
    var songId = req.params.id;

    Song.findById(songId).populate({path: 'album'}).exec((err, song)=>{
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else
        {
            if(!song){
                res.status(404).send({message: 'La cancion no existe'});
            }
            else
            {
                res.status(200).send({song})
            }
        }
    })

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



function getSongs(req,res){
    var albumId = req.params.album;
    if(!albumId){
        var find = song.find({}).sort('number');
    }else{
        var find = Song.find({album: albumId}).sort('number');
    }
    find.populate({
        path: 'album',
        populate: {
            path: 'artist',
            model: 'Artist'
        }
    }).exec(function(err, songs){
        if(err){
            res.status(500).send({message: 'error en la peticion'});
        }
        else
        {
            if(!songs){
                res.status(404).send({message: 'No hay canciones'});
            }else
            {
                res.status(200).send({song});
            }
        }
    })
}


function updateSong(req, res){
    var songId = req.params.id;
    var update = req.body;

    Song.findByIdAndUpdate(songId, update,(err,songUpdate)=>{
        if(err){
            res.status(500).send({message: 'error en la peticion'});
        }
        else
        {
            if(!songUpdate){
                res.status(404).send({message: 'No se a actualizado las canciones'});
            }else
            {
                res.status(200).send({song: songUpdate});
            }
        }
    });
}


function deleteSong(req,res){
    var songId = req.params.id;
    Song.findByIdAndRemove(songId, (err, songRemove)=>{
        if(err){
            res.status(500).send({message: 'error en la peticion'});
        }
        else
        {
            if(!songRemove){
                res.status(404).send({message: 'No se a elimino la cancion'});
            }else
            {
                res.status(200).send({song: songRemove});
            }
        }
    });
}





function uploadFile(req, res){
    var songId = req.params.id;
    var file_name = 'no subido....';

    if(req.files)
    {
        var file_path = req.files.file.path;
        //con esta instruccion separamos por el / el directorio convertido en arreglo
        console.log(file_path);
        var file_split = file_path.split('/');
        var file_name = file_split[2];

        //sacar la extension de la img
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
        console.log(file_path);
        console.log(ext_split[1]);

        if(file_ext == 'mp3' || file_ext ==  'ogg')
        {
            Song.findByIdAndUpdate(songId, {file: file_name}, (err, songUpdate) => {
                    if(!songUpdate)
                {
                    res.status(404).send({message: 'La cancion no se a podido actualizar'});
                }else{
                    res.status(200).send({song: songUpdate});
                }
                });
        }else
        {
            res.status(200).send({message: 'Extension del archivo no valida '});
        }
    }else{
        res.status(200).send({message: 'No has subido ninguna cancion...'});
    }
}

function getSongFile(req, res)
{
    var imageFile = req.params.songFile;
    var path_file = '../uploads/songs'+imageFile;
    fs.exists(path_file, function(exists){
                if(exists)
                {
                    res.sendFile(path.resolve(path_file));
                }else
                {
                    res.status(200).send({message: 'LA Cancion NO EXISTE '});
                }
    });
}



module.exports = {
    getSong,
    saveSong,
    getSongs,
    updateSong,
    deleteSong,
    uploadFile,
    getSongFile
};