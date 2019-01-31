'use strict'

var path = require('path');
var fs = require('fs');

var Artist = require('../Models/artist');
var Album = require('../Models/album');
var Song = require('../Models/song');

function getArtist(req, res){
    res.status(200).send({mesage: 'Metodo getArtist del controlador artist'});
}

module.exports = {
    getArtist
};