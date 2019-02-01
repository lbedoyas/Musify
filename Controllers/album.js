'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Artist = require('../Models/artist');
var Album = require('../Models/album');
var Song = require('../Models/song');

function getAlbum(req, res){

   res.status(200).send({message: 'Accion getAlbum'});

}

module.exports = {
    getAlbum
};