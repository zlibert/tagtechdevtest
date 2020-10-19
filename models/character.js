const mongoose = require('mongoose');


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

module.exports = mongoose.model('Character', CharacterSchema );