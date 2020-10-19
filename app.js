'use strict';
const express = require('express');
const app = express();
const characters = require('./routes/characters');


app.use('/characters', characters);

// Routes
app.get('/', (req, res) => {
    res.send("Home");
});

app.listen(3000);