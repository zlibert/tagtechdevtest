"use strict";
const express = require('express');
const Character = require('../models/character');
const https = require('https');

let router = express.Router();

router.route('/sync')
.get((req, res) => {
    //res.send("Connects to https://api.got.show/api/book/characters and stores the json data to DB");
    var options = {
        host: 'api.got.show',
        path: '/api/book/characters',
        headers: {'User-Agent': 'request'}
    };

    https.get(options, (remoteRes) => {
        var json = '';
        remoteRes.on('data', function (chunk) {
            json += chunk;
        });
        remoteRes.on('end', function () {
            if (remoteRes.statusCode === 200) {
                var data = JSON.parse(json);
                
                Character.insertMany(data).then(function(){
                    return res.send("Characters updated");
                }).catch(function(error){
                    return res.send("Error updating characters: ", error);
                    console.log(error);
                }); 
            }
            else {
                console.log('Error downloading characters from API: ', remoteRes.statusCode);
            }
            });
    }).on('error', function (err) {
            console.log('Error:', err);
        });
});

router.route('/')
.get((req, res) => {
    Character.find({}, function(err, characters) {
        var characterMap = {};
        characters.forEach(function(character) {
            characterMap[character._id] = character;
        });
        res.send(characterMap);  
    });
});
router.route('/:id')
.get((req, res) => {
    var id = req.params.id;
    try {
        Character.findById(id, function(err, character) {
            if (character != null) {
                return res.send(character);
            }
            else
            {
                return res.status(403).send("There's no character with that id");
            }           
        });
    }
    catch(err){
        console.log("Error retrieving character with id: ", id, ". " , err);
        return res.status(500).send(err);
    }
});

module.exports = router;
