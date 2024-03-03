// models/Meme.js
const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema({
    memeOwner: String,
    caption: String,
    file: String
});

module.exports = mongoose.model('Meme', memeSchema);
