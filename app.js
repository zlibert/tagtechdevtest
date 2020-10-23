'use strict';
const express = require('express');
const app = express();
const characters = require('./routes/characters');
const mongoose = require('mongoose');

process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    console.log('UNCAUGHT EXCEPTION 🔥 Shooting down...');
    process.exit(1);
});

mongoose.connect('mongodb://tagtechUser:PassWorD@localhost:27017/tagtech', 
    { useNewUrlParser: true , useUnifiedTopology: true }, () => {
        console.log("Connected to DB");
    });

app.use('/characters', characters);


// Routes
app.get('/', (req, res) => {
    res.send("Home");
});

app.listen(3000);

process.on('unhandledRejection', err => {
    console.log(err);
    console.log('UNHANDLED REJECTION 🔥 Shooting down.');
    server.close(() => {
      process.exit(1);
    });
  });