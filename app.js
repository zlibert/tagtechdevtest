const express = require('express');
const app = express();
const mongoose = require('mongoose');
'use strict';
const https = require('https');

const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
    titles: [
        {
        type: String
        }
    ],
    spouse: [
        {
        type: String
        }
    ],
    children: [
        {
        type: String
        }
    ],
    allegiance: [
        {
        type: String
        }
    ],
    books: [
        {
        type: String
        }
    ],
    plod: {
        type: Number
    },
    longevity: [
        {
        type: String
        }
    ],
    plodB: {
        type: Number
    },
    plodC: {
        type: Number
    },
    longevityB: [
        {
        type: String
        }
    ],
    longevityC: [
        {
        type: String
        }
    ],
    _id: {
        type: String
    },
    name: {
        type: String
    },
    slug: {
        type: String
    },
    alive: {
        type: Boolean
    },
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    },    
    __v: {
        type: Number
    },
    pagerank: {
        title: {
            type: String
        },
        rank: {
            type: Number
        }
    },
    id: {
        type: String
    }
});

const Character = mongoose.model('Character', CharacterSchema);

// Routes
app.get('/', (req, res) => {
    res.send("Test");
});

app.get('/characters/sync', (req, res) => {
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
                try {
                    mongoose.connect('mongodb://tagtechUser:PassWorD@localhost:27017/tagtech', { useNewUrlParser: true , useUnifiedTopology: true }, () => 
                    {
                        console.log('Connected to DB')
                        var data = JSON.parse(json);
                        
                        Character.insertMany(data).then(function(){
                            return res.send("Characters updated");
                        }).catch(function(error){
                            return res.send("Error updating characters: ", error);
                            console.log(error);
                        }); 
                });
                } catch (e) {
                    console.log('Error connecting to DB');
                }
            } else {
                console.log('Error downloading characters from API: ', remoteRes.statusCode);
            }
        });
    }).on('error', function (err) {
            console.log('Error:', err);
        });
});

app.get('/characters', (req, res) => {
    try {
        mongoose.connect('mongodb://tagtechUser:PassWorD@localhost:27017/tagtech', { useNewUrlParser: true , useUnifiedTopology: true }, () => 
        {
            Character.find({}, function(err, characters) {
                var characterMap = {};
            
                characters.forEach(function(character) {
                  characterMap[character._id] = character;
                });
            
                res.send(characterMap);  
              });
    });
    } catch (e) {
        console.log('Error connecting to DB');
    }
});

app.listen(3000);